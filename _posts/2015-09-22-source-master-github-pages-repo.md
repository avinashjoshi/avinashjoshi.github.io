---
layout: post
title: Using same github repository for Yeoman Jekyll's source and dist
tags: yo jekyll github pages source master
---
In My post on installing and configuring [Jekyll with Yeoman](/yo-jekyll/), I mentioned about using `dist` directory to publish for GitHub pages.

**Here's the thing**: I want to be able to track my source code too (to save drafts, posts etc, without publishing)!
 I could use a completely separate git repository (for example myblog_source),
but I wanted to have them all in the same repository. So, here is How I got that done (replace username with your GitHub username).

{% highlight shell %}
~$ cd /path/to/your/blog
blog$ git add .
blog$ git commit -m "first source code commit."
blog$ git remote add origin https://github.com/username/username.github.io.git
blog$ git push -u origin master:source
blog$ git checkout source
blog$ git branch -d master
{% endhighlight %}

`git push -u origin master:source` renames the branch to 'source' before pushing.

**Note: If you already have setup `dist` to the master branch, skip the steps below**

{% highlight shell %}
~$ cd dist
dist$ git init
dist$ git add .
dist$ git commit -m "first gh-pages commit"
dist$ git remote add origin https://github.com/username/username.github.io.git
dist$ git push -u origin master
{% endhighlight %}

This way you have two completely separate branches `source` and `master`.