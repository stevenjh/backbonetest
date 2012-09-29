rem build executable for sample ap

rem set folder space
rem cd /D h:\gis_web\dev_js

rem node H:/GIS_Web/dev_js/commonTools/r.js -o C:/dev/js/backbonetest/src/js/app.build.js


rem execture r.js against build script
node C:/dev/js/commonTools/r.js -o src/js/app.build.js


rem copy files to diamondtooth - folders, overwrite, quite
xcopy C:\dev\js\backbonetest\release C:\inetpub\wwwroot\js\backbonetest /E /Y /Q
xcopy C:\dev\js\backbonetest\src C:\inetpub\wwwroot\js\backbonetestsrc /E /Y /Q

pause