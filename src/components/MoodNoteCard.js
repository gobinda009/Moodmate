import React from 'react'
import { Card, CardBody, CardText } from 'reactstrap'

const MoodNoteCard = ({ emoji, text, date, temperature, location, darkMode, notesCount }) => {
  const cardStyles = {
    backgroundColor: darkMode ? '#1e1e1e' : '#fff3e6',
    borderRadius: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    width: notesCount > 1 ? '100%' : '50%', // Use notesCount to adjust width
    padding: '12px',
    color: darkMode ? '#f5f5f5' : '#222'
  }

  const textStyles = {
    fontWeight: '500',
    color: darkMode ? '#e0e0e0' : '#333',
    fontSize:"20px"
  }

  const footerStyles = {
    fontSize: '16px',
    fontWeight: '400',
    color: darkMode ? '#aaa' : '#555',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  return (
    <Card style={cardStyles}>
      <CardBody style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ fontSize: '44px' }}>{emoji}</div>
          <CardText style={textStyles}>{text}</CardText>
        </div>
        <div style={footerStyles}>
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
