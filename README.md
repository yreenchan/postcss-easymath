## About the easymath
This plugin is the library of Math, that what you are always do in js.Now you can do some calculation with object of Math.

## Why I want to do this?
When I write css with postcss, I want postcss can do all the calculations in the css for me.Especially, I need a plugin can resolve the calculation which will return percentage value.

## API
Math.per accept a fixed value, that is equal with value.toFixed.

## Usage
```css
h3 {
	padding-top: Math.per(430/720, 3);
	width: Math.round(100/50px);
}
```