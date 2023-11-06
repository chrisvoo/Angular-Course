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