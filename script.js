document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.onkeydown = (e) => {
  if (e.key == 123) {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == "I") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == "C") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == "J") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.key == "U") {
    e.preventDefault();
  }
};

function getScrollPercent() {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
}

function lerp(a, b, alpha) {
  return a + alpha * (b - a);
}
document.body.style.backgroundSize = `2em 2em`;
window.onscroll = function (e) {
  let opacityChangeElements = document.getElementsByClassName("scroll-opacity");
  for (let i = 0; i < opacityChangeElements.length; i++) {
    opacityChangeElements.item(i).style.transform = `rotate3d(1,0,0,${lerp(
      0,
      90,
      getScrollPercent()
    )}deg)`;
    opacityChangeElements.item(i).style.top = `${lerp(
      0,
      -1 * opacityChangeElements.item(i).offsetHeight * 0.5,
      getScrollPercent()
    )}px`;
    opacityChangeElements.item(i).style.opacity = lerp(
      1,
      0,
      getScrollPercent() * 2
    );
    if (opacityChangeElements.item(i).style.opacity == 0) {
      opacityChangeElements.item(i).style.display = "none";
    } else {
      opacityChangeElements.item(i).style.display = "block";
    }
  }
  let backgroundSize = lerp(2, 4, getScrollPercent());
  document.body.style.backgroundSize = `${backgroundSize}em ${backgroundSize}em`;
};

let servercounttexts = document.getElementsByClassName("servercount");
for (let i = 0; i < servercounttexts.length; i++) {
  const item = servercounttexts.item(i);
  item.innerHTML = localStorage.getItem("servercount");
}
let questioncounttexts = document.getElementsByClassName("questionsAmount");
if (questioncounttexts.length > 0) {
  for (let i = 0; i < servercounttexts.length; i++) {
    const item = questioncounttexts.item(i);
    item.innerHTML = localStorage.getItem("questionamount");
  }
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
  await fetch("https://api.wouldya.xyz/bot/stats")
    .then(async (res) => {
      let botStatus = document.getElementsByClassName("bot-status");
      for (let i = 0; i < botStatus.length; i++) {
        let item = botStatus.item(i);
        item.innerHTML =
          "<img src='assets/online.png'class='status-icon'>Online";
        item.style.color = "#00c048";
      }
      const data = await res.json();
      if (data.error) {
        let servercounttexts = document.getElementsByClassName("servercount");
        for (let i = 0; i < servercounttexts.length; i++) {
          const item = servercounttexts.item(i);
          item.innerHTML = localStorage.getItem("servercount");
        }
        let questioncounttexts =
          document.getElementsByClassName("questionsAmount");
        if (questioncounttexts > 0) {
          for (let i = 0; i < servercounttexts.length; i++) {
            const item = questioncounttexts.item(i);
            item.innerHTML = localStorage.getItem("questionamount");
          }
        }

        return;
      }
      let servercounttexts = document.getElementsByClassName("servercount");
      for (let i = 0; i < servercounttexts.length; i++) {
        const item = servercounttexts.item(i);
        item.innerHTML = data.servercount;
        localStorage.setItem("servercount", data.servercount);
      }
      let questioncounttexts =
        document.getElementsByClassName("questionsAmount");
      for (let i = 0; i < questioncounttexts.length; i++) {
        const item = questioncounttexts.item(i);
        item.innerHTML = data.questionAmount;
        localStorage.setItem("questionamount", data.questionAmount);
      }
    })
    .catch((e) => {
      let botStatus = document.getElementsByClassName("bot-status");
      for (let i = 0; i < botStatus.length; i++) {
        let item = botStatus.item(i);
        item.innerHTML =
          "<img src='assets/offline.png'class='status-icon'>Offline";
        item.style.color = "#de0000";
      }
    });
}

setstats();
