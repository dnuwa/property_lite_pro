document.getElementById('display-map').onclick = openMap;
function openMap() {
    document.querySelector('.bg-modal-map').style.display = 'flex';
    console.log(document.querySelector('.bg-modal-map'));
};

document.querySelector('.close-map').onclick = close;
function close() {
    document.querySelector('.bg-modal-map').style.display = 'none';
};
