import React, { Component } from 'react';
import Header from './Header'
import Body from './Body'
import { BLUE_BORDER } from './consts'

import './App.css'
import './index.css'

class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#EBE1E1', backgroundepeat: 'repeat-y', paddingTop: "2.5%"}} >
        <div style={{ backgroundColor: "white", width: "75%", marginLeft: "auto", marginRight: "auto", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", padding: "5%"}} >
          <Header/>
          <br/>
          <Body/>
        </div>
      </div>
    );
  }
}

export default App;
