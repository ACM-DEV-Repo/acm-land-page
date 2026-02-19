import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
  try {
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
    const compressedFile = await imageCompression(file, options);
    return new File([compressedFile], file.name, { type: compressedFile.type, lastModified: Date.now() });
  } catch (error) {
    console.warn('Compressão de imagem falhou, usando arquivo original:', error);
    return file;
  }
}