/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { apiGetAllOrders } from '../../remote/e-commerce-api/productService';
import { useAppSelector } from '../../store/hooks';
import { UserState, currentUser } from '../../store/userSlice';
import OrderDTO from '../dtos/OrderDTO';
import AddressDTO from '../dtos/AddressDTO';
import styled from 'styled-components';

const Info = styled.div`
    flex: 3;
`;

const ProductDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

let hasSentReq = false;

export const OrdersAdmin = () => {
    // initializing state

    const [orders, setOrders] = useState<OrderDTO[]>([new OrderDTO(0,0,new AddressDTO(0,'','','','',''),[],'')]);
    const [viewOrder, setViewOrder] = useState<OrderDTO>();

    // Grabing the current user from state
    const user: UserState = useAppSelector(currentUser);

    const getOrders = async function() {
        const orderResp:OrderDTO[] = (await apiGetAllOrders(user.token)).payload as unknown as OrderDTO[];
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

    const clickOrder = function(order:OrderDTO) {
        console.log('Showing order ' + order.orderId);
        setViewOrder(order);
    };

    return (
        <>
            {viewOrder?<div style={{
                position:'absolute', 
                minHeight:'60%', 
                minWidth:'60%', 
                backgroundColor:'rgba(255,255,240,0.6)',
                border:'2px solid',
                margin:'5px',
                zIndex:'10'
            }}
            onClick={() => {setViewOrder(undefined);}}>
                <h3>&nbsp;Order #{viewOrder.orderId} placed by user #{viewOrder.userId}</h3>
                    <Info>
                        {viewOrder.items.map((product) => (
                            <>
                                <ProductDiv key={product.productId}>
                                    <ProductDetail>
                                        <Image src={product.imgUrlSmall} />
                                        <Details>
                                            <ProductName>
                                                <b>Product:</b> {product.name}
                                            </ProductName>
                                            <ProductId>
                                                <b>ID:</b> {product.productId}
                                            </ProductId>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductPrice>$ {product.price}</ProductPrice>
                                    </PriceDetail>
                                </ProductDiv><Hr />
                            </>
                        ))}
                    </Info>
                    <h3>Total: $&nbsp;{viewOrder.items.reduce<number>(
                        (total, product) => Math.round(total*100 + product.price*100)/100,
                        0,
                      ).toFixed(2)}
                    </h3>
            </div>:<>
            <h3>Orders (click an order for details)</h3>
            <table>
            <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Items</th>
                <th>status</th>
            </tr>
            {orders.map((order) => (
                <tr key={order.orderId} onClick={() => {clickOrder(order);}}>
                    <td>
                        {order.orderId}
                    </td>
                    <td>
                        {order.userId}
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
            </>}
        </>
    );
};
