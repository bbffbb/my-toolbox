# Angular-Chat
In this assignment, you should write a chat program using AngularJS and Socket.IO.

## Getting Started
Clone the angular-chat repository using git:
```
git clone https://github.com/reginbald/Angular-Chat.git
cd angular-chat
```

### Prerequisites
You must have node.js and its package manager (npm) installed. You can get them from http://nodejs.org/.
Additionally you must have bower globally installed.
```
npm install -g bower
```

### Install Dependencies
Use the Node package manager to get the tools the project depends upon
```
npm install
```
Use the client-side code package manager (bower) to get the frontend dependencies
```
bower install
```

### Build Application
To build the application use the following command
```
gulp
```

### Run the Application
We have preconfigured the project with a simple development web server. The simplest way to start this server is:
```
gulp server
```
Now browse to the app at http://localhost:8000/.

## Developing for the app
Use the following command to watch development folders and rebuild the app
```
gulp watch
```

## Updating the Project

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the frontend dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.
