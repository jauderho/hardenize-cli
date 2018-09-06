var api = require('../../api');

exports.command = 'ls [name]';

exports.desc = 'List hosts';

exports.builder = function(yargs) {
    yargs.option('subdomains', { type: 'boolean', description: 'Include all subdomains of the specified name', default: true });
    yargs.option('limit',      { type: 'integer', description: 'Return only up to the specified number of hosts' });
    yargs.option('origin',     { type: 'string',  description: 'Return only hosts with this origin', choices: ['manual', 'ct', 'discovery'] });
    yargs.option('status',     { type: 'string',  description: 'Return only hosts with this status', choices: ['idle', 'monitored', 'archived'] });
    yargs.option('tag',        { type: 'string',  description: 'Return only hosts with this tag' });
}

exports.handler = function ls_hosts_handler(argv) {

    var opt = ['subdomains', 'limit', 'name', 'origin', 'status', 'tag']
        .reduce(function(o, name) {
            if (argv.hasOwnProperty(name)) o[name] = argv[name];
            return o;
        }, {});

    api.init(argv).getHosts(opt)
        .then(function(response){
            console.log(JSON.stringify(response.data, null, 2));
        })
        .catch(api.catchError);

};