const PubSubWithIntialValue = require('../lib/graphql-pub-sub-with-initial-value').PubSubWithIntialValue

const asyncInititalValueFn = () => Promise.resolve(['test'])

const main = async () => {
  const pubSubInit = new PubSubWithIntialValue()
  const data = await pubSubInit.asyncIteratorWithInitialValue('TOPIC', asyncInititalValueFn).next()

  console.log(data)

  process.exit(0)
}

main()
