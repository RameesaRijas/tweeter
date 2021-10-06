/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  //get tweets by ajax get call
  const loadTweets = () => {
    $.ajax({
      url : "/tweets",
      method: "GET",
      success:(tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.log(`There was an error: ${error}`);
      }
    });
  }

  loadTweets();

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
                      <p>${escape(tweet.content.text)}</p>
                      <footer>
                        <div>${time}</div>
                        <div>
                          <i class="fas fa-flag"></i>
                          <i class="fas fa-retweet"></i>
                          <i class="fas fa-heart"></i>
                        </div>
                      </footer>
                      </article>`;
    return $tweet;
  };

  //for xss attacks
  const escape = (str) => {
    let para = document.createElement("p");
    para.appendChild(document.createTextNode(str));
    return para.innerHTML;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    const $tweetContainer = $('#tweets-container');
    $tweetContainer.empty();
    tweets.forEach(item => {
      let $tweet = createTweetElement(item);
      $tweetContainer.prepend($tweet);
    })
  }

  //input data, form submit event listener
  const $form = $("#tweet-form");
  const $text = $('#tweet-text');
  $form.on("submit", function(event) {
    const limit = 140;
    event.preventDefault();
    //check if character count exceeds
    //if empty
    if ($text.val().length > limit) {
      alert("Character count exceeds");

    } else if ($text.val().length) {
      const serializeInputs = $(this).serialize();
      //ajax call to post request
      $.post("/tweets", serializeInputs, (res) => {
        $text.val("");
        $(".counter").text(140);
        loadTweets();
      });

    } else {
      alert("Please type something !");
    }
  });
});



