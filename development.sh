#!/bin/bash

git reset --hard HEAD
git pull origin development

rm -rf build/
npm run build
