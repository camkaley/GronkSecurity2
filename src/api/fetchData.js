import Axios from "axios";

export function generateLoginCode(code) {
  return new Promise((resolve, reject) => {
    Axios.post("http://192.168.0.155:4000/generate", { code: code })
      .then((res) => resolve(res.data.code))
      .catch((err) => {
        reject(err)
      });
  });
}

export function attemptLogin(details) {
  return new Promise((resolve, reject) => {
    Axios.post("http://192.168.0.155:4000/login", details)
      .then((res) => resolve(res.data.code))
      .catch((err) => {
        reject(err)
      });
  });
}

export function attemptRegister(details) {
  return new Promise((resolve, reject) => {
    Axios.post("http://192.168.0.155:4000/register", details)
      .then((res) => resolve())
      .catch((err) => {
        if(err.response.status === 409){
          reject("A user with this name already exists, please try a differnt username.")
        }
        else if(err.response.status === 404){
          reject("Incorrect registration code, please try again.")
        }
        else if(err.response.status === 400){
          reject("Invalid username/password format, please only use letters, numbers and symbols")
        }
        else {
          reject("Server error, please try again later")
        }
      });
  });
}
