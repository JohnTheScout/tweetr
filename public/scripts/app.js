/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function millisecondsToMinutes(timeInMilli) {
  // function mostly adapted from https://gist.github.com/remino/1563878
  const timeInMs = Date.now() - timeInMilli;
  let seconds = Math.floor(timeInMs / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;
  let hours = Math.floor(minutes / 60);
  minutes %= 60;
  const days = Math.floor(hours / 24);
  hours %= 24;
  let result = '';

  if (days > 0) {
    result = `Posted ${days} days ago`;
  } else if (hours > 0) {
    result = `Posted ${hours} hours, ${minutes} minutes and ${seconds} seconds ago`;
  } else if (minutes > 0) {
    result = `Posted ${minutes} minutes and ${seconds} seconds ago`;
  } else {
    result = `Posted ${seconds} seconds ago`;
  }

  return result;
}

function escape(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweet) {
  const $tweet = $(`
    <article>
      <header>
        <div class='userimage'><img src='${tweet.user.avatars.small}'></div>
        <h2>${escape(tweet.user.name)}</h2>
        <p>${escape(tweet.user.handle)}</p>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        ${millisecondsToMinutes(tweet.created_at)}
        <span class='icons'>
          <img src='/images/iconmonstr-flag-4.svg'>
          <img src='/images/iconmonstr-media-control-54.svg'>
          <span class='heart' data-liked=false><img src='/images/iconmonstr-favorite-2.svg'></span>
        </span>
      </footer>
    </article>
    `);
  return $tweet;
}

function renderTweets(tweetArr) {
  const tweetsDOMElement = $('.tweets'); // cache the lookup so we're not repeating it for each tweet
  tweetsDOMElement.html(''); // clear HTML to prevent tweets that have already been displayed from being added twice
  tweetArr.forEach((tweet) => {
    tweetsDOMElement.append(createTweetElement(tweet));
  });
}

function loadTweets() {
  $.ajax({
    url: '/tweets',
    type: 'GET',
    success: renderTweets,
  });
  $('textarea').val('');
  $('.counter').text('140');
}

function submitHandler(event) {
  event.preventDefault();
  const len = $(this)[0][0].value.length; // gets the length of the value in the text box
  const serialized = $(this).serialize();
  if (len > 140) {
    alert('Tweet too long!');
  } else if (len > 0) {
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: serialized,
      success: loadTweets,
    });
  } else {
    alert('Tweet should not be empty');
  }
}

function composeButtonHandler() {
  $('.new-tweet').slideToggle(300, 'linear');
  $('.new-tweet textarea').focus();
}

function likeHandler() {
  const $heartIcon = $(this);
  if ($heartIcon.data().liked === true) {
    $heartIcon.data().liked = false;
    $heartIcon.html(`<img src='/images/iconmonstr-favorite-2.svg'>`);
  } else {
    $heartIcon.data().liked = true;
    $heartIcon.html(`<img src='/images/iconmonstr-favorite-1.svg'>`);
  }
}

$(document).ready(() => {
  loadTweets();
  $('form').on('submit', submitHandler);
  $('.compose').on('click', composeButtonHandler);
  $('.tweets').on('click', '.heart', likeHandler);
});
