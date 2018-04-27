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
 *
 */

'use strict';

import {HandlerInput} from 'ask-sdk-core';
import {Response} from 'ask-sdk-model';
import {NamedIntentRequestHandler} from './NamedIntentRequestHandler';

export abstract class AudioPlayerRequestHandler extends NamedIntentRequestHandler {

    constructor() {
        super('AudioPlayer.PlaybackStarted', 'AudioPlayer.PlaybackFinished', 'AudioPlayer.PlaybackStopped', 'AudioPlayer.PlaybackNearlyFinished', 'AudioPlayer.PlaybackFailed');
    }

    public handle(handlerInput : HandlerInput) : Promise<Response> | Response {
        if (handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted') {
            return this.handlePlaybackStarted(handlerInput);
        }
        if (handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackFinished') {
            return this.handlePlaybackFinished(handlerInput);
        }
        if (handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStopped') {
            return this.handlePlaybackStopped(handlerInput);
        }
        if (handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackNearlyFinished') {
            return this.handlePlaybackNearlyFinished(handlerInput);
        }
        if (handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackFailed') {
            return this.handlePlaybackFailed(handlerInput);
        }
        const error = new Error(`Got request I cannot handle: ${JSON.stringify(handlerInput.requestEnvelope.request, null, 2)}`);
        error.name = `AskSdk.Addon.AudioPlayerRequestHandler Error`;
        throw error;
    }

    public abstract handlePlaybackStarted(handlerInput : HandlerInput) : Promise<Response> | Response;

    public abstract handlePlaybackFinished(handlerInput : HandlerInput) : Promise<Response> | Response;

    public abstract handlePlaybackStopped(handlerInput : HandlerInput) : Promise<Response> | Response;

    public abstract handlePlaybackNearlyFinished(handlerInput : HandlerInput) : Promise<Response> | Response;

    public abstract handlePlaybackFailed(handlerInput : HandlerInput) : Promise<Response> | Response;

}
