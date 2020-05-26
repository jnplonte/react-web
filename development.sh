#!/bin/bash

git reset --hard HEAD
git pull origin development

rm -rf node_modules/
npm install

rm -rf build/
npm run build
