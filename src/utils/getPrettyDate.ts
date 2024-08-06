export default function getPrettyDate(date: Date) {
  const daysArr = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
  const monthsArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const day: string = daysArr[date.getDay()];
  const dateNum: number = date.getDate();
  const month: string = monthsArr[date.getMonth()];
  const year: number = date.getFullYear();
  const hours = date.getHours();
  let mins = date.getMinutes().toString();
  if (mins.length < 2) mins = `0${mins}`;
  return `${day}   ${dateNum} ${month} ${year}   ${hours}:${mins}`;
}
