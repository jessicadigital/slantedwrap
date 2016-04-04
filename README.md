# slantedwrap jQuery Plugin

This jQuery plugin will produce text wrapped against a slanted line without the need for shape-outside or a polyfill.

Text content is transformed from ```h3``` and ```p``` tags within a div into a ```canvas``` element.

## Installation

To install the latest version of slantedwrap, you can use bower:

```bower install slantedwrap --save-dev```

The files will then be installed into your bower_components folder. The two main files are:

* ```dist/js/jquery.slantedwrap.min.js``` - The jQuery plugin
* ```dist/css/jquery.slantedwrap.css``` - A default CSS stylesheet.

A demo is also available in ```demo/demo.html```.

## Create your content

Content needs to be defined within ```<div>``` elements:

```
<div class="slantedwrap" data-wrapstart="1" data-halign="right" data-valign="bottom">
    <div class="slantedwrap-overlay">
        <div class="slantedwrap-content">
            <h3>Header goes here</h3>
            <p>In hac habitasse platea dictumst. Sed sit amet lorem varius, venenatis felis id, mattis velit. Sed mattis elit quam, vel feugiat lectus dapibus eu. In in ligula tempor, dictum ipsum eu, dapibus sapien. Vivamus scelerisque massa luctus neque ornare lacinia eu a metus. Integer bibendum libero in sapien ultrices eleifend. Sed hendrerit interdum pharetra. Aenean tristique arcu tincidunt sapien convallis imperdiet. Vivamus ultrices tellus diam, ut convallis metus viverra ut. </p>
        </div>
    </div>
</div>
```

You can choose any class name. Options are set within the data attributes.

Then, reference the plugin script, and call the plugin on document ready:

```
(function($){
    $('.slantedwrap').slantedwrap();
})(jQuery);
```

If your container is smaller than the breakpoint (768px by default), then the slanted wrapping will not occur. Resize your window to see the wrapping effect.

## Options

There are four options available:

| Option | Description | Values | Default Value |
|--------|-------------|--------|---------------|
| breakpoint | Minimum width at which wrapping should occur | integer, 0..Max div width | 768 |
| halign | Horizontal Alignment | left, right | left |
| valign | Vertical Alignment | top, bottom | top |
| wrapstart | How far across the width of the div to create the wrapping area, as a fraction | float, 0..1 | 1 |

These are set via data attributes on your individual divs, e.g:

```<div class="slantedwrap" data-halign="right" data-valign="bottom">```

will create a slanted wrap area with the text right and bottom aligned, with the maximum width of the text area across the entire div.
