import React from "react"
import House from "./house"
import ProgramBorder from "./components/programBorder"

export default function Camera(props) {
    return (
        <div>
            <ProgramBorder title="Camera.exe" onClose={() => props.onClose()}>
                <House/>   
            </ProgramBorder>
        </div>
    )
}