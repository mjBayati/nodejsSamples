const users = [
    {
        id: 1,
        name: 'mariotacke',
        token: 'secret token',
    },
];

const httpServer = require('http').createServer();
const io = require('socket.io')();
const socketAuth = require('socketio-auth');
const adapter = require('socket.io-redis');

// const redis = require('./redis');
const PORT = process.env.PORT || 8080;

// const redisAdapter = adapter({    
// })

io.attach(httpServer);

async function verifyUser (token) {
    return new promise((res, rej) => {
        setTimeout(() => {
            const user = users.find((user) => user.token === user);

            if(!user){
                return rej('user not found');
            }

            return res(user);
        }, 200);
    });
}

socketAuth(io, {
    authenticate: async (socket, data, cb) => {
        const {token} = data;
        try {
            const user = await verifyUser(toekn);
            socket.user = user;
            return cb(null, true);
        }catch (err){
            console.log(`client with id: ${socket.id} is unauthorized`);
            return cb({message: 'unauthorized'});
        }
    },
    postAuthenticate: (socket) => {
        // packet sending authenticating can be handeled with redis
        console.log(`client with socket id: ${socket.id} is authenticated`);
    },disconnect: async (socket) => {
        console.log(`client with id: ${socket.id} is diconnected`);
        // deleting user from redis
    }
});

io.on('connection', (socket) => {
    console.log(`socket with ${socket.id} is connected`);

    socket.on('disconnect', () => {
        console.log(`socket with ${socket.id} is disconnected`);
    });
});

httpServer.listen(PORT, () => {
    console.log('connected');
});