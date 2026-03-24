"use client";

export default function DiagnosticoCloudinary() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg text-xs">
      <h3 className="font-bold mb-2">Diagnóstico Cloudinary</h3>
      <div>
        <strong>Cloud Name:</strong> {cloudName || "❌ NO DEFINIDO"}
      </div>
      <div>
        <strong>Upload Preset:</strong> {uploadPreset || "❌ NO DEFINIDO"}
      </div>
      <div className="mt-2 text-slate-500">
        {cloudName && uploadPreset ? "✅ Configurado" : "⚠️ Falta configuración"}
      </div>
    </div>
  );
}
