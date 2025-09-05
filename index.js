require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, PermissionsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

// Bot ready event
client.on('ready', () => {
  console.log(`✅ ${client.user.tag} is online!`);
  client.user.setActivity('!help for commands');
});

// Command handler
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).split(/ +/);
  const command = args.shift().toLowerCase();

  // Help command
  if (command === 'help') {
    const helpEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🤖 Bot Commands')
      .setDescription('**Educational purposes only!**\nThese commands simulate actions without real harm.')
      .addFields(
        { name: '🎉 Fun', value: '`!ping` - Pong!\n`!say [text]` - Repeat text' },
        { name: '🛠️ Moderation', value: '`!kick @user` - Simulate kick\n`!ban @user` - Simulate ban' },
        { name: '🌀 Utility', value: '`!spam [text]` - Spam test (3x)\n`!channels` - List channels' }
      );
    message.reply({ embeds: [helpEmbed] });
  }

  // Ping command
  else if (command === 'ping') {
    message.reply('🏓 Pong!');
  }

  // Say command
  else if (command === 'say') {
    const text = args.join(' ');
    if (!text) return message.reply('❌ Please provide text!');
    message.channel.send(text);
  }

  // Kick simulation
  else if (command === 'kick') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return message.reply("❌ You need Kick Members permission!");
    }
    const user = message.mentions.users.first();
    if (!user) return message.reply("❌ Mention a user to kick!");
    message.reply(`✅ Simulated kicking ${user.tag} (educational only)`);
  }

  // Spam simulation (3 messages)
  else if (command === 'spam') {
    const text = args.join(' ');
    if (!text) return message.reply('❌ Provide text to spam!');
    for (let i = 0; i < 3; i++) {
      message.channel.send(`[SPAM TEST ${i+1}] ${text}`);
    }
  }

  // List channels
  else if (command === 'channels') {
    const channels = message.guild.channels.cache.map(ch => `#${ch.name}`).join(', ');
    message.reply(`📝 Server channels: ${channels}`);
  }
});

// Login
client.login(process.env.DISCORD_TOKEN);
