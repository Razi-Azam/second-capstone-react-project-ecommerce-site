import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Container from '../container/Container';

import editIcon from '../assets/images/edit-2.png';
import deleteIcon from '../assets/images/trash-2.png';
import heartIcon from '../assets/images/heart.png';
import paymentIcon from '../assets/images/PP_BTN.png';
import chevronDown from '../assets/images/chevron-down.svg';
import shoppingBagWhite from '../assets/images/shopping-bag-white.svg';
import EmptyCartAlert from './EmptyCartAlert';
import { decrement, increment } from '../redux/action';

export default function Cart() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const maxInputLimit = 5;
  const minInputLimit = 1;
  const [priceSummary, setPriceSummary] = useState({
    subTotal: 0.00,
    coupen: 10.60,
    giftCard: 12.00,
    estimatedtax: 17.28,
    estimatedTotal: 0.00,
  });

  const store = useSelector(state => state.data);

  const showMobileToolMenu = () => {
    setIsActive(true)
  }

  const hideMobileToolMenu = () => {
    setIsActive(false)
  }

  const inputQuantityHandler = (event) => {
    let inputFieldvalue = event.target.value;
    if(inputFieldvalue > maxInputLimit ) {
        setInputValue(() => maxInputLimit);
    }
    else if(inputFieldvalue < minInputLimit)
        setInputValue(() => minInputLimit);
    else setInputValue(inputFieldvalue);
  }

  const decreaseQuantityHandler = (id, price) => {
  if(inputValue > minInputLimit) 
      setInputValue(() => inputValue - 1);

      dispatch(decrement(id));

      setPriceSummary({
        ...priceSummary,
        subTotal : price * inputValue,
        estimatedTotal : ((priceSummary.subTotal + priceSummary.estimatedtax) - (priceSummary.coupen + priceSummary.giftCard)),
      })
      console.log('total decrement ', (priceSummary.estimatedTotal).toFixed(2))
  }

  const increaseQuantityHandler = (id, price, productsCount) => {
    
    if(inputValue < maxInputLimit) 
        setInputValue(() => inputValue + 1);

    if(inputValue > maxInputLimit)
        setInputValue(() => maxInputLimit);
        dispatch(increment(id));

        setPriceSummary({
          ...priceSummary,
          subTotal : price * inputValue,
          estimatedTotal : ((priceSummary.subTotal + priceSummary.estimatedtax) - (priceSummary.coupen + priceSummary.giftCard)),
        })
 }

 useEffect(() => {
   setPriceSummary({
    subTotal: 0.00,
    coupen: 10.60,
    giftCard: 12.00,
    estimatedtax: 17.28,
    estimatedTotal: 0.00,
   })

 }, [])
  
  return (
    <Container>
        <div className='cart-wrapper'>
          <div className='cart-header'>
            <h1>Your Shopping Bag</h1>
            <div className='line'></div>
          </div>
          <div className='cart-wrapper'>
            <div className='cart-info'>
              <div className='cart-items'>
                { store.productData.length === 0 ? <EmptyCartAlert /> :
                store.productData.map(productData =>
                  <div className='cart-item' key={productData.id}>
                    <div className='item-image'>
                      <img src={productData.image} alt='cart item'/>
                    </div>
                    <div className='item-attributes'>
                      <div className='item-info'>
                        <h4>{productData.title && productData.title.split(' ').slice(0,3).join(' ')}</h4>
                        <h3>Size : Medium</h3>
                        <h3>Color : Storm</h3>
                        <h3>${productData.price}</h3>
                      </div>
                      <div className='item-quantity'>
                      <button 
                          type='button' 
                          id='btn-minus' 
                          onClick={() => decreaseQuantityHandler(productData.id, productData.price)}
                          disabled={inputValue === 1 ? true : false}
                      >-</button>
                      <input 
                          type='text' 
                          id={`txt-quantity${productData.id}`} 
                          value={productData.productsCount} 
                          onChange={(event) => inputQuantityHandler()} 
                          readOnly
                        />
                      <button 
                          type='button' 
                          id='btn-plus' 
                          onClick={() => increaseQuantityHandler(productData.id, productData.price)}
                          disabled={inputValue === 5 ? true : false}
                      >+</button>
                      </div>
                    </div> 
                    <div className={isActive ? 'buttons-group active' : 'buttons-group'}>
                      <section className='btn-close'>
                        <button 
                          type='button' 
                          id='btn-mobile-cross'
                          onClick={() => hideMobileToolMenu()}
                          >
                          x
                        </button>
                      </section>
                      <button type='button' id='btn-edit'>
                        <img src={editIcon} alt='edit icon'/>
                        Edit item
                      </button>
                      <button type='button' id='btn-edit'>
                        <img src={deleteIcon} alt='delete icon'/>
                        Remove
                      </button>
                      <button type='button' id='btn-edit'>
                        <img src={heartIcon} alt='heart icon'/>
                        Save for later
                      </button>
                    </div>
                    <div className='button-group-menu'>
                      <button 
                        type='button' 
                        id='btn--group-menu'
                        onClick={() => showMobileToolMenu()}
                        >
                        ...
                      </button>
                    </div>
                  </div>
                  )
                }
              </div>
              <div className='cart-other-details'>
                  <div className='details-container'>
                    <div className='section-1'>
                        <h4>Estimate your Shipping</h4>
                    </div>
                    <div className='section-2'>
                        <h5>Shipping to 91001</h5>
                        <button type='button' id='btn-ship'>
                          <img src={chevronDown} alt='chevron icon'/>
                        </button>
                    </div>
                  </div>
                  <div className='details-container'>
                    <div className='section-1'>
                        <h4>Enter a Coupon Code</h4>
                    </div>
                    <div className='section-2'>
                        <h5>20% discount applied</h5>
                        <button type='button' id='btn-ship'>
                          <img src={chevronDown} alt='chevron icon'/>
                        </button>
                    </div>
                  </div>
                  <div className='details-container'>
                    <div className='section-1'>
                        <h4>Apply Gift Card</h4>
                    </div>
                    <div className='section-2'>
                        <h5> </h5>
                        <button type='button' id='btn-ship'>          
                          <img src={chevronDown} alt='chevron icon'/>
                        </button>
                    </div>
                  </div>
              </div>
            </div>
            <div className='price-summary'>
              <h4>Pricing Summary</h4>
              <div className='price-list-group'>
                <div className='price-item'>
                  <h3>Subtotal</h3>
                  <h3>$ {priceSummary.subTotal.toFixed(2)}</h3>
                </div>
                <div className='price-item'>
                  <h3>Coupon</h3>
                  <h3>- $ {priceSummary.coupen}</h3>
                </div>
                <div className='price-item'>
                  <h3>Gift Card</h3>
                  <h3>- $ {priceSummary.giftCard}</h3>
                </div>
                <div className='price-item'>
                  <h3>Estimated tax</h3>
                  <h3>$ {priceSummary.estimatedtax}</h3>
                </div>
                <div className='price-item'>
                  <h3>Estimated shipping</h3>
                  <h3>FREE</h3>
                </div>
                <div className='price-item'>
                  <h3>Estimated Total</h3>
                  <h3>$ {priceSummary.estimatedTotal.toFixed(2)}</h3>
                </div>
              </div>
              <div className='button-group'>
                  <button type='button' id='btn-checkout'>
                    <img src={shoppingBagWhite} alt='checkout icon' />
                    CHECKOUT
                  </button>
                  <button type='button' id='btn-payment'>
                    <img src={paymentIcon} alt='paypal icon' />
                  </button>
              </div>
            </div>
          </div>
        </div>
    </Container>
  )
}
