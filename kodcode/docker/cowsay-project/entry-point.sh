#!/bin/sh

# Set the default port to 8080 if no argument is provided
PORT=${1:-8080}
PORT=6060

# Start your Cowsay server
npm install
export PORT=$PORT
npm start

