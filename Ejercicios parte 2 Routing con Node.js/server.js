const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8080;

const routes = {
  "/": "home.html",
  "/about": "about.html",
  "/location": "location.html",
  "/services": "services.html",
  "/contact": "contact.html",
};

const server = http.createServer((req, res) => {
  const filePath = routes[req.url]
    ? path.join(__dirname, "public", routes[req.url])
    : null;

  if (filePath) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error interno del servidor");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Página no encontrada</h1>");
  }
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
