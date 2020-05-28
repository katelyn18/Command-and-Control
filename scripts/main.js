/* globals Engine, MapHandler, BackgroundCanvas, RandomEvents, HackingTasks, ShopHandler, updateLog updateTargets */

// Example and Engine documentation in `demoMain.js`

const engine = new Engine();
const mapHandler = new MapHandler();
const shopHandler = new ShopHandler();
const backgroundCanvas = new BackgroundCanvas();
const randomEvents = new RandomEvents();
const hackingTasks = new HackingTasks();

engine.registerOnLoad(backgroundCanvas.init.bind(backgroundCanvas));
engine.registerOnLoad(mapHandler.init.bind(mapHandler));
engine.registerOnLoad(shopHandler.addEventHandlers.bind(shopHandler));
engine.registerOnLoad(randomEvents.populateEvents.bind(randomEvents));
engine.registerOnLoad(hackingTasks.addEventHandlers.bind(hackingTasks));
engine.registerOnLoad(updateTargets);

engine.registerTask(backgroundCanvas.update.bind(backgroundCanvas));
engine.registerTask(mapHandler.update.bind(mapHandler));
engine.registerTask(randomEvents.checkEvents.bind(randomEvents));
engine.registerTask(randomEvents.rollEvents.bind(randomEvents));
engine.registerTask(hackingTasks.runTasks.bind(hackingTasks));
engine.registerTask(updateLog);

engine.run();
