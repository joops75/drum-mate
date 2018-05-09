# drum-mate
A manual drum machine where users create sounds by pressing a variety of buttons.

This app was built based on the code at https://github.com/wesbos/Learn-Redux.

After turning the 'device' on by either clicking the 'pow' button or pressing 'p', the user can create sounds by clicking 
on any of the letter keys or by pressing the corresponding keys on the keyboard. A different set of sounds may be loaded 
by clicking the 'set' button or pressing 'o'. The volume may be altered by clicking on and dragging the 'vol' slider or by 
pressing the arrow keys. If multiple sounds are triggered, they will play simultaneously. If the power is turned off, any 
sounds currently playing will be stopped. Any key press whilst powered up will show a message describing the current 
action in the device's display. Button pressing/sliding animations will still run even if the device is turned off.

The app is built using react.js with state management handled by redux.js. Keyboard presses and mouse clicks for the drum 
sound keys are handled by assigning an 'on' or 'off' state to each, which is changed only when a pressed key is de-pressed 
or vice-versa. This prevents the automatic rapid key pressing that is normally triggered when a key is continuously 
pressed down, and also avoids drum-key animation errors when a button is simultaneously clicked and pressed on the 
keyboard. Arrow key presses are not managed this way, so continously pressing one of these results in the movement of the 
volume slider and the adjustment of the volume level.

The sound files were originally provided by the urls in the code at https://codepen.io/freeCodeCamp/pen/MJyNMd. These are 
present in the '\client\data\samples.js' file but are not actually used by the app. Instead, they were re-recorded using 
Audacity and hosted locally in the '\client\data' folder. These files are then referred to in the app using the 
'\client\data\localSamples.js' file.

A single server file is used in the app for both development and production modes. This is achieved by setting the 
process.env.NODE_ENV variable via the scripts in the package.json for various run commands. The better-npm-run package was 
used too achieve this for a cross-platform environment. If this variable is not set ('npm start' is ran), the server file 
configures the app with webpack set to development settings using the 'webpack.config.dev.js' file and serves the 
'index.html' file which renders the produced 'bundle.js' file hosted at '/static/'. If the variable is set to 'production' 
('npm run prod' is ran), the server file avoids using webpack and serves the 'indexProduction.html' file which renders the 
production-mode compiled 'bundle.js' file found in the 'dist' folder. This file is produced by running 'npm run build', 
which constructs it using webpack according to the settings in 'webpack.config.prod.js'. ES6, JSX and SASS code are all 
compiled on the fly whilst in development mode using webpack.

Technologies used in this project:
* node
* express
* html
* sass
* react
* redux
* webpack

Addtional packages of note:
* react-redux
* react-router
* node-sass
* sass-loader
* css-loader
* style-loader
