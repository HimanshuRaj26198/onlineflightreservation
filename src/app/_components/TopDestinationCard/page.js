const TopDestinationCard = ({ destination }) => {
  const sanitizedDestinationName = destination.iataCode
    .replace(/[^\w\s]/g, '')
    .replace(/\d+/g, '')
    .trim()
    .replace(/\s+/g, '-');

  return (
    <a 
      className="block" 
      href={`/flights-to/${sanitizedDestinationName}?name=${encodeURIComponent(destination.name)}&iataCode=${destination.iataCode}`}
    >
      <img src="/assets/images/home/lax.jpg" alt={destination.name} />
      <figcaption className="destination__title">
        {destination.name} <i className="fa fa-long-arrow-right" />
      </figcaption>
    </a>
  );
};

export default TopDestinationCard;
