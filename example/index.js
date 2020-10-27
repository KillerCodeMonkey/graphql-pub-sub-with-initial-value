import { PubSubWithIntialValue, withCancel } from '../lib/graphql-pub-sub-with-initial-value.modern'

const asyncInititalValueFn = () => Promise.resolve(['test'])

const main = async () => {
  const pubSubInit = new PubSubWithIntialValue()
  const iterator = pubSubInit.asyncIteratorWithInitialValue('TOPIC', asyncInititalValueFn)
  const data = await iterator.next()

  console.log(data)

  // cb is executed, if client unsubscribes
  pubSubInit.withCancel(iterator, () => console.log('disconnected'))
  // or
  withCancel(iterator, () => console.log('disconnected'))
  // done!
  iterator.return()

  process.exit(0)
}

main()
