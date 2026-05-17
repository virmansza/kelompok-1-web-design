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



        // ==== ANIMASI COUNTER BERDASARKAN SCROLL (NATIVE) ====

// 1. Fungsi Utama untuk Menjalankan Perhitungan Angka
function jalankanCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '+';
    const speed = 100; // Mengatur durasi (100 langkah animasi)
    const inc = target / speed; // Besaran penambahan di setiap langkah
    
    let angkaSekarang = 0; // KUNCI SOLUSI: Menyimpan angka asli di memori, bukan membaca teks dari layar

    const updateCount = () => {
        angkaSekarang += inc;

        if (angkaSekarang < target) {
            // Tampilkan angka di layar dengan format ribuan Indonesia (menggunakan titik)
            counter.innerText = Math.ceil(angkaSekarang).toLocaleString('id-ID');
            setTimeout(updateCount, 15); // Jalankan ulang setiap 15 milidetik agar animasi mulus
        } else {
            // Jika sudah mencapai atau melewati target, stop dan beri simbol akhir (+ atau %)
            counter.innerText = target.toLocaleString('id-ID') + suffix;
        }
    };

    updateCount();
}

// 2. Fungsi Menggunakan Intersection Observer (Mendeteksi Scroll)
const opsiObserver = {
    root: null, // Menggunakan viewport / layar browser sebagai acuan
    threshold: 0.3 // Animasi baru akan berjalan jika 30% dari section statistik sudah muncul di layar
};

// Pastikan class ini sesuai dengan tag <section class="stats-section"> di HTML kamu
const sectionStatistik = document.querySelector('.stats-section');

const observerStatistik = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Jika bagian statistik sudah ter-scroll dan masuk ke dalam layar
        if (entry.isIntersecting) {
            const semuaCounter = entry.target.querySelectorAll('.counter');
            
            // Jalankan fungsi counter untuk masing-masing angka secara bersamaan
            semuaCounter.forEach(counter => jalankanCounter(counter));
            
            // KUNCI SCROLL: Berhenti mengamati section ini agar animasi tidak mengulang-ulang lagi 
            // setiap kali user melakukan scroll ke atas dan ke bawah
            observer.unobserve(entry.target);
        }
    });
}, opsiObserver);

// Perintahkan browser untuk mulai mengawasi section statistik
if (sectionStatistik) {
    observerStatistik.observe(sectionStatistik);
}