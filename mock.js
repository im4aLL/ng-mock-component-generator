// imports
const parse = require("html-dom-parser").default;
const fs = require("fs");
const _ = require("lodash");
const ncp = require("copy-paste");
const log = require("./log.js");

// read file
const data = fs.readFileSync("file.txt");
const htmlString = data.toString();

// parse dom
const items = parse(htmlString, {
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
});

// get each tag and generate
items.forEach((item) => {
    if (item.type === "tag") {
        // mock class name
        const className = `Mock${_.startCase(item.name).replace(/[^A-Za-z]/g, "")}Component`;

        // @Input / @Output decorator
        let inputDecoratorString = "";
        let outputDecoratorString = "";

        for (const property in item.attribs) {
            if (property.startsWith("[")) {
                const propertyValue = property
                    .replace("[", "")
                    .replace("]", "");
                inputDecoratorString += `   @Input() ${propertyValue}: any;\n`;
            } else if (property.startsWith("(")) {
                const propertyValue = property
                    .replace("(", "")
                    .replace(")", "");
                outputDecoratorString += `   @Output() ${propertyValue} = new EventEmitter<any>()\n`;
            }
        }

        // main template
        const inputImport = `import { Component, Input } from '@angular/core';`;
        const outputImport = `import { Component, EventEmitter, Input, Output } from '@angular/core';`;

        const result = `${outputDecoratorString.length > 0 ? outputImport : inputImport}

@Component({
    selector: '${item.name}',
    template: '',
})
export class ${className} {
${inputDecoratorString}
${outputDecoratorString}
}
`;
        // copy to clipboard
        ncp.copy(result, () => {
            log.green(result);

            log.green(`mock-${item.name}.component.ts`);
            log.yellow("✅ Copied to clipboard!");
        });
    }
});
