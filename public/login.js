console.log('Login script loaded');

const clicks = () => {
  const allUsers = JSON.parse(localStorage.getItem('bottle')) || [];
  const lmail = logEmail.value.trim();
  const lpword = logPassword.value.trim();

  const matchedUser = allUsers.find(user => user.mail === lmail && user.pword === lpword);

  if (matchedUser) {
    localStorage.setItem('retrive', JSON.stringify(matchedUser));
    show.innerHTML = `Welcome back ${matchedUser.uname} 💘💘💘`;
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  } else {
    show.innerHTML = `Invalid login credentials 💘💘💘`;
    setTimeout(() => (show.innerHTML = ''), 2000);
  }
};

const signIn = () => window.location.href = 'index.html';

window.clicks = clicks;
window.signIn = signIn;
