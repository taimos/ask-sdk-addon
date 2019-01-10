import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
export declare abstract class APLUserEventRequestHandler implements RequestHandler {
    private args;
    constructor(...args: string[]);
    canHandle(handlerInput: HandlerInput): Promise<boolean> | boolean;
    abstract handle(handlerInput: HandlerInput): Promise<Response> | Response;
}
