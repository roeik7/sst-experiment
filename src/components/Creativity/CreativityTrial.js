import React from 'react';

export default class CreativityTrial extends React.Component {


    get_answers = (answers) => {
        const answers_buttons = <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}> {answers.map((answer, i) => <button className="button answer-button"  onClick={this.button_clicked} key={i}>{answer} </button> )}</div>

        return answers_buttons
    }

    button_clicked = (event)=>{
        this.props.user_clicked({
            questions: this.props.question,
            answer: event.target.innerText
        })
    }

    render() {
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