var socket = io.connect('http://localhost');

//	PROCCESORS
socket.on('mon_cpu', function(cpus) {
	var date = new Date();
	var currrentLatency = date.getTime() - cpus.timestamp;
	page.latency.update(currrentLatency);
	//$('.cpu').html('<li>' + JSON.stringify(cpu) + '</li>');
});

//	CPU USAGE
socket.on('mon_proc', function(proc) {
	
	//$('.proc').html('<li>' + JSON.stringify(proc) + '</li>');
	$('.gauge_proc_percentage').width(proc.cpuPercent + '%');
	$('.gauge_proc_percentage').text(proc.cpuPercent + '% cpu usage');

	var date = new Date();
	var currrentLatency = date.getTime() - proc.timestamp;
	page.latency.update(currrentLatency);
});
//	MEMORY
socket.on('mon_mem', function(mem) {
	
	//$('.mem').html('<li>' + JSON.stringify(mem) + '</li>');

	var usedPercent = (Math.floor((mem.free / mem.total) * 1000) / 10);
	$('.gauge_memory_free').width(usedPercent + '%');
	$('.gauge_memory_free').text(usedPercent + '% free');

	$('.gauge_memory_used').width((100 - usedPercent) + '%');
	$('.gauge_memory_used').text((100 - usedPercent) + '% used');

	var date = new Date();
	var currrentLatency = date.getTime() - mem.timestamp;
	page.latency.update(currrentLatency);
});

