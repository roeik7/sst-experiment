import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import SSTExperiment from './components/Experiment';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import './firebase/firebase';
  
  

  ReactDOM.render(<SSTExperiment />, document.getElementById('app'));