/* =====================================================
   EWAC site — consolidated JS
   Every page includes this one file. Each block below only
   touches elements that exist on the current page, so it's
   safe to load everywhere regardless of which page-specific
   markup is present.
   ===================================================== */

/* ============ AOS SCROLL-REVEAL INIT (About page) ============ */
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    offset: 80
  });
}

/* ============ MOBILE MENU OPEN/CLOSE ============ */
(function () {
  var mobileMenu = document.getElementById('mobileMenu');
  var overlay = document.getElementById('overlay');
  var openBtn = document.getElementById('openMenu');
  var closeBtn = document.getElementById('closeMenu');
  if (!mobileMenu || !overlay || !openBtn || !closeBtn) return;

  function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  openBtn.onclick = function () {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
  };
  closeBtn.onclick = closeMenu;
  overlay.onclick = closeMenu;
})();

/* ============ MOBILE SUBMENU TOGGLE ============ */
document.querySelectorAll('.has-submenu > a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var parent = link.parentElement;
    var siblings = parent.parentElement.children;
    Array.from(siblings).forEach(function (item) {
      if (item !== parent) {
        item.classList.remove('active');
        item.querySelectorAll('.has-submenu').forEach(function (inner) {
          inner.classList.remove('active');
        });
      }
    });
    parent.classList.toggle('active');
  });
});

/* ============ FOOTER ACCORDION (mobile) ============ */
var footerAccordions = document.querySelectorAll('.footer-accordion');
footerAccordions.forEach(function (col) {
  col.querySelector('.footer-heading').addEventListener('click', function () {
    var isOpen = col.classList.contains('active');
    footerAccordions.forEach(function (other) { other.classList.remove('active'); });
    if (!isOpen) col.classList.add('active');
  });
});

/* ============ CONTACT PAGE: office selector swaps address/phone/email ============ */
(function () {
  var select = document.getElementById('officeSelect');
  if (!select) return;

  var nameEl = document.getElementById('officeName');
  var addressEl = document.getElementById('officeAddress');
  var phoneEl = document.getElementById('officePhone');
  var emailEl = document.getElementById('officeEmail');

  function renderOffice(option) {
    var d = option.dataset;
    nameEl.textContent = d.name;
    addressEl.textContent = d.address;

    var phoneHtml = '<a href="tel:' + d.phone1.replace(/\s+/g, '') + '">' + d.phone1 + '</a>';
    if (d.phone2) {
      phoneHtml += ' / <a href="tel:' + d.phone2.replace(/\s+/g, '') + '">' + d.phone2 + '</a>';
    }
    phoneEl.innerHTML = phoneHtml;

    emailEl.textContent = d.email;
    emailEl.href = 'mailto:' + d.email;
  }

  select.addEventListener('change', function () {
    renderOffice(select.selectedOptions[0]);
  });
})();

/* ============ STICKY HEADER ON SCROLL ============ */
(function () {
  var header = document.querySelector('.header');
  var topBar = document.querySelector('.top-bar');
  if (!header || !topBar) return;

  var triggerPoint = topBar.offsetHeight;
  function handleStickyHeader() {
    if (window.scrollY > triggerPoint) {
      header.classList.add('is-sticky');
      document.body.classList.add('header-fixed');
    } else {
      header.classList.remove('is-sticky');
      document.body.classList.remove('header-fixed');
    }
  }
  window.addEventListener('scroll', handleStickyHeader);
  window.addEventListener('load', handleStickyHeader);
})();

/* ============ DESKTOP MEGA DROPDOWN HOVER ============ */
document.querySelectorAll('.nav-item.has-dropdown').forEach(function (item) {
  var dropdown = item.querySelector('.dropdown.dropdown-mega');
  if (!dropdown) return;

  var closeTimer;
  function openDropdown() {
    clearTimeout(closeTimer);
    var header = document.querySelector('.header');
    var rect = header.getBoundingClientRect();
    dropdown.style.top = rect.bottom + 'px';
    dropdown.classList.add('force-open');
  }
  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      dropdown.classList.remove('force-open');
    }, 200); // grace period to cross the gap
  }
  item.addEventListener('mouseenter', openDropdown);
  item.addEventListener('mouseleave', scheduleClose);
  dropdown.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });
  dropdown.addEventListener('mouseleave', scheduleClose);
});

/* ============ INSIGHTS PAGE: deep-link a tab via URL hash, e.g. insights.html#news-pane ============ */
(function () {
  var hash = window.location.hash;
  if (!hash) return;
  var pane = document.querySelector(hash);
  if (!pane || !pane.classList.contains('tab-pane')) return;
  var trigger = document.querySelector('[data-bs-target="' + hash + '"]');
  if (trigger && window.bootstrap) {
    new bootstrap.Tab(trigger).show();
  }
})();

