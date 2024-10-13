import React, { useState, useEffect } from "react";
import "./Secpage.css";
import bg from "./IMAGES/BGIMG.jpg";
import mobbg from "./IMAGES/mobgimg.jpg";
import { Link } from "react-router-dom";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [language, setLanguage] = useState("en-US");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = language;

      speechRecognition.onstart = () => {
        setIsListening(true);
      };

      speechRecognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          }
        }
        setText((prevText) => prevText + finalTranscript);
      };

      speechRecognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      speechRecognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(speechRecognition);
    } else {
      console.error("Web Speech API is not supported in this browser.");
    }
  }, [language]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div>
      <div className="speech-to-text-container">
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="en-US">English (US)</option>
          <option value="hi-IN">Hindi</option>
          <option value="ta-IN">Tamil</option>
        </select>
        <button onClick={isListening ? stopListening : startListening}>
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
        <p>{text}</p>
      </div>
    </div>
  );
};

function Secpage() {
  return (
    <div>
      <header>
        <div id="headcont" class="container-fluid pt-3 pb-3">
          <div class="row h-100 d-flex justify-content-center align-items-center">
            <div
              id="head1"
              class="col-6 d-flex justify-content-start align-items-start"
            >
              HEALTHCARE AI
            </div>

            <div class="col-6 d-flex justify-content-end align-items-end">
              <Link to="/Login">
                <a>
                  <i id="head2" class="fa-solid fa-user"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div class="container-fluid">
          <div class="row">
            <div id="mainbg" class="col">
              <input
                id="search-input"
                type="search"
                placeholder="Ask me anything..."
              />
              <i id="mic-btn" class="fa-solid fa-microphone"></i>
              <label for="language"></label>
              <select id="language">
                <option value="en-IN">English</option>
                <option value="hi-IN">Hindi</option>
                <option value="ta-IN">Tamil</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Secpage;
