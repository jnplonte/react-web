#!/bin/bash

git reset --hard HEAD
git pull origin master

rm -rf build/
npm run build
