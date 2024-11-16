const { Client, Intents } = require('discord.js');

// Configuration object
const config = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzMDQ2Njc5MTIyMjg5NjE1NTYiLCJpYXQiOjE3MzExMjc0NzN9.bgtrPihvo7gqWNNC1fhS4XTEJjF_ez40USm4TxOLXNY', // Replace with your bot's token
    welcomeChannelId: '1299656965785441315', // Replace with your channel ID
    apiEndpoint: 'https://chat.quizzity.tech/api',
    gateway: 'wss://chat.quizzity.tech',
    cdn: 'https://chat.quizzity.tech/cdn'
};

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
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

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.get(config.welcomeChannelId);
    if (channel) {
        channel.send(`Welcome to the server, ${member}!`);
    }
});

client.login(config.token);
