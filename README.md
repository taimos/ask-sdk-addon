# Addon package for the Alexa Skills Kit SDK

[![Build Status](https://travis-ci.org/taimos/ask-sdk-addon.svg?branch=master)](https://travis-ci.org/taimos/ask-sdk-addon)
[![npm version](https://badge.fury.io/js/ask-sdk-addon.svg)](https://badge.fury.io/js/ask-sdk-addon)

## Installation

`npm install ask-sdk-addon`

## Features

### Handlers

#### NamedIntentRequestHandler

When creation RequestHandler you can extend the `NamedIntentRequestHandler` and specify the 
intent name instead of implementing the `canHandle` method.

The following RequestHandler will handle requests for the intents `SomeIntent` and `FoobarIntent`.

```javascript
import {NamedIntentRequestHandler} from 'ask-sdk-addon';

class SomeIntentRequestHandler extends NamedIntentRequestHandler {
    constructor() {
        super('SomeIntent', 'FoobarIntent');
    }

    public handle(handlerInput : HandlerInput) : Promise<Response> | Response {
        return null;
    }
}
```

The following RequestHandler will handle LaunchRequests.

```javascript
import {NamedIntentRequestHandler} from 'ask-sdk-addon';

class LaunchRequestHandler extends NamedIntentRequestHandler {
    constructor() {
        super('LaunchRequest');
    }

    public handle(handlerInput : HandlerInput) : Promise<Response> | Response {
        return null;
    }
}
```

#### AudioPlayerRequestHandler

You can extend the `AudioPlayerRequestHandler` and implement the methods to facilitate the processing of AudioPlayer events.

```javascript
import {AudioPlayerRequestHandler} from 'ask-sdk-addon';

class TestHandler extends AudioPlayerRequestHandler {

    public handlePlaybackFailed(handlerInput : HandlerInput) : Promise<Response> | Response {
         // Handle event
    }

    public handlePlaybackFinished(handlerInput : HandlerInput) : Promise<Response> | Response {
         // Handle event
    }
    
    public handlePlaybackNearlyFinished(handlerInput : HandlerInput) : Promise<Response> | Response {
         // Handle event
    }

    public handlePlaybackStarted(handlerInput : HandlerInput) : Promise<Response> | Response {
         // Handle event
    }

    public handlePlaybackStopped(handlerInput : HandlerInput) : Promise<Response> | Response {
         // Handle event
    }

}
```

### Helper

#### SlotHelper

Use the SlotHelper to get slot values or entity resolutions from slots.

Create an instance of the SlotHelper with `new SlotHelper(requestEnvelope)`.

You can now call `getValue` or `resolveFirstValue` to get appropriate slot values.