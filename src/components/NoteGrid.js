import React, { useEffect, useState } from 'react'
import MoodNoteCard from './MoodNoteCard'
import moment from 'moment'

const NotesGrid = ({ darkMode, filterMood, flag, setFlag}) => {
  const [notesData, setNotesData] = useState([])

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('moodEntries')) || []

    const sortedNotes = savedNotes.sort((a, b) => {
      const dateA = moment(a.date, 'MMMM D, YYYY')
      const dateB = moment(b.date, 'MMMM D, YYYY')
      return dateB.diff(dateA)
    })
    setNotesData(sortedNotes)
  }, [flag])

  // Filter notes based on the selected mood
  const filteredNotes = filterMood === 'all' 
    ? notesData 
    : notesData.filter(note => note.mood === filterMood)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)', // always 2 columns
      gap: '20px',
      marginTop: '20px'
    }}>
      {filteredNotes.map((note, idx) => (
        <MoodNoteCard
          key={idx}
          emoji={getEmoji(note.mood)}
          text={note.note}
          date={note.date}
          temperature={note.location?.temperature}
          location={note.location}
          darkMode={darkMode}
          notesCount={filteredNotes.length}
        />
      ))}
    </div>
  )
}

const getEmoji = (mood) => {
  const emojiMap = {
    happy: '😊',
    neutral: '😐',
    confused: '😕',
    angry: '😡',
    sick: '🤢'
  }
  return emojiMap[mood] || '🙂'
}

export default NotesGrid
