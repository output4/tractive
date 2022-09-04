# Test task for Tractive

**Author:** Roman Nevstruev

**Task:** Create video player component

**Description:**
I made the component on vanilla js, without using any third-party libraries.
I use gulp for build project, less for css.

**Installation:**
npm install
cd ./dist and open index.html in browser

**Project structure:**

./src/ts - typescript source files

./src/ts/player.ts - Main component of video player

./src/ts/commands.ts - Class-controller for commands

./src/ts/commands/* - Folder with commands files

./src/webfonts - Font awesome icons form buttons

./src/less - less files

./dist - folder for compiled files


**Api component:**

    new TractivePlayer(container, config)
|Option|Type|Description|
|--|--|--|
|container|HTMLElement|html element when will install component|
|config|object|json object with configuration|
|config.url|string|url to video|
|config.poster|string|url to poster for video|
|config.autoplay|boolean|flag for auto play video when component installed|
|config.nativeCommands|boolean|flag for enable/disable native browser player commands|
|config.devMode|boolean|flag for enable dev mode for component|
|config.commands|string[]|array of commands|
|config.size|object|object for configuring sizes|
|config.size.width|number|size of pixels|
|config.size.height|number|size of pixels|

**Available config.commands**
|Command|Description|
|--|--|
|play|Play/pause button|
|fullscreen|Fullscreen button|
|volume|volume slider|
|download|Button for download video|
|timer|Field for time and duration display|
|progress|Progress bar for display progress line|
|mute|Mute/Unmute button|