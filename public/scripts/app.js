/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function millisecondsToMinutes(timeInMilli) {
  //function mostly adapted from https://gist.github.com/remino/1563878
  timeInMilli = Date.now() - timeInMilli;
  let seconds = Math.floor(timeInMilli / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  let days = Math.floor(hours / 24);
  hours = hours % 24;
  let result = "";

  if (days > 0) {
    result = `Posted ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds ago`;
  } else if (hours > 0) {
    result = `Posted ${hours} hours, ${minutes} minutes and ${seconds} seconds ago`;
  } else if (minutes > 0) {
    result = `Posted ${minutes} minutes and ${seconds} seconds ago`;
  } else { 
    result = `Posted ${seconds} seconds ago`;
  }

  return result;
}

function createTweetElement(tweet) {
  let $tweet = $(`
    <article>
      <header>
        <div class="userimage"><img src="${tweet.user.avatars.small}"></div>
        <h2>${escape(tweet.user.name)}</h2>
        <p>${escape(tweet.user.handle)}</p>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>${millisecondsToMinutes(tweet.created_at)}</footer>
    </article>
    `);
  return $tweet;
}

function renderTweets(tweetArr) {
  tweetsDOMElement = $('.tweets'); //cache the lookup so we're not repeating it for each tweet
  tweetsDOMElement.html(''); // clear HTML to prevent tweets that have already been displayed from being added twice
  tweetArr.forEach((tweet) => {
    tweetsDOMElement.append(createTweetElement(tweet));
  });
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function submitHandler(event) {
  event.preventDefault();
  let len = $(this)[0][0].value.length; //gets the length of the value in the text box
  let serialized = $(this).serialize();
  if (len > 140) {
    alert('Tweet too long!');
  } else if (len > 0) {
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: serialized,
      success: loadTweets,
    });
    $("textarea").val('');
  } else {
    alert("Tweet should not be empty");
  }
}

function composeButtonHandler() {
  $('.new-tweet').slideToggle(300, 'linear');
  $('.new-tweet textarea').focus();
}

function loadTweets() {
  $.ajax({
    url: '/tweets',
    type: 'GET',
    success: renderTweets,
  });
}

$(document).ready(() => {
  $('form').on('submit', submitHandler);
  $('.compose').on('click', composeButtonHandler);
  loadTweets();
});
