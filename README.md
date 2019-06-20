# graphql-pub-sub-with-inital-value

[![Build Status](https://travis-ci.org/KillerCodeMonkey/datetime-periods.svg?branch=master)](https://travis-ci.org/KillerCodeMonkey/graphql-pub-sub-with-inital-value) [![codecov](https://codecov.io/gh/KillerCodeMonkey/datetime-periods/branch/master/graph/badge.svg)](https://codecov.io/gh/KillerCodeMonkey/graphql-pub-sub-with-inital-value)

GraphQLPupSubWithIntialValue is a simple npm package that extends GraphQLPubSub with an `asyncIteratorWithInitialState` method. It lets you define an async function how to get the initial value.

For more information checkout the [GraphQL-Subscriptions](https://github.com/apollographql/graphql-subscriptions)

### Installation

`npm install graphql-pub-sub-with-inital-value` or `yarn add graphql-pub-sub-with-inital-value`

> This package has peerDependencies to `"graphql": "^14.3.1"` and `"graphql-subscriptions": "^1.1.0"`, which you have to install yourself.

### Usage

#### Easy & Simple

```TS
const asyncInititalValueFn = () => {
  // grab initial values somewhere else. Read from file, memory, 🤷
  return Promise.resolve(['test'])
}

import { PubSubWithIntialValue } from 'graphql-pub-sub-with-inital-value'

const pubSubWithInitialValue = new PubSubWithIntialValue()

pubSubWithInitialValue.asyncIteratorWithInitialValue<string[]>('TOPIC', asyncInititalValueFn)
```

#### In a resolver of subsciption (ApolloServer)

It is recommended to put the pubSub on the context object during the ApolloServer creation or use PubSubs in combination with datasources or create it in a seperated file to reuse the instance.

```TS
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { PubSubWithIntialValue } from 'graphql-pub-sub-with-inital-value'

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

