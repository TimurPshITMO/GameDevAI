import React, { useState } from 'react';
import InputGroup from '../ui/InputGroup';
import Slider from '../ui/Slider';
import Button from '../ui/Button';
import { handleGeneratingRequest } from '../utils';

export default function ControlPanel({setMainModelPath}) {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState(75);
  
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
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
      
      <Slider
        value={details}
        setValue={setDetails}
        label="Качество (разрешение)"
        min={1} max={100}
        barLabels={['низкое', 'высокое']}/>
      
      <Button 
        onClick={() => handleGeneratingRequest(prompt, details, setIsLoading, setMainModelPath)}
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