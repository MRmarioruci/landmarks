const sharp = require('sharp');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const utils = require('./utils');

const checkIfLogged = () => {
	return new Promise(async (resolve, reject) => {
		const currentUser = Parse.User.current();
		if(currentUser){
			resolve(currentUser);
		}else{
			reject(null);
		}
	})
}
const isLogged = async (req, res) => {
	const currentUser = await checkIfLogged().catch((e) => utils.log('INFO', 'User not logged'))
	if(currentUser){
		res.json( utils.standardResponse('SUCCESS', currentUser.getUsername()))
	}else{
		res.json( utils.standardResponse('ERROR', 'Not logged'))
	}
};
const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await Parse.User.logIn(username, password);
		res.json(utils.standardResponse('SUCCESS', user.getUsername()))
		utils.log('SUCCESS', 'User logged in');
	} catch (error) {
		res.json(utils.standardResponse('ERROR', 'Could not login'))
		utils.log('ERROR', error);
	}
}
const logout = async (req, res) => {
	try {
		await Parse.User.logOut();
		res.json(utils.standardResponse('SUCCESS', true))
		utils.log('SUCCESS', 'User logged out');
	} catch (error) {
		res.json(utils.standardResponse('ERROR', 'Logout error'))
		utils.log('ERROR', 'User log out error');
	}
}
const getLandmarks = (req, res) => {
	const searchTerm = req.query.searchTerm;
	const landmarkId = req.query.landmarkId;
	const query = new Parse.Query('Landmark');
	if (searchTerm) {
		query.matches('title', searchTerm, 'i');
		query.matches('short_info', searchTerm, 'i');
		query.matches('description', searchTerm, 'i');
	}
	if (landmarkId) {
		query.equalTo('objectId', landmarkId);
	}
	query.ascending('order');
	query.find().then((results) => {
		/* Just convert the result to a assoc array for better use */
		const data = results.reduce((acc, obj) => {
			acc[obj.id] = obj.toJSON();
			return acc;
		}, {});
		res.json(utils.standardResponse('SUCCESS', data));
	}).catch((error) => {
		res.status(500).json(utils.standardResponse('ERROR', 'Could not fetch landmark data'));
		utils.log('ERROR', error);
	});
}
const saveToDb = (objectId, fieldName, fieldValue) => {
	return new Promise(async (resolve, reject) => {
		try {
			const MyClass = Parse.Object.extend('Landmark');
			const query = new Parse.Query(MyClass);
			const object = await query.get(objectId);

			object.set(fieldName, fieldValue);

			const updatedObject = await object.save({ key: Parse.masterKey }, { useMasterKey: true });
			utils.log('SUCCESS', 'Field updated');
			resolve(updatedObject);
		} catch (error) {
			utils.log('ERROR', error);
			reject(false);
		}
	})
}
const editLandmark = async (req, res) => {
	const user = await checkIfLogged().catch((e) => { return null; });
	if (!user) return res.json(utils.standardResponse('ERROR', 'Not logged'));

	const { objectId, fieldName, fieldValue } = req.body;
	saveToDb(objectId, fieldName, fieldValue)
	.then((d) => {
		res.json(utils.standardResponse('SUCCESS', d))
	})
	.catch((e) => {
		res.status(500).json(utils.standardResponse('ERROR', 'Edit error'))
	})
}
const imageUpload = async (req, res) => {
	const user = await checkIfLogged().catch((e) => { utils.log('ERROR', 'User not logged in'); });
	if (!user) return res.json(utils.standardResponse('ERROR', 'Not logged'));

	utils.log('INFO', 'Trying to save images');

	const { objectId } = req.body;
	const file = req.file;

	// No need to generate a random name as parse server already does that.
	/* const randomFilename = `${uuidv4()}-${file.originalname}`; */

	// Generate thumbnail using sharp
	const thumbnailBuffer = await sharp(file.path)
		.resize(400, 200)
		.toBuffer();

	const thumbnailFile = new Parse.File('thumbnail.jpg', { base64: thumbnailBuffer.toString('base64') });
	await thumbnailFile.save();

	const originalFileData = fs.readFileSync(file.path);
	const originalFile = new Parse.File('original.jpg', { base64: originalFileData.toString('base64') });
	await originalFile.save();

	fs.unlinkSync(file.path);
	
	if(originalFile && thumbnailFile){
		await saveToDb(objectId, 'photo', originalFile.url()).catch((e) => utils.log('ERROR', 'Could not save original on database'))
		await saveToDb(objectId, 'photo_thumb', thumbnailFile.url()).catch((e) => utils.log('ERROR', 'Could not save thumbnail on database'))
	}else{
		utils.log('ERROR', 'Something went wrong with image saving');
		return res.send(utils.standardResponse('ERROR', 'Could not upload'));
	}
	utils.log('SUCCESS', 'Files saved');
	return res.send(utils.standardResponse('SUCCESS', 'Uploaded'));
}

module.exports = {
	isLogged:isLogged, 
	login:login, 
	logout: logout, 
	getLandmarks:getLandmarks,
	editLandmark: editLandmark,
	imageUpload: imageUpload
}