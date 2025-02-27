import path from 'path'

import express from 'express'

import proxy from 'express-http-proxy'

const app = express()
const port = import.meta.env.PORT || 5000

app.use(express.static(path.resolve('dist/client')))

app.use('/api', proxy(import.meta.env.VITE_SERVER_URL!))

app.get('*', (_req, res) => {
  res.sendFile(path.resolve('dist/client/index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
