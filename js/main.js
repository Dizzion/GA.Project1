// modals and input are my challenges to get done
const modal = document.querySelector("#myModal")
const span = document.querySelector(".close")
const raceInput = document.querySelector("#raceSelector")
const raceSelect = document.querySelector("#raceSelect")
let playerRace = "";

class NPC {
    constructor(hp, atk, def, race)
    {
        this.health = hp;
        this.attack = atk;
        this.defense = def;
        this.race = race;
        this.name = race;
        this.life = true;
        this.speed = 0;
    }
    // dodge chance function
    dodgeChance()
    {
        // Elf and Dark Elf dodgeChance()
        if(this.race == "Elf" || this.race == "Dark Elf")
        {
            //  60% chance to dodge
            if(Math.ceil(Math.random() * 100) > 40)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        // Orc, Ogre and Undead dodgeChance()
        else if(this.race == "Orc" || this.race == "Ogre" || this.race == "Undead")
        {
            //  15% chance to dodge
            if(Math.floor(Math.random() * 100) > 85)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        // Halfling and Goblin dodgeChance()
        else if(this.race == "Halfling" || this.race == "Goblin")
        {
            //  65% Chance to dodge
            if(Math.ceil(Math.random() * 100) > 35)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        // Any other Race dodgeChance()
        else
        {
            //  35% Chance to dodge
            if(Math.ceil(Math.random() * 100) > 65)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
    // deathCheck()
    // {
    //     // check if this.life == true or false at the end of the fight function
    //     // if dead shift this combatant out of the enemy array
    // },
    // dmgTaken(num)
    // {
    //     // minus the damage taken from the objects HP
    // }
    // dealDMG()
    // {
    //     // calculate the damage this combatant will do
    // }
};

window.onload = function () {
    modal.style.display = "block"
}
span.onclick = function() {
    modal.style.display = "none"
}
raceInput.onclick = function() {
    playerRace = raceSelect.options[raceSelect.selectedIndex].innerText
    raceSelect.disabled = true
    console.log(raceSelect.disabled)
}
