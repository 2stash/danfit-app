
export const totalsCalculator = (workouts) => {
  let today = new Date();
  let dayOfWeek = today.getDay();
  let dayOfMonth = today.getDate();
  let diff = dayOfMonth - dayOfWeek;
  let startOfWeek = new Date();
  startOfWeek.setDate(diff)

  let startOfWeekMinusOne = new Date(startOfWeek)
  startOfWeekMinusOne.setDate(-1)
  console.log(startOfWeekMinusOne,  " start of week")
  const thisWeeksWorkouts = []
  for(let i = 0; i < 7;i++){
      // let workoutDate = thisWeeksWorkouts[i];
      // let day = workoutDate.getDate()
      // let month = workoutDate.getMonth();
      // let year = workoutDate.getFullYear();

      // if(year == startOfWeek.getFullYear() && month >= startOfWeek.getMonth() && day >= startOfWeek.)
      console.log(workouts[i].date , " i " , i )
      if(workouts[i].date > startOfWeekMinusOne){
        console.log(workouts[i] , "if was true")
      }

  }
}