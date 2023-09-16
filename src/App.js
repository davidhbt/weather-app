import React, { useEffect, useState } from 'react'
import hotBg from './assets/hot.jpg'
import coldBg from './assets/cold.jpg'
import Descriptions from './components/Descriptions'
import { getFormattedWeatherData } from './weatherService'


function App() {
  const [city, setCity] = useState('paris')

  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState('metric')

  const [bg, setBg] = useState(hotBg)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city)
      setWeather(data)
      const threshold = 20;
      if (data.temp <= threshold) setBg(coldBg)
      else setBg(hotBg)
    }
    fetchWeatherData()

    //background

  }, [city])

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  return (
    <div className='app' style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input onKeyDown={enterKeyPressed} type="text" name='city' placeholder='enter city' />
            </div>
            <div className="section section__temp">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather icon " />
                <h3>{weather.description}</h3>
              </div>
              <div className="temp">
                <h1>{`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</h1>

              </div>
            </div>
            {/* bottom dec */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}

      </div>
    </div>
  )
}

export default App
