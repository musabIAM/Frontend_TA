// day update
var currentDate = new Date();
var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayOfWeek = currentDate.getDay();
document.getElementById('dayOfWeek').textContent = weekdays[dayOfWeek];
var daysUntilWednesday = [];

for (var i = 1; i <= 6; i++) {
    var nextDayIndex = (dayOfWeek + i) % 7;
    daysUntilWednesday.push(weekdays[nextDayIndex]);
}

for (var i = 0; i < daysUntilWednesday.length; i++) {
    document.getElementById('nextDay' + (i + 1)).textContent = daysUntilWednesday[i];
}