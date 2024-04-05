fetch("https://api.wouldya.xyz/bot/stats")
  .then((res) => {
    res.json();
  })
  .then((data) => {
    let questionamount = document.getElementsByClassName("question-amount");
    for (let i = 0; i < questionamount.length; i++) {
      const element = questionamount[i];
      element.innerText = data.questionAmount;
    }
    let serveramount = document.getElementsByClassName("server-amount");
    for (let i = 0; i < serveramount.length; i++) {
      const element = serveramount[i];
      element.innerText = "(" + data.servercount + ")";
    }
  });
