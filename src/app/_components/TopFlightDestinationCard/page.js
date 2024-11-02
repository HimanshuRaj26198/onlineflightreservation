'use client';

import { useRouter } from 'next/navigation';

const TopFlightDestinationCard = ({ destination }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/FlightListing/iataCode=${destination.iataCode}`);
    };

    return (

        <li onClick={handleClick} key={destination.iataCode}>
            <figure>
                <img

                    src="/assets/flights/flight/airlinelogo-png/f9.png"
                    className="deal__logo"
                    alt="f9"
                />
            </figure>
            <div className="deal__detail">
                <strong>{destination.name}</strong>
                <div className="small_text">{destination.dateRange}</div>
            </div>
            <div className="deal__price">
                <small className="small_text">From</small> {destination.amount}
                <div className="small_text">Per adult</div>
            </div>
        </li>
    );
};

export default TopFlightDestinationCard;
