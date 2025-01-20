# Web Cli

A CLI for the webbrowser.\
You can add Commands which you can execute.\
You can use text outputs and the js browser APIs.

There are a bunch of commands implemented to show the capabilities. (look at the Functionality section)

![](.img/help.png)

## built with

- React

## Functionality

### CLI

![](.img/init.png)

### help

The help command reads all registred commands and displays the name, description and usage privided by each registred command.

![](.img/help.png)

### echo

The echo command echoes the arguments to the console.

![](.img/echo.png)

### alert

The alert command alerts the arguments (browser api).

![](.img/alert.png)

### joke

The joke command fetches (async) a random joke from https://icanhazdadjoke.com/ and displays it in the console

![](.img/joke.png)

### open

The open command opens a url in a new tab or new window.

![](.img/open.png)

### time

The time command displays the current time.

![](.img/time.png)

## Register commands

1. create a command class extending AbstractCommand
   - It needs the strings name, description and usage, optionaly the showCommand attribute.

![](.img/commandExample.png)

2. Register the command in the commandHandler.ts

![](.img/registercommand.png)

## Video

TODO:
