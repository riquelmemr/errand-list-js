const form = document.querySelector('#form-signup');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;
  const validate = validateAccount(email, password, confirmPassword);

  if (validate) {
    saveAccount({
      email: email,
      password: password,
      tasks: []
    })

    alert("Sua conta foi criada com sucesso!");
    window.location.href = "index.html";
  }
})

function validateAccount(email, password, confirmPassword) {
  const alreadyHaveAnAccount = localStorage.getItem(email);

  if (alreadyHaveAnAccount) {
    alert("E-mail já utilizado. Tente um outro e-mail.");
    return false;
  }

  if (email < 5) {
    alert("Preencha o campo com um e-mail válido.");
    return false;
  }

  if (password.length < 6) {
    alert('Crie um senha com no mínimo 6 dígitos.');
    return false;
  }

  if (password !== confirmPassword) {
    alert('Suas senhas devem ser iguais!');
    return false;
  }

  return true;
}

function saveAccount(user) {
  localStorage.setItem(user.email, JSON.stringify(user));
}