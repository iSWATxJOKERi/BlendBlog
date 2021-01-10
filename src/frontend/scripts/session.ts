const sessionCreator = (app: HTMLElement) => {
    //creates session container
    const sessionsContainer: HTMLElement = document.createElement('section');
    sessionsContainer.setAttribute('id', 'sessions-container');

    //creates login container
    const loginContainer: HTMLElement = document.createElement('div');
    loginContainer.setAttribute('id', 'login-container');

    //creates login form and appends to login container
    const username: HTMLElement = document.createElement('input');
    username.classList.add('username-input', 'session-input');
    username.setAttribute('placeholder', 'Username');
    const password: HTMLElement = document.createElement('input');
    password.classList.add('password-input', 'session-input');
    password.setAttribute('placeholder', 'Password');
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
    const fullname: HTMLElement = document.createElement('input');
    fullname.classList.add('fullname-input', 'session-input');
    fullname.setAttribute('placeholder', 'Fullname');
    const signup_user: HTMLElement = document.createElement('input');
    signup_user.classList.add('signup-user-input', 'session-input');
    signup_user.setAttribute('placeholder', 'Username');
    const passContainer: HTMLElement = document.createElement('div');
    passContainer.classList.add('pass-container');
    const signup_pass: HTMLElement = document.createElement('input');
    signup_pass.classList.add('signup-pass-input', 'session-input');
    signup_pass.setAttribute('placeholder', 'Password');
    const confirm_password: HTMLElement = document.createElement('input');
    confirm_password.classList.add('confirm-password-input', 'session-input');
    confirm_password.setAttribute('placeholder', 'Confirm Password');
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
    newAccount.onclick = () => { toggleForm('login') }
    signin.onclick = () => { toggleForm('signup') }
}

function toggleForm(field: string) {
    const login: HTMLElement = document.getElementById('login-container')!;
    const signup: HTMLElement = document.getElementById('signup-container')!;

    if(field === 'login') {
        login.style.display = "none";
        signup.style.display = "flex";
    } else {
        login.style.display = "flex";
        signup.style.display = "none";
    }
}

export default sessionCreator;