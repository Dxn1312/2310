const {Client, Intents, MessageReaction} = require("discord.js")
const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents, ws: { properties: { browser: "Discord iOS" }} });
const { Collection } = require('discord.js');
const db = require('quick.db')
const Invites = new Collection();
const { Snake, MatchPairs } = require('discord-gamecord');
const moment = require('moment');
const fs = require('fs');
const usersMap = new Map();
const prefix = '!';
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require ("discord.js")
const ms = require('ms')
const Discord = require('discord.js')
const axios = require('axios')
const { channel } = require('diagnostics_channel');
const { set } = require('express/lib/application');
const voiceCollection = new Collection();
const { AuditLogEvent } = require('discord.js');
const { syncBuiltinESMExports } = require("module");
const osu = require('node-os-utils');
var os = require('os');
const { ActionRowBuilder, Modal, showModal, TextInputBuilder, TextInputStyle, TextInputComponent } = require('discord.js');
client.commands = new Collection();
client.login("")
////// Start Up \\\\\\
client.once('ready', () => {
  console.log(`${client.user.tag} is online`);
  client.user.setPresence(
    { 
        activities: [
            { 
                name: 'Palukas Shop' , 
                type: "WATCHING" 
            }
        ], 
        status: "online" // online, idle, invisible, dnd
    }
) 
});
//Errors
client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
    })
    
    process.on('unhandledRejection', error => {
    console.error(error);
    });
////////////////////////
    const config = {

      "ticketlogs": "1201909184564564079",
      "ticketparent":"1201909158333661204",

      "color": "#2F3136",
      "name": "Palukas Shop",
      "logo": "",
      "prefix": "!",

     "autorole": "1201909703840374854",

      "welcome": "1201909159453266031",
      "vouche": "1201909205817098240",
      "feedback_channel": "1116026376164757666",


    "yt2mp3_review": "1201909186548727848",
    "yt2mp3_logs": "1201909186548727848",
    "yt2mp3_channel": "1201909186548727848",
    "yt2mp3_message_id": "1201909186548727848",

    "legityes": "<a:yes:1201924333149102090>",
    "legitno": "<a:no:1201924334814236803>",

    "staffappmodal_logs": "1201909180722577419",
    "staffe1": "Τι μπορείς να προσφέρεις στο shop μας;",
    "staffe2": "Έχεις προϋπηρεσία;",
    "staffe3": "Τι ηλικία έχεις;",
    "staffe4": "Πόσες ώρες μπορείς να είσαι διαθέσιμος;",
    "managere1": "Τι μπορείς να προσφέρεις στο shop μας;",
    "managere2": "Έχεις προϋπηρεσία;",
    "managere3": "Τι ηλικία έχεις;",
    "managere4": "Πόσες ώρες μπορείς να είσαι διαθέσιμος;",

    "joinlogs": "1201909161064149044",
    "leavelogs": "1201909162598998087",
    "msglogs": "1201909165610782760",
    "voicelogs": "1201909167107866664",
    "rolelogs": "1201909168513220680",
    "channellogs": "1201909187618283624",
    "kicklogs": "1201909174502424647",
    "banlogs": "1201909170123579453",
    "anti_link_logs": "1201909178575102026",
    "alttime": "10",
    "altlogs": "1201909176260104233",


    "promo_role": "1201909671192166400",
    "designs_role": "1201909671192166400",

    "MEMBERS": "1201909193192505426",
    "BOOSTS": "1201909194874421268",
    "id": "1186718998889496586",


    "restock_ping_role": "1196152003651444806",
    "event_role": "1192470227808694343",
    "drop_role": "1192468261649006713",



    "sg_channel": "1201920091646590976",
    "e11": "Server Link",

    "support_staff": "1201920159275819138",
    "support_parent": "1201920159275819138",
    "support_channel": "1201920159275819138",
    "support_logs": "1201920159275819138",
    "role1": "1162345425026695258",
    "role2": "1162345493779709972",
    "role3": "1162345524591067196",


    "invite": "1201909182505156618",
    "invites" : "1201909182505156618",
    "lbemoji": "<a:arrow:1194728424812580894>"


    }

const staffrole = "1201909688883761163";
const managerrole = "1201909688883761163";

client.on('messageCreate', message => {
  if (message.content.toLowerCase() === '!ticket') {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.delete();
    } else {
      message.delete();
      const embed = new MessageEmbed()
        .setAuthor(config.name, config.logo)
        ///.setTitle('Ticket | Επικοινωνήστε μαζί μας')
        .setDescription('**Για να ανοίξετε κάποιο Ticket πατήστε το κουμπί <:PalukasShop:1201912587152003112> και θα σας εξυπηρετήσουμε άμεσα.**')
        .setThumbnail(config.logo)
        .setColor(config.color);
      const button = new MessageButton()
        .setCustomId('openticket')
        .setEmoji("<:PalukasShop:1201912587152003112>")
        .setStyle("SECONDARY");
      const btns = new MessageActionRow()
        .addComponents(button);

      message.channel.send({ embeds: [embed], components: [btns] }).catch(() => { });
    }
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'openticket') {
    const ch = interaction.guild.channels.cache.find(ch => ch.name === `🎫ticket-${interaction.user.username}`)
    if (ch) {
      const alreadyOpenEmbed = new MessageEmbed()
        .setColor(config.color)
        .setDescription("**Έχεις ήδη ένα Ticket ανοιχτό.**");

      return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
    }
    const ch2 = interaction.guild.channels.cache.find(ch => ch.name === `👑owner-${interaction.user.username}`)
    if (ch2) {
      const alreadyOpenEmbed = new MessageEmbed()
        .setColor(config.color)
        .setDescription("**Έχεις ήδη ένα Ticket ανοιχτό.**");

      return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
    }
    const ch3 = interaction.guild.channels.cache.find(ch => ch.name === `💸buy-${interaction.user.username}`)
    if (ch3) {
      const alreadyOpenEmbed = new MessageEmbed()
        .setColor(config.color)
        .setDescription("**Έχεις ήδη ένα Ticket ανοιχτό.**");

      return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
    }
    const ch4 = interaction.guild.channels.cache.find(ch => ch.name === `❓other-${interaction.user.username}`)
    if (ch4) {
      const alreadyOpenEmbed = new MessageEmbed()
        .setColor(config.color)
        .setDescription("**Έχεις ήδη ένα Ticket ανοιχτό.**");

      return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
    }
    const ticketChannel = await interaction.guild.channels.create(`🎫ticket-${interaction.user.username}`, {
      type: "GUILD_TEXT",
      parent: config.ticketparent,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: interaction.user.id,
          allow: ['VIEW_CHANNEL'],
          deny: ['SEND_MESSAGES'],
        },
        {
          id: managerrole,
          allow: ['VIEW_CHANNEL'],
          deny: ['SEND_MESSAGES'],
        },
        {
          id: staffrole,
          allow: ['VIEW_CHANNEL'],
          deny: ['SEND_MESSAGES'],
        },
      ],
    });

    const successEmbed = new MessageEmbed()
    .setColor(config.color)
    .setDescription(`**Το ticket σας άνοιξε επιτυχώς στον κανάλι** <#${ticketChannel.id}>`);
  
  await interaction.reply({ embeds: [successEmbed], ephemeral: true });

    const embed = new MessageEmbed()
  .setAuthor(config.name, config.logo)
  .setDescription('**Επιλέξτε το είδος του Ticket με βάση το πρόβλημα που έχετε**')
  .setThumbnail(config.logo)
  .setColor(config.color);

const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setCustomId('owner')
      .setLabel('Owner')
      .setEmoji('<:Crown1:1176573265259528305>')
      .setStyle('SECONDARY'),
    new MessageButton()
      .setCustomId('buy')
      .setLabel('Buy')
      .setEmoji('<a:moneydiamond:1189709172061777981>')
      .setStyle('SECONDARY'),
    new MessageButton()
      .setCustomId('other')
      .setLabel('Other')
      .setEmoji('<a:questiontr:1157971898685206600>')
      .setStyle('SECONDARY')
  );

  try {
    if (ticketChannel) {
      const successEmbed = new MessageEmbed()
        .setColor(config.color)
        .setDescription(`Το ticket σας άνοιξε επιτυχώς στον κανάλι <#${ticketChannel.id}>`)
        .setFooter('Ευχαριστούμε που επιλέξατε την υπηρεσία μας!');

    } else {
      console.error("Σφάλμα: Δεν ήταν δυνατή η αναφορά στο κανάλι του ticket.");
    }
  
    const notificationMessage = await ticketChannel.send({
      content: `<@&${staffrole}> <@${interaction.user.id}>`
    });
  
    // Delete the notification message after sending
    await notificationMessage.delete();
  } catch (error) {
    console.error("Error occurred while sending or deleting messages:", error);
    // Handle the error as needed
  }

    await ticketChannel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    const customId = interaction.customId;

    if (customId === 'owner') {
      const ch2 = interaction.guild.channels.cache.find(ch => ch.name === `👑owner- ${interaction.user.username}`);
      if (ch2) {
        const alreadyOpenEmbed = new MessageEmbed()
          .setColor(config.color)
          .setDescription("**Έχεις ήδη ένα Ticket ανοιχτό.**");
  
        return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
      }

if (ch2) return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
      
      // Handle 'owner' button click
      interaction.message.delete();
      interaction.channel.edit({
        name: `👑owner - ${interaction.user.username}`,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: staffrole,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: managerrole,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
        },
        ],
      })
      const embed = new MessageEmbed()
        .setAuthor(config.name, config.logo)
        .setDescription('**Θα σας εξυπηρετήσει κάποιος αρμόδιος το συντομότερο δυνατό, παρακαλώ αναμένετε.**')
        .setColor(config.color)
        .setThumbnail(config.logo)
      const btn = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('🔒')
            .setCustomId('close-ticket')
        )
      interaction.channel.send({ embeds: [embed], components: [btn] })
      const log_embed = new MessageEmbed()
        .setTitle("🔨Δημιουργία Ticket🔨")
        .setThumbnail(config.logo)
        .setDescription(`ㅤ\n⚬ Άνοιξε από τον/ην : <@${interaction.user.id}>\n\n⚬ Θέμα : \`\`👑Owner\`\`\n\n⚬ Κανάλι : \`\`${interaction.channel.name}\`\``)
        .setColor(config.color)
      client.channels.cache.get(config.ticketlogs).send({ embeds: [log_embed] })
    }
    if (interaction.customId === 'buy') {
      const ch2 = interaction.guild.channels.cache.find(ch => ch.name === `👑owner - ${interaction.user.username}`);
      if (ch2) {
        const alreadyOpenEmbed = new MessageEmbed()
          .setColor(config.color)
          .setDescription("**Έχεις ήδη ένα Ticket ανοιχτό.**");
  
        return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
      }
    
      const ch3 = interaction.guild.channels.cache.find(ch => ch.name === `💸buy - ${interaction.user.username}`);
      if (ch3) {
        const alreadyOpenEmbed = new MessageEmbed()
          .setColor(config.color)
          .setDescription("**Έχεις ήδη ένα Ticket ανοιχτό.**");
  
        return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
      }
    
      const ch4 = interaction.guild.channels.cache.find(ch => ch.name === `❓other - ${interaction.user.username}`);
      if (ch4) {
        const alreadyOpenEmbed = new MessageEmbed()
          .setColor(config.color)
          .setDescription("**Έχεις ήδη ένα Ticket ανοιχτό.**");
  
        return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
      }
    
      interaction.message.delete();
    
      interaction.channel.edit({
        name: `💸buy - ${interaction.user.username}`,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: staffrole,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: managerrole,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
        ],
      });
      const embed = new MessageEmbed()
        .setAuthor(config.name, config.logo)
        .setDescription('**Θα σας εξυπηρετήσει κάποιος αρμόδιος το συντομότερο δυνατό, παρακαλώ αναμένετε.**')
        .setThumbnail(config.logo)
        .setColor(config.color)
      const btn = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('🔒')
            .setCustomId('close-ticket')
        )
      interaction.channel.send({ embeds: [embed], components: [btn] })
      const log_embed = new MessageEmbed()
        .setTitle("🔨Δημιουργία Ticket🔨")
        .setThumbnail(config.logo)
        .setDescription(`ㅤ\n⚬ Άνοιξε από τον/ην : <@${interaction.user.id}>\n\n⚬ Θέμα : \`\`💸Buy\`\`\n\n⚬ Κανάλι : \`\`${interaction.channel.name}\`\``)
        .setColor(config.color)
      client.channels.cache.get(config.ticketlogs).send({ embeds: [log_embed] })
    }
    if (interaction.customId === 'other') {
      const ch2 = interaction.guild.channels.cache.find(ch => ch.name === `👑owner - ${interaction.user.username}`);
      if (ch2) {
        const alreadyOpenEmbed = new MessageEmbed()
          .setColor(config.color)
          .setDescription("**Έχεις ήδη ένα Ticket ανοιχτό.**");
  
        return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
      }
    
      const ch3 = interaction.guild.channels.cache.find(ch => ch.name === `💸buy - ${interaction.user.username}`);
      if (ch3) {
        const alreadyOpenEmbed = new MessageEmbed()
          .setColor(config.color)
          .setDescription("**Έχεις ήδη ένα Ticket ανοιχτό.**");
  
        return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
      }
    
      const ch4 = interaction.guild.channels.cache.find(ch => ch.name === `❓other - ${interaction.user.username}`);
      if (ch4) {
        const alreadyOpenEmbed = new MessageEmbed()
          .setColor(config.color)
          .setDescription("**Έχεις ήδη ένα Ticket ανοιχτό.**");
  
        return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
      }
    
      interaction.message.delete();
    
      interaction.channel.edit({
        name: `❓other - ${interaction.user.username}`,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: staffrole,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: managerrole,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
        ],
      });
      const embed = new MessageEmbed()
        .setAuthor(config.name, config.logo)
        .setDescription('**Θα σας εξυπηρετήσει κάποιος αρμόδιος το συντομότερο δυνατό, παρακαλώ αναμένετε.**  ')
        .setThumbnail(config.logo)
        .setColor(config.color)
      const btn = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('🔒')
            .setCustomId('close-ticket')
        )
      interaction.channel.send({ embeds: [embed], components: [btn] })
      const log_embed = new MessageEmbed()
        .setTitle("🔨Δημιουργία Ticket🔨")
        .setThumbnail(config.logo)
        .setDescription(`ㅤ\n⚬ Άνοιξε από τον/ην : <@${interaction.user.id}>\n\n⚬ Θέμα : \`\`❓Other\`\`\n\n⚬ Κανάλι : \`\`${interaction.channel.name}\`\``)
        .setColor(config.color)
      client.channels.cache.get(config.ticketlogs).send({ embeds: [log_embed] })
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === 'close-ticket') {
      const embedResponse = new MessageEmbed()
        .setColor(config.color)
        .setAuthor(config.name, config.logo)
        .setDescription('**Το ticket θα κλείσει σε 5 δευτερόλεπτα.**');
      interaction.reply({ embeds: [embedResponse] });
  
      // Capture the channel ID before the setTimeout
      const channelId = interaction.channel.id;
  
      setTimeout(() => {
        // Fetch the channel using the ID
        const channel = interaction.guild.channels.cache.get(channelId);
  
        if (channel) {
          channel.delete();
  
          const log_embed = new MessageEmbed()
            .setTitle("🔨Κλείσιμο Ticket🔨")
            .setThumbnail(config.logo)
            .setDescription(`ㅤ\n⚬ Έκλεισε από τον/ην : <@${interaction.user.id}>\n\n⚬ Κανάλι : \`\`${channel.name}\`\``)
            .setColor(config.color);
  
          client.channels.cache.get(config.ticketlogs).send({ embeds: [log_embed] });
        }
      }, 5000);
    }
  }
  
    }
)




