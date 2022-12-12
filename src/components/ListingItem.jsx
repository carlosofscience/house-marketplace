import { Link } from "react-router-dom"
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

function ListingItem({ listing, id, onDelete}) {

  const {
    name,
    imgUrls,
    type,
    location,
    offer,
    discountedPrice,
    regularPrice,
    bedrooms,
    bathrooms,
  } = listing;
  return (
    <li className="categoryListing">
      <Link to={`/category/${type}/${id}`} className="categoryListingLink">
        <img src={imgUrls[0]} alt={name} className="categoryListingImg" />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{location}</p>
          <p className="categoryListingName">{name}</p>
          <p className="categoryListingPrice">
            {offer
              ? formatToCurrency(discountedPrice)
              : formatToCurrency(regularPrice)}
            {type === "rent" && " / Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoText">
              {formatBedroomsAndBadrooms(bedrooms, "bedroom")}
            </p>
            <img src={bathtubIcon} alt="bath" />
            <p className="categoryListingInfoText">
              {formatBedroomsAndBadrooms(bathrooms, "bathroom")}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon
          className="removeIcon"
          fill="rgb(231, 76, 60)"
          onClick={() => onDelete(id, name)}
        ></DeleteIcon>
      )}
    </li>
  );
}

export const formatToCurrency = (num) => {
  let amount = num.toString();
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export const formatBedroomsAndBadrooms = (quantity, singularName) => {
 return quantity === 0 ? `no ${singularName}s` :`${quantity} ${quantity > 1 ? singularName + "s" : singularName}`
};



export default ListingItem