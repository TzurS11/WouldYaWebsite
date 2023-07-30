// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

// document.onkeydown = (e) => {
//   if (e.key == 123) {
//       e.preventDefault();
//   }
//   if (e.ctrlKey && e.shiftKey && e.key == 'I') {
//       e.preventDefault();
//   }
//   if (e.ctrlKey && e.shiftKey && e.key == 'C') {
//       e.preventDefault();
//   }
//   if (e.ctrlKey && e.shiftKey && e.key == 'J') {
//       e.preventDefault();
//   }
//   if (e.ctrlKey && e.key == 'U') {
//       e.preventDefault();
//   }
// };

// const devtools = {
//   isOpen: false,
//   orientation: undefined,
// };

// const threshold = 170;

// const emitEvent = (isOpen, orientation) => {
//   globalThis.dispatchEvent(
//     new globalThis.CustomEvent("devtoolschange", {
//       detail: {
//         isOpen,
//         orientation,
//       },
//     })
//   );
// };

// const main = ({ emitEvents = true } = {}) => {
//   const widthThreshold =
//     globalThis.outerWidth - globalThis.innerWidth > threshold;
//   const heightThreshold =
//     globalThis.outerHeight - globalThis.innerHeight > threshold;
//   const orientation = widthThreshold ? "vertical" : "horizontal";

//   if (
//     !(heightThreshold && widthThreshold) &&
//     ((globalThis.Firebug &&
//       globalThis.Firebug.chrome &&
//       globalThis.Firebug.chrome.isInitialized) ||
//       widthThreshold ||
//       heightThreshold)
//   ) {
//     if (
//       (!devtools.isOpen || devtools.orientation !== orientation) &&
//       emitEvents
//     ) {
//       emitEvent(true, orientation);
//     }

//     devtools.isOpen = true;
//     devtools.orientation = orientation;
//   } else {
//     if (devtools.isOpen && emitEvents) {
//       emitEvent(false, undefined);
//     }

//     devtools.isOpen = false;
//     devtools.orientation = undefined;
//   }
//   if (devtools.isOpen == true) {
//     document.body.innerHTML = "";
//     window.location.href = "https://www.discord.com";
//   }
// };

// main({ emitEvents: false });
// setInterval(main, 500);

let servercounttexts = document.getElementsByClassName("servercount");
for (let i = 0; i < servercounttexts.length; i++) {
  const item = servercounttexts.item(i);
  item.innerHTML = localStorage.getItem("servercount");
}
let questioncounttexts = document.getElementsByClassName("questionsAmount");
for (let i = 0; i < servercounttexts.length; i++) {
  const item = questioncounttexts.item(i);
  item.innerHTML = localStorage.getItem("questionamount");
}

function copyToClipboardAndPopup(text) {
  navigator.clipboard.writeText(text);
  document.getElementById(
    "floatmessageinner"
  ).innerHTML = `Copied command to clipboard (${text})`;
  document.getElementById("floatmessage").style.display = "";
  setTimeout(() => {
    document.getElementById("floatmessage").style.display = "none";
  }, 3000);
}

function alertPopup(text) {
  document.getElementById("floatmessageinner").innerHTML = text;
  document.getElementById("floatmessage").style.display = "";
  setTimeout(() => {
    document.getElementById("floatmessage").style.display = "none";
  }, 3000);
}
async function setstats() {
  let data = await fetch("http://164.132.158.214:8164/stats").then((res) =>
    res.json()
  );
  // console.log(data);
  if (data.error) {
    let servercounttexts = document.getElementsByClassName("servercount");
    for (let i = 0; i < servercounttexts.length; i++) {
      const item = servercounttexts.item(i);
      item.innerHTML = localStorage.getItem("servercount");
    }
    let questioncounttexts = document.getElementsByClassName("questionsAmount");
    for (let i = 0; i < servercounttexts.length; i++) {
      const item = questioncounttexts.item(i);
      item.innerHTML = localStorage.getItem("questionamount");
    }
    return;
  }
  let servercounttexts = document.getElementsByClassName("servercount");
  for (let i = 0; i < servercounttexts.length; i++) {
    const item = servercounttexts.item(i);
    item.innerHTML = data.servercount;
    localStorage.setItem("servercount", data.servercount);
  }
  let questioncounttexts = document.getElementsByClassName("questionsAmount");
  for (let i = 0; i < servercounttexts.length; i++) {
    const item = questioncounttexts.item(i);
    item.innerHTML = data.questionAmount;
    localStorage.setItem("questionamount", data.questionAmount);
  }
}

setstats();
