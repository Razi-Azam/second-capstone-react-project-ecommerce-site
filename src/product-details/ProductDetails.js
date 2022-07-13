import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import Container from '../container/Container';
import Slider from '../product-details/Slider/Slider';
import starIcon from '../assets/images/star.svg';
import heartIcon from '../assets/images/heart.svg';
import shareIcon from '../assets/images/share-2.svg';
import chevronDown from '../assets/images/chevron-down.svg';
import {loadOneProduct, getCartData} from '../redux/action';

export default function ProductDetails() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(1);
    const maxInputLimit = 5;
    const minInputLimit = 1;

    const store = useSelector(state => state.data);

    const inputQuantityHandler = (event) => {
        if(event.target.value > maxInputLimit )
            setInputValue(maxInputLimit);
        else if(event.target.value < minInputLimit)
            setInputValue(minInputLimit);
        else setInputValue(event.target.value);
    }

    const decreaseQuantityHandler = () => {
        if(inputValue > minInputLimit)
            setInputValue(inputValue - 1);
    }

    const increaseQuantityHandler = () => {
        if(inputValue < maxInputLimit)
            setInputValue(inputValue + 1);
        if(inputValue > maxInputLimit)
            setInputValue(maxInputLimit);
    }

    const addToCartHandler = () => {
        const productItem = {
            ...store.product,
            productsCount: inputValue,
        }
        dispatch(getCartData(productItem));
    }

    useEffect(() => {
        dispatch(loadOneProduct(id));
    }, []);

  return (
    <Fragment>
        <Container>
            {
            store.product != undefined
            &&
            <div className='wrapper'>
                <div className='product-details-section1'>
                    <div className='image-box'>
                        <div className='image-slider'>
                            <img src={store.product.image} className='slider-img' alt='product pic'/>
                            <img src={store.product.image} className='slider-img' alt='product pic'/>
                            <img src={store.product.image} className='slider-img' alt='product pic'/>
                            <img src={store.product.image} className='slider-img' alt='product pic'/>
                            <img src={store.product.image} className='slider-img' alt='product pic'/>
                            <section className='btn-arrow-down'>
                                <img src={chevronDown} alt='arrow-down icon'/>
                            </section>
                        </div>
                        <div className='display-image'>
                            <img src={store.product.image} id='prod-img1' alt='product pic'/>
                        </div>
                        <section className='mobile-slider-comp'>
                            <Slider imageSrc={store.product.image} />
                        </section>
                    </div>
                    <div className='product-attributes'>
                        <div className='route-bar'>
                            <p>Clothing / Women’s / Outerwear /</p>
                        </div>
                        <h2>{store.product.title && store.product.title.split(' ').slice(0,3).join(' ')}</h2>
                        <h4>${store.product.price}</h4>
                        <div className='product-rating'>
                            <div className='stars'>
                                <img src={starIcon} alt='star icon'/>
                                <img src={starIcon} alt='star icon'/>
                                <img src={starIcon} alt='star icon'/>
                                <img src={starIcon} alt='star icon'/>
                                <img src={starIcon} alt='star icon'/>
                            </div>
                            <p>({store.product.rating && store.product.rating.count})</p>
                        </div>
                        <div className='product-descp'>
                            <p> 
                                {store.product.description && store.product.description.split(' ').slice(0,15).join(' ')}
                                &nbsp;<span><u>Read More</u></span>
                            </p>
                        </div>
                        <h4>Color</h4>
                        <div className='attribute-box-wrapper'>
                            <div className='attribute-box' id='sky'></div>
                            <div className='attribute-box' id='pink'></div>
                            <div className='attribute-box' id='black'></div>
                            <div className='attribute-box' id='grey'></div>
                        </div>
                        <h4>Size</h4>
                        <div className='attribute-box-wrapper'>
                            <div className='attribute-box size' id='XS'>XS</div>
                            <div className='attribute-box size' id='S'>S</div>
                            <div className='attribute-box size' id='M'>M</div>
                            <div className='attribute-box size' id='L'>L</div>
                            <div className='attribute-box size' id='XL'>XL</div>
                        </div>
                        <h4>Quantity</h4>
                        <div className='quantity-box'>
                            <span>
                                <button 
                                    type='button' 
                                    id='btn-minus' 
                                    onClick={() => decreaseQuantityHandler()}
                                    disabled={inputValue === 1 ? true : false}
                                >-</button>
                                <input 
                                    type='text' 
                                    id='txt-quantity' 
                                    value={inputValue} 
                                    onChange={(event) => inputQuantityHandler()} />
                                <button 
                                    type='button' 
                                    id='btn-plus' 
                                    onClick={() => increaseQuantityHandler()}
                                    disabled={inputValue === 5 ? true : false}
                                >+</button>
                            </span>
                        </div>
                        <Link to='/cart'>
                            <button type='button' onClick={addToCartHandler}  id='btn-add-to-cart'>ADD TO CART</button>
                        </Link>
                        <div className='extra-buttons'>
                            <button type='button' id='btn-save'>
                                <img src={heartIcon} alt='heart icon'/>
                                Save
                            </button>
                            <button type='button' id='btn-share'>
                                <img src={shareIcon} alt='share icon'/>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
                <div className='product-details-section2'>
                    <div className='product-info'>
                        <div className='product-description'>
                            <h2>Peekaback Hoodie</h2>
                            <h4>Description</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor labore dolore magna lorem ipsum dolor 
                                sit amet ipsum dolor sit amet, consectetur. Duis tristique 
                                sollicitudin nibh sit amet. Tellus integer feugiat scelerisque 
                                varius morbi enim nunc faucibus.
                            </p>
                        </div>
                        <div className='product-details'>
                            <h4>Details</h4>
                            <div className='product-details-list'>
                                <ul>
                                    <li>
                                        <a href='#'><img src={''} alt='' />Sweat-wicking</a>
                                    </li>
                                    <li>
                                        <a href='#'><img src={''} alt='' />Lightweight fabric</a>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <a href='#'><img src={''} alt='' />Breathable</a>
                                    </li>
                                    <li>
                                        <a href='#'><img src={''} alt='' />69% nylon, 31% lycra</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='ending-line'>
                        <div className='line'></div>
                    </div>
                </div>
            </div>
            }
        </Container>
    </Fragment>
  )
}