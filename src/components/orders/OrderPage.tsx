/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { apiGetOrdersByUserId } from '../../remote/e-commerce-api/productService';
import { useAppSelector } from '../../store/hooks';
import { UserState, currentUser } from '../../store/userSlice';
import OrderDTO from '../dtos/OrderDTO';
import AddressDTO from '../dtos/AddressDTO';


let hasSentReq = false;

export const OrdersView = () => {
    // initializing state
    // const [message, setMessage] = useState<string>('');

    const [orders, setOrders] = useState<OrderDTO[]>([new OrderDTO(0,0,new AddressDTO(0,'','','','',''),[],'')]);
    const [view, setView] = useState(false);

    // Grabing the current user from state
    const user: UserState = useAppSelector(currentUser);

    const getOrders = async function() {
        const orderResp:OrderDTO[] = (await apiGetOrdersByUserId(''+user.id, user.token)).payload as unknown as OrderDTO[];
        setOrders(orderResp);
    };

    useEffect(() => {
        console.log('State \'orders\' was updated');
        console.log(orders);

    }, [orders]);


    useEffect(() => {
        if (!hasSentReq || (orders && !orders[0].userId)) {
            hasSentReq = true;
            console.log('requesting orders form API');
            getOrders();
        }
    }, []);

    const clickOrder = function(orderId:number) {
        console.log('Showing order ' + orderId);
        setView(true);
    };

    return (
        <>
            {view?<div onClick={() => {setView(false);}}></div>:<></>}
            <h3>Orders</h3>
            <table>
            <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>status</th>
            </tr>
            {orders.map((order) => (
                <tr key={order.orderId} onClick={() => {clickOrder(order.orderId);}}>
                    <td>
                        {order.orderId}
                    </td>
                    <td>
                        {order.items.length}
                    </td>
                    <td>
                        {order.status}
                    </td>
                </tr>
                ))}
            </table>
            
        </>
    );
};
