// colors per input
let no_input_rgb = "rgb(240, 240, 245)";
let instantly_rgb = "rgb(20, 20, 35)";
let terrible_rgb = "rgb(255, 156, 156)";
let bad_rgb = "rgb(252, 197, 131)";
let average_rgb = "rgb(255, 252, 168)";
let decent_rgb = "rgb(181, 255, 202)";
let really_good_rgb = "rgb(219, 225, 255)";
let perfect_rgb = "rgb(240, 193, 247)"

function toggleVisibility() {
  let x = document.getElementById("passwordTextbox");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function toggleBlur() {
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');
  let infobox = document.getElementById('infobox');
  infobox.classList.toggle('active');
}




let passwordResult = document.getElementById("passwordResult");
let passwordResultSubtitle = document.getElementById("passwordResultSubtitle");
let checkboxLabel = document.getElementById("checkboxLabel");
let passwordResultTexts = document.getElementsByClassName("result-text");

let mellt = new Mellt();

function checkPassword(password) {
  error = null;

  checkboxLabel.style.color = "black"
  for (var index = 0; index < passwordResultTexts.length; index++) {
    passwordResultTexts[index].style.color = "black";
  }

  

  if (password) {

    let daysToCrack = mellt.CheckPassword(password);
    if (daysToCrack < 0) {
      document.body.style.backgroundColor = instantly_rgb;
      passwordResult.textContent = "Instantly";
      passwordResultSubtitle.textContent = "TERRIBLE. You're using one of the most common passwords!";

      for (var index = 0; index < passwordResultTexts.length; index++) {
        passwordResultTexts[index].style.color = "white"
        checkboxLabel.style.color = "white"
      }

      return;
    }

    else if (daysToCrack <= 2) {
      document.body.style.backgroundColor = terrible_rgb;
      passwordResult.textContent = "In " + daysToCrack + " day" + (daysToCrack!=1?'s':"")
      passwordResultSubtitle.textContent = "Terrible password. Nothing else to say other than that.";
    }
    else if (daysToCrack <= 7) {
      document.body.style.backgroundColor = bad_rgb;
      passwordResult.textContent = "In " + daysToCrack + " day" + (daysToCrack!=1?'s':"")
      passwordResultSubtitle.textContent = "Still pretty bad. Consider using some more variety!";
      
    }
    else if (daysToCrack <= 30) {
      document.body.style.backgroundColor = average_rgb;
      passwordResult.textContent = "In " + daysToCrack + " day" + (daysToCrack!=1?'s':"")
      
    }
    else if (daysToCrack <= 365) {
      document.body.style.backgroundColor = decent_rgb;
      passwordResult.textContent = "In " + daysToCrack + " day" + (daysToCrack!=1?'s':"")
    }
    else if (daysToCrack > 1000000000) {
      document.body.style.backgroundColor = perfect_rgb;


      let years = Number(Math.round(daysToCrack / 365 * 10) / 10).toExponential()

      passwordResult.textContent = "In over " + years + " years"
      passwordResultSubtitle.textContent = "Wow, this is a GREAT password! 10/10.";
    }
    else {
      document.body.style.backgroundColor = really_good_rgb;
      let years = Math.round(daysToCrack / 365 * 10) / 10;

      if (years>1000000000) {
        years = (Math.round(years/1000000000*10)/10)+' billion'
      }

      if (years>1000000) {
        years = (Math.round(years/1000000*10)/10)+' million'
      }
      if (years>1000) {
        years = (Math.round(years/1000))+' thousand'
      }

      passwordResult.textContent = "In " + years + " years"
      passwordResultSubtitle.textContent = "Great! This password will protect your account from hackers very well.";
    }
  }
  else {
    document.body.style.backgroundColor = no_input_rgb;
    passwordResult.textContent = "Never?"
    passwordResultSubtitle.textContent = "Input a password to see!";
  }

  
}
