import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function ClueSheet() {
  const storedCurrent = localStorage.getItem('entries');
  const storedPlayers = localStorage.getItem('players');
  const initialCurrent = storedCurrent ? JSON.parse(storedCurrent) : Array.from({ length:21 }, () => (Array.from({ length:6 }, () => null)));
  const initialPlayers = storedPlayers ? JSON.parse(storedPlayers) : Array.from({ length:6}, () => "");
  const [current, updateCurrent] = useState(initialCurrent);
  const [players, updatePlayers] = useState(initialPlayers);

  const suspects = ["Colonel Mustard", "Professor Plum", "Mr. Green", "Mr. Peacock", "Miss Scarlet", "Mrs. White"];
  const weapons = ["Knife", "Candle stick", "Revolver", "Rope", "Lead pipe", "Wrench"];
  const rooms = ["Hall", "Lounge", "Dining room", "Kitchen", "Ballroom", "Conservatory", "Billiard room", "Library", "Study"];

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
        <Section title="Suspect" entries={suspects} offset={0}  data={current} handleUpdate={handleUpdate} />
        <Section title="Weapons" entries={weapons} offset={6} data={current} handleUpdate={handleUpdate} />
        <Section title="Rooms" entries={rooms} offset={12} data={current} handleUpdate={handleUpdate} />
      </div>
    </div>

  );
}

function Players({players, onPlayerUpdate}){
  return(
    <div className='sectionTable'>
      <div className='playerSection'>
        <div className='playerTitle'>Players</div>
        <div>
          <input type="text" maxLength={2} className='playerText' value={players[0]} onChange={(e) => onPlayerUpdate(0, e.target.value)}/>
          <input type="text" maxLength={2} className='playerText' value={players[1]} onChange={(e) => onPlayerUpdate(1, e.target.value)}/>
          <input type="text" maxLength={2} className='playerText' value={players[2]} onChange={(e) => onPlayerUpdate(2, e.target.value)}/>
          <input type="text" maxLength={2} className='playerText' value={players[3]} onChange={(e) => onPlayerUpdate(3, e.target.value)}/>
          <input type="text" maxLength={2} className='playerText' value={players[4]} onChange={(e) => onPlayerUpdate(4, e.target.value)}/>
          <input type="text" maxLength={2} className='playerText' value={players[5]} onChange={(e) => onPlayerUpdate(5, e.target.value)}/>
        </div>
      </div>
    </div>

  );
}

function Section({title, entries, offset, data, handleUpdate}){
  const renderedEntries = entries.map((entry, index) => {
    const row = offset+index;
    const dataRow = data[row];
    return (
    <>
    <div key={entry} className='sectionRow'>
      <div key={entry+'title'} className='sectionRowEntryTitle'>
        {entry}
      </div>
        <div key={entry+"render"} className='sectionEntries'>
            <div className='sectionEntry'><Square key={entry + 1} value={dataRow[0]} onSquareClick={() => handleUpdate(row,0)} /></div>
            <div className='sectionEntry'><Square key={entry + 2} value={dataRow[1]} onSquareClick={() => handleUpdate(row,1)} /></div>
            <div className='sectionEntry'><Square key={entry + 3} value={dataRow[2]} onSquareClick={() => handleUpdate(row,2)} /></div>
            <div className='sectionEntry'><Square key={entry + 4} value={dataRow[3]} onSquareClick={() => handleUpdate(row,3)} /></div>
            <div className='sectionEntry'><Square key={entry + 5} value={dataRow[4]} onSquareClick={() => handleUpdate(row,4)} /></div>
            <div className='sectionEntry'><Square key={entry + 6} value={dataRow[5]} onSquareClick={() => handleUpdate(row,5)} /></div>
        </div>
      </div>
    </>
  );
  });

  return (
  <>
  <div key={title} className='sectionTitle'>{title}</div>
  <div key ={title + "section"} className='sectionTable'>{renderedEntries}</div>
  </>
  );
}
