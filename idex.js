const logEvent = require('./middleware/logEvents');
const employees = require('./routes/api/employees')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter {};

MyEmitter = new MyEmitter();

