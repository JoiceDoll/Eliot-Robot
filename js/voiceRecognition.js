import { onVoiceRecognition } from "./recognitionEvents.js";
import { VoiceRecognitionConfig } from "./voiceRecognitionConfig.js";
const voiceRecognition = new VoiceRecognitionConfig();

const recognition = voiceRecognition.getRecognition();
const speechRecognitionList = voiceRecognition.getSpeechRecognitionList();

if (!speechRecognitionList || !recognition) {
  console.error(
    "SpeechRecognition or SpeechGrammarList is not supported in this browser."
  );
} else {
  document.body.onload = () => {
    recognition.start();
    console.log("Pronto para receber um comando de voz.");
  };

  recognition.onresult = (event) => {
    onVoiceRecognition(event, recognition);
  };

  recognition.onerror = (event) => {
    console.error("Ocorreu um erro no reconhecimento: " + event.error);
  };

  recognition.onend = () => {
    recognition.start();
  };
}
