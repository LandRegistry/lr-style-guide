from flask import Flask, render_template

from os import path
from os import environ

from flask.ext.assets import Environment, Bundle
import sass as libsass


__dot = path.dirname(path.realpath(__file__))

__toolkit_scss_dir = path.join(__dot, 'static/govuk_frontend_toolkit/stylesheets/')
__styleguide_scss_dir = path.join(__dot, 'static/sass/')

def compile_sass(_in, out, **kw):
    out.write(
        libsass.compile(
            string=_in.read(),
            include_paths=[__toolkit_scss_dir, __styleguide_scss_dir]
        )
    )


app = Flask(__name__)
assets = Environment(app)

sass = Bundle('sass/styleguide.scss',
              filters=(compile_sass,), output='css/styleguide.css')
assets.register('styleguide', sass)

sass_ie8 = Bundle('sass/styleguide-ie8.scss',
              filters=(compile_sass,), output='css/styleguide-ie8.css')
assets.register('styleguide_ie8', sass_ie8)

sass_ie7 = Bundle('sass/styleguide-ie7.scss',
              filters=(compile_sass,), output='css/styleguide-ie7.css')
assets.register('styleguide_ie7', sass_ie7)

sass_ie6 = Bundle('sass/styleguide-ie6.scss',
              filters=(compile_sass,), output='css/styleguide-ie6.css')
assets.register('styleguide_ie6', sass_ie6)

js = Bundle('govuk_frontend_toolkit/javascripts/vendor/polyfills/bind.js',
            'govuk_frontend_toolkit/javascripts/govuk/selection-buttons.js',
            'js/vendor/polyfills/details.polyfill.js',
            'js/components/case-list.js',
            'js/components/inits.js',
            filters='jsmin', output='js/components.js')
assets.register('js_components', js)

# Example only styles
examples = Bundle('demo/sass/styleguide-examples.scss',
              filters=(compile_sass,), output='demo/css/styleguide-examples.css')
assets.register('styleguide-examples', examples)

# Small thing to allow source code examples in a template
app.jinja_env.globals['include_raw'] = lambda filename : app.jinja_loader.get_source(app.jinja_env, filename)[0]

# General base styles

@app.route('/')
def home():
    return render_template('styleguide/index.html')

@app.route('/typography')
def typography():
    return render_template('styleguide/typography.html')

@app.route('/layout')
def layout():
    return render_template('styleguide/layout.html')

@app.route('/forms')
def forms():
    return render_template('styleguide/forms.html')

@app.route('/buttons-and-similar-controls')
def buttons_and_similar_controls():
    return render_template('styleguide/buttons_and_similar_controls.html')

@app.route('/tables-and-data-display')
def tables_and_data_display():
    return render_template('styleguide/tables_and_data_display.html')

@app.route('/panels-and-callouts')
def panels_and_callouts():
    return render_template('styleguide/panels_and_callouts.html')

# Components

@app.route('/case-list')
def case_list():
    return render_template('styleguide/case_list.html')

@app.route('/search-results')
def search_results():
    return render_template('styleguide/search_results.html')

@app.route('/pagination')
def pagination():
    return render_template('styleguide/pagination.html')

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
