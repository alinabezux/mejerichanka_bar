const S3 = require('aws-sdk/clients/s3');
const path = require("path");
const uuid = require('uuid');

const {S3_BUCKET_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME} = require("../configs/configs");

const s3Bucket = new S3({
    region: S3_BUCKET_REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY
});

async function uploadPublicFile(fileToUpload, itemType, itemId) {
    return s3Bucket.upload({
        ContentType: fileToUpload.mimetype,
        ACL: "public-read",
        Body: fileToUpload.data,
        Bucket: S3_BUCKET_NAME,
        Key: createFileName(fileToUpload.name, itemType, itemId)
    }).promise()
}

function createFileName(fileName, itemType, itemId) {
    const extname = path.extname(fileName);
    return `${itemType}/${itemId}/${uuid.v4()}${extname}`;
}

module.exports = {uploadPublicFile}
