module.exports = function(express, app) {

    app.configure(function() {
        app.set('views', __dirname + '/../views');
        app.set('view engine', 'jqtpl');
        app.register('.jqtpl', require('jqtpl').express);
        app.use(express.compiler({
            enable: ['less'],
            src: __dirname + '/../src/',
            dest: __dirname + '/../out/'
        }));
        app.use(app.router);
        app.use(express.static(__dirname + '/../out'));
    });

    app.configure('development', function() {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    app.configure('production', function() {
        app.use(express.errorHandler());
    });

};