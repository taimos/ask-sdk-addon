import { AttributesManager } from 'ask-sdk-core';
import { RequestEnvelope } from 'ask-sdk-model';

export class AttributesManagerMock implements AttributesManager {

    private sessionAttributes : { [key : string] : any; };
    private requestAttributes : { [key : string] : any; };
    private persistentAttributes : { [key : string] : any; };

    constructor(requestEnvelope : RequestEnvelope) {
        this.sessionAttributes = requestEnvelope.session.attributes || {};
        this.requestAttributes = {};
    }

    public getRequestAttributes() : { [key : string] : any; } {
        return this.requestAttributes;
    }
    public getSessionAttributes<T = { [key : string] : any; }>() : T {
        return this.sessionAttributes as any;
    }
    public async getPersistentAttributes() : Promise<{ [key : string] : any; }> {
        return this.persistentAttributes;
    }
    public setRequestAttributes(requestAttributes : { [key : string] : any; }) : void {
        this.requestAttributes = requestAttributes;
    }
    public setSessionAttributes(sessionAttributes : { [key : string] : any; }) : void {
        this.sessionAttributes = sessionAttributes;
    }
    public setPersistentAttributes(persistentAttributes : { [key : string] : any; }) : void {
        this.persistentAttributes = persistentAttributes;
    }
    public async savePersistentAttributes() : Promise<void> {
        return;
    }

}
