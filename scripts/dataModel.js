/* eslint-disable no-unused-vars */

// This is just the model for the data. Modify this if you need a new field or different structure, but don't write to this "data" variable. Use the one that is passed into your task function.

const dataModel = {
  ticks: 0,
  seed: 0,
  money: 0,
  moneyGain: 1.0,
  baseMoneyGain: 1.0,
  moneyGainMult: 1.0,
  computers: {
    hackPower: 0.0,
    hackPowerBase: 0.02,
    hackPowerMult: 1.0,
    computingPower: 0.0,
    baseComputingPower: 0.0,
    computingPowerMult: 1.0,
    devicesOwned: 1,
    totalDevices: 7000000000,
    devices: [
      {
        name: 'IoT Devices',
        units: 0.1,
        count: 0,
        vulnChance: 0.5,
        hackChance: 0.0,
        hackChanceBase: 0.4,
        hackChanceMult: 1.0,
        uninfectable: 0
      },
      {
        name: 'Phones',
        units: 0.5,
        count: 0,
        vulnChance: 0.5,
        hackChance: 0.0,
        hackChanceBase: 0.3,
        hackChanceMult: 1.0,
        uninfectable: 0
      },
      {
        name: 'Computers',
        units: 1,
        count: 1,
        vulnChance: 0.5,
        hackChance: 0.0,
        hackChanceBase: 0.15,
        hackChanceMult: 1.0,
        uninfectable: 0
      },
      {
        name: 'Small Servers',
        units: 5,
        count: 0,
        vulnChance: 0.5,
        hackChance: 0.0,
        hackChanceBase: 0.07,
        hackChanceMult: 1.0,
        uninfectable: 0
      },
      {
        name: 'Medium Servers',
        units: 50,
        count: 0,
        vulnChance: 0.5,
        hackChance: 0.0,
        hackChanceBase: 0.05,
        hackChanceMult: 1.0,
        uninfectable: 0
      },
      {
        name: 'Large Servers',
        units: 250,
        count: 0,
        vulnChance: 0.5,
        hackChance: 0.0,
        hackChanceBase: 0.02,
        hackChanceMult: 1.0,
        uninfectable: 0
      },
      {
        name: 'Massive Servers',
        units: 1500,
        count: 0,
        vulnChance: 0.5,
        hackChance: 0.0,
        hackChanceBase: 0.01,
        hackChanceMult: 1.0,
        uninfectable: 0
      }
    ]
  },
  shop: {
    items: {}
  },
  ddos: {
    targets: []
  },
  eventTempEffects: {
    events: []
  },
  log: {
    messages: [],
    lastMessageTime: 0
  }
};
