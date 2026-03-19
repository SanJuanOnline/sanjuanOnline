// Función para comprimir imagen antes de subir
async function comprimirImagen(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Redimensionar si es muy grande (máximo 1920px)
        const maxDimension = 1920;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Comprimir a 85% de calidad
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error("Error al comprimir imagen"));
            }
          },
          "image/jpeg",
          0.85
        );
      };
      img.onerror = () => reject(new Error("Error al cargar imagen"));
    };
    reader.onerror = () => reject(new Error("Error al leer archivo"));
  });
}

export async function subirImagenCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    console.error("Cloudinary config:", { cloudName, uploadPreset });
    throw new Error("Cloudinary no está configurado correctamente");
  }

  // Validar tamaño original (máximo 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error("La imagen es muy pesada. Máximo 10MB");
  }

  // Validar tipo
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (!validTypes.includes(file.type)) {
    throw new Error("Formato no válido. Usa JPG, PNG, WebP o GIF");
  }

  // Comprimir imagen si es mayor a 1MB
  let fileToUpload = file;
  if (file.size > 1024 * 1024) {
    try {
      fileToUpload = await comprimirImagen(file);
      console.log(`Imagen comprimida: ${(file.size / 1024).toFixed(0)}KB → ${(fileToUpload.size / 1024).toFixed(0)}KB`);
    } catch (error) {
      console.warn("No se pudo comprimir, subiendo original:", error);
      fileToUpload = file;
    }
  }

  const formData = new FormData();
  formData.append("file", fileToUpload);
  formData.append("upload_preset", uploadPreset);

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
