/**
 * Returns formatted date readable on UI, example:
 *  - input: '2022-01-30T12:56:35.659Z'
 *  - output: '30-01-2022 13:56'.
 */
export function formatDate(date?: Date): string {
  if (!date) return 'invalid date';

  date = new Date(date);

  return ('0' + date.getDate()).slice(-2) + '-' +
    ('0'+(date.getMonth()+1)).slice(-2) + '-' +
    date.getFullYear() + ' ' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2);
}
