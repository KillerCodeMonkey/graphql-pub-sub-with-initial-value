var $38Zx1$graphqlsubscriptions = require("graphql-subscriptions");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "withCancel", () => $ce7a5684c5cb6ca5$export$140ff54cf51d24d2);
$parcel$export(module.exports, "PubSubWithIntialValue", () => $ce7a5684c5cb6ca5$export$f755b1004fbba53b);

const $ce7a5684c5cb6ca5$export$140ff54cf51d24d2 = (asyncIterator, onCancel, args)=>{
    if (!asyncIterator.return) asyncIterator.return = ()=>Promise.resolve({
            done: true,
            value: undefined
        });
    const savedReturn = asyncIterator.return.bind(asyncIterator);
    asyncIterator.return = ()=>{
        onCancel(args);
        return savedReturn();
    };
    return asyncIterator;
};
class $ce7a5684c5cb6ca5$export$f755b1004fbba53b extends (0, $38Zx1$graphqlsubscriptions.PubSub) {
    withInitialValue(iterator, getInitialValue) {
        return {
            [Symbol.asyncIterator] () {
                return this;
            },
            initialValuePushed: false,
            next (value) {
                if (this.initialValuePushed) return iterator.next(value).then(({ value: value, done: done })=>({
                        done: done,
                        value: value
                    }));
                else return getInitialValue().then((value)=>{
                    this.initialValuePushed = true;
                    return {
                        done: false,
                        value: value
                    };
                });
            },
            return (value) {
                return iterator.return(value);
            },
            throw (value) {
                return iterator.throw(value);
            }
        };
    }
    asyncIteratorWithInitialValue(topic, initialValueFn) {
        return this.withInitialValue(this.asyncIterableIterator(topic), ()=>initialValueFn());
    }
    withCancel(asyncIterator, onCancel, args) {
        return $ce7a5684c5cb6ca5$export$140ff54cf51d24d2(asyncIterator, onCancel, args);
    }
}


//# sourceMappingURL=graphql-pub-sub-with-initial-value.js.map
