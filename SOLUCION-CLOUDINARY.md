# 🔧 Solución: Error al Subir Imágenes a Cloudinary

**Problema:** Las imágenes no se suben y da error

---

## ✅ Verificaciones Necesarias

### 1. Verificar Upload Preset en Cloudinary

**Ir a Cloudinary Dashboard:**
1. https://console.cloudinary.com/
2. Settings (⚙️) → Upload
3. Buscar sección **"Upload presets"**
4. Verificar que existe un preset con el nombre que tienes en `.env.local`

**Configuración requerida del preset:**
- ✅ **Signing Mode:** Unsigned (IMPORTANTE)
- ✅ **Folder:** sanjuanonline (opcional pero recomendado)
- ✅ **Allowed formats:** jpg, png, gif, webp
- ✅ **Max file size:** 10 MB

**Si no existe, crear uno:**
1. Click en **"Add upload preset"**
2. **Preset name:** `sanjuanonline_unsigned` (o el que prefieras)
3. **Signing mode:** Seleccionar **"Unsigned"**
4. **Folder:** `sanjuanonline`
5. Save

---

### 2. Verificar Variables de Entorno en Vercel

**Ir a Vercel Dashboard:**
1. https://vercel.com/
2. Seleccionar proyecto: `sanjuanonline`
3. Settings → Environment Variables
4. Verificar que existen:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = tu_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = tu_upload_preset
```

**Si no existen, agregarlas:**
1. Click en **"Add New"**
2. **Key:** `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
3. **Value:** Tu cloud name (ejemplo: `dxyz123abc`)
4. **Environment:** Production, Preview, Development (marcar todas)
5. Save
6. Repetir para `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

**IMPORTANTE:** Después de agregar variables, hacer **Redeploy**:
1. Deployments → Click en el último deployment
2. Click en "..." → Redeploy
3. Esperar a que termine

---

### 3. Obtener Cloud Name

**Dónde encontrarlo:**
1. https://console.cloudinary.com/
2. Dashboard (página principal)
3. Arriba verás: **"Cloud name: dxyz123abc"**
4. Copiar ese valor

---

### 4. Crear Upload Preset Unsigned (Paso a Paso)

```
Cloudinary Console
└── Settings (⚙️)
    └── Upload
        └── Upload presets
            └── Add upload preset
                ├── Preset name: sanjuanonline_unsigned
                ├── Signing mode: Unsigned ← CRÍTICO
                ├── Folder: sanjuanonline
                ├── Allowed formats: jpg, png, gif, webp
                └── Save
```

---

## 🧪 Probar Configuración

### Opción 1: Consola del Navegador

1. Abrir tu sitio en producción
2. Abrir DevTools (F12)
3. Ir a Console
4. Pegar este código:

```javascript
console.log({
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
});
```

**Resultado esperado:**
```javascript
{
  cloudName: "dxyz123abc",
  uploadPreset: "sanjuanonline_unsigned"
}
```

**Si sale `undefined`:** Las variables NO están en Vercel

---

### Opción 2: Probar Upload Directo

Crear archivo `test-cloudinary.html`:

```html
<!DOCTYPE html>
<html>
<body>
  <input type="file" id="fileInput" accept="image/*">
  <button onclick="upload()">Subir</button>
  <div id="result"></div>

  <script>
    async function upload() {
      const file = document.getElementById('fileInput').files[0];
      const cloudName = 'TU_CLOUD_NAME'; // Reemplazar
      const uploadPreset = 'TU_UPLOAD_PRESET'; // Reemplazar

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: 'POST', body: formData }
        );
        
        const data = await response.json();
        
        if (response.ok) {
          document.getElementById('result').innerHTML = 
            `✅ Éxito: <img src="${data.secure_url}" width="200">`;
        } else {
          document.getElementById('result').innerHTML = 
            `❌ Error: ${JSON.stringify(data)}`;
        }
      } catch (error) {
        document.getElementById('result').innerHTML = 
          `❌ Error: ${error.message}`;
      }
    }
  </script>
</body>
</html>
```

Abrir en navegador y probar.

---

## 🔍 Errores Comunes y Soluciones

### Error: "Upload preset must be unsigned"
**Causa:** El preset está configurado como "Signed"  
**Solución:** Cambiar a "Unsigned" en Cloudinary Settings

### Error: "Invalid cloud name"
**Causa:** Cloud name incorrecto en variables de entorno  
**Solución:** Verificar en Cloudinary Dashboard y actualizar en Vercel

### Error: "Upload preset not found"
**Causa:** El preset no existe o el nombre está mal  
**Solución:** Crear preset o corregir nombre en variables

### Error: "File size too large"
**Causa:** Imagen mayor a 10MB  
**Solución:** Ya está validado en el código (máximo 5MB)

### Error: "Invalid signature"
**Causa:** Intentando usar preset "Signed" sin firma  
**Solución:** Usar preset "Unsigned"

---

## 📋 Checklist Final

Antes de probar de nuevo:

- [ ] Upload preset existe en Cloudinary
- [ ] Upload preset es **Unsigned**
- [ ] Variables en Vercel están configuradas
- [ ] Hiciste Redeploy después de agregar variables
- [ ] Cloud name es correcto
- [ ] Upload preset name es correcto
- [ ] Imagen es menor a 5MB
- [ ] Formato es JPG, PNG, WebP o GIF

---

## 🚀 Después de Configurar

1. Hacer Redeploy en Vercel
2. Esperar 2-3 minutos
3. Probar subir imagen desde el formulario
4. Si falla, abrir DevTools → Console para ver error específico

---

## 📞 Si Sigue Fallando

Envíame:
1. Screenshot del error en la consola del navegador (F12 → Console)
2. Screenshot de tu Upload Preset en Cloudinary
3. Confirmación de que las variables están en Vercel

---

**Archivo actualizado:** `lib/cloudinary.ts` con mejor manejo de errores
