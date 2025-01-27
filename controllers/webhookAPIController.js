let io;

const setIoInstance = (ioInstance) => {
  io = ioInstance;
};

const execute = (req, res) => {
  // You can use the io instance here to emit events
  io.emit('idom-send-message', 'data');
  res.send('Event emitted');
};

module.exports = {
  setIoInstance,
  execute,
};