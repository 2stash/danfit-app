export const totalsCalculator = (workouts) => {
  let today = new Date();
  let dayOfWeek = today.getDay();
  let dayOfMonth = today.getDate();
  let diff = dayOfMonth - dayOfWeek;
  let startOfWeek = new Date();
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0);
  startOfWeek.setMinutes(0);
  const thisWeeksWorkouts = [];

  let loop = 50;
  if(workouts.length < 50){
    loop = workouts.length
  }
  
  for (let i = 0; i < loop; i++) {
    if (Date.parse(workouts[i].date) > Date.parse(startOfWeek)) {
      thisWeeksWorkouts.push(workouts[i]);
    }
  }
  return thisWeeksWorkouts;
};
