const mineflayer = require('mineflayer');

function createBot() {
  console.log('Attempting to connect...');

  const bot = mineflayer.createBot({
    host: 'Nerddddsmp.aternos.me',
    port: 57453, // Make sure this is the latest port
    username: 'Steve_' + Math.floor(Math.random() * 10000),
    version: false // Auto-detect version
  });

  bot.on('login', () => {
    console.log('✅ Bot logged in');
  });

  bot.on('spawn', () => {
    console.log('✅ Bot spawned!');
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
    console.log('⚠️ Bot disconnected. Reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('❌ Bot error:', err.message);
    setTimeout(createBot, 10000);
  });
}

createBot();


