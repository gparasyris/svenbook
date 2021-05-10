# Svenbook

## Description

This is an orderbook demo app connecting to cryptofacilities websocket API.

## Demo
The app has been deployed and can be found at `https://svenbook.netlify.app/`;

Visit `https://svenbook.netlify.app/dashboards/orderbook-single` to check single widget configuration.

Visit `https://svenbook.netlify.app/dashboards/orderbook-multiple` to check multiple widgets being rendered at the same time.

A switch button has been added at the top right corner to help navigate between the two pre-configured dashboards.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

## How to run
In order to run non-docker version locally, `npm install` is required.
### serve
Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Docker build and serve
Run `npm run docker:all:dev` for a dev docker build & serve. Navigate to `http://localhost:4200/`.
## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Running compodoc

Run `npm run compodoc && npm run show-doc` to prepapre and serve the compodoc files.  Navigate to `http://localhost:8080/` to view them.