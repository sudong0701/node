#!/bin/sh
cd /var/www/node/original/src/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log