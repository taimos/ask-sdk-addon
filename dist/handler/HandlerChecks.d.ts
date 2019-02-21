import { HandlerInput } from 'ask-sdk-core';
import { RequestEnvelope } from 'ask-sdk-model';
export declare class HandlerChecks {
    static isIntentRequest(requestEnvelope: RequestEnvelope, ...intentNames: string[]): boolean;
    static isType(requestEnvelope: RequestEnvelope, ...requestTypes: string[]): boolean;
    static isAPLUserEvent(requestEnvelope: RequestEnvelope, argumentValidation: (args: string[]) => boolean): boolean;
    static isAPLUserEventWithArguments(requestEnvelope: RequestEnvelope, ...args: string[]): boolean;
    static isState(handlerInput: HandlerInput, state: string): boolean;
}
