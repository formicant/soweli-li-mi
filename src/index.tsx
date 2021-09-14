import './index.css';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Musi } from './Musi';
import reportWebVitals from './reportWebVitals';

render(
  <StrictMode>
    <Musi />
  </StrictMode>,
  document.getElementById('lawa')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
