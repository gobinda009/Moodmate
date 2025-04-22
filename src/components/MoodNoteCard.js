import React from 'react'
import { Card, CardBody, CardText } from 'reactstrap'

const MoodNoteCard = ({ emoji, text, date, temperature, location, darkMode }) => {
  return (
    <Card style={{
      backgroundColor: darkMode ? '#333' : '#fff3e6',
      borderRadius: '16px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      width: '100%',
      padding: '12px',
      color: darkMode ? 'white' : 'black'
    }}>
      <CardBody style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '0'
      }}>
        <div style={{ fontSize: '24px' }}>{emoji}</div>
        <CardText style={{ fontWeight: '500' }}>{text}</CardText>
        <div style={{
          fontSize: '14px',
          color: darkMode ? '#ccc' : '#555',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{date}</span>
          <span>
            {temperature && `${temperature}`} 
            {location?.city && ` • ${location.city}`}
          </span>
        </div>
      </CardBody>
    </Card>
  )
}

export default MoodNoteCard