import React from 'react';
import CountDownTimer from './CountDownTimer';


export default class SSTBlockSummary extends React.Component {


    end_of_timer = () => {
        this.props.end_of_summary()
    }


    render() {
        let center_style={
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }

        return (
            <div >
                <h1 style = {center_style} className='text big-text title'> :נסיונות חיצים לבנים ללא עצירה</h1>
                <h1 style = {center_style} className='text little-text'>{
                    (this.props.go_trials_total_rt / this.props.go_trials_amount).toPrecision(5)} :זמן תגובה ממוצע (מילישניות)</h1>
                <h1  style = {center_style} className='text little-text'>{this.props.missed_go_trials / this.props.go_trials_amount} :טעויות</h1>

                <h1 style = {center_style} className='text big-text title'>נסיונות עצירה</h1>
                <h1 style = {center_style} className='text little-text center-to-the-right'>{(this.props.correct_stops / this.props.stop_signals_amount).toPrecision(3)} :יחס נסיונות עצירה מוצלחים</h1>
                <h1 style = {center_style} className='text little-text timer'> :אתה יכול לקחת הפסקה, הבלוק הבא יתחיל בעוד </h1>
                <CountDownTimer
                    message={""}
                    time={15}
                    end_of_timer={this.end_of_timer}
                />

            </div >
        )
    }
}