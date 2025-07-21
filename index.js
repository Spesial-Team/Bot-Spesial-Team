require('dotenv').config();
const {
    Client,
    GatewayIntentBits,
    Events
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`✅ Bot sudah online sebagai ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const {
        commandName
    } = interaction;

    if (commandName === 'ping') {
        const target = interaction.options.getString('target');
        await interaction.reply(`🏓 Pong untuk: ${target}`);
    } else if (commandName === 'help') {
        await interaction.reply('📌 Command tersedia: /ping, /help, /info');
    } else if (commandName === 'info') {
        await interaction.reply('ℹ️ Saya adalah bot Discord Spesial Team.');
    }
});

// Eval Command (untuk owner saja)
const ownerId = '904075553508827148'; // Ganti dengan ID kamu

client.on('messageCreate', async(message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('!eval')) return;
    if (message.author.id !== ownerId) return;

    const args = message.content.slice(5).trim();
    try {
        const result = eval(args);
        let output = typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result);

        if (output.length > 2000) output = output.slice(0, 1990) + '...';

        message.reply(`✅ Output:\n\`\`\`js\n${output}\n\`\`\``);
    } catch (err) {
        message.reply(`❌ Error:\n\`\`\`js\n${err}\n\`\`\``);
    }
});

client.login(process.env.TOKEN);