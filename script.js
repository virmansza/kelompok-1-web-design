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

    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function goToSlide(index) {
    showSlide(index);
}

setInterval(() => {
    changeSlide(1);
}, 5000);


document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query === "") return;

        document.querySelectorAll(".search-highlight").forEach(el => {
            el.outerHTML = el.innerText;
        });

        const elemenTarget = document.querySelectorAll("h1, h2, h3, .about-content p, .service-card p, .news-desc, .news-title");
        let ditemukan = false;
        let diawaliScroll = false;

        for (let el of elemenTarget) {
            if (el.closest(".navbar") || el.closest(".main-footer")) continue;

            const textPlain = el.innerText.toLowerCase();

            if (textPlain.includes(query)) {
                const textAsli = el.innerText;
                const regex = new RegExp(`(${query})`, "gi");
                
                el.innerHTML = textAsli.replace(regex, `<span class="search-highlight" style="background-color: #ffeb3b; color: #000; padding: 2px; border-radius: 2px;">$1</span>`);
                
                if (!diawaliScroll) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                    diawaliScroll = true;
                }
                ditemukan = true;
            }
        }
    };

    if (searchBtn) {
        searchBtn.addEventListener("click", performSearch);
    }
    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                performSearch();
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const formKontak = document.getElementById("formKontak");
    
    if (formKontak) {
        formKontak.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const btnSubmit = this.querySelector(".btn-submit");
            
            const URL_APPS_SCRIPT = "https://script.google.com/a/macros/mhs.unsoed.ac.id/s/AKfycbyI_6I5jg4kgqpGmuuOe69b-6V7fKLN0-ikxJCoY42-xV_Li8J9H6kOXjC5_pMbmFs7Ug/exec"; 

            if (btnSubmit) {
                btnSubmit.disabled = true;
                btnSubmit.style.opacity = "0.7";
                btnSubmit.style.cursor = "not-allowed";
                btnSubmit.innerHTML = '<span>Sending...</span>';
            }

            const formData = new FormData(formKontak);

            fetch(URL_APPS_SCRIPT, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.result === "success") {
                    alert("Terima kasih! Keluhan atau pesan Anda telah berhasil kami terima dan dicatat di database.");
                    formKontak.reset();
                } else {
                    alert("Gagal mengirim pesan, terjadi masalah pada server database.");
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("Terjadi kesalahan jaringan saat mengirim data.");
            })
            .finally(() => {
                if (btnSubmit) {
                    btnSubmit.disabled = false;
                    btnSubmit.style.opacity = "1";
                    btnSubmit.style.cursor = "pointer";
                    btnSubmit.innerHTML = '<span>Send Now</span>';
                }
            });
        });
    }
});


function jalankanCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '+';
    const speed = 100;
    const inc = target / speed;
    
    let angkaSekarang = 0; 
    const updateCount = () => {
        angkaSekarang += inc;

        if (angkaSekarang < target) {
            counter.innerText = Math.ceil(angkaSekarang).toLocaleString('id-ID');
            setTimeout(updateCount, 15);
        } else {
            counter.innerText = target.toLocaleString('id-ID') + suffix;
        }
    };

    updateCount();
}

const opsiObserver = {
    root: null,
    threshold: 0.3
};

const sectionStatistik = document.querySelector('.stats-section');

const observerStatistik = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
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


let indexLayanan = 0;

function geserLayanan(arah) {
    const track = document.getElementById('layananTrack');
    const slidesLayanan = document.querySelectorAll('.service-slide-group');
    const totalSlides = slidesLayanan.length;

    indexLayanan += arah;

    if (indexLayanan >= totalSlides) {
        indexLayanan = 0;
    } else if (indexLayanan < 0) {
        indexLayanan = totalSlides - 1;
    }

    track.style.transform = `translateX(-${indexLayanan * 100}%)`;
}
