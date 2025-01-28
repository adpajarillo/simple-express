const lineMessagingService = require('../services/lineMessaging.service');
const axios = require('axios');
const lineConfig = require('../utils/lineConfig');

let io;

const setIoInstance = (ioInstance) => {
  io = ioInstance;
};

const execute = async (req, res) => {
  // You can use the io instance here to emit events
  io.emit('idom-send-message', 'data');
  await lineMessagingService.sendMessage('U69d626a5bb4af5c661dbc94904ea4b2a', 'data');
  res.send('Event emitted');
};

const handleEvent = async (req, res) => {
    const events = req.body.events;

    const results = await Promise.all(events.map(handleEventResponse));
  
    res.json(results);
}

const getUserProfile = async (userId) => {
  const headers = {
    Authorization: `Bearer ${lineConfig.channelAccessToken}`
  };

  try {
    const response = await axios.get(`https://api.line.me/v2/bot/profile/${userId}`, { headers });
    const profile = response.data;
    
    return profile.displayName;
  } catch (error) {
    console.error('Error getting user profile:', error);
  }
}

const handleEventResponse = async (event) => {
    // Check if the event is a message event
    if (event.type !== 'message' || event.message.type !== 'text') {
      return null;
    }

    const now = new Date();
  
    // Create a response message
    const response = {
      id: event.message.id,
      text: event.message.text,
      userId: event.source.userId,
      timestamp: now.toLocaleString(),
      accountName: await getUserProfile(event.source.userId),
    };

    console.log(response);

    io.emit('idom-message', response);
  
    return response;
  };

module.exports = {
  setIoInstance,
  execute,
  handleEvent,
};