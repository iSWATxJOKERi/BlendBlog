"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCreator = void 0;
const session_api_util_1 = require("../util/session_api_util");
const home_1 = require("./home");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const sessionCreator = (app) => {
    //creates session container
    const sessionsContainer = document.createElement('section');
    sessionsContainer.setAttribute('id', 'sessions-container');
    //creates login container
    const loginContainer = document.createElement('div');
    loginContainer.setAttribute('id', 'login-container');
    //creates login form and appends to login container
    const username = document.createElement('input');
    username.classList.add('username-input', 'session-input');
    username.setAttribute('placeholder', 'Username');
    const password = document.createElement('input');
    password.classList.add('password-input', 'session-input');
    password.setAttribute('placeholder', 'Password');
    password.setAttribute('type', 'password');
    const newAccount = document.createElement('span');
    newAccount.classList.add('create-account');
    newAccount.innerHTML = 'Create account instead';
    const loginBtn = document.createElement('span');
    loginBtn.classList.add('login-btn', 'btn');
    loginBtn.innerHTML = 'Log In';
    loginContainer.appendChild(username);
    loginContainer.appendChild(password);
    loginContainer.appendChild(newAccount);
    loginContainer.appendChild(loginBtn);
    //creates signup container
    const signupContainer = document.createElement('div');
    signupContainer.setAttribute('id', 'signup-container');
    //creates signup form and appends to signup container
    const fullname = document.createElement('input');
    fullname.classList.add('fullname-input', 'session-input');
    fullname.setAttribute('placeholder', 'Fullname');
    const signup_user = document.createElement('input');
    signup_user.classList.add('signup-user-input', 'session-input');
    signup_user.setAttribute('placeholder', 'Username');
    const passContainer = document.createElement('div');
    passContainer.classList.add('pass-container');
    const signup_pass = document.createElement('input');
    signup_pass.classList.add('signup-pass-input', 'session-input');
    signup_pass.setAttribute('placeholder', 'Password');
    const confirm_password = document.createElement('input');
    confirm_password.classList.add('confirm-password-input', 'session-input');
    confirm_password.setAttribute('placeholder', 'Confirm Password');
    const signin = document.createElement('span');
    signin.classList.add('signin');
    signin.innerHTML = 'Back to log in';
    const signupBtn = document.createElement('span');
    signupBtn.classList.add('signup-btn', 'btn');
    signupBtn.innerHTML = 'Create my account';
    passContainer.appendChild(signup_pass);
    passContainer.appendChild(confirm_password);
    signupContainer.appendChild(fullname);
    signupContainer.appendChild(signup_user);
    signupContainer.appendChild(passContainer);
    signupContainer.appendChild(signin);
    signupContainer.appendChild(signupBtn);
    signupContainer.style.display = "none";
    //appends elements to application
    sessionsContainer.appendChild(loginContainer);
    sessionsContainer.appendChild(signupContainer);
    app.appendChild(sessionsContainer);
    //add onclick's to switch forms
    newAccount.onclick = () => { toggleForm('login'); };
    signin.onclick = () => { toggleForm('signup'); };
    loginBtn.onclick = () => { signinUser(); };
};
exports.sessionCreator = sessionCreator;
function toggleForm(field) {
    const login = document.getElementById('login-container');
    const signup = document.getElementById('signup-container');
    if (field === 'login') {
        login.style.display = "none";
        signup.style.display = "flex";
    }
    else {
        login.style.display = "flex";
        signup.style.display = "none";
    }
}
function signinUser() {
    const un = document.getElementsByClassName('username-input')[0];
    const pw = document.getElementsByClassName('password-input')[0];
    const user = {
        username: un.value,
        password: pw.value
    };
    session_api_util_1.login(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        session_api_util_1.setAuthToken(token);
        const decoded = jwt_decode_1.default(token);
        console.log(decoded);
        document.getElementById('sessions-container').style.display = "none";
        const app = document.getElementById('application');
        home_1.home(app);
    });
}
