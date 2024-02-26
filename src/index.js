require('dotenv').config();
const mongoose = require('mongoose');
const { Client, IntentsBitField } = require('discord.js');

const eventHandler = require('./handlers/eventHandler');


const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.MessageContent,
  ],
});

//Function expression
(async() => {
  try {
    //false: faz aceitar valores indefinidos e true: não.
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');
    
    eventHandler(client);
    
    client.login(process.env.TOKEN);

    
  
  } catch (error) {
    console.log(`Error: ${error}`);  
  }
})();
