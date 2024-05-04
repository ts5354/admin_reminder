
const CALENDAR_ID = PropertiesService.getScriptProperties().getProperty("CALENDAR_ID_");
const WEBHOOK_URL = PropertiesService.getScriptProperties().getProperty("WEBHOOK_URL_");
var weekday = ["日", "月", "火", "水", "木", "金", "土"];

function Remind() {

var today = new Date();
var message = "";
for ( var i = 1; i < 3; i++ ) {
    var dt = new Date(); 
    dt.setDate(today.getDate() + i);
    var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    

    var calendarName = calendar.getId()
    var events = calendar.getEventsForDay(dt);
    if(events.length == 0 || calendarName == undefined) {
        continue;
    }
    else{
        
        message += Utilities.formatDate(dt, 'JST', 'MM/dd(' + weekday[dt.getDay()] + ')') + "\n";
        var dayText = "";
        


        dayText +="-----------------------" + "\n";

        for ( var j = 0; j < events.length; j++ ) {
            dayText += String(Utilities.formatDate(events[j].getStartTime(), "JST", "HH:mm"));
            dayText += "-"
            dayText += String(Utilities.formatDate(events[j].getEndTime(), "JST", "HH:mm"));
            dayText += "\n"
            dayText += String(events[j].getTitle()+'\n');
            dayText += "\n"
            dayText +="```イベントまであと"+i+"日```"
            dayText += "\n"
            dayText += "\n"
            
        }
        message += dayText;
    }
}
if (message !== "") {
    const payload = {
    username:PropertiesService.getScriptProperties().getProperty("USER_NAME_"),
    content: message,
    };

  UrlFetchApp.fetch(WEBHOOK_URL, {
  method: "post",
  contentType: "application/json",
  payload: JSON.stringify(payload),
  });
  }
}