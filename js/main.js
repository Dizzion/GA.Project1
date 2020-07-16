// modals and input are my challenges to get done
const modal = document.querySelector("#myModal")
const raceInput = document.querySelector("#raceSelector")
const raceSelect = document.querySelector("#raceSelect")
let playerRace = ""
const difficultySet = document.querySelectorAll(".diffSet")
let diff = ""
const victoryBonus = document.querySelectorAll(".bonus")
const AttUP = document.querySelectorAll(".AttUP")
const DefUP = document.querySelectorAll(".DefUP")
let healCount = 0
let attPlus = 0
let defPlus = 0
playerDisplayHP = document.querySelector("#playerHP")
playerDispayAtt = document.querySelector("#playerAtt")
playerDisplayDef = document.querySelector("#playerDef")
oppDisplayHP = document.querySelector("#enemyHP")
oppDisplayAtt = document.querySelector("#enemyAtt")
oppDisplayDef = document.querySelector("#enemyDef")
let time = 0
let victoryCounter = 0
let dodgeEnemy = false
let dodgePlayer = false
const battleSound = new Audio("media/swords.mp3")
const deathSound = new Audio("media/death.mp3")
const winSound = new Audio("media/win.mp3")


class NPC {
    constructor(hp, atk, def, race) {
        this.health = hp
        this.attack = atk
        this.defense = def
        this.race = race
        this.name = race
        this.life = true
        this.speed = 0
    }
    changeSpeed() {
        // Elf and Dark Elf speed stat
        if (this.race == "Elf" || this.race == "Dark Elf") {
            this.speed = 1
        }
        // Orc, Ogre and Undead speed stat
        else if (this.race == "Orc" || this.race == "Ogre" || this.race == "Undead") {
            this.speed = -3
        }
        // Halfling and Goblin speed stat
        else if (this.race == "Halfling" || this.race == "Goblin") {
            this.speed = 2
        }
        // Any other Race speedstat
        else {
            this.speed = 0
        }
    }
    // dodge chance function
    dodgeChance() {
        // Elf and Dark Elf dodgeChance()
        if (this.race == "Elf" || this.race == "Dark Elf") {
            //  50% chance to dodge
            if (Math.ceil(Math.random() * 100) > 50) {
                return true
            }
            else {
                return false
            }
        }
        // Orc, Ogre and Undead dodgeChance()
        else if (this.race == "Orc" || this.race == "Ogre" || this.race == "Undead") {
            //  15% chance to dodge
            if (Math.floor(Math.random() * 100) > 85) {
                return true
            }
            else {
                return false
            }
        }
        // Halfling and Goblin dodgeChance()
        else if (this.race == "Halfling" || this.race == "Goblin") {
            //  65% Chance to dodge
            if (Math.ceil(Math.random() * 100) > 35) {
                return true
            }
            else {
                return false
            }
        }
        // Any other Race dodgeChance()
        else {
            //  35% Chance to dodge
            if (Math.ceil(Math.random() * 100) > 65) {
                return true
            }
            else {
                return false
            }
        }
    }
    deathCheck() {
        // check if this.life == true or false at the end of the fight function
        // if dead shift this combatant out of the enemy array
        if (this.health === 0) {
            this.life = false
        }
    }
    dealDMG() {
        // calculate the damage this combatant will do
        return Math.round(Math.random() * 3) + this.attack
    }
};

const goblin = new NPC(16, 4, 0, "Goblin")
goblin.img = "Images/goblin.png"
const ogre = new NPC(25, 6, 4, "Ogre")
ogre.img = "Images/ogre.png"
const darkElf = new NPC(19, 5, 1, "Dark Elf")
darkElf.img = "Images/darkElf.png"
const skeleton = new NPC(14, 4, 6, "Undead")
skeleton.img = "Images/Undead.png"
skeleton.name = "Skeleton"
const lich = new NPC(12, 4, 6, "Undead")
lich.img = "Images/lich.png"
lich.name = "Lich"
const halfling = new NPC(18, 4, 0, "Halfling")
halfling.img = "Images/halfling.png"
const elf = new NPC(19, 5, 1, "Elf")
elf.img = "Images/Elf.png"
const orc = new NPC(25, 6, 4, "Orc")
orc.img = "Images/Orc.png"
const human = new NPC(20, 4, 2, "Human")
human.img = "Images/human.png"
const Bob = new NPC(40, 7, 5, "Human")
Bob.img = "Images/8bitMan.png"
Bob.name = "Bob, the Conqueror"


