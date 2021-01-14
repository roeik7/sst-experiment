import React from 'react';
import white_left from '../UIElements/images/white_left.png';
import white_right from '../UIElements/images/white_right.png';

export default class GoTrial extends React.Component {
    timeout_id = []
    miliseconds = 0
    start = 0
    end = 0

    get_image = (side) => {
        let image = 0

        if (side == 0) {
            image = white_left
        }
        else {
            image = white_right
        }

        return (<div>
            <img className="arrow_image arrow--size" src={image} height={50} width={50} />
        </div>)
    }


    time_passed = () => {
        clearTimeout(this.timeout_id)
        document.removeEventListener("keydown", this.get_input, false);

        const trial_data = {
            type: (this.props.color === "WHITE" ? "GO" : "STOP_SIGNAL"),
            side: (this.props.side === 0 ? "LEFT" : "RIGHT"),
            key: null,
            rt: (this.props.color === "WHITE" ? this.props.go_time : null),
            correct: false,
            block_num:this.props.block_number,
            req_SOA:0,
            true_SOA:0
        }

        this.props.go_time_passed(trial_data, this.timeout_id)
    }

    get_input = (keyboard) => {
        this.response_time = new Date() - this.start
        console.log("rt =" + this.response_time)
        clearTimeout(this.timeout_id)
        document.removeEventListener("keydown", this.get_input, false);

        const trial_data = {
            type: (this.props.color === "WHITE" ? "GO" : "STOP_SIGNAL"),
            side: (this.props.side === 0 ? "LEFT" : "RIGHT"),
            key: keyboard.key,
            rt: this.response_time,
            correct: ((this.props.color === "WHITE" && ((keyboard.key === "ArrowLeft" && this.props.side === "LEFT") ||
            (keyboard.key === "ArrowRight" && this.props.side === "RIGHT")))),
            block_num:this.props.block_number,
            req_SOA:0,
            true_SOA:0
        }

        this.props.go_keyboard_pressed(trial_data, this.timeout_id)
    }

    render() {
        document.addEventListener("keydown", this.get_input, false);
        let time_to_disapear = this.props.color === "BLUE" ? this.props.ssd_time : this.props.go_time
        this.timeout_id = setTimeout(this.time_passed, time_to_disapear)
        this.start = new Date()

        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
                onKeyDown={this.get_input}
                tabIndex="0">
                {this.get_image(this.props.side)}
            </div>
        )
    }
}