import React from 'react';

export default class StartButton extends React.Component {
    
    start_clicked = ()=>{
        this.props.start_button_clicked()
        console.log("start clicked!! from button")
    }

    render() {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
      }}>
            <button onClick={this.start_clicked}>התחל</button>
        </div>
      );
    }
  }