import axios from 'axios';
import React , {useState , useEffect} from 'react'
import Card from './Card'
import Carousel from 'react-elastic-carousel';
import Api from '../Config/Api'
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1600, itemsToShow: 4 }
  ];
export default function NewProduct() {
    const [listProductNP , setlistProductNP] = useState([]);
    useEffect(() => {
            Api.get('client/product/new').then((response)=> {
                setlistProductNP(response.data.content);
                console.log(response.data.content);
            }).catch((error) =>{
            })
    },[])
    return (
    <div>
       <div className="newsletter">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Subscribe Our Newsletter</h1>
                    </div>
                    <div className="col-md-6">
                        <div className="form">
                            <input type="email" value="Your email here" readOnly></input>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="recent-product product">
            <div className="container-fluid">
                <div className="section-header">
                    <h1>Recent Product</h1>
                </div>
                <div className="row align-items-center product-slider product-slider-4">
                    <Carousel breakPoints={breakPoints}>
                        {listProductNP.map((product) => (
                                <Card product={product} key={product.id} star={[]}></Card>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    </div>
    )
}
