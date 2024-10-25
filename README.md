## Problem

When using `@thisbeyond/solid-dnd` with a `table` with `display: grid` and hiding `thead`, `tbody` and `tr` elements with `display: contents` from the grid the items are not any more behaving correctly. 

When trying to drag the elements sometimes the elements get changed. But there is no animation and the dragged element is outside in the left upper part of the browser window. When dragging it appears in the browser. When using `display: grid` the styles of the dragged element do not have the intended styles.
