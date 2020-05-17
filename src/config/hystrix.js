const CommandFactory = require('hystrixjs').commandFactory;
const serviceCommand = CommandFactory.getOrCreate('Service on port:'+process.env.PORT)