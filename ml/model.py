import os
os.environ['ATTN_BACKEND'] = 'xformers' 
os.environ['SPCONV_ALGO'] = 'native' 
import uuid
import imageio
from typing import Union
from PIL import Image
import torch

from TRELLIS.trellis.pipelines import TrellisImageTo3DPipeline, TrellisTextTo3DPipeline
from TRELLIS.trellis.utils import render_utils, postprocessing_utils


GENERATION_PIPELINES = {
    "image": TrellisImageTo3DPipeline,
    "text": TrellisTextTo3DPipeline,
}



class MeshGenerator:
    def __init__(self, model_size: str = "large", seed: int = 42):
        self.seed = seed
        self.model_size = model_size
        self._pipelines = {}
    
    def _get_pipeline(self, generation_type: str):
        """Get or create pipeline for the given generation type."""
        if generation_type not in self._pipelines:
            try:
                pipeline = GENERATION_PIPELINES[generation_type].from_pretrained(
                    f"microsoft/TRELLIS-{generation_type}-{self.model_size}"
                )
                pipeline.cuda()
                self._pipelines[generation_type] = pipeline
            except Exception as e:
                print(f"Got exception while loading {self.model_size} model for {generation_type}: {e}")

        return self._pipelines[generation_type]
    
    def _detect_generation_type(self, prompt: Union[str, Image.Image]) -> str:
        """Detect the appropriate generation type based on prompt type."""
        if isinstance(prompt, str):
            return "text" 
        else:
            return "image"
    
    def generate(self, prompt: Union[str, Image.Image], simplify: float = 0.95, 
                texture_size: int = 1024, output_dir: str = "./output/") -> str:
        """Generate mesh from either text or image prompt."""
        generation_type = self._detect_generation_type(prompt)
        pipeline = self._get_pipeline(generation_type)
        
        outputs = pipeline.run(prompt, seed=self.seed)

        glb = postprocessing_utils.to_glb(
            outputs['gaussian'][0], outputs['mesh'][0],
            simplify=simplify, texture_size=texture_size
        )
        
        output_path = f"{output_dir}/output_{uuid.uuid4().hex}.glb"
        glb.export(output_path)
        return output_path