---
title: Storing, using, and keeping environment variables secret in local environments
published: 2019/09/28
---

Environment variables are locally stored key=value pairs that can be accessed by your code. They're great for storing API keys, secrets, passwords and other sensitive material. They also help you not expose to those secrets to the public on GitHub, GitLab or Bitbucket. Here's how to create and use environment variables locally on your machine.

In the root folder of your app, create a file to store the keys. We'll call our's **local-env**

Store any sensitive data you'll use in your app within this file

{% codeToHtml bash %}
<!-- markdownlint-disable -->
    export MY_API_KEY="ANAOFWQ14124124js214g"
    export EMIAL_PASSWORD="apasswordhere"
<!-- markdownlint-enable -->
{% endcodeToHtml %}

Enter the root folder of your project using your terminal, and use the source command to bring in the local environment variables

{% codeToHtml bash %}
<!-- markdownlint-disable -->
    source local-env
<!-- markdownlint-enable -->
{% endcodeToHtml %}

Now you can call the local environment variables in your app. An example with Node.js would be

{% codeToHtml js %}
<!-- markdownlint-disable -->
    const Airtable_API_Key = process.env.MY_API_KEY
<!-- markdownlint-enable -->
{% endcodeToHtml %}

One last thing to remember is to add the local-env to your .gitignore file so that it's not published next time you push your project.
