document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. OPENING / COVER & MUSIC
    // ==========================================================================
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');
    const btnOpenInvitation = document.getElementById('btn-open-invitation');
    const bgMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    let isMusicPlaying = false;

    // Handle opening invitation click
    btnOpenInvitation.addEventListener('click', () => {
        // Hide cover with animation
        openingScreen.classList.add('hide');
        mainContent.style.display = 'block';
        
        // Start playing music
        playMusic();
        
        // Initialize reveal animations
        initRevealAnimations();
    });

    // Toggle Music Playback
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    function playMusic() {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.querySelector('.music-icon').classList.add('music-playing');
        }).catch(err => {
            console.log("Audio playback was blocked: ", err);
        });
    }

    function pauseMusic() {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.querySelector('.music-icon').classList.remove('music-playing');
    }

    // ==========================================================================
    // 2. PARSE GUEST NAME FROM URL (?to=Nama+Tamu)
    // ==========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    const guestContainer = document.getElementById('guest-container');
    const invitedGuestName = document.getElementById('invited-guest-name');
    const rsvpNameInput = document.getElementById('rsvp-name');
    const wishNameInput = document.getElementById('wish-name');

    if (guestName) {
        const decodedName = decodeURIComponent(guestName.replace(/\+/g, ' '));
        invitedGuestName.textContent = decodedName;
        guestContainer.style.display = 'block';
        
        // Pre-fill names in forms
        rsvpNameInput.value = decodedName;
        wishNameInput.value = decodedName;
    }

    // ==========================================================================
    // 3. COUNTDOWN TIMER
    // ==========================================================================
    // Set wedding date: September 12, 2026 08:00:00
    const targetDate = new Date('2026-09-12T08:00:00').getTime();

    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);

    // ==========================================================================
    // 4. ANIMATION ON SCROLL (REVEAL)
    // ==========================================================================
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // ==========================================================================
    // 5. RSVP FORM HANDLING
    // ==========================================================================
    const rsvpStatus = document.getElementById('rsvp-status');
    const totalGuestsGroup = document.getElementById('total-guests-group');
    const formRsvp = document.getElementById('form-rsvp');
    const rsvpFeedback = document.getElementById('rsvp-feedback');
    const btnSubmitRsvp = document.getElementById('btn-submit-rsvp');

    // Toggle total guests field based on attendance selection
    rsvpStatus.addEventListener('change', () => {
        if (rsvpStatus.value === 'hadir') {
            totalGuestsGroup.style.display = 'block';
        } else {
            totalGuestsGroup.style.display = 'none';
        }
    });

    formRsvp.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const guestName = rsvpNameInput.value.trim();
        const status = rsvpStatus.value;
        const totalGuests = status === 'hadir' ? parseInt(document.getElementById('rsvp-total').value) || 1 : 1;

        // Reset feedback state
        rsvpFeedback.textContent = '';
        rsvpFeedback.className = 'feedback-msg';
        
        // Show loading spinner
        btnSubmitRsvp.disabled = true;
        btnSubmitRsvp.querySelector('.btn-text').textContent = 'Mengirim...';
        btnSubmitRsvp.querySelector('.spinner').style.display = 'inline-block';

        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    guestName,
                    status,
                    totalGuests
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                rsvpFeedback.textContent = 'Konfirmasi Anda berhasil dikirim. Terima kasih!';
                rsvpFeedback.classList.add('success');
                formRsvp.reset();
                totalGuestsGroup.style.display = 'none';
            } else {
                throw new Error(result.message || 'Gagal mengirim konfirmasi.');
            }
        } catch (error) {
            rsvpFeedback.textContent = error.message || 'Terjadi kesalahan sistem.';
            rsvpFeedback.classList.add('error');
        } finally {
            // Restore button state
            btnSubmitRsvp.disabled = false;
            btnSubmitRsvp.querySelector('.btn-text').textContent = 'Kirim Konfirmasi';
            btnSubmitRsvp.querySelector('.spinner').style.display = 'none';
        }
    });

    // ==========================================================================
    // 6. WISHES FORM & BOARD HANDLING
    // ==========================================================================
    const formWish = document.getElementById('form-wish');
    const wishFeedback = document.getElementById('wish-feedback');
    const wishesList = document.getElementById('wishes-list');
    const btnSubmitWish = document.getElementById('btn-submit-wish');
    const wishMessageInput = document.getElementById('wish-message');

    // Fetch and render wishes
    async function loadWishes() {
        wishesList.innerHTML = '<div class="wishes-loading">Memuat ucapan...</div>';
        
        try {
            const response = await fetch('/api/wishes');
            const result = await response.json();

            if (response.ok && result.success) {
                const data = result.data || [];
                
                if (data.length === 0) {
                    wishesList.innerHTML = '<div class="wishes-empty">Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</div>';
                    return;
                }

                wishesList.innerHTML = '';
                data.forEach(wish => {
                    const wishItem = document.createElement('div');
                    wishItem.className = 'wish-item';
                    
                    const dateObj = new Date(wish.createdAt);
                    const formattedDate = dateObj.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    // Avoid XSS by escaping text content
                    const senderSafe = escapeHTML(wish.senderName);
                    const messageSafe = escapeHTML(wish.message);

                    wishItem.innerHTML = `
                        <div class="wish-header">
                            <span class="wish-author">${senderSafe}</span>
                            <span class="wish-time">${formattedDate}</span>
                        </div>
                        <p class="wish-content">${messageSafe}</p>
                    `;
                    wishesList.appendChild(wishItem);
                });
            } else {
                throw new Error('Gagal memuat papan ucapan.');
            }
        } catch (error) {
            wishesList.innerHTML = `<div class="wishes-empty text-error">Gagal mengambil ucapan: ${error.message}</div>`;
        }
    }

    // Submit a wish
    formWish.addEventListener('submit', async (e) => {
        e.preventDefault();

        const senderName = wishNameInput.value.trim();
        const message = wishMessageInput.value.trim();

        // Reset feedback
        wishFeedback.textContent = '';
        wishFeedback.className = 'feedback-msg';

        // Show loading spinner
        btnSubmitWish.disabled = true;
        btnSubmitWish.querySelector('.btn-text').textContent = 'Mengirim...';
        btnSubmitWish.querySelector('.spinner').style.display = 'inline-block';

        try {
            const response = await fetch('/api/wishes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    senderName,
                    message
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                wishFeedback.textContent = 'Ucapan Anda berhasil terkirim!';
                wishFeedback.classList.add('success');
                
                // Clear input message, but preserve sender name
                wishMessageInput.value = '';
                
                // Reload wishes list to display the new wish
                await loadWishes();
            } else {
                throw new Error(result.message || 'Gagal mengirim ucapan.');
            }
        } catch (error) {
            wishFeedback.textContent = error.message || 'Terjadi kesalahan sistem.';
            wishFeedback.classList.add('error');
        } finally {
            // Restore button state
            btnSubmitWish.disabled = false;
            btnSubmitWish.querySelector('.btn-text').textContent = 'Kirim Ucapan';
            btnSubmitWish.querySelector('.spinner').style.display = 'none';
        }
    });

    // Helper to escape HTML tags to prevent XSS
    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Initial load of wishes
    loadWishes();
});
