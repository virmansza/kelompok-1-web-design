// Script Slider
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



// Script Statistik
function jalankanCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '+';
    const speed = 100; // Mengatur durasi (100 langkah animasi)
    const inc = target / speed; // Besaran penambahan di setiap langkah
    
    let angkaSekarang = 0; 
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

    // Mendeteksi Scroll
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
            semuaCounter.forEach(counter => jalankanCounter(counter));
            observer.unobserve(entry.target);
        }
    });
}, opsiObserver);

if (sectionStatistik) {
    observerStatistik.observe(sectionStatistik);
}

// --- Script Slider Khusus Services (Layanan) ---
let indexLayanan = 0;

function geserLayanan(arah) {
    const track = document.getElementById('layananTrack');
    const slides = document.querySelectorAll('.service-slide-group');
    const totalSlides = slides.length;

    // Tambah atau kurangi index
    indexLayanan += arah;

    // Logika agar slider berputar (loop)
    if (indexLayanan >= totalSlides) {
        indexLayanan = 0; // Jika mentok kanan, kembali ke slide pertama
    } else if (indexLayanan < 0) {
        indexLayanan = totalSlides - 1; // Jika mentok kiri, pergi ke slide terakhir
    }

    // Geser elemen track menggunakan persentase
    track.style.transform = `translateX(-${indexLayanan * 100}%)`;
}
