
export const imageNodeTypes = [
    {
        type: "image_data",
        label: "image_data",
        description: "Get image pixel data from file",
        inputs: (ports: any) => [
            { name: 'filearray', label: 'filearray', type: 'filearray' },
            { name: 'width', label: 'width', type: 'number' },
            { name: 'height', label: 'height', type: 'number' },
        ],
        outputs: (ports: any) => (d: any) => {
            return [
                { name: 'numberarray', label: 'numberarray', type: 'numberarray' },
                { name: 'width', label: 'width', type: 'number' },
                { name: 'height', label: 'height', type: 'number' },
            ];
        },
        code: async ({filearray, width, height}: any) => {
            return new Promise((resolve, reject) => {
                var reader = new FileReader();
                reader.onload = function(event){
                    var img = new Image();
                    img.onload = function(){
                        console.log('abc');
                        let x = img.width;
                        let y = img.height;
                        if (width > 0 && height > 0) {
                            const xScale = width/img.width;
                            const yScale = height/img.height;
                            const scale = Math.min(xScale, yScale);
                            x = Math.round(img.width*scale);
                            y = Math.round(img.width*scale);
                        }
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = x;
                        canvas.height = y;
                        ctx.drawImage(img,0,0,img.width,img.height,0,0,x,y);
                        const d = ctx.getImageData(0, 0, x, y).data;
                        const arr = Array.prototype.slice.call(d);
                        console.log(arr);
                        resolve({ numberarray: arr, width: x, height: y });
                    }
                    img.src = event.target.result as any;
                }
                reader.readAsDataURL(filearray[0]); 
            });      
        },
    },
    {
        type: "image_generate",
        label: "image_generate",
        description: "Downloads an image from pixel data",
        inputs: (ports: any) => [
            { name: 'numberarray', label: 'numberarray', type: 'numberarray' },
            { name: 'width', label: 'width', type: 'number' },
            { name: 'height', label: 'height', type: 'number' },
        ],
        outputs: (ports: any) => (d: any) => {
            return [
                { name: 'string', label: 'string', type: 'string' },
            ];
        },
        code: async ({numberarray, width, height}: any) => {
            console.log('down');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            ctx.putImageData(new ImageData(new Uint8ClampedArray(numberarray), width, height), 0, 0);
            
            var link = document.createElement('a');
            link.download = 'image.png';
            link.href = canvas.toDataURL()
            link.click();
            return { string: 'ok' };     
        },
    },
];
