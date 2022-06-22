// Plan

// Flow
// 1. Get the current saved items from local storage
// 2. Render each time slot on the page as an inline form
// 3. Color each time slot depending on time of day
// 4. Add each local storage item to the appropriate time slot
// 5. Allow the user to update the text in any of the time slots
// 6. Save the text inputted into a time slot when the save button is clicked
// 7. Each minute, read the time and update the time slot colours

// Global Variables
// Array of time slots to display
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
// Activities variable to store activities (for retrieving from local storage then adding to the page)
var storedActivities = {};
// Container element
var dayPlannerContainer = $(".container");

// Functions
// 1. getSavedActivities (1)
// 2a. Create row
function createPlannerRowHtml(time, content){
    var htmlContent = '<div class="row no-gutters"><div class="col-1 h-100"><p class="hour w-100 my-auto">' + time + '</label></div><div class="col-10 h-100"><input class="form-control description w-100 h-100" value="' + content + '"></div><div class="col-1 h-100"><button class="btn btn-primary saveBtn w-100 h-100"><i class="fas fa-save"></i></button></div></div>'
    return htmlContent
}
// 2b. renderDayPlanner (2)
function renderDayPlanner(){
    var rows = '';
    for (var i = 0; i < timeSlots.length; i++){
        rows = rows.concat(createPlannerRowHtml(timeSlots[i], 'Test'));
    }
    dayPlannerContainer.append(rows);
}
// 3. colorTimeSlots (3)
function colorTimeSlots(currentTime){
    var rowTime;
    currentTime = moment(currentTime, "H");
    for (var i = 0; i < timeSlots.length; i++){
        rowTime = dayPlannerContainer.children().eq(i).children().eq(0).children('p').html();
        rowTime = parseInt(moment(rowTime, "H A").format("H"));
        if (rowTime < currentTime._i){
            dayPlannerContainer.children().eq(i).children().eq(1).children().addClass('past');
            dayPlannerContainer.children().eq(i).children().eq(1).children().removeClass('present');
            dayPlannerContainer.children().eq(i).children().eq(1).children().removeClass('future');
        } else if (rowTime > currentTime._i){
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
// 4. inputSavedItems (4)
// 5. saveActivities (6)
// 6. updateCurrentTime (7)
// 
renderDayPlanner();