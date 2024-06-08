//this for real time date
function updateDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var formattedDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
    document.getElementById('date').textContent = formattedDate;
  }
  updateDate();
  setInterval(updateDate, 1000);