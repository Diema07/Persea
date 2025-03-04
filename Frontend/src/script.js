const swiper = new Swiper('.swiper', { // Se usa '.swiper' en vez de '.slider-wrapper'
    loop: true,
    slidesPerView: 1, // Solo muestra un slide completo a la vez
    centeredSlides: true, // Asegura que los slides queden centrados
    spaceBetween: 0,
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Permite que los puntos sean clickeables
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3, // Opcional: controla cuántos slides se muestran a la vez
    spaceBetween: 10, // Opcional: añade espacio entre los slides
});
