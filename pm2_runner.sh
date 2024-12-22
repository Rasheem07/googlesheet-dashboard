#!/bin/bash
if ! type pm2 > /dev/null
then
  sudo npm install -g pm2 && pm2 start nextjs-app 
else
  pm2 restart nextjs-app
fi