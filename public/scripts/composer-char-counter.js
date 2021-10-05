//after document loaded
$().ready(function() {
  const limit = 140;
  //when entering input to textarea
  $("#tweet-text").on("keyup", function() {
    let value = $(this).val().length;
    //treverse through the dom to get counter class
    let counter = $(this).closest('.tweet-form').find('.counter')
    $(counter).text(limit - value);
    //checking if value exceeds the limit
    if (value > limit) {
      $(counter).addClass('exceeded');
    } else {
      $(counter).removeClass('exceeded');
    }
  });
});