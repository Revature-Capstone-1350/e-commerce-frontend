import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../../context/cart.context';
import Navbar from '../navbar/Navbar';

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
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

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;

export const Cart = () => {
    const { cart } = useContext(CartContext);

    const navigate = useNavigate();

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        CONTINUE SHOPPING
                    </TopButton>
                    <TopButton
                        onClick={() => {
                            navigate('/checkout');
                        }}
                    >
                        CHECKOUT NOW
                    </TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.map((product) => (
                            <>
                                <Product>
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
                                </Product>
                                <Hr />
                            </>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>
                                $
                                {cart.reduce<number>(
                                    (total, product) => total + product.price,
                                    0,
                                )}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>
                                $
                                {cart.reduce<number>(
                                    (total, product) => total + product.price,
                                    0,
                                )}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <Button
                            onClick={() => {
                                navigate('/checkout');
                            }}
                        >
                            CHECKOUT NOW
                        </Button>
                    </Summary>
                </Bottom>
            </Wrapper>
        </Container>
    );
};
