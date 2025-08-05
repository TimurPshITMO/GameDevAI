import os
import uuid
from PIL import Image
import io
import base64

from .config import settings

if (settings.RUN_MODE == 'deploy'):
    import torch
    os.environ['ATTN_BACKEND'] = 'xformers' 
    os.environ['SPCONV_ALGO'] = 'native'

    print('Importing TRELLIS ...')
    from TRELLIS.trellis.pipelines import TrellisImageTo3DPipeline, TrellisTextTo3DPipeline
    from TRELLIS.trellis.utils import render_utils, postprocessing_utils
    print('TRELLIS was imported successfully')
    GENERATION_PIPELINES = {
        "image": TrellisImageTo3DPipeline,
        "text": TrellisTextTo3DPipeline,
    }
else:
    import time


class MeshGenerator:

    def __init__(self, model_size: str = "large", seed: int = 42):
        # Здесь загружаем вашу модель
        print(f"Initializing {self.__class__.__name__} object")
        self.seed = seed
        self.model_size = model_size
        self._pipelines = {}
    
    def _get_pipeline(self, generation_type: str):
        """
        Get or create pipeline for the given generation type.
        """

        if generation_type not in self._pipelines:
            try:
                print(f"No loaded pipline found for {generation_type}. Processing loading...")
                pipeline = GENERATION_PIPELINES[generation_type].from_pretrained(
                    f"microsoft/TRELLIS-{generation_type}-{self.model_size}"
                )
                pipeline.cuda()
                self._pipelines[generation_type] = pipeline
                print(f"microsoft/TRELLIS-{generation_type}-{self.model_size} was loaded successfully")
            except Exception as e:
                print(f"Got exception while loading {self.model_size} model for {generation_type}: {e}")
        
        return self._pipelines[generation_type]


    def generate_from_prompt(self,
                             model_id,
                             prompt: str,
                             prompt_type: str,
                             quality: int = 1200,
                             texture_size: int = 1024):
        """
        Generate mesh from either text or image prompt
        """

        s_id = f'[{str(model_id)[:5]}...]'
        print(f"{s_id}    Processing {prompt_type} prompt"+((": " +prompt[:30]) if prompt_type == 'text' else ''))

        if (settings.RUN_MODE == "deploy"):
            pipeline = self._get_pipeline(prompt_type)

            print(f"{s_id}  Running pipline...")
            outputs = pipeline.run(
                prompt if prompt_type == 'text' else self._decode_image(prompt),
                seed=self.seed
            )
            print(f"{s_id}    Pipline finished successfully")

            print(f"{s_id}    Generating glb object...")
            glb = postprocessing_utils.to_glb(
                outputs['gaussian'][0],
                outputs['mesh'][0],
                simplify= 1 - (quality) / (outputs["mesh"][0].faces.size()[0]),
                texture_size=texture_size
            )
            print(f"{s_id}    glb was generated successfully")

            filename = f"{model_id}.glb"
            filepath = os.path.join(settings.MODELS_DIR, filename)

            print(f"{s_id}    Exporting to {filename}...")
            glb.export(filepath)
            print(f"{s_id}    Exported successfully")
        
        else:
            print(f"{s_id}  Imitating working process...")
            time.sleep(5)
            print(f"{s_id}  Imitated successfully...")

            filename = f"{model_id}.glb"
            filepath = os.path.join(settings.MODELS_DIR, filename)

            print(f"{s_id}    Exporting fake glb to {filename}...")
            with open(filepath, "wb") as f:
                f.write(b"Fake GLB file content for demonstration")
            print(f"{s_id}    Exported successfully")
        
        print(f"{s_id}    Processed successfully")

        return {
            "model_id": model_id,
            "filepath": filepath,
            "format": "glb",
            "size": os.path.getsize(filepath)
        }


    def _decode_image(self, base64_data):
        """
        Decode base64 image data
        """

        if ',' in base64_data:
            base64_data = base64_data.split(',')[1]
        
        image_data = base64.b64decode(base64_data)
        return Image.open(io.BytesIO(image_data))

generator = MeshGenerator()