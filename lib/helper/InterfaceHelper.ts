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

import {RequestEnvelope} from 'ask-sdk-model';

export class InterfaceHelper {

    /**
     * Check if AudioPlayer is supported by calling device
     * @param requestEnvelope
     */
    public static isAudioPlayerSupported(requestEnvelope : RequestEnvelope) : boolean {
        return requestEnvelope.context.System.device.supportedInterfaces.AudioPlayer !== undefined;
    }

    /**
     * Check if VideoPlayer is supported by calling device
     * @param requestEnvelope
     */
    public static isVideoPlayerSupported(requestEnvelope : RequestEnvelope) : boolean {
        return requestEnvelope.context.System.device.supportedInterfaces.VideoApp !== undefined;
    }

    /**
     * Check if Display is supported by calling device
     * @param requestEnvelope
     */
    public static isDisplaySupported(requestEnvelope : RequestEnvelope) : boolean {
        return requestEnvelope.context.System.device.supportedInterfaces.Display !== undefined;
    }

    /**
     * Check if APL is supported by calling device
     * @param requestEnvelope
     */
    public static isAPLSupported(requestEnvelope : RequestEnvelope) : boolean {
        return requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL'] !== undefined;
    }

}
