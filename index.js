// let speech= new SpeechSynthesisUtterance();
// let voices =[];
// let voiceSelect = document.querySelector(".select");
// window.speechSynthesis.onvoiceschanged=()=>{
//     voices=window.speechSynthesis.getVoices();
//     speech.voice=voices[0];
//     voices.forEach((voice,i) => (voiceSelect.options[i]=new Option(voice.name,i)))
// }
// voiceSelect.addEventListener("change",()=>{
//     speech.voice= voices[voiceSelect.value];
// })
// document.querySelector("button").addEventListener("click",()=>{
//     speech.text=document.querySelector("textarea").value;
//     window.speechSynthesis.speak(speech);
// })


let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector(".select");

function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    // Clear existing options
    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    
    if (voices.length > 0) {
        speech.voice = voices[0];
    }
}

// Some browsers delay voice loading, so use both immediately and onvoiceschanged
populateVoices();
if (typeof speechSynthesis.onvoiceschanged !== "undefined") {
    speechSynthesis.onvoiceschanged = populateVoices;
}

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
