import { interfaces, RequestEnvelope } from 'ask-sdk-model';
import Template = interfaces.display.Template;
import ListItem = interfaces.display.ListItem;
export declare class DisplayTemplateBuilder {
    /**
     * Check if Display is supported by calling device
     * @param requestEnvelope
     */
    static isDisplaySupported(requestEnvelope: RequestEnvelope): boolean;
    /**
     * Escape text for rich text
     * @param requestEnvelope
     */
    static escapeDisplayXml(unsafe: string): string;
    private template;
    constructor(init: Template);
    withToken(token: string): DisplayTemplateBuilder;
    withBackButton(): DisplayTemplateBuilder;
    withBackgroundImage(image: string | interfaces.display.Image): DisplayTemplateBuilder;
    withImage(image: string | interfaces.display.Image): DisplayTemplateBuilder;
    withTitle(title: string): DisplayTemplateBuilder;
    withPrimaryRichText(text: string): DisplayTemplateBuilder;
    withPrimaryPlainText(text: string): DisplayTemplateBuilder;
    withSecondaryRichText(text: string): DisplayTemplateBuilder;
    withSecondaryPlainText(text: string): DisplayTemplateBuilder;
    withTertiaryRichText(text: string): DisplayTemplateBuilder;
    withTertiaryPlainText(text: string): DisplayTemplateBuilder;
    addListItem(item: ListItem): DisplayTemplateBuilder;
    addSimpleListItem(token: string, text: string, image?: string): DisplayTemplateBuilder;
    /**
     * Returns the template object
     * @returns {Response}
     */
    getTemplate(): Template;
    private initTextContent();
}
