import express from 'express';
import { renderPage } from 'vike/server';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', '..');
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();

  if (isProduction) {
    // In production, serve pre-built assets from dist/client
    app.use(express.static(path.join(root, 'dist', 'client')));
  } else {
    // In development, use Vite's development middleware
    const vite = await import('vite');
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  // This single handler works for both dev and prod
  app.get(/^(.*)$/, async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    }
    const { body, statusCode, headers } = httpResponse;
    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();

// import express from 'express';
// import { renderPage } from 'vike/server';
// import { fileURLToPath } from 'url';
// import path from 'path';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const root = path.resolve(__dirname, '..', '..');
// const isProduction = process.env.NODE_ENV === 'production';

// async function startServer() {
//   const app = express();

//   if (!isProduction) {
//     // This is the non-deprecated way to use Vite's dev server
//     // const vite = await import('vite');
//     // const viteDevMiddleware = (
//     //   await vite.createServer({
//     //     root,
//     //     server: { middlewareMode: true },
//     //   })
//     // ).middlewares;
//     // app.use(viteDevMiddleware);
//     // This is the non-deprecated Vike API for development
//     const vike = await import('vike/dev');
//     app.use(vike.dev());
//   } else {
//     // Serve pre-built assets in production
//     app.use(express.static(path.join(root, 'dist', 'client')));
//   }

//   // Use a named wildcard route to avoid the path-to-regexp error
//   app.get(/^(.*)$/, async (req, res, next) => {
//     const pageContextInit = {
//       urlOriginal: req.originalUrl,
//     };
//     const pageContext = await renderPage(pageContextInit);
//     const { httpResponse } = pageContext;
//     if (!httpResponse) {
//       return next();
//     }
//     const { body, statusCode, headers } = httpResponse;
//     headers.forEach(([name, value]) => res.setHeader(name, value));
//     res.status(statusCode).send(body);
//   });

//   const port = process.env.PORT || 3000;
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//     console.log('Open http://localhost:3000 in your browser.');
//   });
// }

// startServer();
