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

import {Intent, IntentRequest, RequestEnvelope, Slot} from 'ask-sdk-model';

export const JsonProvider = {
    requestEnvelope(appId : string, userId : string, deviceId? : string) : RequestEnvelope {
        return {
            context: {
                AudioPlayer: {
                    playerActivity: 'IDLE',
                },
                Display: null,
                System: {
                    apiAccessToken: null,
                    apiEndpoint: 'https://api.amazonalexa.com/',
                    application: {
                        applicationId: appId,
                    },
                    device: {
                        deviceId: deviceId || 'amzn1.ask.device.VOID',
                        supportedInterfaces: null,
                    },
                    user: {
                        userId,
                    },
                },
            },
            request: {
                type: 'LaunchRequest',
                requestId: null,
                timestamp: null,
                locale: null,
            },
            session: {
                application: {
                    applicationId: appId,
                },
                attributes: null,
                new: true,
                sessionId: 'SessionId.00000000-0000-0000-0000-000000000000',
                user: {
                    accessToken: null,
                    permissions: {
                        consentToken: null,
                    },
                    userId,
                },
            },
            version: '1.0',
        };
    },
    intentRequest(intent : Intent) : IntentRequest {
        return {
            type: 'IntentRequest',
            requestId: null,
            timestamp: null,
            locale: null,
            dialogState: null,
            intent,
        };
    },
    intent(name : string, ...slots : Slot[]) : Intent {
        let requestSlots;
        if (slots) {
            requestSlots = {};
            slots.forEach((slot) => {
                requestSlots[slot.name] = slot;
            });
        }
        return {
            confirmationStatus: null,
            name,
            slots: requestSlots,
        };
    },
    slot(name : string, value : string) : Slot {
        return {
            confirmationStatus: null,
            name,
            value,
            resolutions: null,
        };
    },
};
