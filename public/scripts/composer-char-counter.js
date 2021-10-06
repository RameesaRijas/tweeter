//after document loaded
$().ready(function() {
  const limit = 140;
  //when entering input to textarea
  $("#tweet-text").on("input", function() {
    $(".error").hide();
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