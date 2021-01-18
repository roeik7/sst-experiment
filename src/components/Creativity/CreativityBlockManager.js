import React from 'react';
import CreativityTrial from "./CreativityTrial";
import FixationSign from '../UIElements/FixationSign';
import ConfigData from '../../../Configurations/ConfigData.json';
import Instructions from '../UIElements/Instructions';
import CountDownTimer from '../UIElements/CountDownTimer';

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
            before_block_timer: ConfigData.before_block_timer
        }

        this.questions = props.questions.slice(props.block_number, props.trials_amount)
        this.combination = this.create_answers_combination(props.block_number, props.trials_amount)

        this.trials_data = []
    }

    create_answers_combination = (block_number, trials_amount) => {
        let combination = Array(trials_amount).fill().map((item, index) => block_number * trials_amount + index);

        for (let i = combination.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combination[i], combination[j]] = [combination[j], combination[i]];
        }

        return combination
    }


    user_clicked = (trial_data) => {
        this.trials_data.push(trial_data)

        if (this.state.curr_trial + 1 === this.props.trials_amount) {
            this.props.end_of_creativity_block()
        }

        else {
            this.setState(() => ({
                curr_trial: this.state.curr_trial + 1,
                fixation: true,
                creativity_trial: false
            })
            );
        }
    }

    get_question_index = (curr_trial) => {
        console.log("before calling to trail combination= " + this.combination)
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
                    user_clicked={this.user_clicked}
                />}
            </div>
        )
    }

    componentWillUnmount() {
        this.state.curr_trial = 0
    }
}