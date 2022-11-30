import { cartAcitons } from "./cart-slice";
import { uiAcitons } from "./ur-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-a2404-default-rtdb.firebaseio.com/cart.json')

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }
            const data = await response.json();

            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartAcitons.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));
        } catch (error) {
            dispatch(uiAcitons.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Fetching cart data failded!'
            }));
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiAcitons.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://react-http-a2404-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                }),
            });

            if (!response.ok) {
                throw Error('Sending cart data failed!')
            }

            dispatch(uiAcitons.showNotification({
                status: 'success',
                title: 'Success...',
                message: 'Sending cart data successfully!'
            }))
        };

        try {
            await sendRequest();
        } catch (error) {
            dispatch(uiAcitons.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Sending cart data failded!'
            }));
        }




    }
}