require.config({
    paths: {
        jquery: './jquery.min',
        list: './lib/list'
    }
});

require(['list'], function(list) {
    list.render();
});