import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import express, { Express } from 'express'

import proxy from 'express-http-proxy'

import routes from './routes/index.js'

import parseManifest from './utils/manifest.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const createServer = () => {
  const isProduction = true

  const server = express()
  
  server.use('/api', proxy(process.env.SERVER_URL!, {
    proxyReqPathResolver: (req) => {
      console.log(req.url);
      
      const parts = req.url.split("/api/")
      const newPath = parts.join("/")
      return newPath
    }  }),
  )

  server.use(routes) 
  
  server.get('*', express.static(path.join(__dirname, '..', isProduction ? 'build' : 'public'))) // if isProduction == false, serve assets from public folder
  return server
}

export const initializeConnections = async () => {
  await parseManifest()
}

export const initServer = async ({ server }: { server: Express }) => {
  await initializeConnections()

  const port = process.env.PORT || 5000
  server.listen(port, () => {
    console.log()
    console.log(`  App running in port ${port}`)
    console.log()
    console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${port}/\x1b[0m`)
  })
}

initServer({ server: createServer() })