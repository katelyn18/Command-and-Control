/* eslint-disable no-eval */

(function () {
  var container = document.createElement('div');
  container.style.background = '#999999';
  container.style.width = '600px';
  container.style.maxWidth = '85vw';
  container.style.left = '50%';
  container.style.top = '50%';
  container.style.transform = 'translate(-50%, -50%)';
  container.style.webkitTransform = 'translate(-50%, -50%)';
  container.style.textAlign = 'center';
  container.style.fontSize = '25px';
  container.style.position = 'fixed';
  container.style.boxShadow = '0px 0px 100px #999999';
  container.style.borderRadius = '60px';
  container.style.border = '1px solid black';
  container.style.zIndex = 2147483646;
  var message = document.createElement('p');
  message.style.color = '#690000';
  message.style.fontWeight = 'bold';
  message.style.padding = '20px';
  message.innerText = 'Your browser does not support JavaScript features which are required for this page to function.\nPlease visit this page on a modern browser. (Recommended: Chrome or Firefox)';
  container.appendChild(message);

  var errorTimeout = setTimeout(function () {
    if (document.readyState === 'complete') {
      document.body.appendChild(container);
    } else {
      window.addEventListener('load', function () {
        document.body.appendChild(container);
      });
    }
  }, 3000);

  try {
    eval('class ES6Test {}');
    eval('const es6Test = (x = 3, ...y) => 6;');
    eval('new Promise((resolve, reject) => { resolve(); }).then(() => { 0; }).finally(() => { 0; });');
    eval('let es6TestArr = [1,2,3]; es6TestArr.map(item => item-1); es6TestArr.includes(1);');
    clearTimeout(errorTimeout);
  } catch (e) {
    console.error('Unsupported ES6 Error:', e);
  }
})();
