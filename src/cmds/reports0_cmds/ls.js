var config = require('../../config');
var api    = require('../../api');

exports.command = 'ls [name]';

exports.desc = 'List reports';

exports.builder = function(yargs) {
    yargs.option('subdomains', { type: 'boolean', description: 'Include all subdomains of the specified name' });
    yargs.option('group',      { type: 'string',  description: 'Return only reports from hosts with this group' });
}

exports.handler = function ls_reports0_handler(argv) {

    var opt = ['name', 'subdomains', 'group']
        .reduce(function(o, name) {
            if (argv.hasOwnProperty(name)) o[name] = argv[name];
            return o;
        }, {});

    var conf   = config.read(argv);
    var format = argv.format || conf.default_format || 'yaml';
    if (format === 'csv') opt.format = 'csv';

    api.init(argv).getReports0(opt)
        .then(function(response){
            if (format === 'csv') return console.log(response.data.replace(/[\r\n]+$/,''));
            api.displayResults(argv, response.data.reports);
        })
        .catch(api.catchError);

};