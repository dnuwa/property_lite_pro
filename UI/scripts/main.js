// login a user
document.getElementById('login').onclick = open;
function open() {
    document.querySelector('.bg-modal').style.display = 'flex';
};

document.querySelector('.close').onclick = close;
function close() {
    document.querySelector('.bg-modal').style.display = 'none';
};

// dispaly signup when on login modal
document.getElementById('signup-link').onclick = toggleToSignup;
function toggleToSignup() {
    document.querySelector('.bg-modal').style.display = 'none';
    document.querySelector('.bg-modal-signup').style.display = 'flex';
}

// signup a user
document.getElementById('signup').onclick = openSignup;
function openSignup() {
    document.querySelector('.bg-modal-signup').style.display = 'flex';
};

document.querySelector('.close-signup').onclick = closeSignup;
function closeSignup() {
    document.querySelector('.bg-modal-signup').style.display = 'none';
};

// dispaly login when on signup modal
document.getElementById('login-link').onclick = toggleToLogin;
function toggleToLogin() {
    document.querySelector('.bg-modal-signup').style.display = 'none';
    document.querySelector('.bg-modal').style.display = 'flex';
}

// posting an advert
document.getElementById('advertise').onclick = openAdvertForm;
function openAdvertForm() {
    document.querySelector('.bg-modal-advert').style.display = 'flex';
};

document.querySelector('.close-advert').onclick = closeAdvertForm;
function closeAdvertForm() {
    document.querySelector('.bg-modal-advert').style.display = 'none';
};

