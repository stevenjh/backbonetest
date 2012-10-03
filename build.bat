rem build executable for sample app

cd c:\dev\js\backbonetest\release
del *.* /Q

cd\
cd c:\dev\js\backbonetest

node ../commonTools/r.js -o src/js/app.build.js

pause