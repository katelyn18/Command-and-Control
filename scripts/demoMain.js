/* globals Engine */

const engine = new Engine();

// For each of these register functions, you can pass in as many functions as you'd like. They'll all be executed in the order you called register.

// Called when the game first starts and the previous save file is loaded
// Your function will be called with 1 argument, "gameData"
engine.registerOnLoad(demoOnLoad);

// Register a function to be called on every tick.
// Your function will be called with 1 argument, "gameData"
engine.registerTask(demoTask);

// Called right before the save file is saved
// Your function will be called with 1 argument, "gameData"
engine.registerOnSave(demoOnSave);

// Called last which loads and starts the game
engine.run();

// If you screwed up a save file or changed the dataModel, type `engine.reset()` in the browser console and it'll delete your save and refresh the page.

function demoTask (gameData) {
  console.log('This will be run every tick');
  console.log('The current tick number is:', gameData.ticks);
  if (gameData.ticks % 100 === 0) {
    console.log('You are starting with', gameData.money, 'dollars');
  }
}

function demoOnLoad (gameData) {
  console.log('The saved game is loading');
  console.log('Pre-process any data you need to setup');
}

function demoOnSave (gameData) {
  console.log('The game is about to be saved!');
  console.log('Cleanup any data you need before the "gameData" object is serialized');
}
