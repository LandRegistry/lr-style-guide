# Land Registry style guide

## How can my app consume this style guide?

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


