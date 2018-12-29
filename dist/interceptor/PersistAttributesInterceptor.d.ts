import { HandlerInput, ResponseInterceptor } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
export declare class PersistAttributesInterceptor implements ResponseInterceptor {
    process(handlerInput: HandlerInput, response?: Response): Promise<void>;
}
