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

import {IntentRequest, RequestEnvelope, Slot, slu} from 'ask-sdk-model';
import Value = slu.entityresolution.Value;

export class SlotHelper {

    private requestEnvelope : RequestEnvelope;

    constructor(requestEnvelope : RequestEnvelope) {
        if (requestEnvelope.request.type !== 'IntentRequest') {
            throw new Error('Invalid request type: Only IntentRequests support slots');
        }
        this.requestEnvelope = requestEnvelope;
    }

    /**
     * Resolve the Value, containing text and entity id, of the given slot
     * @param {string} slotName the slot to resolve
     * @param {string} authority (Optional) the authority to get the value from. If none is specified it uses the first one found
     * @return {slu.entityresolution.Value}
     */
    public resolveFirstValue(slotName : string, authority? : string) : slu.entityresolution.Value {
        const request : IntentRequest = <IntentRequest> this.requestEnvelope.request;
        const slot : Slot = request.intent.slots[slotName];
        if (!slot || !slot.resolutions || !slot.resolutions.resolutionsPerAuthority || slot.resolutions.resolutionsPerAuthority.length === 0) {
            return undefined;
        }
        if (authority) {
            let value : Value = undefined;
            slot.resolutions.resolutionsPerAuthority.forEach((resolution) => {
                if (resolution.authority === authority && resolution.values && resolution.values.length > 0 &&
                    resolution.values[0] && resolution.values[0].value) {
                    value = resolution.values[0].value;
                }
            });
            return value;
        }
        if (slot.resolutions.resolutionsPerAuthority[0] &&
            slot.resolutions.resolutionsPerAuthority[0].values &&
            slot.resolutions.resolutionsPerAuthority[0].values.length > 0 &&
            slot.resolutions.resolutionsPerAuthority[0].values[0] &&
            slot.resolutions.resolutionsPerAuthority[0].values[0].value
        ) {
            return slot.resolutions.resolutionsPerAuthority[0].values[0].value;
        }
    }

    /**
     * Get the value of the given slot
     * @param {string} slotName the slot to resolve
     * @return {string}
     */
    public getValue(slotName : string) : string {
        const request : IntentRequest = <IntentRequest> this.requestEnvelope.request;
        const slot : Slot = request.intent.slots[slotName];
        return slot ? slot.value : undefined;
    }

    /**
     * Get the confirmation status of the given slot or the intent in general
     * @param {string} slotName the slot to check; if no slot is given the confirmation status of the intent is returned
     * @return {boolean} true if the slot/intent is confirmed; false otherwise
     */
    public isConfirmed(slotName? : string) : boolean {
        const request : IntentRequest = <IntentRequest> this.requestEnvelope.request;
        if (slotName) {
            const slot : Slot = request.intent.slots[slotName];
            return slot && slot.confirmationStatus === 'CONFIRMED';
        }
        return request.intent.confirmationStatus === 'CONFIRMED';
    }

    /**
     * Create the appropriate authority for the given skill and slot type
     * @param {string} slotType the value type for the authority
     * @param {string} appId (Optional) the app id to build the authority from. If none is specified used the current app id
     * @return {string}
     */
    public getAuthority(slotType : string, appId? : string) : string {
        const app = appId ? appId : this.requestEnvelope.session.application.applicationId;
        return `amzn1.er-authority.echo-sdk.${app}.${slotType}`;
    }

}
