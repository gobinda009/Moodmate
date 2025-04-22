import React, { useState, useEffect } from 'react'
import { Card, CardBody } from 'reactstrap'

const CustomCard = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const weatherIcons = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Snow: '❄️',
    Thunderstorm: '⚡',
    Drizzle: '🌦️',
    Mist: '🌫️',
  }

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const API_KEY = '1028ab98069aec2a1dfccd1607595da3'
        const controller = new AbortController()

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }

        const data = await response.json()
        setWeatherData({
          temperature: data.main.temp,
          city: data.name,
          weatherCondition: data.weather[0].main,
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            fetchWeatherData(latitude, longitude)
          },
          (error) => {
            setError('Failed to retrieve location')
            setLoading(false)
          }
        )
      } else {
        setError('Geolocation is not supported by this browser.')
        setLoading(false)
      }
    }

    getUserLocation()

    return () => {
      // Cleanup on component unmount
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const weatherIcon = weatherIcons[weatherData.weatherCondition] || '🌤️' // Default if condition is not mapped

  return (
    <Card
      style={{
        width: '50%',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>Moodmate</h2>
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: '#eee',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            color: '#555',
          }}
        >
          <span style={{ marginRight: '6px' }}>{weatherIcon}</span>
          {weatherData.temperature}°C, {weatherData.city}
        </div>
      </div>

      {/* Body Section */}
      <CardBody
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0,
        }}
      >
        {children}
      </CardBody>
    </Card>
  )
}

export default CustomCard
