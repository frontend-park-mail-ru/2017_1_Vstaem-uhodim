#!/bin/bash

echo "Start deploy.sh..."
docker login --username=_ --password=$(echo $API_KEY) registry.heroku.com
if [[ "$1" = "prod" ]]
then
    echo "ENV: production"
    docker build -t registry.heroku.com/vstaem/web .
    docker push registry.heroku.com/vstaem/web
else
    echo "ENV: development"
    docker build -t registry.heroku.com/vstaem-dev/web .
    docker push registry.heroku.com/vstaem-dev/web
fi
