import { useEffect, useState } from 'react';

const useCountdown = (targetDate) => {

  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  let days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  if (days + hours + minutes + seconds <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  }
  if(minutes.toString().length == "1"){
    minutes = "0"+ minutes;
  }
  if(seconds.toString().length == "1"){
    seconds = "0"+ seconds;
  }

  return [days, hours, minutes, seconds];
};

export { useCountdown };