/* globals rand */
/* eslint-disable no-unused-vars */

class BackgroundCanvas {
  constructor () {
    this.canvas = null;
    this.context = null;
    this.numbers = [];
    this.backgroundColor = '#FFFFFF';
  }
  init () {
    this.canvas = document.getElementById('backgroundCanvas');
    this.context = this.canvas.getContext('2d');
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();
    this.backgroundColor = window.getComputedStyle(document.body)['background-color'];
    for (let i = 0; i < 10; i++) {
      this.spawnNumber();
    }
  }
  update (gameData) {
    if (document.hidden) {
      return;
    }
    if (gameData.ticks % 3 !== 0) {
      return;
    }
    if (rand(0, 100) <= 3) {
      this.spawnNumber();
    }
    this.alpha(1);
    this.rect(0, 0, this.canvas.width, this.canvas.height, { color: this.backgroundColor });
    for (let number of this.numbers) {
      number.life--;
      if (number.life % 50 === 0 && !number.isTrail) {
        number.number = +!number.number;
      }
      if (number.isTrail) {
        this.alpha(number.life / number.totalLife * 0.3);
      } else {
        this.alpha(0.2);
      }
      number.x += Math.cos(number.angle) * number.speed;
      number.y += Math.sin(number.angle) * number.speed;
      this.text(number.number, number.x, number.y, number.size, { color: '#FF0000' });
    }
    for (let i = this.numbers.length - 1; i >= 0; i--) {
      let number = this.numbers[i];
      if (number.isTrail || number.life % 25 !== 0) {
        continue;
      }
      this.numbers.push({
        number: number.number,
        size: number.size,
        x: number.x,
        y: number.y,
        angle: 0,
        speed: 0,
        life: 60,
        totalLife: 60,
        isTrail: true
      });
    }
    this.numbers = this.numbers.filter(item => item.life > 0);
  }
  spawnNumber () {
    this.numbers.push({
      number: rand(0, 1),
      size: rand(15, 30),
      x: rand(0, this.canvas.width),
      y: rand(0, this.canvas.height),
      angle: rand(0, 360) * Math.PI / 180,
      speed: rand(100, 300) / 100,
      life: rand(100, 500),
      isTrail: false
    });
  }
  text (text, x, y, size, options) {
    options = options || {};
    let font = options.font || 'Arial';
    let color = options.color || '#000000';
    let align = options.align || 'center';
    if (this.context.textBaseline !== 'middle') {
      this.context.textBaseline = 'middle';
    }
    this.context.font = size + 'px ' + font;
    if (this.context.fillStyle !== color) {
      this.context.fillStyle = color;
    }
    if (this.context.textAlign !== align) {
      this.context.textAlign = align;
    }
    this.context.fillText(text, Math.round(x), Math.round(y));
  }
  rect (x, y, width, height, options) {
    options = options || {};
    let color = options.color || '#000000';
    if (this.context.fillStyle !== color) {
      this.context.fillStyle = color;
    }
    this.context.fillRect(x, y, width, height);
  }
  alpha (value) {
    this.context.globalAlpha = value;
  }
  onResize () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = document.documentElement.offsetHeight;
  }
}
