import React from 'react';
import logo from './misfits-market-header-logo.svg';
import './App.css';

import ItemContainer from './container/itemContainer'

function App() {

  return (
    <div className="App">
      <header className="">
        <a href="https://www.misfitsmarket.com">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <ItemContainer />
      </header>
    </div>
  )

}

export default App
