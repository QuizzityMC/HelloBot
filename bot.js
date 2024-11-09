const { Client, Intents } = require('discord.js');
const SpacebarClient = require('@spacebar/client');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const spacebarClient = new SpacebarClient({
    apiBaseURL: process.env.SPACEBAR_API,
    cdnBaseURL: process.env.SPACEBAR_CDN,
    gatewayBaseURL: process.env.SPACEBAR_GATEWAY
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async message => {
    if (message.content.toLowerCase() === 'welcome') {
        message.channel.send('Welcome to Canary Chat');
    }
});

client.login(process.env.DISCORD_TOKEN);
