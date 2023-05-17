require('dotenv').config({ path: './core/.env' });

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const cors = require('cors');
const { isLogged, login, logout, getLandmarks, editLandmark, imageUpload } = require('./core/actions.js');

const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const Parse = require('parse/node');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, '/public')));


const parseServer = new ParseServer({
	databaseURI: process.env.DB_URI,
	appId: process.env.APP_ID,
	masterKey: process.env.MASTER_KEY,
	serverURL: process.env.SERVER_URL,
	//allowPublicAccess: true,
});
Parse.User.enableUnsafeCurrentUser();
parseServer.start();
const dashboard = new ParseDashboard({
	apps: [
		{
			serverURL: process.env.SERVER_URL,
			appId: process.env.APP_ID,
			masterKey: process.env.MASTER_KEY,
			appName: process.env.APP_NAME,
			sessionLength: 86400, // 24 hours (adjust as needed)
			sessionTokenKey: 'your-session-token-key', // Replace with your own session token key
		},
	],
	users: [
		{
			user: process.env.APP_USER,
			pass: process.env.APP_PASS
		},
	],
});
app.use('/parse', parseServer.app);
app.use('/dashboard', dashboard)

/* Simple endpoint setup */
app.get('/getLandmarks', getLandmarks);
app.get('/isLogged', isLogged)
app.post('/login', login)
app.post('/logout', logout)
app.post('/editLandmark', editLandmark);
app.post('/imageUpload', upload.single('file'), imageUpload);
app.get('/', (req, res) => {
	res.status(200).send('Oh my.. you found me...');
});

const port = process.env.SERVER_PORT || 5000;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
	console.log(`Server running on port ${port}`);
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);