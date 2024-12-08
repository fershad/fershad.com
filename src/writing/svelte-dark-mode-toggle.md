---
title: Dark Mode toggle for Svelte
published: 2020/04/13
permalink:  /writing/svelte-dark-mode-toggle/
summary: >-
  This quick code note will go through creating a simple component in Svelte
  that allows us to switch the theme of our website between light and dark.
---

## Toggle Component

Inside your Svelte project create a new component named `Toggle.svelte`. It's going to contain a script tag, and button element.

<!-- markdownlint-disable -->
{% codeToHtml "svelte", "Toggle.svelte" %}
    <script>
    	let darkMode = false;
    	function toggle() {
            darkMode = !darkMode;
            window.document.body.classList.toggle('dark');
        }
    </script>

    <button on:click={toggle}>
    	{#if darkMode }
    		Go light
    	{:else}
    		Go dark
    	{/if}
    </button>
{% endcodeToHtml %}
<!-- markdownlint-enable -->

What the code above does is:

1. Initiates a boolean variable that allows us to check the current theme.
2. Creates a function that reverses the variable, and toggles a class on the body DOM element.
3. Has a button that calls the function when clicked.

The button also contains an `if` statement which changes the value of the button element based on the current theme. Thanks to the reactivity of Svelte, this just works straight out of the box and will change automatically when the `toggle()` function is run.

In there REPL I've also added some styling to the button, but I won't got through that here.

## Import the Toggle

To use the toggle component within your app, import it using `import Toggle from './Toggle.svelte';`. In the REPL we've imported it directly into the `App.svelte` file, however you might want to use the toggle in a Header, Nav or Footer component. It's up to you.

Now, for the Toggle to appear within your app simply call it using a capitalized component tag `<Toggle />.`

## CSS

Of course, none of the above will work with having the right CSS in place to change the style. Below is a really simple example of how you might implement this. You can either add the CSS to your Svelte project's `global.css` file or add it to `App.svelte`.

<!-- markdownlint-disable -->
{% codeToHtml "html","App.svelte" %}
    <style>
     :root{
      --bg-color: #FFFFFF;
      --text-color: #000000;
     }

     :global(body) {
      background: var(--bg-color);
      color: var(--text-color);
     }

     :global(body.dark) {
      --bg-color: #000000;
      --text-color: #FFFFFF;
     }
    </style>
{% endcodeToHtml %}
<!-- markdownlint-enable -->

## Code & Example

I've build this out in [Svelte's online REPL](https://svelte.dev/repl/148690356c4b45df8587cbadc448ec58?version=3.20.1). The code and example both live there.

_Note: In this guide we won't be persisting the theme change. That means any time the page is refreshed the theme will revert back to light mode._
