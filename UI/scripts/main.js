// login a user
document.getElementById('login').onclick = open;
function open() {
    document.querySelector('.bg-modal').style.display = 'flex';
};

document.querySelector('.close').onclick = close;
function close() {
    document.querySelector('.bg-modal').style.display = 'none';
};

//
document.getElementById('signup').onclick = openSignup;
function openSignup() {
    document.querySelector('.bg-modal-signup').style.display = 'flex';
};

document.querySelector('.close-signup').onclick = closeSignup;
function closeSignup() {
    document.querySelector('.bg-modal-signup').style.display = 'none';
};

// posting an advert
document.getElementById('advertise').onclick = openAdvertForm;
function openAdvertForm() {
    document.querySelector('.bg-modal-advert').style.display = 'flex';
};

document.querySelector('.close-advert').onclick = closeAdvertForm;
function closeAdvertForm() {
    document.querySelector('.bg-modal-advert').style.display = 'none';
};

// update advert
document.getElementById('edit').onclick = openAdEdit;

function openAdEdit() {
    document.querySelector('.bg-modal-edit').style.display = 'flex';
};

document.querySelector('.close-edit').onclick = closeAdEdit;
function closeAdEdit() {
    document.querySelector('.bg-modal-edit').style.display = 'none';
};
