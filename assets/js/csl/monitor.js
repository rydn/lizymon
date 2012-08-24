var socket = io.connect('http://localhost');

//	PROCCESORS
socket.on('mon_cpu', function(cpus) {
	var date = new Date();
	$('.cpu').html('<li>' + JSON.stringify(cpus) + '</li>');
	
	var currrentLatency = date.getTime() - cpus.timestamp;
	
	page.latency.update(currrentLatency);
	
});

//	CPU USAGE
socket.on('mon_proc', function(proc) {
	var date = new Date();
	$('.proc').html('<li>' + JSON.stringify(proc) + '</li>');
	
	$('.gauge_proc_percentage').width(proc.cpuPercent + '%');
	$('.gauge_proc_percentage').text(proc.cpuPercent + '% cpu usage');

	
	var currrentLatency = date.getTime() - proc.timestamp;
	
	page.latency.update(currrentLatency);
});
//	MEMORY
socket.on('mon_mem', function(mem) {
	var date = new Date();
	var usedPercent = (mem.total / mem.free ) * 100 ;
	usedPercent = Math.floor(usedPercent) / 10;
	$('.gauge_memory_free').width(usedPercent + '%');
	$('.gauge_memory_free').text(usedPercent + '% free');

	$('.gauge_memory_used').width((100 - usedPercent) + '%');
	$('.gauge_memory_used').text((100 - usedPercent) + '% used');
	var currrentLatency = date.getTime() - mem.timestamp;
	$('.mem').html('<li>' + JSON.stringify(mem) + '</li>');
	page.latency.update(currrentLatency);
});

