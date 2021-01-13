import { login, setAuthToken, signup } from "../util/session_api_util";
import { home } from "./home";
import jwt_decode from 'jwt-decode';
import { clearInputs, removeParentAndChildren } from "../util/misc_util";

export const sessionCreator = (app: HTMLElement) => {
    //creates session container
    const sessionsContainer: HTMLElement = document.createElement('section');
    sessionsContainer.setAttribute('id', 'sessions-container');

    //creates login container
    const loginContainer: HTMLElement = document.createElement('div');
    loginContainer.setAttribute('id', 'login-container');

    //creates login form and appends to login container
    const username: HTMLInputElement = document.createElement('input');
    username.classList.add('username-input', 'session-input');
    username.setAttribute('placeholder', 'Username');
    const password: HTMLInputElement = document.createElement('input');
    password.classList.add('password-input', 'session-input');
    password.setAttribute('placeholder', 'Password');
    password.setAttribute('type', 'password');
    const newAccount: HTMLElement = document.createElement('span');
    newAccount.classList.add('create-account');
    newAccount.innerHTML = 'Create account instead'
    const loginBtn: HTMLElement = document.createElement('span');
    loginBtn.classList.add('login-btn', 'btn');
    loginBtn.innerHTML = 'Log In';
    loginContainer.appendChild(username);
    loginContainer.appendChild(password);
    loginContainer.appendChild(newAccount);
    loginContainer.appendChild(loginBtn);

    //creates signup container
    const signupContainer: HTMLElement = document.createElement('div');
    signupContainer.setAttribute('id', 'signup-container');

    //creates signup form and appends to signup container
    const fullname: HTMLInputElement = document.createElement('input');
    fullname.classList.add('fullname-input', 'session-input');
    fullname.setAttribute('placeholder', 'Fullname');
    const signup_user: HTMLInputElement = document.createElement('input');
    signup_user.classList.add('signup-user-input', 'session-input');
    signup_user.setAttribute('placeholder', 'Username');
    const passContainer: HTMLElement = document.createElement('div');
    passContainer.classList.add('pass-container');
    const signup_pass: HTMLInputElement = document.createElement('input');
    signup_pass.setAttribute('type', 'password');
    signup_pass.classList.add('signup-pass-input', 'session-input');
    signup_pass.setAttribute('placeholder', 'Password');
    const confirm_password: HTMLInputElement = document.createElement('input');
    confirm_password.classList.add('confirm-password-input', 'session-input');
    confirm_password.setAttribute('placeholder', 'Confirm Password');
    confirm_password.setAttribute('type', 'password');
    const signin: HTMLElement = document.createElement('span');
    signin.classList.add('signin');
    signin.innerHTML = 'Back to log in'
    const signupBtn: HTMLElement = document.createElement('span');
    signupBtn.classList.add('signup-btn', 'btn');
    signupBtn.innerHTML = 'Create my account'
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
    sessionsContainer.appendChild(signupContainer)
    app.appendChild(sessionsContainer);

    //add onclick's to switch forms
    newAccount.onclick = () => { toggleForm('login') };
    signin.onclick = () => { toggleForm('signup') };
    loginBtn.onclick = () => { signinUser() };
    signupBtn.onclick = () => { signupUser() };
}

function toggleForm(field: string) {
    const login: HTMLElement = document.getElementById('login-container')!;
    const signup: HTMLElement = document.getElementById('signup-container')!;
    
    const b1: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName('session-input') as HTMLCollectionOf<HTMLInputElement>;
    clearInputs(b1);
    const ul = document.getElementsByClassName('errors')[0] as HTMLUListElement;
    if(ul) {
        removeParentAndChildren(ul);
    }
    const ul2 = document.getElementsByClassName('signup-errors')[0] as HTMLUListElement;
    if(ul2) {
        removeParentAndChildren(ul2);
    }
    if(field === 'login') {
        login.style.display = "none";
        signup.style.display = "flex";
    } else {
        login.style.display = "flex";
        signup.style.display = "none";
    }
}

function signinUser() {
    const un = document.getElementsByClassName('username-input')[0] as HTMLInputElement;
    const pw = document.getElementsByClassName('password-input')[0] as HTMLInputElement;
    const user = {
        username: un.value,
        password: pw.value
    }

    login(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        console.log(decoded);
        document.getElementById('sessions-container')!.style.display = "none";
        const app: HTMLElement = document.getElementById('application')!;
        home(app);
    }, errors => {
        const ul = document.getElementsByClassName('errors')[0] as HTMLUListElement;
        if(ul) {
            removeParentAndChildren(ul);
        }
        // console.log(errors.response.data);
        if(errors.response.data.valid === false) {
            delete errors.response.data['valid']
        }
        let arr = Object.values(errors.response.data);
        let loginContainer: HTMLElement = document.getElementById('login-container')!;
        const mistake: HTMLUListElement = document.createElement('ul');
        mistake.classList.add('errors');
        for(let i: number = 0; i < arr.length; i++) {
            const li: HTMLLIElement = document.createElement("li");
            li.classList.add('list-error');
            li.innerHTML = `${ arr[i] }`;
            mistake.appendChild(li);
        }
        loginContainer.appendChild(mistake);
    })
}

function signupUser() {
    const fn = document.getElementsByClassName('fullname-input')[0] as HTMLInputElement;
    const un = document.getElementsByClassName('signup-user-input')[0] as HTMLInputElement;
    const pw = document.getElementsByClassName('signup-pass-input')[0] as HTMLInputElement;
    const cp = document.getElementsByClassName('confirm-password-input')[0] as HTMLInputElement;

    const user = {
        fullname: fn.value,
        username: un.value,
        password: pw.value,
        password2: cp.value
    }

    signup(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        console.log(decoded);
        document.getElementById('sessions-container')!.style.display = "none";
        const app: HTMLElement = document.getElementById('application')!;
        home(app);
    }, errors => {
        const ul = document.getElementsByClassName('signup-errors')[0] as HTMLUListElement;
        if(ul) {
            removeParentAndChildren(ul);
        }
        console.log(errors.response.data);
        if(errors.response.data.valid === false) {
            delete errors.response.data['valid']
        }
        let arr = Object.values(errors.response.data);
        let signupContainer: HTMLElement = document.getElementById('signup-container')!;
        const mistake: HTMLUListElement = document.createElement('ul');
        mistake.classList.add('signup-errors');
        for(let i: number = 0; i < arr.length; i++) {
            const li: HTMLLIElement = document.createElement("li");
            li.classList.add('signup-list-error');
            li.innerHTML = `${ arr[i] }`;
            mistake.appendChild(li);
        }
        signupContainer.appendChild(mistake);
    })
}

