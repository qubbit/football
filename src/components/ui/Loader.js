import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

const Loader = () => (
  <div className="soccer-loader">
    <Icon size="huge" loading name="soccer" />
    <div className="loading-text">Loading...</div>
  </div>
);

export default Loader;
