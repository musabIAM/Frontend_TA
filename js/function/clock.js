//this for real time clock
function updateClocks() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var formattedTime = hours + ':' + minutes + ' ' + ampm;
  
    // Update the time for each card
    var realtimeElements = document.querySelectorAll('.realtime');
    realtimeElements.forEach(function(element) {
      element.textContent = formattedTime;
    });
  }
  
  // Call updateClocks initially to set the time
  updateClocks();
  
  // Update the time every second
  setInterval(updateClocks, 1000);
  
  