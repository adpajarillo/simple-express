const line = require('@line/bot-sdk');
const axios = require('axios');
const lineConfig = require('../utils/lineConfig');
const client = new line.messagingApi.MessagingApiClient(lineConfig);

const lineMessagingService = {
    sendMessage: async (userId, message) => {
        if (!userId || !message) {
            return { status: false, error: 'userId and message are required' };
        }
    
        try {
            await client.pushMessage(userId, {
                type: 'text',
                text: message,
            });
    
            return { status: true, message: 'Message sent successfully' };
        } catch (error) {
            console.error('Error sending message:', error.response ? error.response.data : error.message);
            return { status: false, error: 'Failed to send message' };
        }
    },

    replyMessage: async (replyToken, response) => {
        return client.replyMessage(replyToken, response);
    }
};

module.exports = lineMessagingService;
