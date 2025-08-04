
export default function handleGeneratingRequest(prompt, details, setIsLoading, setMainModelPath){
    if (!prompt.trim()) return;

    setIsLoading(true);
    console.log('Генерация модели с промптом:', prompt);
    console.log('Уровень детализации: ', details);

    setTimeout(() => {
      setIsLoading(false);
      alert('Модель сгенерирована! В реальном проекте здесь будет обработка ответа от API');
      setMainModelPath("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb");
    }, 2000);
}