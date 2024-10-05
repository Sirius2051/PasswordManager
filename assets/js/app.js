var password = document.getElementById('password');
var length = document.getElementById('lenght');
var btn_generate = document.getElementById('generate');
var btn_save = document.getElementById('save');
var passwords = document.getElementById('passwords');

function generarPassword() {
    var longitud = length.value;
    var caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]=-!@#$%^&*()_+{}:<>?ñÑ";
    var passwordG = "";
    for (var i = 0; i < longitud; i++) {
        var randomIndex = Math.floor(Math.random() * caracteres.length);
        passwordG += caracteres[randomIndex];
    }
    password.value = passwordG
}
function copyContent (e) {
    console.log(e)
    navigator.clipboard.writeText(e.target.innerText)
    new Notification("Contrasena copiada! :)")
}
function updateList() {
    passwords.innerHTML = "";
    [...Array(localStorage.length).keys()].forEach((id) => {
        var credential = JSON.parse(localStorage.getItem(id));
        passwords.innerHTML += `
        <div class="password_card">
            <h3>Site: <a htrf="${credential.site}">${credential.site}</a></h3>
            <h3>Username: ${credential.username}</h3>
            <div class="row">
                <input type="password" id="_${id}" class="col-9" value="${credential.password}" redonly>
                <button class="col-3" data-id="_${id}" onclick="viewPassword(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
                </button>
            </div>
        </div>
        `;
    });
}
updateList();
btn_generate.addEventListener('click', () => {
    generarPassword();
});
btn_save.addEventListener('click', () => {
    var username = document.getElementById('user').value;
    var site = document.getElementById('site').value;
    if (username && site && password.value) {
        var data = {site: site, username: username, password: password.value } 
        localStorage.setItem(localStorage.length, JSON.stringify(data));
        updateList();
    } else {
        alert("Debe completar los campos de sitio y usuario");
    }
})

function viewPassword(element) {
    var inputPassword = document.getElementById(element.dataset.id);
    if (inputPassword.type == 'text') {
        inputPassword.type = 'password';
        element.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
            </svg>
        `;
    } else if (inputPassword.type == 'password') {
        inputPassword.type = 'text';
        element.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"/>
        </svg>
        `;
    }
}

var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

var fontSize = 20,
    columns = canvas.width / fontSize;

var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#99DC47';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .5) {
      drops[i] = 0;
    }
  }
}

setInterval(draw, 33);