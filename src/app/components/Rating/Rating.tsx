import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"; // Import the outline star
import { v4 as uuidv4 } from "uuid";

interface RatingProps {
  rating: number;
  numReviews: number;
}

const Rating: React.FC<RatingProps> = ({ rating, numReviews }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((rate) => (
        <FontAwesomeIcon
          key={uuidv4()}
          icon={
            rating >= rate
              ? faStar
              : rating >= rate - 0.5
              ? faStarHalfAlt
              : farStar
          }
          className="text-red-600"
        />
      ))}
      <span>({numReviews})</span>
    </div>
  );
};

export default Rating;
