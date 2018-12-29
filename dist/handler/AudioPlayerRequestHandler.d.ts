import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { NamedIntentRequestHandler } from './NamedIntentRequestHandler';
export declare abstract class AudioPlayerRequestHandler extends NamedIntentRequestHandler {
    constructor();
    handle(handlerInput: HandlerInput): Promise<Response> | Response;
    abstract handlePlaybackStarted(handlerInput: HandlerInput): Promise<Response> | Response;
    abstract handlePlaybackFinished(handlerInput: HandlerInput): Promise<Response> | Response;
    abstract handlePlaybackStopped(handlerInput: HandlerInput): Promise<Response> | Response;
    abstract handlePlaybackNearlyFinished(handlerInput: HandlerInput): Promise<Response> | Response;
    abstract handlePlaybackFailed(handlerInput: HandlerInput): Promise<Response> | Response;
}
