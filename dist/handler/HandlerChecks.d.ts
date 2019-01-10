import { HandlerInput } from 'ask-sdk-core';
export declare class HandlerChecks {
    static isIntentRequest(handlerInput: HandlerInput, ...intentNames: string[]): boolean;
    static isType(handlerInput: HandlerInput, ...requestTypes: string[]): boolean;
}
