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

import {HandlerInput, RequestHandler} from 'ask-sdk-core';
import {Response} from 'ask-sdk-model';
import {HandlerChecks} from './HandlerChecks';

export abstract class StatefulNamedIntentRequestHandler implements RequestHandler {

    private intentNames : string[];
    private state : string;

    constructor(state : string, ...intentNames : string[]) {
        this.intentNames = intentNames;
        this.state = state;
    }

    public canHandle(handlerInput : HandlerInput) : Promise<boolean> | boolean {
        return HandlerChecks.isState(handlerInput, this.state) && (HandlerChecks.isIntentRequest(handlerInput.requestEnvelope, ...this.intentNames) || HandlerChecks.isType(handlerInput.requestEnvelope, ...this.intentNames));
    }

    public abstract handle(handlerInput : HandlerInput) : Promise<Response> | Response;
}
