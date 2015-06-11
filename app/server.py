from flask import Flask, render_template
from os import path

from flask.ext.assets import Environment, Bundle
import sass as libsass


__dot = path.dirname(path.realpath(__file__))
__toolkit_dir = path.join(__dot, 'static/govuk_frontend_toolkit/stylesheets/')

def compile_sass(_in, out, **kw):
    out.write(
        libsass.compile(
            string=_in.read(),
            include_paths=[__toolkit_dir]
        )
    )


app = Flask(__name__)
assets = Environment(app)

sass = Bundle('sass/styleguide.scss',
              filters=(compile_sass,), output='css/styleguide.css')
assets.register('styleguide', sass)


@app.route('/')
def home():
    return render_template('styleguide/index.html')

if __name__ == '__main__':
    app.run(debug=True)
    # Bind to PORT if defined, otherwise default to 5000.
    #port = int(os.environ.get('PORT', 5000))
    #app.run(host='0.0.0.0', port=port, debug=True)