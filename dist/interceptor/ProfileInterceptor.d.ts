import { HandlerInput, RequestInterceptor } from 'ask-sdk-core';
export declare class TimeZoneInterceptor implements RequestInterceptor {
    process(handlerInput: HandlerInput): Promise<void>;
}
export declare class TemperatureUnitInterceptor implements RequestInterceptor {
    process(handlerInput: HandlerInput): Promise<void>;
}
export declare class DistanceUnitsInterceptor implements RequestInterceptor {
    process(handlerInput: HandlerInput): Promise<void>;
}
