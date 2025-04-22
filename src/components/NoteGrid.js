import React from 'react'
import MoodNoteCard from './MoodNoteCard'

const notesData = [
  { emoji: '😊', text: 'Felt great after my morning jog', date: 'April 24, 2024' },
  { emoji: '😴', text: 'Tired after a long day at work', date: 'April 22, 2024', temperature: '20°C' },
  { emoji: '😔', text: 'A bit of a rough day', date: 'April 23, 2024' },
  { emoji: '😡', text: 'Traffic was terrible on the way home', date: 'April 21, 2024', temperature: '24°C' },
  { emoji: '☹️', text: 'Feeling down today', date: 'April 20, 2024' },
  { emoji: '😁', text: 'Had a nice time with friends', date: 'April 19, 2024', temperature: '22°C' }
]

const NotesGrid = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    }}>
      {notesData.map((note, idx) => (
        <MoodNoteCard key={idx} {...note} />
      ))}
    </div>
  )
}

export default NotesGrid
