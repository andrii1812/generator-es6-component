# generator-es6-component

[Yeoman](http://yeoman.io/) generator for scaffolding angular 1.5 es6 components

### Installation
```
npm install -g yo generator-es6-component
```

### Usage
```
yo es6-component <component-name> [--with-module]
```
> with-module - will create additional module for the component

when calling without parameters - standard yeoman prompt will be shown

Example:
```
yo es6-component hello --with-module
```
will generate 5 files
```
hello
+-- hello.component.js
+-- hello.controller.js
+-- hello.module.js
+-- hello.scss
+-- hello.template.html
```
