document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.remove('bg-transparent');
            header.classList.add('bg-white', 'shadow');
        } else {
            header.classList.remove('bg-white', 'shadow');
            header.classList.add('bg-transparent');
        }
    });
});