import React, { Component } from 'react';
import loadScript from 'simple-load-script';

class ImportScripts extends Component {
  componentDidMount() {
    loadScript('/js/main.js?v=1');
  }

  render() {
    return <script />;
  }
}

export default ImportScripts;
