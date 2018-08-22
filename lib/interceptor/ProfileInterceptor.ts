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

import {HandlerInput, RequestInterceptor} from 'ask-sdk-core';
import {services} from 'ask-sdk-model';

export class TimeZoneInterceptor implements RequestInterceptor {

    public async process(handlerInput : HandlerInput) : Promise<void> {
        const {requestEnvelope, serviceClientFactory, attributesManager} = handlerInput;
        const {deviceId} = requestEnvelope.context.System.device;
        const upsServiceClient = serviceClientFactory.getUpsServiceClient();
        const usertimeZone = await upsServiceClient.getSystemTimeZone(deviceId);

        const requestAttributes = attributesManager.getRequestAttributes();
        requestAttributes.timeZone = usertimeZone;
        attributesManager.setRequestAttributes(requestAttributes);
    }

}

export class TemperatureUnitInterceptor implements RequestInterceptor {

    public async process(handlerInput : HandlerInput) : Promise<void> {
        const {requestEnvelope, serviceClientFactory, attributesManager} = handlerInput;
        const {deviceId} = requestEnvelope.context.System.device;
        const upsServiceClient = serviceClientFactory.getUpsServiceClient();
        const tempUnit : services.ups.TemperatureUnit = await upsServiceClient.getSystemTemperatureUnit(deviceId);

        const requestAttributes = attributesManager.getRequestAttributes();
        requestAttributes.temperatureUnit = tempUnit;
        attributesManager.setRequestAttributes(requestAttributes);
    }

}

export class DistanceUnitsInterceptor implements RequestInterceptor {

    public async process(handlerInput : HandlerInput) : Promise<void> {
        const {requestEnvelope, serviceClientFactory, attributesManager} = handlerInput;
        const {deviceId} = requestEnvelope.context.System.device;
        const upsServiceClient = serviceClientFactory.getUpsServiceClient();
        const distInfo : services.ups.DistanceUnits = await upsServiceClient.getSystemDistanceUnits(deviceId);

        const requestAttributes = attributesManager.getRequestAttributes();
        requestAttributes.distanceUnits = distInfo;
        attributesManager.setRequestAttributes(requestAttributes);
    }

}
