/* globals weightedSelection clamp updateTargets nwc */
/* eslint-disable no-unused-vars */

class HackingTasks {
  constructor () {
    this.domCache = {};
    this.hackSlider = 0;
    this.miningSlider = 0;
    this.ddosSlider = 0;
    this.vulnSlider = 0;
    this.deviceWeights = [40, 30, 15, 7, 5, 2, 1];
    this.hackEffect = 1.0;
  }

  addEventHandlers (gameData) {
    this.getElement('#hackBtn').addEventListener('click', () => { this.hackButton(gameData); });
  }

  hackButton (gameData) {
    if (this.hackEffect >= Math.random()) {
      this.updateHackPower(gameData);
      let device = weightedSelection(this.deviceWeights);
      let numberAdded = Math.ceil(gameData.computers.hackPower * gameData.computers.devices[device].count + 1);
      gameData.computers.devices[device].count += numberAdded;
      this.updateComputingPower(gameData);
      this.updateDevices(gameData);
      this.hackEffect /= 1.003; // drops from 100% to 5% over 1000 button presses
    }
    if (this.hackEffect <= 0.05) {
      this.hackEffect = 0.05;
    }
  }

  runTasks (gameData) {
    this.getSliderValues();
    this.hackTask(gameData);
    this.miningTask(gameData);
    this.ddosTask(gameData);
    this.vulnTask(gameData);
  }

  hackTask (gameData) {
    if (this.hackSlider > 0) {
      this.updateHackChance(gameData);
      this.updateHackPower(gameData);
      let base = 1.357e-10;
      // 0.05 is the base chance for hacking, when computingPower is 0
      let chance = (this.hackSlider / 100) * (0.05 + base * gameData.computers.computingPower);
      if (chance >= Math.random()) {
        let randVal = Math.random();
        let devices = gameData.computers.devices;
        for (let i = 0; i < gameData.computers.devices.length; i++) {
          if (devices[i].hackChance >= randVal) {
            // add 1% of current device count in that category. Min 1.
            let numberAdded = Math.floor(devices[i].count * 0.01) || 1;
            devices[i].count += numberAdded;
          }
        }
        this.updateComputingPower(gameData);
        this.updateDevices(gameData);
      }
    }
  }

  miningTask (gameData) {
    if (this.miningSlider > 0) {
      this.updateMoneyGain(gameData);
      let scalingFactor = 0.001;
      let money = (this.miningSlider / 100) * gameData.moneyGain * scalingFactor || 1;
      gameData.money += money;
      if (gameData.ticks % 30 === 0) {
        this.setElement('#money', nwc(Math.floor(gameData.money)));
      }
    }
  }

  ddosTask (gameData) {
    if (gameData.ddos.targets.length > 0) {
      let power = gameData.computers.computingPower;
      let targets = gameData.ddos.targets;
      let targetsSelector = this.getElement('#botnet-ddos-select');
      let targetIndex = targetsSelector.selectedIndex;
      for (let i = 0; i < targets.length; i++) {
        let effect = (i === targetIndex) // If item is the selected target, add ddos slider value to effect calc.
          ? (1 - clamp(((this.ddosSlider / 100) * power) / targets[i].power, 0, 1)) * targets[i].influence
          : (1 - clamp(power / targets[i].power, 0, 1)) * targets[i].influence;
        if (i === targetIndex) {
          if (effect === 0) { // Check if target is overwhelmed by DDOS attack
            if (targets[i].inactiveTicks === 0) { // If target was active last turn
              targets[i].inactiveTicks = gameData.ticks; // Set start inactive tick to current ticks
            } else { // otherwise check if target has been inactive for 2 minutes ~3600 ticks
              if (gameData.ticks - targets[i].inactiveTicks > 3600) { // if so, remove target
                gameData.log.messages.push(targets[i].failText);
                gameData.log.lastMessageTime = Date.now();
                targets.splice(i, 1);
                // find and remove the event early from events list.
                let targetEvents = gameData.eventTempEffects.events;
                targetEvents.splice(targetEvents.findIndex(function (e) {
                  return 'target' in e.effects &&
                  e.effects.target === targetsSelector.options[targetIndex].value;
                }), 1);
                updateTargets(gameData);
              }
            }
          } else { // ddos does not overwhelm target, so set target to active again
            targets[i].inactiveTicks = 0;
          }
        } else { // i is not target index
          targets[i].inactiveTicks = 0;
        }

        if (effect > Math.random()) { // apply effect
          let devices = gameData.computers.devices;
          for (let j = 0; j < devices.length; j++) {
            // remove 10% from hackChanceMult on success. Min 1% multiplier.
            devices[j].hackChanceMult = clamp((devices[j].hackChanceMult - 0.10), 0.01, 100);
          }
          this.updateHackChance(gameData);
        }
      }
    }
  }

  vulnTask (gameData) {
    if (this.vulnSlider > 0) {
      let devices = gameData.computers.devices;
      for (let i = 0; i < devices.length; i++) {
        let nextVuln = clamp(devices[i].vulnChance * this.vulnSlider * devices[i].count, 0, 100) / 100;
        if (nextVuln >= Math.random()) {
          devices[i].hackChanceMult += 0.10;
          devices[i].vulnChance /= 100; // Divide chance by 100 on every success
          if (devices[i].uninfectable) { // check if antivirus is affecting vuln and remove flag
            devices[i].uninfectable = 0;
            let eventsList = gameData.eventTempEffects;
            for (let i = 0; i < eventsList.length; i++) {
              if (eventsList[i].id === 4) {
                eventsList[i].duration = 0;
              }
            }
          }
          let message = 'Vulnerability discovered for: ' + devices[i].name;
          gameData.log.messages.push(message);
          gameData.log.lastMessageTime = Date.now();
        }
      }
      this.updateHackChance(gameData);
    }
  }

  getSliderValues () {
    this.hackSlider = this.getElement('#botnet-hack').value;
    this.miningSlider = this.getElement('#botnet-mine').value;
    this.ddosSlider = this.getElement('#botnet-ddos').value;
    this.vulnSlider = this.getElement('#botnet-research').value;
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

  updateMoneyGain (gameData) {
    gameData.baseMoneyGain = gameData.computers.computingPower;
    gameData.moneyGain = gameData.baseMoneyGain * gameData.moneyGainMult;
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

  updateHackPower (gameData) {
    gameData.computers.hackPower = gameData.computers.hackPowerBase * gameData.computers.hackPowerMult;
  }

  updateHackChance (gameData) {
    let devices = gameData.computers.devices;
    for (let i = 0; i < gameData.computers.devices.length; i++) {
      devices[i].hackChance = devices[i].hackChanceBase *
      devices[i].hackChanceMult;
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

  updateDevices (gameData) {
    this.sumAllDevices(gameData);
    this.setElement('#computingPower', nwc(gameData.computers.devicesOwned));
    this.setElement('td[data-device="iot"]', nwc(gameData.computers.devices[0].count));
    this.setElement('td[data-device="phone"]', nwc(gameData.computers.devices[1].count));
    this.setElement('td[data-device="computer"]', nwc(gameData.computers.devices[2].count));
    this.setElement('td[data-device="smallServer"]', nwc(gameData.computers.devices[3].count));
    this.setElement('td[data-device="mediumServer"]', nwc(gameData.computers.devices[4].count));
    this.setElement('td[data-device="largeServer"]', nwc(gameData.computers.devices[5].count));
    this.setElement('td[data-device="massiveServer"]', nwc(gameData.computers.devices[6].count));
  }
}
