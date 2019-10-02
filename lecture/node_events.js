const events = require('events')
let eventEmitter = new events.EventEmitter()

// create event handler
let myEventHandler = () => console.log('I hear a scream')

// Assign the event handler to an event
eventEmitter.on('scream', myEventHandler)

setTimeout(() => {
    // Fire the 'scream' event
    eventEmitter.emit('scream')
}, 3000);