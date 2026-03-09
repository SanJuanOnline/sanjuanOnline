# Subir el proyecto a GitHub

## 1. Instalar Git (si no lo tienes)

```bash
sudo apt install git
```

## 2. Configurar tu identidad (solo la primera vez)

```bash
git config --global user.name "LuisG"
git config --global user.email "yuritzicoy@gmail.com"
Profile image
"yuritzicoy@gmail.com"
```

## 3. Inicializar y subir el repositorio

Desde la raíz del proyecto (`/home/garcia/Escritorio/conecta`):

```bash
# Inicializar repositorio
git init

# Añadir el remoto
git remote add origin https://github.com/SanJuanOnline/sanjuanOnline.git

# Añadir todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: estructura del proyecto Conecta"

# Subir a GitHub (rama main)
git branch -M main
git push -u origin main
```

Si GitHub te pide autenticación, usa un **Personal Access Token** en lugar de la contraseña (en GitHub: Settings → Developer settings → Personal access tokens).

---

**Nota:** Si el repositorio en GitHub ya tiene commits (por ejemplo, un README creado al crear el repo), puede que tengas que hacer antes:

```bash
git pull origin main --allow-unrelated-histories
```

y luego `git push -u origin main`.
 