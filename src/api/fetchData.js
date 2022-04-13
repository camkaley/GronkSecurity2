import Axios from "axios";

export function generateLoginCode(code) {
  return new Promise((resolve, reject) => {
    Axios.post("http://localhost:4000/generate", { code: code })
      .then((res) => resolve(res.data.code))
      .catch((err) => {
        reject(err)
      });
  });
}
