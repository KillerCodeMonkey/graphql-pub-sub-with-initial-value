import {PubSub as $9nkKC$PubSub} from "graphql-subscriptions";


const $46c2ec7d9c626013$export$140ff54cf51d24d2 = (asyncIterator, onCancel, args)=>{
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
class $46c2ec7d9c626013$export$f755b1004fbba53b extends (0, $9nkKC$PubSub) {
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
        return $46c2ec7d9c626013$export$140ff54cf51d24d2(asyncIterator, onCancel, args);
    }
}


export {$46c2ec7d9c626013$export$140ff54cf51d24d2 as withCancel, $46c2ec7d9c626013$export$f755b1004fbba53b as PubSubWithIntialValue};
//# sourceMappingURL=graphql-pub-sub-with-initial-value.mjs.map
