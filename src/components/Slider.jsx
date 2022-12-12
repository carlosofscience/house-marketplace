import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { collection, getDoc, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase.config'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Spinner from "./Spinner";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q); 
      let listings = [];
      querySnap.forEach(doc => {
        listings.push({
        id: doc.id,
        data: doc.data()
        })
      })
      setListings(listings)
      setLoading(false)
    };

    fetchListings()

  }, []);

  if(loading) return <Spinner />

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map(({ data, id }) => (
            <SwiperSlide key={id}>
              <div
                style={{
                  background: `rgba(0, 0, 0, 0) url(${data.imgUrls[0]}) no-repeat scroll center center`,
                  backgroundSize: "contain",
                  height: 400,
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">${data.discountedPrice ?? data.regularPrice } {data.type === 'rent' && ' / month' }</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider