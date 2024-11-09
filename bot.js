const { Client, Intents } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async message => {
    if (message.content.toLowerCase() === 'welcome') {
        message.channel.send('Welcome to Canary Chat');
        
        // Example API call to your Spacebar instance
        try {
            const response = await axios.get(`${process.env.SPACEBAR_API}/some-endpoint`);
            console.log('API response:', response.data);
        } catch (error) {
            console.error('Error calling API:', error);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
