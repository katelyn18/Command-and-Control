/* globals rand */
/* eslint-disable no-unused-vars, no-return-assign */

// Define all attributes of shop items
const SHOP_ITEMS = {
  'vulnerability': {
    name: 'Vulnerability',
    tiers: [
      {
        cost: 15000,
        get description () {
          return `<a href="https://en.wikipedia.org/wiki/Stuxnet" target="_blank">Stuxnet</a> reverse engineering has lead to previously unknown zero days flooding the black market. You purchase one for ${this.cost} and discover it allows you to tunnel through all Windows (Vista and lower) firewalls. You may now bypass the firewall on any Windows system (Vista and lower) directly connected to the internet.`;
        },
        // Make desktop more vulnerable
        effect: gameData => gameData.computers.devices[2].vulnChance += 0.1
      },
      {
        cost: 25000,
        get description () {
          return `One of your Cipherpunk friends has put you in contact with an IBM security engineer. He provides you with a security exploit he recently discovered for ${this.cost}. The exploit allows you to inject any 32 byte sequence into SSH initialization packets created by OpenSSH version 1.0.1h and above.`;
        },
        effect: gameData => {
          gameData.computers.devices[3].vulnChance += 0.1;
          gameData.computers.devices[4].vulnChance += 0.1;
        }
      },
      {
        cost: 1002000,
        get description () {
          return `As if by luck alone, you run across a black market zero-day seller that claims he has the ultimate zero-day. After verifying the legitimacy of the hack you purchase it for an astronomical ${this.cost - 2000} crypto. You then pay 2000 for a hacker to create an injectable payload that can be use on any operating system. Little did you know this vulnerability is actually the currently unknown <a href="https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)" target="_blank">spectre vulnerability</a>. This increases your global hacking power.`;
        },
        effect: gameData => gameData.computers.hackPowerMult += 0.1
      }
    ]
  },
  'adBotnet': {
    name: 'Misinformation on Botnet',
    tiers: [
      {
        cost: 100,
        get description () {
          return `Pay several twitter and reddit bots to spam disinformation about how underwhelming and overblown the actual botnet is.`;
        },
        // Give the player some desktops
        effect: gameData => gameData.computers.devices[2].count += rand(750, 1500)
      },
      {
        cost: 2000,
        get description () {
          return `Thanks to your campaign, anti-virus sales have reached an all time low this year. The lack of anti-virus software installed on computers has made hacking computers easier.`;
        },
        effect: gameData => gameData.computers.devices[2].vulnChance += 0.1
      },
      {
        cost: 50000,
        get description () {
          return `Massive bribes to industry leaders within the linux community has renforced the idea that hardened kernels on massive servers lower performance more than they increase security. Thanks to this, almost all massive servers no longer run hardened kernels making them more vulnerable.`;
        },
        effect: gameData => gameData.computers.devices[6].vulnChance += 0.2
      }
    ]
  },
  'adVirus': {
    name: 'Advertise Virus',
    tiers: [
      {
        cost: 400,
        get description () {
          return `A hacker has offered to crack SimpletonsCity 2045 for you for a meer ${this.cost - 200}. Once he does you pay a bulletproof host to host an infected copy of SimCity 2045. Some fairly inexpensive reddit ads for 200 crypto then distribute the link to your download.`;
        },
        // Give the player some desktops
        effect: gameData => gameData.computers.devices[2].count += rand(750, 1500)
      },
      {
        cost: 2000,
        get description () {
          return `You've successfully pay several dark net heackers to hack Brassers and download roughly 6tb of material. You release the content in a steady stream of torrents that use exploits in video players to install your virus.`;
        },
        // Give the player some desktops
        effect: gameData => gameData.computers.devices[2].count += rand(10000, 25000)
      },
      {
        cost: 200000,
        get description () {
          return `You buy out grzSecurity and start distributing their hardened kernel download with your virus preinstalled. All servers that use your grzSecurty kernel are instantly infected.`;
        },
        effect: gameData => {
          // Give player a bunch of different types of servers
          gameData.computers.devices[3].count += rand(300, 500);
          gameData.computers.devices[4].count += rand(50, 200);
          gameData.computers.devices[5].count += rand(15, 32);
          gameData.computers.devices[6].count += rand(1, 4);
        }
      }
    ]
  },
  'giveAwayDevices': {
    name: 'Give Away Infected Devices',
    tiers: [
      {
        cost: 200,
        get description () {
          return `You place a couple hundred raspberry pi's preloaded with the virus on offerup for free. There are all given away within 2 days. Some reinstall another operating system, wiping your virus from the system, some don't.`;
        },
        // Give the player IOT devices
        effect: gameData => gameData.computers.devices[0].count += rand(150, 400)
      },
      {
        cost: 2000,
        get description () {
          return `Place a couple medium sized servers on craigslist for free. Freight shipping only... Ain't want no body at me house...`;
        },
        // Give the player 14-20 medium servers
        effect: gameData => gameData.computers.devices[4].count += rand(14, 20)
      },
      {
        cost: 89000,
        get description () {
          return `Fund the free distribution of cell phones in 3rd world countries under the condition that they have your app preinstalled.`;
        },
        // Give the player some phones
        effect: gameData => gameData.computers.devices[1].count += rand(30000, 120000)
      }
    ]
  }
};

