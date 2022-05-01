import React, { useState } from "react";
import {
  generateLoginCode,
  attemptLogin,
  attemptRegister,
} from "../../api/fetchData";
import "./index.css";
import Camera from "../camera"

function Home(props) {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [consoleInputValue, setConoleInputValue] = useState("");
  const [flagInput, setFlagInput] = useState([false, ""]);
  const [details, setDetails] = useState({ username: null, password: null });
  const [cameraActive, setCameraActive] = useState(true)
  const [inputType, setInputType] = useState("text");
  const [logArray, setLogArray] = useState([
    "Type 'help' for a list of available commands.",
  ]);

  const commands = [
    {
      syntax: "help",
      description: "List all available commands.",
      locked: "both",
      command: () => help(),
    },
    {
      syntax: "register",
      description: "Register a Gronk Security v2.0 (c) account.",
      locked: "before",
      command: () => register(),
    },
    {
      syntax: "login",
      description: "Login to user account following input prompts.",
      locked: "before",
      command: () => login(),
    },
    {
      syntax: "generate",
      description: "Generate login codes.",
      locked: "after",
      command: () => generate(),
    },
    {
      syntax: "clear",
      description: "Clears the console.",
      locked: "both",
      command: () => clear(),
    },
    {
      syntax: "logout",
      description: "Logs out of user account.",
      locked: "after",
      command: () => logout(),
    },
    {
      syntax: "camera",
      description: "Opens Camera.exe",
      locked: "after",
      command: () => setCameraActive(true),
    }
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
      switch (flagInput[1]) {
        case "generate":
          addLog(`> ${newCommand}`);
          apiGenerateCode(newCommand);
          break;
        case "username":
          if (newCommand === "") {
          }
          setLogArray(["Password:", `> ${newCommand}`].concat(logArray));
          setDetails({ username: newCommand, password: null });
          setFlagInput([true, "password"]);
          setInputType("password");
          break;
        case "password":
          setLogArray(["***********"].concat(logArray));
          apiLogin({ ...details, password: newCommand });
          setFlagInput([false, ""]);
          setInputType("text");
          break;
        case "registerCode":
          setLogArray(["Enter username:", `> ${newCommand}`].concat(logArray));
          setDetails({ ...details, code: newCommand });
          setFlagInput([true, "registerUsername"]);
          break;
        case "registerUsername":
          setLogArray(["Enter password:", `> ${newCommand}`].concat(logArray));
          setDetails({ ...details, username: newCommand });
          setFlagInput([true, "registerPassword"]);
          setInputType("password");
          break;
        case "registerPassword":
          setLogArray(["Loading...", "************"].concat(logArray));
          apiRegister({ ...details, password: newCommand });
          setFlagInput(false, "");
          setInputType("text");
          break;
      }
    } else {
      var realCommand = false;
      commands.map((command) => {
        if (newCommand.toLowerCase() === command.syntax) {
          if (command.locked === "after" && authed) {
            realCommand = true;
            command.command();
          } else if (command.locked === "both" || command.locked === "before" && !authed) {
            realCommand = true;
            command.command();
          }
        }
      });

      if (!realCommand) {
        setLogArray(["Unknow command.", `> ${newCommand}`].concat(logArray));
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
      if (command.locked === "after" && authed ) {
        var log = `'${command.syntax}' - ${command.description}`;
        logList = [log].concat(logList);
      } else if(command.locked === "both" || command.locked === "before" && !authed){
        var log = `'${command.syntax}' - ${command.description}`;
        logList = [log].concat(logList);
      }
    });

    var newLogArray = logList.concat(logArray);
    setLogArray(newLogArray);
  }

  function generate() {
    setFlagInput([true, "generate"]);
    var logList = ["Enter code:", "> generate"];
    setLogArray(logList.concat(logArray));
  }

  function apiGenerateCode(code) {
    setInputDisabled(true);
    generateLoginCode(code)
      .then((res) => {
        addLog(`New login code: ${res}`);
        setInputDisabled(false);
        setFlagInput([false, ""]);
      })
      .catch((err) => {
        addLog("Invalid code, please try again.");
        setInputDisabled(false);
        setFlagInput([false, ""]);
      });
  }

  function login() {
    setFlagInput([true, "username"]);
    setLogArray(["Enter username:", "> login"].concat(logArray));
  }

  function apiLogin(details) {
    setInputDisabled(true);
    addLog("Loggin in...");
    attemptLogin(details)
      .then((res) => {
        addLog("Logged in!");
        setInputDisabled(false);
        setAuthed(true);
        setUsername(details.username);
      })
      .catch((err) => {
        addLog("Invalid username or password.");
        setInputDisabled(false);
      });
  }

  function logout() {
    setAuthed(false);
    setDetails({ username: null, password: null });
    setUsername("");
    setLogArray(["Logged out.", "> logout"].concat(logArray));
  }

  function register() {
    setFlagInput([true, "registerCode"]);
    setDetails({ username: null, password: null, code: null });
    setLogArray(["Enter code:", "> register"].concat(logArray));
  }

  function apiRegister(details) {
    console.log(details);
    attemptRegister(details)
      .then(() => {
        addLog("User successfully registered");
      })
      .catch((error) => {
        addLog(error
          );
      });
  }

  function clear() {
    setLogArray(["Type 'help' for a list of available commands."]);
  }

  return cameraActive ? <Camera onClose={() => setCameraActive(false)}/> : (
    <div>
      <div className="container">
        <div className="loginText">
          <p className="headerText">Initializing Gronk Security v2.0</p>
          <p className="headerText">Copyright (c) 2022 Gronk House</p>
          <p className="headerText">
            {authed ? `Logged in as - ${username}` : "Not logged in"}
          </p>
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
              type={inputType}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
