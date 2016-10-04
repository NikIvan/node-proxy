const EventEmitter = require('events').EventEmitter;

class MyEmitter extends EventEmitter {
	constructor(filePath) {
		super();
		this.filePath = filePath;
		this.body = '';
		this.readFinished = false;
		this.writeFinished = false;
	}

	setReadFinished() {
		this.readFinished = true;

		if(this.writeFinished) {
			this.emit('done');
		}
	}

	getReadFinished() {
		return this.readFinished;
	}

	setWriteFinished(body) {
		this.writeFinished = true;
		this.body = body;

		if(this.readFinished) {
			this.emit('done');
		}
	}

	getWriteFinished() {
		return this.writeFinished;
	}
}

module.exports = MyEmitter;