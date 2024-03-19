### Usage

Update `file.txt` with your desired component

```ts
<app-test
    [a]="1"
    [camelCase]="2"
    [field]="3"
    (something)="otherEvent($event)"
></app-test>
```

and run `node mock.js`

### Output

```ts
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-test",
    template: "",
})
export class MockAppTestComponent {
    @Input() a: any;
    @Input() camelCase: any;
    @Input() field: any;

    @Output() something = new EventEmitter<any>();
}
```
