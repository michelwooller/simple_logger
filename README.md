Simple Logger for Nodejs
====

	It's a tasteful and lightweight Logger API, done for you. And for me, obvious :)
	For suggestions or bugs visit: https://github.com/michelwooller/simple_logger/issues

## Installation

    npm install simple_logger

## Usage

```javascript

// simple usage. It will write on console for you

var simple_logger_module = require('./simple_logger');
var log = new simple_logger_module.Log();

log.debug('it\'s ok - debug');
log.info('it\'s ok - info');
log.warn('it\'s ok - warn');
log.error('it\'s ok - error');

```

## Full config details

```javascript

var simple_logger_module = require('./simple_logger');

var log = new simple_logger_module.Log({
	level : simple_logger_module.LogLevel.INFO, // default = simple_logger_module.LogLevel.DEBUG, others = simple_logger_module.LogLevel.WARN, simple_logger_module.LogLevel.ERROR
	out : process.stdout, // any object that implements write and writable methods of stream.Writable OBS: this config will override the specific outs below if them are undefined
	debugOut : process.stdout, // even though out
	infoOut : process.stdout, // even though out
	warnOut : process.stdout, // even though out
	ErrorOut : process.stdout, // even though out
	metadata : { // accepts a closure definition or false. OBS: if you not declare this config, it'll assume you want all metadata
		withDate : true, // true or false, add date
		register : 'My module', // a text will be appended on log metadata, if you not want this, declare false
		withLevel : true // true or false, add level
	}
});

log.debug('it\'s ok - debug');
log.info('it\'s ok - info');
log.warn('it\'s ok - warn');
log.error('it\'s ok - error');

```

## Some importants examples (more on test.js)

```javascript

//  ------ log on files ------ 

var simple_logger_module = require('./simple_logger'),
	fs = require('fs');

var wsd = fs.createWriteStream('./log/debug.log', { flags: 'a+', encoding: 'utf8'});
var wsi = fs.createWriteStream('./log/info.log', { flags: 'a+', encoding: 'utf8'});
var wsw = fs.createWriteStream('./log/warn.log', { flags: 'a+', encoding: 'utf8'});
var wse = fs.createWriteStream('./log/error.log', { flags: 'a+', encoding: 'utf8'});

console.log('<<< please see ./log/debug.log file >>>');
console.log('<<< please see ./log/info.log file >>>');
console.log('<<< please see ./log/warn.log file >>>');
console.log('<<< please see ./log/error.log file >>>');

config = {
	level : simple_logger_module.LogLevel.DEBUG,
	debugOut : wsd, 
	infoOut : wsi, 
	warnOut : wsw, 
	errorOut : wse, 
	metadata : false
}

var log = new simple_logger_module.Log(config);



log.debug('it\'s ok - debug');
log.info('it\'s ok - info');
log.warn('it\'s ok - warn');
log.error('it\'s ok - error');

```

