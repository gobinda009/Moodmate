import React, { useState } from 'react'
import {
    Card,
    CardBody,
    Col,
    Row,
    Button,
    Input
} from 'reactstrap'

const MoodSelector = () => {
    const [selectedMood, setSelectedMood] = useState(null)
    const [text, setText] = useState('')

    const moods = [
        { emoji: '😊', value: 'happy' },
        { emoji: '😐', value: 'neutral' },
        { emoji: '😕', value: 'confused' },
        { emoji: '😡', value: 'angry' },
        { emoji: '🤢', value: 'sick' }
    ]

    const handleMoodClick = (value) => {
        setSelectedMood(value)
    }

    const handleSave = () => {
        console.log({
            date: 'April 22, 2025',
            mood: selectedMood,
            note: text
        })
        alert('Mood saved!')
    }

    return (
        <Card style={{ maxWidth: 400, margin: 'auto', marginTop: '40px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardBody style={{ paddingTop: '1.5rem' }}>
                <Row className='text-center'>
                    <Col md={12}>
                        <div className='mt-2' style={{ fontWeight: 600, fontSize: "26px" }}>April 22, 2025</div>
                        <div className='mt-2' style={{ fontWeight: 400, fontSize: "20px" }}>How are you feeling today?</div>
                    </Col>
                    <Col md={12}>
                        <div style={{ width: '70%', margin: 'auto' }}>
                            {/* Emoji Selector */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    marginTop: '1rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                {moods.map((mood, idx) => (
                                    <span
                                        key={idx}
                                        style={{
                                            fontSize: selectedMood === mood.value ? '36px' : '32px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease-in-out',
                                            transform: selectedMood === mood.value ? 'scale(1.2)' : 'scale(1)'
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
                                        width: '100%'
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
                                        marginBottom: '30px'
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
    )
}

export default MoodSelector
