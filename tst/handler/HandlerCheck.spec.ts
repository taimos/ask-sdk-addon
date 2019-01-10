/*
 * Copyright (c) 2019. Taimos GmbH http://www.taimos.de
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
 */

import {RequestEnvelope} from 'ask-sdk-model';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {HandlerChecks} from '../../lib/handler/HandlerChecks';
import {JsonProvider} from '../mock/JsonProvider';

describe('HandlerCheck', () => {

    it('should check APL arguments', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        requestEnvelope.request = {
            type: 'Alexa.Presentation.APL.UserEvent',
            requestId: 'testRequestId',
            timestamp: new Date().toISOString(),
            arguments: [
                'Testarg1',
                'Testarg2',
            ],
        };
        expect(HandlerChecks.isAPLUserEventWithArguments(requestEnvelope, 'Testarg1', 'Testarg2')).to.equal(true);
    });

    it('should check APL invalid arguments', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        requestEnvelope.request = {
            type: 'Alexa.Presentation.APL.UserEvent',
            requestId: 'testRequestId',
            timestamp: new Date().toISOString(),
            arguments: ['Testarg1'],
        };
        expect(HandlerChecks.isAPLUserEventWithArguments(requestEnvelope, 'OtherArg')).to.equal(false);
    });

});
