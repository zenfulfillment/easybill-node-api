# easybill node api

## Usage

```js
const Promise = require('bluebird');

const easybill = require('easybill-node-api')('your-easybill-token');

easybill.get('documents')
  .then((res) => console.log(res.items));

// Since this module uses Bluebird, this is also possible:

easybill.get('customers')
  .then(({items}) => items)
  .mapSeries(async (customer) => {
    const res = await easybill.get(`documents?customer_id=${customer.id}`);
    return {
      customer,
      documents: res.items
    };
  }
  .each(({customer, documents}) =>
    console.log(`Customer ${customer.id} has ${documets.length} documents`);
  );
```
