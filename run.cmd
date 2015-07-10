@echo off

echo clean npm cache
call npm cache clean

echo update npm packages
call npm update

echo run webpack
call webpack

echo run server
call npm start