let loggedWelcome = false;

module.exports = function () {
    if(!loggedWelcome) {
        console.log('THIS IS MODULE A');
        loggedWelcome = true;
    }
    console.log('Hello World from a.');
    return 'a';
}
