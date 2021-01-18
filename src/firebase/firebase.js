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

const add_to_creativity_table = (trial_data, serial_number)=>{
    firebase.database().ref('creativity_trials').push({
        id:serial_number,
        block_number:trial_data.block_number,
        correct:true,
        rt:1500
    })
}


const add_to_sst_table = (trial_data, serial_number)=>{
    firebase.database().ref('sst_trials').push({
        id:serial_number,
        block_number:trial_data.block_number,
        correct:true,
        rt:1500
    })
}

add_to_creativity_table({
    block_number: 1,
}, 12)

add_to_sst_table({
    block_number: 2,
}, 14)


add_to_sst_table({
    block_number: 0,
}, 10)

add_to_creativity_table({
    block_number: 2,
}, 14)


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