#!/bin/bash
cd ./angular-app/
ng build --prod
cd ..
cp -r ./angular-app/dist/ensemble/* ./project/src/main/webapp/
cd ./project/
mvn clean package appengine:stage
cd ..
cp app.yaml ./project/target/appengine-staging/app.yaml
cd ./project/target/appengine-staging/
gcloud app deploy --project music-collab-280719
