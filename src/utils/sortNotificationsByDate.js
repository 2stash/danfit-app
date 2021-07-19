export const sortNotificationsByDate = (notifications) =>{
  notifications.sort(sortMinute)
  notifications.sort(sortHour)

}

const sortMinute = (a,b)=>{
  if(a.minute < b.minute){
    return -1;
  }
  if(a.minute > b.minute){
    return 1;
  }
  return 0;
}

const sortHour = (a,b) =>{
  if(a.hour < b.hour){
    return -1;
  }
  if(a.hour > b.hour){
    return 1;
  }
  return 0;
}