//Welcome
client.on('guildMemberAdd', (member) => {
  const user = member.user
  const channelID = member.guild.channels.cache.get(config.welcome)
  const server = member.guild.name
  const memberEmbed = new MessageEmbed()
  .setAuthor(member.user.username, member.user.displayAvatarURL({ size: 1024, dynamic: true }))
  .setDescription(`${user} Καλώς ήρθες στο **${server}\n\nTotal Members: \`\`${client.guilds.cache.get(config.id).members.cache.filter(member => !member.user.bot).size}\`\`**`)
  .setImage('https://cdn.discordapp.com/attachments/1190804617001447434/1198667164933169333/north_banner.png?ex=65bfbcca&is=65ad47ca&hm=ae2f2ff50008d71115298e4d55fe72fae4a4b13e4403d09e74abfb6905312814&')
  .setColor(config.color)
  .setFooter(`https://discord.gg/palukasshop`)
      channelID.send({embeds: [memberEmbed] }).catch(()=>{})
      const button = new MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("hdfh23")
      .setDisabled(true)
      const row = new MessageActionRow()
        .addComponents(button)
      user.send({ content: `Thanks for joining don't forget to invite your friends. Have a great time here in **${server}**`,components: [row]}).catch(()=>{})
  })




  client.on("message", async message => {
    if (message.author.bot) return;
     if(message.channel.id === config.vouche){
      const newEmbed = new MessageEmbed()
        .setAuthor(config.name,config.logo)
        .setDescription(`> __**${message.content}**__`)
        .setFooter(message.member.user.username, message.member.user.displayAvatarURL({ size: 512, dynamic: true }))
        .setColor(config.color)
        .setTimestamp();
  
      message.delete();
  
      message.channel.send({ embeds: [newEmbed] }).then((msg) => {
        msg.react("<a:loveyou:1055898378925518900>");
      });
    }
  });



/// Application System & Response ///
client.on('messageCreate', message => {
  if (!message.guild) return;
  if (message.content.toLowerCase() === '!apps') {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.delete();
    } else {
      message.delete();
      const embed = new MessageEmbed()
        .setAuthor(config.name, config.logo)
        .setDescription(`**Για να εντάχθείτε στο __Staff™__ πατήστε το <a:discord_staff:1199005840510828595> \n\n Για να εντάχθείτε στο __Management™__ πατήστε το <:manager3:1199005887747072060>**`)
        .setThumbnail(config.logo)
        .setColor(config.color);
      const ticketopen = new MessageButton()
        .setStyle('SECONDARY')
        .setEmoji('<a:discord_staff:1199005840510828595>')
        .setCustomId('apptmodal');
        const application = new MessageButton()
        .setStyle('SECONDARY')
        .setEmoji('<:manager3:1199005887747072060>')
        .setCustomId('appymodal');
      const row = new MessageActionRow()
        .addComponents(ticketopen, application);
      message.channel.send({ embeds: [embed], components: [row] });
    }
  }
});

/// Staff ///
client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'apptmodal') {
      const modal = new Modal()
        .setCustomId('app_modal')
        .setTitle(`Application | ${interaction.user.username}`)
        .addComponents([
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('appmodal_input_1')
              .setLabel(config.staffe1)
              .setStyle('PARAGRAPH')
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Γράψε την απάντηση σου εδώ')
              .setRequired(true),
          ),
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('appmodal_input_2')
              .setLabel(config.staffe2)
              .setStyle('PARAGRAPH')
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Γράψε την απάντηση σου εδώ')
              .setRequired(true),
          ),
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('appmodal_input_3')
              .setLabel(config.staffe3)
              .setStyle('PARAGRAPH')
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Γράψε την απάντηση σου εδώ')
              .setRequired(true),
          ),
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('appmodal_input_4')
              .setLabel(config.staffe4)
              .setStyle('PARAGRAPH')
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Γράψε την απάντηση σου εδώ')
              .setRequired(true),
          ),
        ]);

      await interaction.showModal(modal);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'app_modal') {
      const response1 = interaction.fields.getTextInputValue('appmodal_input_1');
      const response2 = interaction.fields.getTextInputValue('appmodal_input_2');
      const response3 = interaction.fields.getTextInputValue('appmodal_input_3');
      const response4 = interaction.fields.getTextInputValue('appmodal_input_4');
      const embed2 = new MessageEmbed()
        .setAuthor(config.name, config.logo)
        .setColor(config.color)
        .setDescription("**Το Application σου στάλθηκε.**");
      interaction.reply({ embeds: [embed2], ephemeral: true });

      const embed = new MessageEmbed()
        .addFields(
          { name: `Staff Application From:`, value: `**${interaction.user} | ${interaction.user.username} | \`\`${interaction.user.id}\`\`**`, inline: true },
          { name: `${config.staffe1}`, value: `\`${response1}\``, inline: false },
          { name: `${config.staffe2}`, value: `\`${response2}\``, inline: false },
          { name: `${config.staffe3}`, value: `\`${response3}\``, inline: false },
          { name: `${config.staffe4}`, value: `\`${response4}\``, inline: false },
        )
        .setColor(config.color)
        .setTimestamp()
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ size: 1024, dynamic: true }));

      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId(`application_yes_${interaction.user.id}`)
            .setLabel('Yes')
            .setStyle('SUCCESS'),
        );

      client.channels.cache.get(config.staffappmodal_logs).send({ embeds: [embed], components: [row] });
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId.includes('application_yes')) {
      const yesButton = new MessageButton()
        .setStyle('SUCCESS')
        .setLabel(`Accepted by ${interaction.user.username}`)
        .setDisabled(true)
        .setCustomId('application_yes');

      const row = new MessageActionRow().addComponents(yesButton);

      await interaction.update({ components: [row] });

      const channelId = '1199000783417524424';
      const channel = interaction.client.channels.cache.get(channelId);

      if (channel) {
        const user = await interaction.guild.members.fetch(interaction.user.id);

        const applicantTag = await interaction.guild.members.fetch(interaction.customId.split('_')[2]);
        channel.send(` > ${applicantTag}, **η αίτησή σου για __Staff__ έγινε δεκτή. Παρακαλώ, επικοινώνησε με έναν υπεύθυνο.**`);
      }
    }
  }
});

/// Manager ///
client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'appymodal') {
      const modal = new Modal()
        .setCustomId('apptt_modal')
        .setTitle(`Application | ${interaction.user.username}`)
        .addComponents([
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('appmodal_input_1')
              .setLabel(config.managere1)
              .setStyle('PARAGRAPH')
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Γράψε την απάντηση σου εδώ')
              .setRequired(true),
          ),
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('appmodal_input_2')
              .setLabel(config.managere2)
              .setStyle('PARAGRAPH')
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Γράψε την απάντηση σου εδώ')
              .setRequired(true),
          ),
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('appmodal_input_3')
              .setLabel(config.managere3)
              .setStyle('PARAGRAPH')
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Γράψε την απάντηση σου εδώ')
              .setRequired(true),
          ),
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('appmodal_input_4')
              .setLabel(config.managere4)
              .setStyle('PARAGRAPH')
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Γράψε την απάντηση σου εδώ')
              .setRequired(true),
          ),
        ]);

      await interaction.showModal(modal);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'apptt_modal') {
      const response1 = interaction.fields.getTextInputValue('appmodal_input_1');
      const response2 = interaction.fields.getTextInputValue('appmodal_input_2');
      const response3 = interaction.fields.getTextInputValue('appmodal_input_3');
      const response4 = interaction.fields.getTextInputValue('appmodal_input_4');
      const embed2 = new MessageEmbed()
        .setAuthor(config.name, config.logo)
        .setColor(config.color)
        .setDescription("**Το Application σου στάλθηκε.**");
      interaction.reply({ embeds: [embed2], ephemeral: true });

      const embed = new MessageEmbed()
        .addFields(
          { name: `Manager Application From:`, value: `**${interaction.user} | ${interaction.user.username} | \`\`${interaction.user.id}\`\`**`, inline: true },
          { name: `${config.managere1}`, value: `\`${response1}\``, inline: false },
          { name: `${config.managere2}`, value: `\`${response2}\``, inline: false },
          { name: `${config.managere3}`, value: `\`${response3}\``, inline: false },
          { name: `${config.managere4}`, value: `\`${response4}\``, inline: false },
        )
        .setColor(config.color)
        .setTimestamp()
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ size: 1024, dynamic: true }));

      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId(`yes_application_${interaction.user.id}`)
            .setLabel('Yes')
            .setStyle('SUCCESS'),
        );

      client.channels.cache.get(config.staffappmodal_logs).send({ embeds: [embed], components: [row] });
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId.includes('yes_application')) {
      const yesButton = new MessageButton()
        .setStyle('SUCCESS')
        .setLabel(`Accepted by ${interaction.user.username}`)
        .setDisabled(true)
        .setCustomId('yes_application');

      const row = new MessageActionRow().addComponents(yesButton);

      await interaction.update({ components: [row] });

      const channelId = '1195767182882263070';
      const channel = interaction.client.channels.cache.get(channelId);

      if (channel) {
        const user = await interaction.guild.members.fetch(interaction.user.id);

        const applicantTag = await interaction.guild.members.fetch(interaction.customId.split('_')[2]);
        channel.send(` > ${applicantTag}, **η αίτησή σου για __Manager__ έγινε δεκτή. Παρακαλώ, επικοινώνησε με έναν υπεύθυνο.**`);
      }
    }
  }
});

