const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Create bot
function createBot() {
  const bot = mineflayer.createBot({
    host: 'Nerddddsmp.aternos.me',
    port: 25565, // your custom server port
    username: 'Alex_' + Math.floor(Math.random() * 10000)
  });

  bot.on('spawn', () => {
    console.log('Bot spawned!');
    setInterval(() => {
      bot.setControlState('forward', true);
      bot.setControlState('jump', true);
      bot.setControlState('sneak', true);
      setTimeout(() => {
        bot.setControlState('forward', false);
        bot.setControlState('jump', false);
        bot.setControlState('sneak', false);
      }, 3000);
    }, 10000);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log('Bot error:', err));
}

createBot();

// Express server for UptimeRobot
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);
});

