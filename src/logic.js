import { useState, useEffect } from 'react';
import moment from 'moment';

const dateFormat = "MM/DD";
const timeFormat = "hh:mma";
const useDate = () => {
  const [m, setM] = useState(moment(null));
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  useEffect(
    () => {
      if (date && time) {
        setM(
          moment(`${date.toDateString()} ${time.toTimeString()}`)
        );
      }
    },
    [time, date]
  );
  return [m, time, setTime, date, setDate];
}

export default () => {
  const [username, setUsername] = useState('');
  const [start, startTime, setStartTime, startDate, setStartDate] = useDate();
  const [end, endTime, setEndTime, endDate, setEndDate] = useDate();
  const [title, setTitle] = useState('');
  const [output, setOutput] = useState(null);
  const [isValid, setIsValid] = useState(false);
  useEffect(
    () => setIsValid(
      [title, username].reduce((prev, it) => prev && it.length > 0, true) &&
      start.isValid() &&
      end.isValid(),
    ),
  [username, title, start, end]);
  useEffect(
    () => {
      if (isValid) {
        setOutput(`"${title}" ${start.format(timeFormat)} ${end.format(timeFormat)} start-date ${start.format(dateFormat)} end-date ${end.format(dateFormat)} description "%g%n@Raid%n%nHosted by: @${username}%n%nMembers Participating: %n%nHunters: %{mention Hunter}%nWarlocks: %{mention Warlock}%nTitans: %{mention Titan}%nBackups: %{mention Maybe}%n%nDon't forget to bring raid banners, and react to the post to be invited!%n%n"`);
      } else {
        setOutput(null);
      }
    }, 
  [username, title, start, end, isValid]);
  const ret = {
    output,
    isValid,
    username,
    setUsername,
    title,
    setTitle,
    start,
    startTime,
    setStartTime,
    startDate,
    setStartDate,
    end,
    endTime,
    setEndTime,
    endDate,
    setEndDate,
  };
  if (process.env.NODE_ENV === 'development') {
    window.state = ret;
    window.moment = moment;
  }
  return ret;
}