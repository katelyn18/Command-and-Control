# Tasks

This document will be a running list of TODO items. If a TODO item is unclaimed, write your name to the right of it. Once you have completed it, check the box to the left of the item.

Some TODO items are dependent on other items. Most of these are interwoven in some way. If a separate part is needed to do your part, let everyone know and we can determine the best way to handle that for each case. Sometimes it might make sense for you to make that other part also, or someone else might be working on it already, or you can make your own placeholders until that task is done and then redo yours to fit into that.

**Note: This is not a comprehensive list. There may be things which you encounter as you complete your task which need to be done which aren't on this list. If it's simple to do, add it to your task details and do that also. If not, create a new unassigned task item and detail what needs to be done so someone else can pick it up.** For example: all of this information needs to be displayed on the screen but there isn't a specific task for that. Each task will have some component which involves rendering that info which they should handle as part of their task.

*Check the checkbox once the task is complete.*

## MVP Demo Tasks

- [x] **Game Engine**: Jason
  * Core game loop, helper functions, etc
- [x] **HTML Layout**: Jason
  * Basic layout of the page
  * Responsive design for all sized screens
  * Sections for the various areas of the page: hack button, botnet stats, botnet settings, shop, event log
- [ ] **Basic Components**: Katelyn
  * HTML/CSS/JS for basic components we might need
  * Things like buttons, text elements, collapsible/show/hide menus to display values
  * Scrollable event log area
  * Collapsible botnet stats section
  * Hack button style (and maybe click animation)
  * Botnet setting sliders and value labels (doesn't need to be functional, just needs to look like it does)
  * Other button styles (such as shop buttons, etc)
- [ ] **Hacking Core**: Abhey
  * -- Manual hacking
  * Create a function which will be called upon clicking the button.
  * This function should handle the RNG for determining if you succeed and also which type of computer you hack.
  * -- Automatic hacking
  * This might be the same function with arguments or a different function
  * This should handle hacking done by the botnet. This will take into account the computers that are part of the botnet to determine success and computer type.
- [ ] **Random Events**: Noah
  * Every tick RNG to determine if a random event occurs
  * For this step, you can make up really basic events and log basic messages to the event log
  * Things like *You got 5 new computers* or *10 people cleaned the virus* and then make sure the data actually reflects this change
  * You can make whatever random events you want to test it out so the demo looks cool

## Final Product Tasks

- [x] **Game Engine**: Jason
	* Build the core game engine, the basic data structures and some helper functions
- [x] **HTML Layout**: Jason
	* Design and create a layout for the page
	* Should be responsive and work well on everything from mobile to desktop
	* You don't need to fill the content for each section, placeholders are fine
	* Make sure that everything in the Design.md doc is accounted for and has flexibility to expand with new items
	* Not everything that is needed is listed verbatim, this will be a iterative process as we find a need for new displays and content. Try to build a solid foundation so that it's easy to re-layout as needed throughout the project.
- [ ] **Components**: Katelyn
	* Make reusable HTML components (with their associated CSS/JS) for the various pieces of the game.
	* This includes things like slider bars, buttons, labels, expandable/collapsible detail fields, etc
	* Look through the Design.md doc to see what components might be needed and any behaviors they might have.
	* The CSS/JS associated with a component should be dynamic so regardless of where it's placed or how many there are, it should still function.
	* An example of JavaScript for a component might be: Linked sliders so that all sliders in a slider-group sum to 100%
- [ ] **Hacking Core**: Abhey
	* This system is the core of the hacking component of the game. This piece of code will be called either by manually clicking on the "Hack" button or by the botnet.
	* This handles all of the probabilities of what gets hacked and when
- [ ] **Random Events**: Noah
	* Create the handler which is called on every tick to trigger the random events.
	* Also handle the effects of each random event.
- [ ] **Flavor Text**: ANY/ALL
	* This won't be assigned to anyone so everyone please contribute ideas when you think of them.
	* Creativity is required!
	* This is linked with **Flavor Text Handler**.
	* We need everyone to contribute creative ideas for messages for each type of event. It's better to add more ideas than you think we need and we can trim them down or edit them later.
- [ ] **Flavor Text Handler**: Unassigned
	* Create a list of messages to use for the various events. These messages can have placeholders which will be filled in with exact numbers/values dynamically.
	* You'll also want to create the functions to get a random message on demand which will handle filling in the placeholders and returning the final string.
	* You'll probably also want to also track which ones have been used so they aren't repeated, etc.
- [ ] **Shop**: Noah
	* Handle the list of shop items, their effects, prices and price increases, etc
