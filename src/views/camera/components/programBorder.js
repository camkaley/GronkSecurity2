import React, {useState, useEffect} from "react";

export default function ProgramBorder(props) {

  const [animationActive, setAnimationActive] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setAnimationActive(false)
    }, 2000)
  }, [])

  return (
    <div
      style={{
        width: window.innerHeight - 30,
        height: window.innerHeight - 30,
        margin: "0 auto",
        marginTop: "10px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "calc(100% - 3px)",
          height: "26px",
          background: "#CCC",
          position: "absolute",
          top: "3px",
          left: "3px",
          zIndex: "-1",
          paddingLeft: "3px",
          fontFamily: "Terminal",
          lineHeight: "26px",
          fontWeight: "bold"
        }}
      >{props.title}</div>
      <div
        onClick={() => props.onClose()}
        style={{
          position: "absolute",
          width: "20px",
          height: "20px",
          top: "5px",
          right: "0px",
          borderTop: "1px solid #efefef",
          borderLeft: "1px solid #efefef",
          borderRight: "1px solid #767676",
          borderBottom: "1px solid #767676",
          cursor: "pointer",
          zIndex: "1",
          textAlign: "center",
          lineHeight: "18px",
          color: "black"
        }}
      >X</div>
      {animationActive ? <div style={{fontFamily: "Terminal", color: "white", position: "absolute", top: "50%", textAlign: "center", width: "100%", fontSize: "32px"}}>Loading...</div> : props.children}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
          left: "0px",
          zIndex: "-2",
        }}
      />
      <div
        style={{
          width: "calc(100% + 1px)",
          height: "100%",
          position: "absolute",
          boxShadow: "inset 0px 0px 0px 3px #CCCCCC",
          top: "0px",
          left: "-1px",
          background: "black",
          borderTop: "3px solid #FFF",
          borderLeft: "3px solid #FFF",
          borderRight: "3px solid #555",
          borderBottom: "3px solid #555",
          zIndex: "-2",
        }}
      />
    </div>
  );
}
