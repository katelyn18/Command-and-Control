/* eslint-disable no-unused-vars */

function rand (min, max) {
  min = parseInt(min, 10);
  max = parseInt(max, 10);
  if (max < min) {
    let temp = max;
    max = min;
    min = temp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function weightedSelection (weights) {
  var weightSum = 0;
  for (let i = 0; i < weights.length; i++) {
    weightSum += weights[i];
  }

  var randVal = Math.random() * weightSum;

  for (let i = 0; i < weights.length; i++) {
    randVal -= weights[i];
    if (randVal < 0) return i;
  }
}

function nwc (x) {
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function randFromList (list) {
  return list[rand(0, list.length - 1)];
}

function shuffle (arr) {
  let item;
  let index;
  for (let i = arr.length - 1; i >= 0; i--) {
    index = rand(0, i);
    item = arr[i];
    arr[i] = arr[index];
    arr[index] = item;
  }
}

function isDefined (obj) {
  return typeof obj !== 'undefined';
}

function clamp (x, min, max) {
  return Math.min(Math.max(x, min), max);
}

function leftPad (str, length, padChar) {
  for (let i = str.length; i < length; i++) {
    str = padChar + str;
  }
  return str;
}

class SeededRandom {
  constructor (seed) {
    this.seed = parseInt(seed + 1, 10) % 2147483647;
  }
  rand (min, max) {
    this.seed = this.seed * 16807 % 2147483647;
    let float = (this.seed - 1) / 2147483646;
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    if (max < min) {
      let temp = max;
      max = min;
      min = temp;
    }
    return Math.floor(float * (max - min + 1)) + min;
  }
}
