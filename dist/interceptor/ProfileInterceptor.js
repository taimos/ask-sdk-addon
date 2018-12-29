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
class TimeZoneInterceptor {
    async process(handlerInput) {
        const { requestEnvelope, serviceClientFactory, attributesManager } = handlerInput;
        const { deviceId } = requestEnvelope.context.System.device;
        const upsServiceClient = serviceClientFactory.getUpsServiceClient();
        const usertimeZone = await upsServiceClient.getSystemTimeZone(deviceId);
        const requestAttributes = attributesManager.getRequestAttributes();
        requestAttributes.timeZone = usertimeZone;
        attributesManager.setRequestAttributes(requestAttributes);
    }
}
exports.TimeZoneInterceptor = TimeZoneInterceptor;
class TemperatureUnitInterceptor {
    async process(handlerInput) {
        const { requestEnvelope, serviceClientFactory, attributesManager } = handlerInput;
        const { deviceId } = requestEnvelope.context.System.device;
        const upsServiceClient = serviceClientFactory.getUpsServiceClient();
        const tempUnit = await upsServiceClient.getSystemTemperatureUnit(deviceId);
        const requestAttributes = attributesManager.getRequestAttributes();
        requestAttributes.temperatureUnit = tempUnit;
        attributesManager.setRequestAttributes(requestAttributes);
    }
}
exports.TemperatureUnitInterceptor = TemperatureUnitInterceptor;
class DistanceUnitsInterceptor {
    async process(handlerInput) {
        const { requestEnvelope, serviceClientFactory, attributesManager } = handlerInput;
        const { deviceId } = requestEnvelope.context.System.device;
        const upsServiceClient = serviceClientFactory.getUpsServiceClient();
        const distInfo = await upsServiceClient.getSystemDistanceUnits(deviceId);
        const requestAttributes = attributesManager.getRequestAttributes();
        requestAttributes.distanceUnits = distInfo;
        attributesManager.setRequestAttributes(requestAttributes);
    }
}
exports.DistanceUnitsInterceptor = DistanceUnitsInterceptor;
//# sourceMappingURL=ProfileInterceptor.js.map