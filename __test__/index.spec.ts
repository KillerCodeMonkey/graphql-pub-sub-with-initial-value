import { PubSubWithIntialValue, withCancel } from '../src'

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
  describe('#withCancel', () => {
    it('executes logic on client disconnect', () => {
      const pubsub = new PubSubWithIntialValue()
      pubsub.asyncIterableIterator = jest.fn().mockImplementation(() => ({
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
      const asyncIterator = pubsub.asyncIteratorWithInitialValue<TestData[]>('TOPIC', asyncInititalValueFn)
      let canceled = false
      withCancel(asyncIterator, () => canceled = true)
      asyncIterator.return()
      expect(canceled).toBe(true)
    })
  })

  describe('#PubSubIntialValue', () => {
    let pubsub: PubSubWithIntialValue
    let asyncIterator: any

    beforeEach(() => {
      pubsub = new PubSubWithIntialValue()
      pubsub.asyncIterableIterator = jest.fn().mockImplementation(() => ({
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
      asyncIterator = pubsub.asyncIteratorWithInitialValue<TestData[]>('TOPIC', asyncInititalValueFn)
    })

    it('has asyncIteratorWithInitialState function', () => {
      expect(asyncIterator).toBeDefined()
    })

    describe('#withCancel', () => {
      it('executes callback on client disconnect', () => {
        let canceled = false
        pubsub.withCancel(asyncIterator, () => canceled = true)
        asyncIterator.return()
        expect(canceled).toBe(true)
      })
      it('executes callback on iterator without return()', () => {
        let canceled = false
        delete asyncIterator.return
        asyncIterator = pubsub.withCancel(asyncIterator, () => canceled = true)
        expect(asyncIterator.return).toBeDefined()
        asyncIterator.return()
        expect(canceled).toBe(true)
      })
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
