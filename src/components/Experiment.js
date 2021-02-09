import React from 'react';
import Header from './UIElements/Header';
import Instructions from './UIElements/Instructions';
import StartButton from './UIElements/StartButton';
import CreativityBlockManager from './Creativity/CreativityBlockManager';
import SSTBlockManager from './SST/SSTBlockManager';
import CountDownTimer from './UIElements/CountDownTimer';
import Configdata from '../../Configurations/ConfigData.json';

export default class ExperimentSST extends React.Component {
    constructor(props) {
        super(props)
        this.settings = {
            blocks_amount: Configdata.blocks_amount,
            trials_amount: Configdata.trials_amount,
            training_trials_amount: Configdata.training_trials_amount,
            questions: Configdata.questions,
            answers: Configdata.answers,
            instructions: Configdata.instructions
        }
        console.log("in ctor ansers=",this.settings.answers)
        this.state = {
            to_start: false,
            button_start: true,
            start_creativity_block: false,
            start_sst_block: false,
            end_of_experiment: false,
            count_down: false,
            instructions: true,
            block_remains: 2,
            training_block: true
        }
        this.questions_indexes = this.shuffle_questions_indexes(0, this.settings.questions.length)
        this.arrows_distribution = ["FULL", "HALF", "THREE_QUARTERS_WHITE"]
        this.block_number = -1
    }

    shuffle_questions_indexes = (from, to) => {
        let indexes_combination = Array.from(Array(to).keys())

        var currentIndex = indexes_combination.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = indexes_combination[currentIndex];
            indexes_combination[currentIndex] = indexes_combination[randomIndex];
            indexes_combination[randomIndex] = temporaryValue;
        }

        return indexes_combination;
    }

    start_button_clicked = () => {
        this.setState(() => ({
            button_start: false,
            instructions: false,
        })
        );
        this.start_blocks_session()
    };

    end_of_creativity_block = () => {
        this.setState(() => ({
            start_creativity_block: false,
            start_sst_block: true
        })
        );
    }

    end_of_experiment = () => {
        this.setState(() => ({
            to_start: false,
            button_start: false,
            start_creativity_block: false,
            start_sst_block: false,
            end_of_experiment: true,
            count_down: false
        })
        );
        console.log("end of experiment!!!")
    }

    end_of_sst_block = () => {
        console.log("end of sst block")

        if (this.state.block_remains === 0) {
            return this.end_of_experiment()
        }

        this.setState(() => ({
            block_remains: this.state.block_remains - 1,
            start_sst_block: false,
            count_down: false,
            training_block: false,
            start_creativity_block: true
        })
        );

    }

    start_blocks_session = () => {
        this.setState(() => ({
            count_down: false,
            start_creativity_block: true
        })
        );
    }

    render() {
        return (
            <div>
                {
                    //start experiment instructions
                    this.state.instructions && <Instructions
                        instructions={this.settings.instructions}
                    />
                }

                {
                    this.state.button_start &&
                    <StartButton
                        start_button_clicked={this.start_button_clicked}
                    />
                }

                {
                    this.state.start_creativity_block &&
                    <CreativityBlockManager
                        end_of_creativity_block={this.end_of_creativity_block}
                        questions={this.settings.questions}
                        answers={this.settings.answers}
                        trials_amount={3}
                        block_number={++this.block_number}
                        indexes_combination = {this.questions_indexes}
                        shuffle_answers={this.shuffle_questions_indexes}
                    />
                }

                {
                    this.state.start_sst_block &&
                    <SSTBlockManager
                        training_block={this.state.training_block}
                        end_of_sst_block={this.end_of_sst_block}
                        arrows_distribution={this.arrows_distribution[1]}
                        trials_amount={2}
                        block_number={this.block_number}
                        last_block={this.state.block_remains === 1}
                    />}

                {
                    this.state.end_of_experiment &&
                    <p1>תודה על השתתפותך בניסוי. התוצאות נקלטו</p1>
                }
            </div>
        )
    }
}