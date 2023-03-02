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
    return alert("E-mail já utilizado. Tente um outro e-mail.");
  }

  if (email < 5) {
    return alert("Preencha o campo com um e-mail válido.");
  }

  if (password.length < 6) {
    return alert('Crie um senha com no mínimo 6 dígitos.');
  }

  if (password !== confirmPassword) {
    return alert('Suas senhas devem ser iguais!');
  }

  return true;
}

function saveAccount(user) {
  localStorage.setItem(user.email, JSON.stringify(user));
}