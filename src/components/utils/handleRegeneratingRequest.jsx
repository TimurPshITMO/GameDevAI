
export default function handleRegeneratingRequest(postPrompt, setIsLoading, setMainModelPath, clearSelection){
    if (!postPrompt.trim()) return;

    setIsLoading(true);
    console.log('Регенерация модели с промптом:', postPrompt);

    setTimeout(() => {
      setIsLoading(false);
      clearSelection();
      alert('К сожалению, функция постредактирования \nеще не реализована в этом интерфейсе\n\n    (｡•́︿•̀｡) ');
      
    }, 500);
}