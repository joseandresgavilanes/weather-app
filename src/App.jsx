
import './App.css'
import { useEffect, useState } from 'react'
import CardContent from './components/CardContent'


function App() {
  
  const [cords, setCords] = useState()

  useEffect(() => {
    const success = (pos) => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
    setCords(latlon)

  }
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  return (
    <div className="App">
        <CardContent lon={cords?.lon}  lat={cords?.lat} />
    </div>
  )
}

export default App
