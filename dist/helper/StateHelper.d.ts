import { HandlerInput } from 'ask-sdk-core';
export declare class StateHelper {
    private handlerInput;
    constructor(handlerInput: HandlerInput);
    getCurrentState(): string;
    setState(state: string): void;
    clearState(): void;
}
