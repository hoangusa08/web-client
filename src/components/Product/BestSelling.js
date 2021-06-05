import React , {useState , useEffect} from 'react'
import Card from './Card'
import Carousel from 'react-elastic-carousel';
import Api from '../Config/Api';
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1600, itemsToShow: 4 }
  ];
function BestSelling() {
    const [listProductBL , setlistProductBL] = useState([]);
    useEffect(() => {
            Api.get('client/product/best').then((response)=> {
                setlistProductBL(response.data.content);
            }).catch((error) =>{
            })
    },[])
    return (
    <div>
        {( listProductBL.length === 0 ) ? (
            <div className="isloading">
                Loading....
            </div>
        ) : (
        <div>
                 <div className="call-to-action">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h1>call us for any queries</h1>
                            </div>
                            <div className="col-md-6">
                                <a href="tel:0123456789">0339905697</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="featured-product product">
                    <div className="container-fluid">
                        <div className="section-header">
                            <h1>Best-Selling</h1>
                        </div>
                        <div className="row align-items-center product-slider product-slider-4">
                            <Carousel breakPoints={breakPoints}>
                                {listProductBL.map((product) => (
                                    <Card product={product} key={product.id} star={[]}></Card>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </div> 
        </div>
        )}
    </div>
    )
}

export default BestSelling
