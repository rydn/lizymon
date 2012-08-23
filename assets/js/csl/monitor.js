var socket = io.connect('http://localhost');


socket.on('mon_cpu', function(cpu) {
	var timestamp = Date().toString();
	page.cache.stats.cpu[timestamp] = cpu;
});
socket.on('mon_proc', function(proc) {
	var timestamp = Date().toString();
	page.cache.stats.proc[timestamp] = proc;
});
socket.on('mon_mem', function(mem) {
	var timestamp = Date().toString();
	page.cache.stats.mem[timestamp] = mem;
});