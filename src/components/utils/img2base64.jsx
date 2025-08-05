export async function img2base64(urlImg) {
  var img = new Image();
  img.src = urlImg;
  img.crossOrigin = 'Anonymous';

  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

  canvas.height = img.naturalHeight;
  canvas.width = img.naturalWidth;
  ctx.drawImage(img, 0, 0);

  var b64 = canvas.toDataURL('image/png').replace(/^data:image.+;base64,/, '');
  return b64;
};