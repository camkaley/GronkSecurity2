import React, { useState, useEffect } from "react";
import "./index.css";

function Login(props) {
  const [authed, setAuthed] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false)
  const [consoleInputValue, setConoleInputValue] = useState("");
  const [generateCode, setGenerateCode] = useState("")
  const [flagInput, setFlagInput] = useState([false, ""]);
  const [logArray, setLogArray] = useState([
    "Type 'help' for a list of available commands.",
  ]);

  useEffect(() => {}, []);

  const commands = [
    {
      syntax: "help",
      description: "List all available commands.",
      command: () => help(),
    },
    {
      syntax: "login",
      description: "Login to user account following input prompts.",
    },
    {
      syntax: "generate",
      description: "Generate login codes.",
      command: () => generate(),
    },
    {
      syntax: "clear",
      description: "Clears the console.",
      command: () => clear(),
    },
  ];

  function renderConsoleLog() {
    return (
      <div className="consoleLogs">
        {logArray.map((log) => {
          return (
            <p className="headerText" style={{ marginTop: "0px" }}>
              {log}
            </p>
          );
        })}
      </div>
    );
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      submitCommand(consoleInputValue);
    }
  }

  function submitCommand(newCommand) {
    setConoleInputValue("");

    if (flagInput[0]) {
      switch(flagInput[1]){
        case "generate":
          setGenerateCode(newCommand);
          addLog(`> ${newCommand}`);
          generateNewCode();
          break;
      }
    } else {
      var realCommand = false;
      commands.map((command) => {
        if (newCommand.toLowerCase() === command.syntax) {
          realCommand = true;
          command.command();
        }
      });

      if (!realCommand) {
        addLog(`> ${newCommand}`);
      }
    }
  }

  function addLog(log) {
    var newLogArray = [log].concat(logArray);
    setLogArray(newLogArray);
  }

  function help() {
    var logList = ["> help"];
    commands.map((command) => {
      var log = `'${command.syntax}' - ${command.description}`;
      logList = [log].concat(logList);
    });

    var newLogArray = logList.concat(logArray);
    setLogArray(newLogArray);
  }

  function generate() {
    setFlagInput([true, "generate"]);
    var logList = ["Enter code:", "> generate"];
    var newLogArray = logList.concat(logArray);
    setLogArray(newLogArray);
  }

  function generateNewCode() {
    setInputDisabled(true)
    const code = generateCode;

  }

  function login() {}

  function clear() {
    setLogArray(["Type 'help' for a list of available commands."]);
  }

  return (
    <div>
      <div className="container">
        <div className="loginText">
          <p className="headerText">Initializing Gronk Security v2.0</p>
          <p className="headerText">Copyright (c) 2022 Gronk House</p>
          <p className="headerText" style={{ paddingTop: "10px" }}>
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . .
          </p>
          <pre>
            <code>
              {`
 ██████╗ ██████╗  ██████╗ ███╗   ██╗██╗  ██╗    ███████╗███████╗ ██████╗██╗   ██╗██████╗ ██╗████████╗██╗   ██╗    ██████╗     ██████╗ 
██╔════╝ ██╔══██╗██╔═══██╗████╗  ██║██║ ██╔╝    ██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝    ╚════██╗   ██╔═████╗
██║  ███╗██████╔╝██║   ██║██╔██╗ ██║█████╔╝     ███████╗█████╗  ██║     ██║   ██║██████╔╝██║   ██║    ╚████╔╝      █████╔╝   ██║██╔██║
██║   ██║██╔══██╗██║   ██║██║╚██╗██║██╔═██╗     ╚════██║██╔══╝  ██║     ██║   ██║██╔══██╗██║   ██║     ╚██╔╝      ██╔═══╝    ████╔╝██║
╚██████╔╝██║  ██║╚██████╔╝██║ ╚████║██║  ██╗    ███████║███████╗╚██████╗╚██████╔╝██║  ██║██║   ██║      ██║       ███████╗██╗╚██████╔╝
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝    ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝       ╚══════╝╚═╝ ╚═════╝ `}
            </code>
          </pre>
        </div>
      </div>
      <div className="consoleContainer">
        <div className="console">
          <div className="consoleLogBox">{renderConsoleLog()}</div>
          <div className="consoleInputBox">
            <span className="prefix">{`>`}</span>
            <input
              autoFocus
              className="consoleInput"
              value={consoleInputValue}
              onKeyDown={(e) => handleKeyPress(e)}
              onChange={(e) => setConoleInputValue(e.target.value)}
              disabled={inputDisabled}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
