var socket = io.connect('http://localhost');

//	CPU USAGE
socket.on('mon_cpu', function(cpu) {
	var latency = Date() - cpu.timestamp;
	$('.cpu').html('<li>' + JSON.stringify(cpu) + '</li>');
});
//	PROCCESORS
socket.on('mon_proc', function(proc) {
	var latency = Date() - proc.timestamp;
	$('.proc').html('<li>' + JSON.stringify(proc) + '</li>');
	$('.gauge_proc_percentage').width(proc.cpuPercent +'%');
	$('.gauge_proc_percentage').text(proc.cpuPercent +'% cpu usage');
});
//	MEMORY
socket.on('mon_mem', function(mem) {
	page.latency.current = Date() - mem.timestamp;
	$('.mem').html('<li>' + JSON.stringify(mem) + '</li>');

	var usedPercent = (Math.floor((mem.free /mem.total)*1000)/10);
	$('.gauge_memory_free').width(usedPercent + '%');
	$('.gauge_memory_free').text(usedPercent + '% free');

	$('.gauge_memory_used').width((100 - usedPercent) + '%');
	$('.gauge_memory_used').text((100 - usedPercent) + '% used');
});