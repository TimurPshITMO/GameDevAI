import React, { useState } from 'react';
import InputGroup from '../ui/InputGroup';
import Slider from '../ui/Slider';
import Button from '../ui/Button';
import { handleGeneratingRequest } from '../utils';
import { BsX } from "react-icons/bs";

export default function ControlPanel({setMainModelPath}) {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState(1200);
  const [promptType, setPromptType] = useState("text");
  
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setPromptType('image')
    } else setImage(()=>null)
  };
  
  return (
    <>
      <InputGroup label="Текстовый промпт" active = {promptType == "text"} onClick={()=>setPromptType('text')}>
      <div className='cancelable-container'>
        <textarea
          value={prompt}
          onChange={(e) => {setPrompt(e.target.value); setPromptType('text')}}
          placeholder="Опишите, какую 3D модель вы хотите создать..."
          rows="4"
        />
        {prompt && (
          <BsX 
            type="button" 
            className="clear-button" 
            onClick={() => setPrompt('')}
            aria-label="Очистить текстовый промпт"
          />
        )}
      </div>
      </InputGroup>
      
      <InputGroup label="Референс-изображение" active = {promptType == "image"} onClick={()=>setPromptType('image')}>
        <input id="image_ref" type="file" accept="image/*" onChange={handleImageUpload}/>
        {image && (
          <div className="image-preview">
            <div className='cancelable-container'>
              <img src={image} alt="Preview" />
              <BsX 
                style={{backgroundColor: "#333"}}
                type="button" 
                className="clear-button" 
                onClick={() => {setImage(()=>null); document.getElementById("image_ref").value = null}}
                aria-label="Очистить текстовый промпт"
              />
            </div>
          </div>
        )}
      </InputGroup>
      
      <Slider
        value={details}
        setValue={setDetails}
        label="Качество (детализация)"
        min={500} max={5000}
        barLabels={['низкое', 'высокое']}
        onClick = {()=>setDetails(1200)}/>
      
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