/* ============ STATS COUNTER (homepage) ============ */
(function () {
  var statsRow = document.querySelector('#about-stats .stats-row');
  if (!statsRow) return;

  function animateCounter(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    var target = parseInt(el.dataset.target, 10);
    var useComma = el.dataset.format === 'comma';
    var duration = 2000;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = useComma ? current.toLocaleString() : current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = useComma ? target.toLocaleString() : target;
      }
    }
    requestAnimationFrame(step);
  }

  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        document.querySelectorAll('#about-stats .count').forEach(animateCounter);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

  statsObserver.observe(statsRow);
})();

/* ============ PRODUCT CARDS SCROLL-IN ANIMATION (homepage) ============ */
(function () {
  var cards = document.querySelectorAll('.product-card');
  if (!cards.length) return;

  var productObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('card-visible');
        productObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.12) + 's';
    productObserver.observe(card);
  });
})();

/* ============ ABOUT PARAGRAPH SCROLL-COLOR EFFECT (homepage, needs GSAP) ============ */
(function () {
  var about = document.querySelector('.about-para');
  if (!about || typeof gsap === 'undefined') return;
  try { gsap.registerPlugin(ScrollTrigger); } catch (e) {}

  // Wrap only text nodes into spans so we preserve existing inline tags (like <strong>)
  function wrapTextNodesWithSpans(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(function (t) {
      if (!t.nodeValue.trim()) return;
      var parts = t.nodeValue.split(/(\s+)/); // keep separators
      if (parts.length === 1) return; // nothing to split
      var frag = document.createDocumentFragment();
      parts.forEach(function (part) {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else {
          var span = document.createElement('span');
          span.className = 'about-word';
          span.textContent = part;
          frag.appendChild(span);
        }
      });
      t.parentNode.replaceChild(frag, t);
    });
  }

  wrapTextNodesWithSpans(about);

  var lightColor = '#B4B4B4';
  var darkColor = '#1a1a1a';
  gsap.set(about.querySelectorAll('.about-word'), { color: lightColor });

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: about,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 0.4
    }
  });

  tl.to(about.querySelectorAll('.about-word'), { color: darkColor, stagger: { each: 0.03, from: 'start' }, ease: 'none', duration: 0.1 });
})();

