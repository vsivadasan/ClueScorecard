export default function Players({players, onPlayerUpdate}){
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