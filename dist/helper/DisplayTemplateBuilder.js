"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const InterfaceHelper_1 = require("./InterfaceHelper");
class DisplayTemplateBuilder {
    /**
     * Check if Display is supported by calling device
     * @param requestEnvelope
     */
    static isDisplaySupported(requestEnvelope) {
        return InterfaceHelper_1.InterfaceHelper.isDisplaySupported(requestEnvelope);
    }
    /**
     * Escape text for rich text
     * @param requestEnvelope
     */
    static escapeDisplayXml(unsafe) {
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
    constructor(init) {
        this.template = init;
    }
    withToken(token) {
        this.template.token = token;
        return this;
    }
    withBackButton() {
        this.template.backButton = 'VISIBLE';
        return this;
    }
    withBackgroundImage(image) {
        if (typeof image === 'string') {
            this.template.backgroundImage = {
                sources: [
                    {
                        url: image,
                    },
                ],
            };
        }
        else {
            this.template.backgroundImage = image;
        }
        return this;
    }
    withImage(image) {
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
                }
                else {
                    this.template.image = image;
                }
                break;
            default:
                break;
        }
        return this;
    }
    withTitle(title) {
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
    withPrimaryRichText(text) {
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
    withPrimaryPlainText(text) {
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
    withSecondaryRichText(text) {
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
    withSecondaryPlainText(text) {
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
    withTertiaryRichText(text) {
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
    withTertiaryPlainText(text) {
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
    addListItem(item) {
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
    addSimpleListItem(token, text, image) {
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
    getTemplate() {
        return this.template;
    }
    // -------------------------------------------------------
    // PRIVATE METHODS
    // -------------------------------------------------------
    initTextContent() {
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
exports.DisplayTemplateBuilder = DisplayTemplateBuilder;
//# sourceMappingURL=DisplayTemplateBuilder.js.map