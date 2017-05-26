#!/bin/bash

echo "Start deploy.sh..."
docker login --username=_ --password=$(echo $API_KEY) registry.heroku.com
echo "Deploy app: $1"
docker build -t registry.heroku.com/$1/web .
docker push registry.heroku.com/$1/web
