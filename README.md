# graphql-pub-sub-with-initial-value

[![Build Status](https://github.com/KillerCodeMonkey/graphql-pub-sub-with-initial-value/workflows/CI/badge.svg)](https://github.com/KillerCodeMonkey/graphql-pub-sub-with-initial-value/actions/) [![codecov](https://codecov.io/gh/KillerCodeMonkey/datetime-periods/branch/master/graph/badge.svg)](https://codecov.io/gh/KillerCodeMonkey/graphql-pub-sub-with-initial-value)

GraphQLPupSubWithIntialValue is a simple npm package that extends GraphQLPubSub with an `asyncIteratorWithInitialState` method. It lets you define an async function how to get the initial value.

For more information checkout the [GraphQL-Subscriptions](https://github.com/apollographql/graphql-subscriptions)

## Donate/Support

If you like my work, feel free to support it. Donations to the project are always welcomed :)

<a href="https://www.buymeacoffee.com/bengtler" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

PayPal: [PayPal.Me/bengtler](http://paypal.me/bengtler)

BTC Wallet Address:
`3QVyr2tpRLBCw1kBQ59sTDraV6DTswq8Li`

ETH Wallet Address:
`0x394d44f3b6e3a4f7b4d44991e7654b0cab4af68f`

LTC Wallet Address:
`MFif769WSZ1g7ReAzzDE7TJVqtkFpmoTyT`

XRP Wallet Address:
`rXieaAC3nevTKgVu2SYoShjTCS2Tfczqx?dt=159046833`

### Installation

`npm install graphql-pub-sub-with-initial-value` or `yarn add graphql-pub-sub-with-initial-value`

> This package has peerDependencies to `"graphql": "^14.3.1"` and `"graphql-subscriptions": "^1.1.0"`, which you have to install yourself.

### Usage

#### Easy & Simple

```TS
const asyncInititalValueFn = () => {
  // grab initial values somewhere else. Read from file, memory, 🤷
  return Promise.resolve(['test'])
}

import { PubSubWithIntialValue } from 'graphql-pub-sub-with-initial-value'

const pubSubWithInitialValue = new PubSubWithIntialValue()

pubSubWithInitialValue.asyncIteratorWithInitialValue<string[]>('TOPIC', asyncInititalValueFn)
```

#### In a resolver of subsciption (ApolloServer)

It is recommended to put the pubSub on the context object during the ApolloServer creation or use PubSubs in combination with datasources or create it in a seperated file to reuse the instance.

```TS
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { PubSubWithIntialValue } from 'graphql-pub-sub-with-initial-value'

export const subscription = new GraphQLObjectType({
  fields: {
    callings: {
      resolve(payload) {
        return payload
      },
      subscribe(_obj, _args, context: { pubSub: PubSubWithIntialValue }): AsyncIterable<any> {
        return context.pubSub.asyncIteratorWithInitialValue<string[]>(() => Promise.resolve(['test']))
      },
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString)))
    }
  },
  name: 'Subscription'
})
```

