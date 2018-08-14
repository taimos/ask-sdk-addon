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
 */

import {interfaces, RequestEnvelope, Response} from 'ask-sdk-model';
import Template = interfaces.display.Template;
import ListItem = interfaces.display.ListItem;

export class DisplayTemplateBuilder {

    /**
     * Check if Display is supported by calling device
     * @param requestEnvelope
     */
    public static isDisplaySupported(requestEnvelope : RequestEnvelope) : boolean {
        return requestEnvelope.context.System.device.supportedInterfaces.Display !== undefined;
    }

    /**
     * Escape text for rich text
     * @param requestEnvelope
     */
    public static escapeDisplayXml(unsafe : string) : string {
        if (!unsafe) {
            return '';
        }
        return unsafe.replace(/[&<>"'\\]/g, (m) => {
            switch (m) {
                case '&':
                    return '&amp;';
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '"':
                    return '&quot;';
                case '\'':
                    return '&apos;';
                case '\\':
                    return '\\\\';
                default:
                    return '&#039;';
            }
        });
    }

    private template : Template;

    constructor(init : Template) {
        this.template = init;
    }

    public withToken(token : string) : DisplayTemplateBuilder {
        this.template.token = token;
        return this;
    }

    public withBackButton() : DisplayTemplateBuilder {
        this.template.backButton = 'VISIBLE';
        return this;
    }

    public withBackgroundImage(image : string | interfaces.display.Image) : DisplayTemplateBuilder {
        if (typeof image === 'string') {
            this.template.backgroundImage = {
                sources: [
                    {
                        url: image,
                    },
                ],
            };
        } else {
            this.template.backgroundImage = image;
        }
        return this;
    }

    public withImage(image : string | interfaces.display.Image) : DisplayTemplateBuilder {
        switch (this.template.type) {
            case 'BodyTemplate2':
            case 'BodyTemplate3':
            case 'BodyTemplate6':
            case 'BodyTemplate7':
                if (typeof image === 'string') {
                    this.template.image = {
                        sources: [
                            {
                                url: image,
                            },
                        ],
                    };
                } else {
                    this.template.image = image;
                }
                break;
            default:
                break;
        }
        return this;
    }

    public withTitle(title : string) : DisplayTemplateBuilder {
        switch (this.template.type) {
            case 'ListTemplate1':
            case 'ListTemplate2':
            case 'BodyTemplate1':
            case 'BodyTemplate2':
            case 'BodyTemplate3':
            case 'BodyTemplate7':
                this.template.title = title;
                break;
            default:
                break;
        }
        return this;
    }

    public withPrimaryRichText(text : string) : DisplayTemplateBuilder {
        switch (this.template.type) {
            case 'BodyTemplate1':
            case 'BodyTemplate2':
            case 'BodyTemplate3':
            case 'BodyTemplate6':
                this.initTextContent();
                this.template.textContent.primaryText = {
                    type: 'RichText',
                    text,
                };
                break;
            default:
                break;
        }
        return this;
    }

    public withPrimaryPlainText(text : string) : DisplayTemplateBuilder {
        switch (this.template.type) {
            case 'BodyTemplate1':
            case 'BodyTemplate2':
            case 'BodyTemplate3':
            case 'BodyTemplate6':
                this.initTextContent();
                this.template.textContent.primaryText = {
                    type: 'PlainText',
                    text,
                };
                break;
            default:
                break;
        }
        return this;
    }

    public withSecondaryRichText(text : string) : DisplayTemplateBuilder {
        switch (this.template.type) {
            case 'BodyTemplate1':
            case 'BodyTemplate2':
            case 'BodyTemplate3':
            case 'BodyTemplate6':
                this.initTextContent();
                this.template.textContent.secondaryText = {
                    type: 'RichText',
                    text,
                };
                break;
            default:
                break;
        }
        return this;
    }

    public withSecondaryPlainText(text : string) : DisplayTemplateBuilder {
        switch (this.template.type) {
            case 'BodyTemplate1':
            case 'BodyTemplate2':
            case 'BodyTemplate3':
            case 'BodyTemplate6':
                this.initTextContent();
                this.template.textContent.secondaryText = {
                    type: 'PlainText',
                    text,
                };
                break;
            default:
                break;
        }
        return this;
    }

    public withTertiaryRichText(text : string) : DisplayTemplateBuilder {
        switch (this.template.type) {
            case 'BodyTemplate1':
            case 'BodyTemplate2':
            case 'BodyTemplate3':
            case 'BodyTemplate6':
                this.initTextContent();
                this.template.textContent.tertiaryText = {
                    type: 'RichText',
                    text,
                };
                break;
            default:
                break;
        }
        return this;
    }

    public withTertiaryPlainText(text : string) : DisplayTemplateBuilder {
        switch (this.template.type) {
            case 'BodyTemplate1':
            case 'BodyTemplate2':
            case 'BodyTemplate3':
            case 'BodyTemplate6':
                this.initTextContent();
                this.template.textContent.tertiaryText = {
                    type: 'PlainText',
                    text,
                };
                break;
            default:
                break;
        }
        return this;
    }

    public addListItem(item : ListItem) : DisplayTemplateBuilder {
        switch (this.template.type) {
            case 'ListTemplate1':
            case 'ListTemplate2':
                if (!this.template.listItems) {
                    this.template.listItems = [];
                }
                this.template.listItems.push(item);
                break;
            default:
                break;
        }
        return this;
    }

    public addSimpleListItem(token : string, text : string, image? : string) : DisplayTemplateBuilder {
        this.addListItem({
            token,
            image: image ? {
                sources: [
                    {
                        url: image,
                    },
                ],
            } : undefined,
            textContent: {
                primaryText: {
                    type: 'PlainText',
                    text,
                },
            },
        });
        return this;
    }

    /**
     * Returns the template object
     * @returns {Response}
     */
    public getTemplate() : Template {
        return this.template;
    }

    // -------------------------------------------------------
    // PRIVATE METHODS
    // -------------------------------------------------------

    private initTextContent() : void {
        switch (this.template.type) {
            case 'BodyTemplate1':
            case 'BodyTemplate2':
            case 'BodyTemplate3':
            case 'BodyTemplate6':
                if (!this.template.textContent) {
                    this.template.textContent = {
                        primaryText: undefined,
                        secondaryText: undefined,
                        tertiaryText: undefined,
                    };
                }
                break;
            default:
                break;
        }
    }

}
