# Baldur

Steps:
1. Download and extract/clone repo - into your template folder of your local Joomla install
2. Install Nodejs - https://nodejs.org/
3. Open CMD/Terminal - and change directory to the folder you extracted this repo in, should be "project/template/baldur"
4. Enter "npm install" - it will now install all the npm modules
5. When step 4 is done, you should be able to run the different tasks - start of compiling bootstrap by writing: 'gulp boot-sass'
6. When you are done compiling bootstrap you can move the fonts you are going to use from staging to dist folder, do so by running: 'gulp fonts'
6. When fonts are moved we are ready to run the watch task: 'gulp watch' 
