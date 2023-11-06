// import axios from 'axios';

// export const makeOrderDetails = async () => {
//   const data = [];
//   let Order = null;
//   try {
//     const response = await axios.get("http://localhost:3001/getOrder");
//     Order = response.data;
//   } catch (error) {
//     console.error("Error fetching Orders:", error);
//   }
//   for (let i = 0 ; i < Order.length ; i++) {
//     let o = Order[i];
//     //need to add cart items
//     const id =i;
//     const address =  o.Address;
//     const payment = o.Payment;
//     const status =  o.Status;
  
//     data.push({
//       id,
//       address,
//       payment,
//       status,
//     });
//   }
//   return data;
// };


//random data until backend works
const makeOrderDetails = async () => {
    const getRandomStatus = () => {
        const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    };

    const orders = [];
    for (let i = 1; i <= 10; i++) {
        const order = {
            id: i,
            items: `Item ${i}`,
            address: `123 Street ${i}, City`,
            payment: 'Credit Card',
            status: getRandomStatus(),
        };
        orders.push(order);
    }

    return orders;
};

export { makeOrderDetails };






