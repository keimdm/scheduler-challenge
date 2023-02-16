$(function () {
  var timeBlocks = $(".time-block");
  var currentTime = dayjs();
  var calendar = $("#calendar");

  setTimeBlockColors();
  setSavedContent();
  showCurrentDate();

  // Event listener for save button press
  calendar.on("click", "button", function (event) {
    var savedIndex = $(event.target).parent().attr("id");
    var savedContent = $(event.target).parent().children("textarea").val();
    localStorage.setItem(savedIndex, savedContent);
  });

  // Applies time block colors based on past, present and future class assignment
  function setTimeBlockColors() {
    for (i = 0; i < timeBlocks.length; i++) {
      var timeBlockTime = dayjs().hour(timeBlocks.eq(i).attr("data"));
      if (currentTime.isAfter(timeBlockTime, "hour")) {
        timeBlocks.eq(i).addClass("past");
      }
      else if (currentTime.isSame(timeBlockTime, "hour")) {
        timeBlocks.eq(i).addClass("present");
      }
      else {
        timeBlocks.eq(i).addClass("future");
      }
    }
  }

  // Retrieves previous entries from local storaage
  function setSavedContent() {
    for (i = 0; i < timeBlocks.length; i++) {
      timeBlocks.eq(i).children("textarea").val(localStorage.getItem(timeBlocks.eq(i).attr("id") || ""));
    }
  }

  // Displays date in header of page
  function showCurrentDate() {
    $("#currentDay").text(currentTime.format("dddd[, ]MMMM[ ]D"));
  }
});
