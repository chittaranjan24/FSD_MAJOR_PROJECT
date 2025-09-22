const Imaggekit = require('imagekit');
const {v4: uuidv4} = require('uuid');

const imagekit = new Imaggekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'public_key',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_key',
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/demo',
});

async function uploadImage({buffer, folder = '/products'}) {
    const res = await imagekit.upload({
        file: buffer,
        fileName: uuidv4(), // Unique file name
        folder
    });
    return {
        url: res.url,
        thumbnail: res.thumbnailUrl || res.url,
        id: res.fileId,
    };
}

module.exports = { imagekit, uploadImage };