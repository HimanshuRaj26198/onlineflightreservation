// 'use strict';

// module.exports.apiLoginKey = '87tAKFx3c';
// module.exports.transactionKey = '328s9985HYeb5E7k';
// module.exports.config = {
//     'logger': {
//         'enabled': false,
//         'location': '',
//         //logging levels - { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
//         'level': 'silly'
//     }
// }

module.exports = {
    apiLoginKey: process.env.APILOGINID,
    transactionKey: process.env.TRANSACTIONKEY,
    config: {
        logger: {
            enabled: false,
            location: '',
            level: 'silly',
        },
    },
};
