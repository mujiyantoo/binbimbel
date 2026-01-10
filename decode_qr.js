const fs = require('fs');
const PNG = require('pngjs').PNG;
const jsQR = require('jsqr');

const buffer = fs.readFileSync('frontend/public/images/barcode.png');
const png = PNG.sync.read(buffer);
const code = jsQR(png.data, png.width, png.height);

if (code) {
    console.log("QR Code URL:", code.data);
} else {
    console.log("Failed to decode QR code.");
}
