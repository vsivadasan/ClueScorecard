import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function ClueSheet() {
  const [current, updateCurrent] = useState(Array.from({ length:21 }, () => (Array.from({ length:6 }, () => null))));
  const suspects = ["Colonel Mustard", "Professor Plum", "Green", "Mr. Peacock", "Miss Scarlet", "Mrs. White"];
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
    updateCurrent(nextCurrent);
  }
  return (
    <div className='outer'>
      <div className="sheet">
        <Section title="Suspect" entries={suspects} offset={0}  data={current} handleUpdate={handleUpdate} />
        <Section title="Weapons" entries={weapons} offset={6} data={current} handleUpdate={handleUpdate} />
        <Section title="Rooms" entries={rooms} offset={12} data={current} handleUpdate={handleUpdate} />
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
