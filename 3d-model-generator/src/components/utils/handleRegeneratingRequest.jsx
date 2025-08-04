
export default function handleRegeneratingRequest(postPrompt, setIsLoading, setMainModelPath){
    if (!postPrompt.trim()) return;

    setIsLoading(true);
    console.log('Регенерация модели с промптом:', postPrompt);

    setTimeout(() => {
      setIsLoading(false);
      alert('Модель перегенерирована! В реальном проекте здесь будет обработка ответа от API');
      setMainModelPath("https://drive.google.com/uc?export=download&id=150HLl20VCcWoJdRbwE81N0oM-zypOnH0");
    }, 2000);
}