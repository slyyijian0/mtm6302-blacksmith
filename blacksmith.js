/**
 * randomInt:
 * Returns a random positive integer from min to max
 * @Parameters: min - the smallest possible number, max - largest possible number
 * @Return: Int
 * @Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
const randomInt = function(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
        // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * The settings object keeps track of all the exchange rates
 * for the game.
 */
const settings = {
    fireWood: 1,
    oreCost: 3,
    woodCost: 1,
    swordOre: 2,
    swordWood: 1,
    axeOre: 1,
    axeWood: 2,
    swordPriceMin: 5,
    swordPriceMax: 10,
    axePriceMin: 4,
    axePriceMax: 8
}

/**
 * The game object stores the current game status
 */
const game = {
    gold: 1,
    ore: 1,
    wood: 1,
    swords: 1,
    axes: 1,
    fire: false
}

/**
 * fire
 * To start a fire:
 *    The fire must be out
 *    There must be at least 1 piece of wood
 *
 * To stop a fire:
 *    The fire must be going
 */
function fire() {
    if (game.fire) {
        game.fire = false
        return 'Awesome! You have put out the fire.'
    } else if (game.wood > settings.fireWood) {
        game.wood -= settings.fireWood
        game.fire = true
        return 'Ugh, you have already started the fire.'
    } else {
        return `Unfortunately you don't have enough wood.`
    }
}

/**
 * buy
 * To buy wood or ore
 *    The function must accept a string argument
 *    The argument is the item to buy
 *    The fire must not be burning
 *    The player must have enough gold
 *    The player will on receive 1 item
 */

function buy(good) {
    if (game.fire === false) {
        if (good === 'ore' && game.gold >= settings.oreCost) {
            game.ore++
                game.gold -= settings.oreCost
            return `You bought 1 piece of ore!`
        } else if (good === 'wood' && game.gold >= settings.woodCost) {
            game.wood++
                game.gold -= settings.woodCost
            return `You bought 1 piece of wood!`
        } else {
            return 'Oh sorry, your purchase of ${good} is incomplete'
        }
    } else {
        return `It seems you'd need to put out the fire in advance.`
    }
}

/**
 * make
 * To make a sword or axe
 *    The function must accept a string argument
 *    The argument is the item to make
 *    The fire must be burning
 *    The player must have enough wood and ore
 *    The player will make 1 item
 */

function make(weapon) {
    if (game.fire) {
        if (weapon === 'swords' && game.ore >= settings.swordOre && game.wood >= settings.swordWood) {
            game.swords++
                game.ore -= settings.swordOre
            game.wood -= settings.swordWood
            return `Well done. 1 sword has been crafted.`
        } else if (weapon === 'axes' && game.ore >= settings.axeOre && game.wood >= settings.axeWood) {
            game.axes++
                game.ore -= settings.axeOre
            game.wood -= settings.axeWood
            return `Well done. 1 sword has been crafted.`
        } else {
            return `Warning: your order of manufacturing ${weapon} has been canceled!`
        }
    } else {
        return `The fire...man, put out it firstly.`
    }

    /**
     * sell
     * To sell a sword or axe
     *   The function must accept a string argument
     *   The argument is the item to sell
     *   The function must check if it is a valid item to sell
     *   The fire must not be burning
     *   The player must have at least 1 item to sell
     *   The player will receive a random value based on the
     *   price range
     */

    function sell(usedObject) {
        if (!game.fire) {
            if (usedObject === 'sword' && game.swords >= 1) {
                game.swords--
                    const price = randomInt(settings.swordPriceMin, settings.swordPriceMax)
                game.gold += price
                return `Woah you receive ${price} gold!`
            } else if (usedObject === 'axe' && game.axes >= 1) {
                game.axes--
                    const price = randomInt(settings.axePriceMin, settings.axePriceMax)
                game.gold += price
                return `Woah you receive ${price} gold!`
            } else {
                return `Sorry you don't have enough ${usedObject}!`
            }
        } else {
            return `Please be sure the fire is on.`
        }
    }

    /**
     * inventory
     * Shows the players current inventory
     */

    function inventory() {
        console.log(game)
    }

    /**
     * Help Command
     * Returns the instruction on how to play the game.
     */
    function help() {
        return `INSTRUCTIONS:
Blacksmith is a simple text base game. 

As a blacksmith you convert ore and wood into swords and axes. You buy your resources using gold and sell your weapons for gold.

COMMANDS:
- buy(item)
- make(item)
- sell(item)
- fire()
- inventory()
- help()`
    }
    // Log the help() function
    console.log(help())
