export function formatDateTime(timestamp: string): [string, string] {
  // Special case for "0001-01-01T00:00:00Z"
  if (timestamp === '0001-01-01T00:00:00Z') {
    return ['1 January 0001', '12:00 AM'];
  }

  const date = new Date(timestamp);

  // Check if date is invalid
  if (isNaN(date.getTime())) {
    return ['-', '-'];
  }

  // Array of month names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format time
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0, make it 12

  // Format minutes with leading zero if needed
  const formattedMinutes = minutes.toString().padStart(2, '0');

  const dateString = `${day} ${month} ${year}`;
  const timeString = `${hours}.${formattedMinutes} ${ampm}`;

  return [dateString, timeString];
}
