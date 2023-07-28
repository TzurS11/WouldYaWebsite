let index = 3000;
document.getElementById("incrementQuestions").style.fontFamily = "Arial";
document.getElementById("incrementQuestions").style.fontStyle = "italic";
setInterval(() => {
  document.getElementById("incrementQuestions").innerHTML = index++ + "+";
}, 10);


function copyToClipboardAndPopup(text) {
  navigator.clipboard.writeText(text);
  document.getElementById("floatmessageinner").innerHTML = `Copied command to clipboard (${text})`
  document.getElementById("floatmessage").style.display = "";
  setTimeout(() => {
    document.getElementById("floatmessage").style.display = "none";
  }, 3000);
}

function alertPopup(text){
    document.getElementById("floatmessageinner").innerHTML = text
    document.getElementById("floatmessage").style.display = "";
  setTimeout(() => {
    document.getElementById("floatmessage").style.display = "none";
  }, 3000);
}


const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

for (let i = 0; i < 200; i++) {
  let div = document.getElementById("background");
  let bubble = document.createElement("div");
  let randSize = `${getRandom(100, 200)}px`;
  bubble.style.width = randSize;
  bubble.style.height = randSize;
  bubble.className = "bubble";
  bubble.style.transform = `rotate(${getRandom(0, 360)}deg)`;
  bubble.style.position = "fixed";
  bubble.style.left = getRandom(0, 100) + "%";
  bubble.style.top = getRandom(0, 100) + "%";
  bubble.style.backgroundColor = "#000000";
  bubble.style.opacity = "0.1"
  div.appendChild(bubble);
}
