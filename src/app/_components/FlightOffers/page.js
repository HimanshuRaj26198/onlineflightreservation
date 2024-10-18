import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FlightDataArr from '@/assets/Flight_Data.json'

const FlightOfferCard = () => {

    const HandleFlightDetails = (flight) => {
        console.log(`Selected Airline: ${flight.airline}`);
    }

    const handleFlightNon = () => {
        console.log("Filter Flight by non Stap");
    }

    const handleFlightOnePlus = () => {
        console.log("Filter Flight by 1+ Stop");
    }

    // const settings = {
    //     infinite: true,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     arrows: true,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     responsive: [
    //         {
    //             breakpoint: 980,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 1,
    //                 arrows: false,
    //                 dots: true,
    //             },
    //         },
    //         {
    //             breakpoint: 767,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 arrows: false,
    //                 dots: true,
    //             },
    //         },
    //     ],
    // };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="listing-matrix-section slick-slider dealCntr dealSlider slick-initialized">
            <div className="tab-content">
                <div
                    role="tabpanel"
                    className="tab-pane active"
                    id="airlineMatrix"
                >
                    <div className="airline-matrix-wrapper hidden-xs">
                        <input
                            type="hidden"
                            id="isMixAvailable"
                            defaultValue="True"
                        />
                        <div className="row">
                            <div
                                className="col col-xs-3 col-sm-2 pr0"
                                style={{ width: "13%" }}
                            >
                                <div className="matrix-head">
                                    <ul>
                                        <li className="pt25px">
                                            Airlines <i className="fa fa-caret-right" />
                                        </li>
                                        <li
                                            onClick={() => handleFlightNon()} className="hand"
                                        >
                                            Non-Stop <i className="fa fa-caret-right" />
                                        </li>
                                        <li
                                            onClick={() => handleFlightOnePlus()} className="hand"
                                        >
                                            1+ Stop <i className="fa fa-caret-right" />
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pl0 col-xs-9 col-sm-10 pr0">
                                <Slider {...settings}>
                                    {FlightDataArr.map((flight, index) => (
                                        <div key={index} className="matrix-data" style={{ width: "100%" }}>
                                            <ul>
                                                <li className="head" onClick={() => HandleFlightDetails(flight)}>
                                                    <img src={flight.logo} alt={`${flight.airline} logo`} />
                                                    <div className="name">{flight.airline}</div>
                                                </li>
                                                <li className="matrix-cell mstop0">
                                                    <i className="fa" /> {flight.nonStopPrice ? `$${flight.nonStopPrice}` : '-'}
                                                </li>
                                                <li className="matrix-cell mstop1">
                                                    <i className="fa" /> {flight.oneStopPrice ? `$${flight.oneStopPrice}` : '-'}
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="matrix_bottom_row">
                <div className="multi-airline-icon hidden-xs" style={{}}>
                    <img src="/us/images/listing/mal-blue.png" /> Indicate
                    Multiple Airline
                </div>
            </div>
        </div>
    )
}

export default FlightOfferCard