///Join-Left Logs
client.on('guildMemberAdd', (member) => {
    const user = member.user
    const channelID = member.guild.channels.cache.get(config.joinlogs)
    const guild = member.guild.id 
    const memberEmbed = new MessageEmbed()
    .setAuthor( member.user.username, member.user.displayAvatarURL(), "https://discord.com/users/" + member.user.id)
    .setDescription(` \`\` Join \`\` \n**Account Create**: \`${moment(member.user.createdAt).format("MMM Do YYYY").toLocaleString()}\`\n**Mention:** <@!${member.user.id}>`)
      .setColor('#2F3136')
        const role = member.guild.roles.cache.get(config.autorole)//auto role
        member.roles.add(role).catch(() => { })
        channelID.send({embeds: [memberEmbed] })
    })
    client.on('guildMemberRemove', (member) => {
    const monitorID = member.guild.channels.cache.get(config.leavelogs)//left logs
    const guild = member.guild.id 
    const memberEmbed = new MessageEmbed()
      .setColor('#2F3136')
      .setDescription(` \`\` Leave \`\` \n**Account Create**: \`${moment(member.user.createdAt).format("MMM Do YYYY").toLocaleString()}\`\n**Mention:** <@!${member.user.id}>`)
      .setAuthor( member.user.username, member.user.displayAvatarURL(), "https://discord.com/users/" + member.user.id)
      .setImage('')
        monitorID.send({embeds: [memberEmbed] })
    })
  ////// Message Edit Logs \\\\\\
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    try{
  if(newMessage.author.bot) return
  let channel = oldMessage.guild.channels.cache.get(config.msglogs)
  const url = oldMessage.url
  const embed = new MessageEmbed()
  .setTitle(`Edited Message Logs`)
  .setColor('#2F3136')
  .setTimestamp()
  .setURL(url)
  .addField(`Παλιο μυνημα`, `*${oldMessage.content}*`, false)
  .addField(`Τελικο μυνημα`, `*${newMessage.content}*`, false)
  .addField(`Το μυνημα ειναι του`, `**<@${oldMessage.author.id}>**`, true)
  .addField(`Καναλι που ηταν το μυνημα`, `**<#${oldMessage.channel.id}>**`, true)
  channel.send({embeds: [embed] }).catch(()=>{})
    }catch{
        
    }
  })
  var temporary = [];
  
  ////// Message Delete \\\\\\
  client.on('messageDelete', async message => {
      if (!message.guild) return;
      const fetchedLogs = await message.guild.fetchAuditLogs({
          limit: 1,
          type: 'MESSAGE_DELETE',
      });
      const deletionLog = fetchedLogs.entries.first();
      const embed = new MessageEmbed({
        "author": {
          "name": message.author.tag,
          "url": "https://discord.com/users/" + message.author.id ,
          "icon_url": message.author.displayAvatarURL()
        },
        "color": 15483204,
        "description": "​\n" + message.content + "\n\n**Mention: <@" + message.author.id + ">\nΚανάλι: <#" + message.channel.id + ">**"
      })
      if (!deletionLog) return     client.channels.cache.get(config.msglogs).send({embeds: [embed] })
  
      const { executor, target } = deletionLog;
      const embed2 = new MessageEmbed({
        "author": {
          "name": message.author.tag,
          "url": "https://discord.com/users/" + message.author.id,
          "icon_url": message.author.displayAvatarURL()
        },
        "color": 15483204,
        "description": "​\n" + message.content + "\n\n**Mention: <@" + message.author.id + ">\nΚανάλι: <#" + message.channel.id + ">**\n**Από τον/ην: <@" + executor.id + ">**"
      })
      const embed3 = new MessageEmbed({
        "author": {
          "name": message.author.tag,
          "url": "https://discord.com/users/" + message.author.id ,
          "icon_url": message.author.displayAvatarURL()
        },
        "color": 15483204,
        "description": "​\n" + message.content + "\n\n**Mention: <@" + message.author.id + ">\nΚανάλι: <#" + message.channel.id + ">**"
      })
    try{
      if (target.id == message.author.id) {
      client.channels.cache.get(config.msglogs).send({embeds: [embed2] }).catch(()=>{})
      } else {
      client.channels.cache.get(config.msglogs).send({embeds: [embed3] }).catch(()=>{})
      }
  }catch{
    
  }
  });

//voice logs
var temporary = [];
client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.channelId;
  let oldUserChannel = oldMember.channelId;


try{
    if(newUserChannel){
    const voicelogs = newMember.guild.channels.cache.get(config.voicelogs)
    const voicee = new MessageEmbed({
      "author": {
        "name": newMember.member.user.tag,
        "url": "https://discord.com/users/" + newMember.member.user.id,
        "icon_url": newMember.member.user.displayAvatarURL()
      },
      "color": 4371328,
      "description": "**Κανάλι: <#" + newUserChannel + "> • " + newMember.channel.name + "\nMention: <@" + newMember.member.user.id + ">**"
    })
    voicelogs.send({ embeds: [voicee] })
    }

    else{
      if(oldUserChannel){
        const voicelogs = oldMember.guild.channels.cache.get(config.voicelogs)
        const voice = new MessageEmbed({
          "author": {
            "name": newMember.member.user.tag,
            "url": "https://discord.com/users/" + newMember.member.user.id,
            "icon_url": newMember.member.user.displayAvatarURL()
          },
          "color": 15681608,
          "description": "**Κανάλι: <#" + oldUserChannel + "> • `" + oldMember.channel.name + "`\nMention: <@" + oldMember.member.user.id + ">**"
        })
        voicelogs.send({ embeds: [voice] })
      }
  }
}catch{
  e => console.log(e.message)
}
})





  ////// Role Create-Delete Logs \\\\\\
  client.on("roleCreate", async (role) => {
    const fetchedLogs = await role.guild.fetchAuditLogs({
          limit: 1,
          type: 'ROLE_CREATE',
      });
  
    const fasdfa = fetchedLogs.entries.first();
      let { executor, target, reason } = fasdfa;
    if(executor === null) executor = "\u200B";
    if(target === null) target = "\u200B";
    if(reason === null) reason = "\u200B";
  
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(executor.username, executor.displayAvatarURL(), `https://discord.com/users/${executor.id}`)
        .setDescription("A new role was created!")
        .addFields(
          {name: "User", value: executor.username},
          {name: "Role Name", value: target.name},
          {name: "Role ID", value: target.id},
          {name: "reason", value: reason}
        )
        // .setFooter(`Role ID: ${id}`)
        .setTimestamp();
  
        client.channels.cache.get(config.rolelogs).send({embeds: [embed] }).catch(() => { })
        })
  client.on("roleDelete", async (role) => {
  
    const fetchedLogs = await role.guild.fetchAuditLogs({
          limit: 1,
          type: 'ROLE_DELETE',
      });
  
    const fasdfa = await fetchedLogs.entries.first();
      let { executor, target, reason, a } = fasdfa;
    if(executor === null) executor = "\u200B";
    if(target === null || target === undefined) target = "\u200B";
    if(reason === null) reason = "\u200B";
  
      const embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(executor.username, executor.displayAvatarURL(), `https://discord.com/users/${executor.id}`)
        .setDescription("A new role was Deleted!")
        .addFields(
          {name: "User", value: executor.username},
          {name: "Role Name", value: role.name},
          {name: "Role ID", value: role.id},
          {name: "reason", value: reason}
        )
        // .setFooter(`Role ID: ${id}`)
        .setTimestamp();
  
        client.channels.cache.get(config.rolelogs).send({embeds: [embed] })
  
  });
//role update
client.on('guildMemberUpdate', async function(oldMember, newMember) {
    const log = await newMember.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_ROLE_UPDATE' }).then(logs => logs.entries.first());
    let addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    let removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
  
    if (removedRoles.size > 0) {
      const removeRoleEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor(`${oldMember.user.tag}`, oldMember.user.avatarURL())
        .setDescription(`Ο/Η <@!${oldMember.id}> έχασε τον ρόλο <@&${removedRoles.map(r => r.id)}> από τον/την <@!${log.executor.id}>`)
        .setTimestamp()
        .setFooter(`ID : ${oldMember.id}`)
      client.channels.cache.get(config.rolelogs).send({embeds: [removeRoleEmbed] })
    }
  
    if (addedRoles.size > 0) {
      const addRoleEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(`${oldMember.user.tag}`, oldMember.user.avatarURL())
        .setDescription(`Ο/Η <@!${oldMember.id}> πήρε τον ρόλο <@&${addedRoles.map(r => r.id)}> από τον/την <@!${log.executor.id}>`)
        .setTimestamp()
        .setFooter(`ID : ${oldMember.id}`)
      client.channels.cache.get(config.rolelogs).send({embeds: [addRoleEmbed] })
    }
  });
//channel create
client.on("channelCreate", async function(channel) {
    const logs = await channel.guild.fetchAuditLogs({ limit: 1, type: 'CHANNEL_CREATE' });
    const log = logs.entries.first();
    if (!log) return;
    const embed = new MessageEmbed()
      .setTitle("Channel Created")
      .setColor("GREEN")
      .setDescription(`Από τον/την : <@!${log.executor.id}>\nΚανάλι : <#${channel.id}>\nΕίδος : ${channel.type}\nΌνομα : ` + channel.name)
      .setTimestamp()
      .setFooter("ID :" + channel)
    client.channels.cache.get(config.channellogs).send({embeds: [embed] })
  });
  //channel delete
  client.on("channelDelete", async function(channel) {
    const logs = await channel.guild.fetchAuditLogs({ limit: 1, type: 'CHANNEL_DELETE' });
    const log = logs.entries.first();
    if (!log) return;
    const embed = new MessageEmbed()
      .setTitle("Channel Deleted")
      .setColor("RED")
      .setDescription(`Από τον/την : <@!${log.executor.id}>\nΚανάλι : <#${channel.id}>\nΕίδος : ${channel.type}\nΌνομα : ` + channel.name)
      .setTimestamp()
      .setFooter("ID :" + channel)
    client.channels.cache.get(config.channellogs).send({embeds: [embed] })
  });
//kick 
client.on('guildMemberRemove', async member => {
    const logs = await member.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_KICK' });
    const log = logs.entries.first();
    const { reason } = log;
    
    if (!log) return;
    const embed = new MessageEmbed()
      .setColor("RED")
      .setDescription(`${member.user} **kicked**\n\nΑπό τον/την : ${log.executor}\nΛόγος : ${reason}`)
    if (Date.now() - log.createdTimestamp < 5000) {
      client.channels.cache.get(config.kicklogs).send({embeds: [embed] })
    
    }})
//ban logs
client.on('guildBanAdd', async ban => {
  const logs = await ban.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_BAN_ADD' });
  const log = logs.entries.first();
  const { reason } = log;
  if (!log) return;
  const embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(`${ban.user} **banned**\n\nΑπό τον/την : ${log.executor}\nΛόγος : ${reason}`)
  if (Date.now() - log.createdTimestamp < 5000) {
    client.channels.cache.get(config.banlogs).send({embeds: [embed] })
  }})
