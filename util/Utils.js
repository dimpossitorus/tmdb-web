export function convertFriendlyTime(minutes) {
  let timeString = ""
  let hour = parseInt(minutes / 60)
  let minute = parseInt(minutes % 60)
  if (hour > 1) {
    timeString = `${hour} hours `
  } else if (hour > 0) {
    timeString = `${hour} hour `
  }
  if (minute > 1) {
    timeString += `${minute} minutes`
  } else {
    timeString += `${minute} minute`
  }
  return timeString

}
