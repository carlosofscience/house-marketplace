import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
import { toast } from "react-toastify";
import {
  formatToCurrency,
  formatBedroomsAndBadrooms,
} from "../components/ListingItem";

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const {
    name,
    discountedPrice,
    offer,
    regularPrice,
    location,
    type,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    userRef,
  } = listing;
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) return <Spinner />;

  return (
    <main>
      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          toast.info("Shared link copied ");
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="share" />
      </div>

      {shareLinkCopied && <p className="shareLinkCopied">Link Copied!</p>}

      <div className="listingDetails">
        <p className="listingName">
          {name} -{" "}
          {offer
            ? formatToCurrency(discountedPrice)
            : formatToCurrency(regularPrice)}
        </p>
        <p className="listingLocation">{location}</p>
        <p className="listingType">For {type === "rent" ? "rent" : "sale"}</p>
        {offer && (
          <p className="discountedPrice">
            ${regularPrice - discountedPrice} discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>{formatBedroomsAndBadrooms(bedrooms, "bedroom")}</li>
          <li>{formatBedroomsAndBadrooms(bathrooms, "bathroom")}</li>
          <li>{parking && "Parking Spot"}</li>
          <li>{furnished && "Furnished"}</li>
        </ul>

          <p className="listingLocationTitle">
            Location
          </p>

          {/* MAP HERE */}

          {auth.currentUser?.uid !== userRef && (
            <Link to={`/contact/${userRef}?listingName=${name}&Location${location}`} className="primaryButton">
              Contact Landlord
            </Link>
          )}

      </div>
    </main>
  );
}

export default Listing;
