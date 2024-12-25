const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className="text-yellow-400 inline-block"
        size={20}
      />
    );
  }
  if (hasHalfStar) {
    stars.push(
      <StarHalf key="half" className="text-yellow-400 inline-block" size={20} />
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        className="text-gray-300 inline-block"
        size={20}
      />
    );
  }
  return <>{stars}</>;
};

export default StarRating;
