$(document).ready(function () {
  $(".new-tweet textarea").on("keydown", updateCount);
  $(".new-tweet textarea").on("keyup", updateCount);
});

function updateCount() {
  let len = 140 - $(this).val().length;
  let counter = $(this).siblings('.counter');
  counter[0].textContent = len;
  if (len < 15 && len >= 0) 
    counter.removeClass("yellow red").addClass("yellow");
  else if (len < 0) 
    counter.removeClass("yellow red").addClass("red");
  else 
    counter.removeClass("yellow red");
}
