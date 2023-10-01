"use strict";

/*
   Name:  Thecanniestbadge
   Date:  06/06/2023
   Program: Calendar
*/

/* Set the date displayed in the calendar */
var thisDay = new Date();

window.onload = function() {
   createYear();
   createControl();
   document.getElementById("calendar").innerHTML = createCalendar(thisDay);
}

// generates the control bar that the user uses to change month and year and can click to return to the present date
// document.creatElement(): used to create the element that the appendChild uses for the webpage (w3)
// appendChild: used to add an element to the webpage (w3)
function createControl() {
   var control = document.getElementById("control");

   var btnPreviousYear = document.createElement("button");
   btnPreviousYear.id = "previousYear";
   btnPreviousYear.innerHTML = "&#x21E6"; // Unicode 
   control.appendChild(btnPreviousYear);
   // Removed the previous month and next month functions to meet required specs of the program 
   var btnToday = document.createElement("button");
   btnToday.id = "today";
   btnToday.innerHTML = "Today";
   control.appendChild(btnToday);

   var btnNextYear = document.createElement("button");
   btnNextYear.id = "nextYear";
   btnNextYear.innerHTML = "&#x21E8";
   control.appendChild(btnNextYear);

   addlisten();
}
// Allows the user to change the year, month, and go back to the current day
// The code allows the user to change what is listed above but adding a addEventListener 
// that allows the calender to respond to the user clicking a specific button thats provided
// addEventListner: attaches an event to an element aka the buttons used in the function createControl 
function addlisten(){ // phil recommended this to me so then i could change the buttons from html to javascript 
   document.getElementById("previousYear").addEventListener("click", function() {
      thisDay.setFullYear(thisDay.getFullYear() - 1);
      createYear();
      document.getElementById("calendar").innerHTML = createCalendar(thisDay);
   });
   document.getElementById("today").addEventListener("click", function() {
      thisDay = new Date();
      createYear();
      document.getElementById("calendar").innerHTML = createCalendar(thisDay);
   });
   document.getElementById("nextYear").addEventListener("click", function() {
      thisDay.setFullYear(thisDay.getFullYear() + 1);
      createYear();
      document.getElementById("calendar").innerHTML = createCalendar(thisDay);
   });
}
// Function to keep the year in the header updated to the current year and if the year buttons are pressed it changes years
function createYear() {
   var yearElement = document.getElementById("year");
   yearElement.innerHTML = thisDay.getFullYear();
}
/* Function to generate the calendar table */
function createCalendar(calDate) {
   var calendarHTML = "";
   for (var month = 0; month < 12; month++) {
      let newDate = new Date(calDate.getFullYear(), month);
      calendarHTML += "<table id='calendar_table_'>";
      calendarHTML += calCaption(newDate);
      calendarHTML += calWeekdayRow();
      calendarHTML += calDays(newDate);
      calendarHTML += "</table>";
   }
   return calendarHTML;
}
/* Function to write the calendar caption */
function calCaption(calDate) {
   // monthName array contains the list of month names
   var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   // Determine the current month
   var thisMonth = calDate.getMonth();

   // Determine the current year
   var thisYear = calDate.getFullYear();

   // Write the caption 
   return "<caption>" + monthName[thisMonth] + "</caption>";
}

/* Function to write a table row of weekday abbreviations */
function calWeekdayRow() {
   // Array of weekday abbreviations 
   var dayName = ["S", "M", "T", "W", "T", "F", "S"];
   var rowHTML = "<tr>";

   // Loop through the dayName array
   for (var i = 0; i < dayName.length; i++) {
      rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
   }

   rowHTML += "</tr>";
   return rowHTML
}
/* Function to calculate the number of days in the month */
function daysInMonth(calDate) {
   // Array of days in each month 
   var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];

   // Extract the four digit year and month value
   var thisYear = calDate.getFullYear();
   var thisMonth = calDate.getMonth();

   // Revise the days in February for leap years
   if (thisYear % 4 === 0) {
      if ((thisYear % 100 != 0)  || (thisYear % 400 === 0)) {
         dayCount[1] = 29;
      }
   }

   // Return the number of days for the current month 
   return dayCount[thisMonth];
}
/* Function to write table rows for each day of the month */
function calDays(newDate) {
   
    // Determine the starting day of the month 
   var day = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
   var weekDay = day.getDay();
   
   // Write blank cells preceding the starting day
   var htmlCode = "<tr>";
   for (var i = 0; i < weekDay; i++) {
      htmlCode += "<td class='emptycell'></td>";
   } 
   // Write cells for each day of the month 
   var totalDays = daysInMonth(newDate);
   var today = new Date();// This is so the current day is the only thing that gets highlighted
   for (var i = 1; i <= totalDays; i++) {
      day.setDate(i);
      weekDay = day.getDay();

      if (weekDay === 0) htmlCode += "<tr>";
      if (i === today.getDate() && newDate.getMonth() === today.getMonth() && newDate.getFullYear() === today.getFullYear()) {
         htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + "</td>";
      }
      else {
         if (weekDay == 0 || weekDay == 6){ // Checks if the day is a sunday or a saturday
         htmlCode += "<td class='calendar_dates weekend'>" + i + "</td>";
      }        
         else {
            htmlCode += "<td class='calendar_dates'>" + i + "</td>";
         }
      }
      if (i == totalDays){ 
        if (weekDay < 6){  
            for (var x= weekDay; x < 6  ; x++){
                htmlCode += "<td class='emptycell'></td>";
            }
        }
      }
      if (weekDay === 6) htmlCode += "</tr>";
   }
   
   return htmlCode;
}

