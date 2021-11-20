export class Logger {
	env: string = '';

	constructor() {
		this.env = process.env.NODE_ENV || '';
	}

	info(...msg: any) {
		if (this.env !== 'production') {
			console.log(...msg);
		}
	}

	warn(...msg: any) {
		if (this.env !== 'production') {
			console.warn(...msg);
		}
	}

	error(...msg: any) {
		if (this.env !== 'production') {
			console.error(...msg);
		}
	}
}
