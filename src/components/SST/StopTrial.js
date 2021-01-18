import React from 'react';
import blue_left from '../UIElements/images/blue_left.png';
import blue_right from '../UIElements/images/blue_right.png';

export default class GoTrial extends React.Component {
    timeout_id = 0
    start = 0

    get_image = (side)=>{
        let image = 0

        if (side == 0) {
            image = blue_left
        }

        else {
            image = blue_right
        }

        return (<div>
            <img className="arrow_image arrow--size" src={image} height={50} width={50} />
        </div>)
    }

    time_passed = ()=>{
        clearTimeout(this.timeout_id)
        document.removeEventListener("keydown", this.get_input, false);

        const trial_data = {
            type: "STOP_SIGNAL",
            side:(this.props.side === 0 ? "LEFT" : "RIGHT"),
            key: "none",
            rt:null,
            correct:true,
            block_num:this.props.block_number+1,
            req_SOA:this.props.stop_signal_time+this.props.go_time,
            true_SOA:this.props.stop_signal_time+this.props.go_time
        }

        this.props.ssd_time_passed(trial_data)
    }

    get_input = (keyboard) => {
        clearTimeout(this.timeout_id)
        document.removeEventListener("keydown", this.get_input, false);
        let rt = new(Date) - this.start

        const trial_data = {
            type: "STOP_SIGNAL",
            side: (this.props.side === 0 ? "LEFT" : "RIGHT"),
            key: keyboard.key,
            rt: null,
            correct: false,
            block_num: this.props.block_number+1,
            req_SOA: this.props.stop_signal_time+this.props.go_time,
            true_SOA: rt+ this.props.go_time
        }

        this.props.ssd_keyboard_pressed(trial_data)
    }

    render(){
        document.addEventListener("keydown", this.get_input, false);
        this.start = new Date()
        this.timeout_id = setTimeout(this.time_passed,this.props.stop_signal_time)

        return(
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
                onKeyDown={this.get_input}
                tabIndex="0"
                >
                {this.get_image(this.props.side)}
            </div>
        )
    }
}