class ShopHandler {
  addEventHandlers (gameData) {
    // Get all buttons to be bound to
    const shopButtons = document.querySelectorAll('[data-shop-item-id]');

    // For each button we need to create a new ShopItem and bind it to its
    // respective element
    shopButtons.forEach(button => {
      const itemId = button.getAttribute('data-shop-item-id');

      // Ensure we actually have an item that matches this button's id
      if (!SHOP_ITEMS[itemId]) {
        // eslint-disable-next-line no-console
        return console.error(`Unable to create shop item for unknown item "${itemId}"!`);
      }

      // Create new ShopItem for the respective item
      const shopItem = new ShopItem(SHOP_ITEMS[itemId]);

      // Bind our new shop item to the button element
      shopItem.bind(button, gameData);
    });
  }
}

class ShopItem {
  constructor (options) {
    Object.assign(this, options);
  }

  purchase () {
    // Make sure we are not over the number of tiers this item has
    if (this.currentTier >= this.tiers.length - 1) {
      // eslint-disable-next-line no-console
      return console.error(`There are no more tiers for ${this.name} left.`);
    }

    const tier = this.tiers[this.gameData.shop.items[this.name] + 1];

    // Make sure the user has enough money to buy the tier
    if (this.gameData.money < tier.cost) {
      // eslint-disable-next-line no-console
      return console.warn(`You do not have the required ${tier.cost} to purchase this item.`);
    }

    // Debit their account the tier's cost
    this.gameData.money -= tier.cost;

    // Increment their item tier
    this.gameData.shop.items[this.name] += 1;

    // Log description
    this.gameData.log.messages.push(tier.description);
    this.gameData.log.lastMessageTime = Date.now();

    // Apply item's effects
    tier.effect(this.gameData);

    // Update the button price
    this.updatePrice();
  }

  updatePrice () {
    // Get cost of next tier
    const cost = (() => {
      const nextTier = this.tiers[this.gameData.shop.items[this.name] + 1];
      if (!nextTier) {
        return '~';
      }
      return nextTier.cost;
    })();

    // Place cost inside button
    this.uiTarget.querySelector('.shopPrice').innerText = cost;
  }

  // Bind this shop item to a button element and store access to the global game data
  bind (element, gameData) {
    this.gameData = gameData;

    // If current tier is not recorded in game data, reset it
    if (!this.gameData.shop.items.hasOwnProperty(this.name)) {
      this.gameData.shop.items[this.name] = -1;
    }

    // Store element this item is bound to
    this.uiTarget = element;

    // Bind mouseclick event to purchase action
    element.addEventListener('mouseup', this.purchase.bind(this));

    // Set price text on button
    this.updatePrice();
  }
}
