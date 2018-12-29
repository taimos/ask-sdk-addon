import { RequestEnvelope } from 'ask-sdk-model';
export declare class InterfaceHelper {
    /**
     * Check if AudioPlayer is supported by calling device
     * @param requestEnvelope
     */
    static isAudioPlayerSupported(requestEnvelope: RequestEnvelope): boolean;
    /**
     * Check if VideoPlayer is supported by calling device
     * @param requestEnvelope
     */
    static isVideoPlayerSupported(requestEnvelope: RequestEnvelope): boolean;
    /**
     * Check if Display is supported by calling device
     * @param requestEnvelope
     */
    static isDisplaySupported(requestEnvelope: RequestEnvelope): boolean;
}
