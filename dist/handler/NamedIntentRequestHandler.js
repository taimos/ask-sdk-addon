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
Object.defineProperty(exports, "__esModule", { value: true });
class NamedIntentRequestHandler {
    constructor(...intentNames) {
        this.intentNames = intentNames;
    }
    canHandle(handlerInput) {
        if (handlerInput.requestEnvelope.request.type === 'IntentRequest') {
            return this.intentNames.indexOf(handlerInput.requestEnvelope.request.intent.name) >= 0;
        }
        return this.intentNames.indexOf(handlerInput.requestEnvelope.request.type) >= 0;
    }
}
exports.NamedIntentRequestHandler = NamedIntentRequestHandler;
//# sourceMappingURL=NamedIntentRequestHandler.js.map