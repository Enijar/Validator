const elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

elixir.config.assetsPath = 'src';
elixir.config.js.folder = '/';
elixir.config.js.outputFolder = '/';

elixir((mix) => {
    elixir.config.publicPath = 'examples/js';
    mix.browserify('app.js');

    elixir.config.publicPath = 'dist';
    mix.browserify('Validator.js');
});
