//Lets you know it's still booting up.
console.log("[App] Starting Bootup...");
//Discord.js is awesome, and what we are using for this project.
const Discord = require('discord.js');

const ownerID = '456497258607935498' //put your ID here if selfhosting.
const bot = new Discord.Client({fetchAllMembers:true});
//When the bot connects you get this message.
bot.on('ready', () => {
    console.log('[Client] Connected! User: ' + bot.user.username + " - " + bot.user.id);
});

const prefix = '##'
var isPlaying = false
//The variable round is a placeholder for now, is increased every round.
var round = 0
//Empty variable for stats.
var stats = {}
//Starts the bot.
bot.on('message', (msg) => {
  //If the enemy is under 1 hp they die.
  if(stats.HP < 1 && isPlaying == true) {
    isPlaying = false
    round = 0
    msg.channel.sendMessage('Good job, you killed the foe.')

  }
  //If you are under 1 hp, you die.
  if(stats.plrHP < 1 && isPlaying == true) {
    isPlaying = false
    round = 0
    msg.channel.sendMessage('You died!')
  }
              var input = msg.content.toLowerCase();
//Starts the game and sets the stats.
if(input === prefix + "start" && isPlaying == false) {
  //Here is the enemy creation framework.
  stats.enemies = ['Titan', 'Green Slime', 'Demon', 'Mage', 'Blue Slime', 'Red Slime', 'Goblin', 'Skeleton']
    stats.enemy = stats.enemies[Math.floor(Math.random() * stats.enemies.length)]
    //Copy this IF statement and add your enemy to the stats.enemies array, then change Slime to your new enemy.
    //stats.HP is how much health the new enemy will have, and attackMul is multiplies the damage by your number.
  if(stats.enemy == 'Green Slime') {
    stats.attackMul = 1.0
      stats.HP = 30
  }
  if(stats.enemy == 'Blue Slime') {
    stats.attackMul = 1.25
      stats.HP = 35
  }
  if(stats.enemy == 'Red Slime') {
    stats.attackMul = 1.50
      stats.HP = 40
  }
  if(stats.enemy == 'Titan') {
    stats.attackMul = 0.5
      stats.HP = 65
  }
  if(stats.enemy == 'Demon') {
    stats.attackMul = 2.5
      stats.HP = 35
  }
  if(stats.enemy == 'Mage') {
    stats.attackMul = 3.0
      stats.HP = 25
  }
  if(stats.enemy == 'Goblin') {
    stats.attackMul = 1.25
      stats.HP = 45
  }
  if(stats.enemy == 'Skeleton') {
    stats.attackMul = 0.75
      stats.HP = 50
  }
  stats.cooldown = 1
  stats.cooldown = 1
  round = round + 1
  isPlaying = true

  stats.plrHP = 40
  stats.maxHP = stats.plrHP
  stats.Mana = 50
stats.fireUsed = 0
  stats.onFire = false
  msg.channel.sendMessage(stats.enemy + '\'s HP: ' + stats.HP + '\nYour HP: ' + stats.plrHP + '\nYour Mana ' + stats.Mana + '\nAttack? Heal? Fireball? Shield? Leech?')
}

//Attacks the foe.
if(input === "attack" && isPlaying == true) {

  if(stats.attackMul == 0.5) {
      attackDmg = Math.floor(Math.random() * 16) + 3 / 2
  }
  if(stats.attackMul == 0.75) {
    attackDmg = Math.floor(Math.random() * 16) + 3 / 3

  }
  if(stats.attackMul != 0.5) {
        attackDmg = Math.floor(Math.random() * 16) + 3 * stats.attackMul
  }
  if(stats.attackMul != 0.75) {
        attackDmg = Math.floor(Math.random() * 16) + 3 * stats.attackMul
  }
  stats.attackChance = ['1', '2', '3', '4', '1', '1', '1', '1', '1', '1']
  stats.missChance = stats.attackChance[Math.floor(Math.random() * stats.attackChance.length)]
  if(stats.missChance == 10) {
    msg.channel.sendMessage('You missed and lost a turn.')
    stats.plrHP = stats.plrHP - attackDmg
      msg.channel.sendMessage('Ouch! The ' + stats.enemy + ' hit you for ' + attackDmg + ' damage.')
      round = round + 1
          stats.cooldown = 1
                    stats.cooldown2 = 1
      if(stats.onFire == true && isPlaying == true) {
            msg.channel.sendMessage('The foe is on fire and lost ' + stats.toTakeAway + ' hitpoints!')
        stats.toTakeAway = 5 * stats.fireUsed
    stats.HP = stats.HP - stats.toTakeAway

    msg.channel.sendMessage('The foe is on fire and lost ' + stats.toTakeAway + ' hitpoints!')
      }

      msg.channel.sendMessage(stats.enemy + '\'s HP: ' + stats.HP + '\nYour HP: ' + stats.plrHP + '\nYour Mana ' + stats.Mana + '\nAttack? Heal? Fireball? Shield? Leech?')
  }
  if(stats.missChance != 10) {
    stats.plrHP = stats.plrHP - attackDmg
      msg.channel.sendMessage('Ouch! The ' + stats.enemy + ' hit you for ' + attackDmg + ' damage.')
      round = round + 1
          stats.cooldown = 1
          msg.channel.sendMessage('You did ' + attackDmg + ' damage.')
          stats.HP = stats.HP - attackDmg
          stats.cooldown2 = 1
      if(stats.onFire == true && isPlaying == true) {
        var attackDmg = Math.floor(Math.random() * 15) + 4

        stats.toTakeAway = 5 * stats.fireUsed
    stats.HP = stats.HP - stats.toTakeAway

    msg.channel.sendMessage('The foe is on fire and lost ' + stats.toTakeAway + ' hitpoints!')
      }
      msg.channel.sendMessage(stats.enemy + '\'s HP: ' + stats.HP + '\nYour HP: ' + stats.plrHP + '\nYour Mana ' + stats.Mana + '\nAttack? Heal? Fireball? Shield? Leech?')
  }

}

//If you say "heal" and you have enough Mana this code will execute.
if(input === "heal" && isPlaying == true && stats.Mana > 24) {
  var heal = Math.floor(Math.random() * 13) + 6
  stats.test = heal + stats.plrHP
  stats.plrHP = stats.plrHP + heal
  stats.Mana = stats.Mana - 25
  msg.channel.sendMessage('You healed for ' + heal + ' hitpoints and used 25 mana.')
  msg.channel.sendMessage('The foe didn\'t attack.')
  round = round + 1
      stats.cooldown = 1
                stats.cooldown2 = 1
  if(stats.onFire == true && isPlaying == true) {
    stats.toTakeAway = 5 * stats.fireUsed
stats.HP = stats.HP - stats.toTakeAway

msg.channel.sendMessage('The foe is on fire and lost ' + stats.toTakeAway + ' hitpoints!')
  }
  msg.channel.sendMessage(stats.enemy + '\'s HP: ' + stats.HP + '\nYour HP: ' + stats.plrHP + '\nYour Mana ' + stats.Mana + '\nAttack? Heal? Fireball? Shield? Leech?')
}
//If you dont have enough mana this triggers.
if(input === "heal" && isPlaying == true && stats.Mana < 25) {
msg.channel.sendMessage('You don\'t have enough Mana!')
}
if(input === "fireball" && isPlaying == true && stats.Mana > 5) {

  if(stats.attackMul == 0.5) {
      attackDmg = Math.floor(Math.random() * 16) + 3 / 2
  }
  if(stats.attackMul == 0.75) {
    attackDmg = Math.floor(Math.random() * 16) + 3 / 3

  }
  if(stats.attackMul != 0.5) {
        attackDmg = Math.floor(Math.random() * 16) + 3 * stats.attackMul
  }
  if(stats.attackMul != 0.75) {
        attackDmg = Math.floor(Math.random() * 16) + 3 * stats.attackMul
  }
  stats.attackChance = ['1', '1', '1', '1', '5', '1', '1', '1', '1', '1']
  stats.missChance = stats.attackChance[Math.floor(Math.random() * stats.attackChance.length)]
  if(stats.missChance == 5) {
    msg.channel.sendMessage('You missed and lost a turn.')
  stats.plrHP = stats.plrHP - attackDmg
  msg.channel.sendMessage('Ouch! The ' + stats.enemy + ' hit you for ' + attackDmg + ' damage.')
  round = round + 1
    stats.cooldown = 1
              stats.cooldown2 = 1
  if(stats.onFire == true && isPlaying == true) {
    stats.toTakeAway = 5 * stats.fireUsed
stats.HP = stats.HP - stats.toTakeAway
}
  msg.channel.sendMessage(stats.enemy + '\'s HP: ' + stats.HP + '\nYour HP: ' + stats.plrHP + '\nYour Mana ' + stats.Mana + '\nAttack? Heal? Fireball? Shield? Leech?')



} else {
  var attackDmg = Math.floor(Math.random() * 6) + 2
stats.fireUsed = stats.fireUsed + 1
  stats.Mana = stats.Mana - 3
      stats.cooldown = 1
          stats.cooldown2 = 1
  msg.channel.sendMessage('You shot a fireball at the enemy and used 5 mana.')
  stats.onFire = true
  if(stats.onFire == true && isPlaying == true) {
    stats.toTakeAway = 5 * stats.fireUsed
stats.HP = stats.HP - stats.toTakeAway

msg.channel.sendMessage('The foe is on fire and lost ' + stats.toTakeAway + ' hitpoints!')
  }
  stats.plrHP = stats.plrHP - attackDmg
  msg.channel.sendMessage('Ouch! The ' + stats.enemy + ' hit you for ' + attackDmg + ' damage.')
  round = round + 1
  msg.channel.sendMessage(stats.enemy + '\'s HP: ' + stats.HP + '\nYour HP: ' + stats.plrHP + '\nYour Mana ' + stats.Mana + '\nAttack? Heal? Fireball? Shield? Leech?')
}
}

//If you dont have enough mana this triggers.
if(input === "fireball" && isPlaying == true && stats.Mana < 5) {
msg.channel.sendMessage('You don\'t have enough Mana!')
}


if(input === "shield" && isPlaying == true && stats.Mana > 5 && stats.cooldown == 1) {

  msg.channel.sendMessage('You blocked the incoming attack.')
  attackDmg = 0.5
  stats.plrHP = stats.plrHP - attackDmg
  msg.channel.sendMessage('The shield blocked most of the damage from the ' + stats.enemy + ' but you still lost ' + attackDmg + ' HP.')
  round = round + 1
  stats.cooldown = 1
  stats.cooldown2 = 1
  if(stats.onFire == true && isPlaying == true) {
                stats.toTakeAway = 5 * stats.fireUsed
        stats.HP = stats.HP - stats.toTakeAway

    msg.channel.sendMessage('The foe is on fire and lost ' + stats.toTakeAway + ' hitpoints!')


  }
  msg.channel.sendMessage(stats.enemy + '\'s HP: ' + stats.HP + '\nYour HP: ' + stats.plrHP + '\nYour Mana ' + stats.Mana + '\nAttack? Heal? Fireball? Shield? Leech?')



}
if(input === 'shield' && stats.cooldown == 0) {
  msg.channel.sendMessage('The shield is on cooldown.')
}

if(input === "leech" && isPlaying == true && stats.Mana > 9 && stats.cooldown2 == 1) {
  var heal = Math.floor(Math.random() * 5) + 2
  stats.test = heal + stats.plrHP
  stats.HP = stats.HP - heal
  stats.plrHP = stats.plrHP + heal
  stats.Mana = stats.Mana - 10
  msg.channel.sendMessage('You leeched the enemy for ' + heal + ' hitpoints and used 10 mana.')
  msg.channel.sendMessage('The foe didn\'t attack.')
  round = round + 1
    stats.cooldown2 = 0
      stats.cooldown = 1
  if(stats.onFire == true && isPlaying == true) {
    stats.toTakeAway = 5 * stats.fireUsed
stats.HP = stats.HP - stats.toTakeAway

msg.channel.sendMessage('The foe is on fire and lost ' + stats.toTakeAway + ' hitpoints!')
  }
  msg.channel.sendMessage(stats.enemy + '\'s HP: ' + stats.HP + '\nYour HP: ' + stats.plrHP + '\nYour Mana ' + stats.Mana + '\nAttack? Heal? Fireball? Shield? Leech?')
}
if(input === 'leech' && stats.cooldown2 == 0) {
  msg.channel.sendMessage('Leech is on cooldown.')
}
//If you dont have enough mana this triggers.
if(input === "leech" && isPlaying == true && stats.Mana < 10) {
msg.channel.sendMessage('You don\'t have enough Mana!')
}
//Evaluation command, if you self-hosting this bot replace my user id with yours.
if(msg.content.startsWith(prefix + "eval ")) {
if (msg.author.id != ownerID) return;
try {
var code = msg.content.substring(6);
var evaled = eval(code);
msg.channel.sendCode("xl", (evaled));
} catch(err) {
    msg.channel.sendMessage(
    "`ERROR`" + "\n" + err
    );
  }
}

});












//Bot login.
bot.login('NDYwODY4OTkyMzYyNjEwNjg4.DiFIHg.Ba9H20d4YCj7BfBolfut7a6w7Wg').catch((err) => console.log(`[Client] Failed to connect: ${err.message}`))
//Saves endless looking around if there is an Uncaught Promise Error.
process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
