import React from 'react';
import { Link } from 'react-router-dom';
import '../style/ConfigurationButton.css';

const ConfigurationButton = () => (
  <Link to="/settings">
    <button
      data-testid="config-button"
      className="config-btn"
    >
      <span className="pra-cego-ver">Configurações</span>
    </button>
  </Link>
);

export default ConfigurationButton;
