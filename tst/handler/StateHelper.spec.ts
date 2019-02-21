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

import {HandlerInput} from 'ask-sdk-core';
import {RequestEnvelope} from 'ask-sdk-model';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {StateHelper} from '../../lib';
import {AttributesManagerMock} from '../mock/AttributesManagerMock';
import {JsonProvider} from '../mock/JsonProvider';

describe('StateHelper', () => {

    it('should get the correct empty state value', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        requestEnvelope.request = JsonProvider.intentRequest(JsonProvider.intent('SomeIntent'));

        const input : HandlerInput = {
            requestEnvelope,
            attributesManager : new AttributesManagerMock(requestEnvelope),
            responseBuilder : null,
        };

        expect(new StateHelper(input).getCurrentState()).to.equal(undefined);
    });

    it('should get the correct current state value', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        requestEnvelope.request = JsonProvider.intentRequest(JsonProvider.intent('SomeIntent'));
        requestEnvelope.session.attributes = {_STATE : 'myState'};

        const input : HandlerInput = {
            requestEnvelope,
            attributesManager : new AttributesManagerMock(requestEnvelope),
            responseBuilder : null,
        };

        expect(new StateHelper(input).getCurrentState()).to.equal('myState');
    });

    it('should set the correct state value', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        requestEnvelope.request = JsonProvider.intentRequest(JsonProvider.intent('SomeIntent'));

        const input : HandlerInput = {
            requestEnvelope,
            attributesManager : new AttributesManagerMock(requestEnvelope),
            responseBuilder : null,
        };

        const stateHelper = new StateHelper(input);
        expect(stateHelper.getCurrentState()).to.equal(undefined);
        stateHelper.setState('setState');
        expect(stateHelper.getCurrentState()).to.equal('setState');
    });

});
