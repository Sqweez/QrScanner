'use strict'
import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import {
    app,
    protocol,
    BrowserWindow,
    ipcMain,
    ipcRenderer
} from 'electron'
import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import DownloadManager from 'electron-download-manager';

DownloadManager.register({
    downloadFolder: app.getPath('downloads') + '/qr-scanner'
});

const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();

const isDevelopment = process.env.NODE_ENV !== 'production';

let win;

protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
        secure: true,
        standard: true
    }
}])

function createWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        icon: app.getAppPath() + '/icon.png',
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app');
        win.loadURL('app://./index.html')
    }

    win.on('closed', () => {
        win = null
    })
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

app.on('ready', async () => {
    createWindow();
    app.commandLine.appendSwitch('inspect', '5858');
    ipcMain.on('download-pdf', async (event, info) => {
        DownloadManager.download({
            url: info.url
        }, function (err, data) {
            console.log(data);
            console.log(err);
            const path = data.filePath;
            pdfExtract.extract(path, {}, async (err, data) => {
                if (err) return console.log(err);
                const currrentWin = BrowserWindow.getFocusedWindow();
                currrentWin.webContents.send('file-parsed', data);
            });
        });
    });
});


app.on('before-quit', async () => {
    const directory = app.getPath('downloads') + '/qr-scanner';
    deleteFolderRecursive(directory);
});

const deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
    }
};

if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}