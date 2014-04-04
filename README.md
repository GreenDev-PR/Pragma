Pragma
======

[![Build Status](https://travis-ci.org/GreenDev-PR/Pragma.png?branch=master)](https://travis-ci.org/GreenDev-PR/Pragma)

##Description

Pragma is a web application designed to provide irrigation management services to farmers. Additionally, it provides registered agricultural scientists access to Puerto Rico wide hydro-climate data. Primarily, Pragma provides farmers with the proper amount of water to irrigate their crops. This service is possible because Pragma keeps track of your crop’s growth stage, irrigation history, your farm’s geographical location, and collects the previously mentioned hydro-climate data daily from the GOES satellite and NEXRAD radar. Pragma employs agricultural engineering methodologies and algorithms for crop water requirement calculations. Pragma is available for both mobile and desktop use.

## Prerequisites

* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm.
* Grunt - [grunt-cli](http://gruntjs.com/getting-started)
* Make sure you install grunt-cli globally using `npm install -g grunt-cli`.

## Quick Install

 The quickest way to get started with Pragma is to utilize it like this:

  Clone & Run:

    git clone https://github.com/GreenDev-PR/Pragma.git
    cd Pragma
    npm install && bower install
    grunt

  We recommend using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:

    grunt

  Then open a browser and go to:

    http://localhost:9000

## Configuration

  All configuration is specified in the [config](config/) folder, particularly the [config.js](config/config.js) file.

### Environmental Settings

  To run with a different environment, just specify NODE_ENV as you call grunt:

    $ NODE_ENV=test grunt

## Code Style

  We enforce the following general settings:

    indent_style = space
    indent_size = 2
    continuation_indent_size = 4
    end_of_line = lf
    charset = utf-8
    trim_trailing_whitespace = true
    insert_final_newline = true


  We use the following JavaScript [Style Guide](http://goo.gl/b3LFBH) as our JS coding standards.

## Contributing

  TODO: Specify commiting rules and format.
