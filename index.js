const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Nerddddsmp.aternos.me',
    username: 'Steve_' + Math.floor(Math.random() * 10000),
    version: false // Auto-detect version
  });

  bot.on('spawn', () => {
    console.log('✅ Bot spawned!');
    setInterval(() => {
      bot.setControlState('forward', true);
      bot.setControlState('jump', true);
      bot.setControlState('sneak', true);
      setTimeout(() => {
        bot.clearControlStates();
      }, 3000);
    }, 10000);
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => {
    console.log('⚠️ Bot error:', err.message);
  });
}

createBot();

app.get('/', (req, res) => {
  res.send('🟢 Bot is online and running.');
});

app.listen(port, () => {
  console.log(`🌐 Web server listening on port ${port}`);
});
