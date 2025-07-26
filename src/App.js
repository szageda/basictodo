import React, { useState } from 'react';
import { format } from 'date-fns';
import './App.css';

function App() {
  const [cards, setCards] = useState([
    { id: 1, text: 'Create more tasks', status: 'todo', lastUpdate: new Date() },
  ]);

  const [newCardText, setNewCardText] = useState('');

  const addCard = () => {
    if (newCardText.trim() !== '') {
      const newCard = {
        id: Date.now(),
        text: newCardText,
        status: 'todo',
        lastUpdate: new Date()
      };
      setCards([...cards, newCard]);
      setNewCardText('');
    }
  };

  const moveCard = (id, newStatus) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, status: newStatus, lastUpdate: new Date() } : card
    ));
  };

  const renderColumn = (status) => {
    return (
      <div className="column">
        <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
        {cards.filter(card => card.status === status).map(card => (
          <div key={card.id} className="card">
            {status !== 'todo' && (
              <button 
                onClick={() => moveCard(card.id, status === 'inProgress' ? 'todo' : 'inProgress')}
                className="move-back-button"
              >
                ← Move Back
              </button>
            )}
            <div className="card-content">
              <span className="card-text">{card.text}</span>
              <span className="card-update">Last update: {format(card.lastUpdate, 'yyyy-MM-dd HH:mm')}</span>
            </div>
            {status !== 'done' && (
              <button onClick={() => moveCard(card.id, status === 'todo' ? 'inProgress' : 'done')}>
                Move →
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Basic Todo App</h1>
      <div className="add-card-form">
        <input
          type="text"
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addCard}>Add Task</button>
      </div>
      <div className="board">
        {renderColumn('todo')}
        {renderColumn('inProgress')}
        {renderColumn('done')}
      </div>
    </div>
  );
}

export default App;
