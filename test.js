var simple_logger_module = require('./simple_logger');

// Sample of config
/*
var config = {
	level : ,
	out : ,
	debugOut : ,
	infoOut : ;
	warnOut : ;
	ErrorOut : ;
	metadata : { 
		withDate : ,
		register : ,
		withLevel : 
	}
}
*/

// -----------------------------------------------------------------------------------
// TEST LEVEL DEBUG

var config = {
	level : simple_logger_module.LogLevel.DEBUG,
	metadata : { 
		withDate : true,
		register : 'Test Debug',
		withLevel : true
	}
}

var log = new simple_logger_module.Log(config);
log.debug('it\'s ok - debug');
log.info('it\'s ok - info');
log.warn('it\'s ok - warn');
log.error('it\'s ok - error');

// -----------------------------------------------------------------------------------
// TEST LEVEL INFO

config = {
	level : simple_logger_module.LogLevel.INFO,
	metadata : { 
		withDate : true,
		register : 'Test Info',
		withLevel : true
	}
}

log = new simple_logger_module.Log(config);
log.debug('it\'s not ok - debug');
log.info('it\'s ok - info');
log.warn('it\'s ok - warn');
log.error('it\'s ok - error');

// -----------------------------------------------------------------------------------
// TEST LEVEL WARN

config = {
	level : simple_logger_module.LogLevel.WARN,
	metadata : { 
		withDate : true,
		register : 'Test Warn',
		withLevel : true
	}
}

log = new simple_logger_module.Log(config);
log.debug('it\'s not ok - debug');
log.info('it\'s not ok - info');
log.warn('it\'s ok - warn');
log.error('it\'s ok - error');

// -----------------------------------------------------------------------------------
// TEST LEVEL ERROR

config = {
	level : simple_logger_module.LogLevel.ERROR,
	metadata : { 
		withDate : true,
		register : 'Test Error',
		withLevel : true
	}
}

log = new simple_logger_module.Log(config);
log.debug('it\'s not ok - debug');
log.info('it\'s not ok - info');
log.warn('it\'s not ok - warn');
log.error('it\'s ok - error');

// -----------------------------------------------------------------------------------
// TEST WITHOUT METADATA

config = {
	level : simple_logger_module.LogLevel.DEBUG,
	metadata : false
}

log = new simple_logger_module.Log(config);
log.debug('it\'s ok - debug');
log.info('it\'s ok - info');
log.warn('it\'s ok - warn');
log.error('it\'s ok - error');

// -----------------------------------------------------------------------------------
// TEST MESSAGE ARGS

config = {
	level : simple_logger_module.LogLevel.DEBUG,
	metadata : false
}

log = new simple_logger_module.Log(config);
log.debug('it\'s ok - debug {0} {1} {2}', ['argument 1', 'argument 2', 'argument 3']);
log.info('it\'s ok - info {0} {1} {2}', ['argument 1', 'argument 2', 'argument 3']);
log.warn('it\'s ok - warn {0} {1} {2}', ['argument 1', 'argument 2', 'argument 3']);
log.error('it\'s ok - error {0} {1} {2}', ['argument 1', 'argument 2', 'argument 3']);

// -----------------------------------------------------------------------------------
// TEST MESSAGE ERROR

config = {
	level : simple_logger_module.LogLevel.DEBUG,
	metadata : false
}

var e = new Error('test error');

log = new simple_logger_module.Log(config);
log.debug(e);
log.info(e);
log.warn(e);
log.error(e);

// -----------------------------------------------------------------------------------
// TEXT MESSAGE DIFFERENT STRING OR ERROR

config = {
	level : simple_logger_module.LogLevel.DEBUG,
	metadata : false
}


log = new simple_logger_module.Log(config);
log.debug(new Date());
log.info(123123);
log.warn(undefined);
log.error(null);

// -----------------------------------------------------------------------------------
// TEXT FILE OUT STREAM

var fs = require('fs');

var ws = fs.createWriteStream('./log/debug.log', { flags: 'a+', encoding: 'utf8'});
console.log('<<< please see ./log/debug.log file >>>');



config = {
	level : simple_logger_module.LogLevel.DEBUG,
	out : ws, 
	metadata : false
}

log = new simple_logger_module.Log(config);
log.debug(new Date());
log.info(123123);
log.warn(undefined);
log.error(null);

// -----------------------------------------------------------------------------------
// TEXT MANY OUT STREAMS

var fs = require('fs');

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

log = new simple_logger_module.Log(config);
log.debug(new Date());
log.info(123123);
log.warn(undefined);
log.error(null);

// -----------------------------------------------------------------------------------
// TEXT WITHOUT ANYTHING

log = new simple_logger_module.Log();
log.debug('it\'s ok - debug');
log.info('it\'s ok - info');
log.warn('it\'s ok - warn');
log.error('it\'s ok - error');

// -----------------------------------------------------------------------------------
// TEXT WITHOUT ANYTHING

log = new simple_logger_module.Log({metadata : { 
		withDate : true,
		register : false,
		withLevel : true
	}});
log.debug('it\'s ok - debug');
log.info('it\'s ok - info');
log.warn('it\'s ok - warn');
log.error('it\'s ok - error');




