const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const queryString = require('query-string');
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server routers
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  } else if (req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});
router.render = (req, res) => {
  // check GET with pagination
  const headers = res.getHeaders();
  const Total_count = headers['x-total-count'];
  if (req.method === 'GET' && Total_count) {
    // console.log(req);
    console.log(req._parsedOriginalUrl.query);
    const queryParams = queryString.parse(req._parsedOriginalUrl.query);
    console.log(queryParams);
    const result = {
      data: res.locals.data,
      paginations: {
        _page: queryParams._page || 1,
        _limit: queryParams._limit || 10,
        _totalRows: Number.parseInt(Total_count),
      },
    };
    return res.jsonp(result);
  }
  res.jsonp(res.locals.data);
};
// Use default router
const PORT = process.env.port || 3000;
server.use('/api', router);
server.listen(PORT, () => {
  console.log('JSON Server is running');
});
