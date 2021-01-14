import React from 'react';


export default class Instructions extends React.Component {

    get_answers = (answers) => {
        const answers_buttons = <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}> {answers.map((answer, i) => <button className="button answer-button"  onClick={this.button_clicked} key={i}>{answer} </button> )}</div>

        return answers_buttons
    }


    get_instructions=(instructions)=>{
        const instructions_array =  <div> {instructions.map((sentence,i)=> <h1 style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }} key={i}>{sentence}</h1>)}
            </div>

        return instructions_array
    }

    render() {
        return (
            <div  className="instructions" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                { !this.props.to_start && this.get_instructions(this.props.instructions)}
            </div>
        )
    }
};


