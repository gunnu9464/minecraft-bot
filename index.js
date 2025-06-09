
const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Nerddddsmp.aternos.me',
    port: 57453,
    username: 'Player_' + Math.floor(Math.random() * 10000),
    version: false
  });

  bot.on('login', () => {
    console.log('Bot logged in');
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
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => {
    console.log('Bot error:', err.message);
    setTimeout(createBot, 10000);
  });
}

createBot();

