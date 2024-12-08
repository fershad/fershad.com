---
title: Rotating buttons in CSS
published: 2020/04/09
---

Here's a really quick little code note for a cool button style. I implemented this rotating button style in the filter section of my [Markdown Cheat Sheet app](https://markdown.fershad.com). You can check it out there, or at the CodePen below.WebPageTest waterfall chart showing render-blocking requests.

To trigger the transition effect we have to add an `onclick` event attribute to each button. This fires off a bit of JavaScript that applies an `active` class to the button. With this class the can then rotate the button with `transform: rotate(45deg)`.

If we leave it at that, however, the content within the button (in this case icons) will also rotate. That's normally not what we want. The trick to keeping the icons straight while the buttons rotate is two-fold:

1. We've got to counter the rotation of the button on the icon element (i.e. `transform: rotate(-45deg)`)
2. We've got to match the same transition animation speed as the button transition (I've used `0.3s` in my demo).

This gives a smooth rotation of the button element while keeping the icon fixed in place.

{% codepenIframe "KKpOoLN", "Rotating Buttons", "fishintaiwan" %}
