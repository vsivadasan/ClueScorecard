import Square from './Square';

export default function Section({title, entries, offset, data, handleUpdate}){
    const renderedEntries = entries.map((entry, index) => {
      const row = offset+index;
      const dataRow = data[row];

      const isSolution = dataRow.every(it => it=='X');
      const isNotSolution = dataRow.includes('✓');
      const title = isNotSolution ? <s>{entry}</s> : (isSolution ? <strong>{entry}</strong> : entry);
      return (
      <>
      <div key={entry} className='sectionRow'>
        <div key={entry+'title'} className='sectionRowEntryTitle'>
          {title}
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