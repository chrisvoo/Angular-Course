# Angular Course

These notes and the code are taken from the [udemy course](https://www.udemy.com/course/the-complete-guide-to-angular-2) by [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller/).

- [Angular Course](#angular-course)
  - [Angular CLI cheatsheet](#angular-cli-cheatsheet)
  - [Section 1](#section-1)
    - [Styles](#styles)
    - [Resources](#resources)
  - [Section 2](#section-2)
    - [Directives](#directives)
    - [Resources](#resources-1)
  - [Section 3 / 4](#section-3--4)
  - [Section 5](#section-5)


## Angular CLI cheatsheet

```bash
npm install -g @angular/cli
ng new [PROJECT NAME] --directory . # add directory if you're already into it
cd [PROJECT NAME]
ng serve

# New components
ng generate component <name> # or ng g c <name>
```

## Section 1

* [NgModel](https://angular.io/api/forms/NgModel): Creates a FormControl instance from a domain model and binds it to a form control element. You need to import FormsModule in order to use it

### Styles

Global styles can be defined in `src/styles.css`, defined in `architect` field in `angular.json`. There you can list other global styles (eg CSS libraries).

### Resources

* [Angular CLI reference](https://angular.io/cli)
* [Notes about the code](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6709112#questions/8079942)

## Section 2

**Databinding** allows the communication between the template and the business logic (TypeScript code).

**Output** from logic to template:

* **String interpolation**: `{{ data }}`
* **Property binding**: `[property]="data"`

**Input** from template to logic:

* **Event binding**: `(event)="expression"`

**Both**:

* **Two-way binding**: `[(ngModel)]="data"`

### Directives

They're instructions in the DOM and can be buil-in or custom. For example, here is an attribute directive:

```html
<!-- Template -->
<p appTurnGreen>Receives a green background</p>
```

```typescript
@Directive({
    selector: '[appTurnGreen]'
})
export class TurnGreenDirective {

}
```

A built-in attribute directive is `ngStyle`. It's useful when you want to bind a particular CSS property value to the value of a component's property. For example let's assume we have a method in our component named `getColor` that return `green` when the server is online, otherwise `red`. We can tweak the background color with:

```html
<p [ngStyle]="{backgroundColor: getColor()}">
    Server is {{ getServerStatus() }}
</p>
```

`ngClass` works very similarly, tweaking the application of a class depending on a component status.

### Resources

* [Built-in directives](https://angular.io/guide/built-in-directives)

## Section 3 / 4

Create a new project without routing, no strict mode:

```bash
ng new --no-strict --routing false course-project
```

For debugging purposes, you can set a breakpoint into the TypeScript components  by accessing `webpack://` subfolders in teh *Sources* tab in the developer console.

## Section 5

By default, all properties defined in a component are accessible inside a component. You have to explicitly say which properties can be set by the outside components.
So for example, considering a component named `server-element` inside our main `app` component, we can pass a property belonging to `app` to `server-element`:

```html
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element
        [element]="serverElement"
        *ngFor="let serverElement of serverElements"
      ></app-server-element>
    </div>
  </div>
</div>
```

Here while we're looping through `serverElements`, we can bind the variable `serverElement` to the prperty `element` inside `server-element`:

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent {
  @Input() element: { name: string, type: string, content: string }
}
```

On the contrary, if we want to pass the data from an inner component to its parent, we can use `EventEmitter` and `@Output` directive:

```html
<!-- parent -->
<div class="container">
  <app-cockpit
    (serverCreated)="onServerAdded($event)"
    (bluePrintCreated)="onBlueprintAdded($event)"
  ></app-cockpit>
  ...
```

and

```typescript
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() bluePrintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  newServerName = '';
  newServerContent = '';

  onAddServer() {
    this.serverCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    })
  }

  onAddBlueprint() {
    this.bluePrintCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    })
  }
}
```