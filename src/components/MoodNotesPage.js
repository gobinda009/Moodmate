import React, { useState } from 'react'
import NotesGrid from './NoteGrid'

const MoodNotesPage = ({ onFlagChange }) => {
    const handleCompo = () => {
        onFlagChange(); // Call the function passed as a prop to update the flag state
    };
    return (
        <div style={{
            padding: '40px 20px',
            background: 'linear-gradient(to bottom, #fba863, #e87072)',
            color: 'white',
            fontFamily: 'sans-serif',
            width:"100%",
            borderRadius:"16px",
            marginTop:"20px"
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <button style={{
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    color: '#333',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    
                }}
                onClick={handleCompo}
                >
                    + Add Note
                </button>
            </div>
            <div style={{
                backgroundColor: 'white',
                color: '#333',
                borderRadius: '16px',
                padding: '8px 24px',
                margin: '0 auto',
                width: 'fit-content',
                fontSize: '20px',
                fontWeight: '600'
            }}>
                All Notes
            </div>

            <NotesGrid />
        </div>
    )
}

export default MoodNotesPage