//unban logs
client.on('guildBanRemove', async member => {
      const logs = await member.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_BAN_REMOVE' });
      const log = logs.entries.first();
      const { reason } = log;
      if (!log) return;
      const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${member.user} **unbanned**\n\nΑπό τον/την : ${log.executor}`)
      if (Date.now() - log.createdTimestamp < 5000) {
        client.channels.cache.get(config.banlogs).send({embeds: [embed] })
      
      
  }})



//paid promotion
    client.on('messageCreate', message => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


        if(command === 'promo'){
            if (!message.member.permissions.has("ADMINISTRATOR")) {
          message.delete()
        }  
        else {
          message.delete()
const content = args.join(' ');
        const embed = new MessageEmbed()
          .setAuthor( config.name, config.logo)
          .setDescription(`${content}`)
    .setThumbnail( config.logo)
    .setColor( config.color);
        const appbutton = new MessageButton()
          .setStyle('SECONDARY')
	    .setEmoji("💸")
          .setCustomId('promo_open');
        const row = new MessageActionRow()
          .addComponents(appbutton)
    
        message.channel.send({embeds: [embed], components: [row]})
      }
    }
    })
////////////////////////////////////////////////////////////////
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
      if (interaction.customId === 'promo_open') {
        
        if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
          return interaction.reply({content: `**Έχετε ήδη ένα Promo υπό επεξεργασία.**`,ephemeral: true})
}     
        interaction.guild.channels.create(`promo-${interaction.user.username}`, {
          parent: interaction.channel.parent,
          topic: interaction.user.id,
          permissionOverwrites: [{
              id: interaction.user.id,
              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
              id:  config.promo_role,
              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
              id: interaction.guild.roles.everyone,
              deny: ['VIEW_CHANNEL'],
            },
          ],
          type: 'text',
        }).then(async c => {
          interaction.reply({content: `**✅ | ${c}**`, ephemeral: true}).catch(() => { })
          const embed = new MessageEmbed()
          .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
          .setColor( config.color)
          .setDescription("```Ποιο πακέτο θέλετε;```")
          .setFooter(`Για να κλείσετε το Promo πατήστε "🔒Close"`)
          const send2 = new MessageButton()
          .setStyle("SECONDARY")
          .setLabel("\🔒Close")
          .setCustomId("promo_close")
          const send = new MessageActionRow()
          .addComponents(send2)
          msg = await c.send({embeds: [embed],components: [send]})
          })
          
      }
    })
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
      if (interaction.customId === 'promo_close') {
       interaction.reply({ ephemeral: true}).catch(() => { })
          interaction.channel.delete().catch(() => { })
       }})







//Server Stats
client.on("ready", function(){
  if(config.MEMBERS){
      const member = client.guilds.cache.get(config.id).channels.cache.get(config.MEMBERS)
      if(member){
          setInterval(() => {
              member.setName(`🕺Members: ${client.guilds.cache.get(config.id).members.cache.filter(member => !member.user.bot).size}`).catch(() => { })  
          }, 5 * 60 * 1000);
      }
  }
  if(config.BOOSTS){
      const boost = client.guilds.cache.get(config.id).channels.cache.get(config.BOOSTS)
      if(boost){
          setInterval(() => {
              boost.setName(`🚀Boosts: ${client.guilds.cache.get(config.id).premiumSubscriptionCount}`).catch(() => { })  
          }, 5 * 60 * 1000);
      } 
  }

})



//lock & unlock command
client.on("messageCreate", async message =>{
if(!message.guild) return;
  
    if (message.content === '!lock'){
      if (message.member.permissions.has("ADMINISTRATOR")){
      message.channel.send({content: "Channel Locked"})
      message.channel.permissionOverwrites.set([
        {
          id: message.guild.id,
          deny: ['SEND_MESSAGES']
        },
    ])
  
  }}})  
  client.on("messageCreate", async message =>{
if(!message.guild) return;
  

      if (message.content === '!unlock'){
        if (message.member.permissions.has("ADMINISTRATOR")){
      message.channel.send({content: "Channel unlocked"})
      message.channel.permissionOverwrites.set([
        {
          id: message.guild.id,
          allow: ['SEND_MESSAGES']
        },
    ])
    }}})
///!say2 command
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'say2'){
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
              const content = args.join(' ');
              const embed = new MessageEmbed()
                .setColor(config.color)
                .setThumbnail(config.logo)
                .setAuthor(config.name,config.logo)
                .setDescription(content);
                message.channel.send({embeds: [embed]});
              message.delete({timeout: 1500}).catch(err => console.log(err));
      }
  })
//!say command
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'say'){
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
              const content = args.join(' ');
              message.channel.send({content: `${content}`});
              message.delete({timeout: 1500}).catch(err => console.log(err));
      }
  })


/// purge/ clear///
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
      if(message.content.startsWith('!purge') || message.content.startsWith('!clear')){
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("**You do not have permissions.**")
              const content = args.join(' ');
              if(!content) return message.channel.send("How many messages do you want to delete ?")
              message.channel.bulkDelete(content).catch(e => {message.channel.send('You can not delete so old messages.')})

      }
  })



//Ban Command
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'ban'){
    const target = message.mentions.users.first();
    if(!message.member.permissions.has("ADMINISTRATOR"))return message.channel.send({content: "❌"})
    if(target){
        const memberTarget = message.guild.members.cache.get(target.id);
        memberTarget.ban().catch(()=>{})
        const newEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription("**"+target.tag+"** has been banned\n\nModerator : <@"+message.author.id+">\n\nRemaining Bans: Unlimited | ``Administrator with a higher role``")
        .setTimestamp()
        .setFooter('');

        message.channel.send({embeds: [newEmbed]});
    }else{        
    message.delete().catch(err => console.log(err));

  }}
})
//Unban Command
client.on('messageCreate', async (message) => {
  if (!message.guild) return;
  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === '!unban') {
    if (!message.member.permissions.has('ADMINISTRATOR'))return
    if (args.length !== 1) {
      return message.reply('Usage: !unban id');
    }
    const userId = args[0];
    try {
      await message.guild.bans.remove(userId);
      message.reply(`**✅ Unbanned: ${userId}**`);
    } catch (error) {
      console.error(error);
    }
  }
});

//Kick Command
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'kick'){
    const target = message.mentions.users.first();
    if(!message.member.permissions.has("ADMINISTRATOR"))return message.channel.send({content: "❌"})
         if(target){
             const memberTarget = message.guild.members.cache.get(target.id);
             memberTarget.kick().catch(()=>{})
             const newEmbed = new MessageEmbed()
             .setColor('RED')
             .setDescription("**"+target.tag+"** has been kicked\n\nModerator : <@"+message.author.id+">\n\n``Administrator with a higher role``")
             .setTimestamp()
             .setFooter('');
 
             message.channel.send({embeds: [newEmbed]});
         }else{        
         message.delete().catch(err => console.log(err));

  }}
})
//!serverinfo
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'serverinfo'){
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        const member = message.mentions.users.first() || message.member
        let owner = await message.guild.fetchOwner()

              //let member = message.mentions.users.first() || message.member;

              const embed = new MessageEmbed()
                
                .setAuthor(config.name,config.logo)
                .setColor(config.color)
                .addFields(
                  { name: `Ownership`, value: `${owner}`, inline: false},
                  { name: `Total Members`, value: `\`${message.guild.memberCount}\``, inline: false},
                  { name: `Total Boosts`, value: `\`${message.guild.premiumSubscriptionCount}\``, inline: false},
                  { name: `Total Channels`, value: `\`${message.guild.channels.cache.size}\``, inline: false},
                  { name: `Total Roles`, value: `\`${message.guild.roles.cache.size}\``, inline: false},
                  { name: `Total Emojis`, value: `\`${message.guild.emojis.cache.size}\``, inline: false},
                  { name: `Δημιουργήθηκε στις:`, value: `\`${moment(message.guild.createdAt).format("MMM Do YYYY").toLocaleString()}\``, inline: false},
                  { name: `Server ID`, value: `\`${message.guildId}\``, inline: false},
                  { name: `Server Name`, value: `\`${message.guild.name}\``, inline: false},

                )
          message.channel.send({embeds: [embed]})

      }
  })


client.on('messageCreate', message => {
if(!message.guild) return;

  if(message.content === '!pay') {
if(!message.member.permissions.has("ADMINISTRATOR")) return;
const embed = new MessageEmbed()
	.setDescription(`**Email: chiotismono@gmail.com**`)
	.setColor(config.color)
message.channel.send({embeds:[embed]})
  }
})
//Embed Suggestion
client.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.id === config.suggestion){
  const newEmbed = new MessageEmbed()
  .setAuthor(config.name,config.logo)
  .setDescription(`**Από τον/την : **${message.member}\n\n**Suggestion : **\`\`${message.content}\`\``)
  .setColor(config.color)
  .setTimestamp() 
    message.channel.send({embeds: [newEmbed]}).then((msg) =>{
    msg.react("👍");
    msg.react("👎");
    message.delete();
    });
  }
  });

//Restock Ping
const ping_role = config.restock_ping_role
client.on("messageCreate", async message => {
  if (message.content.startsWith("!rp")) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("**Χρειάζεται να έχεις Administrator**")
    const embed = new MessageEmbed()
      .setAuthor(config.name,config.logo)
      .setThumbnail(config.logo)
      .setDescription("**Επέλεξε το restock ping για να ενημερώνεσαι καθημερινά για τα restocks μας.**")
      .setColor(config.color)
    const koumpi = new MessageButton()
      .setEmoji("✅")
      .setStyle("SECONDARY")
      .setCustomId("rping")
  const row = new MessageActionRow()
      .addComponents(koumpi)
    message.channel.send({embeds: [embed],components: [row]})
  }})
  client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
    if (interaction.customId === 'rping') {
      interaction.member.roles.add(ping_role)
      interaction.reply({content: `**The role has been added to you: **<@&${ping_role}>`, ephemeral: true})
  }})

     //Anti Link System\\
client.on("message", async message => {
  if (message.content.includes("https://") || message.content.includes("discord.gg") || message.content.includes("discord.com/invite") || message.content.includes("discord.io") || message.content.includes(".gg") || message.content.includes(".io")) {
    if (message.member.permissions.has("MANAGE_MESSAGES")) return;
    message.delete()
    let cont = "1192468231491961031"
    cont += message.content
    const antilink = client.channels.cache.get(config.antilink)
    const embed = new Discord.MessageEmbed()
      .setTitle("🛑Anti Invite Alert🛑")
      .setColor(config.color)
      .setDescription(`**\nAuthor : <@${message.member.user.id}> \nUser ID : \`${message.member.user.id}\`\nInvite Link : \n\`\`\`${cont}\`\`\`**`)
      .setFooter(config.name, config.logo)

    antilink.send({ embeds: [embed] })
  }
})
                      client.on("message", async message =>{
                        if (message.content.toLowerCase() === '!e') {
                        if (!message.member.permissions.has("ADMINISTRATOR"))return
                            message.channel.send({content: `@everyone`}).then((msg) =>{
                            message.delete();
                            msg.delete()
                            });
                          }
                          });
                          //Giveaway
client.once('ready', () => {db.set(`giveaway`, false)})
client.on('messageCreate', async (message) => {
  let args = message.content.substring(prefix.length).split(" ")
  if ((message.content.startsWith(`!gstart`))) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: "**Χρειάζεται να έχεις Administrator**" })
    const g = db.get(`giveaway`)
    if(g === true)return message.reply(`**Ρε αλάνι κάνε πρώτα restart.**`)
    let duration = args[1];
    let winnerCount = args[2];
    if (!duration)
      return message.channel.send('**Give a valid duration** `d (ημέρες), h (ώρες), m (λεπτά), s (δευτερόλεπτα)`');
    if (
      !args[1].endsWith("d") &&
      !args[1].endsWith("h") &&
      !args[1].endsWith("m") &&
      !args[1].endsWith("s")
    )
      return message.channel.send("'**Give a valid duration** `d (ημέρες), h (ώρες), m (λεπτά), s (δευτερόλεπτα)`");
    if (!winnerCount) return message.channel.send('Please provide the number of winners for the giveaway! E.g. `1w`')
    if (isNaN(args[2].toString().slice(0, -1)) || !args[2].endsWith("w"))
      return message.channel.send('Pleave provide the ammount of winners! example `1w`');
    if ((args[2].toString().slice(0, -1)) <= 0)
      return message.channel.send('The number of winners cannot be less than 1!');
    let giveawayChannel = message.mentions.channels.first();
    if (!giveawayChannel || !args[3] ) return message.channel.send("**Please provide a channel to start the giveaway!**")
    let prize = args.slice(4).join(" ");
    if (!prize) return message.channel.send('**Please provide a prize!**');
    let startGiveawayEmbed = new MessageEmbed()
    .setAuthor(config.name,config.logo)
      .setThumbnail(config.logo)
      .setDescription("```" + `${prize}` + "```\n" + " > ***Κάντε reaction στο 🎉 για να συμμετάσχετε στο giveaway!***\n\n" + `**Το giveaway λήγει σε:** \`${duration}\`\n` + `**Hosted από τον/την:** <@${message.author.id}>\n` + `**Ποσό νικητών:**\`${winnerCount.toString().slice(0, -1)}\``)
      .setColor(config.color)
      .setTimestamp(Date.now() + ms(args[1]))
    giveawayChannel.send({ content: '@everyone',embeds: [startGiveawayEmbed] }).then(m =>{
      db.set(`giveaway`, true)
    m.react("🎉").catch(console.error);
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        const nooneGiveawayEmbed = new MessageEmbed()
        .setAuthor(config.name,config.logo)
        .setThumbnail(config.logo)
        .setDescription("```" + `${prize}` + "```\n" + " > ***Κάντε reaction στο 🎉 για να συμμετάσχετε στο giveaway!***\n\n" + `**Πήραν μέρος:** \`${m.reactions.cache.get("🎉").count - 1}\`\n` + `**Hosted από τον/την:** <@${message.author.id}>\n` + `**Νικητής:** \`\`Κανείς\`\``)
        .setColor(config.color)
      m.edit({embeds: [nooneGiveawayEmbed]})
        return giveawayChannel.send("**Δεν  πήρε κανεις μερος**")
      }
      if (m.reactions.cache.get("🎉").count <= winnerCount.toString().slice(0, -1)) {
        return giveawayChannel.send("There's not enough people in the giveaway to satisfy the number of winners!")
      }
      let winner = m.reactions.cache.get("🎉").users.cache.filter((users) => !users.bot).random(winnerCount.toString().slice(0, -1));
      const endedEmbedGiveaway = new MessageEmbed()
        .setAuthor(config.name,config.logo)
        .setThumbnail(config.logo)
        .setDescription("```" + `${prize}` + "```\n" + " > ***Κάντε reaction στο 🎉 για να συμμετάσχετε στο giveaway!***\n\n" + `**Πήραν μέρος:** \`${m.reactions.cache.get("🎉").count - 1}\`\n` + `**Hosted από τον/την:** <@${message.author.id}>\n` + `**Νικητής:** ${winner}`)
        .setColor(config.color)
        .setTimestamp(Date.now() + ms(args[1]))
        const embed = new MessageEmbed()
        .setTitle("Giveaway Result")
        .setDescription(`**ο/οι νικητής/νικητές του Giveaway είναι: ${winner}**`)
        .setColor(config.color)
        const reroll = new MessageButton()
        .setEmoji("🔁")
        .setStyle("SECONDARY")
        .setLabel("Reroll")
        .setCustomId("reroll")
    const row = new MessageActionRow()
        .addComponents(reroll)
      giveawayChannel.send({embeds: [embed],components: [row]})
      m.edit({ embeds: [endedEmbedGiveaway] });
    }, ms(args[1]));
    //
    client.on('interactionCreate', async interaction => {
      if (!interaction.isButton()) return;
      //reroll button
        if (interaction.customId === 'reroll') {
          let winner = m.reactions.cache.get("🎉").users.cache.filter((users) => !users.bot).random(winnerCount.toString().slice(0, -1));
          const noperms = new MessageEmbed()
          .setAuthor(config.name,config.logo)
          .setColor(config.color)
          .setDescription(`**❌ | Δεν μπορείς να κανείς Reroll.**`)
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({embeds: [noperms], ephemeral: true})
          const embed = new MessageEmbed()
            .setTitle("Giveaway Rerolled")
            .setDescription(`**ο/οι νικητής/νικητές του Giveaway είναι: ${winner}**`)
            .setColor(config.color)
            .setFooter(`Rerolled By : ${interaction.user.tag}`)
            const reroll = new MessageButton()
            .setEmoji("🔁")
            .setStyle("SECONDARY")
            .setLabel("Reroll")
            .setCustomId("reroll")
        const row = new MessageActionRow()
            .addComponents(reroll)
          interaction.reply({embeds: [embed],components: [row]})
          interaction.message.edit({components: []})
          const endedEmbedGiveaway = new MessageEmbed()
          .setAuthor(config.name,config.logo)
          .setThumbnail(config.logo)
          .setDescription("```" + `${prize}` + "```\n" + " > ***Κάντε reaction στο 🎉 για να συμμετάσχετε στο giveaway!***\n\n" + `**Πήραν μέρος:** \`${m.reactions.cache.get("🎉").count - 1}\`\n` + `**Hosted από τον/την:** <@${message.author.id}>\n` + `**Νικητής:** ${winner}`)
          .setColor(config.color)
          .setTimestamp(Date.now() + ms(args[1]))
        
        m.edit({ embeds: [endedEmbedGiveaway] });
        }


      }) })
}})




