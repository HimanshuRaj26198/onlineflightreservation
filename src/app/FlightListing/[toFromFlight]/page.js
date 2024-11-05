"use client"
import FlightOfferCard from '@/app/_components/FlightOffers/page';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import FlightCard from '@/app/_components/FlightCard/page';
import airlines from "../../../../lib/airlines.json";
import airportsDB from "../../../../lib/airports.json";
import FlightSearch from '@/app/_components/FlightSearch/page';
import FlightDetail from "@/app/_components/FlightDetail/page";
import { motion } from 'framer-motion';
import Loading from "@/app/loading";
import OfferPopup from "@/app/_components/OfferPopup/page";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


const FlightListing = () => {

    const timeFilters = [
        { label: "Early Morning", timeRange: "Before 6am", iconSrc: "/assets/images/listing/em.png", value: "Before 6am" },
        { label: "Morning", timeRange: "6am - 12pm", iconSrc: "/assets/images/listing/m.png", value: "6am - 12pm" },
        { label: "Afternoon", timeRange: "12pm - 6pm", iconSrc: "/assets/images/listing/a.png", value: "12pm - 6pm" },
        { label: "Evening", timeRange: "After 6pm", iconSrc: "/assets/images/listing/e.png", value: "After 6pm" },
    ];

    // added comment

    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const name1 = searchParams.get("name1");
    const dateRange = searchParams.get("dateRange");

    const router = useRouter();

    const searchRef = useRef(null);
    const [flightList, setFlightLists] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [flightDetail, setFlightDetailVisible] = useState(false);
    const [mobileFilterVisible, setMobileFilterVisible] = useState(false);
    const [openedFilter, setOpenedFilter] = useState("Stops");
    const [filtersObj, setFiltersObj] = useState({ stops: 0 });
    const [offerPopupVisible, setOfferPopupVisible] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [maxHeight, setMaxHeight] = useState("0px");
    const [activeTab, setActiveTab] = useState('all');
    const [uniqueAirlines, setUniqueAirlines] = useState([]);
    const searchParam = useSearchParams();

    const [activeFlight, setActiveFlight] = useState(null);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [stopFilter, setStopFilter] = useState(null)
    const [selectedTimeFilter, setSelectedTimeFilter] = useState("");
    const [showMoreAirlines, setShowMoreAirlines] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [selectedAirports, setSelectedAirports] = useState([]);
    const [airlinesDetails, setAirlineDetails] = useState([])
    const [selectedStop, setSelectedStop] = useState(null);
    const [selectedAirlines, setSelectedAirlines] = useState([]);


    const stopOptions = flightList.flatMap(flight => {
        const stops = flight.itineraries[0].segments.length - 1;
        const grandTotal = flight.price.grandTotal;

        return [
            { label: "Non Stop", value: 0, price: grandTotal, flight },
            { label: "1 Stop", value: 1, price: grandTotal, flight },
            { label: "2 Stops", value: 2, price: grandTotal, flight }
        ].filter(option => option.value <= stops);
    });

    // Group by stop type and find minimum price
    const minPriceStops = stopOptions.reduce((acc, option) => {

        if (option.value >= 0 && option.value <= 2) {
            if (!acc[option.value] || option.price < acc[option.value].price) {
                acc[option.value] = {
                    label: option.label,
                    value: option.value,
                    price: option.price,
                    flight: option.flight
                };
            }
        }
        return acc;
    }, {});


    // Convert back to an array
    const availableStops = Object.values(minPriceStops);

    console.log(availableStops, "MINIMUM PRICES");

    // FILTERING THE FLIGHT
    useEffect(() => {
        // console.log("coming here");
        // console.log({ activeFlight });

        // Filtering the flight based on flight name
        let tmpData = flightList;
        if (activeFlight !== null) {
            tmpData = flightList.filter((obj) => {
                return obj.validatingAirlineCodes[0] === activeFlight.airlineCode;
            });

            setAppliedFilters(prev => {
                const existingFilter = prev.find(filter => filter.type === 'Airline');
                if (existingFilter) {
                    return prev.map(filter =>
                        filter.type === 'Airline' ? { ...filter, value: activeFlight.airlineName } : filter
                    );
                }
                return [...prev, { type: 'Airline', value: activeFlight.airlineName }];
            });
            // console.log(tmpData);
        }

        // Filtering the flight based on stoping 

        if (stopFilter === 'Non Stop') {
            tmpData = tmpData.filter(flight =>
                flight.itineraries.every(itinerary => itinerary.segments.length === 1)
            );
            setAppliedFilters(prev =>
                prev.filter(filter => filter.type !== 'Stop').concat({ type: 'Stop', value: 'Non-Stop' })
            );
        } else if (stopFilter === '1 Stop') {
            tmpData = tmpData.filter(flight =>
                flight.itineraries.some(itinerary => itinerary.segments.length === 2)
            );
            setAppliedFilters(prev =>
                prev.filter(filter => filter.type !== 'Stop').concat({ type: 'Stop', value: 'One-Stop' })
            );
        } else if (stopFilter === '2 Stops') {
            tmpData = tmpData.filter(flight =>
                flight.itineraries.some(itinerary => itinerary.segments.length > 2)
            );
            setAppliedFilters(prev =>
                prev.filter(filter => filter.type !== 'Stop').concat({ type: 'Stop', value: 'Two or More Stops' })
            );
        }

        setFilteredFlights(tmpData);

    }, [activeFlight, flightList, stopFilter])


    const handleStopFilter = (type) => {
        const selectedOption = availableStops.find(option => option.label === type);
        setSelectedStop(selectedOption);
        setStopFilter(type);
    };

    // Filtering the flight based on airport
    const handleCheckboxChanges = (airportCode) => {
        setSelectedAirports((prev) => {
            if (prev.includes(airportCode)) {
                // Remove airport if it's already selected
                const newSelected = prev.filter(code => code !== airportCode);
                setAppliedFilters((filters) => filters.filter(filter => filter.value !== airportCode));
                return newSelected;
            } else {
                // Add airport if it's not selected
                const newSelected = [...prev, airportCode];
                setAppliedFilters((filters) => [...filters, { type: 'Airport', value: airportCode }]);
                return newSelected;
            }
        });
    };

    // Filtering the flight based on Time Zone

    useEffect(() => {
        if (flightList && flightList.length > 0) {
            // Filter flights based on selected time filter
            const filtered = flightList.filter(flight => {
                const departureTime = new Date(flight.itineraries[0].segments[0].departure.at).getHours();

                switch (selectedTimeFilter) {
                    case 'Before 6am': // Early Morning: Before 6am
                        return departureTime < 6;
                    case '6am - 12pm': // Morning: 6am - 12pm
                        return departureTime >= 6 && departureTime < 12;
                    case '12pm - 6pm': // Afternoon: 12pm - 6pm
                        return departureTime >= 12 && departureTime < 18;
                    case 'After 6pm': // Evening: After 6pm
                        return departureTime >= 18;
                    default:
                        return true; // No filter, show all flights
                }
            });

            // Update filters, replacing the previous time filter if it exists
            setAppliedFilters(prev =>
                prev.filter(filter => filter.type !== 'departureTime').concat({ type: 'departureTime', value: selectedTimeFilter })
            );

            setFilteredFlights(filtered);
        }
    }, [flightList, selectedTimeFilter]);


    const handleFilterClick = (filter) => {
        setSelectedTimeFilter(filter);
    };

    const handleCheckboxChange = (flight) => {
        const { airlineCode } = flight;

        setSelectedAirlines((prevSelected) => {
            if (prevSelected.includes(airlineCode)) {
                // If already selected, remove it
                return prevSelected.filter(code => code !== airlineCode);
            } else {
                // If not selected, add it
                return [...prevSelected, airlineCode];
            }
        });
        setActiveFlight(prev => (prev && prev.airlineCode === airlineCode) ? null : flight);
    };

    const variants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { ease: "easeOut", duration: 0.5 } },
        exit: { x: '100%', opacity: 0, transition: { ease: "easeIn", duration: 0.5 } }
    };

    const hideOfferPopup = () => {
        setOfferPopupVisible(false);
    }

    useEffect(() => {
        console.log(filtersObj);
    }, filtersObj);


    //Function for Extract the data
    const processFlightData = (json) => {
        let flightDetails = [];
        const uniqueAirlines = new Set();

        json.data.forEach(a => {
            a.stops = a.itineraries[0].segments.length - 1; // Calculate stops

            // Process each itinerary and segment
            a.itineraries.forEach(b => {
                b.segments.forEach(segment => {
                    segment.airline = airlines[segment.carrierCode];
                    segment.arrival.airport = airportsDB[segment.arrival.iataCode];
                    segment.departure.airport = airportsDB[segment.departure.iataCode];

                    // Append cabin class to the segment
                    const cabin = a.travelerPricings[0].fareDetailsBySegment.find(fare => fare.segmentId === segment.id)?.cabin;
                    if (cabin) segment.cabin = cabin;
                });
            });

            // Create a new object to store combined details
            const flightDetail = {
                price: a.price.grandTotal,
                airlineCode: a.validatingAirlineCodes[0],
                isNonStop: a.stops === 0,
                isOnePlusStop: a.stops > 0,
                airlineName: a.itineraries[0].segments[0].airline.name,
                airlineLogo: a.itineraries[0].segments[0].airline.logo,
                departureAirportName: a.itineraries[0].segments[0].departure.airport.name,
                departureAirportIata: a.itineraries[0].segments[0].departure.iataCode,
                arrivalAirportName: a.itineraries[0].segments[0].arrival.airport.name,
                arrivalAirportIata: a.itineraries[0].segments[0].arrival.iataCode,
                duration: a.itineraries[0].duration,
            };

            if (!uniqueAirlines.has(flightDetail.airlineCode)) {
                uniqueAirlines.add(flightDetail.airlineCode);
                flightDetails.push(flightDetail);
            }
        });


        console.log(flightDetails, "Processed Flight Details");
        setAirlineDetails(flightDetails)

        return flightDetails;
    };

    useEffect(() => {
        const fetchFlightOffers = async () => {
            let travellersArr = [];
            if (searchParam.get("adult")) {
                for (let x = 0; x < parseInt(searchParam.get("adult")); x++) {
                    travellersArr.push({ id: travellersArr.length + 1, travelerType: "ADULT" })
                }
            }

            if (searchParam.get("child")) {
                for (let x = 0; x < parseInt(searchParam.get("child")); x++) {
                    travellersArr.push({ id: travellersArr.length + 1, travelerType: "CHILD" })
                }
            }

            if (searchParam.get("infant")) {
                for (let x = 0; x < parseInt(searchParam.get("infant")); x++) {
                    travellersArr.push({ id: travellersArr.length + 1, travelerType: "SEATED_INFANT" })
                }
            }

            // console.log(searchParam.get("returnD"));
            // console.log(searchParam.get("depDate"));


            let cabinRestrictionObj = {};
            if (searchParam.get("airline") !== "all") {
                cabinRestrictionObj = {
                    "includedCarrierCodes": [searchParam.get("airline")]
                }
            }


            let query = {
                "currencyCode": "USD",
                "originDestinations": [
                    {
                        "id": "1",
                        "originLocationCode": searchParam.get("origin"),
                        "destinationLocationCode": searchParam.get("destination"),
                        "departureDateTimeRange": {
                            "date": searchParam.get("depDate")
                        }
                    }
                ],
                "travelers": travellersArr,
                "sources": [
                    "GDS"
                ],
                "searchCriteria": {
                    "maxFlightOffers": 50,
                    "flightFilters": {
                        "cabinRestrictions": [
                            {
                                "cabin": searchParam.get("cabin"),
                                "originDestinationIds": [
                                    "1"
                                ]
                            }
                        ],
                        "carrierRestrictions": cabinRestrictionObj

                    },

                }
            };

            // let query1 = {
            //     "currencyCode": "USD",
            //     "originDestinations": [
            //         {
            //             "id": "1",
            //             "originLocationCode": searchParam.get("origin"),
            //             "destinationLocationCode": searchParam.get("destination"),
            //             "departureDateTimeRange": {
            //                 "date": searchParam.get("depDate")
            //             }
            //         },
            //         {
            //             "id": "2",
            //             "originLocationCode": searchParam.get("destination"),
            //             "destinationLocationCode": searchParam.get("origin"),
            //             "departureDateTimeRange": {
            //                 "date": searchParam.get("returnD")
            //             }
            //         }
            //     ],
            //     "travelers": travellersArr,
            //     "sources": [
            //         "GDS"
            //     ],
            //     "searchCriteria": {
            //         "maxFlightOffers": 50,
            //         "flightFilters": {
            //             "cabinRestrictions": [
            //                 {
            //                     "cabin": searchParam.get("cabin"),
            //                     "originDestinationIds": [
            //                         "1", "2"
            //                     ]
            //                 }
            //             ],
            //             "carrierRestrictions": cabinRestrictionObj

            //         },

            //     }
            // };


            try {
                const response = await fetch("https://api.amadeus.com/v2/shopping/flight-offers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${searchParam.get("token")}`
                    },
                    // body: oneway ? JSON.stringify(query) : JSON.stringify(query1)
                    body: JSON.stringify(query)
                });
                const json = await response.json();
                console.log(json, "JSON");
                const FlightList = json.data.map(a => {
                    a.stops = a.itineraries[0].segments.length - 1;
                    a.itineraries.forEach(b => {
                        b.segments.forEach(segment => {
                            segment.airline = airlines[segment.carrierCode];
                            segment.arrival.airport = airportsDB[segment.arrival.iataCode];
                            segment.departure.airport = airportsDB[segment.departure.iataCode];
                            // Append the cabin class to the segment
                            const cabin = a.travelerPricings[0].fareDetailsBySegment.find(fare => fare.segmentId === segment.id)?.cabin;
                            if (cabin) segment.cabin = cabin;
                        });
                    });
                    return a;
                });

                // let newFlightList;

                // if (!oneway) {
                //     newFlightList = json.data.map(a => {
                //         a.stops = a.itineraries[1].segments.length - 1;
                //         a.itineraries.forEach(b => {
                //             b.segments.forEach(segment => {
                //                 segment.airline = airlines[segment.carrierCode];
                //                 segment.arrival.airport = airportsDB[segment.arrival.iataCode];
                //                 segment.departure.airport = airportsDB[segment.departure.iataCode];
                //                 // Append the cabin class to the segment
                //                 const cabin = a.travelerPricings[0].fareDetailsBySegment.find(fare => fare.segmentId === segment.id)?.cabin;
                //                 if (cabin) segment.cabin = cabin;
                //             });
                //         });
                //         console.log(newFlightList, "NEWFLIGHTLIST");

                //         return a;
                //     });
                // }

                // if (!oneway) {
                //     setFlightLists(FlightList);
                // } else {
                //     const twoway = [...(FlightList || []), ...(newFlightList || [])]
                //     console.log(twoway, "TWOWAY");

                //     setFlightLists(twoway);
                // }


                // function call data based on json
                const flightDetails = processFlightData(json);

                setUniqueAirlines(flightDetails);

                setFlightLists(FlightList);

                if (FlightList.length <= 0) {
                    router.push(`/home/no-results?origin=${searchParam.get("origin")}&destination=${searchParam.get("destination")}&depDate=${searchParam.get("depDate")}&returnD=${searchParam.get("returnD")}`);
                } else {
                    setFlightLists(FlightList);
                    setLoading(false);
                    let offerInterval = setInterval(() => {
                        if (!offerPopupVisible) {
                            setOfferPopupVisible(true);
                        }
                    }, 25000);
                }
            } catch (err) {
                // router.push(`/home/no-results?origin=${searchParam.get("origin")}&destination=${searchParam.get("destination")}&depDate=${searchParam.get("depDate")}&returnD=${searchParam.get("returnD")}`);
            }
        }
        fetchFlightOffers();
    }, [searchParam])

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleEditSearchClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    useEffect(() => {

        if (isSearchVisible) {
            setMaxHeight(`${searchRef.current.scrollHeight}px`);
        } else {
            setMaxHeight("0px");
        }
    }, [isSearchVisible]);

    // For Nearest Airports

    const [nearbyAirports, setNearbyAirports] = useState([]);

    useEffect(() => {
        const fetchNearbyAirports = async () => {

            if (flightList.length === 0) {
                console.log("No flights available.");
                return;
            }

            const arrivalSegment = flightList[0].itineraries[0].segments[0].arrival.airport;
            const latitude = arrivalSegment.latitude;
            const longitude = arrivalSegment.longitude;

            console.log(latitude, "HEY Latitude");
            console.log(longitude, "HEY Longitude");

            try {
                let response = await fetch(`https://api.amadeus.com/v1/reference-data/locations/airports?latitude=${latitude}&longitude=${longitude}&radius=200&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=relevance`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${searchParam.get("tk")}`
                    }
                });

                let result = await response.json();
                console.log(result, "FINAL");

                if (Array.isArray(result.data)) {
                    // Merge nearby airports with matching flight data
                    const mergedAirports = result.data.map(airport => {
                        // Find any matching flight that arrives at this airport
                        const matchingFlights = flightList.filter(flight =>
                            flight.itineraries[0].segments.some(segment =>
                                segment.arrival.airport.iata === airport.iata
                            )
                        );

                        return {
                            ...airport,
                            matchingFlights // Attach matching flights to each airport
                        };
                    });

                    setNearbyAirports(mergedAirports);
                } else {
                    console.error('Unexpected API response:', result);
                    setNearbyAirports([]);
                }

            } catch (error) {
                console.error('Error fetching nearby airports:', error);
                setNearbyAirports([]);
            }
        };
        fetchNearbyAirports();
    }, [flightList]);

    // Shortest Flight Filtering

    const getShortestFlights = () => {
        return [...flightList]
            .sort((a, b) => {
                return a.itineraries[0].segments.length - b.itineraries[0].segments.length;
            })
            .slice(0, 10);
    }

    const [grandTotal, setGrandTotal] = useState("");
    const [nearTotal, setNearTotal] = useState("");
    const [shortestTotal, setShortestTotal] = useState("");

    useEffect(() => {

        const shortestFlights = getShortestFlights();

        const allPrices = Array.isArray(flightList) ? flightList.map(flight => flight.price) : [];
        const nearbyPrices = Array.isArray(nearbyAirports) ? nearbyAirports.map(flight => flight.price) : [];
        const shortestPrices = Array.isArray(shortestFlights) ? shortestFlights.map(flight => flight.price) : [];

        console.log(allPrices, "ALL PRICES");
        console.log(nearbyPrices, "NEARBY");
        console.log(shortestPrices, "SHORTEST");


        if (allPrices.length > 0 || nearbyPrices.length > 0 || shortestPrices.length > 0) {
            setGrandTotal(allPrices[0]?.grandTotal);
            setNearTotal(nearbyPrices[0]?.grandTotal);
            setShortestTotal(shortestPrices[0]?.grandTotal);

            console.log(allPrices[0]?.grandTotal, "MINIMUM-ALL");
        } else {
            console.log("allPrices is empty or not defined");
        }

    }, [flightList, nearbyAirports]);

    // For Price Range Filtering

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    useEffect(() => {
        if (flightList.length > 0) {
            const prices = flightList.map(flight => parseFloat(flight.price.grandTotal));
            const calculatedMinPrice = Math.min(...prices);
            const calculatedMaxPrice = Math.max(...prices);
            setMinPrice(calculatedMinPrice);
            setMaxPrice(calculatedMaxPrice);
            setPriceRange({ min: calculatedMinPrice, max: calculatedMaxPrice });
            setFilteredFlights(flightList);
        }
    }, [flightList]);

    const handlePriceChange = (newRange) => {
        setPriceRange({ min: newRange[0], max: newRange[1] });

        const filtered = flightList.filter(flight => {
            const flightPrice = parseFloat(flight.price.grandTotal);
            return flightPrice >= newRange[0] && flightPrice <= newRange[1];
        });

        setFilteredFlights(filtered);

        setAppliedFilters(prevFilters => {

            const priceFilterIndex = prevFilters.findIndex(filter => filter.type === 'Price range');

            if (priceFilterIndex !== -1) {

                const updatedFilters = [...prevFilters];
                updatedFilters[priceFilterIndex] = {
                    type: 'Price range',
                    value: `$${newRange[0]} - $${newRange[1]}`,
                };
                return updatedFilters;
            } else {

                return [
                    ...prevFilters,
                    {
                        type: 'Price range',
                        value: `$${newRange[0]} - $${newRange[1]}`,
                    },
                ];
            }
        });
    };

    const resetFilters = () => {
        setPriceRange({ min: minPrice, max: maxPrice });
        setFilteredFlights(flightList);
    };

    return (
        <>
            {!offerPopupVisible && flightList && <div onClick={() => setOfferPopupVisible(true)} className="count-top-icon pointer uc-minimize-strip" id="reopen_ucb" bis_skin_checked="1">
                <div className="strip-content ng-binding" bis_skin_checked="1">
                    <img src="/assets/images/uc/mob-call.gif" />
                    <img className="tel-icon" src="/assets/images/uc/telephone-call.svg" />
                    $  {flightList[0] && flightList[0].travelerPricings[0].price.total - 4}
                    {/* <span className="Timer">00:14:16</span> */}
                </div>
            </div>}
            {offerPopupVisible && <OfferPopup hideOfferPopup={hideOfferPopup} flight={flightList[0]} />}
            {/* {loading && <Loading />} */}
            {flightDetail && <motion.div
                id="_flight-details"
                class="flight-details collapse"
                style={{ display: "block", height: "100% !important", position: "fixed", right: 0, top: 0 }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                bis_skin_checked="1">
                <div bis_skin_checked="1">
                    {/* <!-- Nav tabs --> */}
                    <div class="leg-top-fix" bis_skin_checked="1">
                        <div class="detail-head" bis_skin_checked="1">
                            <a class="close-btn" onClick={() => setFlightDetailVisible(false)} ><img src="/assets/images/uc/cancel.svg" alt=" /" /></a>
                        </div>
                        <ul class="flight-leg-tab" role="tablist">
                            <li role="presentation" class="active deptab"><a href="#" onclick="flightdetailAction(0)" aria-controls="Departure" role="tab" data-toggle="tab"><i class="fa fa-plane" style={{ transform: "rotate(45deg)" }}></i> Departure</a></li>
                            {/* <!--<li role="presentation" class="pricetab"><a href="#" onclick="flightdetailAction(2)" aria-controls="price" role="tab" data-toggle="tab"><i class="fa fa-file-text" aria-hidden="true"></i> Fare Breakup</a></li>--> */}
                        </ul>
                    </div>
                    <FlightDetail selectedFlight={selectedFlight && selectedFlight} travellerDetails={{ adults: searchParam.get("adult"), child: searchParam.get("child"), infant: searchParam.get("infant"), cabin: searchParam.get("cabin") }} />
                </div>
            </motion.div>}

            {/* <noscript>
                &lt;iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5L5GNW3"
                height="0" width="0"
                style="display:none;visibility:hidden"&gt;&lt;/iframe&gt;
            </noscript> */}

            <div className="body-content">
                <div
                    id="_flight-details"
                    className="flight-details collapse"
                    style={{ height: "100%!important" }}
                ></div>
                <div
                    id="overlay_detail"
                    className="midum-overlay"
                    style={{ display: "none" }}
                />
                <div className="modify-engine-wrapper">
                    <a href="javascript:void(0);" className="close-sidebar fa fa-close" />
                    <div className="holder">
                        <div className="modify-engine">
                            <div className="container">
                                <div className="search_detail edit-listing-searchdetails hand">
                                    <div className="row">
                                        <div className="">

                                            {/* Conditionally render search details or close button */}

                                            {!isSearchVisible ? (
                                                <div className="search_detail edit-listing-searchdetails hand">


                                                    <div className="col-sm-8">
                                                        {name} &nbsp;
                                                        <b>
                                                            {" "}
                                                            <i className="fa fa-exchange" />{" "}
                                                        </b>
                                                        &nbsp; {name1}
                                                        <br />
                                                        {dateRange} , 1 Traveler, Economy
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="modify_search pull-right edit-listing-search"
                                                        onClick={handleEditSearchClick}
                                                    >
                                                        Edit Search
                                                    </button>
                                                </div>
                                            ) : (
                                                <a className="close-listing-search visible-lg visible-md" onClick={handleEditSearchClick} >
                                                    Close{/* */} [x]
                                                </a>
                                            )}

                                        </div>
                                    </div>
                                </div>
                                <div ref={searchRef}
                                    style={{
                                        maxHeight: maxHeight,
                                        overflow: "hidden",
                                        transition: "max-height 0.5s ease-in-out",
                                    }}>
                                    <FlightSearch />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mobile-header-fixed">
                    <div className="mobile-itenery modifySearchMobile">
                        <div className="result-itenery">
                            <div className="row">
                                <div className="col-xs-12">
                                    <a>
                                        <div className="modify-src-btn">
                                            <img src="https://www.lookbyfare.com/us/images/svg/edit-icon.svg" alt="" />
                                        </div>
                                    </a>
                                    <div className="city-itenery">
                                        <div className="column">
                                            <p className="airportCode">OAK</p>
                                        </div>
                                        <div className="column">
                                            <div className="airporticon">
                                                <b>
                                                    {" "}
                                                    <i className="fa fa-exchange" />{" "}
                                                </b>
                                            </div>
                                        </div>
                                        <div className="column">
                                            <p className="airportCode">LAS</p>
                                        </div>
                                        <div className="clearfix" />
                                        <div className="itenery-date">
                                            Oct 19, 2024
                                            <span style={{ margin: "0 3px" }}>-</span> Oct 22, 2024
                                            <span className="traveller-xxs">
                                                <span>&nbsp; | &nbsp;</span>1 Traveler
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="filter_strip_mobile modifyFilterMobile hidden-lg hidden-md">
                        <img
                            className="filter_icon_mobile responsiveFilter_btn"
                            src="https://www.lookbyfare.com/us/images/svg/filter-icon.svg"
                        />
                        <ul>
                            <li id="filter_strip_mobile_stops">
                                <a
                                    onclick="Filter.filtertabactive('tab-1', 'stops');"
                                    href="javascript:void(0);"
                                >
                                    {" "}
                                    Stops
                                </a>{" "}
                                <span className="reset_filter" onclick="Filter.restFilter('stops')">
                                    X
                                </span>
                            </li>
                            <li id="filter_strip_mobile_price">
                                <a
                                    onclick="Filter.filtertabactive('tab-3', 'price');"
                                    href="javascript:void(0);"
                                >
                                    {" "}
                                    Price
                                </a>{" "}
                                <span className="reset_filter" onclick="Filter.restpricefilter('')">
                                    X
                                </span>
                            </li>
                            <li id="filter_strip_mobile_airlines">
                                <a
                                    onclick="Filter.filtertabactive('tab-5', 'airlines');"
                                    href="javascript:void(0);"
                                >
                                    {" "}
                                    Airlines
                                </a>{" "}
                                <span
                                    className="reset_filter"
                                    onclick="Filter.restFilter('airline')"
                                >
                                    X
                                </span>
                            </li>
                            <li id="filter_strip_mobile_time">
                                <a
                                    onclick="Filter.filtertabactive('tab-4', 'time');"
                                    href="javascript:void(0);"
                                >
                                    Time
                                </a>{" "}
                                <span
                                    className="reset_filter"
                                    onclick="Filter.restmobdepretfilter('')"
                                >
                                    X
                                </span>
                            </li>
                            <li id="filter_strip_mobile_airports">
                                <a
                                    onclick="Filter.filtertabactive('tab-6', 'airports');"
                                    href="javascript:void(0);"
                                >
                                    Airports
                                </a>{" "}
                                <span
                                    className="reset_filter"
                                    onclick="Filter.restFilter('airports')"
                                >
                                    X
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <loading>
                    <div
                        className="loader"
                        style={{ position: "absolute", display: "none" }}
                    />
                </loading>
                <div id="div_gotopayment" style={{ display: "none" }}>
                    <div
                        style={{
                            padding: 7,
                            width: 125,
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10007,
                            background: "#fff",
                            textAlign: "center",
                            borderRadius: 10
                        }}
                    >
                        <img src="/images/loading.gif" style={{ width: 80 }} />
                        <span
                            id="loadermsg"
                            style={{ fontSize: 12, color: "rgb(255, 127, 0)", display: "none" }}
                        />
                    </div>
                    <div className="midum-overlay" id="fadebackground" />
                </div>
                <div className="listing-wrapper">
                    <div className="container">
                        <input type="hidden" id="tabvalue" name="tabvalue" defaultValue="all" />
                        <a
                            className="matrix_btn visible-sm hidden-xs visible-xs"
                            role="button"
                            id="marixOption"
                            data-toggle="collapse"
                            onclick="matrixOpen();"
                            href="javascript:void(0);"
                            aria-expanded="true"
                            aria-controls="airlineMatrixblock"
                            style={{ marginLeft: 5 }}
                        >
                            {" "}
                            <i className="fa fa-th-large" aria-hidden="true" /> Matrix{" "}
                            <i className="fa fa-angle-up" aria-hidden="true" />
                        </a>
                        <div className="row">
                            <div className="col-sm-12 col-md-3 col-xs-12">
                                <div className={`show-component-mobile ${mobileFilterVisible && "open"}`}>
                                    <div className="filter-main-head">
                                        Filters
                                        <svg
                                            width={16}
                                            height={16}
                                            fill="currentColor"
                                            className="bi bi-x close-sidebar"
                                            viewBox="0 0 16 16"
                                            onClick={() => setMobileFilterVisible(false)}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                            />
                                        </svg>
                                    </div>
                                    <ul className="filterTabs">
                                        <li id="filterTabs_tab-1" onClick={() => setOpenedFilter("Stops")} className={openedFilter === "Stops" && "active"}>
                                            <a data-toggle="tab">
                                                Stops
                                            </a>
                                        </li>
                                        <li id="filterTabs_tab-3">
                                            <a data-toggle="tab" href="#tab-3">
                                                Price
                                            </a>
                                        </li>
                                        <li id="filterTabs_tab-5">
                                            <a data-toggle="tab" href="#tab-5">
                                                Airlines
                                            </a>
                                        </li>
                                        <li id="filterTabs_tab-4">
                                            <a data-toggle="tab" href="#tab-4">
                                                Time
                                            </a>
                                        </li>
                                        <li id="filterTabs_tab-6">
                                            <a data-toggle="tab" href="#tab-6">
                                                Airports
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="clearfix" />
                                    <div className="holder">
                                        <div className="filter-block">

                                            <div className="filter-item filter_top_info">
                                                <h4>
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="clear-all-filters pull-right hidden-xs"
                                                        style={{ display: "block" }}
                                                        onClick={() => {
                                                            setSelectedTimeFilter("");
                                                            setStopFilter(null);
                                                            setActiveFlight(null);
                                                            setAppliedFilters([]);
                                                            setSelectedStop(null)
                                                            setPriceRange({ min: minPrice, max: maxPrice });
                                                            setFilteredFlights(flightList);
                                                            setSelectedAirlines([]);
                                                        }}
                                                    >
                                                        Reset all
                                                    </a>
                                                    <i className="fa fa-filter" aria-hidden="true" /> Filter
                                                    your result
                                                </h4>
                                                <p className="result-found">
                                                    <span id="totalResults">{flightList.length}</span> Results Found{" "}
                                                </p>
                                            </div>

                                            <div
                                                id="tab-1"
                                                className={`filter-item tab-pane ${openedFilter === "Stops" && "active"}`}
                                                style={{ clear: "both" }}
                                            >
                                                <div className="head">
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="headairport"
                                                        onClick={() => {
                                                            setStopFilter(null);
                                                            setAppliedFilters([]);
                                                            setSelectedStop(null);
                                                        }}
                                                    >
                                                        Reset
                                                    </a>
                                                    Stops
                                                </div>
                                                <div className="filter-data">
                                                    <div className="inputSet stopset">
                                                        {availableStops.map(option => (
                                                            <label className="mode" key={option.value} onClick={() => handleStopFilter(option.label)}>
                                                                <span className="filter-price">${option.price}</span>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedStop?.value === option.value}
                                                                    readOnly
                                                                />
                                                                <span>{option.label}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="tab-3" className="filter-item tab-pane">
                                                <div className="head">
                                                    <a href="javascript:void(0);" className="headairport" onClick={resetFilters}>
                                                        Reset
                                                    </a>
                                                    Price Range
                                                </div>
                                                <div className="filter-data">
                                                    <p className="time-filter-data">
                                                        <span className="slider-range2 pull-right">
                                                            ${priceRange.max}
                                                        </span>
                                                        <span className="slider-range">
                                                            ${priceRange.min}
                                                        </span>
                                                    </p>
                                                    <Slider
                                                        range
                                                        min={minPrice}
                                                        max={maxPrice}
                                                        value={[priceRange.min, priceRange.max]}
                                                        onChange={handlePriceChange}
                                                    />
                                                    <br />
                                                </div>
                                            </div>

                                            <div id="tab-4" className="filter-item tab-pane">
                                                <div className="head">
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="headairport"
                                                        onClick={() => {
                                                            setSelectedTimeFilter("");
                                                            setAppliedFilters([]);
                                                        }}
                                                    >
                                                        Reset
                                                    </a>
                                                    <i className="fa fa-plane" style={{ transform: "rotate(45deg)" }} />{" "}
                                                    From {searchParam.get("name")}
                                                </div>

                                                <div className="filter-data mb20">
                                                    <ul className="time_filter _deptimecontainer">
                                                        {timeFilters.map((filter) => (
                                                            <li
                                                                key={filter.value}
                                                                className="deptimefilter"
                                                                onClick={() => handleFilterClick(filter.value)}
                                                            >
                                                                <img src={filter.iconSrc} alt={filter.label} />
                                                                <strong>{filter.label}</strong>
                                                                <div className="time">{filter.timeRange}</div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div id="tab-5" className="filter-item bdrR0 tab-pane">
                                                <div className="head">
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="headairport"
                                                        onClick={() => {
                                                            setActiveFlight(null);
                                                            setSelectedAirlines([]);
                                                            setAppliedFilters([]);
                                                        }}
                                                    >
                                                        Reset
                                                    </a>

                                                    Airlines
                                                </div>
                                                <div className="filter-data">
                                                    {airlinesDetails && airlinesDetails.length > 0 ? (
                                                        airlinesDetails.slice(0, showMoreAirlines ? airlinesDetails.length : 3).map((flight, index) => (
                                                            <div className="inputSet" key={index}>
                                                                <label className="mode">
                                                                    <span className="filter-price">${flight.price}</span>
                                                                    <input
                                                                        type="checkbox"
                                                                        name="airline"
                                                                        checked={selectedAirlines.includes(flight.airlineCode)}
                                                                        onChange={() => handleCheckboxChange(flight)}
                                                                    />
                                                                    <span>{flight.airlineName}</span>
                                                                </label>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No airlines available</p>
                                                    )}
                                                    <div className="clearfix" />
                                                    <div className="show-more">
                                                        <a
                                                            href="javascript:void(0);"
                                                            id="moreair"
                                                            onClick={() => setShowMoreAirlines(!showMoreAirlines)}
                                                        >
                                                            {showMoreAirlines ? 'Show Less Airlines' : 'More Airlines'} <i className="fa fa-angle-down" />
                                                        </a>
                                                    </div>
                                                    <div
                                                        className="multi-airline-icon"
                                                        style={{ display: "none", margin: "10px 0 0" }}
                                                    >
                                                        <img src="https://www.lookbyfare.com/us/images/listing/mal-blue.png" /> Indicate
                                                        Multiple Airline
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="tab-6" className="filter-item tab-pane">
                                                <div className="head">
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="headairport"
                                                        onClick={() => {
                                                            setSelectedAirports([]);
                                                            setAppliedFilters([]);
                                                        }}
                                                    >
                                                        Reset
                                                    </a>
                                                    <i className="fa fa-plane" style={{ transform: "rotate(45deg)" }} />
                                                    <span>Departure Airports</span>
                                                </div>
                                                <div className="filter-data">
                                                    {Array.from(new Set(airlinesDetails.map(flight => flight.departureAirportIata)))
                                                        .map(airportCode => {
                                                            const flight = airlinesDetails.find(flight => flight.departureAirportIata === airportCode);
                                                            return (
                                                                <div className="inputSet" key={airportCode}>
                                                                    <label className="mode">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="departureairports"
                                                                            checked={selectedAirports.includes(airportCode)}
                                                                            onChange={() => handleCheckboxChanges(airportCode)}
                                                                        />
                                                                        <span>{flight.departureAirportIata} ({flight.departureAirportName})</span>
                                                                    </label>
                                                                </div>
                                                            );
                                                        })}
                                                    <div className="clearfix" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="mobile-button">
                                        <a
                                            href="javascript:void(0);"
                                            onclick="Filter.resetAll()"
                                            className="reset-all-filters"
                                        >
                                            {" "}
                                            Reset all Filter
                                        </a>
                                        <a href="javascript:void(0);" className="apply-filters">
                                            Close
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-9 col-xs-12">
                                <div className="listing-matrix-section">
                                    <FlightOfferCard airlinesData={uniqueAirlines} setActiveFlight={setActiveFlight} handleStopFilter={handleStopFilter} />
                                </div>
                                <div className="covid-list hidden-xs">
                                    <b>Note:</b> All the fares displayed are for Round Trip and are in
                                    USD, inclusive of base fare, taxes and service fees. Additional{" "}
                                    <a
                                        href="/us/baggage-fees"
                                        style={{ color: "#4863db" }}
                                        target="_blank"
                                    >
                                        baggage fees
                                    </a>{" "}
                                    may apply as per the airline(s) policies. Some of the flights
                                    results shown could either be for other dates or nearby
                                    airport(s).
                                </div>
                                <div className="covid-list visible-xs">
                                    <b>Note:</b> All the fares displayed are for
                                    <span id="covidAirlinemsg" style={{ display: "none" }}>
                                        Round Trip and are in USD, inclusive of base fare, taxes and
                                        service fees. Additional{" "}
                                        <a href="/us/baggage-fees" target="_blank">
                                            baggage fees
                                        </a>{" "}
                                        may apply as per the airline(s) policies. Some of the flights
                                        results shown could either be for other dates or nearby
                                        airport(s).
                                    </span>
                                    <a
                                        className="d-block"
                                        href="javascript:void(0);"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="covidAirlinemsg"
                                    >
                                        <u>
                                            <span className="showMore">Show</span>
                                            <i className="fa fa-angle-down" aria-hidden="true" />
                                        </u>
                                    </a>
                                </div>
                                <div className="listappliedfiltr hidden-xs">
                                    {appliedFilters.length > 0 && (
                                        <>
                                            <div style={{ float: "left" }}>
                                                <ul>
                                                    {appliedFilters.map((filter, index) => (
                                                        <li key={index}>
                                                            {filter.type}: {filter.value}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div style={{ float: "left", marginTop: 2, paddingLeft: 20 }}>
                                                <div className="filter-item filter_top_info">
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="clear-all-filters pull-right hidden-xs"
                                                        onClick={() => {
                                                            setStopFilter(null);
                                                            setActiveFlight(null);
                                                            setAppliedFilters([]);
                                                            setSelectedAirports([]);
                                                            setSelectedTimeFilter("");
                                                            setSelectedAirlines([]);
                                                        }}
                                                    >
                                                        Reset all
                                                    </a>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="clearfix" />

                                <div className="shorting-tab">
                                    <ul>
                                        <li
                                            id="all"
                                            className={activeTab === 'all' ? 'active' : ''}
                                            onClick={() => handleTabClick('all')}
                                        >
                                            <b>All Results</b>
                                            <br />
                                            <span id="spn_all_amount">${grandTotal}</span>
                                        </li>
                                        <li
                                            id="nearby"
                                            className={activeTab === 'nearby' ? 'active' : ''}
                                            onClick={() => handleTabClick('nearby')}
                                        >
                                            <b>Nearby Airport(s)</b>
                                            <br />
                                            <span id="spn_nearby_amount">${nearTotal}</span>
                                        </li>
                                        <li
                                            id="shortest"
                                            className={activeTab === 'shortest' ? 'active' : ''}
                                            onClick={() => handleTabClick('shortest')}
                                        >
                                            <b>Shortest Flights</b>
                                            <br />
                                            <span id="spn_shortest_amount">${shortestTotal}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Content Area */}
                                <div className="result-block sss901">
                                    <div className="row">
                                        <div className="col-md-12 col-xs-12 h-36">
                                            <div className="flexi-content hidden-xs">
                                                <span>
                                                    {activeTab === 'all'
                                                        ? 'All Results'
                                                        : activeTab === 'nearby'
                                                            ? 'Nearby Airports'
                                                            : activeTab === 'shortest'
                                                                ? 'Shortest Flights'
                                                                : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                    {activeTab === 'all' && filteredFlights.map((flight, index) => (
                                        <FlightCard
                                            key={index}
                                            setSelectedFlight={setSelectedFlight}
                                            setFlightDetailVisible={setFlightDetailVisible}
                                            flight={flight}
                                        />
                                    ))}


                                    {activeTab === 'nearby' && Array.isArray(nearbyAirports) && nearbyAirports.map((flight, index) => (
                                        <FlightCard
                                            key={index}
                                            setSelectedFlight={setSelectedFlight}
                                            setFlightDetailVisible={setFlightDetailVisible}
                                            flight={flight}
                                            oneway={oneway.toString()}
                                        />
                                    ))}


                                    {activeTab === 'shortest' && getShortestFlights().map((flight, index) => (
                                        <FlightCard
                                            key={index}
                                            setSelectedFlight={setSelectedFlight}
                                            setFlightDetailVisible={setFlightDetailVisible}
                                            flight={flight}
                                        />
                                    ))}
                                </div>

                                <div id="containerListing">
                                    <input
                                        type="hidden"
                                        name="hdn_DOB_ValidatingDate"
                                        id="hdn_DOB_ValidatingDate"
                                        defaultValue="Tue, Oct 22, 2024"
                                    />
                                    {/* <div className="flexi-content visible-xs">
                                        <span className="mobile_alternate hidden-sm hidden-lg hidden-md">
                                            Nearby Airports{" "}
                                        </span>
                                    </div> */}

                                    <input type="hidden" defaultValue={994} id="Pcount" />
                                    <input type="hidden" id="sort_all_amt" defaultValue="93.97" />
                                    <input type="hidden" id="sort_nearby_amt" defaultValue="93.97" />
                                    <input
                                        type="hidden"
                                        id="sort_flexible_amt"
                                        defaultValue="180.98"
                                    />
                                    <input
                                        type="hidden"
                                        id="sort_shortest_amt"
                                        defaultValue="278.97"
                                    />
                                    <div id="baggage-fees-popup" className="modal fade" role="dialog">
                                        <div className="modal-content">
                                            <div className="close_window">
                                                <button
                                                    type="button"
                                                    className="back_btn"
                                                    data-dismiss="modal"
                                                >
                                                    <span className="fa fa-angle-left" />
                                                </button>
                                                Baggage Fees
                                                <button
                                                    type="button"
                                                    className="close_btn"
                                                    data-dismiss="modal"
                                                >
                                                    X
                                                </button>
                                            </div>
                                            <div id="fltbaggage"></div>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="hidden"
                                    id="totalpage"
                                    name="totalpage"
                                    defaultValue={99}
                                />
                                <div
                                    className="load-more"
                                    style={{ cursor: "pointer" }}
                                    onclick="Filter.seemore();"
                                >
                                    More Result
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form
                    id="fltdetailspack"
                    name="fltdetailspack"
                    method="get"
                    target="_blank"
                ></form>
                <div className="trigger-wrapper" style={{ display: "none" }}>
                    <div className="trigger-searching">
                        <span className="close-btn" id="tiggerclose">
                            <img src="/us/images/trigger-mobile/close-icon.svg" />
                        </span>
                        <img
                            src="/us/images/trigger-mobile/user-icon.svg"
                            className="user-icon"
                        />
                        <div className="head">Book before fare goes up!</div>
                        <p className="con-txt">
                            <b>3729</b> people are currently searching for flights to <br />
                            Las Vegas
                        </p>
                    </div>
                    <div className="mobile-laover" />
                </div>
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n    .navbar-nav {\n        display: none;\n    }\n\n    .footer-component {\n        display: none;\n    }\n\n    .copyright-block {\n        border-top: 1px solid #ccc;\n        padding-top: 30px;\n    }\n\n    .airline-matrix-wrapper .slick-slider .slick-prev, .airline-matrix-wrapper .slick-slider .slick-next {\n        top: -15px;\n        background: #1b75bc;\n        border-radius: 100%;\n        border: 0;\n        width: 26px;\n        height: 26px;\n        right: -15px !important;\n    }\n\n    .airline-matrix-wrapper .slick-slider .slick-prev {\n        left: inherit;\n        right: 15px !important;\n    }\n@media (max-width: 479px) {\n        .navbar-toggle {\n            display: none;\n        }\n    }\n\t\n"
                    }}
                />
                <div
                    className="list-count"
                    id="session-expire-warning-modal"
                    style={{ display: "none" }}
                >
                    <div className="list-count-banner">
                        <div className="top-head">
                            <div className="timer-icon" align="center">
                                <i className="fa fa-clock-o" style={{ fontSize: 42 }} />
                            </div>
                        </div>
                        <br />
                        <div className="btm-txt txt2">
                            <p>
                                Flight Prices may change frequently owing to demand and
                                availability. Start a <b>New Search</b> / <b>Refresh Result</b> to
                                view the latest deals
                            </p>
                        </div>
                        <br />
                        <div className="call-btn">
                            <a
                                href="javascript:searchAgain('flight');"
                                id="refResult"
                                className="w200"
                            >
                                Refresh Result
                            </a>
                            <a href="/us" id="sess_startagain" className="w200">
                                Start Again
                            </a>
                        </div>
                    </div>
                    <div className="midum-overlay" id="fadebackground" />
                </div>
            </div>
            <meta
                name="facebook-domain-verification"
                content="5imwwusgl1opc9w2yonnk9u6mg5iui"
            />
            <noscript>
                &lt;img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=632219891608193&amp;amp;ev=PageView&amp;amp;noscript=1"&gt;
            </noscript>
            <meta name="shopperchecked-verify" content="40809906210170ba7b04d5447c9103" />
            <iframe
                allow="join-ad-interest-group"
                data-tagging-id="AW-765660137"
                data-load-time={1729083125520}
                height={0}
                width={0}
                src="https://td.doubleclick.net/td/rul/765660137?random=1729083125510&cv=11&fst=1729083125510&fmt=3&bg=ffffff&guid=ON&async=1&gtm=45je4ae0v867830889z8832256919za200zb832256919&gcd=13l3l3l3l1l1&dma=0&tag_exp=101686685&u_w=1600&u_h=900&url=https%3A%2F%2Fwww.lookbyfare.com%2Fus%2Flisting%2F3536_9e3fdd9ffa7c4144beeaf521031a82d0&ref=https%3A%2F%2Fwww.lookbyfare.com%2Fus%2Fflights%2Fsearching_new&hn=www.googleadservices.com&frm=0&tiba=Lookbyfare%20%7C%20Available%20Flights&npa=0&pscdl=noapi&auid=1417282342.1728790209&uaa=x86&uab=64&uafvl=Google%2520Chrome%3B129.0.6668.90%7CNot%253DA%253FBrand%3B8.0.0.0%7CChromium%3B129.0.6668.90&uamb=0&uam=&uap=Windows&uapv=15.0.0&uaw=0&fledge=1&data=event%3Dgtag.config%3Bcontent_group%3DSearch%20Listing"
                style={{ display: "none", visibility: "hidden" }}
            />
            {/* <iframe
                id="_hjSafeContext_83312697"
                title="_hjSafeContext"
                tabIndex={-1}
                aria-hidden="true"
                src="about:blank"
                style={{
                    display: "none !important",
                    width: "1px !important",
                    height: "1px !important",
                    opacity: "0 !important",
                    pointerEvents: "none !important"
                }}
            /> */}
            {/* <footer className="footer_block">
                <div className="footer__bottom">
                    <div className="container">
                        <div className="top_row">
                            <p className="copyright">
                                <img
                                    src="/us/images/footer/footer-icon.png"
                                    className="footer_icon"
                                    alt="footer-icon"
                                />{" "}
                                Copyright © 2019-2024 • A Red Diamond Affair LLC, 1 Meadowlands
                                Plaza Suite 200, East Rutherford, NJ 07073, USA
                            </p>
                            <ul className="social">
                                <li>
                                    <a
                                        href="https://www.facebook.com/Lookbyfareus/"
                                        target="_blank"
                                        title="Facebook"
                                    >
                                        <i className="fa fa-facebook" aria-hidden="true" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://twitter.com/lookbyfareus/"
                                        target="_blank"
                                        title="twitter"
                                    >
                                        <svg
                                            width={16}
                                            height={16}
                                            fill="currentColor"
                                            className="bi bi-twitter-x"
                                            viewBox="0 0 16 16"
                                            style={{ paddingTop: 2 }}
                                        >
                                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.instagram.com/lookbyfare_us/"
                                        target="_blank"
                                        title="instagram"
                                    >
                                        <i className="fa fa-instagram" aria-hidden="true" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="clearfix" />
                        <div className="visible-xs">
                            <div className="bottom-call-bar" style={{ bottom: 0 }}>
                                <div
                                    className="close_call_banner hand"
                                    style={{ float: "right", color: "#fff", padding: "0 5px" }}
                                >
                                    X
                                </div>
                                <a id="a_contactNo" className="tele" href="tel:+1-248-274-7239">
                                    <span className="call_btndiv">
                                        <img
                                            src="/us/images/uc/newcall.gif?123"
                                            alt="call"
                                            className="footer_call_icon"
                                        />
                                        <span className="call-text">
                                            Call &amp; Get Unpublished Flight Deals!
                                        </span>
                                        <span id="div_contactNo" className="phone">
                                            +1-248-274-7239
                                        </span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="secure__logo">
                            <ul>
                                <li>
                                    <img src="/us/images/footer/asta-logo.png" alt="asta-logo" />
                                </li>
                                <li>
                                    <img src="/us/images/footer/newlogo.png" alt="kogo" />
                                </li>
                                <li>
                                    <img src="/us/images/footer/godaddy-ssl.png" alt="godaddy ssl" />
                                </li>
                                <li>
                                    <img src="/us/images/footer/cloudfare.png" alt="cloudfare" />
                                </li>
                                <li>
                                    <img src="/us/images/footer/mac2.png" alt="mc2" />
                                </li>
                                <li>
                                    <a
                                        href="https://www.trustpilot.com/review/lookbyfare.com"
                                        target="_blank"
                                    >
                                        <img
                                            src="/us/images/footer/trustpilot-logo.png"
                                            alt="trustpilot-logo"
                                        />
                                    </a>
                                </li>
                                <li className="digicert-logo">
                                    <div id="DigiCertClickID_7dlUvcGZ">
                                        <div
                                            id="DigiCertClickID_7dlUvcGZSeal"
                                            style={{
                                                textDecoration: "none",
                                                textAlign: "center",
                                                display: "block",
                                                verticalAlign: "baseline",
                                                fontSize: "100%",
                                                fontStyle: "normal",
                                                textIndent: 0,
                                                lineHeight: 1,
                                                width: "auto",
                                                margin: "0px auto",
                                                padding: 0,
                                                border: 0,
                                                background: "transparent",
                                                position: "relative",
                                                inset: 0,
                                                clear: "both",
                                                float: "none",
                                                cursor: "default"
                                            }}
                                        >
                                            <object
                                                id="DigiCertClickID_7dlUvcGZ_object"
                                                type="image/svg+xml"
                                                data="//seal.digicert.com/seals/cascade/?tag=7dlUvcGZ&referer=www.lookbyfare.com&format=svg&an=min"
                                                role="link"
                                                style={{
                                                    textDecoration: "none",
                                                    textAlign: "center",
                                                    display: "none",
                                                    verticalAlign: "baseline",
                                                    fontSize: "100%",
                                                    fontStyle: "normal",
                                                    textIndent: 0,
                                                    lineHeight: 1,
                                                    width: "auto",
                                                    margin: "0px auto",
                                                    padding: 0,
                                                    border: 0,
                                                    background: "transparent",
                                                    position: "relative",
                                                    inset: 0,
                                                    clear: "both",
                                                    float: "none",
                                                    cursor: "pointer"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <style
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                ".digicert-logo object {width: 80px !important; vertical-align: middle !important;} .secure__logo li {vertical-align:middle; } @media screen and (max-width:480px){.digicert-logo object {width: 60px !important;}} "
                                        }}
                                    />
                                </li>
                                <li>
                                    <a
                                        onclick="window.open('https://www.lookbyfare.com/us/security-metrices-certificate.pdf?v5', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=900,height=600, screenX=100,screenY=50')"
                                        href="javascript: void(0)"
                                    >
                                        <img
                                            src="/us/images/footer/security-metrices-white.svg"
                                            alt="Security Metrices Certificate"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="discription__block">
                            <p>
                                Disclaimer- Lookbyfare is an independent travel portal. Its parent
                                company is A Red Diamond Affair LLC. The information that's
                                displayed on this website, www.lookbyfare.com, is for general
                                purposes. All the necessary steps have been taken to ensure that the
                                information displayed in the website is accurate and up- to-date.
                                However, under no circumstance, We do not provide any warranty or
                                representation, whether implied or expressed, when it comes to the
                                accuracy, completeness or reliability of the information displayed
                                on the website. If you need to have any queries answered, you can
                                write to us at
                                <a href="mailto:contact@onlineflightreservation.com">contact@onlineflightreservation.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer> */}
            <span className="visible-lg">
                <button id="scrollBottomtop" className="scroll-top" title="Go to top">
                    <svg
                        className="bi bi-arrow-up-short"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {" "}
                        <path
                            fillRule="evenodd"
                            d="M8 5.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"
                        />{" "}
                        <path
                            fillRule="evenodd"
                            d="M7.646 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 5.707 5.354 8.354a.5.5 0 1 1-.708-.708l3-3z"
                        />{" "}
                    </svg>
                </button>
            </span>
            <div className="cookies-strip hidden-xs" style={{}}>
                Our site uses cookies so we can provide you with the best possible web
                experience.{" "}
                <a href="/us/cookie-policy" id="cookies" target="_blank">
                    Click here
                </a>{" "}
                to learn more about how we use cookies.
                <span className="accept">Accept &amp; Continue</span>
            </div>
            <div id="someDivId">
                {" "}
                {/* login popup start */}
                <div className="login_popup" id="signIn" style={{ display: "none" }}>
                    <div className="popup_Box">
                        <div className="center-block">
                            <div className="outer">
                                <div className="inner">
                                    <div className="loginBox">
                                        <a
                                            href="javascript:void(0);"
                                            className="close"
                                            onclick="hideModal('signIn')"
                                        >
                                            <i className="fa fa-times" aria-hidden="true" />
                                        </a>
                                        <div className="left">
                                            <div className="title">
                                                Sign in and <br />
                                                stay one step ahead.
                                            </div>
                                            <ul>
                                                <li>Avail discounts exclusive to our registered users.</li>
                                                <li>Your saved information means faster booking.</li>
                                                <li>Stay updated on our latest offers.</li>
                                            </ul>
                                        </div>
                                        <div className="right">
                                            <div
                                                id="Messagelogin"
                                                style={{ display: "none" }}
                                                className="alert alert-danger"
                                            >
                                                You may have entered an unknown email address or an
                                                incorrect password
                                            </div>
                                            <h3>Sign in</h3>
                                            <a
                                                onclick="facebookLogin();"
                                                style={{ cursor: "pointer" }}
                                                className="facebook"
                                            >
                                                Facebook
                                            </a>
                                            <div className="g-signin2" id="gsign">
                                                Google
                                            </div>
                                            <span className="text">Or Sign in with</span>
                                            <div className="form-row">
                                                <input
                                                    type="text"
                                                    className="textbox"
                                                    name="loginUsername"
                                                    id="loginUsername"
                                                    placeholder="Email"
                                                    autoComplete="off"
                                                    onkeydown="removeloginvalid(this.id);"
                                                />
                                                <i className="fa fa-envelope-o icon" />
                                                <div className="error_text">Email is required</div>
                                                {/*<div class="error_text">Please provide a valid email address.</div>*/}
                                            </div>
                                            <div className="form-row">
                                                <input
                                                    type="password"
                                                    className="textbox"
                                                    name="loginPassword"
                                                    id="loginPassword"
                                                    autoComplete="off"
                                                    onkeydown="removeloginvalid(this.id);"
                                                    onkeypress="return isNumeric(event);"
                                                    maxLength={4}
                                                    placeholder="Pin"
                                                />
                                                <i className="fa fa-lock icon" />
                                                <div className="error_text">Pin is required</div>
                                            </div>
                                            <div className="form-row">
                                                {" "}
                                                <span className="pin-text">
                                                    Enter your 4 digit numeric pin
                                                </span>{" "}
                                            </div>
                                            <div className="form-row">
                                                {/*<button type="submit" class="button">Sign in</button>*/}
                                                <button
                                                    type="submit"
                                                    className="button pfsignin"
                                                    onclick="return login()"
                                                >
                                                    Sign in
                                                    <span
                                                        className="button_loding_div"
                                                        style={{ display: "none" }}
                                                    >
                                                        <i className="button_loader" />
                                                        processing
                                                    </span>
                                                </button>
                                                <a
                                                    href="javascript:void(0);"
                                                    onclick="showModalprofile('forgot_popup', 'signIn', 'firstScreen')"
                                                    className="forgot pull-right"
                                                >
                                                    Forgot Pin?
                                                </a>
                                            </div>
                                            <div className="form-row">
                                                <p className="register">
                                                    {" "}
                                                    <a
                                                        href="javascript:void(0);"
                                                        onclick="showModalprofile('singUp', 'signIn')"
                                                        className="text-green"
                                                    >
                                                        New here? Sign up
                                                    </a>{" "}
                                                    (it’s easy){" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*login popup end */}
                {/* Reset password popup start */}
                <div className="login_popup" id="forgot_popup" style={{ display: "none" }}>
                    <div className="popup_Box">
                        <div className="center-block">
                            <div className="outer">
                                <div className="inner">
                                    <div className="loginBox">
                                        <a
                                            href="javascript:void(0);"
                                            className="close"
                                            onclick="hideModal('forgot_popup')"
                                        >
                                            <i className="fa fa-times" aria-hidden="true" />
                                        </a>
                                        <div className="left reset_bg">
                                            <div className="title">Forgot Pin </div>
                                        </div>
                                        <div className="right">
                                            <div
                                                id="MessageForgot"
                                                style={{ display: "none" }}
                                                className="alert alert-danger"
                                            />
                                            <h3>Forgot Pin </h3>
                                            <div className="reset-screen1" id="firstScreen">
                                                <div className="form-row">
                                                    <input
                                                        type="text"
                                                        className="textbox"
                                                        id="forgotEmail"
                                                        name="forgotEmail"
                                                        autoComplete="off"
                                                        placeholder="Email"
                                                        onkeydown="removeloginvalid(this.id);"
                                                    />
                                                    <i className="fa fa-envelope-o icon" />
                                                    <div className="error_text">
                                                        Please enter your email address.
                                                    </div>
                                                    {/*<div class="error_text">Please provide a valid email address.</div>*/}
                                                </div>
                                                <div className="form-row">
                                                    <button
                                                        type="submit"
                                                        className="button"
                                                        onclick="return Forgort()"
                                                    >
                                                        Submit
                                                        <span
                                                            className="button_loding_div"
                                                            style={{ display: "none" }}
                                                        >
                                                            <i className="button_loader" />
                                                            processing
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="button grayBtn"
                                                        onclick="showModalprofile('signIn', 'forgot_popup', 'firstScreen')"
                                                    >
                                                        Back
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className="reset-screen2"
                                                id="secondScreen"
                                                style={{ display: "none" }}
                                            >
                                                <div className="form-row">
                                                    <input
                                                        type="password"
                                                        className="textbox"
                                                        onkeydown="removeloginvalid(this.id);"
                                                        autoComplete="off"
                                                        onkeypress="return isNumeric(event);"
                                                        maxLength={4}
                                                        placeholder="New Pin"
                                                    />
                                                    <i className="fa fa-lock icon" />
                                                    <div className="error_text">
                                                        Please enter your new pin.
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    {" "}
                                                    <span className="pin-text">
                                                        Set your new 4 digit numeric pin
                                                    </span>{" "}
                                                </div>
                                                <div className="form-row">
                                                    <input
                                                        type="password"
                                                        className="textbox"
                                                        onkeydown="removeloginvalid(this.id);"
                                                        autoComplete="off"
                                                        onkeypress="return isNumeric(event);"
                                                        maxLength={4}
                                                        placeholder="Confirm Pin"
                                                    />
                                                    <i className="fa fa-lock icon" />
                                                    <div className="error_text">
                                                        Please enter your confirm pin.
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <button
                                                        type="button"
                                                        className="button"
                                                        onclick="showScreen('thirdScreen','secondScreen')"
                                                    >
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className="reset-screen3"
                                                id="thirdScreen"
                                                style={{ display: "none" }}
                                            >
                                                <div className="msgSucessfull">
                                                    Your Pin has been
                                                    <br />
                                                    successfully changed !!
                                                    <br />
                                                    <button
                                                        type="submit"
                                                        className="button"
                                                        onclick="showModalprofile('signIn', 'forgot_popup')"
                                                    >
                                                        Sign IN Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Reset password popup end */}
                {/* Sign Up popup start */}
                <div className="login_popup" id="singUp" style={{ display: "none" }}>
                    <div className="popup_Box">
                        <div className="center-block">
                            <div className="outer">
                                <div className="inner">
                                    <div className="loginBox">
                                        <a
                                            href="javascript:void(0);"
                                            className="close"
                                            onclick="hideModal('singUp')"
                                        >
                                            <i className="fa fa-times" aria-hidden="true" />
                                        </a>
                                        <div className="left">
                                            <div className="title">
                                                Sign up and <br />
                                                stay one step ahead.
                                            </div>
                                            <ul>
                                                <li>Avail discounts exclusive to our registered users.</li>
                                                <li>Your saved information means faster booking.</li>
                                                <li>Stay updated on our latest offers.</li>
                                            </ul>
                                        </div>
                                        <div className="right">
                                            <div
                                                id="Message"
                                                style={{ display: "none" }}
                                                className="alert alert-danger"
                                            />
                                            <h3>Sign up</h3>
                                            <a
                                                onclick="facebookLogin();"
                                                style={{ cursor: "pointer" }}
                                                className="facebook"
                                            >
                                                Facebook
                                            </a>
                                            <div className="g-signin2" id="gsigup">
                                                Google
                                            </div>
                                            <div className="form-row">
                                                <input
                                                    type="text"
                                                    id="FirstName"
                                                    name="FirstName"
                                                    className="textbox"
                                                    onkeypress="return isCharOnly(event);"
                                                    placeholder="First name"
                                                    onkeydown="removeloginvalid(this.id);"
                                                    autoComplete="off"
                                                />
                                                <i className="fa fa-user-o icon" />
                                                <div className="error_text">First Name is required</div>
                                            </div>
                                            <div className="form-row">
                                                <input
                                                    type="text"
                                                    className="textbox"
                                                    id="LastName"
                                                    name="LastName"
                                                    onkeypress="return isCharOnly(event);"
                                                    placeholder="Last name"
                                                    onkeydown="removeloginvalid(this.id);"
                                                    autoComplete="off"
                                                />
                                                <i className="fa fa-user-o icon" />
                                                <div className="error_text">Last Name is required</div>
                                            </div>
                                            <div className="form-row">
                                                <input
                                                    type="text"
                                                    className="textbox"
                                                    id="UserName"
                                                    name="UserName"
                                                    placeholder="Email"
                                                    onkeydown="removeloginvalid(this.id);"
                                                    autoComplete="off"
                                                />
                                                <i className="fa fa-envelope-o icon" />
                                                <div className="error_text">Email is required</div>
                                            </div>
                                            <div className="form-row">
                                                <input
                                                    type="password"
                                                    className="textbox"
                                                    id="Password"
                                                    name="Password"
                                                    autoComplete="off"
                                                    onkeydown="removeloginvalid(this.id);"
                                                    onkeypress="return isNumeric(event);"
                                                    maxLength={4}
                                                    placeholder="Pin"
                                                />
                                                <i className="fa fa-lock icon" />
                                                <div className="error_text">pin is required</div>
                                            </div>
                                            <div className="form-row">
                                                {" "}
                                                <span className="pin-text">
                                                    Enter your 4 digit numeric pin
                                                </span>{" "}
                                            </div>
                                            <div className="form-row">
                                                <input
                                                    type="password"
                                                    className="textbox"
                                                    id="ConfirmPassword"
                                                    name="ConfirmPassword"
                                                    autoComplete="off"
                                                    onkeydown="removeloginvalid(this.id);"
                                                    onkeypress="return isNumeric(event);"
                                                    maxLength={4}
                                                    placeholder="Confirm Pin"
                                                />
                                                <i className="fa fa-lock icon" />
                                                <div className="error_text">Confirm pin is required</div>
                                            </div>
                                            <div className="form-row">
                                                <div className="terms">
                                                    {" "}
                                                    By signing up, I agree to Lookbyfare General{" "}
                                                    <a
                                                        href="/us/terms-conditions"
                                                        target="_blank"
                                                        className="text-green"
                                                    >
                                                        {" "}
                                                        Terms and Conditions
                                                    </a>{" "}
                                                    and{" "}
                                                    <a
                                                        className="text-green"
                                                        href="/us/privacy-policy"
                                                        target="_blank"
                                                    >
                                                        Privacy Policy
                                                    </a>
                                                    .
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <button
                                                    type="submit"
                                                    className="button pfsignup"
                                                    onclick="return CrearteProfile()"
                                                >
                                                    Sign UP
                                                    <span
                                                        className="button_loding_div"
                                                        style={{ display: "none" }}
                                                    >
                                                        <i className="button_loader" />
                                                        processing
                                                    </span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="button grayBtn"
                                                    onclick="showModalprofile('signIn', 'singUp')"
                                                >
                                                    Back
                                                </button>
                                                <span style={{ margin: 15, color: "red" }} id="Message" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sign Up popup end */}
                {/*sucessfull_message start here*/}
                <div className="sucessfull_message" style={{ display: "none" }}>
                    <i className="fa fa-check" aria-hidden="true" />{" "}
                    <span id="poupupMessage" />
                </div>
                {/*sucessfull_message end here*/}
                <style
                    dangerouslySetInnerHTML={{
                        __html: "\n    .error_text {\n        display: none;\n    }\n"
                    }}
                />
            </div>
            <div className="chat-option"></div>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n        @media (max-width: 767px) {\n            #launcher {\n                display: none !important;\n            }\n        }\n    "
                }}
            />
            <div
                id="batBeacon951972591631"
                style={{ width: 0, height: 0, display: "none", visibility: "hidden" }}
            >
                <img
                    id="batBeacon352886860669"
                    width={0}
                    height={0}
                    alt=""
                    src="https://bat.bing.com/action/0?ti=26029369&tm=gtm002&Ver=2&mid=8c52d943-188f-46ca-b6ec-2c257453772f&bo=1&sid=80a4ec20891311ef8239a96f0d239a14&vid=80a52f60891311efad1d854290b829e2&vids=0&msclkid=N&uach=pv%3D15.0.0&pi=918639831&lg=en-US&sw=1600&sh=900&sc=24&tl=Lookbyfare%20%7C%20Available%20Flights&p=https%3A%2F%2Fwww.lookbyfare.com%2Fus%2Flisting%2F3536_9e3fdd9ffa7c4144beeaf521031a82d0&r=https%3A%2F%2Fwww.lookbyfare.com%2Fus%2Fflights%2Fsearching_new&lt=10547&evt=pageLoad&sv=1&cdb=AQAQ&rn=95453"
                    style={{ width: 0, height: 0, display: "none", visibility: "hidden" }}
                />
            </div>
            <ul
                id="ui-id-1"
                tabIndex={0}
                className="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front"
                unselectable="on"
                style={{ display: "none" }}
            />
            <div
                role="status"
                aria-live="assertive"
                aria-relevant="additions"
                className="ui-helper-hidden-accessible"
            />
            <ul
                id="ui-id-2"
                tabIndex={0}
                className="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front"
                unselectable="on"
                style={{ display: "none" }}
            />
            <div
                role="status"
                aria-live="assertive"
                aria-relevant="additions"
                className="ui-helper-hidden-accessible"
            />
            <ul
                id="ui-id-3"
                tabIndex={0}
                className="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front"
                unselectable="on"
                style={{ display: "none" }}
            />
            <div
                role="status"
                aria-live="assertive"
                aria-relevant="additions"
                className="ui-helper-hidden-accessible"
            />
            <div
                id="ui-datepicker-div"
                className="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"
            />
            <div
                id="g_id_onload"
                data-client_id="203058158698-l0jmp4qerb7r7ugmcr3hp7uad3lbo589.apps.googleusercontent.com"
                data-callback="g_hCr"
            />
            <iframe
                data-product="web_widget"
                title="No content"
                role="presentation"
                tabIndex={-1}
                allow="microphone *"
                aria-hidden="true"
                src="about:blank"
                style={{
                    width: 0,
                    height: 0,
                    border: 0,
                    position: "absolute",
                    top: "-9999px"
                }}
            />
            <iframe
                id="ssIFrame_google"
                sandbox="allow-scripts allow-same-origin allow-storage-access-by-user-activation"
                allow="identity-credentials-get"
                aria-hidden="true"
                frame-border={0}
                src="https://accounts.google.com/o/oauth2/iframe#origin=https%3A%2F%2Fwww.lookbyfare.com&rpcToken=420585252.0855347"
                style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    inset: "-9999px",
                    display: "none"
                }}
            />
            <div>
                <iframe
                    title="Opens a widget where you can find more information"
                    id="launcher"
                    tabIndex={-1}
                    style={{
                        colorScheme: "light",
                        width: 108,
                        height: 50,
                        padding: 0,
                        margin: "10px 20px",
                        position: "fixed",
                        bottom: 30,
                        overflow: "visible",
                        opacity: 0,
                        border: 0,
                        zIndex: 999998,
                        transitionDuration: "250ms",
                        transitionTimingFunction: "cubic-bezier(0.645, 0.045, 0.355, 1)",
                        transitionProperty: "opacity, top, bottom",
                        top: "-9999px",
                        visibility: "hidden"
                    }}
                />
            </div>
            <div id="fb-root" className=" fb_reset">
                <div style={{ position: "absolute", top: "-10000px", width: 0, height: 0 }}>
                    <div />
                </div>
            </div>
        </>
    );
};

export default FlightListing;



