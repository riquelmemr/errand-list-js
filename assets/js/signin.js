const form = document.querySelector('#form-signin');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const account = getAccount(email);
  const validate = haveAnAccount(account, password);

  if (validate) {
    saveAccountInSession(email);
    window.location.href = "errands.html";
  }
})

function haveAnAccount(account, password) {
  if (!account) {
    return alert("Ops! Verifique sua senha ou email e tente novamente.");
  }

  if (account) {
    if (account.password != password) {
      return alert("Ops! Sua senha está errada, tente novamente.");
    }
  }

  return true;
}

function getAccount(email) {
  const account = localStorage.getItem(email);
  if (account) return JSON.parse(account);

  return "";
}

function saveAccountInSession(email) {
  sessionStorage.setItem("logged", email);
}