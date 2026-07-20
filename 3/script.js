
        // Đặt ngày giờ tổ chức lễ cưới (Năm, Tháng - 1, Ngày, Giờ, Phút)
        // Tháng trong Javascript bắt đầu từ 0 (0 = Tháng 1, 11 = Tháng 12)
        // Nên tháng 12 sẽ là số 11.
        const weddingDate = new Date(2026, 4, 2, 11, 0, 0).getTime();

        const countdownFunction = setInterval(function() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            // Tính toán ngày, giờ, phút, giây
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Gắn số vào các ô HTML
            document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

            // Nếu qua ngày cưới thì dừng bộ đếm
            if (distance < 0) {
                clearInterval(countdownFunction);
                document.getElementById("days").innerHTML = "00";
                document.getElementById("hours").innerHTML = "00";
                document.getElementById("minutes").innerHTML = "00";
                document.getElementById("seconds").innerHTML = "00";
            }
        }, 1000);



document.addEventListener("DOMContentLoaded", function() {
    // Lấy các phần tử cần thiết
    const attendYes = document.getElementById("attendYes");
    const attendNo = document.getElementById("attendNo");
    const extraInfo = document.getElementById("extra-info");

    // Hàm kiểm tra và ẩn/hiện nội dung
    function toggleExtraInfo() {
        if (attendNo.checked) {
            extraInfo.style.display = "none"; // Ẩn đi nếu chọn "Tôi bận"
        } else {
            extraInfo.style.display = "block"; // Hiện lại nếu chọn "Có, tham dự"
        }
    }

    // Gắn sự kiện khi thay đổi lựa chọn
    attendYes.addEventListener("change", toggleExtraInfo);
    attendNo.addEventListener("change", toggleExtraInfo);

    // Chạy thử lần đầu khi tải trang để set trạng thái đúng chuẩn
    toggleExtraInfo();
});

