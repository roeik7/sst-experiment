import React from 'react';
import GoTrial from "./GoTrial";
import StopTrial from './StopTrial';
import FixationSign from '../UIElements/FixationSign';
import TrialFidback from '../UIElements/TrialFidback';
import SSTBlockSummary from '../UIElements/SSTBlockSummary';
import Instructions from '../UIElements/Instructions';
import ConfigData from '../../../Configurations/ConfigData.json';
import CountDownTimer from '../UIElements/CountDownTimer';

export default class SSTBlockManager extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            show_instructions:true,
            count_down:true,
            curr_trial: -1,
            stop_trial: false,
            go_trial: false,
            fixation: false,
            trial_fidback: false,
            show_block_summary:false
        }

        // trial by trial feedback messages
        this.correct_msg = 'correct response'
        this.incorrect_msg = 'incorrect response'
        this.too_slow_msg = 'too slow'
        this.too_fast_msg = 'too fast'
        this.correct_stop_msg = 'correct stop'
        this.incorrect_stop_msg = 'remember: try to stop'

        //trials settings
        this.colors_combination = this.create_color_combination(props.arrows_distribution, props.trials_amount)
        this.sides = this.create_sides_combination(props.trials_amount)
        this.trials_data = []
        this.go_time = ConfigData.go_time
        this.ssd_time = ConfigData.ssd_time
        this.stop_signal_time = ConfigData.stop_signal_time
        this.fixation_time = ConfigData.fixation_time
        this.fidback_time = ConfigData.fidback_time
        this.trial_fidback_text = ""
        this.training_block = this.props.training_block
        this.step_ssd = ConfigData.step_ssd
        this.min_ssd = ConfigData.min_ssd
        this.sst_instructions = ConfigData.sst_instructions
        this.before_block_timer = ConfigData.before_block_timer
        
        //trials statistics
        this.go_trials_total_rt = 0
        this.go_trials_amount = 0
        this.missed_go_trials = 0
        this.correct_stops = 0
        this.stop_signals_amount = 0
    }

    create_sides_combination = (trials_amount) => {
        let sides = Array(trials_amount).fill(0)

        for (let i = 0; i < trials_amount; i++) {
            var side = Math.floor(Math.random() * Math.floor(2))
            sides[i] = side
        }

        return sides
    }

    create_color_combination = (arrow_distribution, trials_amount) => {
        let colors = Array(trials_amount).fill("WHITE")
        console.log(arrow_distribution)

        if (arrow_distribution == 'HALF') {
            for (let i = Math.floor(trials_amount / 2); i < trials_amount; i++) {
                colors[i] = "BLUE"
            }
        }

        else if (arrow_distribution === "THREE_QUARTERS_WHITE") {
            for (let i = (trials_amount - Math.floor(trials_amount / 4)); i < trials_amount; i++) {
                colors[i] = "BLUE"
            }
        }

        for (let i = trials_amount - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [colors[i], colors[j]] = [colors[j], colors[i]];
        }

        return colors
    }

    go_keyboard_pressed = (trial_data, timeout_id) => {
        //need to do something with data
        if (trial_data.type === "GO"){
            this.go_trials_amount+=1
            this.go_trials_total_rt+=trial_data.rt
        }
        else{
            this.stop_signals_amount+=1
        }
        this.end_of_go_trial(trial_data, timeout_id)
    }

    go_time_passed = (trial_data, timeout_id) => {
        //need to do something with data
        if (trial_data.type === "GO"){
            this.go_trials_amount+=1
            this.go_trials_total_rt+=trial_data.rt
            this.missed_go_trials+=1
        }
        
        this.end_of_go_trial(trial_data, timeout_id)
    }

    compute_text_message = (trial_data) => {
        let message = "";

        if (trial_data.type === "STOP_SIGNAL") {
            message = trial_data.key === null ? this.correct_stop_msg : this.incorrect_stop_msg
        }

        else {
            message = ((trial_data.key === "ArrowLeft" && trial_data.side === "LEFT") ||
                (trial_data.key === "ArrowRight" && trial_data.side === "RIGHT")) ? this.correct_msg : this.incorrect_msg
        }

        return message
    }

    end_of_go_trial = (trial_data) => {
        const stop_trial = (trial_data.key === null && trial_data.type === "STOP_SIGNAL") ? true : false
        this.trial_fidback_text = this.compute_text_message(trial_data)
        
        if(trial_data.type === "STOP_SIGNAL" && trial_data.key != null){
            this.ssd_time = Math.max(this.min_ssd, this.ssd_time-50)
        }

        this.setState(() => ({
            go_trial: false,
            stop_trial: stop_trial,
            trial_fidback: !stop_trial
        })
        );
    }

    increment_curr_trial = () => {
        if (this.state.curr_trial + 1 === this.props.trials_amount) {
            //this.props.end_of_sst_block()
            this.setState(() => (
                {
                    fixation: false,
                })
            );
            this.block_summary()
        }

        else {
            this.setState(() => (
                {
                    curr_trial: this.state.curr_trial + 1,
                    go_trial: true,
                    fixation: false,
                })
            );
        }
    }

    ssd_keyboard_pressed = (trial_data) => {
        //need to do something with data
        this.stop_signals_amount+=1
        this.end_of_ssd(trial_data)
        this.ssd_time = Math.max(this.min_ssd,this.ssd_time-50) 
    }

    ssd_time_passed = (trial_data) => {
        this.correct_stops+=1
        this.stop_signals_amount+=1
        this.end_of_ssd(trial_data)
        this.ssd_time = this.ssd_time+50
    }

    end_of_ssd = (trial_data, timeout_id) => {
        this.trial_fidback_text = this.compute_text_message(trial_data)
        
        this.setState(() => ({
            stop_trial: false,
            trial_fidback: true
        })
        );
    }

    on_fixation_end = () => {
        this.increment_curr_trial()
    }

    on_trial_fidback_end = () => {
        this.setState(() => ({
            trial_fidback: false,
            fixation: true
        })
        );
    }


    block_summary = ()=>{
        this.setState(()=>({
            show_block_summary : true
        })
        );
    }

    end_of_summary = ()=>{
        this.setState(()=>({
            show_block_summary : false
        })
        );
        this.props.end_of_sst_block()
    }

    start_blocks_session = ()=>{
        this.setState(() => (
            {
                show_instructions:false,
                count_down:false,
                fixation: true,
                to_start: true
            }))
    }
    render() {
        console.log(this.colors_combination)
        return (
            <div>
            {   
                this.state.show_instructions &&
                <Instructions
                    instructions={this.sst_instructions}
                />
            }

            {
                this.state.count_down && <CountDownTimer
                end_of_timer={this.start_blocks_session} 
                message = {"הבלוק יתחיל בעוד:"}
                time = {this.before_block_timer}
                />
            }
                {this.state.fixation && <FixationSign
                    fixation_time={this.fixation_time}
                    on_fixation_end={this.on_fixation_end}
                />}
                {   this.state.go_trial && <GoTrial
                    go_time={this.go_time}
                    ssd_time={this.ssd_time}
                    color={this.colors_combination[this.state.curr_trial]}
                    side={this.sides[this.state.curr_trial]}
                    curr_trial={this.state.curr_trial}
                    go_keyboard_pressed={this.go_keyboard_pressed}
                    go_time_passed={this.go_time_passed}
                    block_number = {this.props.block_number}
                />}

                {this.state.stop_trial && <StopTrial
                    stop_signal_time={this.stop_signal_time}
                    go_time = {this.go_time}
                    side={this.sides[this.state.curr_trial]}
                    ssd_keyboard_pressed={this.ssd_keyboard_pressed}
                    ssd_time_passed={this.ssd_time_passed}
                    curr_trial={this.state.curr_trial}
                    block_number = {this.props.block_number}
                    
                />
                }

                {this.state.trial_fidback && 
                    <TrialFidback
                        on_trial_fidback_end={this.on_trial_fidback_end}
                        fidback={this.trial_fidback_text}
                        fidback_time={this.fidback_time}
                        training_block = {this.training_block}
                    />}

                {this.state.show_block_summary && <SSTBlockSummary style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                    go_trials_total_rt = {this.go_trials_total_rt}
                    go_trials_amount = {this.go_trials_amount}
                    missed_go_trials = {this.missed_go_trials}
                    correct_stops = {this.correct_stops}
                    stop_signals_amount = {this.stop_signals_amount}
                    last_block = {this.props.last_block}
                    end_of_summary = {this.end_of_summary}                   
                    />
                }
            </div>
        )
    }
}