$(document).ready(function() {
  // Create array to help economize code with fewer variables and initializations.
  var clicksArrayStarts0s = [0, 0, 0]; // Starts head, torso, leg at 0.
  var bodyPartWidth = 200;
  var bodyStripNumOn = 3; // Number of body strip currently on

  // Pass a reference to a slot in clicksArrayStarts0s.
  // Use slot to track number of times each element has been clicked.
  // Pass current thisBodyPart object to moveThisBodyPart()
  // moveThisBodyPart() - uses thisBodyPart to animate it

  $("#head").click(function() {
     moveThisBodyPart(0, this);
  });

  $("#torso").click(function() {
     moveThisBodyPart(1, this);
  });

  $("#leg").click(function() {
     moveThisBodyPart(2, this);
  });

  // moveThisBodyPart() - multipurpose - reduces possibility of code errors and
  // number of functions to maintain. Repetitive logic from before now in 1
  // place - easier to fix if something is wrong
  function moveThisBodyPart(i, thisBodyPart) {
    if  (clicksArrayStarts0s[i] < 2) { // Cycles back to the beginning pic.
      $(thisBodyPart).animate({left:"-="+bodyPartWidth+"px"}, 500);
      clicksArrayStarts0s[i] = clicksArrayStarts0s[i]+1;
    }
    else {
      clicksArrayStarts0s[i] = 0;
      $(thisBodyPart).animate({left:"0px"}, 500);
    }
  }

  $("#btnRandom").click(randomize);
  $("#btnReset").click(reset);

  function getRandom(bodyStripNumOn) {
    var random_num = Math.floor(Math.random() * bodyStripNumOn);
    return random_num;
  }

  function randomize() {
  // Randomize each body part position
    $(".body").each(function(index) {
      // Run this code for each element that is part of body class.
      // Set target posit to getRandom() result
      var target_position = getRandom(bodyStripNumOn);
      var current_position = clicksArrayStarts0s[index];
      
      // Update clicksArrayStarts0s index-so user can advance
      clicksArrayStarts0s[index] = target_position;

      if (target_position > current_position) {
        // targ posit 3 > curr posit 2
        // move_to = (target_position - current_position) * bodyPartWidth
        // Custom anim-move strip LEFT
        var move_to = (target_position - current_position) * bodyPartWidth;
        $(this).animate({left:"-="+move_to+"px"}, 500);
       }
       else if (target_position < current_position) {
        // targ posit 1 < curr posit 2
        // i.e., current_position > target position
        // Custom anim-move strip RIGHT
        var move_to = (current_position - target_position) * bodyPartWidth;
        $(this).animate({left:"+="+move_to+"px"}, 500);
       }
       else { // target_position == current_position
         // Do not move.
       }
    }); // End of each() loop
  } // End randomize() function

  function reset() {
    // Reset each array item, i.e., body strip, in clicksArrayStarts0s to 0 
    // with each().
    // Reset each image strip to the start. Set left property of each strip to  
    // absolute position of 0.
    $(".body").each(function(index) {
      clicksArrayStarts0s[index] = 0;
      $(this).animate({left:"0px"}, 300);
    }); // End of each() loop
  } // End reset() function

});  // End of $(document).ready(function() {
