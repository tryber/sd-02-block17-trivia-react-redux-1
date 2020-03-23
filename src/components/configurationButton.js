import React from 'react';
import { Link } from 'react-router-dom';
import '../style/configurationButton.css';

const ConfigurationButton = () => (
  <Link to="/settings">
    <button className="config-btn">
      <span className="pra-cego-ver">Configurações</span>
    </button>
  </Link>
);

export default ConfigurationButton;
