#!/bin/sh

printf "\n\n======================================\n"
printf "Making database migrations"
printf "\n======================================\n\n"
export NODE_ENV=development
OPERATION=migrate yarn sequelize

printf "\n\n======================================\n"
printf "Start the application"
printf "\n======================================\n\n"
yarn start:dev

exit 0
