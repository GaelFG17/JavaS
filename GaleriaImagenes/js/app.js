const modal = document.querySelector('.modal');
const modalImg = document.getElementById('imgGrande');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close');

document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target !== modalImg) {
        modal.style.display = 'none';
    }
});