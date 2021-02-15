// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  if (!(req.query.superSekretKey === `${process.env.SUPER_SEKRET_KEY}`)) {
    res.statusCode = 401;
    res.json({ error: 'Unauthenticated' });
  }

  const start = parseInt((new Date() - 60 * 60 * 1000) / 1000);

  const data = await fetch(
    `https://api.whale-alert.io/v1/transactions?api_key=${process.env.WHALE_ALERT_API_KEY}&min_value=10000000&start=${start}`
  ).then(res => res.json())

  const transactions = data.transactions;

  const relevantTransactions = transactions
    .filter(t => {
      return (
        t.from.owner_type !== 'unknown' && t.to.owner_type === 'unknown' ||
        t.from.owner_type === 'unknown' && t.to.owner_type !== 'unknown'
      )
    })

  res.statusCode = 200;
  res.json({ transactions: relevantTransactions });
}
