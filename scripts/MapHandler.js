/* globals mapSvg, SeededRandom */
/* eslint-disable no-unused-vars, no-global-assign */

class MapHandler {
  constructor () {
    this.mapDots = [];
    this.SRNG = null;
    this.devicesOwned = 0;
    this.ownedPercent = 0;
    this.nextDot = 0;
  }
  init (gameData) {
    let classList = document.querySelector('.world-map-container').children[0].classList;
    document.querySelector('.world-map-container').children[0].outerHTML = mapSvg;
    document.querySelector('.world-map-container').children[0].classList = classList;
    mapSvg = '';
    this.SRNG = new SeededRandom(gameData.seed);
    this.mapDots.push(...document.querySelectorAll('.world-map circle'));
    this.shuffleDots();
  }
  shuffleDots () {
    let item;
    let index;
    for (let i = this.mapDots.length - 1; i >= 0; i--) {
      index = this.SRNG.rand(0, i);
      item = this.mapDots[i];
      this.mapDots[i] = this.mapDots[index];
      this.mapDots[index] = item;
    }
  }
  update (gameData) {
    if (gameData.computers.devicesOwned !== this.devicesOwned) {
      this.devicesOwned = gameData.computers.devicesOwned;
      let realPercent = gameData.computers.devicesOwned / gameData.computers.totalDevices;
      this.ownedPercent = 1.061 - 1.060659 * Math.pow(Math.E, -3.310108 * realPercent);
      while (this.ownedPercent > this.nextDot / this.mapDots.length && this.nextDot < this.mapDots.length) {
        this.mapDots[this.nextDot].classList.add('map-owned');
        this.nextDot++;
      }
    }
  }
}
