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

const redis = require('./redis/redis.js');
const PORT = process.env.PORT || 8080;

const redisAdapter = adapter({    
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASS || 'password',
});

io.attach(httpServer);
io.adapter(redisAdapter);


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
            const canConnect = await redis
            .setAsync(`users: ${user.id}`, socket.id, 'NX', 'EX', 30);            socket.user = user;
            
            if(!canConnect){
                return cb({message: 'already connected'});
            }
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