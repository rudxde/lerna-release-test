const a = require('@rudx-lenra-test/a');

module.exports = function() {
    a();
    console.log('hello from b');
    return 'b';
}