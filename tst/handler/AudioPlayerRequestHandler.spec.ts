/*
 * Copyright (c) 2018. Taimos GmbH http://www.taimos.de
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
 */

'use strict';

import {AttributesManagerFactory, HandlerInput, ResponseFactory} from 'ask-sdk-core';
import {RequestEnvelope, Response} from 'ask-sdk-model';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {AudioPlayerRequestHandler} from '../../lib';
import {JsonProvider} from '../mock/JsonProvider';

describe('AudioPlayerRequestHandler', () => {

    class TestHandler extends AudioPlayerRequestHandler {

        public handlePlaybackFailed(handlerInput : HandlerInput) : Promise<Response> | Response {
            return handlerInput.responseBuilder.speak('Failed').getResponse();
        }

        public handlePlaybackFinished(handlerInput : HandlerInput) : Promise<Response> | Response {
            return handlerInput.responseBuilder.speak('Finished').getResponse();
        }

        public handlePlaybackNearlyFinished(handlerInput : HandlerInput) : Promise<Response> | Response {
            return handlerInput.responseBuilder.speak('NearlyFinished').getResponse();
        }

        public handlePlaybackStarted(handlerInput : HandlerInput) : Promise<Response> | Response {
            return handlerInput.responseBuilder.speak('Started').getResponse();
        }

        public handlePlaybackStopped(handlerInput : HandlerInput) : Promise<Response> | Response {
            return handlerInput.responseBuilder.speak('Stopped').getResponse();
        }

    }

    const handler = new TestHandler();

    it('should handle AudioPlayer PlaybackFailed correctly', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const input : HandlerInput = {
            requestEnvelope,
            attributesManager: AttributesManagerFactory.init({
                requestEnvelope,
            }),
            responseBuilder: ResponseFactory.init(),
        };
        input.requestEnvelope.request = {
            type: 'AudioPlayer.PlaybackFailed',
            requestId: null,
            timestamp: null,
            locale: null,
        };

        const expectedResponse = {
            outputSpeech: {
                ssml: '<speak>Failed</speak>',
                type: 'SSML',
            },
        };

        expect(handler.canHandle(input)).equal(true);
        expect(await handler.handle(input)).to.deep.equal(expectedResponse);
    });

    it('should handle AudioPlayer PlaybackFinished correctly', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const input : HandlerInput = {
            requestEnvelope,
            attributesManager: AttributesManagerFactory.init({
                requestEnvelope,
            }),
            responseBuilder: ResponseFactory.init(),
        };
        input.requestEnvelope.request = {
            type: 'AudioPlayer.PlaybackFinished',
            requestId: null,
            timestamp: null,
            locale: null,
        };

        const expectedResponse = {
            outputSpeech: {
                ssml: '<speak>Finished</speak>',
                type: 'SSML',
            },
        };

        expect(handler.canHandle(input)).equal(true);
        expect(await handler.handle(input)).to.deep.equal(expectedResponse);
    });

    it('should handle AudioPlayer PlaybackNearlyFinished correctly', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const input : HandlerInput = {
            requestEnvelope,
            attributesManager: AttributesManagerFactory.init({
                requestEnvelope,
            }),
            responseBuilder: ResponseFactory.init(),
        };
        input.requestEnvelope.request = {
            type: 'AudioPlayer.PlaybackNearlyFinished',
            requestId: null,
            timestamp: null,
            locale: null,
        };

        const expectedResponse = {
            outputSpeech: {
                ssml: '<speak>NearlyFinished</speak>',
                type: 'SSML',
            },
        };

        expect(handler.canHandle(input)).equal(true);
        expect(await handler.handle(input)).to.deep.equal(expectedResponse);
    });

    it('should handle AudioPlayer PlaybackStarted correctly', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const input : HandlerInput = {
            requestEnvelope,
            attributesManager: AttributesManagerFactory.init({
                requestEnvelope,
            }),
            responseBuilder: ResponseFactory.init(),
        };
        input.requestEnvelope.request = {
            type: 'AudioPlayer.PlaybackStarted',
            requestId: null,
            timestamp: null,
            locale: null,
        };

        const expectedResponse = {
            outputSpeech: {
                ssml: '<speak>Started</speak>',
                type: 'SSML',
            },
        };

        expect(handler.canHandle(input)).equal(true);
        expect(await handler.handle(input)).to.deep.equal(expectedResponse);
    });

    it('should handle AudioPlayer PlaybackStopped correctly', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const input : HandlerInput = {
            requestEnvelope,
            attributesManager: AttributesManagerFactory.init({
                requestEnvelope,
            }),
            responseBuilder: ResponseFactory.init(),
        };
        input.requestEnvelope.request = {
            type: 'AudioPlayer.PlaybackStopped',
            requestId: null,
            timestamp: null,
            locale: null,
        };

        const expectedResponse = {
            outputSpeech: {
                ssml: '<speak>Stopped</speak>',
                type: 'SSML',
            },
        };

        expect(handler.canHandle(input)).equal(true);
        expect(await handler.handle(input)).to.deep.equal(expectedResponse);
    });

});
