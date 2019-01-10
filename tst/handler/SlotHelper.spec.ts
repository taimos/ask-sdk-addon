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

import {RequestEnvelope} from 'ask-sdk-model';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {SlotHelper} from '../../lib';
import {JsonProvider} from '../mock/JsonProvider';

describe('SlotHelper', () => {

    it('should get the correct slot value', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const slot = JsonProvider.slot('test', 'foobar');
        requestEnvelope.request = JsonProvider.intentRequest(JsonProvider.intent('SomeIntent', slot));

        expect(new SlotHelper(requestEnvelope).getValue('test')).to.equal('foobar');
    });

    it('should return undefined for non existing slots', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const slot = JsonProvider.slot('test', 'foobar');
        requestEnvelope.request = JsonProvider.intentRequest(JsonProvider.intent('SomeIntent', slot));

        expect(new SlotHelper(requestEnvelope).getValue('test2')).to.equal(undefined);
    });

    it('should fail to create helper with LaunchRequest', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');

        expect(() => new SlotHelper(requestEnvelope)).to.throw('Invalid request type: Only IntentRequests support slots');
    });

    it('should create the correct authority', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        requestEnvelope.request = JsonProvider.intentRequest(JsonProvider.intent('SomeIntent'));
        const helper = new SlotHelper(requestEnvelope);

        expect(helper.getAuthority('SlotType')).to.equal('amzn1.er-authority.echo-sdk.app.SlotType');
        expect(helper.getAuthority('SlotType', 'otherApp')).to.equal('amzn1.er-authority.echo-sdk.otherApp.SlotType');
    });

    it('should resolve the correct slot value', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const slot = JsonProvider.slot('test', 'foobar');
        requestEnvelope.request = JsonProvider.intentRequest(JsonProvider.intent('SomeIntent', slot));
        slot.resolutions = {
            resolutionsPerAuthority: [{
                authority: 'amzn1.er-authority.echo-sdk.app.SlotType',
                status: {
                    code: 'ER_SUCCESS_MATCH',
                },
                values: [
                    {
                        value: {
                            name: 'test',
                            id: 'testId',
                        },
                    },
                ],
            }],
        };

        const helper = new SlotHelper(requestEnvelope);
        expect(helper.resolveFirstValue('test')).to.deep.equal({name: 'test', id: 'testId'});
        expect(helper.resolveFirstValue('test', helper.getAuthority('SlotType'))).to.deep.equal({name: 'test', id: 'testId'});
        expect(helper.resolveFirstValue('test', helper.getAuthority('OtherType'))).to.equal(undefined);
    });

    it('should get the correct slot confirmation (false)', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const slot = JsonProvider.slot('test', 'foobar');
        slot.confirmationStatus = 'DENIED';
        requestEnvelope.request = JsonProvider.intentRequest(JsonProvider.intent('SomeIntent', slot));

        expect(new SlotHelper(requestEnvelope).isConfirmed('test')).to.equal(false);
    });

    it('should get the correct slot confirmation (true)', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const slot = JsonProvider.slot('test', 'foobar');
        slot.confirmationStatus = 'CONFIRMED';
        requestEnvelope.request = JsonProvider.intentRequest(JsonProvider.intent('SomeIntent', slot));

        expect(new SlotHelper(requestEnvelope).isConfirmed('test')).to.equal(true);
    });

    it('should get the correct intent confirmation (false)', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const intent = JsonProvider.intent('SomeIntent');
        intent.confirmationStatus = 'DENIED';
        requestEnvelope.request = JsonProvider.intentRequest(intent);

        expect(new SlotHelper(requestEnvelope).isConfirmed()).to.equal(false);
    });

    it('should get the correct intent confirmation (true)', async () => {
        const requestEnvelope : RequestEnvelope = JsonProvider.requestEnvelope('app', 'user');
        const intent = JsonProvider.intent('SomeIntent');
        intent.confirmationStatus = 'CONFIRMED';
        requestEnvelope.request = JsonProvider.intentRequest(intent);

        expect(new SlotHelper(requestEnvelope).isConfirmed()).to.equal(true);
    });

});
