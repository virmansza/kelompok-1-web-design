let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');

        function showSlide(index) {
            if (index >= slides.length) {
                currentSlideIndex = 0;
            } else if (index < 0) {
                currentSlideIndex = slides.length - 1;
            } else {
                currentSlideIndex = index;
            }

            // Hapus class 'active' dari semua gambar dan indikator
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));

            // Tambahkan class 'active' HANYA pada gambar dan indikator yang dipilih
            slides[currentSlideIndex].classList.add('active');
            indicators[currentSlideIndex].classList.add('active');
        }

        // Fungsi yang dipanggil saat tombol panah < atau > ditekan
        function changeSlide(direction) {
            showSlide(currentSlideIndex + direction);
        }

        // Fungsi yang dipanggil saat garis indikator di bawah ditekan
        function goToSlide(index) {
            showSlide(index);
        }

        setInterval(() => {
            changeSlide(1);
        }, 5000); // 5000 milidetik = 5 detik