import { grammar, greetingsGrammar, actionsGrammar } from "./grammars.js";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

export class VoiceRecognitionConfig {
  constructor() {
    this.recognition = new SpeechRecognition();
    this.speechRecognitionList = new SpeechGrammarList();

    this.recognition.grammars = this.speechRecognitionList;
    this.recognition.continuous = true;
    this.recognition.lang = "pt-BR";
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.speechRecognitionList.addFromString(grammar, 1);
    this.speechRecognitionList.addFromString(greetingsGrammar, 1);
    this.speechRecognitionList.addFromString(actionsGrammar, 1);
  }

  getRecognition() {
    return this.recognition;
  }

  getSpeechRecognitionList() {
    return this.speechRecognitionList;
  }
}
