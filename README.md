# browserify-template
[gulp-template](https://github.com/sindresorhus/gulp-template) as a browserify transform. So if you have:

**example.coffee**

````
var staticRoot = '<%= STATIC_ROOT %>';
````

If you call browserify-template with `{STATIC_ROOT: "foo"}`, it gets transformed to:

````
var staticRoot = 'foo';
````
