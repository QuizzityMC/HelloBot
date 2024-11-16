require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

console.log('Starting bot...');

// Configuration object
const config = {
    token: process.env.BOT_TOKEN, // Use environment variables for sensitive data
    welcomeChannelId: '1299656965785441315', // Replace with your channel ID
    apiEndpoint: 'https://chat.quizzity.tech/api',
    gateway: 'wss://chat.quizzity.tech',
    cdn: 'https://chat.quizzity.tech/cdn'
};

console.log('Configuration loaded');

const client = new Client({ 
    intents: [GatewayIntentBits.GUILDS, GatewayIntentBits.GUILD_MEMBERS],
    http: {
        api: config.apiEndpoint,
        cdn: config.cdn
    },
    ws: {
        properties: {
            $browser: "Discord Android",
        },
        url: config.gateway
    }
});

console.log('Client initialized');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.get(config.welcomeChannelId);
    if (channel) {
        channel.send(`Welcome to the server, ${member}!`);
    }
});

console.log('Logging in...');
client.login(config.token).then(() => {
    console.log('Logged in successfully.');
}).catch(console.error);
