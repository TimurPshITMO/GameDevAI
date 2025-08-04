from TRELLIS import TrellisImageTo3DPipeline, TrellisTextTo3DPipeline, postprocessing_utils
from PIL import Image
import torch
import uuid
import os

class MeshGenerator:
    def __init__(self, generation_type: str, model_size: str, seed: int):
        self.seed = seed
        self.pipeline = self._get_pipeline(generation_type, model_size)
        

    def _get_pipeline(generation_type: str, model_size: str="large"):
        try:
            pipeline = GENERATION_PIPELINES[generation_type].from_pretrained(f"microsoft/TRELLIS-{generation_type}-{model_size}")
            pipeline.cuda()
        except Exception as e:
                print(f"Got exception while loading {model_size} model for {generation_type}: {e}")
            

    def generate_from_image(self, image_path: str) -> str:
        image = Image.open(image_path).convert("RGB")
        outputs = self.pipeline.run(image, seed=self.seed)

        glb = postprocessing_utils.to_glb(outputs['gaussian'][0], outputs['mesh'][0],
                                        simplify=0.95, texture_size=1024)

        output_path = f"assets/output_{uuid.uuid4().hex}.glb"
        glb.export(output_path)
        return output_path

    def generate_from_text(self, prompt: str) -> str:
        outputs = self.pipeline.run(prompt, seed=self.seed)

        glb = postprocessing_utils.to_glb(outputs['gaussian'][0], outputs['mesh'][0],
                                        simplify=0.95, texture_size=1024)

        output_path = f"assets/output_{uuid.uuid4().hex}.glb"
        glb.export(output_path)
        return output_path


GENERATION_PIPELINES = {
    "image": TrellisImageTo3DPipeline,
    "text": TrellisTextTo3DPipeline,
}