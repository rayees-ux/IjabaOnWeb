(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseenter', function () {
                    $(this).addClass('show');
                    $(this).find('.dropdown-menu').addClass('show');
                    $(this).find('.dropdown-toggle').attr('aria-expanded', 'true');
                }).on('mouseleave', function () {
                    $(this).removeClass('show');
                    $(this).find('.dropdown-menu').removeClass('show');
                    $(this).find('.dropdown-toggle').attr('aria-expanded', 'false');
                });
            } else {
                $('.navbar .dropdown').off('mouseenter mouseleave');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Carousels
    $(".main-carousel").owlCarousel({ autoplay:true, smartSpeed:1500, items:1, dots:true, loop:true, center:true });
    $(".tranding-carousel").owlCarousel({ autoplay:true, smartSpeed:2000, items:1, dots:false, loop:true, nav:true,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'] });

    $(".carousel-item-1").owlCarousel({ autoplay:true, smartSpeed:1500, items:1, dots:false, loop:true, nav:true,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'] });

    $(".carousel-item-2").owlCarousel({ autoplay:true, smartSpeed:1000, margin:30, dots:false, loop:true, nav:true,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive:{0:{items:1},576:{items:1},768:{items:2}} });

    $(".carousel-item-3").owlCarousel({ autoplay:true, smartSpeed:1000, margin:30, dots:false, loop:true, nav:true,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive:{0:{items:1},576:{items:1},768:{items:2},992:{items:3}} });

    $(".carousel-item-4").owlCarousel({ autoplay:true, smartSpeed:1000, margin:30, dots:false, loop:true, nav:true,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive:{0:{items:1},576:{items:1},768:{items:2},992:{items:3},1200:{items:4}} });


    // =========================
    // 🔥 UNIVERSAL SECTION SYSTEM (NOW WITH MODERN)
    // =========================

    var sectionConfig = {
        quran: { class: '.quran-section', default: 'surah' },
        hajj: { class: '.hajj-section', default: 'steps' },
        ibadah: { class: '.ibadah-section', default: 'dhikr' },
        family: { class: '.family-section', default: 'marriage' },
        rules: { class: '.rules-section', default: 'halal' },
        modern: { class: '.modern-section', default: 'social' } // 🔥 ADDED
    };

    function showSection(sectionId) {
        var targetElement = document.getElementById(sectionId);
        if (!targetElement) return false;

        var groupClass = null;
        for (var group in sectionConfig) {
            var selector = sectionConfig[group].class.substring(1);
            if (targetElement.classList.contains(selector)) {
                groupClass = selector;
                break;
            }
        }

        if (!groupClass) return false;

        var allSections = document.querySelectorAll('.' + groupClass);
        allSections.forEach(function(sec) {
            sec.classList.remove('active');
        });

        targetElement.classList.add('active');
        return true;
    }

    function initializeSections() {
        var hash = window.location.hash.substring(1);
        var sectionExists = hash && document.getElementById(hash);

        if (sectionExists) {
            showSection(hash);
        } else {
            if (document.querySelector('.quran-section')) showSection('surah');
            if (document.querySelector('.hajj-section')) showSection('steps');
            if (document.querySelector('.ibadah-section')) showSection('dhikr');
            if (document.querySelector('.family-section')) showSection('marriage');
            if (document.querySelector('.rules-section')) showSection('halal');
            if (document.querySelector('.modern-section')) showSection('social'); // 🔥 ADDED
        }
    }

    function getCurrentPageName() {
        var path = window.location.pathname;
        var filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return filename;
    }

    function getLinkPageName(href) {
        if (href.startsWith('#')) return getCurrentPageName();
        if (href.startsWith('http://') || href.startsWith('https://')) return null;
        var hashIndex = href.indexOf('#');
        var pagePart = hashIndex > -1 ? href.substring(0, hashIndex) : href;
        if (!pagePart || pagePart === './') return getCurrentPageName();
        var filename = pagePart.substring(pagePart.lastIndexOf('/') + 1) || 'index.html';
        return filename;
    }

    $(document).ready(function() {
        initializeSections();

        window.addEventListener('hashchange', function() {
            initializeSections();
        });

        document.addEventListener('click', function(e) {
            var link = e.target.closest('a[href]');
            if (!link) return;

            var href = link.getAttribute('href');
            var hashIndex = href.indexOf('#');

            if (hashIndex === -1) return;

            var currentPage = getCurrentPageName();
            var targetPage = getLinkPageName(href);
            var hash = href.substring(hashIndex + 1);

            if (targetPage && targetPage !== currentPage) {
                return;
            }

            var section = document.getElementById(hash);
            if (!section) return;

            e.preventDefault();
            window.location.hash = hash;
        });
    });

})(jQuery);