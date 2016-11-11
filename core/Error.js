'use strict'

class Error {
	constructor(number, name, description){
		this.number = number;
		this.name = name;
		this.description = description;
	}
}

module.exports = Error;