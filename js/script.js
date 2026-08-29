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