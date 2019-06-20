import { PubSubIntialValue } from '../src'

interface TestData {
  id: number
  name: string
}

const asyncInititalValueFn = (shouldResolve = true): Promise<TestData[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        return resolve([{
          id: 1,
          name: 'test'
        }])
      }
      return reject('error')
    });
  })
}

describe('index.ts', () => {
  describe('#PubSubIntialValue', () => {
    let pubsub: PubSubIntialValue
    let asyncIterator: any

    beforeEach(() => {
      pubsub = new PubSubIntialValue()
      pubsub.asyncIterator = jest.fn().mockImplementation((value?: any) => ({
        [Symbol.asyncIterator]() { return this },
        next: (value?: any) => {
          return Promise.resolve({
            done: false,
            value
          })
        },
        return() {
          return Promise.resolve({ value: undefined, done: true });
        },
        throw(error: any) {
          return Promise.reject(error);
        }
      }))
      asyncIterator = pubsub.asyncIteratorWithInitialState<TestData[]>('TOPIC', asyncInititalValueFn)
    })

    it('has asyncIteratorWithInitialState function', () => {
      expect(pubsub.asyncIteratorWithInitialState).toBeDefined()
    })

    describe('#asyncIteratorWithInitialState.next', () => {
      it('returns intial state', async () => {
        expect(asyncIterator.initialValuePushed).toBe(false)
        const data = await asyncIterator.next()

        expect(data).toStrictEqual({
          done: false,
          value: [{
            id: 1,
            name: 'test'
          }]
        })
        expect(asyncIterator.initialValuePushed).toBe(true)
      })

      it('returns values after initial values', async () => {
        await asyncIterator.next()

        const data = await asyncIterator.next([{
          id: 2,
          value: 'test2'
        }])
        expect(data).toStrictEqual({
          done: false,
          value: [{
            id: 2,
            value: 'test2'
          }]
        })
      })
    })

    describe('#asyncIteratorWithInitialState.return', () => {
      it('calls base iterator return', async () => {
        const data = await asyncIterator.return([{
          id: 2,
          value: 'test2'
        }])

        expect(data).toStrictEqual({
          'done': true,
          'value': undefined
        })
      })
    })

    describe('#asyncIteratorWithInitialState.throw', () => {
      it('calls base iterator throw', (done) => {
        asyncIterator.throw('error').then(() => {
          throw 'expected error'
        }, (error: any) => {
          expect(error).toStrictEqual('error')
          done()
        })
      })
    })

    describe('#asyncIteratorWithInitialState[Symbol.asyncIterator]', () => {
      it('return self', () => {
        expect(asyncIterator[Symbol.asyncIterator]()).toStrictEqual(asyncIterator)
      })
    })
  })
})
