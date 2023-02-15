// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var timeBlocks = $(".time-block");
  var currentTime = dayjs();
  var calendar = $("#calendar");

  setTimeBlockColors();
  setSavedContent();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  calendar.on("click", "button", function (event) {
    var savedIndex = $(event.target).parent().attr("id");
    var savedContent = $(event.target).parent().children("textarea").val();
    localStorage.setItem(savedIndex, savedContent);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
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

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function setSavedContent() {
    for (i = 0; i < timeBlocks.length; i++) {
      timeBlocks.eq(i).children("textarea").val(localStorage.getItem(timeBlocks.eq(i).attr("id") || ""));
    }
  }

  // TODO: Add code to display the current date in the header of the page.
  
});
