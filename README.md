# ORH-App front-end component disconnected from the server
This is a repository containing everything required to run the front end component of the ORH app. 
The api has been disconnected so this can be run on an emulator or a phone without the server, but has some 
functionalities and screens that do not work as intended. The purpose of this app is to provide an example
the sort of practical work I can provide and my first project which has contributed meaningfully to a large company

Information on this company can be found here: https://orh.net.au/

To run this code on an emulator or (android) phone follow these steps:

1. Pull the repository into a root directory for the project. 

2. Open a terminal in this root directory and run ```npm i``` to install all the required node modules

3. You will get the following error if you have node version newer than 12.11 and try running the app:
		
		node_modules\metro-config\src\defaults\blacklist.js:38
			return new RegExp(
						 ^
						 SyntaxError: Invalid regular expression
						 
4. To solve this, navigate to the above directory and into the blacklist.js file and change this code:

		var sharedBlacklist = [
			/node_modules[/\\]react[/\\]dist[/\\].*/,
			/website\/node_modules\/.*/,
			/heapCapture\/bundle\.js/,
			/.*\/__tests__\/.*/
		];

into this:

		var sharedBlacklist = [
			/node_modules[\/\\]react[\/\\]dist[\/\\].*/,
			/website\/node_modules\/.*/,
			/heapCapture\/bundle\.js/,
			/.*\/__tests__\/.*/
		];

source: https://stackoverflow.com/questions/58120990/how-to-resolve-the-error-on-react-native-start/58122821#58122821

5. Now to run the program on your phone or an emulator go to the root directory and in the terminal call ```react-native run-android``` 
