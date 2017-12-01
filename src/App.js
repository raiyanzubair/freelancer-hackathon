import React, { Component } from 'react';
import Header from './Header'
import Body from './Body'
import { BLUE_BORDER } from './consts'

import './index.css'

class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: BLUE_BORDER}} >
        <div style={{ backgroundColor: "white", width: "75%", marginLeft: "auto", marginRight: "auto", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", padding: "10px"}} >
          <Header/>
          <br/>
          <Body/>
        </div>
      </div>
    );
  }
}

export default App;
