import moment from 'moment';

export const getStatus = (session) => { // eslint-disable-line
  const { startDate, endDate } = session;
  const now = moment();

  if (now.diff(startDate) < 0) {
    return 'Pending';
  } else if (now.diff(startDate) >= 0 && now.diff(endDate) < 0) {
    return 'Active';
  }
  return 'Finished';
};
