#!/bin/bash

echo "Export aliases to shell session"
echo "You must use \"source\" command for call this script"
alias npm='docker-compose run npm'
alias build='docker-compose run -e NODE_ENV=production webpack'
alias webpack='docker-compose run webpack'
alias wds='docker-compose up wds'