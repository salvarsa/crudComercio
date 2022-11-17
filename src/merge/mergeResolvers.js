const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

const resolversArray = loadFilesSync(path.join(__dirname, '..', 'resolvers'), {extensions: ['js']});

module.exports = mergeResolvers(resolversArray)