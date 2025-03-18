import { useRef } from 'react';
import { Player } from '@lordicon/react';
import addIcon from '../assets/add-icon.json';

function AddIcons() {
  const playerRef = useRef(null);
  
  return (
    <Player
      ref={playerRef}
      icon={addIcon}
      size={32}
      colorize="#3498db" // Change color as needed
    />
  );
}

export default AddIcons;
