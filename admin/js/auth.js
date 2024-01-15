let admin = {
  username: 'admin',
  password: 123456,
}

let user = localStorage.getItem('user');
user = JSON.parse(user || null);

if (!user || user.username != admin.username || user.password != admin.password) {
  window.location.href = "/admin/pages/login.html"
}
