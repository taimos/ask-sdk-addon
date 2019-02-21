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
import {IntentRequest, RequestEnvelope} from 'ask-sdk-model';

const STATE_PROPERTY = '_STATE';

export class StateHelper {

    private handlerInput : HandlerInput;

    constructor(handlerInput : HandlerInput) {
        this.handlerInput = handlerInput;
    }

    public getCurrentState() : string {
        const attributes = this.handlerInput.attributesManager.getSessionAttributes();
        return attributes.hasOwnProperty(STATE_PROPERTY) ? attributes[STATE_PROPERTY] : undefined;
    }

    public setState(state : string) : void {
        const attributes = this.handlerInput.attributesManager.getSessionAttributes();
        attributes[STATE_PROPERTY] = state;
        this.handlerInput.attributesManager.setSessionAttributes(attributes);
    }

    public clearState() : void {
        this.setState(undefined);
    }
}
