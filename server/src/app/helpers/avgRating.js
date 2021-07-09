exports.addRating = (course_rating, total_ratings, newRating) => {
  return (course_rating * total_ratings + newRating) / (total_ratings + 1);
};

exports.removeRating = (course_rating, total_ratings, newRating) => {
  return (course_rating * total_ratings - newRating) / (total_ratings - 1);
};
