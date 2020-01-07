import React from 'react';
import { Icon } from 'semantic-ui-react';

const Loader: React.FC = () => (
  <div className="soccer-loader">
    <Icon size="huge" loading name="soccer" />
    <div className="loading-text">Loading...</div>
  </div>
);

export default Loader;
