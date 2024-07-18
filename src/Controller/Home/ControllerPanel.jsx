import React, { useState } from 'react';
import axios from 'axios';
import '../Home/main.css';
import { Monitor } from '../Status/MonitorPanel';
import MainHouse from '../../Pages/HouseMain';

const Panel = ({ onLogout, userRole }) => {
  const [doorOpen, setDoorOpen] = useState(false);
  const [garageOpen, setGarageOpen] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [acOn, setAcOn] = useState(false);

  const handleLightActivation = async (isOn) => {
    if (userRole === 'Padre') {
      try {
        await axios.post('/api/lights/activate', { isOn });
        setLightOn(isOn);
        console.log(`Lights ${isOn ? 'activated' : 'deactivated'}`);
      } catch (error) {
        console.error('Error activating/deactivating lights:', error);
      }
    } else {
      alert('No tiene permisos para realizar esta acción.');
    }
  };

  const handleDoorAction = async (action) => {
    if (userRole === 'Padre') {
      try {
        setDoorOpen(action === 'Open');
        console.log(`Door ${action}ed`);
      } catch (error) {
        console.error(`Error ${action}ing door:`, error);
      }
    } else {
      alert('No tiene permisos para realizar esta acción.');
    }
  };

  const handleGateAction = async (action) => {
    if (userRole === 'Padre') {
      try {
        setGarageOpen(action === 'Open');
        console.log(`Gate ${action}d`);
      } catch (error) {
        console.error(`Error ${action}ing gate:`, error);
      }
    } else {
      alert('No tiene permisos para realizar esta acción.');
    }
  };

  const handleACActivation = async (isOn) => {
    if (userRole === 'Padre') {
      try {
        setAcOn(isOn);
        console.log(`Air Conditioning ${isOn ? 'activated' : 'deactivated'}`);
      } catch (error) {
        console.error(`Error ${isOn ? 'activating' : 'deactivating'} air conditioning:`, error);
      }
    } else {
      alert('No tiene permisos para realizar esta acción.');
    }
  };

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    } else {
      console.error('onLogout is not a function');
    }
  };

  return (
    <div className='panel-container'>
      <div style={{ textAlign: 'center',
        marginLeft:'100px'
       }}>
        <Monitor />
      </div>

      <div className='container-main'>
        <h4>Panel de control</h4>
        <section>
          <p>Foco</p>
          <div className="Focus-container">
            <button onClick={() => handleLightActivation(true)}>Activar</button>
            <button onClick={() => handleLightActivation(false)}>Desactivar</button>
          </div>
          <p>Puerta Principal</p>
          <div className='Focus-container'>
            <button onClick={() => handleDoorAction('Open')}>Abrir Puerta</button>
            <button onClick={() => handleDoorAction('Close')}>Cerrar Puerta</button>
          </div>
          <p>Porton</p>
          <div className='Focus-container'>
          <button onClick={() => handleGateAction('Close')}>Open Garage</button>
            <button onClick={() => handleGateAction('Open')}>Close Garage</button>
          </div>
          <p>Aire Acondicionado</p>
          <div className='Focus-container'>
            <button onClick={() => handleACActivation(true)}>Activar</button>
            <button onClick={() => handleACActivation(false)}>Desactivar</button>
          </div>
          <button onClick={handleLogout}>Salir</button>
        </section>
      </div>

      <div className='main-house-container'>
        <MainHouse
          doorOpen={doorOpen}
          garageOpen={garageOpen}
          lightOn={lightOn}
          acOn={acOn}
        />
      </div>
    </div>
  );
};

export default Panel;
