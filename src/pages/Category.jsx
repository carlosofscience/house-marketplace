import { useState, useEffect } from 'react'
import { useFetcher, useParams, useResolvedPath } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { async } from '@firebase/util'

function Category() {

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const params = useParams()
  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get reference
        const listingsRef = collection(db, "listings");
        //create query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc", limit(10))
        );
        //execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, [params.categoryName]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Places for {params.categoryName === "rent" ? "rent" : "sale"}
        </p>
      </header>
      {loading ? <Spinner /> : listings && listings.length > 0 ? <main>
        <ul className="categoryListings">
          {listings.map((listing, key)=>(
            <h3 key={key}>{listing.data.name}</h3>
          ))}
        </ul>
      </main>: <p>No listings for {params.categoryName}</p> }
    </div>
  );
}

export default Category