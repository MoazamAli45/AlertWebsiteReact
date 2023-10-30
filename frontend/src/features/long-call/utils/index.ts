import { DateTime } from 'luxon';

export function generateMonthsColumnHeaders(dates: DateTime[]) {
  const months: Record<string, any> = {};

  for (let i = 0; i < dates.length; i++) {
    const month = dates[i].toFormat('MM-yyyy');
    months[month] = months[month] ? months[month] + 1 : 1;
  }

  return Object.entries(months).map(([month, colSpan]) => ({
    month: DateTime.fromFormat(`01-${month}`, 'dd-MM-yyyy'),
    colSpan,
  }));
}

export function generateDaysColumnHeaders(dates: DateTime[]) {
  const days: Record<string, any> = {};

  for (let i = 0; i < dates.length; i++) {
    const day = dates[i].toFormat('D');
    days[day] = days[day] ? days[day] + 1 : 1;
  }

  return Object.entries(days).map(([day, colSpan]) => ({
    day: DateTime.fromFormat(day, 'D'),
    colSpan,
  }));
}

function getColumnsPerDay(days: number) {
  if (days >= 12) return 1;

  switch (days) {
    case 1:
      return 18;
    case 2:
      return 9;
    case 3:
      return 6;
    case 4:
      return 5;
    case 5:
      return 4;
    case 6:
      return 3;
    default:
      return 2;
  }
}

function isBusinessDay(date: DateTime) {
  const Saturday = 6;
  const Sunday = 7;

  return date.weekday !== Saturday && date.weekday !== Sunday;
}

function outOfOpenHours(date: DateTime) {
  return (
    date.hour < 9 ||
    (date.hour === 9 && date.minute < 30) ||
    date.hour > 16 ||
    (date.hour === 16 && date.minute >= 0)
  );
}

function getDayColumns(date: DateTime, columnsPerDay: number) {
  const isCurrentDay = DateTime.now().day === date.day;
  const dayStart = DateTime.fromObject({
    ...date.toObject(),
    hour: 9,
    minute: 30,
  });

  let offset = 0;
  if (!outOfOpenHours(date)) {
    offset = date.diff(dayStart).milliseconds;
  }

  // from 9:30 till 16:00, 6 hours and 30 minutes
  const openMilliSeconds = 6.5 * 60 * 60 * 1000;
  const step =
    (isCurrentDay ? openMilliSeconds - offset : openMilliSeconds) /
    (columnsPerDay - 1);
  date = isCurrentDay ? date : date.set({ hour: 9, minute: 30 });
  const dayColumns: DateTime[] = [];

  for (let i = 0; i < columnsPerDay; i++) {
    const currentDate = date.plus({ milliseconds: step * i });
    dayColumns.push(currentDate);
  }

  return dayColumns;
}

function getExactColumns(date: DateTime, columnsPerDay: number) {
  const dayColumns: DateTime[] = [];

  for (let i = 0; i < columnsPerDay; i++) {
    const currentDate = date.set({ hour: 12, minute: 45 });
    dayColumns.push(currentDate);
  }

  return dayColumns;
}

function getDates(startDate: DateTime, endDate: DateTime) {
  const dates = [];

  let currentDate = startDate;
  while (currentDate <= endDate) {
    if (isBusinessDay(currentDate)) {
      dates.push(currentDate);
    }

    currentDate = currentDate.plus({ days: 1 });
  }

  const numElements = 17;

  if (dates.length < numElements) return dates;

  const stepSize = dates.length / numElements;
  const outputDates = [];

  for (let i = 0; i < numElements; i++) {
    outputDates.push(dates[Math.floor(i * stepSize)]);
  }

  outputDates.push(dates[dates.length - 1]);

  return outputDates;
}

export function generateTimeColumnHeaders(
  currentDate: DateTime,
  expirationDate: DateTime,
) {
  const daysColumns: any = [];

  if (
    currentDate.hour > 16 ||
    (currentDate.hour === 16 && currentDate.minute >= 0)
  ) {
    currentDate = currentDate.set({ hour: 9, minute: 30 }).plus({ days: 1 });
  }

  const dates = getDates(currentDate, expirationDate);
  const columnsPerDay = getColumnsPerDay(dates.length);

  for (let date of dates) {
    if (outOfOpenHours(date)) {
      date = date.set({ hour: 9, minute: 30 });
    }

    const dayColumns =
      columnsPerDay === 1
        ? getExactColumns(date, columnsPerDay)
        : getDayColumns(date, columnsPerDay);
    dayColumns.forEach((date) => daysColumns.push(date));
  }

  return daysColumns;
}