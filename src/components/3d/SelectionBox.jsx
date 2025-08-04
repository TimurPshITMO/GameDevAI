import { Button, InputGroup } from "../ui";
import ModelTip from "./ModelTip";
import { useState } from "react";
import { handleRegeneratingRequest } from "../utils";

export default function SelectionBox({start, end, tipReq=false, setMainModelPath, clearSelection=()=>0}){
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
    

    return (<mesh position = {position}>
        <boxGeometry args={[...scale,
            Math.round(scale[0]/3*2+1),
            Math.round(scale[1]/3*2+1),
            Math.round(scale[2]/3*2+1)]} />
        <meshStandardMaterial 
                wireframe={true}
                color={'#51cce4'}
                opacity={0.8}
                transparent={true}    
        />
        {tipReq && (
            <ModelTip>
                      <InputGroup label="Редактировать">
                        <textarea
                          value={postPrompt}
                          onChange={(e) => setPostPrompt(e.target.value)}
                          placeholder="Опишите, как вы хотите изменить выбранную область"
                          rows="4"
                        />
                      </InputGroup>

                      <Button
                          onClick={()=>handleRegeneratingRequest(postPrompt, setIsLoading, setMainModelPath, clearSelection)}
                          disabled={!postPrompt.trim() && !isLoading}
                          loading={isLoading}
                          loadingText='Генерация...'
                          className={`generate-btn ${isLoading ? 'loading' : ''}`}
                      >Перегенерировать</Button>
            </ModelTip>
        )}
    </mesh>)
}