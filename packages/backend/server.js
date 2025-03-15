const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
require('dotenv').config();

// Enable CORS for all requests
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5005;

// Add custom routes before JSON Server router
server.get('/api/products', (req, res) => {
  const { 
    _page = 1, 
    _limit = 8,
    category,
    tier,
    theme,
    search,
    _sort = 'price',
    _order = 'asc',
    priceMin,
    priceMax
  } = req.query;

  const page = parseInt(_page);
  const limit = parseInt(_limit);
  
  // Get all products
  let products = router.db.get('products').value();
  
  // Apply filters
  if (category) {
    products = products.filter(product => product.category === category);
  }
  
  if (tier) {
    products = products.filter(product => product.tier === tier);
  }
  
  if (theme) {
    products = products.filter(product => product.theme === theme);
  }

  // Apply price range filter
  if (priceMin !== undefined) {
    products = products.filter(product => product.price >= parseFloat(priceMin));
  }
  if (priceMax !== undefined) {
    products = products.filter(product => product.price <= parseFloat(priceMax));
  }

  // Apply search
  if (search) {
    const searchLower = search.toLowerCase();
    products = products.filter(product => 
      product.title.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting
  products.sort((a, b) => {
    const aValue = a[_sort];
    const bValue = b[_sort];
    
    if (_order === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  // Set headers for pagination and total
  res.header('X-Total-Count', products.length.toString());
  res.header('X-Page', page.toString());
  res.header('X-Limit', limit.toString());
  res.header('Access-Control-Expose-Headers', 'X-Total-Count, X-Page, X-Limit');
  
  res.json({
    data: paginatedProducts,
    pagination: {
      page,
      limit,
      total: products.length,
      hasMore: endIndex < products.length
    }
  });
});

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});