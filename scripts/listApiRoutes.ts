import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_DIR = path.join(__dirname, '../app/api');

// Detect exported HTTP methods in a route file
function getHttpMethods(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const methods: string[] = [];
  ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].forEach((method) => {
    const regex = new RegExp(`export\\s+async\\s+function\\s+${method}\\s*\\(`);
    if (regex.test(content)) methods.push(method);
  });
  return methods;
}

// Recursively list all API routes
function listApiRoutes(dir: string, prefix = '/api'): { route: string; methods: string[] }[] {
  let routes: { route: string; methods: string[] }[] = [];

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      routes = routes.concat(listApiRoutes(fullPath, `${prefix}/${file}`));
    } else if (file.endsWith('.ts') || file.endsWith('.js')) {
      let route = `${prefix}/${file.replace(/\.(ts|js)$/, '')}`;
      if (route.endsWith('/index')) route = route.replace('/index', '');
      // Remove /route suffix if present
      if (route.endsWith('/route')) route = route.replace(/\/route$/, '');
      const methods = getHttpMethods(fullPath);
      routes.push({ route, methods });
    }
  });

  return routes;
}

const routes = listApiRoutes(API_DIR);

// Calculate dynamic widths
const noWidth = Math.max(2, routes.length.toString().length);
const routeWidth = Math.max(5, ...routes.map((r) => r.route.length));
const methodWidth = Math.max(7, ...routes.map((r) => r.methods.join(', ').length));

// Function to create table border
function createBorder() {
  return `+${'-'.repeat(noWidth + 2)}+${'-'.repeat(routeWidth + 2)}+${'-'.repeat(methodWidth + 2)}+`;
}

// Print table
console.log('API Routes Table:');
console.log(createBorder());
console.log(
  `| ${'No'.padEnd(noWidth)} | ${'Route'.padEnd(routeWidth)} | ${'Methods'.padEnd(methodWidth)} |`,
);
console.log(createBorder());

routes.forEach((r, i) => {
  const num = (i + 1).toString().padEnd(noWidth);
  const route = r.route.padEnd(routeWidth);
  const methods = r.methods.join(', ').padEnd(methodWidth);
  console.log(`| ${num} | ${route} | ${methods} |`);
});

console.log(createBorder());
