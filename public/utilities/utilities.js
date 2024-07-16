const https = require('https');
const fs = require('fs');

const saveFile = (dir, file, name) => {
    const checkFileExist  = fs.existsSync(`${dir}/${name}`, { });
    let productName = name;
    if (checkFileExist){
        const fileExt = name.split('.').at(-1);
        const randomNumber = randomHexNumber();
        productName = `img_${randomNumber}.${fileExt}`;
    }
    try {
        fs.writeFile(`${dir}/${productName}`, file.buffer, (err) => {
            if (err){
                throw Error(err);
            }
        })
    } catch (error) {
        throw Error(error);
    }
}

const randomHexNumber = () => {
    // Generate a random number and convert it to hexadecimal string representation.
    const n = (Math.random() * 0xfffff * 1000000).toString(16);
    // Return the hexadecimal color code with '#' appended.
    return n.slice(0, 10);
};


const storeProductImg = (dir, file, productTitle, category) => {
    //checking whether same file exist or not
    let directory = dir;
    let fileName = file.originalname;
    //checking whether directory present or not
    //dir = products/category
    const checkDirectory = fs.existsSync(directory);
    //if exist then check for product title directory
    if (checkDirectory){
        directory = `${dir}/${productTitle}`;
        const checkProductTitleDir = fs.existsSync(directory);
        if (checkProductTitleDir){
            //then save the file
            try {
                saveFile(directory, file, fileName);
                return { status: 'success', name: fileName, url: `https://boxdelabonita-server.onrender.com/products/${category}/${productTitle}/${fileName}` };
            } catch (error) {
                return { status: 'file writing failed' }
            }
        }
        else {
            //create product title directory and then save the file
            fs.mkdirSync(directory, { recursive: true }, (err) =>  {
                if (err){
                    throw Error(err);
                }
            })
            try {
                saveFile(directory, file, fileName);
                return { status: 'success', name: fileName, url: `https://boxdelabonita-server.onrender.com/products/${category}/${productTitle}/${fileName}` }
            } catch (error) {
                    return { status: 'file writing failed' };
            }
        }
    }
    //otherwise create directory and save file in that directory
    else {
        directory = `${dir}/${productTitle}`;
        try {
            fs.mkdirSync(directory, { recursive: true }, (err) => {
                if (err) {
                    throw Error(err);
                }
            })
            saveFile(directory, file, fileName);
            return { status: 'success', name: fileName, url: `https://boxdelabonita-server.onrender.com/products/${category}/${productTitle}/${fileName}` }
        } catch (error) {
            return { status: 'failed' };
        }
    }
}

function cronJob () {
    setInterval(() => {
        https.get('https://boxdelabonita-server.onrender.com', (result) => {
            console.log('pinging...')
        })
    }, 840000);
}

module.exports = {
    cronJob, storeProductImg
}

