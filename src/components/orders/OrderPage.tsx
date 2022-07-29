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
    // 
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

    return (
        <React.Fragment>
            {orders.map((order) => (
                            <div key={order.orderId}>
                                <p>{order.orderId}</p>
                            </div>
                        ))}
        </React.Fragment>
    );
};
