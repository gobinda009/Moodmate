import React, { useState, useEffect } from 'react'
import { Card, CardBody } from 'reactstrap'
import { fetchWeatherData } from './api/weatherApi' // Adjust the path as needed

const CustomCard = ({ children, darkMode }) => {
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
        if (temp <= 2) return '#d1e7f3'
        if (temp <= 17) return '#a0c4e4'
        if (temp <= 27) return '#ffe0b2'
        if (temp <= 37) return '#ffebcc'
        return '#f0e5d8'
    }
    
    const getDarkModeColor = (temp) => {
        if (temp <= 2) return '#1e293b'
        if (temp <= 17) return '#334155'
        if (temp <= 27) return '#3f3f46'
        if (temp <= 37) return '#4b5563'
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
                width: '90%',
                maxWidth: '900px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                backgroundColor: cardBackgroundColor,
                transition: 'background-color 0.3s ease',
                margin: '0 10px', // slight margin for small screens
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
                    <span
                        style={{
                            marginRight: '6px',
                            fontSize: '20px', // Adjust this to make the icon the right size
                            lineHeight: '1', // Align the icon vertically with text
                        }}
                    >
                        {weatherIcon}
                    </span>
                    {weatherData.temperature}°C, {weatherData.city}
                </div>

            </div>

            {/* Main Body */}
            <CardBody
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: 0,
                    marginTop: '45px',
                    color: textColor,
                }}
            >
                {children}
            </CardBody>


            {/* View All Button */}
        </Card>
    )
}

export default CustomCard
