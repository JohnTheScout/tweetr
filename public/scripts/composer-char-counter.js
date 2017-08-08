$(document).ready(function () {
  $(".new-tweet textarea").on("keydown", updateCount);
  $(".new-tweet textarea").on("keyup", updateCount);
});

function updateCount() {
  console.log($(this).val().length);
}
