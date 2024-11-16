require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

console.log('Starting bot...');

// Configuration object
const config = {
    token: process.env.BOT_TOKEN, // Use environment variables for sensitive data
    clientId: '1307221706246721627', // Your bot's client ID
    guildId: '1292624867631562817', // Your server's guild ID
    welcomeChannelId: '1292624868537401385', // Updated welcome channel ID
    apiEndpoint: 'https://discord.com/api',
    gateway: 'wss://gateway.discord.gg',
    cdn: 'https://cdn.discordapp.com'
};

console.log('Configuration loaded');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

console.log('Client initialized');

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Register the commands
    const commands = [
        {
            name: 'info',
            description: 'Get information about Canary Chat'
        },
        {
            name: 'join',
            description: 'Get the link to join Canary Chat'
        },
        {
            name: 'rules',
            description: 'Display the server rules'
        },
        {
            name: 'help',
            description: 'List all available commands'
        },
        {
            name: 'ping',
            description: 'Check the bot\'s response time'
        },
        {
            name: 'report',
            description: 'Report an issue to the moderators'
        },
        {
            name: 'schedule',
            description: 'Display upcoming server events'
        },
        {
            name: 'feedback',
            description: 'Provide feedback about the server or the bot'
        }
    ];

    const rest = new REST({ version: '10' }).setToken(config.token);
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.get(config.welcomeChannelId);
    if (channel) {
        channel.send(`Welcome to the server, ${member}!`);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'info') {
        await interaction.reply("Canary Chat, founded in August 2024, is a small chat platform seeking to be a safe and collaborative space for all. We ensure users' safety with a variety of features, including an excellent moderation team, and we even have a complicated server scanning tool in the works! Our client is based off Spacebar.chat's Jank Client, which gives us a useful base for further development. We are currently in an open beta stage, which means you can sign up at: https://canarychat.me/");
    } else if (commandName === 'join') {
        await interaction.reply("Join Canary Chat: https://canarychat.me/");
    } else if (commandName === 'rules') {
        await interaction.reply("**Rules**:\n\nYou must follow each of these rules unless stated otherwise.\n\n1. Do not send any NSFW artwork, videos, or websites!\n2. NO EXCESSIVE SWEARING\n3. Do not complain to admins, mods, or helpers. They have the final say in punishments.\n4. No words that mean bad things.\n5. Do not insult others with racial slurs or other offensive language (cursing is allowed as long as it's not against someone).\n6. Do not advertise any products (websites allowed) unless given permission from an admin. (There is a role available to trusted people.)\n7. Do not try to scam or trick users into installing malware, viruses, or any malicious files or apps. (Permanent ban without hesitation)");
    } else if (commandName === 'help') {
        await interaction.reply("Available commands: /info, /join, /rules, /help, /ping, /report, /schedule, /feedback");
    } else if (commandName === 'ping') {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        interaction.editReply(`Pong! Latency is ${sent.createdTimestamp - interaction.createdTimestamp}ms.`);
    } else if (commandName === 'report') {
        await interaction.reply("Please provide details of the issue you'd like to report.");
    } else if (commandName === 'schedule') {
        await interaction.reply("Upcoming events: [List of events here]");
    } else if (commandName === 'feedback') {
        await interaction.reply("We appreciate your feedback! Please share your thoughts.");
    }
});

client.on('messageCreate', (msg) => {
    const swearWords = ['badword1', 'badword2', 'badword3']; // Replace with actual swear words
    if (swearWords.some(word => msg.content.toLowerCase().includes(word))) {
        msg.channel.send("Canary Chat is moderated by an organised team of moderators. It is not appropriate to be saying such words in our server. Please rephrase your sentence and try again.");
    }
});

console.log('Logging in...');
client.login(config.token).then(() => {
    console.log('Logged in successfully.');
}).catch(console.error);
