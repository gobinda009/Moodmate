import React, { useState, useEffect } from 'react'
import { Card, CardBody, Col, Row, Button, Input } from 'reactstrap'
import { fetchWeatherData } from './api/weatherApi'; // Import the new API function
import { ToastContainer, toast } from 'react-toastify';

const MoodSelector = ({ selectedDate, darkMode }) => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [text, setText] = useState('')
  const [location, setLocation] = useState({
    city: '',
    latitude: '',
    longitude: '',
    temperature: ''
  })
  

  const moods = [
    { emoji: '😊', value: 'happy' },
    { emoji: '😐', value: 'neutral' },
    { emoji: '😕', value: 'confused' },
    { emoji: '😡', value: 'angry' },
    { emoji: '🤢', value: 'sick' }
  ]

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const weatherData = await fetchWeatherData(latitude, longitude)
  
          setLocation({
            latitude,
            longitude,
            city: weatherData.city,
            temperature: `${weatherData.temperature}°C`,
            weatherCondition: weatherData.weatherCondition
          })
        } catch (err) {
          console.error(err)
          setLocation({
            latitude,
            longitude,
            city: 'Unknown City',
            temperature: 'N/A',
            weatherCondition: 'N/A'
          })
        }
      })
    }
  }, [])
  
  const handleMoodClick = (value) => {
    setSelectedMood(value)
  }

  const handleSave = () => {
    const date = selectedDate?.format('MMMM D, YYYY')
    if (!date) {
      toast.error('Please select a date.')
      return
    }
  
    if (!selectedMood) {
      toast.error('Please select your mood.')
      return
    }
  
    if (!text.trim()) {
      toast.error('Please enter a note.')
      return
    }
  
    const newEntry = {
      date,
      mood: selectedMood,
      note: text,
      location: {
        city: location.city,
        latitude: location.latitude,
        longitude: location.longitude,
        temperature: location.temperature,
        weatherCondition: location.weatherCondition
      }
    }
  
    const existingEntries = JSON.parse(localStorage.getItem('moodEntries')) || []
    const updatedEntries = [newEntry, ...existingEntries]
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries))
  
    toast.success('Mood saved to localStorage!')
    setSelectedMood(null)
    setText('')
  }

  return (
    <>
    <ToastContainer position="top-center" autoClose={2000} />
    <Card
      style={{
        maxWidth: 400,
        margin: 'auto',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: darkMode ? '#333' : '#fff3e6', // Dark mode background
        color: darkMode ? '#f5f5f5' : '#222', // Text color change based on dark mode
        transition: 'all 0.3s ease',
      }}
    >
      <CardBody style={{ paddingTop: '1.5rem' }}>
        <Row className='text-center'>
          <Col md={12}>
            <div className='mt-2' style={{ fontWeight: 600, fontSize: "26px" }}>{selectedDate?.format('MMMM D, YYYY')}</div>
            <div className='mt-2' style={{ fontWeight: 400, fontSize: "20px" }}>How are you feeling today?</div>
          </Col>
          <Col md={12}>
            <div style={{ width: '70%', margin: 'auto' }}>
              {/* Emoji Selector */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '1rem', marginBottom: '1rem' }}>
                {moods.map((mood, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: selectedMood === mood.value ? '36px' : '32px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      transform: selectedMood === mood.value ? 'scale(1.2)' : 'scale(1)',
                      color: darkMode ? '#f5f5f5' : '#222', // Adjust emoji color in dark mode
                    }}
                    onClick={() => handleMoodClick(mood.value)}
                  >
                    {mood.emoji}
                  </span>
                ))}
              </div>

              {/* Textarea */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h5 style={{ fontWeight: 600, width: '100%', textAlign: 'left' }}>Let’s write about it</h5>
                <Input
                  type='textarea'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder='Add a note'
                  style={{
                    borderRadius: '8px',
                    padding: '10px',
                    marginTop: '10px',
                    minHeight: '70px',
                    marginBottom: '20px',
                    width: '100%',
                    backgroundColor: darkMode ? '#444' : '#fff', // Adjust textarea background color in dark mode
                    color: darkMode ? '#f5f5f5' : '#222', // Adjust textarea text color
                    border: darkMode ? '1px solid #555' : '1px solid #ccc', // Adjust border color
                  }}
                />
              </div>

              {/* Save Button */}
              <div style={{ textAlign: 'center' }}>
                <Button
                  style={{
                    backgroundColor: '#3d63dd',
                    borderRadius: '18px',
                    padding: '10px 30px',
                    fontWeight: '600',
                    width: '100%',
                    color:"white",
                    marginBottom: '30px',
                  }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
    </>
  )
}

export default MoodSelector
