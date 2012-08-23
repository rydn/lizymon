var socket = io.connect('http://localhost');

socket.on('mon_cpu', function(cpu){
	var timestamp = Date().toString();
	page.cache.stats.cpu[timestamp] = cpu;
});
