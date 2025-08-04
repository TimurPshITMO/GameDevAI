
export default function handleRegeneratingRequest(postPrompt, setIsLoading, setMainModelPath){
    if (!postPrompt.trim()) return;

    setIsLoading(true);
    console.log('Регенерация модели с промптом:', postPrompt);

    setTimeout(() => {
      setIsLoading(false);
      alert('Модель перегенерирована! В реальном проекте здесь будет обработка ответа от API');
      setMainModelPath('/models/chest2.glb');
    }, 2000);
}