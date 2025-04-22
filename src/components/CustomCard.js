import React, { useState, useEffect } from 'react'
import { Card, CardBody } from 'reactstrap'
import { fetchWeatherData } from './api/weatherApi' // Adjust the path as needed

const CustomCard = ({ children, darkMode, onViewAll }) => {
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
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            try {
              const data = await fetchWeatherData(latitude, longitude)
              setWeatherData(data)
            } catch (err) {
              setError(err.message)
            } finally {
              setLoading(false)
            }
          },
          () => {
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
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const weatherIcon = weatherIcons[weatherData.weatherCondition] || '🌤️'

  const getLightModeColor = (temp) => {
    if (temp <= 0) return '#d1e7f3'
    if (temp <= 15) return '#a0c4e4'
    if (temp <= 25) return '#ffe0b2'
    if (temp <= 35) return '#ffebcc'
    return '#f0e5d8'
  }

  const getDarkModeColor = (temp) => {
    if (temp <= 0) return '#1e293b'
    if (temp <= 15) return '#334155'
    if (temp <= 25) return '#3f3f46'
    if (temp <= 35) return '#4b5563'
    return '#57534e'
  }

  const cardBackgroundColor = darkMode
    ? getDarkModeColor(weatherData.temperature)
    : getLightModeColor(weatherData.temperature)

  const textColor = darkMode ? '#fff' : '#000'
  const badgeBg = darkMode ? '#475569' : '#eee'
  const badgeText = darkMode ? '#f8fafc' : '#555'

  return (
    <Card
      style={{
        width: '50%',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: cardBackgroundColor,
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0, color: textColor }}>Moodmate</h2>
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: badgeBg,
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            color: badgeText,
          }}
        >
          <span style={{ marginRight: '6px' }}>{weatherIcon}</span>
          {weatherData.temperature}°C, {weatherData.city}
        </div>
      </div>

      {/* Main Body */}
      <CardBody
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0,
          marginTop: '45px',
          color: textColor,
        }}
      >
        {children}
      </CardBody>

      {/* View All Button */}
      {onViewAll && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button
            onClick={onViewAll}
            style={{
              padding: '8px 16px',
              backgroundColor: darkMode ? '#334155' : '#ddd',
              color: darkMode ? '#fff' : '#000',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.3s',
            }}
          >
            View All
          </button>
        </div>
      )}
    </Card>
  )
}

export default CustomCard
