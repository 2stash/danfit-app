export const dayOfTheWeek = (date)=> {
  let dayOfWeek = date.getDay();
  if(dayOfWeek == 0) return "Sunday"
  if(dayOfWeek == 1) return "Monday"
  if(dayOfWeek == 2) return "Tuesday"
  if(dayOfWeek == 3) return "Wednesday"
  if(dayOfWeek == 4) return "Thursday"
  if(dayOfWeek == 5) return "Friday"
  if(dayOfWeek == 6) return "Saturday"
}