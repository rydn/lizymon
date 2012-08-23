var express = require('express'),
	app = module.exports = express.createServer(),
	mon = require('./monitor/main.js'),
	io = require('socket.io').listen(app),
	opts = require(__dirname + '/config/opts.js');

require(__dirname + '/config/env.js')(express, app);
require(__dirname + '/routes')(app);

//	on socket client connect
io.sockets.on('connection', function(socket) {
	//	start monitoring
	mon.start(100);

	mon.on('cpu', function(cpu) {
		socket.emit('mon_cpu', cpu);
	});

	mon.on('memory', function(mem) {
		socket.emit('mon_mem', mem);
	});

	mon.on('proc', function(proc) {
		socket.emit('mon_proc', proc);
	});
});

//	start http server
app.listen(opts.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);