import React from 'react';

export default class TrialFidback extends React.Component {

    timeout_id = 0


    on_trial_fidback_end = ()=>{
        this.props.on_trial_fidback_end()
    }

    get_fidback_component = (fidback)=>{
        return (<div>
                    <h3 className={'text fidback' }>{fidback}</h3>
            </div>)
    }

    render() {
        this.timeout_id = setTimeout(this.on_trial_fidback_end, this.props.fidback_time)
        
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {this.props.training_block && this.get_fidback_component(this.props.fidback)}
            </div>
            )
    }

}