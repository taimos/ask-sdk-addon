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
 */

import {ResponseBuilder, ResponseFactory} from 'ask-sdk-core';
import {ui} from 'ask-sdk-model';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {ResponseHelper} from '../../lib/helper/ResponseHelper';
import SsmlOutputSpeech = ui.SsmlOutputSpeech;

describe('ResponseHelper', () => {

    it('should build random response with with array as outputSpeech', () => {
        const responseBuilder : ResponseBuilder = ResponseFactory.init();
        const helper : ResponseHelper = new ResponseHelper(responseBuilder);

        const speechCandidates = ['HelloWorld!', 'Good day!'];
        const expectResponse = speechCandidates.map((text) => `<speak>${text}</speak>`);

        const {outputSpeech} = helper.speakOneOf(speechCandidates).getResponse();
        expect((outputSpeech as SsmlOutputSpeech).ssml).to.oneOf(expectResponse);
    });

    it('should build random response with with array as reprompt', () => {
        const responseBuilder : ResponseBuilder = ResponseFactory.init();
        const helper : ResponseHelper = new ResponseHelper(responseBuilder);

        const repromptCandidates = ['HelloWorld!', 'Good day!'];
        const expectResponse = repromptCandidates.map((text) => `<speak>${text}</speak>`);

        const {reprompt} = helper.repromptOneOf(repromptCandidates).getResponse();
        expect((reprompt.outputSpeech as SsmlOutputSpeech).ssml).to.oneOf(expectResponse);
    });

});
