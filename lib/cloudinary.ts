export async function subirImagenCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    console.error("Cloudinary config:", { cloudName, uploadPreset });
    throw new Error("Cloudinary no está configurado correctamente");
  }

  // Validar tamaño (máximo 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error("La imagen es muy pesada. Máximo 5MB");
  }

  // Validar tipo
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (!validTypes.includes(file.type)) {
    throw new Error("Formato no válido. Usa JPG, PNG, WebP o GIF");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "sanjuanonline"); // Organizar en carpeta

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary error:", data);
      throw new Error(data.error?.message || "Error al subir imagen");
    }

    return data.secure_url;
  } catch (error: any) {
    console.error("Error subiendo a Cloudinary:", error);
    throw new Error(error.message || "No se pudo subir la imagen. Intenta de nuevo.");
  }
}
