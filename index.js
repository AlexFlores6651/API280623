const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Simulación de datos
const products = [
  { id: 1, nombre: 'Pikachu Gomoku Ramen', precioEspecial: 380, precioSugerido: 430 },
  { id: 2, nombre: 'Postre Poke Ball', precioEspecial: 200, precioSugerido: 240 },
  { id: 3, nombre: 'Pastel Hyunghyoro', precioEspecial: 140, precioSugerido: 160 },
  { id: 4, nombre: 'Pancham Hanten', precioEspecial: 400, precioSugerido: 430 },
  { id: 5, nombre: 'Estofado de Ternera Ankipan', precioEspecial: 180, precioSugerido: 210 },
  { id: 6, nombre: 'Cafe con Galleta', precioEspecial: 90, precioSugerido: 115 },
  { id: 7, nombre: 'Tazon de Hamburguesa de Doraemon', precioEspecial: 200, precioSugerido: 225 },
  { id: 8, nombre: 'Refresco Helado de Sprigatito', precioEspecial: 140, precioSugerido: 160 },
  { id: 9, nombre: 'Bloody Demon', precioEspecial: 70, precioSugerido: 90 },
  { id: 10, nombre: 'Parfait Legendario', precioEspecial: 180, precioSugerido: 200 },
  { id: 11, nombre: 'Plato de Pikachu', precioEspecial: 220, precioSugerido: 240 },
  { id: 12, nombre: 'Curry Doraemon', precioEspecial: 300, precioSugerido: 320 },
  { id: 13, nombre: 'Purupuru Slime', precioEspecial: 80, precioSugerido: 90 },
  { id: 14, nombre: 'Plato de Eevee', precioEspecial: 225, precioSugerido: 240 },
  { id: 15, nombre: 'Refresco de Helado de Fuecoco', precioEspecial: 140, precioSugerido: 160 },
  { id: 16, nombre: 'Nonbiri', precioEspecial: 100, precioSugerido: 120 },
  { id: 17, nombre: 'Panqueque de Limon y Miel', precioEspecial: 130, precioSugerido: 145 },
  { id: 18, nombre: 'Siesta de Snorlax', precioEspecial: 230, precioSugerido: 255 },
  { id: 19, nombre: 'Refresco de Helado de Quaxly', precioEspecial: 140, precioSugerido: 160 },
  { id: 20, nombre: 'Hamburguesa Osanpo Pokonya', precioEspecial: 170, precioSugerido: 190 },
  { id: 21, nombre: 'Slime Purupuru de Melon', precioEspecial: 80, precioSugerido: 90 },
  { id: 22, nombre: 'Panqueque de Slime', precioEspecial: 150, precioSugerido: 170 },
  { id: 23, nombre: 'Panqueques Soufle de Pikachu', precioEspecial: 220, precioSugerido: 240 },
  { id: 24, nombre: 'Parfait de Chocolate y Bayas', precioEspecial: 150, precioSugerido: 175 },
  { id: 25, nombre: 'Te con Leche', precioEspecial: 120, precioSugerido: 170 },
  { id: 26, nombre: 'Osampo', precioEspecial: 180, precioSugerido: 200 },
  { id: 27, nombre: 'Refresco PuruPuru King Slime', precioEspecial: 100, precioSugerido: 110 },
  { id: 28, nombre: 'Panqueque de Fresa', precioEspecial: 180, precioSugerido: 200 },
  { id: 29, nombre: 'Dorayaki como una Montaña', precioEspecial: 175, precioSugerido: 200 },
  { id: 30, nombre: 'Batido Sospechoso de Gengar', precioEspecial: 240, precioSugerido: 260 },
  { id: 31, nombre: 'Parfait de Chocolate con Espada', precioEspecial: 127, precioSugerido: 143 }

];


const providers = [
    { id: 1, name: 'Proveedor A', location: 'Tokyo' },
    { id: 2, name: 'Proveedor B', location: 'Osaka' },
    { id: 3, name: 'Proveedor C', location: 'Kyoto' }
];

app.use((req, res)=>{
    res.status(404).send('No se encontro tu pagina... que Tiste')
})

// Consulta 1: Obtener información de todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

// Consulta 2: Obtener información de un producto específico por su ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Consulta 3: Obtener los productos con precio sugerido mayor a un valor dado
app.get('/products/suggestedPrice/:value', (req, res) => {
  const value = parseFloat(req.params.value);
  const filteredProducts = products.filter(p => p.precioSugerido > value);

  res.json(filteredProducts);
});

// Consulta 4: Crear un nuevo producto
app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    nombre: 'Nuevo Producto',
    precioEspecial: 0,
    precioSugerido: 0
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Consulta 5: Actualizar el precio sugerido de un producto
app.put('/products/:id/suggestedPrice', (req, res) => {
  const productId = parseInt(req.params.id);
  const newSuggestedPrice = parseFloat(req.body.precioSugerido);
  const product = products.find(p => p.id === productId);

  if (product) {
    product.precioSugerido = newSuggestedPrice;
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Consulta 6: Obtener información de todos los proveedores
app.get('/providers', (req, res) => {
    res.json(providers);
  });

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
