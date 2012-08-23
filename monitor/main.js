var events = require('events'),
  memory = require('./memory'),
  proc = require('./proc'),
  cpu = require('./cpu');

var mon = new events.EventEmitter(),
  buffer = {},
  cycle, listeners;

module.exports = mon;

mon.start = function(interval) {
  mon.update(function() {
    interval = interval || 100;
    var cycle = setInterval(mon.run, interval);
    return mon;
  });
};

mon.stop = function() {
  clearInterval(cycle);
};

mon.update = function(cb) {
  memory.run(function(err, mem) {
    buffer.memory = mem;
    cpu.run(function(err, cpu) {
      buffer.cpu = cpu;
      proc.run(function(err, proc) {
        buffer.proc = proc;
        cb();
      });
    });
  });
};

mon.run = function() {
  var last = {
    memory: buffer.memory,
    cpu: buffer.cpu,
    proc: buffer.proc
  };
  mon.update(function() {
    if (last.memory != buffer.memory) mon.emit('memory', buffer.memory);
    if (last.cpu != buffer.cpu) mon.emit('cpu', buffer.cpu);
    if (last.proc != buffer.cpu) mon.emit('proc', buffer.proc);
  });
};

mon.get = function(key) {
  if (buffer[key]) return buffer[key];
  else throw new Error('Could not find requested data.');
};

mon.when = function(condition) {
  switch (condition) {
  default:
    console.log('This isn\'t done yet.');
    break;
  }
};