//Anti Alt System
   client.on('guildMemberAdd', (member, message) => {
      const logs = member.guild.channels.cache.get(config.altlogs)
      if (Date.now() - member.user.createdAt < 1000 * 60 * 60 * 24 * config.alttime) {
    const embed = new MessageEmbed()
      .setAuthor(`${member.user.username}`, member.user.displayAvatarURL({ size: 1024, dynamic: true }))
      .addFields(
        { name: "**User**", value: `${member}`, inline: true },
        { name: "**User Id**", value: `\`\`${member.id}\`\``, inline: true },
        { name: "**Register**", value: `**<t:${Math.round(member.user.createdAt.getTime() / 1000)}:R>**`, inline: true }
      )
      .setTitle("**Anti Alt**")
      .setColor("RED")
      .setTimestamp();

    const kickButton = new MessageButton()
      .setEmoji("🦵")
      .setStyle("DANGER")
      .setLabel("Kick")
      .setCustomId("kick_alt");

    const row = new MessageActionRow().addComponents(kickButton);

    logs.send({ embeds: [embed], components: [row] }).then(msg => {
      db.set(`${msg.id}_${member.id}_alt`, true);
    });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'kick_alt') {
    const isAltAccount = db.get(`${interaction.message.id}_${interaction.user.id}_alt`);

    if (isAltAccount === true) {
      const embed = new MessageEmbed()
        .setAuthor(`${interaction.user.username}`, interaction.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .addFields(
          { name: "**User**", value: `${interaction.user}`, inline: true },
          { name: "**User Id**", value: `\`\`${interaction.user.id}\`\``, inline: true },
          { name: "**Register**", value: `**<t:${Math.round(interaction.user.createdAt.getTime() / 1000)}:R>**`, inline: true },
          { name: "**Kicked By**", value: `${interaction.member}`, inline: true }
        )
        .setTitle("**Anti Alt**")
        .setColor("RED")
        .setTimestamp();

      const koumpi = new MessageButton()
        .setEmoji("🦵")
        .setStyle("DANGER")
        .setLabel("Kicked")
        .setCustomId("kicked_button")
        .setDisabled(true);

      const row = new MessageActionRow().addComponents(koumpi);

      interaction.update({ embeds: [embed], components: [row], ephemeral: true }).catch(() => { });

      interaction.guild.members.fetch(interaction.user.id).then((member) => {
        member.send(`**Έγινες kick από τον ${interaction.guild.name}, επειδή είσαι Alt λογαριασμός.**`).then(() => {
          member.kick(`Alt Account`);
        });
      });
    }
  }
});




//Support/Automove System\\
var temporary = [];
client.on('voiceStateUpdate', (oldMember, newMember) => {
if(newMember.channel == config.support_channel) {
  db.add(`supports_${newMember.member.user.id}`, 1)
      newMember.guild.channels.create(`📞〢${newMember.member.user.username}`, {

        permissionOverwrites: [
          {
              id: newMember.id,
              allow: ["VIEW_CHANNEL"]
          },
          {
              id: newMember.guild.id,
              deny: ["VIEW_CHANNEL"]
          },
          {
              id: config.support_staff,
              allow: ["VIEW_CHANNEL"]
          }
      ],
          type: 'GUILD_VOICE', parent: config.support_parent
          }).catch(()=>{}).then(async channel => {
              temporary.push({ newID: channel.id, guild: channel.guild });
              await newMember.setChannel(channel.id).catch(()=>{})

              const embed = new MessageEmbed()
              .setAuthor( newMember.member.user.username, newMember.member.user.displayAvatarURL())
              .setThumbnail(newMember.member.user.displayAvatarURL())
              .setColor("RED")
              .setDescription("**New "+"📞〢Support"+" Alert**"+"\n\nο/η <@" + newMember.member.user.id + "> συνδέθηκε στο : <#" +config.support_channel+">")
              client.channels.cache.get(config.support_logs).send({embeds: [embed]}).catch(()=>{})
              client.channels.cache.get(config.support_logs).send({content: `<@&${config.support_staff}>`}).then(msg  => {
                msg.delete();
              })

          });
}
if(temporary.length > 0) for (let i = 0; i < temporary.length; i++) {
        let ch = client.channels.cache.get(temporary[i].newID);
        if (ch.members.size === 0) {
            ch.delete().catch(()=>{});
            return temporary.splice(i, 1);
        }
}
});

client.on("messageCreate", async message => {
  if (message.content.startsWith("!roles")) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("**Χρειάζεται να έχεις Administrator**");
    message.delete()

    const embed = new MessageEmbed()
      .setAuthor(config.name, config.logo)
      .setThumbnail(config.logo)
      .setDescription("**Πατήστε το κατάλληλο κουμπί για να πάρετε τον ανάλογο ρόλο.**")
      .setColor(config.color);

    const koumpi = new MessageButton()
      .setEmoji("<:restockicon:1191866725692620870>")
      .setLabel("Restock Ping")
      .setStyle("SECONDARY")
      .setCustomId("rping");

    const koumpi1 = new MessageButton()
      .setEmoji("<:gift:1191867299104305298>")
      .setLabel("Events")
      .setStyle("SECONDARY")
      .setCustomId("event");

      const koumpi2 = new MessageButton()
      .setEmoji("<a:drop:1162707316106330112>")
      .setLabel("Drops")
      .setStyle("SECONDARY")
      .setCustomId("drop");

    const row = new MessageActionRow().addComponents(koumpi, koumpi1, koumpi2);

    message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'rping') {
    interaction.member.roles.add(config.restock_ping_role);
    interaction.reply({ content: `**Σου προσθέστηκε ο ρόλος: **<@&${config.restock_ping_role}>`, ephemeral: true });
  }

  if (interaction.customId === 'event') {
    interaction.member.roles.add(config.event_role);
    interaction.reply({ content: `**Σου προσθέστηκε ο ρόλος: **<@&${config.event_role}>`, ephemeral: true });
  }

  if (interaction.customId === 'drop') {
    interaction.member.roles.add(config.drop_role);
    interaction.reply({ content: `**Σου προσθέστηκε ο ρόλος: **<@&${config.drop_role}>`, ephemeral: true });
  }
});

//Button Roles Embed\\
        client.on("messageCreate", async message => {
          if (message.content.startsWith("!proles")){
          if (!message.member.permissions.has('ADMINISTRATOR'))return;
            const embed = new MessageEmbed()
              .setTitle("Self Roles")
              .setDescription("**Πατώντας παρακάτω μπορείτε να διαλέξετε τα roles σας.**")
              .setColor(config.color)
              .setThumbnail(config.logo)
              .setAuthor(config.name,config.logo)
            const role1 = new MessageButton()
              .setEmoji("1️⃣")
              .setStyle("SECONDARY")
              .setCustomId("role1")
              const role2 = new MessageButton()
              .setEmoji("2️⃣")
              .setStyle("SECONDARY")
              .setCustomId("role2")
              const role3 = new MessageButton()
              .setEmoji("3️⃣")
              .setStyle("SECONDARY")
              .setCustomId("role3")
              const buttons = new MessageActionRow()
                .addComponents(role1)
                .addComponents(role2)
                .addComponents(role3)
                message.channel.send({embeds: [embed], components: [buttons]})
          }
        })
//Button Roles Ids\\
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
    if (interaction.customId === 'role1') {
      const role1e = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`**Role Added <@&${config.role1}>**`)
      const role1e2 = new MessageEmbed()
      .setColor("RED")
      .setDescription(`**Role Removed <@&${config.role1}>**`)
      if(!interaction.member.roles.cache.has(config.role1)){
        interaction.guild.members.cache.get(interaction.user.id).roles.add(config.role1)
        interaction.reply({embeds: [role1e], ephemeral: true})
}else {
         interaction.guild.members.cache.get(interaction.user.id).roles.remove(config.role1)
         interaction.reply({embeds: [role1e2], ephemeral: true})
}

    }
///////////////////////////
if (interaction.customId === 'role2') {
  const role2e = new MessageEmbed()
  .setColor("GREEN")
  .setDescription(`**Role Added <@&${config.role2}>**`)
  const role2e2 = new MessageEmbed()
  .setColor("RED")
  .setDescription(`**Role Removed <@&${config.role2}>**`)
  if(!interaction.member.roles.cache.has(config.role2)){
    interaction.guild.members.cache.get(interaction.user.id).roles.add(config.role2)
    interaction.reply({embeds: [role2e], ephemeral: true})
}else {
     interaction.guild.members.cache.get(interaction.user.id).roles.remove(config.role2)
     interaction.reply({embeds: [role2e2], ephemeral: true})
}

}
////////////////////////////
if (interaction.customId === 'role3') {
  const role3e = new MessageEmbed()
  .setColor("GREEN")
  .setDescription(`**Role Added <@&${config.role3}>**`)
  const role3e2 = new MessageEmbed()
  .setColor("RED")
  .setDescription(`**Role Removed <@&${config.role3}>**`)
  if(!interaction.member.roles.cache.has(config.role3)){
    interaction.guild.members.cache.get(interaction.user.id).roles.add(config.role3)
    interaction.reply({embeds: [role3e], ephemeral: true})
}else {
     interaction.guild.members.cache.get(interaction.user.id).roles.remove(config.role3)
     interaction.reply({embeds: [role3e2], ephemeral: true})
}

}
/////////////////////////////
  })

/// Add Emoji ///
client.on('messageCreate', async message => {
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'addemoji') {
    if (message.author.bot) return;
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("**You do not have permissions.**")
    if (!args.length) return message.channel.send('?')


    for (const emojis of args) {
      const getEmoji = Discord.Util.parseEmoji(emojis);

      if (getEmoji.id) {
        const emojiExt = getEmoji.animated ? ".gif" : ".png";
        const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiExt}`;
        message.guild.emojis
          .create(emojiURL, getEmoji.name)
          .then(emoji =>
            message.channel.send({ content: `${emoji}` }))

      }
    }
  }
})
const guildInvites = new Map();
//Leaderboard\\ 
client.on("message", async message => {
  if (message.content.startsWith("!leaderboard") || message.content.startsWith("!lb")) {
    const usersPerPage = 10;
    const data = await db.get(`invites_${message.guild.id}`) || {};
    const guilds = Object.keys(data)

      .map(_data => {
        return {
          Id: _data,
          Regular: (data[_data].regular || 0),
          Fake: (data[_data].fake || 0),
          Total: (data[_data].total || 0),
          Leave: (data[_data].leave || 0)
        };
      })

      .sort((x, y) => y.Regular - x.Regular);

    if (guilds.length === 0) {
      return message.channel.send("**Το Leaderboard είναι άδειο.**");
    }

    const generateEmbed = (start, pageNumber) => {
      const startIndex = start + (pageNumber - 1) * usersPerPage;
      const current = guilds.slice(startIndex, startIndex + usersPerPage);
      const embed = new MessageEmbed()
        .setColor(config.color)
        //.setAuthor({name: message.channel.guild.name, iconURL: message.channel.guild.iconURL({ dynamic: true })})
        .setDescription(
          current
            .map((g, index) => {
              const i = startIndex + index + 1;
              return `\`${i}.\` <@!${g.Id}> ${config.lbemoji} \`${(g.Regular || 0)} Invites\`\n`;
            })
            .join("")
        )

      return { embeds: [embed] };
    };

    const msg = await message.channel.send(generateEmbed(0, 1));

  }
});


client.on('inviteCreate', async invite => {
  const invites = await invite.guild.invites.fetch();
  const codeUses = new Map();
  invites.each(inv => codeUses.set(inv.code, inv.uses, inv.inviter));

  guildInvites.set(invite.guild.id, codeUses);
})

client.once('ready', () => {
  client.guilds.cache.forEach(guild => {
    guild.invites.fetch()
      .then(invites => {

        const codeUses = new Map();
        invites.each(inv => codeUses.set(inv.code, inv.uses, inv.inviter));

        guildInvites.set(guild.id, codeUses);
      })
      .catch(err => {
        console.log("OnReady Error:", err)
      })
  })
})

