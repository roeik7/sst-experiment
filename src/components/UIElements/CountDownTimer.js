import React from 'react';
import ConfigData from '../../../Configurations/ConfigData.json';


export default class CountDownTimer extends React.Component{

  //className='text big-text'
    state = {
        seconds: this.props.time
      }

      render() {
        const { seconds } = this.state
        return (
          <div>
            <h1 style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }} className='text big-text' >{this.props.message}  { seconds }</h1>
          </div>
        )
      }

      componentDidMount() {
        this.myInterval = setInterval(() => {
          const { seconds} = this.state
          if (seconds > 0) {
            this.setState(({ seconds }) => ({
              seconds: seconds - 1
            }))
          }
          if (seconds === 0) {
            clearInterval(this.myInterval)
            this.props.end_of_timer()
            }
          }
        , 1000)
      }
}