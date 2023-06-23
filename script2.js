function registerUser(email, password) {
  const users = loadUsersFromLocalStorage();

  if (!users[email]) {
    users[email] = { password: password };
    saveUsersToLocalStorage(users);
    return true;
  }

  return false;
}

function loginUser(email, password) {
  const users = loadUsersFromLocalStorage();

  if (users[email] && users[email].password === password) {
    return true;
  }

  return false;
}

function loadUsersFromLocalStorage() {
  const usersJSON = localStorage.getItem('users');
  return usersJSON ? JSON.parse(usersJSON) : {};
}

function saveUsersToLocalStorage(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function handleSignup(event) {
  event.preventDefault();

  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');

  const email = emailInput.value;
  const password = passwordInput.value;

  if (email && password) {
    const registrationSuccessful = registerUser(email, password);
    if (registrationSuccessful) {
      alert('Registration successful');
    } else {
      alert('User with this email already exists');
    }
  } else {
    alert('Please enter email and password');
  }
}

function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');

  const email = emailInput.value;
  const password = passwordInput.value;

  if (email && password) {
    const loginSuccessful = loginUser(email, password);
    if (loginSuccessful) {
      window.location.href = 'index.html';
    } else {
      alert('Invalid email or password');
    }
  } else {
    alert('Please enter email and password');
  }
}

document.addEventListener('DOMContentLoaded', () => { //чтобы обернуть код, который добавляет обработки событий
  const signupButton = document.getElementById('signupButton');
  if (signupButton) {
    signupButton.addEventListener('click', handleSignup);
  }

  const loginButton = document.getElementById('loginButton');
  if (loginButton) {
    loginButton.addEventListener('click', handleLogin);
  }
});