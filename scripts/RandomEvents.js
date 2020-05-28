/* globals eventDefs weightedSelection EventData ddos updateTargets nwc */
/* eslint-disable no-unused-vars */
const maxTempEvents = 6; // number of active temp events allowed at one time
const noEventChance = 998; // weight for chance of no event per tick: 2998 ~ 1 event per minute
const eventChance = 1; // base weight for event chance

class RandomEvents {
  constructor () {
    this.domCache = {};
    this.permWeights = [];
    this.tempWeights = [];
    this.permEvents = [];
    this.tempEvents = [];
    this.recurringEffects = [];
  }
  checkEvents (gameData) {
    // for each tick, reduce temporary event duration
    let eventList = gameData.eventTempEffects.events;
    for (let i = 0; i < eventList.length; i++) {
      eventList[i].duration -= 1;
    }
    for (let i = 0; i < this.recurringEffects.length; i++) {
      if (this.recurringEffects[i]) {
        this.recurringEffects[i](gameData);
      }
    }
    for (let i = 0; i < eventList.length; i++) {
      // if duration is up, remove event and effect
      if (eventList[i].duration <= 0) {
        this.remEffect(i, gameData);
        eventList.splice(i, 1);
      }
    }
  }
  addEffect (type, index, gameData) {
    if (type === 1) { // type 1 = temporary effect
      let events = gameData.eventTempEffects.events;
      for (let i = 0; i < events.length; i++) {
        // if same effect is already active, do not add.
        if (events.length > 0 && events[i].id === this.tempEvents[index].id) {
          return;
        }
      }
      this.recurringEffects.push(undefined);
      for (let effect in this.tempEvents[index].effects) {
        // add each effect in turn and notify
        this.addTempEffect(effect, this.tempEvents[index].effects[effect], gameData);
        this.randomEventNotify(type, index, gameData);
      }
      // now register temp event to gameData
      this.registerTempEvent(gameData, this.tempEvents[index]);
    } else if (type === 2) { // type 2 = permanent effect
      for (let effect in this.permEvents[index].effects) {
        this.addPermEffect(effect, this.permEvents[index].effects[effect], gameData);
        this.randomEventNotify(type, index, gameData);
      }
    }
  }
  remEffect (index, gameData) {
    let eventEffects = gameData.eventTempEffects.events[index].effects;
    for (let effect in eventEffects) {
      if (effect === 'target') {
        let ddosTargets = gameData.ddos.targets;
        ddosTargets.splice(ddosTargets.findIndex(function (t) {
          return t.id === eventEffects[effect];
        }), 1);
        updateTargets(gameData);
        continue; // dont reverse non numeric effect.
      } else if (effect === 'recurring') {
        if (gameData.eventTempEffects.events[index].id === 4) {
          let devices = gameData.computers.devices;
          for (let i = 0; i < devices.length; i++) {
            if (devices[i].uninfectable) {
              devices[i].hackChanceMult = 1.0;
              devices[i].uninfectable = 0;
            }
          }
        }
        continue;
      }
      let effectValue = -eventEffects[effect]; // reverse the effect and re-add
      this.addTempEffect(effect, effectValue, gameData);
    }
  }
  populateEvents () {
    this.permEvents = eventDefs.permEvents;
    if (Array.isArray(this.permEvents) && this.permEvents.length !== 0) {
      for (let i = 0; i < this.permEvents.length; i++) {
        this.permWeights.push(this.permEvents[i].weight);
      }
    } else {
      // todo return error
    }
    this.tempEvents = eventDefs.tempEvents;
    if (Array.isArray(this.tempEvents) && this.tempEvents.length !== 0) {
      for (let i = 0; i < this.tempEvents.length; i++) {
        this.tempWeights.push(this.tempEvents[i].weight);
      }
    } else {
      // todo return error
    }
  }
  rollEvents (gameData) {
    let index = 0;
    if (gameData.eventTempEffects.events.length < maxTempEvents) { // roll for temporary event if less than 4 are active
      index = weightedSelection([noEventChance, eventChance, eventChance]);
      if (index === 1) { // index 1 = temporary event effects
        this.addEffect(1, weightedSelection(this.tempWeights), gameData);
      } else if (index === 2) { // index 2 = permanent event effects
        this.addEffect(2, weightedSelection(this.permWeights), gameData);
      }
    } else { // otherwise only roll for permanent events
      index = weightedSelection([noEventChance, eventChance * 2]);
      if (index === 1) {
        this.addEffect(2, weightedSelection(this.permWeights), gameData);
      }
    }
  }
  randomEventNotify (type, index, gameData) {
    let message = '';
    if (type === 1) {
      message = 'Random event: ' + this.tempEvents[index].text;
      console.log(message);
    } else if (type === 2) {
      message = 'Random event: ' + this.permEvents[index].text;
      console.log(message);
    }
    gameData.log.messages.push(message);
    gameData.log.lastMessageTime = Date.now();
  }
  addPermEffect (effect, value, gameData) {
    if (effect === 'money') {
      let currentMoney = gameData.money;
      this.addGTEZero(gameData, 'money', 0.1 * currentMoney);
      this.setElement('#money', nwc(Math.floor(gameData.money)));
    } else if (effect === 'iot') {
      let currentIOT = gameData.computers.devices[0].count || 1;
      this.addGTEZero(gameData.computers.devices[0], 'count', Math.ceil(0.1 * (currentIOT)));
      this.setElement('td[data-device="iot"]', gameData.computers.devices[0].count);
    } else if (effect === 'phone') {
      let currentPhones = gameData.computers.devices[1].count || 1;
      this.addGTEZero(gameData.computers.devices[1], 'count', Math.ceil(0.1 * (currentPhones)));
      this.setElement('td[data-device="phone"]', gameData.computers.devices[1].count);
    } else if (effect === 'computer') {
      let currentComputers = gameData.computers.devices[2].count || 1;
      this.addGTEZero(gameData.computers.devices[2], 'count', Math.ceil(0.1 * (currentComputers)));
      this.setElement('td[data-device="computer"]', gameData.computers.devices[2].count);
    } else if (effect === 'serverS') {
      let currentServerS = gameData.computers.devices[3].count || 1;
      this.addGTEZero(gameData.computers.devices[3], 'count', Math.ceil(0.1 * (currentServerS)));
      this.setElement('td[data-device="smallServer"]', gameData.computers.devices[3].count);
    } else if (effect === 'serverM') {
      let currentServerM = gameData.computers.devices[4].count || 1;
      this.addGTEZero(gameData.computers.devices[4], 'count', Math.ceil(0.1 * (currentServerM)));
      this.setElement('td[data-device="mediumServer"]', gameData.computers.devices[4].count);
    } else if (effect === 'serverL') {
      let currentServerL = gameData.computers.devices[5].count || 1;
      this.addGTEZero(gameData.computers.devices[5], 'count', Math.ceil(0.1 * (currentServerL)));
      this.setElement('td[data-device="largeServer"]', gameData.computers.devices[5].count);
    } else if (effect === 'serverX') {
      let currentServerX = gameData.computers.devices[6].count || 1;
      this.addGTEZero(gameData.computers.devices[6], 'count', Math.ceil(0.1 * (currentServerX)));
      this.setElement('td[data-device="massiveServer"]', gameData.computers.devices[6].count);
    }
    this.sumAllDevices(gameData);
    this.updateComputingPower(gameData);
    this.setElement('#computingPower', gameData.computers.devicesOwned);
  }
  addTempEffect (effect, value, gameData) {
    if (effect === 'computingPower') {
      this.addGTEZero(gameData.computers, 'computingPowerMult', value);
      this.updateComputingPower(gameData);
    } else if (effect === 'moneyGain') {
      this.addGTEZero(gameData, 'moneyGainMult', value);
      gameData.moneyGain = gameData.baseMoneyGain * gameData.moneyGainMult;
    } else if (effect === 'target') {
      let target = JSON.parse(JSON.stringify(ddos.targets[value]));
      let length = gameData.ddos.targets.push(target);
      gameData.ddos.targets[length - 1].power = gameData.computers.computingPower * (Math.random() + 0.5);
      updateTargets(gameData);
    } else if (effect === 'recurring') {
      this.recurringEffects[this.recurringEffects.length - 1] = value;
    }
  }
  addGTEZero (dest, property, value) {
    // add value such that sum always >= 0
    if (dest[property] + value < 0) {
      dest[property] = 0;
    } else {
      dest[property] += value;
    }
  }
  sumAllDevices (gameData) {
    let sum = 0;
    for (let i = 0; i < gameData.computers.devices.length; i++) {
      sum += gameData.computers.devices[i].count;
    }
    gameData.computers.devicesOwned = sum;
    return sum;
  }
  registerTempEvent (gameData, event) {
    let newEvent = EventData();
    newEvent.id = event.id;
    for (let effect in event.effects) {
      newEvent.effects[effect] = event.effects[effect];
    }
    newEvent.duration = event.duration;
    gameData.eventTempEffects.events.push(newEvent);
  }

  getElement (selector) {
    this.domCache = this.domCache || {};
    if (!this.domCache[selector]) {
      this.domCache[selector] = document.querySelector(selector);
    }
    return this.domCache[selector];
  }

  setElement (selector, value) {
    let element = this.getElement(selector);
    element.innerHTML = value;
  }

  updateComputingPower (gameData) {
    let basePower = 0;
    for (let i = 0; i < gameData.computers.devices.length; i++) {
      let device = gameData.computers.devices[i];
      basePower += device.count * device.units;
    }
    gameData.computers.baseComputingPower = basePower;
    gameData.computers.computingPower = gameData.computers.computingPowerMult * basePower;
  }
}
