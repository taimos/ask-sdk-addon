import { ResponseBuilder } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
export declare class ResponseHelper {
    private responseBuilder;
    constructor(responseBuilder: ResponseBuilder);
    /**
     * Has Alexa say one of the provided speeches to the user
     * @param {string[]} speeches
     * @returns {ResponseHelper}
     */
    speakOneOf(speeches: string[]): ResponseHelper;
    /**
     * Has Alexa reprompt with one of the provided speeches to the user
     * @param {string[]} speeches
     * @returns {ResponseHelper}
     */
    repromptOneOf(speeches: string[]): ResponseHelper;
    /**
     * Has Alexa add one of the provided hints for display devices
     * @param {string[]} hints
     * @returns {ResponseHelper}
     */
    hintOneOf(hints: string[]): ResponseHelper;
    /**
     * Returns the response object of the underlying ResponseBuilder
     * @returns {Response}
     */
    getResponse(): Response;
}
