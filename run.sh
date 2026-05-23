#!/usr/bin/env bash

# Default port for Next.js development server
PORT=3000

# Find and kill any process using the port
if lsof -i tcp:$PORT > /dev/null 2>&1; then
  PID=$(lsof -ti tcp:$PORT)
  echo "Killing process $PID on port $PORT"
  kill -9 $PID
else
  echo "No process running on port $PORT"
fi

# Start the Next.js development server
npm run dev
