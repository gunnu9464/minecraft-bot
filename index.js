const mineflayer = require('mineflayer')
const express = require('express')

let bot

function createBot() {
  bot = mineflayer.createBot({
    host: 'nerddddsmp.aternos.me',
    port: 25565,
    username: 'Realistic_' + Math.floor(Math.random() * 10000),
    version: '1.16.5' // Change if needed
  })

  bot.on('spawn', () => {
    console.log('Bot spawned!')

    // Repeating actions
    setInterval(() => {
      bot.setControlState('sneak', true)
      bot.setControlState('jump', true)
      bot.setControlState('forward', true)
      setTimeout(() => {
        bot.setControlState('jump', false)
        bot.setControlState('forward', false)
      }, 2000)
    }, 5000)
  })

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 10s...')
    setTimeout(createBot, 10000)
  })

  bot.on('error', (err) => {
    console.log('Bot error:', err)
  })
}

createBot()

// Web server for UptimeRobot
const app = express()
app.get('/', (req, res) => res.send('Bot is running!'))
app.listen(3000, () => console.log('Express server started on port 3000'))
