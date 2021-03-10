const a = require('@rudx-lenra-test/a');

let loggedWelcome = false;

module.exports = function() {
    a();
    if(!loggedWelcome) {
        console.log('THIS IS MODULE Bee!!!');
        loggedWelcome = true;
    }
    console.log('Hello Bee.');
    return;
}
