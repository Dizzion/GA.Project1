// modals and input are my challenges to get done
const modal = document.querySelector("#myModal")
const raceInput = document.querySelector("#raceSelector")
const raceSelect = document.querySelector("#raceSelect")
let playerRace = "";
const difficultySet = document.querySelectorAll(".diffSet")
let diff = ""
const victoryBonus = document.querySelectorAll(".bonus")

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
        if(this.race == "Elf" || this.race == "Dark Elf") {
            this.speed = 1
        }
        // Orc, Ogre and Undead speed stat
        else if(this.race == "Orc" || this.race == "Ogre" || this.race == "Undead") {
            this.speed = -3
        }
        // Halfling and Goblin speed stat
        else if(this.race == "Halfling" || this.race == "Goblin") {
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
        if(this.race == "Elf" || this.race == "Dark Elf") {
            //  50% chance to dodge
            if(Math.ceil(Math.random() * 100) > 50) {
                return true
            }
            else {
                return false
            }
        }
        // Orc, Ogre and Undead dodgeChance()
        else if(this.race == "Orc" || this.race == "Ogre" || this.race == "Undead") {
            //  15% chance to dodge
            if(Math.floor(Math.random() * 100) > 85) {
                return true
            }
            else {
                return false
            }
        }
        // Halfling and Goblin dodgeChance()
        else if(this.race == "Halfling" || this.race == "Goblin") {
            //  65% Chance to dodge
            if(Math.ceil(Math.random() * 100) > 35) {
                return true
            }
            else {
                return false
            }
        }
        // Any other Race dodgeChance()
        else {
            //  35% Chance to dodge
            if(Math.ceil(Math.random() * 100) > 65) {
                return true
            }
            else {
                return false
            }
        }
    }
    // deathCheck() {
    //     // check if this.life == true or false at the end of the fight function
    //     // if dead shift this combatant out of the enemy array
    // },
    // dmgTaken(num) {
    //     // minus the damage taken from the objects HP
    // }
    // dealDMG() {
    //     // calculate the damage this combatant will do
    // }
};

const goblin = new NPC(16, 4, 0, "Goblin")
const ogre = new NPC(25, 6, 4, "Ogre")
const darkElf = new NPC(19, 5, 1, "Dark Elf")
const skeleton = new NPC(14, 4, 6, "Undead")
skeleton.name = "Skeleton"
const lich = new NPC(12, 4, 6, "Undead")
lich.name = "Lich"
const halfling = new NPC(18, 4, 0, "Halfling")
const elf = new NPC(19, 5, 1, "Elf")
const orc = new NPC(25, 6, 4, "Orc")
const human = new NPC(20, 4, 2, "Human")

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

raceInput.onclick = function() {
    playerRace = raceSelect.options[raceSelect.selectedIndex].innerText
    raceSelect.disabled = true
}

for (let i = 0; i < difficultySet.length; i++) {
    difficultySet[i].onclick = function() {
        diff = difficultySet[i].value
        modal.style.display = "none"
        // create the players character based on race chosen
        // base stats 30hp 5att 4def 1speed
    }
}

// fight function
// choose how many opponents based on the difficulty
// randomly choose those opponents for the pool of 9 enemys