### CHANGELOG

## v0.0.4

* **Remove**
  - ```vendor``` path: ***dist*** has no vendor and vendor of ***src*** are in ```bower_components```, this don't included in repo, as good practice.
  - ```css``` files in ***src*** path: use only ```scss```
  - ```assets``` dir of ***src*** and ***dist***: use this only in ```demo``` path
  - ```copy:{distVendor, distFonts, distHtml, distJs, distImages, distPages, distCss}``` **Grunt**  task

* **Change**
  - ```load-grunt-tasks``` -> ```matchdep```: for load all ***grunt tasks***
  - ```overthrow-dist``` -> ```overthrow```: library for good use with bower
  - ```dist``` task: include ```dist-js``` and ```dist-css``` tasks
  - ```grunt-sass``` -> ```grunt-contrib-compass```: because this, *config.rb* isn't necessary

* **Add**
  - ```grunt-banner``` with ```usebanner``` task: for ***js*** and ***css*** dist files
  - http://fastgap.mobi/ as ***homepage***: in ```package.json```
  - ```dist-js``` task: with ```concat``` and ```uglify``` tasks
  - ```dist-css``` task: with ```sass``` *compressed* mode
  - ```~Controllers.js``` are in ```fastgap.controllers.js``` with ```~.min.js``` version
  - libraries: ***zepto***, ***fastclick***, ***overthrow*** and ***snap*** are in ```fastgap.libs.js``` with ```~.min.js``` version
  - ```fastgap.core.js``` is ***History.js***, ***FG.js***, ***Navigator.js***, ***Transition.js***, ***PageLoad.js***, and ***index.js*** also containing ```~.min.js``` version
  - ```fastgap.js``` or ```fastgap.min.js```containing *all* ***js*** src
  - ```demo``` path with a **FastGap** example project ready to run
  - ```clean``` **Grunt** task: for clear ***dist*** files and rebuild with *banner*
