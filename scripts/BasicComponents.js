/* globals leftPad */

// collapse Botnet Stat section
var coll = document.getElementsByClassName('collapsible');
for (let i of coll) {
  i.addEventListener('click', function () {
    this.classList.toggle('active');
    var content = this.nextElementSibling;
    if (content.style.display === 'table') {
      content.style.display = 'none';
      document.getElementById(coll[0].id).innerText = 'Show Stats';
    } else {
      content.style.display = 'table';
      document.getElementById(coll[0].id).innerText = 'Hide Stats';
    }
  });
}

// value of Botnet Settings section
var sliders = document.getElementsByClassName('slide');
var values = document.getElementsByClassName('slider-value');

var available = document.getElementById('available');
var avail = parseInt(available.innerText, 10);
var used = document.getElementById('used');
var use = parseInt(used.innerText, 10);
var beforeVal = [];

function getTotal () {
  var sum = 0;
  for (let i = 0; i < sliders.length; i++) {
    sum += parseInt(sliders[i].value, 10);
  }
  return sum;
}

for (let s = 0; s < sliders.length; s++) {
  values[s].innerHTML = '&nbsp;&nbsp;0';
  beforeVal.push(0);

  sliders[s].addEventListener('input', function (e) {
    var sum = getTotal();
    var target;
    if (sum > 100) {
      target = e.target;
      target.value = target.value - (sum - 100);
      e.preventDefault();
    } else {
      values[s].innerHTML = leftPad(this.value, 3, '&nbsp;');
      var count = this.value - beforeVal[s];

      avail -= count;
      use += count;
      beforeVal[s] = parseInt(this.value, 10);

      available.innerHTML = leftPad(avail.toString(), 3, '&nbsp;');
      used.innerHTML = leftPad(use.toString(), 3, '&nbsp;');
    }
  });
} // jsfiddle.net/EL4tf/
