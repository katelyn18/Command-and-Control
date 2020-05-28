# Gameplay Design

## Objective

Control 100% of the world's computers in your botnet. Your score is the amount of time it took to achieve this.

---

## Game Elements

* Click a button to hack 1 computer
	* The number of computers you currently have decreases the effectiveness of the hack.
	* Starts out at 100% effectiveness and decreases to 5% as more computers are owned
* Command your botnet (controlled computers) to perform certain tasks
	* Each task has a slider which represents the % of the total botnet which is dedicated to each task
	* An "idle" task is always available
	* All sliders will always add up to 100%
* Buy/Research with money earned
	* The money earned from your botnet crypto mining can be used to purchase upgrades
* Random events will occur
	* Each will have varying probabilities based on what inputs it cares about
	* Events range from very negative, neutral/informational, positive

---

## Botnet Tasks

All tasks are based on the number of computers, this really is the `totalComputingPower * botnetTaskAllocatedPercentage`. So not all computers are considered, only the ones currently assigned to that task.

* Spread virus to other devices
	* This functions in a similar way to clicking the button manually but with speed proportional to number of computers.
	* Each device category has a base "hack chance".
	* Every tick, you roll to hack each device category. This might mean you hack one device in multiple device categories in the same tick.
* Mine cryptocurrency
	* Produces a stream of money at a rate based on the number of computers.
* Research new vulnerabilities
	* This has a very low chance of discovering a new vulnerability unique to each device category.
	* All device categories currently part of the botnet are eligible for this research.
	* The computing power of each device is not considered but only the quantity in each category.
	* If 20% of the botnet is allocated to this task and there are 100 Phones in the botnet, the chance of discovering a phone vulnerability is `nextPhoneVulnerabilityChance * (botnetTaskAllocatedPercentage * numberOfPhones)` or more specifically `nextPhoneVulnerabilityChance * (0.2 * 100)`.
	* Each vulnerability discovered decreases the chance of the next vulnerability being discovered for the same device category.
	* A vulnerability increases the "hack chance" of that device category.
* Target DDOS attack
	* Select a target from a list to attack.
	* Each target will have a "power rating" which determines how much DDOS power is needed to completely take it offline.
	* If your botnet power is 1,250 computers and the power rating of the server is 1,500, you won't be able to take it completely offline but you will reduce its effectiveness by 83% (1250/1500).
	* The target options are usually very limited and are situational based on other events in the game.
		* If an anti-virus company is distributing software to stop the spread of your virus, then that company will be one of the target options.
		* If a media site is spreading information about securing yourself against your virus, that site will be a target.
		* Etc.

---

## Random Events

Every X ticks there is a small chance a random event will occur. This random event might be one of the following options.

All events will be announced with "flavor text" in the "recent event" list on screen. So instead of "You infected a closed network" it might say "An intern connected their infected computer to their company network. Your botnet grew by 15,000 Computers!" or "A school teacher picked up an infected flash drive and plugged it in to their work computer. Your botnet grew by 1,230 Computers!" etc.

* Anti-virus company releases new software update
	* Over the next few months of in-game time, the anti-virus will spread which will linearly decrease the hack chance of those devices.
		* This decrease is only temporary. Once you find a new vulnerability for that device category, the hack chance will go back up to normal and keep rising.
	* During this distribution time, devices also have a chance of getting cleaned of your virus.
* Media source will warn people about virus
	* Over the next few weeks, your botnet will decrease and spread will be temporarily decreased.
* Infect a closed network
	* There's a chance you might get a huge spike of new devices (and often in new categories also).
* New device is released
	* A new device might be released for each device category. Each category has a "new device" chance which is based on how likely it is for a new device to be released for that category. Also, there's a stat for how likely someone is to upgrade given a new device is released.
		* For example: A Massive Server would have a low "new device" chance and a low "upgrade" chance. A Phone would have a high "new device" chance and a high "upgrade" chance. Etc.
	* Once the device is released over the next month, X devices of that category will be abandoned. You would lose a percentage of your botnet proportional to the percentage of the world's devices you have for that category while factoring in the "upgrade" chance.
	* New devices might randomly slightly reduce the "hack chance" but usually don't.

---

## Dark Net Shop

The money you earn with crypto mining can be used to buy upgrades on the dark net. Each of these upgrades have several tiers so they can be bought several times in succession. You always have to buy T1 before you can buy T2 etc.

* Buy Vulnerability
	* Instantly get a new vulnerability for a selected device category.
* Subsidize graphics card development
	* Purchasing this will cause your crypto mining speed to increase slowly over the next year.
* Invest in technology in developing countries
	* Spend money to give away pre-infected devices.
* Pro-Botnet Ad Campaign
	* Flood media with news to make people less concerned about the botnet/virus.
	* Used to counter the media's warning
* Virus Ad Campaign
	* Advertise downloads to your virus to get people to intentionally install it.
	* Essentially buy new devices on your botnet.

---

## Units

### Ticks

A tick is one calculation on the game loop. There are 50 ticks per second. Each tick is 20ms. All tasks, calculations, rolls, updates are done on a per-tick basis.

If you want something to occur on average once every 5 seconds, you'd want the odds of that occurring to be `0.004%` or `1/(5*50)`.

In game, every tick is about 30 minutes (`24*60/50` minutes to be exact) on the in-game clock. So every 1 second of real time is 24 hours (1 day) of in-game time.

---

### Computer

Units of computing power. All devices have a computing power rating in units of "computers".

| Device | # of Computers |
| --- | --- |
| IoT Devices | 0.1 |
| Phones | 0.5 |
| Computer | 1 |
| Small Server | 5 |
| Medium Server | 50 |
| Large Server | 250 |
| Massive Server | 1500 |

The standard display will show "# of Computers" but you can expand a sub-menu to see the breakdown of each device category.

---

