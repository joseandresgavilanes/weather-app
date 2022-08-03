import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'

const CardContent = ({lat, lon}) => {
  
  
const [weather, setWeather] = useState()

const [temperature, setTemperature] = useState()

const [isCelsius, setIsCelsius] = useState(true)

const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    if(lat){
    const ApiKey = 'f49fa229406ef6c719842640240c5f19'
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}`
    
    axios.get(URL)
    .then(res => {
      setWeather(res.data)
      const temp = {
        celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
        farenheit : `${Math.round((res.data.main.temp -273.15) * 9/5 +32)} °F`
      }
      setTemperature(temp)
      setIsLoading(false)
    })
    .catch(err => console.log(err))
}
    
  }, [lat, lon])
  

  console.log(weather);

  const handleClick = () => setIsCelsius(!isCelsius)

  if (isLoading) {
    return <Loading/>
  } else {
    
    return ( 
      <article className='principalContainer'>
        <div className="main_info">
        <h1><i className="fa-solid fa-location-dot"></i> {`${weather?.name}, ${weather?.sys.country}`}</h1>
        <div className='weather_info'> 
          <div>
            <h3>{weather?.weather[0].description}</h3>
          </div>
        
        <img className='weather_image' src={`http://openweathermap.org/img/wn/02n@4x.png`} alt="" />
        <h2 className='temperature'>{isCelsius ? temperature?.celsius : temperature?.farenheit}</h2>
        
        <button className='change_temperature' onClick={handleClick}> <i className="fa-solid fa-repeat"></i> {isCelsius ? "Change to °F" : "Change to °C"} </button>
        </div>
        </div>
        <ul>
              <li><span className='title_small_card_weather'>Wind Speed</span> <i className="fa-solid fa-wind"></i> <span className='data_li'> {weather?.wind.speed}m/s</span></li>
              <li><span  className='title_small_card_weather'>Clouds</span> <i className="fa-solid fa-cloud"></i> <span  className='data_li'> {weather?.clouds.all}%</span></li>
              <li><span className='title_small_card_weather'>Pressure</span> <i className="fa-solid fa-temperature-three-quarters"></i> <span className='data_li'> {weather?.main.pressure}hPa</span></li>
              
            </ul>
      </article>
    )
  }
}

export default CardContent