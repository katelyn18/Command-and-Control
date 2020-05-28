/* globals dataModel, localStorage, location, rand */
/* eslint-disable no-unused-vars */

class Engine {
  constructor (options) {
    options = options || {};
    this.tasks = [];
    this.tickNumber = 0;
    this.tickRate = options.tickRate || 20;
    this.tickInterval = null;
    this.lastTick = 0;
    this.tickTimeMissed = 0;

    this.gameData = dataModel;
    this.gameData.seed = rand(1, 100000000);

    this.saveFrequencyMs = options.saveFrequencyMs || 15000;
    this.lastSaveMs = 0;
    this.onLoad = [];
    this.onSave = [];
  }

  registerOnLoad (fcn) {
    this.onLoad.push(fcn);
  }

  registerOnSave (fcn) {
    this.onSave.push(fcn);
  }

  registerTask (fcn) {
    this.tasks.push(fcn);
  }

  tick () {
    let extraTicks = 0;
    if (Date.now() - this.lastTick > this.tickRate) {
      this.tickTimeMissed += Date.now() - this.lastTick - this.tickRate;
      if (this.tickTimeMissed >= this.tickRate) {
        extraTicks += Math.floor(this.tickTimeMissed / this.tickRate);
        this.tickTimeMissed -= extraTicks * this.tickRate;
      }
    }
    this.lastTick = Date.now();
    for (let i = 0; i < Math.min(extraTicks + 1, 10); i++) {
      this.tickNumber++;
      this.gameData.ticks = this.tickNumber;
      for (let task of this.tasks) {
        task(this.gameData);
      }
    }

    if (Date.now() - this.lastSaveMs >= this.saveFrequencyMs) {
      this.save();
      this.lastSaveMs = Date.now();
    }
  }

  run () {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
    }
    this.load();
    this.lastTick = Date.now();
    this.tickInterval = setInterval(this.tick.bind(this), this.tickRate);
  }

  save () {
    for (let task of this.onSave) {
      task(this.gameData);
    }
    localStorage.setItem('CommandAndControl-save', JSON.stringify(this.gameData));
  }

  load () {
    this.gameData = JSON.parse(localStorage.getItem('CommandAndControl-save') || 'false') || this.gameData;
    for (let task of this.onLoad) {
      task(this.gameData);
    }
  }

  reset () {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
    }
    localStorage.removeItem('CommandAndControl-save');
    location.reload();
  }
}
