import React, { useState, useEffect, useRef } from 'react'
import NotesGrid from './NoteGrid'
import { FaFilter } from 'react-icons/fa'

const MoodNotesPage = ({ onFlagChange, darkMode, flag, setFlag }) => {
    const [showFilter, setShowFilter] = useState(false)
    const [selectedMood, setSelectedMood] = useState('all')
    const filterRef = useRef(null)

    const moods = [
        { emoji: '📋', value: 'all' },
        { emoji: '😊', value: 'happy' },
        { emoji: '😐', value: 'neutral' },
        { emoji: '😕', value: 'confused' },
        { emoji: '😡', value: 'angry' },
        { emoji: '🤢', value: 'sick' }
    ]

    const toggleFilterDropdown = () => setShowFilter(prev => !prev)

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood)
        setShowFilter(false)
    }

    const handleExport = () => {
        const notes = JSON.parse(localStorage.getItem('moodEntries')) || []

        if (!notes.length) {
            alert('No mood entries to export.')
            return
        }

        const headers = [
            'Mood', 'Note', 'Date',
            'City', 'Latitude', 'Longitude',
            'Temperature', 'Weather Condition'
        ]

        const csvRows = [headers.join(',')]

        notes.forEach(entry => {
            const location = entry.location || {}

            const row = [
                entry.mood || '',
                `"${(entry.note || '').replace(/"/g, '""')}"`, // Escape double quotes
                entry.date || '',
                `"${location.city || ''}"`,
                location.latitude || '',
                location.longitude || '',
                location.temperature || '',
                `"${location.weatherCondition || ''}"`
            ]

            csvRows.push(row.join(','))
        })

        const csvData = csvRows.join('\n')
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'mood-detailed-export.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilter(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div
            style={{
                padding: '40px 20px',
                background: darkMode ? '#333' : 'linear-gradient(to bottom, #fba863, #e87072)',
                color: darkMode ? 'white' : '#333',
                fontFamily: 'sans-serif',
                width: '100%',
                borderRadius: '16px',
                marginTop: '20px'
            }}
        >
            {/* Header */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
                <div
                    style={{
                        backgroundColor: darkMode ? '#444' : 'white',
                        color: darkMode ? 'white' : '#333',
                        borderRadius: '16px',
                        padding: '8px 24px',
                        width: 'fit-content',
                        margin: '0 auto',
                        fontSize: '20px',
                        fontWeight: '600'
                    }}
                >
                    All Notes
                </div>

                {/* Right Actions: Export + Filter */}
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: "center",
                        gap: '30px'
                    }}
                >
                    <button
                        onClick={handleExport}
                        style={{
                            backgroundColor: darkMode ? '#555' : '#fff',
                            color: darkMode ? '#fff' : '#333',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        Export
                    </button>

                    <FaFilter
                        onClick={toggleFilterDropdown}
                        title="Filter by mood"
                        style={{
                            fontSize: '20px',
                            cursor: 'pointer',
                            color: darkMode ? '#fff' : '#fff'
                        }}
                    />
                </div>

                {/* Mood Dropdown */}
                {showFilter && (
                    <div
                        ref={filterRef}
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 'calc(100% + 10px)',
                            backgroundColor: darkMode ? '#444' : '#fff',
                            color: darkMode ? '#fff' : '#333',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            zIndex: 10,
                            minWidth: '160px'
                        }}
                    >
                        {moods.map(({ emoji, value }) => (
                            <div
                                key={value}
                                onClick={() => handleMoodSelect(value)}
                                style={{
                                    padding: '10px 16px',
                                    cursor: 'pointer',
                                    borderBottom: `1px solid ${darkMode ? '#555' : '#eee'}`,
                                    backgroundColor:
                                        selectedMood === value ? (darkMode ? '#555' : '#f0f0f0') : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                            >
                                <span>{emoji}</span>
                                <span style={{ textTransform: 'capitalize' }}>{value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Notes Grid */}
            <NotesGrid
                darkMode={darkMode}
                filterMood={selectedMood}
                flag={flag}
                setFlag={setFlag}
            />
        </div>
    )
}

export default MoodNotesPage
