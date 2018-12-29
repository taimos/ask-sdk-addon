import { RequestEnvelope, slu } from 'ask-sdk-model';
export declare class SlotHelper {
    private requestEnvelope;
    constructor(requestEnvelope: RequestEnvelope);
    /**
     * Resolve the Value, containing text and entity id, of the given slot
     * @param {string} slotName the slot to resolve
     * @param {string} authority (Optional) the authority to get the value from. If none is specified it uses the first one found
     * @return {slu.entityresolution.Value}
     */
    resolveFirstValue(slotName: string, authority?: string): slu.entityresolution.Value;
    /**
     * Get the value of the given slot
     * @param {string} slotName the slot to resolve
     * @return {string}
     */
    getValue(slotName: string): string;
    /**
     * Get the confirmation status of the given slot or the intent in general
     * @param {string} slotName the slot to check; if no slot is given the confirmation status of the intent is returned
     * @return {boolean} true if the slot/intent is confirmed; false otherwise
     */
    isConfirmed(slotName?: string): boolean;
    /**
     * Create the appropriate authority for the given skill and slot type
     * @param {string} slotType the value type for the authority
     * @param {string} appId (Optional) the app id to build the authority from. If none is specified used the current app id
     * @return {string}
     */
    getAuthority(slotType: string, appId?: string): string;
}
