// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const start = parseInt((new Date() - 5 * 60 * 1000) / 1000)

  const data = await fetch(
    `https://api.whale-alert.io/v1/transactions?api_key=${process.env.WHALE_ALERT_API_KEY}&min_value=10000000&start=${start}`
  ).then(res => res.json())

  res.statusCode = 200
  res.json(data)
}