document.addEventListener("DOMContentLoaded", function() {
    // 1. Lấy các phần tử cần thiết
    const giftContainer = document.getElementById("giftContainer");
    const giftModal = document.getElementById("giftModal");
    const closeBtn = document.getElementById("closeGiftModal");
    const copyBtns = document.querySelectorAll(".copy-btn");

    // 2. Định nghĩa hàm lắc (Wiggle) và đặt vị trí gốc là center
    if (giftContainer) {
        giftContainer.style.transformOrigin = "center";
        
        // Cần đảm bảo file CSS đã có phần này để hiệu ứng lắc hoạt động
        const giftIcon = giftContainer.querySelector(".gift-icon");
        if (giftIcon) {
            giftIcon.style.transformOrigin = "center";
            giftIcon.style.display = "inline-block";
        }
    }

    // 3. Xử lý mở modal khi nhấp vào hộp quà
    if (giftContainer && giftModal) {
        giftContainer.addEventListener("click", function() {
            giftModal.classList.add("active");
            
            // Có thể thêm một hiệu ứng lắc mạnh một lần khi nhấp nếu thích
            const giftIcon = giftContainer.querySelector(".gift-icon");
            if (giftIcon) {
                giftIcon.style.animationName = "giftWiggleStrong"; // Có thể thêm một animation mới
            }
        });
    }

    // 4. Xử lý đóng modal khi nhấp vào nút "Đóng" bên ngoài
    if (closeBtn && giftModal) {
        closeBtn.addEventListener("click", function() {
            giftModal.classList.remove("active");
        });
    }

    // 5. Thêm tính năng sao chép số tài khoản khi nhấp vào nút
    if (copyBtns) {
        copyBtns.forEach(function(btn) {
            btn.addEventListener("click", function() {
                // Lấy ID của phần tử chứa số tài khoản cần sao chép
                const accountNumberId = this.getAttribute("data-copy-id");
                const accountNumberEl = document.getElementById(accountNumberId);
                
                if (accountNumberEl) {
                    const textToCopy = accountNumberEl.textContent;
                    
                    // Sử dụng Clipboard API để sao chép
                    navigator.clipboard.writeText(textToCopy)
                        .then(function() {
                            // Thông báo sao chép thành công (ví dụ: thay đổi chữ trên nút)
                            const originalText = btn.textContent;
                            btn.textContent = "Đã sao chép";
                            btn.style.opacity = "0.7";
                            
                            // Trở lại chữ gốc sau 1.5 giây
                            setTimeout(function() {
                                btn.textContent = originalText;
                                btn.style.opacity = "1";
                            }, 1500);
                        })
                        .catch(function(err) {
                            console.error("Lỗi sao chép: ", err);
                        });
                }
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    // === XỬ LÝ ALBUM ẢNH (SLIDER) ===
    const mainImg = document.getElementById("mainGalleryImg");
    const thumbnails = document.querySelectorAll(".thumb");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    
    if (mainImg && thumbnails.length > 0) {
        // Mảng chứa link ảnh (lấy tự động từ các thẻ thumb)
        const images = Array.from(thumbnails).map(thumb => thumb.src);
        let currentIndex = 0;

        // Hàm cập nhật ảnh chính
        function updateGallery(index) {
            mainImg.src = images[index];
            // Xóa viền xanh ở tất cả ảnh nhỏ
            thumbnails.forEach(t => t.classList.remove("active"));
            // Thêm viền xanh vào ảnh đang chọn
            thumbnails[index].classList.add("active");
            currentIndex = index;
        }

        // Bấm vào ảnh nhỏ
        thumbnails.forEach((thumb) => {
            thumb.addEventListener("click", function() {
                const index = parseInt(this.getAttribute("data-index"));
                updateGallery(index);
            });
        });

        // Bấm mũi tên Trái
        if (prevBtn) {
            prevBtn.addEventListener("click", function() {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = images.length - 1; // Quay vòng lại ảnh cuối
                updateGallery(newIndex);
            });
        }

        // Bấm mũi tên Phải
        if (nextBtn) {
            nextBtn.addEventListener("click", function() {
                let newIndex = currentIndex + 1;
                if (newIndex >= images.length) newIndex = 0; // Quay vòng lại ảnh đầu
                updateGallery(newIndex);
            });
        }
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const mainImg = document.getElementById("mainGalleryImg");
    const thumbnails = document.querySelectorAll(".thumb");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    
    // Thêm các phần tử modal phóng to ảnh mới
    const expandBtn = document.getElementById("expandGalleryBtn");
    const zoomModal = document.getElementById("zoomModal");
    const zoomedImg = document.getElementById("zoomedImg");
    const closeZoomBtn = document.getElementById("closeZoomModal");
    
    let currentIndex = 0;
    let images = [];

    if (mainImg && thumbnails.length > 0) {
        // Mảng chứa link ảnh
        images = Array.from(thumbnails).map(thumb => thumb.src);

        // Hàm cập nhật ảnh chính
        function updateGallery(index) {
            mainImg.src = images[index];
            thumbnails.forEach(t => t.classList.remove("active"));
            thumbnails[index].classList.add("active");
            currentIndex = index;
        }

        // Bấm vào ảnh nhỏ
        thumbnails.forEach((thumb) => {
            thumb.addEventListener("click", function() {
                const index = parseInt(this.getAttribute("data-index"));
                updateGallery(index);
            });
        });

        // Bấm mũi tên Trái
        if (prevBtn) {
            prevBtn.addEventListener("click", function() {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = images.length - 1;
                updateGallery(newIndex);
            });
        }

        // Bấm mũi tên Phải
        if (nextBtn) {
            nextBtn.addEventListener("click", function() {
                let newIndex = currentIndex + 1;
                if (newIndex >= images.length) newIndex = 0;
                updateGallery(newIndex);
            });
        }

        // === Thêm tính năng phóng to chỉ khi nhấn nút expand ===
        if (expandBtn) {
            expandBtn.addEventListener("click", function() {
                if (zoomModal && zoomedImg) {
                    // Lấy ảnh chính hiện tại và hiển thị trong modal phóng to
                    zoomedImg.src = images[currentIndex]; 
                    zoomModal.classList.add("active");
                }
            });
        }

        // Đóng modal phóng to
        if (closeZoomBtn) {
            closeZoomBtn.addEventListener("click", function() {
                if (zoomModal) {
                    zoomModal.classList.remove("active");
                }
            });
        }
    }
});
// 1. Tạo hiệu ứng Trái tim rơi tự động
function createHearts() {   
    const container = document.getElementById('heart-container');
    if (!container) return;

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            // Thêm icon trái tim vào thẳng thẻ div
            heart.innerHTML = "❤️"; 
            
            // Random vị trí và kích thước (dùng fontSize cho icon)
            heart.style.left = Math.random() * 100 + "vw";
            const size = Math.random() * 15 + 10 + "px"; 
            heart.style.fontSize = size; 
            
            // Random thời gian rơi
            heart.style.animationDuration = Math.random() * 3 + 4 + "s";
            
            container.appendChild(heart);

            // Xóa trái tim sau khi rơi xong để tránh nặng máy
            setTimeout(() => { heart.remove(); }, 7000);
        }, i * 300);
    }
}
setInterval(createHearts, 3000); // Cứ 3 giây tạo một đợt tim mới

// 2. Hiệu ứng Reveal khi cuộn trang (Scroll Animation)
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
// Chạy ngay lần đầu để hiện các phần ở trên cùng
reveal();
// 2. Hiệu ứng Reveal khi cuộn trang (Intersection Observer mượt mà hơn)
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Kích hoạt khi 15% phần tử xuất hiện trên màn hình
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Nếu muốn hiệu ứng chỉ chạy 1 lần rồi giữ nguyên, bỏ comment dòng dưới:
                // observer.unobserve(entry.target); 
            } else {
                // Nếu muốn cuộn lên cuộn xuống đều có hiệu ứng thì giữ nguyên dòng dưới
                entry.target.classList.remove("active");
            }
        });
    }, observerOptions);

    // Bắt tất cả các phần tử có class hiệu ứng
    const hiddenElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    hiddenElements.forEach((el) => observer.observe(el));
});
// =========================================
// XỬ LÝ NHẠC NỀN (TỰ ĐỘNG PHÁT KHI TƯƠNG TÁC)
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false;

    // Hàm Bật/Tắt nhạc khi bấm trực tiếp vào nút đĩa nhạc ở góc
    function toggleMusic(e) {
        e.stopPropagation(); // Ngăn không cho sự kiện click này kích hoạt autoPlayMusic ở dưới
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.classList.add('pause');
        } else {
            bgMusic.play().then(() => {
                musicBtn.classList.add('playing');
                musicBtn.classList.remove('pause');
            }).catch(error => console.log("Lỗi phát nhạc: ", error));
        }
        isPlaying = !isPlaying;
    }

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', toggleMusic);
    }

    // Hàm tự động phát nhạc khi người dùng tương tác với trang (bấm, chạm, cuộn)
    const autoPlayMusic = function() {
        if (!isPlaying && bgMusic) {
            bgMusic.play().then(() => {
                isPlaying = true;
                if(musicBtn) {
                    musicBtn.classList.add('playing');
                    musicBtn.classList.remove('pause'); // Xóa gạch chéo, bắt đầu xoay
                }
            }).catch(e => console.log("Trình duyệt vẫn đang chặn autoplay: ", e));
        }
        
        // Sau khi nhạc đã phát, gỡ bỏ các bộ lắng nghe để không làm nặng web
        document.removeEventListener('click', autoPlayMusic);
        document.removeEventListener('touchstart', autoPlayMusic);
        window.removeEventListener('scroll', autoPlayMusic);
    };

    // Lắng nghe MỌI tương tác đầu tiên của người dùng để kích hoạt nhạc ngay lập tức
    document.addEventListener('click', autoPlayMusic);
    document.addEventListener('touchstart', autoPlayMusic);
    window.addEventListener('scroll', autoPlayMusic, { once: true }); // Kích hoạt ngay khi vừa vuốt/cuộn trang
});
// =========================================
// XỬ LÝ GỬI FORM RSVP LÊN GOOGLE SHEETS
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('rsvpForm');
    
    // THAY ĐƯỜNG LINK BẠN VỪA COPY Ở BƯỚC 2 VÀO ĐÂY
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyEa07NJgAtZePpBA1c1qz2CNM_lPrCMPyJRWGPzicP3zOOKR_y0Fq1k9Ll8hcPitygbw/exec'; 

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault(); // Ngăn trình duyệt tải lại trang
            
            // Đổi text nút thành "Đang gửi..." để khách biết
            const btnSubmit = form.querySelector('.btn-submit');
            const originalBtnText = btnSubmit.innerText;
            btnSubmit.innerText = 'Đang gửi...';
            btnSubmit.disabled = true;

            // Đóng gói dữ liệu từ form
            const formData = new FormData(form);

            // Gửi dữ liệu đi
            fetch(scriptURL, { method: 'POST', body: formData})
                .then(response => {
                    alert('Cảm ơn bạn đã xác nhận tham dự!');
                    form.reset(); // Xóa trắng form sau khi gửi thành công
                    
                    // Khôi phục lại nút bấm
                    btnSubmit.innerText = originalBtnText;
                    btnSubmit.disabled = false;
                })
                .catch(error => {
                    console.error('Lỗi!', error.message);
                    alert('Có lỗi xảy ra, vui lòng thử lại sau.');
                    
                    btnSubmit.innerText = originalBtnText;
                    btnSubmit.disabled = false;
                });
        });
    }
});
// =========================================
// XỬ LÝ MỞ BÌA THIỆP (INTRO SCREEN)
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const introScreen = document.getElementById("intro-screen");
    const openBtn = document.getElementById("open-btn");
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");

    if (openBtn && introScreen) {
        openBtn.addEventListener("click", function() {
            
            // --- ĐOẠN MÃ MỚI: XỬ LÝ HIỆU ỨNG CHẠY LẠI TỪ ĐẦU ---
            // Lấy tất cả các phần tử có hiệu ứng trong phần header
            const headerReveals = document.querySelectorAll('header .reveal-left, header .reveal-right, header .reveal-up');
            
            // 1. Ép các phần tử này quay về trạng thái ẩn ngay lập tức (tắt thời gian chuyển động để không bị giật lùi)
            headerReveals.forEach(el => {
                el.style.transitionDuration = '0s'; 
                el.classList.remove('active');
            });

            // Ép trình duyệt cập nhật lại trạng thái ngay lập tức
            void document.body.offsetHeight; 

            // 2. Bật lại thời gian chuyển động và kích hoạt hiệu ứng
            headerReveals.forEach(el => {
                el.style.transitionDuration = ''; 
                // Chờ 0.2s cho màn hình intro bắt đầu kéo lên rồi mới chạy hiệu ứng chữ
                setTimeout(() => {
                    el.classList.add('active');
                }, 200); 
            });
            // --------------------------------------------------

            // Thêm class .hidden để chạy CSS Animation trượt màn hình lên trên
            introScreen.classList.add("hidden");

            // Kích hoạt nhạc tự động chạy ngay sau khi người dùng tương tác (Bấm nút mở)
            if (bgMusic) {
                bgMusic.play().then(() => {
                    if(musicBtn) {
                        musicBtn.classList.add('playing');
                        musicBtn.classList.remove('pause');
                    }
                }).catch(e => console.log("Không thể tự động phát nhạc: ", e));
            }
            
            // Xóa hẳn thẻ HTML khỏi DOM sau 1.2s để giải phóng tài nguyên cho điện thoại
            setTimeout(() => {
                introScreen.style.display = "none";
            }, 1200);
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const introScreen = document.getElementById("intro-screen");
    const openBtn = document.getElementById("open-btn");
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");

    // Cấu hình tự động cuộn
    let isAutoScrolling = false;
    const scrollSpeed = 0.6; // Tốc độ cuộn (0.5 - 1.0 là vừa phải)

    function autoScrollStep() {
        if (!isAutoScrolling) return;
        window.scrollBy(0, scrollSpeed);
        
        // Dừng khi cuộn đến cuối trang
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
            isAutoScrolling = false;
            return;
        }
        requestAnimationFrame(autoScrollStep);
    }

    if (openBtn && introScreen) {
        openBtn.addEventListener("click", function() {
            // 1. Hiệu ứng mở bìa thiệp
            introScreen.classList.add("hidden");

            // 2. Kích hoạt nhạc
            if (bgMusic) {
                bgMusic.play().catch(e => console.log("Autoplay bị chặn"));
                musicBtn?.classList.add('playing');
            }

            // 3. Kích hoạt TỰ ĐỘNG CUỘN sau khi mở
            setTimeout(() => {
                isAutoScrolling = true;
                autoScrollStep();
            }, 800); // Chờ hiệu ứng mở bìa chạy xong 0.8s

            // 4. Xóa bìa sau khi ẩn
            setTimeout(() => {
                introScreen.style.display = "none";
            }, 1200);
        });
    }

    // --- PHẦN LOGIC DỪNG CUỘN 2 LẦN ---
let lastTapTime = 0;
let isProcessingTouch = false; // Biến khóa chặn sự kiện giả mạo

const handleStopLogic = (e) => {
    if (!isAutoScrolling) return;

    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;

    // Chỉ xử lý nếu khoảng cách giữa 2 lần chạm từ 50ms đến 350ms
    // (Dưới 50ms thường là lỗi do thiết bị gửi tín hiệu trùng)
    if (tapLength < 350 && tapLength > 50) {
        isAutoScrolling = false;
        lastTapTime = 0;
    } else {
        lastTapTime = currentTime;
    }
};

// Xử lý cho điện thoại
window.addEventListener('touchstart', function(e) {
    isProcessingTouch = true; // Đánh dấu đang dùng điện thoại
    handleStopLogic(e);
    // Sau 500ms mới mở khóa để cho phép click (nếu có)
    setTimeout(() => { isProcessingTouch = false; }, 500);
}, { passive: true });

// Xử lý cho máy tính
window.addEventListener('mousedown', function(e) {
    // Nếu đang là touch trên điện thoại thì bỏ qua mousedown này
    if (isProcessingTouch) return;
    if (e.button === 0) handleStopLogic(e);
}, { passive: true });

// Dừng ngay khi dùng con lăn chuột (chủ đích rõ ràng)
window.addEventListener('wheel', () => { isAutoScrolling = false; }, { passive: true });
});