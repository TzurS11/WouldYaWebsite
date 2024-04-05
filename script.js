fetch("https://api.wouldya.xyz/bot/stats")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let questionamountDivs = document.getElementsByClassName("question-amount");
    for (let i = 0; i < questionamountDivs.length; i++) {
      const element = questionamountDivs[i];
      element.innerText = data.questionAmount;
    }
    let serveramount = document.getElementsByClassName("server-amount");
    for (let i = 0; i < serveramount.length; i++) {
      const element = serveramount[i];
      element.innerText = "(" + data.servercount + ")";
    }
  });
