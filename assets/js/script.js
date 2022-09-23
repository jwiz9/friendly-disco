 // Global declaration constants.
 let timeBlockEl = $('.timeblock');
 let buttonEl = $('.btn');

// Clock functions so scheduler can colour blocks depending on time.
function currentTime() {
    let date = new Date(); 
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("clock").innerText = hour + " : " + min + " : " + sec; 
      let t = setTimeout(function(){ currentTime() }, 1000); 
  }
  
  function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }
// Initiater.
  currentTime();    

// Current day.
function setDate() {
    let timeDisplay = moment();
    $('#currentDay').text(timeDisplay.format("dddd, MMMM Do YYYY"));   
}

 // Counts the timeblocks. 
 let blockCount = timeBlockEl.children().length;
 
 // Sets background color of the timeblocks using a loop.
 function checkTimeBlock() {    
     let currentHour = moment().format('MM-DD-YYYY hh:mm A');
     let timeBlock = '';
     let timeBlockID = '';
 
     for (var i = 0; i < blockCount; i++) {
         // Retrieves id of textarea and make it a datetime string value.
         timeBlockID = $(".timeblock div textarea").eq(i).attr("id");
         timeBlock = moment(moment().format('MM-DD-YYYY')+' '+moment(timeBlockID,'hA').format('hh:mm A'),'MM-DD-YYYY hh:mm A');
         timeBlock = checkTimeDiff(currentHour, timeBlock);
 
         if (timeBlock < 0) {
             // Timeblocks > current time = green or future.
             $(`#${timeBlockID}`).addClass('bg-success');
         } else if (timeBlock > 1) {
             // Timeblocks < current time = gray or past.
             $(`#${timeBlockID}`).addClass('bg-secondary');
         } else {
             // Timeblocks = current time = red or present.
             $(`#${timeBlockID}`).addClass('bg-danger');
         }
     }
 }
 
 // Compares the present time with the timeblock.
 function checkTimeDiff(currentHour, timeBlock) {
     var timeDiff = 0;
     var timeDiff = moment(currentHour,'MM-DD-YYYY h:mm A').diff(timeBlock, 'hours',true);
     return timeDiff;
 }
 
 // Saves written data to local storage.
 function printSavedSched() {
     var textArea = '';
     var storedVal = '';
     var currDate =  moment().format('MM-DD-YYYY');
 
     // Check all timeblocks for local storage.
     for (var i = 0; i < blockCount; i++) {
         textArea = $(".timeblock div textarea").eq(i).attr("id");
         // Value of currentdate and timeBlock as search selector.
         storedVal = localStorage.getItem(`${currDate} ${textArea}`);
 
     // Loads local storage to textArea
     if (storedVal) {
         $(`#${textArea}`).val(storedVal);
         }
     }
 }
 
 // ButtonEl to save text data to local storage
 timeBlockEl.on('click', '.btn', function (event) {
 
     var timeBlock = $(event.target).attr('data-time');
     var currDate =  moment().format('MM-DD-YYYY');
     var textAreaValue = $(`#${timeBlock}`).val();
     localStorage.setItem(`${currDate} ${timeBlock}`, textAreaValue);
 })
 
 // Run commands
 function init() {
     setDate();
     checkTimeBlock();
     printSavedSched();    
 }
 
 $(init());
  
