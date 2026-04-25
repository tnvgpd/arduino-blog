# My Engineering Portfolio Workflow

This website uses a simple, template-based static site generator powered entirely by Vanilla Javascript. No NPM or Jekyll required!

---

## The Workflow

There are two steps to publishing any new content:
1. **Duplicate** a template file to create the page.
2. **Register** the new page in `data.js`.

### How to Add a New Project

1. Open your directory and duplicate the `template-project.html` file.
2. Rename the duplicated file to something descriptive (e.g. `arduino-car.html`).
3. Open the file and edit the text to talk about your project!
4. Open **`data.js`**. 
5. Find the `myProjects` array at the very top. Add an object to the list exactly like this:
```javascript
  {
    title: "My Arduino Car",
    desc: "A remote controlled car using Bluetooth.",
    tags: ["Arduino", "Motor", "Bluetooth"],
    link: "arduino-car.html"
  }
```

*Note: Since you put it at the very top of `myProjects`, it will immediately become the newest project and take the #1 spot on your Home Page and Projects Page automatically!*

### How to Add a New Blog Post

The process is exactly the same for blog posts!

1. Duplicate `template-blog.html` and rename it (e.g. `blog-post-3.html`).
2. Type up your blog post inside the HTML file.
3. Open **`data.js`** and add it to the top of the `myBlogs` array:
```javascript
  {
    title: "Learning about Bluetooth",
    date: "April 28, 2026",
    summary: "Today I finally figured out how to connect my phone to the HC-05 module.",
    link: "blog-post-3.html"
  }
```

That's it! Everything will auto-update across your site.

**Enjoy your highly customized engineering portfolio!**