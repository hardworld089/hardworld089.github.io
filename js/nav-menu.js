const ham = document.querySelector('.ham');
const enlaces = document.querySelector('.menu');

ham.addEventListener('click',()=>{
    enlaces.classList.toggle('activado');
});