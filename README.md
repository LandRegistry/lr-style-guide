# Land Registry style guide

Derived from GOV.UK Elements, this style guide aims to produce consumable static assets
along with a demo website providing html snippets.

It has a dependency on the GOV.UK Frontend Toolkit

## How can my app consume this style guide?

Within ```/app/static/``` you’ll find the ```lr-styleguide``` directory.
This is what you’re aiming to consume.

### Simple consumption

If you have no need to compile sass / js assets, and want to keep it very simple,
simply pop the following into ```/static/```:

```
/static
    /lr-styleguide
        /css
            styleguide-ie6.css
            styleguide-ie7.css
            styleguide-ie8.css
            styleguide.css
        /images
            * all files
        /js
            styleguide-components.js
```


### Stylesheets

Set your libsass import paths to ``` static/sass/partials ``` and ``` static/govuk_frontend_toolkit/stylesheets ```

Somehow grab ``` styleguide.scss ``` - this imports all the toolkit and partials, and the css output is what you'll use in the frontend [work this out properly]

### Javascript

```
js = Bundle('govuk_frontend_toolkit/javascripts/vendor/polyfills/bind.js',
            'govuk_frontend_toolkit/javascripts/govuk/selection-buttons.js',
            'js/vendor/polyfills/details.polyfill.js',
            'js/components/case-list.js',
            'js/components/inits.js',
            filters='jsmin', output='js/components.js')
assets.register('js_components', js)
```


## Working on this style guide

### Getting started

The style guide itself is a Flask application, including a Flask Assets workflow.

Clone this repo: ``` git clone git@github.com:LandRegistry/lr-style-guide.git ```

Set up a Python virtual environment and activate it.

Next install requirements: ``` pip install -r requirements.txt ```

Then ``` python app/server.py ``` should get you running on http://localhost:5000


