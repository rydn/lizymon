var express = require('express'),
	app = module.exports = express.createServer(),
	mon = require('./monitor/main.js'),
	io = require('socket.io').listen(app),
	opts = require(__dirname + '/config/opts.js');

require(__dirname + '/config/env.js')(express, app);
require(__dirname + '/routes')(app);

//	socket.io configuration
io.configure(function() {
	io.enable('browser client minification');
	io.enable('browser client etag');
	io.enable('browser client gzip');
	io.set('log level', 1);
	io.set('transports', ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
});
//	on socket client connect
io.sockets.on('connection', function(socket) {
	//	start monitoring
	mon.start(500);

	mon.on('cpu', function(cpu) {
		if (cpu) {
			cpu = {
				timestamp: Date(),
				cpus: cpu
			};
			socket.emit('mon_cpu', cpu);
		}
	});

	mon.on('memory', function(mem) {
		if (mem) {
			mem['timestamp'] = Date();
			socket.emit('mon_mem', mem);
		}
	});

	mon.on('proc', function(proc) {
		if (proc) {
			proc['timestamp'] = Date();
			socket.emit('mon_proc', proc);
		}
	});
});

//	start http server
app.listen(opts.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);