var testsContext;

testsContext = require.context('./lib', true, /_spec\.js$/);
testsContext.keys().forEach(testsContext);
