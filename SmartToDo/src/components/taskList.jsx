import React, { useEffect, useState } from 'react';

const outdoorKeywords = ['outdoor', 'run', 'walk', 'jog', 'picnic', 'hike'];

const TaskList = ({ tasks, deleteTask }) => {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (lat, lon) => {
    try {
      const apiKey = '2c8921512d7ee8a98cf728652283b3c8'; // Replace with your OpenWeatherMap API key
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setWeather({
        temp: data.main.temp,
        condition: data.weather[0].main,
        location: data.name,
      });
    } catch (err) {
      console.error('Weather fetch failed:', err);
    }
  };

  useEffect(() => {
    const hasOutdoorTask = tasks.some((task) =>
      outdoorKeywords.some((word) =>
        task.text.toLowerCase().includes(word)
      )
    );

    if (hasOutdoorTask && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error.message);
        }
      );
    }
  }, [tasks]);

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const sortedTasks = [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <>
      {weather && (
        <div className="weather-info">
          🌤️ Weather in {weather.location}: {weather.temp}°C, {weather.condition}
        </div>
      )}
      <ul className="list">
        {sortedTasks.map((task, i) => (
          <li key={i} className={`list-item ${task.priority.toLowerCase()}`}>
            <span>
              {task.text} - <strong>{task.priority}</strong>
            </span>
            <button onClick={() => deleteTask(i)} className="delete-button">
              ❌
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
