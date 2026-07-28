/**
 * Resizes and compresses an image file before upload
 * @param {File} file - Raw uploaded file
 * @param {number} maxWidth - Max width in pixels (default 1000px)
 * @param {number} maxHeight - Max height in pixels (default 1000px)
 * @param {number} quality - WebP quality 0 to 1 (default 0.8)
 * @returns {Promise<File>} Compressed WebP file
 */
export async function compressImage(file, maxWidth = 1000, maxHeight = 1000, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File(
                [blob], 
                file.name.replace(/\.[^/.]+$/, "") + ".webp", 
                { type: 'image/webp', lastModified: Date.now() }
              );
              resolve(compressedFile);
            } else {
              reject(new Error('Canvas to Blob conversion failed'));
            }
          },
          'image/webp',
          quality
        );
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
}