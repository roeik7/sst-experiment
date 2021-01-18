import React from 'react';
import fixation_sign from './images/fixation.png'

export default class FixationSign extends React.Component {

    timeout_id = 0

    get_fixation = () => {
        return (<div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <img className="fixation fixation-size" src={fixation_sign} height={50} width={50} />
        </div>)

    }

    on_fixation_end = () => {
        this.props.on_fixation_end()
    }

    render() {
        this.timeout_id = setTimeout(this.on_fixation_end, this.props.fixation_time)
        return (
            <div>
                {this.get_fixation()}
            </div>
        )
    }

}