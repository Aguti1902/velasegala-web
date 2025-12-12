# 📹 Cómo Subir el Video a la Web

## 🎯 Pasos para Añadir el Video

### 1. **Copia el Video a la Carpeta Correcta**

```bash
# Desde tu carpeta de Descargas o donde tengas el video:
cp "VelaSegala_2024_Edit.mp4" "/Users/guti/Desktop/CURSOR WEBS/vela segala/frontend/public/videos/"
```

O **arrastra y suelta** el archivo `VelaSegala_2024_Edit.mp4` a:
```
frontend/public/videos/VelaSegala_2024_Edit.mp4
```

---

### 2. **Sube los Cambios a GitHub**

Una vez que el video esté en la carpeta, ejecuta:

```bash
cd "/Users/guti/Desktop/CURSOR WEBS/vela segala"
git add frontend/public/videos/VelaSegala_2024_Edit.mp4
git commit -m "feat: Add hero video"
git push origin main
```

---

### 3. **Deploy Automático**

- **Vercel** detectará el cambio y hará deploy automáticamente
- El video aparecerá en el Hero de la home en ~2-3 minutos

---

## ✅ Características del Video en el Hero

- ✅ **Autoplay:** Se reproduce automáticamente
- ✅ **Loop:** Se repite continuamente
- ✅ **Muted:** Sin sonido (para mejor UX)
- ✅ **Responsive:** Se adapta a todos los dispositivos
- ✅ **Fallback:** Si el video no carga, muestra la imagen del equipo

---

## 📊 Optimización Recomendada

Si el video es muy pesado (> 10MB):

### Opción 1: Comprimir el Video
```bash
# Con ffmpeg (si lo tienes instalado):
ffmpeg -i VelaSegala_2024_Edit.mp4 -vcodec h264 -acodec aac -crf 28 VelaSegala_2024_Edit_compressed.mp4
```

### Opción 2: Usar un Servicio de Hosting
- Subir a **YouTube/Vimeo** (privado)
- Embeber el video en el Hero
- Mejor para videos grandes

---

## 🎬 Vista Previa

Una vez subido, el Hero se verá así:

```
┌────────────────────────────────────────┐
│  Texto Hero      │  📹 VIDEO HERO      │
│  ────────────    │  ─────────────      │
│  Clínica Dental  │  [Video playing]    │
│  de Referencia   │  [Loop continuo]    │
│  Viladecans      │  [Sin sonido]       │
│                  │                     │
│  [Pedir Cita]    │  🎬 Autoplay ON     │
│  [Conocer]       │                     │
└────────────────────────────────────────┘
```

---

## ⚠️ Importante

1. El video debe estar en formato **MP4**
2. Nombre exacto: `VelaSegala_2024_Edit.mp4`
3. Ubicación: `frontend/public/videos/`
4. Tamaño recomendado: < 10MB para carga rápida

---

**Sube el video a la carpeta indicada y haz push para verlo en la web!** 🎉

