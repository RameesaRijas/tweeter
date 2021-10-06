/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
$(() => {
  const createTweetElement = (tweet) => {
    //html markup
    const time = timeago.format(tweet.created_at); 
    let $tweet = `<article class="tweet">
                      <header>
                        <div>
                          <img src="${tweet.user.avatars}">
                        </div>
                        <div>
                          ${tweet.user.name}
                        </div>
                        <div class="userhandle">${tweet.user.handle}</div>
                      </header>
                      <p>${tweet.content.text}</p>
                      <footer>
                        <div>${time}</div>
                        <div>
                          <i class="fas fa-flag"></i>
                          <i class="fas fa-retweet"></i>
                          <i class="fas fa-heart"></i>
                        </div>
                      </footer>
                      </article>`
    return $tweet;
  }

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach(item => {
      let $tweet = createTweetElement(item);
      $('#tweets-container').prepend($tweet);
    })
  }
  renderTweets(data);

  //input data, form submit event listener
  const $form = $("#tweet-form");
  $form.on("submit", function(event) {
    event.preventDefault();
    const serializeInputs = $(this).serialize();
    $('#tweet-text').val("");
    //ajax call to post request
    $.post("/tweets", serializeInputs, (res) => {
      console.log(res);
    })
  })
});



