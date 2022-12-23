const { app, BrowserWindow, Menu } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { menu } = require('./menu')

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		icon: __dirname + '/logo512.png',
		webPreferences: {
			nodeIntegration: true,
		},
	});

	Menu.setApplicationMenu(menu)
	// eslint-disable-next-line no-magic-numbers
	const port = 3000;

	// and load the index.html of the app.
	mainWindow.loadURL(isDev
		? `http://localhost:${ port }`
		: mainWindow.loadFile(path.join(__dirname, 'index.html')));

	// Open the DevTools.
	isDev && mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin')
		app.quit();
});

app.on('activate', () => {
	if(BrowserWindow.getAllWindows().length === 0)
		createWindow();
});
