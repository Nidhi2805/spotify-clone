import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import PlayerControls from '../music/PlayerControls';
import './PlayerLayout.css';

const PlayerLayout = () => {
  return (
    <div className="player-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <PlayerControls />
    </div>
  );
};

export default PlayerLayout;