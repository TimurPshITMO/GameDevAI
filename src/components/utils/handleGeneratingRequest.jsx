import { img2base64 } from "./img2base64";

export default async function handleGeneratingRequest(prompt, details, setIsLoading, setMainModelPath, img64, promptType){
    if (!prompt.trim() && !img64) return;
    
    setIsLoading(true);
 
    await fetch("http://127.0.0.1:8000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt, promptType: promptType, quality: details, reference_image: (promptType == 'image')?img64:'' })
    })
    .then(res => res.json())
    .then(console.log)
    .catch(console.error)
    .finally(()=>setIsLoading(false))
}