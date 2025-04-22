import React from 'react'
import { Card, CardBody, CardText } from 'reactstrap'

const MoodNoteCard = ({ emoji, text, date, temperature }) => {
  return (
    <Card style={{
      backgroundColor: '#fff3e6',
      borderRadius: '16px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      width: '100%',
      padding: '12px'
    }}>
      <CardBody style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '0'
      }}>
        <div style={{ fontSize: '24px' }}>{emoji}</div>
        <CardText style={{ fontWeight: '500', color:'black' }}>{text}</CardText>
        <div style={{
          fontSize: '14px',
          color: '#555',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{date}</span>
          {temperature && <span>{temperature}</span>}
        </div>
      </CardBody>
    </Card>
  )
}

export default MoodNoteCard
