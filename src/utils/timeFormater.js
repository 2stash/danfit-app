export const timeFormater =(hour, minute) => {
  let formatedHour = hour
  let formatedMinute = minute
  
  if(minute <10 ){
    formatedMinute = "0"+minute
  }


  if(hour > 12){
    formatedHour = hour - 12
    return formatedHour  + ":" + formatedMinute + "pm"
  }

  return formatedHour  + ":" + formatedMinute + "am"
}