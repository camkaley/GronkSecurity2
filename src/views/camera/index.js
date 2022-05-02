import React, { useState } from "react";
import House from "./house";
import ProgramBorder from "./components/programBorder";

const cameraIPList = ["http://192.168.0.155:8000"]

export default function Camera(props) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraID, setCameraID] = useState(0);

  function handleClose() {
      if(cameraActive) {
          setCameraActive(false)
      }
      else {
          props.onClose()
      }
  }

  function handleClick(id) {
      setCameraID(id)
      setCameraActive(true)
  }

  return (
    <div>
      <ProgramBorder title="Camera.exe" onClose={() => handleClose()}>
          {cameraActive ? <iframe
            src={cameraIPList[cameraID]}
            title="W3Schools Free Online Web Tutorials"
            style={{
              width: "100%",
              height: "100%",
              marginTop: "10px",
              flexGrow: "1",
              border: "none",
              marginTop: "calc(50% - 340px)",
              padding: "0",
            }}
            frameBorder={0}
          ></iframe> : <House callback={(id) => handleClick(id)}/>}
      </ProgramBorder>
    </div>
  );
}

