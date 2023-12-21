# Angular Course

These notes and the code are taken from the [udemy course](https://www.udemy.com/course/the-complete-guide-to-angular-2) by [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller/).

- [Angular Course](#angular-course)
  - [Angular CLI cheatsheet](#angular-cli-cheatsheet)
  - [Section 1](#section-1)
    - [Styles](#styles)
    - [Resources](#resources)
  - [Section 2](#section-2)
    - [Directives](#directives)
      - [Attribute directives](#attribute-directives)
    - [Resources](#resources-1)
  - [Section 3 / 4](#section-3--4)
  - [Section 5](#section-5)
    - [@Input: Passing data to component](#input-passing-data-to-component)
    - [@Output: sharing content with other components](#output-sharing-content-with-other-components)
    - [Style encapsulation](#style-encapsulation)
    - [References to HTML elements](#references-to-html-elements)
    - [Accessing DOM elements from the components](#accessing-dom-elements-from-the-components)
    - [Content projection](#content-projection)


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

* **attribute directives**: look like a normal HTML attribute and only affect/change the element they are added to
* **structural directives**: look like a normal HTML attribute but have a leading `*`. Affect a whole area in the DOM (elements get added/removed).

#### Attribute directives
This directives must be imported in the main declarations for the app. DOM modifications may be regukated through
the `RendererV2` or using `HostBinding` directive:

```html
<!-- Template -->
<p appHighlight [defaultColor]="'yellow'" [highlightColor]="'red'">Receives a green background</p>
```

```typescript
@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
    constructor(
        private elementRef: ElementRef,
        // private renderer: Renderer2
    ) {}
    @Input() defaultColor: string = 'transparent';
    @Input() highlightColor: string = 'blue';
    
    @HostBinding('style.backgroundColor') backgroundColor: string;
  
    ngOnInit() {
        this.backgroundColor = this.defaultColor;
        // this.renderer.setStyle(this.elementRef.nativrElement, 'background-color', 'blue', false, false)
    }
    
    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.backgroundColor = this.highlightColor
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.backgroundColor = this.defaultColor
    }
}
```

A built-in attribute directive is `ngStyle`. It's useful when you want to bind a particular CSS property value to the value of a component's property. For example let's assume we have a method in our component named `getColor` that return `green` when the server is online, otherwise `red`. We can tweak the background color with:

```html
<p [ngStyle]="{backgroundColor: getColor()}">
    Server is {{ getServerStatus() }}
</p>
```

`ngClass` works very similarly, tweaking the application of a class depending on a component status.

#### Structural directives

```html
<!-- Template -->
<div *appUnless="onlyOdff">
  ...
</div>
```

```typescript
// works like *ngIf
@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective implements OnInit {
  @Inoput() set appUnless(condition: boolean) {
    if (!condition) {
        this.vcRef.createEmbeddedView(this.templateRef);
    } else {
        this.vcRef.clear()
    }
  }

  constructor(private templateRef: TemplateRef, private vcRef: ViewContainerRef) {
  }
}
```



### Resources

* [Built-in directives](https://angular.io/guide/built-in-directives)
* [Renderer2](https://angular.io/api/core/Renderer2)

## Section 3 / 4

Create a new project without routing, no strict mode:

```bash
ng new --no-strict --routing false course-project
```

For debugging purposes, you can set a breakpoint into the TypeScript components  by accessing `webpack://` subfolders in teh *Sources* tab in the developer console.

## Section 5

By default, all properties defined in a component are accessible inside a component. You have to explicitly say which properties can be set by the outside components.

### @Input: Passing data to component
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

### @Output: sharing content with other components

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

### Style encapsulation

Also notice that Angular enforces style encapsulation, so the styles defined in a component, aren't automatically available to others. For sharing styles, there's always the `angular.json` file in which you can define global styles. This behavior can also be changed by the [encapsulation option](https://angular.io/guide/view-encapsulation) for the component.

### References to HTML elements

Another way of passing information from the template to the TypeScript code, is applying a reference to an HTML element:

```html
<div class="row">
  <div class="col-xs-12">
    ...
    <input
      type="text"
      class="form-control"
      #newServerName
    >
    ...
    <button
      class="btn btn-primary add-server"
      (click)="onAddServer(newServerName)">Add Server</button>
    ...
  </div>
</div>
```

We pass the reference to the method and then we can update our TypeScript code:

```typescript
onAddServer(newServerName: HTMLInputElement) {
  this.serverCreated.emit({
    serverName: newServerName.value,
    serverContent: this.newServerContent
  })
}
```

### Accessing DOM elements from the components

You can also access elements in the template through `ViewChild`: you still put a reference for example to the input element, but this time you get its content through `ViewChild`:

```typescript
@ViewChild('serverContentinput') newServerContent: ElementRef

onAddServer(newServerName: HTMLInputElement) {
  this.serverCreated.emit({
    serverName: newServerName.value,
    serverContent: this.newServerContent.nativeElement.value
  })
}
```

### Content projection

Another nice feature is the possibility to inject into the component's template the data from a different component's template. By default, everything put between angular brackets of a component is silently discarded, unless you use the `ng-content` element:

```html
<!-- cockpit template -->
<app-server-element
  [element]="serverElement"
  *ngFor="let serverElement of serverElements"
>
  <p class="card-text">
    <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
    <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
  </p>
</app-server-element>

<!-- server-element template -->
<div class="card-body">
  <!-- <h5 class="card-title">Special title treatment</h5> -->
  <ng-content></ng-content>
</div>
```

Docs:
* https://angular.io/guide/content-projection
* https://angular.io/guide/lifecycle-hooks

## Section 9: Services and Dependency injection

Typical uses for services are avoid duplication centralizing functions. Another good use case
is getting information for external sources, like an API.  
The injection may operate in these modes:
* you can pass the service in the component's constructor and register it in the
`provider` component's metadata (eg `providers:  [ HeroService ]`). If a parent component has been already provided
with the service, there's no need to do it also in its children.
* you can pass the service in the component's constructor and decorate the service with 
`@Injectable({providedIn: <string>})`. If you don't pass the `providedIn` argument, 
the injectable is not provided in any scope automatically and must be added to a providers array of an @NgModule,
@Component or @Directive. Usually you specify `root`. This also allows Angular to use lazy loading.

In general, you can register the service:
* in `AppModule`: the same service instance is available Application-wide
* in `AppComponent`: same instance of the service is available to all components but not for other services
* Any other component: the same instance is available for the component and all its child components.

### Resources

* [Services](https://angular.io/guide/architecture-services)
* [Dependency Injection in Angular](https://angular.io/guide/dependency-injection-overview)

## Section 11: Routing

The routing module (which can be automatically created by Angular CLI) is the following:

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '/servers',
    component: ListComponent,
    children: [
      { path: ':id', component: SingleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
Add `AppRoutingModule` to your `AppModule`'s imports and then you can use 
`<router-outlet></router-outlet>` in your `app.component.html` template.  
if you want you can still use the Angular CLI:

```bash
ng generate module app-routing --flat --module=app
```
The flat option will prevent the module from being in its folder and the module option will be sure to import the new
module into the AppModule.  
The order of routes is important because the Router uses a first-match wins strategy when 
matching routes, so more specific routes should be placed above less specific routes. 
List routes with a static path first, followed by an empty path route, which matches the 
default route. The wildcard route comes last because it matches every URL and the Router 
selects it only if no other routes match first.  
After that, use [routerLink](https://angular.io/guide/router-reference#router-links) to 
redirect to the correct component and render a "new page".

### Accessing route params

* **Snapshot**: you get the current snapshot of this route at a particular moment in time. 
(Contains the information about a route associated with a component loaded in an outlet at a 
particular moment in time. [ActivatedRouteSnapshot](https://angular.io/api/router/ActivatedRouteSnapshot#description) 
can also be used to traverse the router state
tree.)
* **params**: is A Observable and you can subscribe to it. (An observable of the matrix 
parameters scoped to this route.). [See Docs here](https://angular.io/api/router/ActivatedRoute#description).

Example:

```typescript
 ngOnInit() {
    this.user = { id: this.route.snapshot.params['id'] }
    this.route.params.subscribe((params: Params) => { this.user.id = params['id']; })
 }
```
This subscription is automatically destroyed by Angular so you don't have to manually unsubscribe.

### Query params and fragments

Passing query parameters can be done like the following:
```html
<!-- Assuming you have defined a route like "/servers/:id/edit" -->
<a
 [routerLink]="['/servers', 5, 'edit]"
 [queryParams]="{allowEdit: '1'}"
 fragment="loading"
>
```

Programmatically this could be done in the following way:

```typescript
export class MyComp {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }
  
  // passing parameters
  onLoadServer(id: number) {
      this.router.navigate(['servers', id, 'edit'], {queryParams: { allowEdit: '1'}, fragment: 'loading'})
  }
  
  // retrieving params
  ngOnInit() {
      // the methods below just retrieve the initial values but incapable of getting their updates
      let queryParams = this.activatedRoute.snapshot.queryParams
      let fragment = this.activatedRoute.snapshot.fragment
    
      // the following can be used to get their updates
      this.activatedRoute.queryParams.subscribe()
      this.activatedRoute.fragment.subscribe()
  }
}
```
you can also pass relative path to `navigate` method and to override the current query params for the activated route or 
to preserve them:

```typescript
this.router.navigate(['servers', id, 'edit'], { relativeTo: this.route, queryParamsHandling: 'preserve|merge' })
```

### Redirection

In case you want to manage 404:

```typescript
const routes: Routes = [
  { path: '/servers', ...},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }  // must be last    
];
```
### Guards

This should be executed before the route gets loaded and supports asynchronous operations.

```typescript
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: routerstateSnapshot) {
      return this.canActivate(route, state)
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: routerstateSnapshot) {
    return this.authService.isAuthenticated()
            .then((authenticated: boolean) => {
                if (authenticated) {
                    return true;
                }

              this.router.navigate(['/'])
            }) 
  }
}
```

Then you define the guard in the route specifications:

```typescript
const routes: Routes = [
  // { path: '/servers', canActivateChild: [AuthGuard], ...},  to limit the guard to the children
  { path: '/servers', canActivate: [AuthGuard], ...},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }  // must be last    
];
```
Also remember to add AuthGuard between the providers in the main AppModule.

### Resources

* [Angular Routing](https://angular.io/guide/routing-overview)

## Section 13: Observables

Observables are lazy Push collections of multiple values. To invoke the Observable and see these values, we need to
subscribe to it. Pull and Push are two different protocols that describe how a data Producer can communicate with a data
Consumer.

|      | PRODUCER                                | CONSUMER                                |
|------|-----------------------------------------|-----------------------------------------|
| Pull | Passive: produces data when requested.  | Active: decides when data is requested. |
| Push | Active: produces data at its own pace.  | Passive: reacts to received data.       |

Every JavaScript Function is a Pull system. The function is a Producer of data, and the code that calls the function is
consuming it by "pulling" out a single return value from its call. Promises are the most common type of Push system in
JavaScript today.  
RxJS introduces Observables, a new Push system for JavaScript. An Observable is a Producer of multiple values, "pushing"
them to Observers (Consumers).  
Then you can handle data, errors and completion. When an error occurs then the observable get cancelled and
never completes.  
The essential concepts in RxJS which solve async event management are:

* **Observable**: represents the idea of an invokable collection of future values or events.
* **Observer**: is a collection of callbacks that knows how to listen to values delivered by the Observable.
* **Subscription**: represents the execution of an Observable, is primarily useful for cancelling the execution.
* **Operators**: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
* **Subject**: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
* **Schedulers**: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

### Resources

* [RxJs Playground](https://playcode.io/1701335)
