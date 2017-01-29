/**
 * Created by es11400 on 25/1/17.
 */
"use strict";


function CustomError(response, message, statusCode) {
    response.setHeader('content-type', 'application/json');
    response.status(statusCode).json({success: false, message: __(message)}); //eslint-disable-line no-undef
}

module.exports.CustomError = (response, message, statusCode) => {
    CustomError(response, message, statusCode)
}