const enemy = [goblin, ogre, darkElf, skeleton, lich, halfling, elf, orc, human]

for (let i = 0; i < enemy.length; i++) {
    enemy[i].changeSpeed()
}

window.onload = function () {
    modal.style.display = "block"
    for (let i = 0; i < victoryBonus.length; i++) {
        victoryBonus[i].disabled = true;
    }
}

raceInput.onclick = function () {
    playerRace = raceSelect.options[raceSelect.selectedIndex].innerText
    raceSelect.disabled = true
}



for (let i = 0; i < difficultySet.length; i++) {
    difficultySet[i].onclick = function () {
        diff = difficultySet[i].value
        modal.style.display = "none"
        // create the players character based on race chosen
        createBob()
        if (diff === "Easy") {
            easyDiff()
        } else if (diff === "Medium") {
            medDiff()
        }
    }
}
function createBob() {
    if (playerRace === "Random") {
        // random choose a race for the player
        let randoRa = Math.ceil(Math.random() * 8)
        if (randoRa === 1) {
            playerRace = "Human"
            // const Bob = new NPC(40, 7, 5, playerRace)
            Bob.changeSpeed()
            Bob.speed += 1
        } else if (randoRa === 2) {
            playerRace = "Halfling"
            // const Bob = new NPC(32, 7, 3, playerRace)
            Bob.health = 32
            Bob.defense = 3
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else if (randoRa === 3) {
            playerRace = "Goblin"
            // const Bob = new NPC(32, 7, 3, playerRace)
            Bob.health = 32
            Bob.defense = 3
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else if (randoRa === 4) {
            playerRace = "Elf"
            // const Bob = new NPC(38, 8, 3, playerRace)
            Bob.health = 38
            Bob.attack = 8
            Bob.defense = 3
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else if (randoRa === 5) {
            playerRace = "Dark Elf"
            // const Bob = new NPC(38, 8, 3, playerRace)
            Bob.health = 38
            Bob.attack = 8
            Bob.defense = 3
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else if (randoRa === 6) {
            playerRace = "Orc"
            // const Bob = new NPC(44, 9, 7, playerRace)
            Bob.health = 44
            Bob.attack = 9
            Bob.defense = 7
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else if (randoRa === 7) {
            playerRace = "Ogre"
            // const Bob = new NPC(44, 9, 7, playerRace)
            Bob.health = 44
            Bob.attack = 9
            Bob.defense = 7
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else {
            playerRace = "Undead"
            // const Bob = new NPC(35, 6, 10, playerRace)
            Bob.health = 35
            Bob.attack = 6
            Bob.defense = 10
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        }
    } else if (playerRace == "Halfling") {
        // make the player a halfling
        // const Bob = new NPC(32, 7, 3, playerRace)
        Bob.health = 32
        Bob.defense = 3
        Bob.race = playerRace
        Bob.changeSpeed()
        Bob.speed++
    } else if (playerRace == "Goblin") {
        // make the player a goblin
        // const Bob = new NPC(32, 7, 3, playerRace)
        Bob.health = 32
        Bob.defense = 3
        Bob.race = playerRace
        Bob.changeSpeed()
        Bob.speed++
    } else if (playerRace == "Elf") {
        // make the player an elf
        // const Bob = new NPC(38, 8, 3, playerRace)
        Bob.health = 38
        Bob.attack = 8
        Bob.defense = 3
        Bob.race = playerRace
        Bob.changeSpeed()
        Bob.speed++
    } else if (playerRace == "Dark Elf") {
        // make the player a dark elf
        // const Bob = new NPC(38, 8, 3, playerRace)
        Bob.health = 38
        Bob.attack = 8
        Bob.defense = 3
        Bob.race = playerRace
        Bob.changeSpeed()
        Bob.speed++
    } else if (playerRace == "Human") {
        // make the player human
        // const Bob = new NPC(40, 7, 5, playerRace)
        Bob.changeSpeed()
        Bob.speed += 1
    } else if (playerRace == "Orc") {
        // make the player orc
        // const Bob = new NPC(44, 9, 7, playerRace)
        Bob.health = 44
        Bob.attack = 9
        Bob.defense = 7
        Bob.race = playerRace
        Bob.changeSpeed()
        Bob.speed++
    } else if (playerRace == "Ogre") {
        // make the player an ogre
        // const Bob = new NPC(44, 9, 7, playerRace)
        Bob.health = 44
        Bob.attack = 9
        Bob.defense = 7
        Bob.race = playerRace
        Bob.changeSpeed()
        Bob.speed++
    } else if (playerRace == "Undead") {
        // make the player undead
        // const Bob = new NPC(35, 6, 10, playerRace)
        Bob.health = 35
        Bob.attack = 6
        Bob.defense = 10
        Bob.race = playerRace
        Bob.changeSpeed()
        Bob.speed++
    } else {
        // random race
        let randoRa = Math.ceil(Math.random() * 8)
        if (randoRa === 1) {
            playerRace = "Human"
            // const Bob = new NPC(40, 7, 5, playerRace)
            Bob.changeSpeed()
            Bob.speed += 1
        } else if (randoRa === 2) {
            playerRace = "Halfling"
            // const Bob = new NPC(32, 7, 3, playerRace)
            Bob.health = 32
            Bob.defense = 3
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else if (randoRa === 3) {
            playerRace = "Goblin"
            // const Bob = new NPC(32, 7, 3, playerRace)
            Bob.health = 32
            Bob.defense = 3
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else if (randoRa === 4) {
            playerRace = "Elf"
            // const Bob = new NPC(38, 8, 3, playerRace)
            Bob.health = 38
            Bob.attack = 8
            Bob.defense = 3
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else if (randoRa === 5) {
            playerRace = "Dark Elf"
            // const Bob = new NPC(38, 8, 3, playerRace)
            Bob.health = 38
            Bob.attack = 8
            Bob.defense = 3
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else if (randoRa === 6) {
            playerRace = "Orc"
            // const Bob = new NPC(44, 9, 7, playerRace)
            Bob.health = 44
            Bob.attack = 9
            Bob.defense = 7
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else if (randoRa === 7) {
            playerRace = "Ogre"
            // const Bob = new NPC(44, 9, 7, playerRace)
            Bob.health = 44
            Bob.attack = 9
            Bob.defense = 7
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        } else {
            playerRace = "Undead"
            // const Bob = new NPC(35, 6, 10, playerRace)
            Bob.health = 35
            Bob.attack = 6
            Bob.defense = 10
            Bob.race = playerRace
            Bob.changeSpeed()
            Bob.speed++
        }
    }
    playerDisplayHP.innerHTML += Bob.health
    playerDispayAtt.innerHTML += Bob.attack
    playerDisplayDef.innerHTML += Bob.defense
    Bob.maxHP = Bob.health
}
// set to easy difficulty
function easyDiff() {
    // run easy version of game 3 opponents
    while (enemy.length > 3) {
        enemy.shift(Math.floor(Math.random() * enemy.length))
    }
}
// set medium difficulty
function medDiff() {
    // run medium version of game 6 opponents
    while (enemy.length > 6) {
        enemy.shift(Math.floor(Math.random() * enemy.length))
    }
}
// attack up button click functionality
document.querySelector("#attack").onclick = function () {
    Bob.attack++
    playerDispayAtt.innerHTML = ("Attack: " + Bob.attack)
    AttUP[attPlus].style.opacity = "100"
    attPlus++
    for (let i = 0; i < victoryBonus.length; i++) {
        victoryBonus[i].disabled = true
    }
    document.querySelector("#Fight").disabled = false
}
// defense up button click functionality
document.querySelector("#defense").onclick = function () {
    Bob.defense++
    Bob.maxHP++
    Bob.health++
    playerDisplayDef.innerHTML = ("Defense: " + Bob.defense)
    playerDisplayHP.innerHTML = ("Health: " + Bob.health)
    DefUP[defPlus].style.opacity = "100"
    defPlus++
    for (let i = 0; i < victoryBonus.length; i++) {
        victoryBonus[i].disabled = true
    }
    document.querySelector("#Fight").disabled = false
}
// heal button click functionality
document.querySelector("#heal").onclick = function () {
    Bob.health = Bob.maxHP
    playerDisplayHP.innerHTML = ("Health: " + Bob.health)
    document.querySelectorAll(".heal")[healCount].style.opacity = "0"
    healCount++
    for (let i = 0; i < victoryBonus.length; i++) {
        victoryBonus[i].disabled = true
    }
    document.querySelector("#Fight").disabled = false
}
// fight button click functionality
document.querySelector("#Fight").onclick = function () {
    let en = Math.floor(Math.random() * enemy.length)
    document.querySelector(".enemy").src = enemy[en].img
    oppDisplayHP.innerHTML = ("Health: " + enemy[en].health)
    oppDisplayAtt.innerHTML = ("Attack: " + enemy[en].attack)
    oppDisplayDef.innerHTML = ("Defense: " + enemy[en].defense)
    document.querySelector("#Fight").disabled = true
    brawl(Bob, enemy[en])
    enemy.splice(en, 1)
    if (Bob.life === false) {
        // endGame()
    } else {
        if (diff === "Easy") {
            victoryCounter++
            if (victoryCounter != 3) {
                if (Bob.health < (Bob.maxHP - 5)) {
                    Bob.health += 2
                }
                if (healCount == 2) {
                    for (let i = 0; i < (victoryBonus.length - 1); i++) {
                        victoryBonus[i].disabled = false
                    }
                } else {
                    for (let i = 0; i < victoryBonus.length; i++) {
                        victoryBonus[i].disabled = false
                    }
                }
            } else {
                endGame()
            }
        } else if (diff === "Medium") {
            victoryCounter++
            if (victoryCounter != 6) {
                if (Bob.health < (Bob.maxHP - 5)) {
                    Bob.health += 2
                }
                if (healCount == 2) {
                    for (let i = 0; i < (victoryBonus.length - 1); i++) {
                        victoryBonus[i].disabled = false
                    }
                } else {
                    for (let i = 0; i < victoryBonus.length; i++) {
                        victoryBonus[i].disabled = false
                    }
                }
            } else {
                endGame()
            }
        } else if (diff === "Hard") {
            victoryCounter++
            if (victoryCounter != 9) {
                if (Bob.health < (Bob.maxHP - 5)) {
                    Bob.health += 2
                }
                if (healCount == 2) {
                    for (let i = 0; i < (victoryBonus.length - 1); i++) {
                        victoryBonus[i].disabled = false
                    }
                } else {
                    for (let i = 0; i < victoryBonus.length; i++) {
                        victoryBonus[i].disabled = false
                    }
                }
            } else {
                endGame()
            }
        }
    }
}
// brawl function
function brawl(player, opponent) {
    // while loop the combat with a timer on each itteration of damage
    battleSound.play()
    while ((player.health != 0) && (opponent.health != 0)) {
        // check dodge
        dodgeEnemy = opponent.dodgeChance()
        dodgePlayer = player.dodgeChance()
        // 3s intervals for damage to occur
        // run damage every 3s
        // speed is equal attack at same time
        if (player.speed == opponent.speed) {
            if (dodgePlayer === true && dodgeEnemy === false) {
                // player dodged
                // setTimeout(() => {
                opponent.health -= player.dealDMG()
                // }, 3000) 
            } else if (dodgePlayer === false && dodgeEnemy === true) {
                // opponent dodged
                // setTimeout(() => {
                player.health -= opponent.dealDMG()
                // }, 3000)
            } else if (dodgePlayer === false && dodgeEnemy === false) {
                // nether dodged
                // setTimeout(() => {
                [player.health, opponent.health] = [player.health - opponent.dealDMG(), opponent.health - player.dealDMG()]
                // }, 3000)
            } else {
                // both dodged
            }
            // player faster than the opponent player attacks first 
        } else if (player.speed > opponent.speed) {
            if (dodgePlayer === true && dodgeEnemy === false) {
                // player dodged
                // setTimeout(() => {
                opponent.health -= player.dealDMG()
                // }, 3000)
            } else if (dodgePlayer === false && dodgeEnemy === true) {
                // opponent dodged
                // setTimeout(() => {
                player.health -= opponent.dealDMG()
                // }, 3000)
            } else if (dodgePlayer === false && dodgeEnemy === false) {
                // nether dodged
                // setTimeout(() => {
                opponent.health -= player.dealDMG()
                player.health -= opponent.dealDMG()
                // }, 3000)
                if (opponent.health <= 0) {
                    opponent.health = 0
                }
            } else {
                // both dodged
            }
            // opponent faster than the player opponent attacks first
        } else if (player.speed < opponent.speed) {
            if (dodgePlayer == true && dodgeEnemy == false) {
                // player dodged
                // setTimeout(() => {
                opponent.health -= player.dealDMG()
                // }, 3000)
            } else if (dodgePlayer == false && dodgeEnemy == true) {
                // opponent dodged
                // setTimeout(() => {
                player.health -= opponent.dealDMG()
                // }, 3000)
            } else if (dodgePlayer == false && dodgeEnemy == false) {
                // nether dodged
                // setTimeout(() => {
                player.health -= opponent.dealDMG()
                opponent.health -= player.dealDMG()
                // }, 3000)
                // opponent doesn't take damage if player dies
                if (player.health <= 0) {
                    player.health = 0
                }
            } else {
                // both dodged
            }
            // just incase attack at same time
        } else {
            if (dodgePlayer === true && dodgeEnemy === false) {
                // player dodged
                // setTimeout(() => {
                opponent.health -= player.dealDMG()
                // }, 3000) 
            } else if (dodgePlayer === false && dodgeEnemy === true) {
                // opponent dodged
                // setTimeout(() => {
                player.health -= opponent.dealDMG()
                // }, 3000)
            } else if (dodgePlayer === false && dodgeEnemy === false) {
                // nether dodged
                // setTimeout(() => {
                [player.health, opponent.health] = [player.health - opponent.dealDMG(), opponent.health - player.dealDMG()]
                // }, 3000)
            } else {
                // both dodged
            }
        }
        if (player.health <= 0) {
            player.health = 0
            player.life = false
        }
        if (opponent.health <= 0) {
            opponent.health = 0
            opponent.life = false
        }
        playerDisplayHP.innerHTML = ("Health: " + player.health)
        oppDisplayHP.innerHTML = ("Health: " + opponent.health)
    }
    if (diff === "Hard") {
        player.health += 2
    } else if (diff === "Medium") {
        player.health++
    }
}

// end of the game function
function endGame() {
    // check if victories == 3, 6, 9 based on difficulty
    // pull footer Modal with vitory statement and a 8-bit trophy art
    // have button on Modal to restart the Game
    if (diff === "Easy" && victoryCounter === 3) {
        winSound.play()
        // pop up modal with trophy.png
        // suggest they try medium or hard and rest the game on button click
    } else if (diff === "Medium" && victoryCounter === 6) {
        winSound.play()
        // pop up modal with trophy.png
        // suggest they try hard and reset the game on button click
    } else if (diff === "Hard" && victoryCounter === 9) {
        winSound.play()
        // pop up modal with trophy.png
        // change text on Modal to refect beating hard reset game on button press
    } else {
        deathSound.play()
        // pop up modal and death.png
        // change text on modal telling them to retry and reset game on button press
    }
    // if Bob died pull footer Modal with death image instead of trophy
    // have button on Modal to restart the Game
}