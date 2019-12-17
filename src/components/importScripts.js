import React, { Component } from 'react';
import loadScript from 'simple-load-script';
import $ from 'jquery';

class ImportScripts extends Component {
  componentDidMount() {
    window.$ = $;
    loadScript('/js/main.js?v=3');
  }

  render() {
    return <script />;
  }
}

export default ImportScripts;
