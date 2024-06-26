import { greetings, actions } from "./grammars.js";
import { success, error } from "./weatherApi.js";
import { updateTime } from "./clock.js";
import { animations } from "./animations.js";

const bg = document.querySelector("body");
const faceEye = document.querySelectorAll(".face-eye");
const rightArm = document.querySelector(".body-right-arm");
const leftArm = document.querySelector(".body-left-arm");
const headRobot = document.querySelector(".head-robot");
const bodyRobot = document.querySelector(".body");
const body = document.body;
const blueShadow = document.querySelector(".shadow-light");

export function onVoiceRecognition(event, recognition) {
  const text = event.results[0][0].transcript.toLowerCase();

  switch (true) {
    case greetings.includes(text):
      for (const eye of faceEye) {
        eye.style.backgroundColor = "var(--blue-color-tertiary)";
        eye.style.filter = "brightness(5) contrast(1.5)";
      }
      rightArm.style.transform = "rotate(-20deg)";
      leftArm.style.transform = "rotate(380deg)";
      recognition.stop();
      break;

    case actions.includes(text) && text.includes("ligar"):
      body.style.background = "var(--background-primary)";
      headRobot.style.background = "var(--white-color-primary)";
      bodyRobot.style.background = "radial-gradient(circle, #d9d9d9, #fff)";
      rightArm.style.background = "var(--white-color-primary)";
      leftArm.style.background = "var(--white-color-primary)";
      blueShadow.style.display = "none";
      recognition.stop();
      break;

    case (actions.includes(text) && text.includes("temperatura")) ||
      text.includes("graus"):
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          success(position)
            .then((data) => {
              handleWeatherData(data);
              recognition.stop();
            })
            .catch((error) => {
              console.error("Erro ao obter os dados meteorológicos:", error);
              recognition.stop();
            });
        }, error);
      } else {
        console.log("Geolocalização não é suportada pelo seu navegador.");
        recognition.stop();
      }
      break;

    case actions.includes(text):
      body.style.background = "radial-gradient(circle, #011112, black)";
      headRobot.style.background =
        "linear-gradient(to bottom left, #bdbfbf, #9a9c9c 20%, #a4f2f5)";
      bodyRobot.style.background =
        "linear-gradient(to bottom left, #bdbfbf, #9a9c9c 10%, #a4f2f5)";
      for (const eye of faceEye) {
        eye.style.backgroundColor = "var(--blue-color-tertiary)";
      }
      rightArm.style.background =
        "linear-gradient(to bottom left, #bdbfbf, #9a9c9c 20%, #d9d9d9)";
      leftArm.style.background =
        "linear-gradient(to bottom, #bdbfbf, #9a9c9c 20%, #d9d9d9)";
      blueShadow.style.display = "block";
      recognition.stop();
      break;

    default:
      bg.style.backgroundColor = text;
      recognition.stop();
      break;
  }
}

function handleWeatherData({ temperature, weather }) {
  setInterval(updateTime, 1000);
  updateTime();
  animations();
  const generalContainer = document.querySelector(".general-container");
  const robotContainer = document.querySelector(".container-robot-item");
  generalContainer.style.gridTemplateColumns = "3fr 1fr";
  robotContainer.style.width = "80%";

  switch (weather) {
    case "Clear":
      body.style.background =
        "linear-gradient(to bottom, var(--clean-sky-primary) 0%, var(--clean-sky-secondary) 100%)";
      weatherItemContainer.innerHTML = `<p>${weather} -  ${temperature}</p>`;
      break;
    case "Rain":
      body.style.background = "var(--rain-color)";
      weatherItemContainer.innerHTML = `<p>${weather} -  ${temperature}</p>`;
      break;

    case "Clouds":
      body.style.background = "var(--clouds-color)";
      weatherItemContainer.innerHTML = `<p>${weather} -  ${temperature}</p>`;
      break;
    default:
      console.log("Condição climática desconhecida.");
  }
}
