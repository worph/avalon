#!/bin/bash

# Ports configuration
#export HTTP_PORT=3001
#export P2P_PORT=6001

# MongoDB configuration
export ENV DB_NAME='avalon'
export ENV DB_URL='mongodb://10.5.0.6:27017'

# Peering configuration
#export OFFLINE=1
#export NO_DISCOVERY=1

# trace / debug / info / warn /
export LOG_LEVEL=debug

# default peers to connect with on startup
#export PEERS=ws://api.avalon.wtf:6001,ws://avalon.nannal.com:6001,ws://82.66.109.22:6001

# your user and keys (only useful for active node owners)
export NODE_OWNER=master
export NODE_OWNER_PUB=eLzHSXuEp9mSc6wApDR5WZZJmFFq6WqXzAW6XbThaKF3
export NODE_OWNER_PRIV=52JVpRs16ybfkAAQYL78MqePzHJ7VYdPXLMLsiNKF3jf
npm start
