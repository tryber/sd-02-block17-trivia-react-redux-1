import React from 'react';
import { Link } from 'react-router-dom';

const ConfigurationButton = () => (
  <Link to="/settings">
    <button>
      Configurações
    </button>
  </Link>
);

export default ConfigurationButton;
