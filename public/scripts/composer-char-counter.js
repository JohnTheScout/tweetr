function updateCount() {
  const len = 140 - $(this).val().length;
  const counter = $(this).siblings('.counter');
  counter[0].textContent = len;
  if (len < 15 && len >= 0) {
    counter.removeClass('yellow red').addClass('yellow');
  } else if (len < 0) {
    counter.removeClass('yellow red').addClass('red');
  } else {
    counter.removeClass('yellow red');
  }
}

$(document).ready(() => {
  $('.new-tweet textarea').on('keydown', updateCount);
  $('.new-tweet textarea').on('keyup', updateCount);
});
