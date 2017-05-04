const path = require('path')
const glob = require('glob')
const electron = require('electron')
const autoUpdater = require('./auto-updater')

const BrowserWindow = electron.BrowserWindow
const app = electron.app

let mainWindow = null

// function initialize() {
    // let shouldQuit = makeSingleInstance()

    // if(shouldQuit) return app.quit()


    function createWindow(){
        let windowOptions = {
            width:1080,
            minWidth:680,
            height:840,
            title:app.getName()
        }

        mainWindow = new BrowserWindow(windowOptions)
        mainWindow.loadURL(path.join('file://',__dirname,'/index.html'))

        mainWindow.on('closed',function(){
            mainWindow=null
        })
    }


// }


    app.on('ready',function(){
             loadDemos()

    createWindow()
    // autoUpdater.initialize()
})


app.on('window-all-closed', function(){
    if(process.platform!=='darwin'){
        app.quit()
    }
})


app.on('active',function(){
    if(mainWindow===null){
        createWindow()
    }
})


function makeSingleInstance() {
    if(process.mas) return false

    return app.makeSingleInstance(function (){
        if(mainWindow){
            if(mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

function loadDemos(){
    let files = glob.sync(path.join(__dirname,'main-process/**/*.js'))
    files.forEach(function(file){
        require(file)
    })

    // autoUpdater.updateMenu()
}