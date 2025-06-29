import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import PlayerControls from '../music/PlayerControls';
import { PlayerProvider } from '../../context/PlayerContext';
import './PlayerLayout.css';

const PlayerLayout = () => {
  return (
    <PlayerProvider>
      <div className="player-layout">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
        <PlayerControls />
      </div>
    </PlayerProvider>
  );
};

export default PlayerLayout;