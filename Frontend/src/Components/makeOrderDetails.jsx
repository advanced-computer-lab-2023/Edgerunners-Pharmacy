import axios from 'axios';

export const makeOrderDetails = async () => {
  const data = [];
  let Order = null;
  try {
    let username = sessionStorage.getItem("Username");
    const response = await axios.get("http://localhost:3001/getOrder", {
        params: { username },
    });
    Order = response.data;

    for (let i = 0 ; i < Order.length ; i++) {
        let o = Order[i];
        const id = o.orderid;
        const address =  o.orderAddress;
        const payment = o.paymentMethod;
        const status =  o.orderStatus;
        const cartItems = o.cartItems;
      
        data.push({
          id,
          address,
          payment,
          status,
          cartItems,
        });
      }
      return data;
  } catch (error) {
    console.error("Error fetching Orders:", error);
  }
};


//random data until backend works
// const makeOrderDetails = async () => {
//     const getRandomStatus = () => {
//         const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
//         return statuses[Math.floor(Math.random() * statuses.length)];
//     };

//     const orders = [];
//     for (let i = 1; i <= 10; i++) {
//         const order = {
//             id: i,
//             items: `Item ${i}`,
//             address: `123 Street ${i}, City`,
//             payment: 'Credit Card',
//             status: getRandomStatus(),
//         };
//         orders.push(order);
//     }

//     return orders;
// };

// export { makeOrderDetails };






