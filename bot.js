const axios = require('axios');
require('dotenv').config();

const SPACEBAR_API_URL = process.env.SPACEBAR_API;
const SPACEBAR_TOKEN = process.env.SPACEBAR_TOKEN; // Your bot token for Spacebar

async function respondToWelcome(message) {
    if (message.toLowerCase().includes('welcome')) {
        const responseMessage = 'Welcome to Canary Chat';
        try {
            await axios.post(`${SPACEBAR_API_URL}/messages`, {
                content: responseMessage,
                token: SPACEBAR_TOKEN
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

// Example function to listen to messages (implementation may vary based on Spacebar API)
async function listenToMessages() {
    try {
        const response = await axios.get(`${SPACEBAR_API_URL}/messages`, {
            headers: { Authorization: `Bearer ${SPACEBAR_TOKEN}` }
        });
        const messages = response.data;

        messages.forEach(message => {
            respondToWelcome(message.content);
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

// Poll for new messages every 5 seconds
setInterval(listenToMessages, 5000);