client.on('guildMemberAdd', async member => {
  const cachedInvites = guildInvites.get(member.guild.id)
  const newInvites = await member.guild.invites.fetch();
  try {
    const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code) < inv.uses);
  
    const inviter = client.users.cache.get(usedInvite.inviter.id);
    const embed0 = new MessageEmbed()
      .setTitle("Invite Logs")
      .setColor(config.color)
      .setDescription(`Ο/Η ${member} (${member.user.username}) μπήκε στον server από την πρόσκληση (${usedInvite.code || "δεν υπάρχει πλέον"}) του ${inviter} (${inviter.username}) **αλλά είναι Fake**`)
    var fake22 = (Date.now() - member.user.createdAt < 1000*60*60*24*10) //return client.channels.cache.get(config.invites).send({embeds: [embed0] }),db.add(`total_${inviter.id}`, 1),db.add(`fake_${inviter.id}`, 1)
    const embed = new MessageEmbed()
      .setTitle("Invite Logs")
      .setColor(config.color)
      .setDescription(`Ο/Η ${member} (${member.user.username}) μπήκε στον server από την πρόσκληση (${usedInvite.code || "δεν υπάρχει πλέον"}) του ${inviter} (${inviter.username})`)
    client.channels.cache.get(config.invites).send({ embeds: [embed] })
    if (inviter) {
      db.set(`invites_${member.guild.id}.${member.id}.inviter`, inviter.id);
      if (fake22) {
        _fake = db.add(`invites_${member.guild.id}.${inviter.id}.fake`, 1);
        db.set(`${member.id}.inv`, `${inviter.id}`)
      }
      else {
        total = db.add(`invites_${member.guild.id}.${inviter.id}.total`, 1);
        regular = db.add(`invites_${member.guild.id}.${inviter.id}.regular`, 1);
        db.set(`${member.id}.inv`, `${inviter.id}`)
      }
    }
    //console.log(`The code ${usedInvite.code} was just used by ${member.user.username}. ${inviter.username}`)
  } catch (err) {

  }

  newInvites.each(inv => cachedInvites.set(inv.code, inv.uses));
  guildInvites.set(member.guild.id, cachedInvites);
});
client.on("guildMemberRemove", async (member) => {
  if (!member.guild.me.permissions.has("ADMINISTRATOR")) return;

  const inviter = db.get(`${member.id}.inv`)


  var total = 0, regular = 0, fakecount = 0, data = db.get(`invites_${member.guild.id}.${member.id}`);
  if (!data) {
    const embed = new MessageEmbed()
      .setAuthor(member.user.username, member.user.displayAvatarURL(), "https://discord.com/users/" + member.user.id)
      .setDescription(`Ο/Η ${member} (${member.user.username}) βγήκε από τον server. Είχε μπει από τον <@${inviter}>`)
      .setColor(config.color)
    member.guild.channels.cache.get(config.invites).send({embeds: [embed]});
    db.delete(`${member.id}.inv`)
    return;
  }

  if (data.isfake && data.inviter) {
    fakecount = db.subtract(`invites_${member.guild.id}.${data.inviter}.fake`, 1);
    total = db.subtract(`invites_${member.guild.id}.${data.inviter}.total`, 1);
  }
  else if (data.inviter) {
    regular = db.subtract(`invites_${member.guild.id}.${data.inviter}.regular`, 1);
    total = db.subtract(`invites_${member.guild.id}.${data.inviter}.total`, 1);
  }
  if (data.inviter) bonus = db.get(`invites_${member.guild.id}.${data.inviter}.bonus`) || 0;


  db.add(`invites_${member.guild.id}.${data.inviter}.leave`, 1);


  const channel = member.guild.channels.cache.get(config.invites)
  if (channel) {
    const embed = new MessageEmbed()
      .setTitle("Invite Logs")
      .setColor(config.color)
      .setDescription(`Ο/Η ${member} (${member.user.username}) βγήκε από τον server. Είχε μπει από τον <@${inviter}>`)
    channel.send({embeds: [embed]});
    db.delete(`${member.id}.inv`)
  }
})
  client.on("messageCreate", async message =>{

  if (message.content.startsWith("!invites") || message.content.startsWith("!inv")) {
    var victim = message.mentions.users.first() || message.author;
    //
    var data = db.get(`invites_${message.guild.id}.${victim.id}`) || { total: 0, fake: 0, inviter: null, regular: 0, leave: 0 };
    //const left = db.get(`invites_${message.guild.id}.${victim.id}.leave`)
    var embed0 = new MessageEmbed()
      .setAuthor(victim.username, victim.displayAvatarURL())
      //.setDescription(`**Total : \`${(data.total || 0)}\` | Regular : \`${(data.regular || 0)}\` | Fake : \`${(data.fake || 0)}\` | Left : \`${(data.leave || 0)}\`**`)
      .setDescription(`**Βρέθηκαν \`${(data.regular || 0)}\` invites για τον/ην <@${victim.id}> (**${data.total || 0}** συνολικά, **${data.leave || 0}** έχουν αποχωρήσει, **${data.fake || 0}** ψεύτικα)**`)
      .setColor(config.color)
    //
    if (!victim) return message.channel.send({ embeds: [embed0] });

    var data2 = db.get(`invites_${message.guild.id}.${victim.id}`) || { total: 0, fake: 0, inviter: null, regular: 0, leave: 0 };
    //const left = db.get(`invites_${message.guild.id}.${victim.id}.leave`)
    var embed = new MessageEmbed()
      .setAuthor(victim.username, victim.displayAvatarURL(), "https://discord.com/users/" + victim.id)
      //.setDescription(`**Total : \`${(data.total || 0)}\` | Regular : \`${(data.regular || 0)}\` | Fake : \`${(data.fake || 0)}\` | Left : \`${(data.leave || 0)}\`**`)
      .setColor(config.color)
      .setThumbnail(config.logo)
      .setDescription(`**Βρέθηκαν \`${(data.regular || 0)}\` invites για τον/ην <@${victim.id}> (**${data.total || 0}** συνολικά, **${data.leave || 0}** έχουν αποχωρήσει, **${data.fake || 0}** ψεύτικα)**`)
    message.channel.send({ embeds: [embed] });
  }

})


///Feedback System  
client.on("messageCreate", async message => {
  if (message.content.startsWith("!feedback")) {
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("**You do not have permissions.**")
    const embed = new MessageEmbed()
      .setColor(config.color)
      //.setAuthor(config.name,config.logo)
      .setTitle(`**Για να κάνετε feedback πατήστε το** 🌴`)
    .setThumbnail(`https://cdn.discordapp.com/icons/1111291524722999366/a_d063d44e1e202c32587ce184af3227fb.gif`)
    const button = new MessageButton()
      .setEmoji("🌴")
      .setStyle("SECONDARY")
      .setCustomId("feedback")
    const row = new MessageActionRow()
      .addComponents(button)
    message.delete()
    message.channel.send({ embeds: [embed], components: [row] })
  }
})
client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'feedback') {
      const modal = new Modal()
        .setCustomId('feedback_modal')
        .setTitle(`${config.name} | Feedback`)
        .addComponents([
          new MessageActionRow().addComponents(
            new TextInputComponent()
              .setCustomId('feedback_input')
              .setLabel('Your Feedback')
              .setStyle('PARAGRAPH')
              .setMinLength(5)
              .setMaxLength(45)
              .setPlaceholder('Ανέφερε το feedback σου εδώ')
              .setRequired(true),
          ),


        ]);

      await interaction.showModal(modal);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'feedback_modal') {
      const embed2 = new MessageEmbed()
        .setAuthor(config.name, config.logo)
        .setColor(config.color)
        .setDescription("**Το Feedback σου στάλθηκε**")
      interaction.reply({ embeds: [embed2], ephemeral: true })
      const response = interaction.fields.getTextInputValue('feedback_input')
      const embed = new MessageEmbed()
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
        .setDescription(`**Feedback :** ${response}`)
        .setColor(config.color)
        .setTimestamp()
  .setThumbnail(`https://cdn.discordapp.com/icons/1111291524722999366/a_d063d44e1e202c32587ce184af3227fb.gif`)
      client.channels.cache.get(config.feedback_channel).send({ embeds: [embed] })

    }
  }
});




//// AUTO REACT///
const channelIdToAutoReact = 'YOUR_CHANNEL_ID'; // Replace with the desired channel's ID
const emojiToReact = ':palm_tree:'; // Replace with the desired emoji

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.channel.id === channelIdToAutoReact) {
    // Check if the message is in the specified channel
    message.react(emojiToReact)
      .then(() => console.log(`Auto-reacted to a message in #${message.channel.name}`))
      .catch(console.error);
  }
});


//Role all command
client.on("messageCreate", async message => {
  if (message.content.startsWith("!roleall_add")){
  if (!message.member.permissions.has('ADMINISTRATOR'))return message.reply("**You do not have permissions.**")
  let role = message.mentions.roles.first() 
  message.react("🌐")
  if (!role) return message.channel.send(`**${message.member} Ποιο role ?**`)
  message.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(role))

  

  }
})



const CHANNEL_ID = '1195120705990312069';
const CUSTOMER_ROLE_ID = '1195120633898606633';

client.on('messageCreate', (message) => {
  if (message.channel.id === CHANNEL_ID) {
    // Ελέγξτε αν το μέλος έχει ήδη τον ρόλο "CUSTOMER"
    if (!message.member.roles.cache.has(CUSTOMER_ROLE_ID)) {
      // Προσθέστε τον ρόλο "CUSTOMER" στο μέλος
      message.member.roles.add(CUSTOMER_ROLE_ID)
        .then(() => {
          console.log(`Προστέθηκε επιτυχώς ο ρόλος "CUSTOMER" στο μέλος ${message.author.tag}.`);
        })
        .catch((error) => {
          console.error('Σφάλμα κατά την προσθήκη του ρόλου:', error);
        });
    } else {
      console.log(`Το μέλος ${message.author.tag} έχει ήδη τον ρόλο "CUSTOMER".`);
    }
  }
});










