from flask import Flask, render_template
from os import path

from flask.ext.assets import Environment, Bundle
import sass as libsass


__dot = path.dirname(path.realpath(__file__))
__toolkit_dir = path.join(__dot, 'static/govuk_frontend_toolkit/stylesheets/')
__styleguide_dir = path.join(__dot, 'static/sass/partials/')

def compile_sass(_in, out, **kw):
    out.write(
        libsass.compile(
            string=_in.read(),
            include_paths=[__toolkit_dir, __styleguide_dir]
        )
    )


app = Flask(__name__)
assets = Environment(app)

sass = Bundle('sass/styleguide.scss',
              filters=(compile_sass,), output='css/styleguide.css')
assets.register('styleguide', sass)

examples = Bundle('sass/styleguide-examples.scss',
              filters=(compile_sass,), output='css/styleguide-examples.css')
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

# Components

@app.route('/case-list')
def case_list():
    return render_template('styleguide/case_list.html')

if __name__ == '__main__':
    app.run(debug=True)
    # Bind to PORT if defined, otherwise default to 5000.
    #port = int(os.environ.get('PORT', 5000))
    #app.run(host='0.0.0.0', port=port, debug=True)