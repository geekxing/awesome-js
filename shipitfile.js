module.exports = function (shipit) {
    require('shipit-deploy')(shipit);
    shipit.initConfig({
        default: {
            workspace: '/tmp/github-monitor',
            deployTo: '/tmp/deploy_to',
            repositoryUrl: 'https://github.com/geekxing/awesome-js.git',
            ignores: ['.git', 'node_modules'],
            keepReleases: 2,
            deleteOnRollback: false,
            key: '/path/to/key',
            shallowClone: true
        },
        staging: {
            servers: 'ubuntu@111.230.133.70',
            branch: 'master'
        }
    });
};