/// Partner System ///
client.on('messageCreate', message => {
    if(!message.guild) return;
      if (message.content.toLowerCase() === '!partner') {
            if (!message.member.permissions.has("ADMINISTRATOR")) {
          message.delete()
        }  
        else {
          message.delete()
        const embed = new MessageEmbed()
          .setAuthor(config.name,config.logo)
          .setDescription("```Για να κάνεις μια άιτηση για partnership πάτησε το παρακάτω Βutton, εκεί συμπλήρωσε την φόρμα```")
    .setThumbnail(config.logo)
    .setColor(config.color);
        const ticketopen12 = new MessageButton()
          .setStyle('SECONDARY')
          .setEmoji('<a:Partner_shine:1183448308467896330>')
          .setCustomId('partner');
        const row = new MessageActionRow()
          .addComponents(ticketopen12)
    
        message.channel.send({embeds: [embed], components: [row]})
      }
    }
    })
    ///////////
    client.on('interactionCreate', async (interaction) => {
      if (interaction.isButton()) {
        if (interaction.customId === 'partner') {
          const get = db.get(`applimit2_${interaction.user.id}`)
          const embed = new MessageEmbed()
            .setTitle("Partner Limit")
            .setDescription("**Έχεις ήδη ένα Partnership υπό επεξεργασία.**")
            .setColor('RED')
            if(get === true)return interaction.reply({embeds: [embed], ephemeral: true})
          const modal = new Modal()
            .setCustomId('app_modal11')
            .setTitle(`Partnership | ${interaction.user.username}`)
            .addComponents([
              new MessageActionRow().addComponents(
                  new TextInputComponent()
                    .setCustomId('appmodal_input_11')
                    .setLabel(config.e11)
                    .setStyle('PARAGRAPH')
                    .setMinLength(1)
                    .setMaxLength(200)
                    .setPlaceholder('Server Link')
                    .setRequired(true),
                ),
    
            ]);
    
          await interaction.showModal(modal);
        }
      }
    
      if (interaction.isModalSubmit()) {
      if (interaction.customId === 'app_modal11') {
        const response11 = interaction.fields.getTextInputValue('appmodal_input_11');
        const embed2 = new MessageEmbed()
          .setAuthor(config.name, config.logo)
          .setColor(config.color)
          .setThumbnail(config.logo)
          .setDescription("**Το  Partner σου στάλθηκε.**");
        interaction.reply({ embeds: [embed2], ephemeral: true });
    
        // Send a direct message to the user
        const applicationMessage = new MessageEmbed()
          .setTitle("Το Partner σου στάλθηκε")
          .setColor(config.color)
          .setDescription("Ευχαριστούμε. Θα επικοινωνήσουμε   μαζί σας σύντομα.");
        interaction.user.send({ embeds: [applicationMessage] });
    
      
    
    
    
              const embed = new MessageEmbed()
              
              .addFields(
                { name: `Partner From:`, value: `**${interaction.member} | ${interaction.user.username} | \`\`${interaction.user.id}\`\`**`, inline: true},
                { name: `${config.e11}`, value: `\`${response11}\``, inline: false},
              )
              .setColor(config.color)
              .setTimestamp()
              .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ size: 1024, dynamic: true }))
              const accept = new MessageButton()
              .setStyle('SECONDARY')
              .setEmoji('1012361166384812032')
              .setCustomId('accept_modal12');
              const decline = new MessageButton()
              .setStyle('SECONDARY')
              .setEmoji('1012361285226209341')
              .setCustomId('decline_modal12');
              const row = new MessageActionRow()
                .addComponents(accept)
                .addComponents(decline)
                client.channels.cache.get('1186750357704015982').send({embeds: [embed], components: [row]}).then(msg  => {
                  db.set(`${msg.id}_app`,`${interaction.member.id}`)
                 })
    
    
            db.set(`applimit2_${interaction.user.id}`, true)
              }}
            })
    client.on('interactionCreate', async (interaction) => {
      if (interaction.isButton()) {
        if (interaction.customId === 'accept_modal12') {
          const atomo = db.fetch(`${interaction.message.id}_app`);
          interaction.reply({ ephemeral: true }).catch(() => {});
          db.set(`applimit2_${atomo}`, false);
    
          const accept = new MessageButton()
            .setStyle('SUCCESS')
            .setEmoji('1012361166384812032')
            .setDisabled(true)
            .setCustomId('accept_modal22');
    
          const decline = new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('1012361285226209341')
            .setDisabled(true)
            .setCustomId('decline_modal22');
    
          const row = new MessageActionRow()
            .addComponents(accept, decline);
    
          interaction.message.edit({
            components: [row],
            content: `**Application Accepted From: ${interaction.member}**`
          });
    
          const user = await interaction.guild.members.fetch(atomo);
          const notifyButton = new MessageButton()
            .setStyle('PRIMARY')
            .setLabel('🔔 Notify us')
            .setCustomId('notify_button12');
          const notify = new MessageButton()
            .setStyle('PRIMARY')
            .setLabel('📱 Mobile copy')
            .setCustomId('copy');
    
          user.send({
            content: 'Tο partner σας έγινε δεκτό , θα παρακαλούσαμε να στείλετε στο server σας το παρακάτω μήνημα εντός 24 ωρών:\n - https://discord.gg/bf8a7PP658\n\n```Μόλις στείλετε το invite link μας στο server σας πατήστε το κουμπί "notify us" !!```',
            components: [new MessageActionRow().addComponents(notifyButton,notify)],
          });
        }
    
        if (interaction.customId === 'decline_modal12') {
          const atomo = db.fetch(`${interaction.message.id}_app`);
          interaction.reply({ ephemeral: true }).catch(() => {});
          db.set(`applimit2_${atomo}`, false);
    
          const accept = new MessageButton()
            .setStyle('SECONDARY')
            .setEmoji('1012361166384812032')
            .setDisabled(true)
            .setCustomId('accept_modal223');
    
          const decline = new MessageButton()
            .setStyle('DANGER')
            .setEmoji('1012361285226209341')
            .setDisabled(true)
            .setCustomId('decline_modal223');
    
          const row = new MessageActionRow()
            .addComponents(accept, decline);
    
          interaction.message.edit({
            components: [row],
            content: `**Partner Declined From: ${interaction.member}**`
          });
    
          const user = await interaction.guild.members.fetch(atomo);
          const notifyButton = new MessageButton()
            .setStyle('PRIMARY')
            .setLabel('X')
            .setCustomId('');
    
          user.send({
            content: `**Your Partner has been declined.**`,
            components: [new MessageActionRow().addComponents(notifyButton)],
          });
        }
          
       if (interaction.customId === 'notify_button12') {
        // Delete the button immediately
        interaction.message.components = [];
        interaction.message.edit({ components: [] }).catch(console.error);
    
        const channel = await client.channels.fetch('1186750357704015982');
    
        // Check if the channel exists and is a text channel
        if (channel && channel.isText()) {
          // Mention the user in the DM sent to the notify channel
          const userMention = interaction.user.toString();
    
          // Send a message to the channel
          channel.send(`**${userMention} sent the link in the channel**`);
        }
      }
      }
    });




/////// bot Button Maded By Paluka /////////
 client.on('messageCreate', message => {
  if (message.content.toLowerCase() === '!bot') {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.delete();
    } else {
      message.delete();
    const embed = new MessageEmbed()
      .setAuthor(config.name, config.logo)
      .setTitle('Features')
      .setDescription(' Server Stats \n Advanced Ticket System \n Advanced On/Off Duty System \n Auto Role \n Suggestions Channel με Auto React \n yt-mp3 (With Logs) \n Anti Alt System (With Logs) \n Many Moderation Commands (!clear, !lock e.t.c) \n Advanced Application System (With Modal) \n Advanced Invite System with Leaderboard \n AntiLink System (With Logs) \n Giveaway System (buttons ή react) \n Say Embed  \n Server Info \n Verify System (With Logs) \n Startup Bot Commands (With logs) \n Custom Command !pay send your paypal and ltc addr3s \n Welcome System \n R3stock System with modal \n !addemoji steal emoji from servers \n Get Promote System (With Logs) \n Custom Command !e = everyone tag custom command by me \n Arewelegit System \n Restock Ping System \n Language System \n Feedback System + Autoreact  \n Partnership System with logs \n Design Button System \n Bot Button System \n \n \n Logs \n Voice Logs \n Boosts Logs \n AntiAlt Logs \n Channel Logs \n Message Logs \n Role Logs \n Ytmp3 Logs \n Verify Logs \n Startup Bot Logs \n Join/Leave Logs \n Ticket Logs \n Invites Logs \n Antilink Logs \n Kick/Ban Logs \n \n Shop Bot:  15€ PayPal / 15€ PaySafe \n \n \n  \n 24/7 Online \n @everyone @here')
      .setColor(config.color);

    const createBannerButton = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel('💻Buy')
      .setCustomId('create_bot');

    const row = new MessageActionRow().addComponents(createBannerButton);

    message.channel.send({ embeds: [embed], components: [row] });
}
  }
});
client.on('interactionCreate', async interaction => {
  if (interaction.isButton() && interaction.customId === 'create_bot') {

    const categoryId = '1196152118709604442'; 


    const category = interaction.guild.channels.cache.get(categoryId);

    if (!category || category.type !== 'GUILD_CATEGORY') {
      return interaction.reply({
        content: 'Η κατηγορία δεν βρέθηκε ή δεν είναι έγκυρη.',
        ephemeral: true,
      });
    }


    const createdChannel = await interaction.guild.channels.create(`💻Bot-${interaction.user.username}`, {
      parent: category.id,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: interaction.user.id,
          allow: ['VIEW_CHANNEL'],
        },
      ],
      type: 'GUILD_TEXT',
    }).then((createdChannel) => {
      interaction.reply({
        content: `**Το κανάλι δημιουργήθηκε.**`,
        ephemeral: true,
      });


      const closeButton = new MessageButton()
        .setStyle('DANGER')
        .setLabel('🔒')
        .setCustomId('close_bot_channel');

      const row = new MessageActionRow().addComponents(closeButton);

      createdChannel.send({
        embeds: [
          new MessageEmbed()
            .setTitle(config.name)
            .setDescription('Παρακαλώ περιμένετε το staff team θα σας εξυπηρετήσει \n σύντομα!! Αν θέλετε να κλείσετε το ticket αντιδράστε με 🔒')
            .setColor(config.color)
        ],
        components: [row],
      });
    });
  } else if (interaction.isButton() && interaction.customId === 'close_bot_channel') {
    const currentChannel = interaction.channel;

    const closeEmbed = new MessageEmbed()
      .setTitle('Κλείσιμο Καναλιού')
      .setDescription('Το κανάλι θα κλείσει σε 5 δευτερόλεπτα.')
      .setColor(config.color);

    interaction.reply({
      embeds: [closeEmbed],
      ephemeral: true,
    }).then(() => {
      setTimeout(() => {
        interaction.deleteReply();
        currentChannel.delete();
      }, 5000);
    });
  }
});




/// ypervoliko taging //// by palukas
const userTagCounts = new Map();
const TAG_THRESHOLD = 2;  
const TAG_INTERVAL = 3 * 60 * 60 * 1000;  
const KICK_REASON = 'Υπερβολικό tagging';

client.on('messageCreate', async (message) => {
  const { content, author, guild, member } = message;

  if (content.includes('@everyone')) {
    if (!userTagCounts.has(author.id)) {
      userTagCounts.set(author.id, { count: 1, timestamp: Date.now() });
    } else {
      const { count, timestamp } = userTagCounts.get(author.id);

      if (count + 1 >= TAG_THRESHOLD && !author.bot && member && !member.permissions.has('ADMINISTRATOR')) {
        const member = guild.members.cache.get(author.id);
        if (member) {
          try {
            await member.kick(KICK_REASON);
            await message.channel.send(`Ο χρήστης ${author.username} αποβλήθηκε για υπερβολικό tagging.`);
          } catch (error) {
            console.error('Σφάλμα κατά την εφαρμογή του kick:', error);
          }
        }
        userTagCounts.delete(author.id);
        return;
      } else {
        userTagCounts.set(author.id, { count: count + 1, timestamp });
      }
    }
  }
});




/////// p2p Button Maded By Paluka /////////
 client.on('messageCreate', message => {
  if (message.content.toLowerCase() === '!p2p') {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.delete();
    } else {
      message.delete();
    const embed = new MessageEmbed()
      .setAuthor(config.name, config.logo)
      .setImage('https://media.discordapp.net/attachments/1190806341187534909/1195136464346959892/SPOILER_P2P.png?ex=65b2e491&is=65a06f91&hm=524ef2a5c6ce5f6964936e845688ce5e17601ea2e192924cd22797a7e76df9f9&=&format=webp&quality=lossless&width=376&height=669')
      .setColor(config.color);

    const createp2pButton = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel('P2P')
      .setEmoji('<a:moneydiamond:1189709172061777981>')
      .setCustomId('create_p2p');


    const infoButton = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel('TOS')
      .setEmoji('<:infos:1190088411151859713>')
      .setCustomId('info_channel');

    const row = new MessageActionRow().addComponents(createp2pButton, infoButton);

    message.channel.send({ embeds: [embed], components: [row] });
}
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.isButton() && interaction.customId === 'create_p2p') {
    const categoryId = '1195120660960268358'; 

  } else if (interaction.isButton() && interaction.customId === 'info_channel') {
    const embed = new MessageEmbed()
      .setTitle('Tos')
      .setDescription('1. Δεχομασται Μονο Ελληνικες Paysafe.')
      .setColor(config.color);

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });

    const row = new MessageActionRow().addComponents(createp2pButton);

    message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.isButton() && interaction.customId === 'create_p2p') {

    const categoryId = '1195120660960268358'; 


    const category = interaction.guild.channels.cache.get(categoryId);

    if (!category || category.type !== 'GUILD_CATEGORY') {
      return interaction.reply({
        content: 'Η κατηγορία δεν βρέθηκε ή δεν είναι έγκυρη.',
        ephemeral: true,
      });
    }


    const createdChannel = await interaction.guild.channels.create(`💸p2p-${interaction.user.username}`, {
      parent: category.id,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: interaction.user.id,
          allow: ['VIEW_CHANNEL'],
        },
      ],
      type: 'GUILD_TEXT',
    }).then((createdChannel) => {
      interaction.reply({
        content: `**Το κανάλι δημιουργήθηκε.**`,
        ephemeral: true,
      });


      const closeButton = new MessageButton()
        .setStyle('DANGER')
        .setLabel('🔒')
        .setCustomId('close_p2p_channel');

      const row = new MessageActionRow().addComponents(closeButton);

      createdChannel.send({
        embeds: [
          new MessageEmbed()
            .setTitle('Palukas Shop!')
            .setDescription('Παρακαλώ περιμένετε το staff team θα σας εξυπηρετήσει \n σύντομα!! Αν θέλετε να κλείσετε το ticket αντιδράστε με 🔒')
            .setColor(config.color)
        ],
        components: [row],
      });
    });
  } else if (interaction.isButton() && interaction.customId === 'close_p2p_channel') {
    const currentChannel = interaction.channel;

    const closeEmbed = new MessageEmbed()
      .setTitle('Κλείσιμο Καναλιού')
      .setDescription('Το κανάλι θα κλείσει σε 5 δευτερόλεπτα.')
      .setColor(config.color);

    interaction.reply({
      embeds: [closeEmbed],
      ephemeral: true,
    }).then(() => {
      setTimeout(() => {
        interaction.deleteReply();
        currentChannel.delete();
      }, 5000);
    });
  }
});


