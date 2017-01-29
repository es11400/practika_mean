/**
 * Created by es11400 on 25/1/17.
 */
"use strict";

module.exports = function CustomError(message, statusCode, stack) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = statusCode;
    this.message = message || __('Ooops!!!, something is wrong...');
    if(stack) {this.stack = stack;}
};

require('util').inherits(module.exports, Error);