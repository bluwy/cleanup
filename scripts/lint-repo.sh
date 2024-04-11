#!/bin/bash

# $1 should "org-name/repo-name", e.g. `bash lint-repo.sh bluwy/cleanup`

# get the name after the slash and prepend "repos/"
REPO_DIR_NAME="repos/$(echo $1 | cut -d'/' -f2)"

if test -d $REPO_DIR_NAME; then
  echo "Repo already exists, pulling latest changes..."
  cd $REPO_DIR_NAME
  git pull
else
  echo "Cloning repo..."
  git clone https://github.com/$1.git --depth=1 $REPO_DIR_NAME
  cd $REPO_DIR_NAME
fi

echo "Linting..."
node ../../src/index.js $2
