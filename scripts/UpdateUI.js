/* eslint-disable no-unused-vars */

function updateLog (gameData) {
  let eventLog = document.getElementById('eventLog');
  let log = gameData.log;
  for (let i = 0; i < log.messages.length; i++) {
    let eventDiv = document.createElement('div');
    let timeStamp = new Date(log.lastMessageTime);
    eventDiv.innerText = timeStamp.toLocaleTimeString('en-US') + '  ';
    eventDiv.innerHTML += log.messages[i];
    eventLog.appendChild(eventDiv);
    var scrollHeight = eventLog.scrollHeight;
    eventLog.scrollTo(0, scrollHeight);
  }
  log.messages = [];
  log.lastMessageTime = 0;
}

function updateTargets (gameData) {
  let targetSelect = document.getElementById('botnet-ddos-select');
  let targets = gameData.ddos.targets;
  let selected = targetSelect.selectedIndex;
  if (selected >= targets.length) {
    selected = 0;
  }
  targetSelect.options.length = 0;
  for (let i = 0; i < targets.length; i++) {
    let option = document.createElement('option');
    option.value = targets[i].id;
    option.innerText = targets[i].name;
    targetSelect.appendChild(option);
    targetSelect.selectedIndex = selected;
  }
}
