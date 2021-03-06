# Addon package for the Alexa Skills Kit SDK

[![Build Status](https://travis-ci.org/taimos/ask-sdk-addon.svg?branch=master)](https://travis-ci.org/taimos/ask-sdk-addon)
![Build Status](https://codebuild.eu-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiZjZqRmZrL3diaXFLZHRFc3pIUERhQ2tGV09IbW5uYStyNTNrT3JkN0NGRHRjRlJsZm1jQk1nNEQ0Y1BQUThYOXJBQ3hJQk5KYlZ2MXpoMGJoWFl0akJ3PSIsIml2UGFyYW1ldGVyU3BlYyI6IkhobTRBUDEwM2JYQWZBeTUiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)
[![npm version](https://badge.fury.io/js/ask-sdk-addon.svg)](https://badge.fury.io/js/ask-sdk-addon)

## Installation

`npm install ask-sdk-addon`

## Features

### Handlers

#### NamedIntentRequestHandler

When creating RequestHandlers you can extend the `NamedIntentRequestHandler` and specify the 
intent name instead of implementing the `canHandle` method.

The following RequestHandler will handle requests for the intents `SomeIntent` and `FoobarIntent`.

```typescript
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

```typescript
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

#### StatefulNamedIntentRequestHandler

If you want different handlers depending on the current state of your skill, you can extend the `StatefulNamedIntentRequestHandler` and specify the 
state and the intent name instead of implementing the `canHandle` method.

The following RequestHandler will handle requests for the intent `SomeIntent` if the session attribute `_STATE` is `myState`.

```typescript
import {StatefulNamedIntentRequestHandler} from 'ask-sdk-addon';

class SomeIntentRequestHandler extends StatefulNamedIntentRequestHandler {
    constructor() {
        super('myState', 'SomeIntent');
    }

    public handle(handlerInput : HandlerInput) : Promise<Response> | Response {
        return null;
    }
}
```

#### AudioPlayerRequestHandler

You can extend the `AudioPlayerRequestHandler` and implement the methods to facilitate the processing of AudioPlayer events.

```typescript
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

```typescript
import {SlotHelper} from 'ask-sdk-addon';

    async handle({requestEnvelope}) {
        const slotHelper = new SlotHelper(requestEnvelope);
        
        let attr = slotHelper.resolveFirstValue('attribute');
        console.log(`Resolution Id: ${attr.id}`);
        
        let value = slotHelper.getValue('attribute');
        console.log(`Slot Value: ${value}`);
        
        // ... more code
    }
```

Using the `isConfirmed` method you can get the confirmation status of the intent and slots.

#### StateHelper

Use the StateHelper to manage a state machine for your Skill's intents. 
Depending on the current state different handlers will be invoked for the same intent.

Create an instance of the StateHelper with `new SlotHelper(handlerInput)`.

You can now call `getCurrentState` to get the current state or `setState(state)` or `clearState()` to set the state for the next invocation.

```typescript
import {StateHelper} from 'ask-sdk-addon';

    async handle(handlerInput) {
        const stateHelper = new StateHelper(handlerInput);

        const current = stateHelper.getCurrentState();
        console.log(`Current state is: ${current}`);

        stateHelper.setState('newState');        
        // ... more code
    }
```

#### ResponseHelper

Use the ResponseHelper to add additional features to skill responses.

Create an instance of the ResponseHelper with `new ResponseHelper(responseBuilder)`.

You can now call the additional methods for enhanced features.

```typescript
import {ResponseHelper} from 'ask-sdk-addon';

    async handle({requestEnvelope, responseBuilder}) {
        const responseHelper = new ResponseHelper(responseBuilder);
        
        responseHelper.speakOneOf(['OutputSpeech 1', 'OutputSpeech 2']);
        
        // ... more code
    }
```

#### DisplayTemplateBuilder

Use the DisplayTemplateBuilder to ease the creation of RenderTemplates for display devices like Echo Show and Echo Spot.

Create an instance of the Builder with `new DisplayTemplateBuilder({type: 'BodyTemplate2'})`.

```typescript
import {DisplayTemplateBuilder} from 'ask-sdk-addon';

if (DisplayTemplateBuilder.isDisplaySupported(handlerInput.requestEnvelope)) {
    const builder : DisplayTemplateBuilder = new DisplayTemplateBuilder({type: 'BodyTemplate2'});
    builder.withToken('superToken').withBackButton().withImage(myImageUrl).withTitle('Template Title');
    builder.withPrimaryRichText('<i>Some Text:</i> Lorem ipsum');
    handlerInput.responseBuilder.addRenderTemplateDirective(builder.getTemplate());
}

```

#### InterfaceHelper

The InterfaceHelper helps you determine which interfaces are supported by the calling device.

```typescript
import {InterfaceHelper} from 'ask-sdk-addon';

InterfaceHelper.isAudioPlayerSupported(requestEnvelope);
InterfaceHelper.isVideoPlayerSupported(requestEnvelope);
InterfaceHelper.isDisplaySupported(requestEnvelope);
```

### Interceptor

#### LogRequestInterceptor

This interceptor logs all incoming requests to the console

```typescript
import {SkillBuilders} from 'ask-sdk';
import {LogRequestInterceptor} from 'ask-sdk-addon';

SkillBuilders.custom().addRequestInterceptors(new LogRequestInterceptor());
```

#### PersistAttributesInterceptor

This interceptor saves the persistent attributes to the data store

```typescript
import {SkillBuilders} from 'ask-sdk';
import {PersistAttributesInterceptor} from 'ask-sdk-addon';

SkillBuilders.custom().addResponseInterceptors(new PersistAttributesInterceptor());
```

#### ProfileInterceptor

These interceptors call the user profile service and populate request attributes

```typescript
import {SkillBuilders} from 'ask-sdk';
import {ProfileInterceptor} from 'ask-sdk-addon';

SkillBuilders.custom().addRequestInterceptors(new TimeZoneInterceptor());
SkillBuilders.custom().addRequestInterceptors(new DistanceUnitsInterceptor());
SkillBuilders.custom().addRequestInterceptors(new TemperatureUnitInterceptor());

handlerInput.attributesManager.getRequestAttributes().timeZone;
handlerInput.attributesManager.getRequestAttributes().temperatureUnit;
handlerInput.attributesManager.getRequestAttributes().distanceUnits;

``` 