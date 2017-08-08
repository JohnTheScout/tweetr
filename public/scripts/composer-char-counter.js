$(document).ready(function () {
  $(".new-tweet textarea").on("keydown", updateCount);
  $(".new-tweet textarea").on("keyup", updateCount);
});

function updateCount() {
  $(this).siblings('.counter')[0].textContent = 140 - $(this).val().length;
}
