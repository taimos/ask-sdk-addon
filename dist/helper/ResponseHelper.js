"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHelper {
    constructor(responseBuilder) {
        this.responseBuilder = responseBuilder;
    }
    /**
     * Has Alexa say one of the provided speeches to the user
     * @param {string[]} speeches
     * @returns {ResponseHelper}
     */
    speakOneOf(speeches) {
        this.responseBuilder.speak(speeches[Math.floor(Math.random() * speeches.length)]);
        return this;
    }
    /**
     * Has Alexa reprompt with one of the provided speeches to the user
     * @param {string[]} speeches
     * @returns {ResponseHelper}
     */
    repromptOneOf(speeches) {
        this.responseBuilder.reprompt(speeches[Math.floor(Math.random() * speeches.length)]);
        return this;
    }
    /**
     * Has Alexa add one of the provided hints for display devices
     * @param {string[]} hints
     * @returns {ResponseHelper}
     */
    hintOneOf(hints) {
        this.responseBuilder.addHintDirective(hints[Math.floor(Math.random() * hints.length)]);
        return this;
    }
    /**
     * Returns the response object of the underlying ResponseBuilder
     * @returns {Response}
     */
    getResponse() {
        return this.responseBuilder.getResponse();
    }
}
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=ResponseHelper.js.map