import { Html } from "@react-three/drei";

export default function ModelTip({heading,children, distanceFactor=4}){

    return (
        <Html distanceFactor={distanceFactor}>
            <div className="selection-info">
                <h3>{heading}</h3>
                {children}
            </div>
        </Html>
    )
}