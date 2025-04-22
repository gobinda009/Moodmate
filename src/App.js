import React, { useState } from 'react';
import BasicDateCalendar from "./components/CalenderView";
import MoodSelector from "./components/MoodSelector";
import { Card, CardBody } from 'reactstrap';
import CustomCard from './components/CustomCard';
import MoodNotesPage from './components/MoodNotesPage';

function App() {
  const [flag, setFlag] = useState(false); // Move flag state to App.js

  const handleFlagChange = () => {
    setFlag(true); // Function to update flag
  };

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <CustomCard>
        {/* Conditionally render MoodNotesPage only if flag is false */}
        {!flag && <MoodNotesPage onFlagChange={handleFlagChange} />} 

        {flag && (
          <div style={{ width: '50%', margin: '0 10px' }}>
            <div style={{ marginBottom: '20px' }}>
              <MoodSelector />
            </div>
          </div>
        )}
        
        {flag && (
          <div style={{ width: '50%', margin: '0 10px' }}>
            <div style={{ marginBottom: '20px' }}>
              <BasicDateCalendar />
            </div>
          </div>
        )}
      </CustomCard>
    </div>
  );
}

export default App;
