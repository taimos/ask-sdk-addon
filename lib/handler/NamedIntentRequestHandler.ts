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

export abstract class NamedIntentRequestHandler implements RequestHandler {

    private intentNames : string[];

    constructor(...intentNames : string[]) {
        this.intentNames = intentNames;
    }

    public canHandle(handlerInput : HandlerInput) : Promise<boolean> | boolean {
        if (handlerInput.requestEnvelope.request.type === 'IntentRequest') {
            return this.intentNames.indexOf(handlerInput.requestEnvelope.request.intent.name) >= 0;
        }

        return this.intentNames.indexOf(handlerInput.requestEnvelope.request.type) >= 0;
    }

    public abstract handle(handlerInput : HandlerInput) : Promise<Response> | Response;
}
