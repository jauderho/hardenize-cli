var cmd = require('../../cmd');

exports.command = 'ls [type]';

exports.desc = 'List events';

exports.builder = function(yargs) {
    yargs.option('since', { type: 'date',    description: 'Return only events created since the specified date' });
    yargs.option('limit', { type: 'integer', description: 'Return only up to the specified number of events' });
}

exports.handler = function ls_events_handler(argv) {

    var opt = ['type', 'since', 'limit']
        .reduce(function(o, name) {
            if (argv.hasOwnProperty(name)) o[name] = argv[name];
            return o;
        }, {});

    cmd.api(argv).getEvents(opt)
        .then(function(response){
            cmd.displayResults(argv, response.data.events);
        })
        .catch(cmd.catchError);

};