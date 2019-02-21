import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
export declare abstract class StatefulNamedIntentRequestHandler implements RequestHandler {
    private intentNames;
    private state;
    constructor(state: string, ...intentNames: string[]);
    canHandle(handlerInput: HandlerInput): Promise<boolean> | boolean;
    abstract handle(handlerInput: HandlerInput): Promise<Response> | Response;
}
