const cluster = require('cluster');
const Server = require('line-socket/server');
const server = new Server({port: 3000, timeout: 0});

server.on('connection', function(connection) {
    /**
     * Eval request
     */
    connection.on('eval', message => {
        if (!message.payload.fen)
            return message.reject(new Error('Missing FEN'));

        console.log('Eval request recieved, forking new worker...');

        const worker = cluster.fork();
        const msg = {
            type: 'eval',
            fen: message.payload.fen
        };

        worker.on('online', () => {
            console.log('Worker is online, sending message...');
            worker.send(JSON.stringify(msg));
        });

        worker.on('message', (msg) => {
            console.log('Got response from worker');
            msg = JSON.parse(msg);

            if (msg.err) {
                message.reject(new Error(msg.err));
            } else {
                message.resolve(msg.result);
            }

            console.log('Killing the worker...');
            worker.kill();
        });
    });


    /**
     * Search request
     */
    connection.on('search', message => {
        if (!message.payload.fen)
            return message.reject(new Error('Missing FEN'));

        console.log('Search request recieved, forking new worker...');

        const worker = cluster.fork();
        const msg = {
            type: 'search',
            fen: message.payload.fen,
            depthLimitSoft: message.payload.depthLimitSoft || 4,
            depthLimitHard: message.payload.depthLimitHard || 6
        };

        worker.on('online', () => {
            console.log('Worker is online, sending message...');
            worker.send(JSON.stringify(msg));
        });

        worker.on('message', (msg) => {
            console.log('Got response from worker');
            msg = JSON.parse(msg);

            if (msg.err) {
                message.reject(new Error(msg.err));
            } else {
                message.resolve(msg.result);
            }

            console.log('Killing the worker...');
            worker.kill();
        });
    });
});

server
    .start()
    .then(_ => {
        console.log('Server ready');
    })
    .catch(err => {
        console.log(`Server could not started`, err);
        process.exit(1);
    });