/* ============ EVERYTHING BELOW NEEDS jQuery + Slick ============ */
if (window.jQuery) {
  (function ($) {

    /* ---- Client logo marquee sliders (homepage) ---- */
    if ($('.logo-slider-1').length || $('.logo-slider-2').length) {
      var slickLogoOpts = {
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 4000,
        cssEase: 'linear',
        arrows: false,
        dots: false,
        infinite: true,
        pauseOnHover: false,
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 6 } },
          { breakpoint: 992, settings: { slidesToShow: 5 } },
          { breakpoint: 576, settings: { slidesToShow: 3 } }
        ]
      };
      /* Row 1 — scrolls left */
      $('.logo-slider-1').slick(slickLogoOpts);
      /* Row 2 — same init, direction reversed via CSS scaleX(-1) */
      $('.logo-slider-2').slick(slickLogoOpts);
    }

    /* ---- Hero banner slider (homepage) ---- */
    var $carousel = $('.banner-slider');
    if ($carousel.length) {
      var settings = {
        arrows: true,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 2600,
        speed: 700,
        slide: '.slick-slideshow__slide',
        slidesToShow: 1,
        centerPadding: '0px',
        dots: true
      };

      function setSlideVisibility() {
        // Find the visible slides i.e. where aria-hidden="false"
        var visibleSlides = $carousel.find('.slick-slideshow__slide[aria-hidden="false"]');
        // Make sure all of the visible slides have an opacity of 1
        $(visibleSlides).each(function () {
          $(this).css('opacity', 1);
        });
      }

      $carousel.slick(settings);
      $carousel.slick('slickGoTo', 1);
      setSlideVisibility();
      $carousel.on('afterChange', function () {
        setSlideVisibility();
      });

      setInterval(function () {
        var number = $('.banner-slider .slick-dots li').length;
        var counter = null;
        for (var i = 0; i < number; i++) {
          if ($('.banner-slider .slick-dots li').eq(i).hasClass('slick-active')) {
            counter = i + 1;
          }
        }
        $('.counter').text(counter);
        $('.number').text(number);
      }, 100);
    }

    /* ---- Solution tabs + inner slider (homepage) ---- */
    if ($('.sol-tab-item').length) {
      function solSlickOpts() {
        return {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          infinite: false,
          speed: 500,
          responsive: [
            { breakpoint: 900, settings: { slidesToShow: 2 } },
            { breakpoint: 560, settings: { slidesToShow: 1 } }
          ]
        };
      }

      function initSolSlider($pane) {
        var $s = $pane.find('.sol-products-slider');
        if (!$s.hasClass('slick-initialized')) $s.slick(solSlickOpts());
      }

      initSolSlider($('#sol-maintenance'));

      $('.sol-tab-item').on('click', function () {
        if ($(this).hasClass('active')) return;
        var tab = $(this).data('tab');
        $('.sol-tab-item').removeClass('active');
        $(this).addClass('active');
        $('.sol-pane').removeClass('active');
        var $pane = $('#sol-' + tab);
        $pane.addClass('active');
        initSolSlider($pane);
        $('#solDropdown').val(tab);
      });

      $('#solDropdown').on('change', function () {
        var tab = $(this).val();
        $('.sol-tab-item').removeClass('active');
        $('[data-tab="' + tab + '"]').addClass('active');
        $('.sol-pane').removeClass('active');
        var $pane = $('#sol-' + tab);
        $pane.addClass('active');
        initSolSlider($pane);
      });

      $('.sol-arr-prev').on('click', function () {
        $('.sol-pane.active .sol-products-slider').slick('slickPrev');
      });
      $('.sol-arr-next').on('click', function () {
        $('.sol-pane.active .sol-products-slider').slick('slickNext');
      });
    }

    /* ---- FAQ accordion (homepage) ---- */
    if ($('.faq-question').length) {
      var $first = $('.faq-item.active');
      if ($first.length) {
        $first.find('.faq-answer').css('max-height', $first.find('.faq-answer')[0].scrollHeight + 'px');
      }

      $('.faq-question').on('click', function () {
        var $item = $(this).closest('.faq-item');
        var isOpen = $item.hasClass('active');

        $('.faq-item').removeClass('active');
        $('.faq-answer').css('max-height', '0');

        if (!isOpen) {
          $item.addClass('active');
          $item.find('.faq-answer').css('max-height', $item.find('.faq-answer')[0].scrollHeight + 'px');
        }
      });
    }

    /* ---- Why choose tabs (homepage) ---- */
    if ($('.why-tab').length) {
      $('.why-tab').on('click', function () {
        if ($(this).hasClass('active')) return;
        $('.why-tab').removeClass('active');
        $(this).addClass('active');
        var tab = $(this).data('tab');
        $('.why-pane').removeClass('active');
        $('#why-' + tab).addClass('active');
        $('#whyDropdown').val(tab);
      });

      $('#whyDropdown').on('change', function () {
        var tab = $(this).val();
        $('.why-tab').removeClass('active');
        $('[data-tab="' + tab + '"]').addClass('active');
        $('.why-pane').removeClass('active');
        $('#why-' + tab).addClass('active');
      });
    }

    /* ---- Blogs slider (homepage) ---- */
    if ($('.blogs-slider').length) {
      $('.blogs-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 550,
        arrows: false,
        dots: false,
        infinite: true,
        pauseOnHover: true,
        responsive: [
          { breakpoint: 992, settings: { slidesToShow: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1 } }
        ]
      });
    }

    /* ---- Industries slider (homepage) ---- */
    if ($('.industries-slider').length) {
      $('.industries-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 600,
        arrows: true,
        prevArrow: $('.ind-prev'),
        nextArrow: $('.ind-next'),
        dots: false,
        infinite: false,
        pauseOnHover: true,
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
      });
    }

    /* ---- Services slider (homepage) ---- */
    if ($('.services-slider').length) {
      $('.services-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        speed: 600,
        arrows: false,
        dots: false,
        infinite: false,
        pauseOnHover: true,
        responsive: [
          { breakpoint: 992, settings: { slidesToShow: 2 } },
          { breakpoint: 600, settings: { slidesToShow: 1 } }
        ]
      });

      $('#svcPrev').on('click', function () { $('#mainServicesSlider').slick('slickPrev'); });
      $('#svcNext').on('click', function () { $('#mainServicesSlider').slick('slickNext'); });
    }


     jQuery(document).ready(function ($) {
  $('.about-pills-slider').slick({
    slidesToShow: 6,          // how many pills visible at once — tune per your container width
    slidesToScroll: 1,
    variableWidth: false,     // ✅ back to false — all pills now equal fixed width via CSS
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 6000,
    cssEase: 'linear',
    pauseOnHover: true,
    swipe: true,
    draggable: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992,  settings: { slidesToShow: 4 } },
      { breakpoint: 768,  settings: { slidesToShow: 3 } },
      { breakpoint: 480,  settings: { slidesToShow: 2 } }
    ]
  });
});




    /* ---- About Us: EWAC History slider ---- */
    if ($('.about-history-slick').length) {
      /* Each slide holds a single year, but 2 sit side by side in view at
         once (matching the Figma reference, which shows two years sharing
         one continuous timeline) — the window slides past one year at a
         time. Below 768px only 1 fits, matching the stacked mobile layout. */
      $('.about-history-slick').slick({
        fade: false, // real horizontal slide instead of a cross-fade, so the motion reads as an actual slider
        infinite: true,
        speed: 700,
        cssEase: 'cubic-bezier(0.65, 0, 0.35, 1)',
        slidesToShow: 2,
        slidesToScroll: 1,
        adaptiveHeight: false,
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        prevArrow: $('.about-history-arrow.prev'),
        nextArrow: $('.about-history-arrow.next'),
        responsive: [
          { breakpoint: 767, settings: { slidesToShow: 1 } }
        ]
      });
    }

  })(window.jQuery);
}
