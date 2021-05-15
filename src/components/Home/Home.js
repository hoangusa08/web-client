import React from 'react'
import Slide from '../Template/Slide'
import BestSelling from '../Product/BestSelling'
import NewProduct from '../Product/NewProduct'
import ReviewInHome from '../Template/ReviewInHome'
export default function Home() {
    return (
        <div>
            <Slide/>
            <BestSelling/>
            <NewProduct/>
            <ReviewInHome/>
        </div>
    )
}
