# Baldur

Prior to following below steps you must ensure that you have nodejs installed, open your terminal and write 'node -v' if you get a version nummber back then you have nodejs installed. Npm should be installed with nodejs, but if you want to be sure you can check with 'npm -v' as well.

Steps:
1. Setup a localhost environment with a fresh Joomla install
2. Download and extract the repo into your template folder of your local Joomla install - you should not be able to "discover" the template in Joomla backend. Do so and set template as standard.
3. Open your terminal, cd into to the folder you extracted this repo in, should be "project/template/baldur"
4. Enter "npm install" - it will now install all the needed dependencies(node modules) that is stated in the package.json file 
5. When step 4 is done, you should be able to run the different tasks - start of compiling bootstrap by writing: 'gulp boot-sass'
6. When you are done compiling bootstrap you can move the fonts you are going to use from staging to dist folder, do so by running: 'gulp fonts'
6. We are now ready to run the watch task: 'gulp watch' - this will fire up a new tab in your browser with the site in it and it will be ready to refresh whenever you are changing anything in scss/php/js/image files


