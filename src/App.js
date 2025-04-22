import React, { useState } from 'react'
import BasicDateCalendar from './components/CalenderView'
import MoodSelector from './components/MoodSelector'
import CustomCard from './components/CustomCard'
import MoodNotesPage from './components/MoodNotesPage'
import dayjs from 'dayjs'

function App() {
  const [showMoodNotes, setShowMoodNotes] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedDate, setSelectedDate] = useState(dayjs())

  const handleFlagChange = () => {
    setShowMoodNotes(false)
  }

  const handleViewAll = () => {
    setShowMoodNotes(true)
  }

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px',
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: darkMode ? '#1e1e1e' : '#ebefee',
        color: darkMode ? '#f5f5f5' : '#222',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Toggle Switch - Top Right */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#333' }}>
            {darkMode ? 'Dark' : 'Light'} Mode
          </span>
          <label style={{ position: 'relative', display: 'inline-block', width: '46px', height: '24px' }}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: darkMode ? '#4a4a4a' : '#ccc',
                transition: '.4s',
                borderRadius: '34px',
              }}
            />
            <span
              style={{
                position: 'absolute',
                height: '18px',
                width: '18px',
                left: darkMode ? '24px' : '4px',
                bottom: '3px',
                backgroundColor: '#fff',
                transition: '.4s',
                borderRadius: '50%',
              }}
            />
          </label>
        </div>
      </div>
      {/* Main Card Content */}
      <CustomCard darkMode={darkMode} onViewAll={handleViewAll}>
        {showMoodNotes ? (
          <MoodNotesPage
            onFlagChange={handleFlagChange}
            darkMode={darkMode}
            isMoodNotes
          />
        ) : (
          <>
            <div style={{ width: '50%', margin: '0 10px' }}>
              <div style={{ marginBottom: '20px' }}>
                <MoodSelector selectedDate={selectedDate} darkMode={darkMode} />
              </div>
            </div>
            <div style={{ width: '50%', margin: '0 10px' }}>
              <div style={{ marginBottom: '20px' }}>
                <BasicDateCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </>
        )}

      </CustomCard>
    </div>
  )
}

export default App
