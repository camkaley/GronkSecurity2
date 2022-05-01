import React, {useState} from "react"
import House from "./house"
import ProgramBorder from "./components/programBorder"

export default function Camera(props) {
    const [cameraActive, setCameraActive] = useState(false)
    const [cameraID, setCameraID] = useState(0)

    return (
        <div>
            <ProgramBorder title="Camera.exe" onClose={() => props.onClose()}>
                <House callback={(id) => console.log("callback", id)}/>   
            </ProgramBorder>
        </div>
    )
}