/////// p2c Button Maded By Paluka /////////
 client.on('messageCreate', message => {
  if (message.content.toLowerCase() === '!p2c') {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.delete();
    } else {
      message.delete();
    const embed = new MessageEmbed()
      .setAuthor(config.name, config.logo)
      .setImage('https://media.discordapp.net/attachments/1190806341187534909/1195780095646896138/linosp2c.png?ex=65b53bff&is=65a2c6ff&hm=97c637e8992c68be1756851de617bc3bf5332b9ee04849bd5a52fb36f8c4d737&=&format=webp&quality=lossless&width=377&height=671')
      .setColor(config.color);

    const createp2cButton = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel('P2C')
      .setEmoji('<a:green_Money:1195442116919316521>')
      .setCustomId('create_p2c');


    const infoButton = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel('TOS')
      .setEmoji('<:info:1195782995261530232>')
      .setCustomId('info_channel');

    const row = new MessageActionRow().addComponents(createp2cButton, infoButton);

    message.channel.send({ embeds: [embed], components: [row] });
}
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.isButton() && interaction.customId === 'create_p2c') {
    const categoryId = '1195120660960268358'; 

  } else if (interaction.isButton() && interaction.customId === 'info_channel') {
    const embed = new MessageEmbed()
      .setTitle('Tos')
      .setDescription('1. Μονο Friends & Family αλλιως ακυρωνεται η συναλλαγη.')
      .setColor(config.color);

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });

    const row = new MessageActionRow().addComponents(createp2cButton);

    message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.isButton() && interaction.customId === 'create_p2c') {

    const categoryId = '1196152118709604442'; 


    const category = interaction.guild.channels.cache.get(categoryId);

    if (!category || category.type !== 'GUILD_CATEGORY') {
      return interaction.reply({
        content: 'Η κατηγορία δεν βρέθηκε ή δεν είναι έγκυρη.',
        ephemeral: true,
      });
    }


    const createdChannel = await interaction.guild.channels.create(`💸p2c-${interaction.user.username}`, {
      parent: category.id,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: interaction.user.id,
          allow: ['VIEW_CHANNEL'],
        },
      ],
      type: 'GUILD_TEXT',
    }).then((createdChannel) => {
      interaction.reply({
        content: `**Το κανάλι δημιουργήθηκε.**`,
        ephemeral: true,
      });


      const closeButton = new MessageButton()
        .setStyle('DANGER')
        .setLabel('🔒')
        .setCustomId('close_p2c_channel');

      const row = new MessageActionRow().addComponents(closeButton);

      createdChannel.send({
        embeds: [
          new MessageEmbed()
            .setTitle('Visual Project!')
            .setDescription('Παρακαλώ περιμένετε το staff team θα σας εξυπηρετήσει \n σύντομα!! Αν θέλετε να κλείσετε το ticket αντιδράστε με 🔒')
            .setColor(config.color)
        ],
        components: [row],
      });
    });
  } else if (interaction.isButton() && interaction.customId === 'close_p2c_channel') {
    const currentChannel = interaction.channel;

    const closeEmbed = new MessageEmbed()
      .setTitle('Κλείσιμο Καναλιού')
      .setDescription('Το κανάλι θα κλείσει σε 5 δευτερόλεπτα.')
      .setColor(config.color);

    interaction.reply({
      embeds: [closeEmbed],
      ephemeral: true,
    }).then(() => {
      setTimeout(() => {
        interaction.deleteReply();
        currentChannel.delete();
      }, 5000);
    });
  }
});


/////// design Button Maded By Paluka /////////
client.on('messageCreate', message => {
  if (message.content.toLowerCase() === '!design') {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.delete();
    } else {
      message.delete();
    const embed = new MessageEmbed()
      .setAuthor(config.name, config.logo)
      .setImage('https://media.discordapp.net/attachments/1190804617001447434/1191799681429278800/palukas_price_list.png?ex=65a6c0f2&is=65944bf2&hm=eb54b4d2d40de765fdb949c016a0255cd989b600ad1526337d6f1df7bd58d1eb&=&format=webp&quality=lossless&width=417&height=671')
      .setColor(config.color);

    const createBannerButton = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel('Buy')
      .setEmoji('<:designer_palette:1189707917071495178>')
      .setCustomId('create_design');


    const infoButton = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel('Infos')
      .setEmoji('<:infos:1190088411151859713>')
      .setCustomId('info_channel');

    const row = new MessageActionRow().addComponents(createBannerButton, infoButton);

    message.channel.send({ embeds: [embed], components: [row] });
}
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.isButton() && interaction.customId === 'create_banner') {
    const categoryId = '1196152118709604442'; 

  } else if (interaction.isButton() && interaction.customId === 'info_channel') {
    const embed = new MessageEmbed()
      .setTitle('Terms Of Services')
      .setDescription('1. Αφού παραλάβετε το design, έχετε μία μέρα για να ζητήσετε οποιαδήποτε αλλαγή εάν χρειάζεστε προσαρμογές.\n2. Να σημειώσετε ότι δεν προσφέρουμε επιστροφές χρημάτων μετά την ολοκλήρωση της παραγγελίας.\n3. Το design που ζητήσατε θα σας παραδοθεί εντός ενός εώς τριών ημερών από την ημερομηνία της παραγγελίας σας.\n4. Για λόγους ασφάλειας, η πληρωμή ολοκληρώνεται πριν την παράδοση του τελικού προϊόντος. Μόλις επιβεβαιωθεί η πληρωμή, θα λάβετε το επιθυμητό αποτέλεσμα.\n5. Αν υπάρχουν περαιτέρω απορίες ή ερωτήσεις, παρακαλούμε μη διστάσετε να επικοινωνήσετε.')
      .setColor(config.color);

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });

    const row = new MessageActionRow().addComponents(createBannerButton);

    message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.isButton() && interaction.customId === 'create_design') {

    const categoryId = '1196152118709604442'; 


    const category = interaction.guild.channels.cache.get(categoryId);

    if (!category || category.type !== 'GUILD_CATEGORY') {
      return interaction.reply({
        content: 'Η κατηγορία δεν βρέθηκε ή δεν είναι έγκυρη.',
        ephemeral: true,
      });
    }


    const createdChannel = await interaction.guild.channels.create(`🎨design-${interaction.user.username}`, {
      parent: category.id,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: interaction.user.id,
          allow: ['VIEW_CHANNEL'],
        },
      ],
      type: 'GUILD_TEXT',
    }).then((createdChannel) => {
      interaction.reply({
        content: `**Το κανάλι δημιουργήθηκε.**`,
        ephemeral: true,
      });


      const closeButton = new MessageButton()
        .setStyle('DANGER')
        .setLabel('🔒')
        .setCustomId('close_design_channel');

      const row = new MessageActionRow().addComponents(closeButton);

      createdChannel.send({
        embeds: [
          new MessageEmbed()
            .setTitle('Diamond Shop!')
            .setDescription('Παρακαλώ περιμένετε το staff team θα σας εξυπηρετήσει \n σύντομα!! Αν θέλετε να κλείσετε το ticket αντιδράστε με 🔒')
            .setColor(config.color)
        ],
        components: [row],
      });
    });
 } else if (interaction.isButton() && interaction.customId === 'close_design_channel') {
    const currentChannel = interaction.channel;

    const closeEmbed = new MessageEmbed()
      .setTitle('Κλείσιμο Καναλιού')
      .setDescription('Το κανάλι θα κλείσει σε 5 δευτερόλεπτα.')
      .setColor(config.color);

    interaction.reply({
      embeds: [closeEmbed],
      ephemeral: true,
    }).then(() => {
      setTimeout(() => {
        interaction.deleteReply();
        currentChannel.delete();
      }, 5000);
    });
  }
});





// Are We Legit ///
client.on('messageCreate', async message => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "legit-setups") {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.delete();
    } else {
        message.delete();
    }

    const embed = {
      color: config.color,
      author: {
        name: config.name,
        icon_url: config.logo,
      },
      thumbnail: {
        url: config.logo,
      },
      description: '**Are We Legit ? \n\n > <a:arrow:1194728424812580894> Yes = <a:yes:1201924333149102090> \n\n > <a:arrow:1194728424812580894>   No <a:no:1201924334814236803>**',
    };
    const messageWithReactions = await message.channel.send({ embeds: [embed] });
    await messageWithReactions.react(config.legityes);
    await messageWithReactions.react(config.legitno);

    const filter = (reaction, user) => [config.legityes, config.legitno].includes(reaction.emoji.name) && !user.bot;
    const collector = messageWithReactions.createReactionCollector({ filter, time: 30000 });
  }
    });




    /// Feedback System ///
const cooldowns = new Map();

client.on('messageCreate', message => {
  if (message.content.toLowerCase() === '!feedback-setups') {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.delete();
    } else {
      message.delete();
      const embed = new MessageEmbed()
        .setAuthor(config.name, config.logo)
        .setDescription('**Για να κάνετε Feedback για Design πατήστε το <:Designsvelo1:1196436456021954701>** \n **Για να κάνετε Feedback για Bot πατήστε το <:bot:1196436458169450526>** \n **Για να κάνετε Feedback για Exchange πατήστε το <:Exchange:1196447076091953162>**')
        .setThumbnail(config.logo)
        .setColor(config.color);
      const button = new MessageButton()
        .setCustomId('designs')
        .setEmoji("1196436456021954701")
        .setStyle("SECONDARY");
        const btn = new MessageButton()
        .setCustomId('bots')
        .setEmoji("1196436458169450526")
        .setStyle("SECONDARY");
        const bts = new MessageButton()
        .setCustomId('p2ps')
        .setEmoji("1196447076091953162")
        .setStyle("SECONDARY");
      const btns = new MessageActionRow()
        .addComponents(button, btn, bts);

      message.channel.send({ embeds: [embed], components: [btns] }).catch(() => { });
    }
  }
});



client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {

    const channelToSendId = '1196434804959367199';

    if (interaction.customId === 'designs' || interaction.customId === 'bots' || interaction.customId === 'p2ps') {
      const embed2 = new MessageEmbed()
        .setAuthor(config.name, config.logo)
        .setColor(config.color)
        .setDescription("**Το Feedback σου στάλθηκε**")
      interaction.reply({ embeds: [embed2], ephemeral: true })
      const channelToSend = await interaction.client.channels.fetch(channelToSendId);

      let feedbackType = '';
      if (interaction.customId === 'designs') {
        feedbackType = 'Design';
      } else if (interaction.customId === 'bots') {
        feedbackType = 'Bot';
      } else if (interaction.customId === 'p2ps') {
        feedbackType = 'Exchange';
      }

      const embed = new MessageEmbed()
        .setDescription(`> **Ο χρήστης ${interaction.user.toString()} έκανε Feedback για ${feedbackType}!**`)
        .setColor(config.color);

      const member = await interaction.guild.members.fetch(interaction.user.id);
      const roleToAdd = await interaction.guild.roles.fetch(config.customer);
      member.roles.add(roleToAdd);

      channelToSend.send({ embeds: [embed] });
    }
  }
});









/// Art System ///
client.on('messageCreate', async message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "art-setups") {
      if (!message.member.permissions.has("ADMINISTRATOR")) {
          message.delete();
      } else {
          message.delete();
      }

      const embed = new MessageEmbed()
          .setAuthor(config.name, config.logo)
          .setColor(config.color)
          .setDescription('**Για να δεις τα Prices μου πάτα το <:infos:1190088411151859713> \n Για να δεις το Behance μου πάτα το <:Behance:1201924338257764362>**')
          .setThumbnail(config.logo);

      const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setCustomId('art')
            .setEmoji('<:infos:1190088411151859713>')
            .setLabel('Prices')
            .setStyle('SECONDARY'),
              new MessageButton()
                  .setDisabled(false)
                  .setEmoji('<:Behance:1201924338257764362>')
                  .setLabel('Behance')
                  .setStyle('LINK')
                  .setURL('https://www.behance.net/Palukas')
          );

      await message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'art') {
    const embed = new MessageEmbed()
        .setImage('')
        .setColor(config.color);

    interaction.reply({ embeds: [embed], ephemeral: true });
}
});



/// Exchange System ///
client.on('messageCreate', async message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "exchange-setups") {
      if (!message.member.permissions.has("ADMINISTRATOR")) {
          message.delete();
      } else {
          message.delete();
      }

      const embed = new MessageEmbed()
          .setAuthor(config.name, config.logo)
          .setColor(config.color)
          .setDescription('**Για να δεις τα Prices μου για το P2P πάτα το <:P2P:1196536725984509983> \n Για να δεις τα Prices μου για το P2C πάτα το <:P2C:1196536728777916437>**')
          .setThumbnail(config.logo);

      const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setCustomId('p2per')
            .setEmoji('<:P2P:1196536725984509983>')
            .setLabel('P2P')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('p2cer')
            .setEmoji('<:P2C:1196536728777916437>')
            .setLabel('P2C')
            .setStyle('SECONDARY'),
          );

      await message.channel.send({ embeds: [embed], components: [row] });
  }
});


client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'p2per') {
    const embed = new MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/1190806341187534909/1195136464346959892/SPOILER_P2P.png?ex=65b2e491&is=65a06f91&hm=524ef2a5c6ce5f6964936e845688ce5e17601ea2e192924cd22797a7e76df9f9&format=webp&quality=lossless&width=376&height=669&')
        .setColor(config.color);

    interaction.reply({ embeds: [embed], ephemeral: true });
}
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'p2cer') {
    const embed = new MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/1190806341187534909/1195780095646896138/linosp2c.png?ex=65b53bff&is=65a2c6ff&hm=97c637e8992c68be1756851de617bc3bf5332b9ee04849bd5a52fb36f8c4d737&format=webp&quality=lossless&width=377&height=671&')
        .setColor(config.color);

    interaction.reply({ embeds: [embed], ephemeral: true });
}
});
