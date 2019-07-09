// update advert
document.getElementById('edit').onclick = openAdEdit;

function openAdEdit() {
    document.querySelector('.bg-modal-edit').style.display = 'flex';
};

document.querySelector('.close-edit').onclick = closeAdEdit;
function closeAdEdit() {
    document.querySelector('.bg-modal-edit').style.display = 'none';
};
