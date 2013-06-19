/*
 * index.js
 *
 * (C) 2012 Tristan Slominski
 */

exports.LogLevel = { DEBUG : 0, INFO : 1, WARN : 2, ERROR : 3 };
exports.Log = function(_config){
	var _config = _config || {};
	
	_config.level == undefined ? _config.level = exports.LogLevel.DEBUG : null;
	
	_config.out == undefined ? _config.out = process.stdout : null;
	_config.debugOut == undefined ? _config.debugOut = _config.out : null;
	_config.infoOut == undefined ? _config.infoOut = _config.out : null;
	_config.warnOut == undefined ? _config.warnOut = _config.out : null;
	_config.errorOut == undefined ? _config.errorOut = _config.out : null;
	_config.metadata == undefined ? _config.metadata = {} : null;
	_config.metadata.withDate == undefined ? _config.metadata.withDate = true : null;
	_config.metadata.register == undefined ? _config.metadata.register = 'NOT REGISTERED' : null;
	_config.metadata.withLevel == undefined ? _config.metadata.withLevel = true : null;

	this.config = _config;
	
	var that = this;
	var methods = {
		debug : function(message, args){
			methods.canLog(message, args, 'DEBUG', exports.LogLevel.DEBUG, that.config.debugOut);
		},
		info : function(message, args){
			methods.canLog(message, args, 'INFO', exports.LogLevel.INFO, that.config.infoOut);
		},
		warn : function(message, args){
			methods.canLog(message, args, 'WARN', exports.LogLevel.WARN, that.config.warnOut);
		},
		error : function(message, args){
			methods.canLog(message, args, 'ERROR', exports.LogLevel.ERROR, that.config.errorOut);
		},
		canLog : function(message, args, levelName, level, _out){
			if(level < that.config.level){
				return;
			}
			methods.log(message, args, levelName, methods.print, _out);
		},
		log : function(message, args, levelName, _print, _out){
			if(that.config.metadata){
				var metadata = 'SIMPLE_LOGGER';
				if(that.config.metadata.withDate){
					metadata += ' - ' + ( new Date() ).toISOString() ;
				}
				if(typeof(that.config.metadata.register) == 'string'){
					metadata += ' - ' + that.config.metadata.register;
				}
				if(that.config.metadata.withLevel){
					metadata += ' - ' + levelName;
				}
				_print(metadata, _out);
			}
			
			methods.parseMessage(message,args, _print, _out);
		},
		parseMessage : function ( message, args, _print, _out) {
			if ( typeof( message ) == 'string' ) {
				for (i in args){
					message = message.replace('{' + i +'}', args[i]);
				}
				
				_print('| ' + message, _out);
			} else if ( message instanceof Error ) {
				_print('| ' + message.toString(), _out);
				_print('| ' + message.stack, _out);
			} else {
				_print('| ' + message, _out);
			}
		},
		print : function (message, _out){
			if(_out.writable){
				_out.write( message + '\n');
			}
		}
	} // methods
	
	this.debug = methods.debug;
	this.info = methods.info;
	this.warn = methods.warn;
	this.error = methods.error;
}