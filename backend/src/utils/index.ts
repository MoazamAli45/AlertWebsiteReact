import { DateTime } from 'luxon';

export function getLatestMarketOpen() {
  return DateTime.now()
    .setZone('America/New_York')
    .startOf('day')
    .plus({ hours: 9, minutes: 30 });
}
