
export const importJson = () => new Promise((resolve, reject) => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.addEventListener('change', (e: any) => {
        var files = e.target.files;
        var file = files[0];           
        var reader = new FileReader();
        reader.onload = function(event) {
            resolve(JSON.parse(event.target.result as string));           
        }
        reader.readAsText(file);
    });
    fileInput.click();
});
