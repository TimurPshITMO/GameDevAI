import { Button, InputGroup } from "../ui";
import ModelTip from "./ModelTip";
import { useState } from "react";

export default function SelectionBox({start, end, tipReq=false, children}){
    const position = [
        (end[0]+start[0])/2,
        (end[1]+start[1])/2,
        (end[2]+start[2])/2
    ]
    const scale = [
        Math.max(Math.abs(start[0]-end[0]), 0.1),
        Math.max(Math.abs(start[1]-end[1]), 0.1),
        Math.max(Math.abs(start[2] - end[2]), 0.1)
    ];

    const [postPrompt, setPostPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generateModel = () => {
        if (!postPrompt.trim()) return;
        
        setIsLoading(true);
        console.log('Генерация модели с промптом:', postPrompt);
        
        // Здесь будет вызов API для генерации модели
        setTimeout(() => {
        setIsLoading(false);
        alert('Модель сгенерирована! В реальном проекте здесь будет обработка ответа от API');
        }, 2000);
    };
    

    return (<mesh position = {position}>
        <boxGeometry args={[...scale,
            Math.round(scale[0]/3*2+1),
            Math.round(scale[1]/3*2+1),
            Math.round(scale[2]/3*2+1)]} />
        <meshStandardMaterial 
                wireframe={true}
                color={'#51cce4'}
                // roughness={0.5}
                opacity={1}
                transparent={true}    
        />
        {tipReq && (
            <ModelTip
                distanceFactor={5}
            >
                      <InputGroup label="Редактировать">
                        <textarea
                          value={postPrompt}
                          onChange={(e) => setPostPrompt(e.target.value)}
                          placeholder="Опишите, как вы хотите изменить выбранную область"
                          rows="4"
                        />
                      </InputGroup>

                      <Button
                          onClick={generateModel}
                          disabled={!postPrompt.trim()}
                          loading={isLoading}
                          loadingText='Генерация...'
                          className={`generate-btn ${isLoading ? 'loading' : ''}`}
                      >Перегенерировать</Button>
            </ModelTip>
        )}
    </mesh>)
}