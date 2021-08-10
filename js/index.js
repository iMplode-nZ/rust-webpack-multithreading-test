window.EventSource = require('event-source-polyfill').EventSourcePolyfill;

window.createEventSource = (url, options) => {
    return new EventSource(url, options);
};

window.onDataChannelPromise = (connection, timeout) => {
    return new Promise((resolve, reject) => {
        connection.ondatachannel = (event) => resolve(event.channel);
        setTimeout(() => reject('Timeout when creating channel'), timeout);
    });
};

(async () => {
    const main = await require('../pkg/index.js');

    console.log(main);
})();
