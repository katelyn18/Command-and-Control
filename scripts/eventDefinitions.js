/* eslint-disable no-unused-vars */
/* globals ddos gameData */
/* Random event definitions */

const eventDefs = {
  permEvents: [
    {
      id: 0,
      name: 'Give 10% of current crypto',
      duration: 0,
      weight: 10,
      effects: {
        money: 0
      },
      text: 'Hacked someone\'s crypto wallet! (Gained crypto)'
    },
    {
      id: 1,
      name: 'Add Phones',
      duration: 0,
      weight: 10,
      effects: {
        phone: 0
      },
      text: 'Hacked more new phones. (New Phones added to botnet)'
    },
    {
      id: 2,
      name: 'Remove Phones',
      duration: 0,
      weight: 10,
      effects: {
        phone: 0
      },
      text: 'Some people removed the virus from their phones. (Phones removed from botnet)'
    },
    {
      id: 3,
      name: 'Add Computers',
      duration: 0,
      weight: 10,
      effects: {
        computer: 0
      },
      text: 'Hacked more new Computers. (New Computers added to botnet)'
    },
    {
      id: 4,
      name: 'Remove Computers',
      duration: 0,
      weight: 10,
      effects: {
        computer: 0
      },
      text: 'Some people removed the virus from their Computers. (Computers removed from botnet)'
    },
    {
      id: 5,
      name: 'Add IOT',
      duration: 0,
      weight: 10,
      effects: {
        iot: 0
      },
      text: 'Hacked more new IOT. (New IOT devices added to botnet)'
    },
    {
      id: 6,
      name: 'Remove IOT',
      duration: 0,
      weight: 10,
      effects: {
        iot: 0
      },
      text: 'Some people removed the virus from their IOT devices. (IOT removed from botnet)'
    },
    {
      id: 7,
      name: 'Add Small Servers',
      duration: 0,
      weight: 5,
      effects: {
        serverS: 0
      },
      text: 'Hacked more new Small Servers. (New Small Servers added to botnet)'
    },
    {
      id: 8,
      name: 'Remove Small Servers',
      duration: 0,
      weight: 5,
      effects: {
        serverS: 0
      },
      text: 'Some people removed the virus from their Small Servers. (Small Servers removed from botnet)'
    },
    {
      id: 9,
      name: 'Add Medium Servers',
      duration: 0,
      weight: 5,
      effects: {
        serverM: 0
      },
      text: 'Hacked more new Medium Servers. (New Medium Servers added to botnet)'
    },
    {
      id: 10,
      name: 'Remove Medium Servers',
      duration: 0,
      weight: 5,
      effects: {
        serverM: 0
      },
      text: 'Some people removed the virus from their Medium Servers. (Medium Servers removed from botnet)'
    },
    {
      id: 11,
      name: 'Add Large Servers',
      duration: 0,
      weight: 5,
      effects: {
        serverL: 0
      },
      text: 'Hacked more new Large Servers. (New Large Servers added to botnet)'
    },
    {
      id: 12,
      name: 'Remove Large Servers',
      duration: 0,
      weight: 5,
      effects: {
        serverL: 0
      },
      text: 'Some people removed the virus from their Large Servers. (Large Servers removed from botnet)'
    },
    {
      id: 13,
      name: 'Add Extra Large Servers',
      duration: 0,
      weight: 5,
      effects: {
        serverX: 0
      },
      text: 'Hacked more new Extra Large Servers. (New Extra Large Servers added to botnet)'
    },
    {
      id: 14,
      name: 'Remove Extra Large Servers',
      duration: 0,
      weight: 5,
      effects: {
        serverX: 0
      },
      text: 'Some people removed the virus from their Extra Large Servers. (Extra Large Servers removed from botnet)'
    }
  ],
  tempEvents: [
    {
      id: 0,
      name: 'Increase Computing Power',
      duration: 20000,
      weight: 10,
      effects: {
        computingPower: 0.25
      },
      text: 'Infected another bot network! (Temporary 25% computing power increase)'
    },
    {
      id: 1,
      name: 'Increase Money Gained',
      duration: 10000,
      weight: 10,
      effects: {
        moneyGain: 0.25
      },
      text: 'Successfully manipulated crypto market. (Temporary 25% increase in crypto gained)'
    },
    {
      id: 2,
      name: 'Anti-virus target',
      duration: 9000,
      weight: 5,
      effects: {
        target: 0
      },
      text: ddos.targets[0].text
    },
    {
      id: 3,
      name: 'Government target',
      duration: 9000,
      weight: 5,
      effects: {
        target: 1
      },
      text: ddos.targets[1].text
    },
    {
      id: 4,
      name: 'Software Update',
      duration: 8000,
      weight: 5,
      effects: {
        recurring: function (data) {
          let devices = data.computers.devices;
          for (let i = 0; i < devices.length; i++) {
            devices[i].uninfectable = 1;
            devices[i].hackChanceMult /= 1.0000625;
          }
        }
      },
      text: 'A new software update patches your device exploits and reduces device vulnerability temporarily.'
    }

  ]
};
