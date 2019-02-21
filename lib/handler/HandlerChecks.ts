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

import {HandlerInput} from 'ask-sdk-core';
import {RequestEnvelope} from 'ask-sdk-model';
import {StateHelper} from '../helper/StateHelper';

export class HandlerChecks {

    public static isIntentRequest(requestEnvelope : RequestEnvelope, ...intentNames : string[]) : boolean {
        return requestEnvelope.request.type === 'IntentRequest' && intentNames.indexOf(requestEnvelope.request.intent.name) >= 0;
    }

    public static isType(requestEnvelope : RequestEnvelope, ...requestTypes : string[]) : boolean {
        return requestTypes.indexOf(requestEnvelope.request.type) >= 0;
    }

    public static isAPLUserEvent(requestEnvelope : RequestEnvelope, argumentValidation : (args : string[]) => boolean) : boolean {
        return requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent' && argumentValidation(requestEnvelope.request.arguments);
    }

    public static isAPLUserEventWithArguments(requestEnvelope : RequestEnvelope, ...args : string[]) : boolean {
        return this.isAPLUserEvent(requestEnvelope, (realArgs) => {
            if (args === realArgs) { return true; }
            if (realArgs == null || args == null) { return false; }
            if (realArgs.length !== args.length) { return false; }
            for (let i = 0; i < args.length; ++i) {
                if (args[i] !== realArgs[i]) { return false; }
            }
            return true;
        });
    }

    public static isState(handlerInput : HandlerInput, state : string) : boolean {
        return new StateHelper(handlerInput).getCurrentState() === state;
    }

}
