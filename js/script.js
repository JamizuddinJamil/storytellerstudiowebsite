document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hidden");

            document.querySelectorAll(".reveal").forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add("visible");
                }, index * 100);
            });

        }, 600);
    });


    /* =========================
       NAVBAR SCROLL
    ========================== */

    const navbar = document.getElementById("navbar");

    const handleNavbar = () => {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleNavbar);

    handleNavbar();


    /* =========================
       MOBILE MENU
    ========================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
        document.body.classList.toggle("menu-open");

    });


    /* Close menu after clicking link */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.classList.remove("menu-open");

        });

    });


    /* =========================
       SCROLL REVEAL
    ========================== */

    const revealElements = document.querySelectorAll(
        ".section-label, .section-heading, .intro-grid, .work-card, .social-work, .service-item, .about-grid, .process-item, .contact-content"
    );


    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });


    /* =========================
       PORTFOLIO VIDEO MODAL
    ========================== */

    const videoModal = document.getElementById("videoModal");
    const videoModalPlayer = document.getElementById("videoModalPlayer");
    const videoModalTitle = document.getElementById("videoModalTitle");
    const portfolioCards = document.querySelectorAll(".work-card[data-video-url]");

    const closeVideoModal = () => {
        if (!videoModal) {
            return;
        }

        videoModal.classList.remove("is-open");
        videoModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("menu-open");
        videoModalPlayer.replaceChildren();
    };

    const openVideoModal = (card) => {
        const videoUrl = card.dataset.videoUrl;

        if (!videoModal || !videoModalPlayer) {
            return;
        }

        const title = card.querySelector("h3");
        videoModalTitle.textContent = title ? title.textContent : "Project video";
        videoModalPlayer.replaceChildren();

        if (!videoUrl) {
            videoModalPlayer.textContent = "Video link coming soon.";
        } else if (["youtube", "tiktok", "instagram"].includes(card.dataset.platform)) {
            const embed = document.createElement("iframe");
            embed.src = card.dataset.platform === "youtube"
                ? `https://www.youtube.com/embed/${videoUrl.split("youtu.be/")[1]?.split(/[?&]/)[0] || videoUrl}`
                : videoUrl;
            embed.title = videoModalTitle.textContent;
            embed.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            embed.allowFullscreen = true;
            videoModalPlayer.append(embed);
        } else {
            const video = document.createElement("video");
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;
            video.preload = "none";
            video.src = videoUrl;
            videoModalPlayer.append(video);
        }

        videoModal.classList.add("is-open");
        videoModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("menu-open");
    };

    portfolioCards.forEach(card => {
        card.addEventListener("click", () => openVideoModal(card));
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openVideoModal(card);
            }
        });
    });

    if (videoModal) {
        videoModal.querySelectorAll("[data-modal-close]").forEach(element => {
            element.addEventListener("click", closeVideoModal);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeVideoModal();
            }
        });
    }


    /* =========================
       CURRENT YEAR
    ========================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================
       SMOOTH ANCHOR OFFSET
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight = navbar.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


});