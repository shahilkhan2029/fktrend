export async function uploadToCloudinary(file: File, signatureData: { signature: string, timestamp: number, cloudName: string, apiKey: string }) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('signature', signatureData.signature);
  formData.append('timestamp', signatureData.timestamp.toString());
  formData.append('api_key', signatureData.apiKey);
  formData.append('folder', 'fk_trend');

  const res = await fetch(`https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Cloudinary upload failed');
  }

  const data = await res.json();
  return data.secure_url as string;
}
