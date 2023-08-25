const {app, BrowserWindow} = require('electron')
const {PythonShell} = require('python-shell')


let mainWindow;

app.on('ready', function() {
    PythonShell.run('./app.py');
    const openWindow = () => {
        mainWindow = new BrowserWindow({width: 800, height: 600});
        mainWindow.loadURL('http://localhost:5000');
        //mainWindow.loadFile("./react/my-ui/build/index.html")
    };
    openWindow();
})

app.on("window-all-closed", function(){
    
    
    if (process.platform !== 'darwin') app.quit();
});