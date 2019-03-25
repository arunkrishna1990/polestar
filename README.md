# polestar

## Dependencies
Install the following in a new environment:

* Git Tools: https://git-scm.com/downloads
* Node: https://nodejs.org/en/

Run this command to get the global dev dependencies:

> $ npm i -g @angular/cli

## Getting started
First you will need to clone the repo; then you can install the necessary NPM packages and run the app.

```bash
# Clone the repo and enter it
$ git clone https://github.com/arunkrishna1990/polestar.git

# Go to polestar folder
$ cd polestar

# Install UI dependencies
$ cd ui > npm i

# Install Server dependencies
$ cd server > npm i

```
### Run Demo 
```bash
Start Server

$ cd server > npm start

Start UI

$ cd ui > npm start
```

### Run Tests
```bash
Start UI Tests

$ cd ui > npm test

Start Server Tests

$ cd server > npm test
```

## Notes
### Store
I have used NgRX Store pattern to make the page more reactive. Another way this can be achieved is by creating a Service and considering that service as a state store. The components will be pointing to a Subject and whenever a value changes the observers inside the component will be triggered and rendered. Inside the store I am keeping the original profiles and the profiles mapped for filtering. The speciality of the profiles mapped for filtering is that it contains only minimal data needed for the filtering so that when the filteration is happening in memory the data is not large at all when compared with the original source.

### Filteration
This process inside the app is triggered in the form of Actions and the Reducer handles in filtering the data and storing the filtered data. The reason why stored is to show there is another enhancement that could be done for filtering is to apply filter over the filtered data when a new filter is added so that the previous filter condition is not executed again.

The filteration can be done in another way also if the size of the data is increasing. Using Index DB and with the help of an ORM Dexie. The benefit is the data is in the local storage and we can use SQL type queries for filtering the data. 
