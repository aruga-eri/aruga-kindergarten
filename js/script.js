/*=================================================
  ハンバーガーメニュー
=================================================*/

$(function () {

  $('.hamburger').on('click', function () {

    $(this).toggleClass('active');
    $('.mask').toggleClass('active');
    $('#spMenu').toggleClass('active');

  });

  $('.mask').on('click', function () {

    $('.hamburger').removeClass('active');
    $('.mask').removeClass('active');
    $('#spMenu').removeClass('active');

  });

});


/*=================================================
  メインビジュアル スライドショー
=================================================*/

$(function () {

  const $slides = $('.slideshow li');
  let current = 0;

  setInterval(function () {

    $slides.eq(current).removeClass('active');

    current++;

    if (current >= $slides.length) {
      current = 0;
    }

    $slides.eq(current).addClass('active');

  }, 5000);

});


/*=================================================
  NEWS タブ切り替え
=================================================*/

$(function () {

  $('.tab-item').on('click', function () {

    const index = $('.tab-item').index(this);

    $('.tab-item').removeClass('active');
    $(this).addClass('active');

    $('.tab-panel').removeClass('active');
    $('.tab-panel').eq(index).addClass('active');

  });

});


/*=================================================
  NEWS タブ
  キーボード操作
=================================================*/

$(function () {

  $('.tab-item').on('keydown', function (e) {

    if (e.key === 'Enter' || e.key === ' ') {

      e.preventDefault();

      $(this).trigger('click');

    }

  });

});


/*=================================================
  よくある質問
=================================================*/

document.querySelectorAll('.faq-question').forEach(button => {

  button.addEventListener('click', () => {

    const answerId = button.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);

    const expanded =
      button.getAttribute('aria-expanded') === 'true';

    button.setAttribute(
      'aria-expanded',
      !expanded
    );

    answer.hidden = expanded;

    button.querySelector('.symbol').textContent =
      expanded ? '＋' : '−';

  });

});

/* ================================================
   ページトップへ戻る
================================================ */

const pageTop = document.querySelector("#page-top");

if (pageTop) {
  window.addEventListener("scroll", () => {
    const scrollBottom = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // ページ最下部付近で表示
    if (scrollBottom >= documentHeight - 100) {
      pageTop.classList.add("show");
    } else {
      pageTop.classList.remove("show");
    }
  });

  pageTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ==================================================
   4つの保育方針 スクロールアニメーション
================================================== */

const policyItems = document.querySelectorAll(".slide-left, .slide-right");

if (policyItems.length > 0) {
  const policyObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-show");

          // 一度表示したら監視終了
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.25,
    },
  );

  policyItems.forEach((item) => {
    policyObserver.observe(item);
  });
}

/* ==================================================
   EVENT PHOTO CAROUSEL - SP
================================================== */

const eventPhotoTrack = document.querySelector(".event-photo-track");

if (eventPhotoTrack) {
  const eventPhotos = eventPhotoTrack.querySelectorAll(
    'img:not([aria-hidden="true"])',
  );

  let currentPhoto = 0;

  const showEventPhotos = () => {
    eventPhotos.forEach((photo) => {
      photo.classList.remove("is-prev", "is-active", "is-next");
    });

    const total = eventPhotos.length;

    const prevIndex = (currentPhoto - 1 + total) % total;
    const nextIndex = (currentPhoto + 1) % total;

    eventPhotos[prevIndex].classList.add("is-prev");
    eventPhotos[currentPhoto].classList.add("is-active");
    eventPhotos[nextIndex].classList.add("is-next");
  };

  showEventPhotos();

  setInterval(() => {
    /* SPのときだけ切り替える */
    if (window.innerWidth <= 767) {
      currentPhoto = (currentPhoto + 1) % eventPhotos.length;

      showEventPhotos();
    }
  }, 2000);
}

/* ==================================================
   FLOATING HUSEN
   フッター手前で停止
================================================== */

const husen = document.querySelector("#floating-husen");
const footer = document.querySelector("footer");

if (husen && footer) {
  window.addEventListener("scroll", () => {
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const husenHeight = husen.offsetHeight;
    const bottomSpace = 30;

    if (footerTop < windowHeight - bottomSpace) {
      const overlap =
        windowHeight - footerTop + bottomSpace;

      husen.style.bottom = `${overlap}px`;
    } else {
      husen.style.bottom = `${bottomSpace}px`;
    }
  });
}

/* ==================================================
   CRAYON PAGE TRANSITION
================================================== */

const crayonTransition =
  document.querySelector(".crayon-transition");

document.querySelectorAll("a[href]").forEach((link) => {

  link.addEventListener("click", (e) => {

    const href = link.getAttribute("href");

    if (
      !href ||
      href === "#" ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.target === "_blank"
    ) {
      return;
    }

    if (!crayonTransition) {
      return;
    }

    e.preventDefault();

    crayonTransition.classList.add("is-active");

    setTimeout(() => {
      window.location.href = href;
    }, 1150);

  });

});

/* ==================================================
   ブラウザの「戻る」で復帰した時
   クレヨン遷移をリセット
================================================== */

window.addEventListener("pageshow", () => {

  if (!crayonTransition) {
    return;
  }

  crayonTransition.classList.remove("is-active");

});