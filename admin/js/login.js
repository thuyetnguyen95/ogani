let admin = {
  username: 'admin',
  password: 123456,
}


function handleLogin() {
  let username = $('#username').val().trim();
  let password = $('#password').val().trim();

  if (username == admin.username && password == admin.password) {
    let user = {username, password};
    localStorage.setItem('user', JSON.stringify(user))

    window.location.href = '/admin/pages/index.html';
  } else {
    localStorage.setItem('user', null)
    window.location.href = "/admin/pages/login.html"
  }
}
