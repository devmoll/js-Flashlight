# js Flashlight
Adds a flashlight effect to highlight areas with the mouse.

### Installation

Simply include the following code snippet in your HTML file:
```html
<script src="fl.min.js" defer></script>
```

### Controls
Use G to enable/disable the flashlight.\
Choose the flashlight mode with '1' or '2'.

If a WebGL2 Context is available, you can use the numbers from '1' to '8' to choose the flashlight mode. 

Use Shift + Mousewheel to change the size of the flashlight.\
Toggle the height with Alt + Mousewheel.

##### Userdefined Controls

Customize the background color or the activation key adding following 
JSON structure between the script tags and activate the JSON parsing with
__data-json="true"__

```html
<script src="fl.min.js" data-json="true" defer>
    {
        "bgColor" : "#222b",
        "activate" : "g"
    }
</script>
```


