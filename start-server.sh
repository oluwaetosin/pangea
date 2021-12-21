#!/bin/bash
if [ ! -d "/.mysql" ] 
 then 
    mkdir .mysql
fi
docker-compose up