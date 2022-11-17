const { mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');


const typeArray = loadFilesSync(path.join(__dirname, '..', 'schema'), {extensions: ['js']})

module.exports = mergeTypeDefs(typeArray)