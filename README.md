# Interrupted Events Playground

This project demonstrates browser behavior where handlers for certain browser events, such as `pagehide` can be interrupted (i.e. the handlers never called) if a previous handler modifies the DOM.

For more details [see it running live](https://astegmaier.github.io/playground-interrupted-events/).

## Running Locally

1. Clone this repo by running `git clone https://github.com/astegmaier/playground-interrupted-events.git`
2. Change into the directory by running `cd playground-interrupted-events`
3. Ensure [nodejs](https://nodejs.org/en/) is installed.
4. Run `npx http-server` to start a local server. You can also install `http-server` globally by running `npm install -g http-server` and then running `http-server` directly.
5. Open `http://localhost:8080/` in your browser.
