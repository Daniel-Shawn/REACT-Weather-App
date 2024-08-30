import React from 'react'
import { useState, useRef } from 'react'

import calm_icon from '../assets/calm.jpg'
import humidity_icon from '../assets/humidity.jpg'
import cloud_icon from '../assets/cloudy.jpg'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.jpg'
import snow_icon from '../assets/snow.png'
import avatar_icon from '../assets/avatar.jpeg'



function Weather() {

    const [weatherData, setWeatherData] = useState(false)
    const [result, setResult] = useState(false)
    const inputRef = useRef()

    const allIcons = {
        '01d': calm_icon,
        '01n': calm_icon,
        '02d': cloud_icon,
        '02n': cloud_icon,
        '03d': cloud_icon,
        '03n': cloud_icon,
        '04d': drizzle_icon,
        '04n': drizzle_icon,
        '09d': rain_icon,
        '09n': rain_icon,
        '10d': rain_icon,
        '10n': rain_icon,
        '13d': snow_icon,
        '13n': snow_icon
    }
    
    const search = async (city) => {
        if (city === ''){
            alert("Enter city before searching!")
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url)
            const data = await response.json()
            if (!response.ok){
                alert("That city has not been found. Check spelling or try another..")
                return;
            }
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            //console.log(data.weather[0]);
            
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
            setResult(true)

        } catch (error) {
            console.log(error);
            setResult(false)
            setWeatherData(false)
        }
    }


  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text" 
            placeholder='Search city'
            ref={inputRef}
            />

            <div className='search-icon'>
                <i className="fa-solid fa-magnifying-glass" onClick={() => {
                    search(inputRef.current.value)
                }}></i>
            </div>
        </div>
        {result ? (
            <>
            <img src={weatherData.icon} alt='Muddy fileds road' className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>
                {weatherData.location}
            </p>

            <hr />

            <div className="weather-data">
                <div className="col">
                    <i className="fa-solid fa-droplet"></i>
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <i className="fa-solid fa-wind"></i>
                    <div>
                        <span>Wind</span>
                        <p>{weatherData.windSpeed}</p>
                    </div>
                </div>
            </div>
            </>
        ) : (
            <>
            <img src={avatar_icon} alt='Avatar Icon' className='weather-icon' />
            
            <p>Use our App today!!!</p>
            </>
        )}
        
        
    </div>
  )
}

export default Weather