import React, { useState } from 'react';
import InputGroup from '../ui/InputGroup';
import Slider from '../ui/Slider';
import Button from '../ui/Button';

export default function ControlPanel() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [modelStyle, setModelStyle] = useState('realistic');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  
  const generateModel = () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    console.log('Генерация модели с промптом:', prompt);
    
    // Здесь будет вызов API для генерации модели
    setTimeout(() => {
      setIsLoading(false);
      alert('Модель сгенерирована! В реальном проекте здесь будет обработка ответа от API');
    }, 2000);
  };
  
  return (
    <>
      <InputGroup label="Текстовый промпт">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Опишите, какую 3D модель вы хотите создать..."
          rows="4"
        />
      </InputGroup>
      
      <InputGroup label="Загрузите референс-изображение (опционально)">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && (
          <div className="image-preview">
            <img src={image} alt="Preview" />
          </div>
        )}
      </InputGroup>
      
      <Slider label="Качество (разрешение)" min={1} max={100} defaultValue={75} barLabels={['низкое', 'высокое']}/>
      
      <Button 
        onClick={generateModel}
        disabled={!prompt.trim()}
        loading={isLoading}
        loadingText='Генерация...'
        className={`generate-btn ${isLoading ? 'loading' : ''}`}
      >
        Сгенерировать модель
      </Button>
    </>
  );
}