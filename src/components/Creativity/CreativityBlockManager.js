import React from 'react';
import CreativityTrial from "./CreativityTrial";
import FixationSign from '../UIElements/FixationSign';
import ConfigData from '../../../Configurations/ConfigData.json';
import Instructions from '../UIElements/Instructions';
import CountDownTimer from '../UIElements/CountDownTimer';
import {add_to_creativity_table} from '../../firebase/firebase';

export default class CreativityBlockmanager extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            show_instructions:true,
            curr_trial: -1,
            question_to_answers_map: [],
            fixation: true,
            creativity_trial: false,
            to_start: false,
            count_down:true
        }

        this.settings = {
            fixation_time: ConfigData.fixation_time,
            creativity_instructions: ConfigData.creativity_instructions,
            before_block_timer: ConfigData.before_block_timer,
            creativity_time:ConfigData.creativity_time
        }
        this.combination = this.props.indexes_combination.slice(this.props.block_number*this.props.trials_amount, (this.props.block_number+1)*this.props.trials_amount)
        this.questions_order=[]
        
        this.trials_data = []
    }


    user_clicked = (trial_data) => {
        this.trials_data.push(trial_data)
        trial_data["question"] = this.get_question_index(this.state.curr_trial)

        add_to_creativity_table(trial_data)

        if (this.state.curr_trial + 1 === this.props.trials_amount) {
            this.questions_order = this.combination.toString().replace(/,/g,"|")
            this.props.end_of_creativity_block(this.questions_order)
        }

        else {
            this.setState(() => ({
                fixation: true,
                creativity_trial: false
            })
            );
        }
    }

    get_question_index = (curr_trial) => {
        return this.combination[curr_trial]
    }

    increment_curr_trial = () => {
        if (this.state.curr_trial + 1 === this.props.trials_amount) {
            this.setState(() => (
                {
                    fixation: false,
                    creativity_trial: true
                })
            );
        }

        else {
            this.setState(() => (
                {
                    curr_trial: this.state.curr_trial + 1,
                    fixation: false,
                    creativity_trial: true
                })
            );
        }
    }

    on_fixation_end = () => {
        this.increment_curr_trial()
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
        return (
            <div>
                {   
                    this.state.show_instructions &&
                    <Instructions
                        instructions={this.settings.creativity_instructions}
                    />
                }

                {
                    this.state.count_down && <CountDownTimer
                    end_of_timer={this.start_blocks_session} 
                    message = {"הבלוק יתחיל בעוד:"}
                    time = {this.settings.before_block_timer}
                    />
                }
      
                {
                    this.state.to_start && this.state.fixation && <FixationSign
                        fixation_time={this.settings.fixation_time}
                        on_fixation_end={this.on_fixation_end}
                    />
                }

                {this.state.creativity_trial && <CreativityTrial
                    question={this.props.questions[this.get_question_index(this.state.curr_trial)]}
                    answers={this.props.answers[this.get_question_index(this.state.curr_trial)]}
                    creativity_time = {this.settings.creativity_time}
                    shuffle={this.props.shuffle_answers}
                    user_clicked={this.user_clicked}
                />}
            </div>
        )
    }

    componentWillUnmount() {
        this.state.curr_trial = 0
    }
}