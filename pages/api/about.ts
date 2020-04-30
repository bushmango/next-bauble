export default (_: any, res: any) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      name: 'Bauble',
      fruit: process.env.FRUIT,
      buildCode: process.env.BUILD_CODE,
    }),
  )
}
