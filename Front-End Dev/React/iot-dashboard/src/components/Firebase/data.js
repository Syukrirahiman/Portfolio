const rootRef = firebase.database().ref();
const beaconRef = rootRef.child('beacon1');
const tableval = beaconRef.limitToLast(1).on('child_added',function(snapshot){
    console.log(snapshot.name(),snapshot.val());
});
