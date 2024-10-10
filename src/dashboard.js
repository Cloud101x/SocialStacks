document.getElementById('logout-btn').addEventListener('click', () => {
    window.electron.ipcRenderer.send('logout');
});

document.getElementById('proceed-btn').addEventListener('click', () => {
    window.electron.ipcRenderer.send('proceed');
});