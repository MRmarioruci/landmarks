require('dotenv').config({ path: './core/.env' });

const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const path = require('path');

const app = express();
app.use('/public', express.static(path.join(__dirname, '/public')));

const parseServer = new ParseServer({
	databaseURI: process.env.DB_URI,
	/* cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js', */
	appId: process.env.APP_ID,
	masterKey: process.env.MASTER_KEY,
	serverURL: process.env.SERVER_URL,
});
parseServer.start();
const dashboard = new ParseDashboard({
	apps: [
		{
			serverURL: process.env.SERVER_URL,
			appId: process.env.APP_ID,
			masterKey: process.env.MASTER_KEY,
			appName: process.env.APP_NAME,
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

app.get('/', function (req, res) {
	res.status(200).send('Index page goes here...');
});

const port = process.env.SERVER_PORT || 5000;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
	console.log(`Server running on port ${port}`);
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);