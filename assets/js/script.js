// Variables
var timeSlots = [
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM"
]

var storedActivities = [];
var dayPlannerContainer = $(".container");

// Functions
// Retrieves the saved activities from local storage. Note that any null value will be converted to an empty string
function getSavedActivities(){
    for (var i = 0; i < timeSlots.length; i++){
        storedActivities.push(localStorage.getItem(timeSlots[i]));
    }
}
// Function to create the html for a given row. Accepts the row time and row content (i.e. the activity for that hour) as strings
function createPlannerRowHtml(rowTime, content){
    var htmlContent = '<div class="row no-gutters"><div class="col-2 col-md-1 h-100"><p class="hour w-100 my-auto">' + rowTime + '</label></div><div class="col-8 col-md-10 h-100"><input class="form-control description w-100 h-100" value="' + content + '"></div><div class="col-2 col-md-1 h-100"><button class="btn btn-primary saveBtn w-100 h-100"><i class="fas fa-save"></i></button></div></div>'
    return htmlContent
}

// Function to render the day planner for all time slots stored in the global timeSlots array
function renderDayPlanner(){
    getSavedActivities();
    var rows = '';
    var activityContent;
    for (var i = 0; i < timeSlots.length; i++){
        if (storedActivities[i] != null){
            activityContent = storedActivities[i]
        } else {
            activityContent = '';
        }
        rows = rows.concat(createPlannerRowHtml(timeSlots[i], activityContent));
    }
    dayPlannerContainer.append(rows);
    storedActivities = [];
}

// Function to colour the time slots based on the current time. Accepts the current hour as a string.
function colorTimeSlots(currentTime){
    var rowTime;
    currentTime = parseInt(currentTime);
    for (var i = 0; i < timeSlots.length; i++){
        rowTime = dayPlannerContainer.children().eq(i).children().eq(0).children('p').html();
        rowTime = parseInt(moment(rowTime, "H A").format("H"));
        if (rowTime < currentTime){
            dayPlannerContainer.children().eq(i).children().eq(1).children().addClass('past');
            dayPlannerContainer.children().eq(i).children().eq(1).children().removeClass('present');
            dayPlannerContainer.children().eq(i).children().eq(1).children().removeClass('future');
        } else if (rowTime > currentTime){
            dayPlannerContainer.children().eq(i).children().eq(1).children().addClass('future');
            dayPlannerContainer.children().eq(i).children().eq(1).children().removeClass('past');
            dayPlannerContainer.children().eq(i).children().eq(1).children().removeClass('present');
        } else {
            dayPlannerContainer.children().eq(i).children().eq(1).children().addClass('present');
            dayPlannerContainer.children().eq(i).children().eq(1).children().removeClass('past');
            dayPlannerContainer.children().eq(i).children().eq(1).children().removeClass('future');
        }
    }
}

// Function to save an updated activity to local storage
function saveItem(event){
    event.preventDefault();
    var clickedButton = $(this);
    var rowElement = clickedButton.parent().parent();
    var rowTime = rowElement.children().eq(0).children().eq(0).html();
    var rowTask = rowElement.children().eq(1).children().eq(0).val();
    localStorage.setItem(rowTime, rowTask);
}

// Function that sets an interval to update the current time. Used to pass the current hour to the colourTimeSlots function
function updateCurrentTime(){
    var timerInterval = setInterval(function() {
        var currentHour = moment().format("H");
        colorTimeSlots(currentHour);
    }, 1000);
}


renderDayPlanner();
updateCurrentTime();
$(".saveBtn").on("click", saveItem);