import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBOWaDY0OK2tezhiPGEPsmehRZ-5ZslqPI",
    authDomain: "sst-experiment-cac8d.firebaseapp.com",
    databaseURL: "https://sst-experiment-cac8d-default-rtdb.firebaseio.com",
    projectId: "sst-experiment-cac8d",
    storageBucket: "sst-experiment-cac8d.appspot.com",
    messagingSenderId: "491806222601",
    appId: "1:491806222601:web:cf7e9cead9466ac4244bd8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const test_function = (trial_data, serial_number) => {
    firebase.database().ref('sst_trials').push({
        id: serial_number,
        block_number: trial_data.block_number,
        correct: true,
        rt: 1500
    })
}

const add_to_creativity_table = (trial_data) => {
    firebase.database().ref('creativity_trials').push({
        id:0,
        question_number:trial_data.question,
        answer_level: trial_data.answer_level,
        answers_order:trial_data.answers_order,
        rt:trial_data.rt
    })
}


const add_to_sst_table = (trial_data) => {
    firebase.database().ref('sst_trials').push({
        type: trial_data.type,
        side: trial_data.side,
        key: trial_data.key,
        rt: trial_data.rt,
        correct: trial_data.correct,
        block_num: trial_data.block_num,
        req_SOA: trial_data.req_SOA,
        true_SOA: trial_data.true_SOA
    })
}

const add_to_creativity_summary = (creativity_task) => {
    firebase.database().ref('creativity_summary').push({
        id:creativity_task.id,
        questions_order: creativity_task.questions_order
    })
}


export { add_to_creativity_table, add_to_sst_table, add_to_creativity_summary }

// add_to_creativity_table({
//     block_number: 1,
// }, 12)

// add_to_sst_table({
//     block_number: 2,
// }, 14)


// add_to_sst_table({
//     block_number: 0,
// }, 10)

// add_to_creativity_table({
//     block_number: 2,
// }, 14)


//   firebase.database().ref('sst_trials').push({
//       block_number:0,
//       correct:true,
//       rt:1500
//   })

//   firebase.database().ref('creativity_trials').push({
//       block_number: 0,
//       rt:1500
//   })
//   firebase.database().ref().set({
//       name:"roeik",
//       sst_trials:[{
//           block:0,
//           rt:1400,
//           correct:true
//       },{
//           block:0,
//           rt:1200,
//           correct:true
//       }]
//   })