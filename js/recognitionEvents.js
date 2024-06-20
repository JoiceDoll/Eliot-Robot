import { greetings, actions } from "./grammars.js";
import { dateTime } from "./dateTime.js";

const bg = document.querySelector("body");
const faceEye = document.querySelectorAll(".face-eye");
const rightArm = document.querySelector(".body-right-arm");
const leftArm = document.querySelector(".body-left-arm");
const headRobot = document.querySelector(".head-robot");
const bodyRobot = document.querySelector(".body");
const date = document.querySelector(".date-display");
const body = document.body;
const blueShadow = document.querySelector(".shadow-light");

export function onVoiceRecognition(event, recognition) {
  const text = event.results[0][0].transcript.toLowerCase();
  console.log(text);

  if (greetings.includes(text)) {
    for (const eye of faceEye) {
      eye.style.backgroundColor = "var(--blue-color-tertiary)";
      eye.style.filter = "brightness(5) contrast(1.5)";
    }

    rightArm.style.transform = "rotate(-20deg)";
    leftArm.style.transform = "rotate(380deg)";
    recognition.stop();
  } else if (actions.includes(text)) {
    if (text.toLowerCase().includes("horas")) {
      date.style.display = "block";
      date.innerHTML = dateTime();
      recognition.stop();
    } else if (text.toLowerCase().includes("ligar")) {
      body.style.background = "var(--background-primary)";
      headRobot.style.background = "var(--white-color-primary)";
      bodyRobot.style.background = "radial-gradient(circle, #d9d9d9, #fff)";
      rightArm.style.background = "var(--white-color-primary)";
      leftArm.style.background = "var(--white-color-primary)";
      blueShadow.style.display = "none";

      recognition.stop();
    } else {
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
    }
  } else {
    bg.style.backgroundColor = text;
    recognition.stop();
  }
}
