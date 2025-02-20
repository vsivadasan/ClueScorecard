import { useState } from 'react';
import Section from './Section';
import Players from './Players';

export default function ClueSheet() {
    const storedCurrent = localStorage.getItem('entries');
    const storedPlayers = localStorage.getItem('players');
    const initialCurrent = storedCurrent ? JSON.parse(storedCurrent) : Array.from({ length:21 }, () => (Array.from({ length:6 }, () => null)));
    const initialPlayers = storedPlayers ? JSON.parse(storedPlayers) : Array.from({ length:6}, () => "");
    const [current, updateCurrent] = useState(initialCurrent);
    const [players, updatePlayers] = useState(initialPlayers);
  
    const suspects = ["Colonel Mustard", "Professor Plum", "Mr. Green", "Mrs. Peacock", "Miss Scarlet", "Dr. Orchid"];
    const weapons = ["Dagger", "Candlestick", "Revolver", "Rope", "Lead Pipe", "Wrench"];
    const rooms = ["Hall", "Lounge", "Dining Room", "Kitchen", "Ball Room", "Conservatory", "Billiard Room", "Library", "Study"];
  
    function handleUpdate(row, col){
      const nextCurrent=[...current.slice(0,22)];
      let val=nextCurrent[row][col];
      if(!val){
        nextCurrent[row][col]='?';
      }
      else if(val=='?'){
        nextCurrent[row][col]='X'
      }
      else if(val=='X'){
        nextCurrent[row][col]='✓'
      }
      else{
        nextCurrent[row][col]=null;
      }
      localStorage.setItem('entries', JSON.stringify(nextCurrent));
      updateCurrent(nextCurrent);
    }
  
    function playerUpdate(index, val){
      const newPlayers=[...players.slice(0,7)];
      newPlayers[index]=val;
      localStorage.setItem('players', JSON.stringify(newPlayers));
      updatePlayers(newPlayers);
    }
  
    function resetScorecard(){
      const nextCurrent=Array.from({ length:21 }, () => (Array.from({ length:6 }, () => null)));
      localStorage.setItem('entries', JSON.stringify(nextCurrent));
      updateCurrent(nextCurrent);
    }
  
    return (
      <div className='outer'>
        <div className='header'>
          <h1>Clue Scorecard</h1>
          <div className='controls'>
            <div>
              <button onClick={resetScorecard}>Reset</button>
            </div>
          </div>
        </div>
        <div className="sheet">
          <Players players={players} onPlayerUpdate={playerUpdate} />
          <Section title="Suspects" entries={suspects} offset={0}  data={current} handleUpdate={handleUpdate} />
          <Section title="Weapons" entries={weapons} offset={6} data={current} handleUpdate={handleUpdate} />
          <Section title="Rooms" entries={rooms} offset={12} data={current} handleUpdate={handleUpdate} />
        </div>
        <div>
        <p><sub>This website is not affiliated with, endorsed, or sponsored by Hasbro, Inc. or any of its affiliates. <br />
        Clue and Cluedo are trademarks of Hasbro, Inc. and are used here for informational purposes only.</sub></p>
        </div>
      </div>
  
    );
  }