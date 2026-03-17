export default function sitemap() {
  const baseUrl = 'https://sanjuanonline.com';
  
  const categorias = [
    'comida-rapida',
    'restaurantes',
    'entretenimiento',
    'mantenimiento',
    'salud',
    'mascotas',
    'hoteles',
  ];

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categorias.map((cat) => ({
      url: `${baseUrl}/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/ajustes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cuenta`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return routes;
}
