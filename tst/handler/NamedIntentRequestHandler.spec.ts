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
import {Response} from 'ask-sdk-model';
import {expect} from 'chai';
import {NamedIntentRequestHandler} from '../../lib/handler/NamedIntentRequestHandler';
import {JsonProvider} from '../mock/JsonProvider';

describe('NamedIntentRequestHandler', () => {

    class LaunchRequestHandler extends NamedIntentRequestHandler {
        constructor() {
            super('LaunchRequest');
        }

        public handle(handlerInput : HandlerInput) : Promise<Response> | Response {
            return null;
        }
    }

    class SomeIntentRequestHandler extends NamedIntentRequestHandler {
        constructor() {
            super('SomeIntent', 'FoobarIntent');
        }

        public handle(handlerInput : HandlerInput) : Promise<Response> | Response {
            return null;
        }
    }

    it('should return correct canHandle value for launchHandler on LaunchRequest', () => {
        const launchHandler = new LaunchRequestHandler();
        const handlerInput : HandlerInput = {
            requestEnvelope: JsonProvider.requestEnvelope(),
            attributesManager: AttributesManagerFactory.init({
                requestEnvelope: JsonProvider.requestEnvelope(),
            }),
            responseBuilder: ResponseFactory.init(),
        };

        expect(launchHandler.canHandle(handlerInput)).equal(true);
    });

    const intentHandler = new SomeIntentRequestHandler();

    it('should return correct canHandle value for intentHandler on LaunchRequest', () => {
        const input : HandlerInput = {
            requestEnvelope: JsonProvider.requestEnvelope(),
            attributesManager: AttributesManagerFactory.init({
                requestEnvelope: JsonProvider.requestEnvelope(),
            }),
            responseBuilder: ResponseFactory.init(),
        };
        expect(intentHandler.canHandle(input)).equal(false);
    });

    it('should return correct canHandle value for intentHandler on SomeIntent', () => {
        const input : HandlerInput = {
            requestEnvelope: JsonProvider.requestEnvelope(),
            attributesManager: AttributesManagerFactory.init({
                requestEnvelope: JsonProvider.requestEnvelope(),
            }),
            responseBuilder: ResponseFactory.init(),
        };
        input.requestEnvelope.request = {
            type: 'IntentRequest',
            requestId: null,
            timestamp: null,
            locale: null,
            dialogState: null,
            intent: JsonProvider.intent(),
        };
        input.requestEnvelope.request.intent.name = 'SomeIntent';
        expect(intentHandler.canHandle(input)).equal(true);
    });

    it('should return correct canHandle value for intentHandler on FoobarIntent', () => {
        const input : HandlerInput = {
            requestEnvelope: JsonProvider.requestEnvelope(),
            attributesManager: AttributesManagerFactory.init({
                requestEnvelope: JsonProvider.requestEnvelope(),
            }),
            responseBuilder: ResponseFactory.init(),
        };
        input.requestEnvelope.request = {
            type: 'IntentRequest',
            requestId: null,
            timestamp: null,
            locale: null,
            dialogState: null,
            intent: JsonProvider.intent(),
        };
        input.requestEnvelope.request.intent.name = 'FoobarIntent';
        expect(intentHandler.canHandle(input)).equal(true);
    });

    it('should return correct canHandle value for intentHandler on OtherIntent', () => {
        const input : HandlerInput = {
            requestEnvelope: JsonProvider.requestEnvelope(),
            attributesManager: AttributesManagerFactory.init({
                requestEnvelope: JsonProvider.requestEnvelope(),
            }),
            responseBuilder: ResponseFactory.init(),
        };
        input.requestEnvelope.request = {
            type: 'IntentRequest',
            requestId: null,
            timestamp: null,
            locale: null,
            dialogState: null,
            intent: JsonProvider.intent(),
        };
        input.requestEnvelope.request.intent.name = 'OtherIntent';
        expect(intentHandler.canHandle(input)).equal(false);
    });

});
