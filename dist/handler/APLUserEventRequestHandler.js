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
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const HandlerChecks_1 = require("./HandlerChecks");
class APLUserEventRequestHandler {
    constructor(...args) {
        this.args = args;
    }
    canHandle(handlerInput) {
        return HandlerChecks_1.HandlerChecks.isAPLUserEventWithArguments(handlerInput.requestEnvelope, ...this.args);
    }
}
exports.APLUserEventRequestHandler = APLUserEventRequestHandler;
//# sourceMappingURL=APLUserEventRequestHandler.js.map