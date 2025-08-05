import { useFrame, useThree } from "@react-three/fiber";
import { captureOwnerStack, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from 'three';
import { SelectionBox } from ".";
import ModelTip from "./ModelTip";

export default function SelectionInterface({
    controls,
    selectionStage,
    setSelectionStage,
    setActiveTool,
    callback,
    tipReq,
    setMainModelPath
}){

    // const [scale, setScale] = useState([0,0,0])
    // const [position, setPosition] = useState(new THREE.Vector3(0,0,0))

    callback((prev)=>{
        return ()=>{
            setStart(0);
            setEnd(0);
        }
    })

    const pointRef = useRef();

    const [pointerPosition, setPointerPosition] = useState();

    const [start, setStart] = useState([0,0,0]);
    const [end, setEnd] = useState([0,0,0]);

    useEffect(() =>{
        if (controls.current == undefined) return;

        switch (selectionStage){
            case 0:
                controls.current.setAzimuthalAngle(0);
                controls.current.setPolarAngle(Math.PI/2);
                controls.current.update();
                break;
            case 1:
                controls.current.target.set(0,0,0);
                controls.current.update();
                controls.current.setAzimuthalAngle(0);
                controls.current.setPolarAngle(Math.PI/2);
                break;
            case 2:
                controls.current.setAzimuthalAngle(0);
                controls.current.setPolarAngle(Math.PI/2);
                controls.current.update();
                break;

            case 3:
            case 4:
                controls.current.setAzimuthalAngle(Math.PI/2);
                controls.current.setPolarAngle(Math.PI/2);
                controls.current.update();
                break;
        }
    }, [selectionStage])

    const handleClick = ({point, button}) =>{
        if (button !== 0) return;

        switch (selectionStage){
            case 1: {
                setStart((prev)=>[point.x, point.y, 0]);
                setEnd((prev)=>[point.x, point.y, 0]);
                break;
            }
            case 2: {
                setEnd((prev)=>[point.x, point.y, 0]);
                break;
            }
            case 3: {
                setStart((prev)=>[prev[0], prev[1], point.z]);
                setEnd((prev)=>[prev[0], prev[1], point.z]);
                break;
            }
            case 4: {
                setEnd((prev)=>[prev[0], prev[1], point.z]);
                setActiveTool('rotate')
                if (controls.current){
                    controls.current.setAzimuthalAngle(Math.PI/4)
                    controls.current.setPolarAngle(Math.PI/4)
                }
                break;
            }
        }

        setSelectionStage((s) => (s+1)%6);
    }

    const handleMove = ({point}) =>{
        setPointerPosition(point);
        switch (selectionStage){
            case 1: {
                setStart((prev)=>[point.x, point.y, 0]);
                setEnd((prev)=>[point.x, point.y, 0]);
                break;
            }
            case 2: {
                setEnd((prev)=>[point.x, point.y, prev[2]]);
                break;
            }
            case 3: {
                setStart((prev)=>[prev[0], prev[1], point.z]);
                setEnd((prev)=>[prev[0], prev[1], point.z]);
                break
            }
            case 4: {
                setEnd((prev)=>[prev[0], prev[1], point.z]);
                break
            }

        }
    }


    return selectionStage && (
        <>
        {(selectionStage>0 && selectionStage<5) && (<><mesh
            onPointerMove={handleMove}
            onPointerDown={handleClick}
            position={[0,0,0]}
            rotation={(selectionStage > 2)?[0,Math.PI/2,0]:[0,0,0]}
            visible={false}
        >
            <planeGeometry
                args={[100, 100]}
            />
        </mesh>
        </>)}

        

        {(selectionStage>0) && (
            <SelectionBox
                start={start}
                end={end}
                tipReq={tipReq}
                setMainModelPath={setMainModelPath}
                clearSelection={()=>{setSelectionStage(0); setActiveTool('rotate'); setStart(0), setEnd(0)}}
            />
        )}
        
        </>
    )
}