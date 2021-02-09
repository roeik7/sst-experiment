import React from 'react';

export default class CreativityTrial extends React.Component {
    answers_indexes = []
    timeout_id = 0
    start = 0

    shuffle_answers = (i_answers)=>{
        this.answers_indexes = this.props.shuffle(0,3)
        let answers=[]
        console.log("answers_indexes= ",this.answers_indexes)
        
        for (var i=0;i<3;i++){
            answers.push(i_answers[this.answers_indexes[i]])
        }


        return answers
    }

    get_answers = (answers) => {
        let random_answers = this.shuffle_answers(answers)
        console.log("answers indexes= ",this.answers_indexes)
        const answers_buttons = <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}> {random_answers.map((answer, i) => <button className="button answer-button"  onClick={this.button_clicked} key={i}>{answer[0]} </button> )}</div>

        return answers_buttons
    }

    find_creativity_level = (answer,answers)=>{
        for(var i=0;i<3;i++){
            if(answers[i][0]===answer){
                return answers[i][1]
            }
        }
    }

    time_passed = ()=>{
        console.log("time passed")
    }

    button_clicked = (event)=>{
        clearTimeout(this.timeout_id)
        let curr_rt = new(Date) - this.start
        let creativity_level = this.find_creativity_level(event.target.innerText, this.props.answers)
        this.props.user_clicked({
            answer: creativity_level,
            answers_order:this.answers_indexes.toString().replace(/,/g,"|"),
            rt:curr_rt
        })
    }

    render() {
        this.start = new Date()
        this.timeout_id = setTimeout(this.time_passed,this.props.creativity_time)

        return (
            <div>
                <h1 className='question text' style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>{this.props.question}</h1>
                {this.get_answers(this.props.answers)}
            </div>
        )
    }
}