import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
export declare abstract class NamedIntentRequestHandler implements RequestHandler {
    private intentNames;
    constructor(...intentNames: string[]);
    canHandle(handlerInput: HandlerInput): Promise<boolean> | boolean;
    abstract handle(handlerInput: HandlerInput): Promise<Response> | Response;
}
