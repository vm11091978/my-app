'use client';

import React, { useState, useEffect } from 'react';

export default function Tick() {
  // Initialize the current time to the current date and time
  const [time, setTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Extract the hours, minutes, and seconds from the current time
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Format the time as a string
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Сделаем ещё секундомер отсчитывающий время с момента захода на страницу
  const [second, setSecond] = useState(0);
  const [width, setWidth] = useState(0);
  const [color, setColor] = useState('yellow');

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond(second + 1);
      setWidth(width + 5);
      if (color == 'yellow') {
        setColor('orange');
      } else if (color == 'orange') {
        setColor('yellow');
      }
      if (width >= 295) {
        setWidth(0);
      } 
    }, 1000);
    
    // очистка интервала
    return () => clearInterval(timer);
  }, [second, width, color]);

  const min = Math.floor(second/60);
  const sec = second%60;

  const spacing = 2;

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2 style={{ marginBottom: spacing + 'em' }} >It is {timeString}.</h2>
      <h2>Вы находитесь на странице {min} минут и {sec} секунд</h2>
      <div style={{ width: width + 'px', height: '30px', backgroundColor: color }} ></div>
    </div>
  );
}
