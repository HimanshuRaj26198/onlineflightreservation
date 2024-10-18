"use client"
import { useParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import Flatpickr from 'react-flatpickr';
import { useRouter } from "next/navigation";
import 'flatpickr/dist/flatpickr.css';


const FlightSearchWrapper = () => {


    const [tripType, setTripType] = useState("One-Way");
    const [token, setToken] = useState("");

    const router = useRouter();

    // console.log(selectedDes,"Selected Dest");

    const [depDate, setDepDate] = useState(new Date());
    const [returnD, setReturnD] = useState(new Date());

    const [destination, setDestination] = useState("");
    const [origin, setOrigin] = useState("");

    const [originAirportList, setOriginAirportList] = useState([]);
    const [originInputValue, setOriginInputValue] = useState(null);
    const [desAirportList, setDesAirportList] = useState([]);
    const [desInputValue, setDesInputValue] = useState("");
    const [travellerDetail, setTravellerDetail] = useState({ adultCount: 1, childrenCount: 0, infanctCount: 0, cabinType: "ECONOMY" });
    const [adultCount, setAdultCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const [infanctCount, setInfantCount] = useState(0);
    const [infantOnSeatCount, setInfantOnSeatCount] = useState(0);
    const [cabinType, setCabinType] = useState("ECONOMY");

    const [showPax, setShowPax] = useState(false);

    const paxRef = useRef(null);

    const handleSearchFlights = (e) => {
        e.preventDefault();
        if (!destination) {
            toast.error("Select a destination airport.")
        } else if (!origin) {
            toast.error("Select a origin airport");
        } else if (!depDate) {
            toast.error("Select a departure date");
        } else if (tripType === "Round-Trip" && !returnD) {
            toast.error("Select a return date");
        } else {
            router.push(`/home/flights/flight?origin=${origin.value}&destination=${destination.value}&depDate=${depDate.toISOString().substring(0, 10)}&returnD=${returnD && returnD.toISOString(0, 10)}&adult=${travellerDetail.adultCount}&child=${travellerDetail.childrenCount}&infant=${travellerDetail.infanctCount}&cabin=${travellerDetail.cabinType}&airline=${airline || "all"}&tk=${token}`);
        }
    };

    const handleApplyFilter = (e) => {
        e.preventDefault();
        let filter = travellerDetail;
        filter.adultCount = adultCount;
        filter.childrenCount = childrenCount;
        filter.infanctCount = infanctCount + infantOnSeatCount;
        filter.cabinType = cabinType;
        setTravellerDetail(filter);
        setShowPax(false);
    }

    const handleCabinTypeChange = (event) => {
        setCabinType(event.target.value); // Update state with the selected value
    };

    const handleDepartureChange = (selectedDates) => {
        setDepDate(selectedDates[0]);
    };

    const handleReturnDateChange = (selectedDates) => {
        setReturnD(selectedDates[0]);
    }

    // for nearest location
    const fetchNearestAirports = async () => {
        try {
            // Get user's current location using Geolocation API
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                // Call the Amadeus API to get nearest airports based on current latitude and longitude
                let response = await fetch(`https://api.amadeus.com/v1/reference-data/locations/airports?latitude=${latitude}&longitude=${longitude}&radius=100&page%5Blimit%5D=10&sort=analytics.travelers.score`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                let result = await response.json();

                // Map the response to label and value format
                if (Array.isArray(result.data)) {
                    // Map the response to label and value format
                    let options = result.data.map(a => ({
                        label: `${a.iataCode} - ${a.name}, ${a.address.cityName}, ${a.address.countryCode}`,
                        value: a.iataCode
                    }));

                    // Set the nearest airport list
                    setOriginAirportList(options);

                    if (options.length > 0) {
                        setOriginInputValue(options[0].label); // Set the first airport as the default value
                        setOrigin(options[0].label);
                    }
                }
            },
                (error) => {
                    console.log("Error fetching geolocation: ", error);
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchNearestAirports();
    }, [token]);

    const filterSourceAirportValue = async () => {
        try {
            let response = await fetch(`https://api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${originInputValue}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            let result = await response.json()
            let options = result.data.map(a => { return { label: `${a.iataCode} - ${a.name}, ${a.address.cityName}, ${a.address.countryCode}`, value: a.iataCode } })
            setOriginAirportList(options);
        } catch (err) {
            console.log(err);
        }
    }

    const filterDesAirportValue = async () => {
        try {
            let response = await fetch(`https://api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${desInputValue}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            let result = await response.json()
            let options = result.data.map(a => { return { label: `${a.iataCode} - ${a.name}, ${a.address.cityName}, ${a.address.countryCode}`, value: a.iataCode } })
            setDesAirportList(options);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDesInputChange = (newValue) => {
        setDesInputValue(newValue);
        filterDesAirportValue(newValue);
    };

    const handleInputChange = (newValue) => {
        setOriginInputValue(newValue);
        filterSourceAirportValue(newValue);
    };

    const handleOriginChange = (selected) => {
        setOrigin(selected);
        setOriginInputValue(selected);
    }

    const handleDestinarionChange = (selected) => {
        setDestination(selected)
    }



    const fetchToken = async () => {
        let body = new URLSearchParams();
        body.append("grant_type", "client_credentials");
        body.append("client_id", "0fTkgg7u7lrqduKUEFx7v5Gnhey4ZG50");
        body.append("client_secret", "1kbdDxkhO4kMMH9p");
        try {
            const data = await fetch("https://api.amadeus.com/v1/security/oauth2/token",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: body.toString()
                });
            const json = await data.json();
            setToken(json.access_token)
            localStorage.setItem("typCknhbg", json.access_token);
        } catch (err) {
            console.log(err);
        }
    }

    const handleTripTypeSelection = (type) => {
        if (type === "One-Way") {
            setTripType("One-Way");
        }
        if (type === "Round-Trip") {
            setTripType("Round-Trip");
        }
    }

    useEffect(() => {
        fetchToken();
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        const defaultDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
        setReturnD(defaultDate);
    }, []);

    return (
        <>
            {/* <div className="expend_search" >
                <form
                    action="/us/flights/searching"
                    autoComplete="off"
                    id="FlightForm"
                    method="post"
                    target="_blank"
                    noValidate="novalidate"
                >
                    {" "}
                    <div className="modify-engine">
                        <div className="trip-type">
                            <ul>
                                <li>
                                    <div className="inputSet radio mt0">
                                        <input
                                            data-val="true"
                                            data-val-required="The SearchReturnFlight field is required."
                                            id="SearchReturnFlight"
                                            name="SearchReturnFlight"
                                            type="hidden"
                                            value="True"
                                        />
                                        <input
                                            id="TripType"
                                            name="TripType"
                                            type="hidden"
                                            value="2"
                                        />
                                        <label>
                                            <input
                                                checked={tripType === "Round-Trip" && true}
                                                id="2"
                                                name="TripType"
                                                onClick={() => handleTripTypeSelection("Round-Trip")}
                                                type="radio"
                                                value="2"
                                            />
                                            <span>Round Trip</span>
                                        </label>
                                    </div>
                                </li>
                                <li className="cff-list-tab">
                                    <div className="inputSet radio mt0">
                                        <label>
                                            <input
                                                id="1"
                                                name="TripType"
                                                onClick={() => handleTripTypeSelection("One-Way")}
                                                type="radio"
                                                value="1"
                                                checked={tripType === "One-Way" && true}
                                            />
                                            <span>One Way</span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                            <div className="clearfix"></div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="error-txt" id="sameSearchdup"></div>
                                <div className="row">
                                    <div className="col-sm-6 col-lg-3 ">
                                        <div className="input-city">
                                            <label className="form-label">Leaving from</label>
                                            <div className="relative">
                                                <img
                                                    src="/assets/images/location-icon.png"
                                                    className="input-icon"
                                                />
                                                <Select
                                                    className="textoverflow input_destination"
                                                    options={originAirportList}
                                                    placeholder="Leaving from"
                                                    onInputChange={handleInputChange}
                                                    inputValue={originInputValue}
                                                    onChange={handleOriginChange}
                                                />
                                                <span
                                                    className="field-validation-valid"
                                                    data-valmsg-for="origin"
                                                    data-valmsg-replace="true"
                                                ></span>
                                                <i
                                                    className="clear_field"
                                                    id="clrOrigin"
                                                    style={{ display: "none" }}
                                                    onclick="clrlocation('o');"
                                                ></i>
                                            </div>
                                        </div>
                                        <span id="sameSearch" className="error-txt"></span>
                                        <span
                                            className="swap_button"
                                            style={{ cursor: "pointer" }}
                                            onclick="swapDepRet()"
                                        >
                                            <i
                                                className="fa fa-exchange"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                    </div>
                                    <div className="col-sm-6 col-lg-3 ">
                                        <div className="input-city">
                                            <label className="form-label">Going to</label>
                                            <div className="relative">
                                                <img
                                                    src="/assets/images/location-icon.png"
                                                    className="input-icon"
                                                />
                                                <Select
                                                    className="textoverflow input_destination"
                                                    options={desAirportList}
                                                    placeholder="Going to"
                                                    value={destination}
                                                    inputValue={desInputValue}
                                                    onInputChange={handleDesInputChange}
                                                    onChange={handleDestinarionChange}
                                                />

                                                <span
                                                    className="field-validation-valid"
                                                    data-valmsg-for="destination"
                                                    data-valmsg-replace="true"
                                                ></span>
                                                <i
                                                    className="clear_field destination"
                                                    id="clrDestination"
                                                    style={{ display: "none" }}
                                                    onclick="clrlocation('d');"
                                                ></i>
                                            </div>
                                        </div>
                                        <span
                                            id="sameSearchDest"
                                            className="error-txt"
                                        ></span>
                                    </div>
                                    <input
                                        id="OriginAirport_AirportCode"
                                        name="OriginAirport.AirportCode"
                                        type="hidden"
                                        value
                                    />
                                    <input
                                        id="DestinationAirport_AirportCode"
                                        name="DestinationAirport.AirportCode"
                                        type="hidden"
                                        value
                                    />
                                    <div className="col-xs-12 col-sm-6  col-lg-3">
                                        <label className="form-label cal-label">
                                            Travel Dates
                                        </label>
                                        <div className="calender-txt calender-block">
                                            <span>
                                                <img
                                                    src="/assets/images/calender-icon.png"
                                                    className="input-icon cal-icon"
                                                />

                                                <Flatpickr
                                                    value={depDate}
                                                    onChange={handleDepartureChange}
                                                    options={{
                                                        dateFormat: 'Y-m-d',
                                                        minDate: "today",
                                                        disableMobile: true
                                                    }}
                                                    render={({ defaultValue, value, ...props }, ref) => {
                                                        return (
                                                            <input
                                                                {...props}
                                                                ref={ref}
                                                                className="hand"
                                                                type="text"
                                                                placeholder="Departure Date"
                                                            />
                                                        )
                                                    }}
                                                />
                                            </span>
                                            {tripType === "Round-Trip" && <span>
                                                <img
                                                    className="input-icon cal-icon retcal"
                                                    src="/assets/images/calender-icon.png"
                                                />
                                                <Flatpickr
                                                    value={returnD}
                                                    onChange={handleReturnDateChange}
                                                    options={{
                                                        dateFormat: 'Y-m-d',
                                                        minDate: "today",
                                                        disableMobile: true
                                                    }}
                                                    render={({ defaultValue, value, ...props }, ref) => {
                                                        return (<input
                                                            {...props}
                                                            ref={ref}
                                                            className="hand"
                                                            type="text"
                                                            placeholder="Return Date"
                                                        />)
                                                    }}
                                                />
                                            </span>}
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-6  col-lg-3">
                                        <div className="input-border traveler-fees-toggle pointer">
                                            <label className="form-label cal-label">
                                                Traveler(s), Cabin
                                            </label>
                                            <div className="relative drop-errow">
                                                <img
                                                    className="input-icon"
                                                    src="/assets/images/traveller-icon.png"
                                                />
                                                <input
                                                    type="text"
                                                    id="travelerOpen"
                                                    name="travelerOpen"
                                                    value={`${travellerDetail.adultCount} Traveller, ${travellerDetail.childrenCount ? travellerDetail.childrenCount + "Children," : ""} ${travellerDetail.infanctCount ? travellerDetail.infanctCount + "Infants," : ""} ${travellerDetail.cabinType && travellerDetail.cabinType} `}
                                                    onClick={() => { setShowPax((p) => !p) }}
                                                    readonly="readonly"
                                                    autocomplete="off"
                                                    className="hand"
                                                    ref={paxRef}
                                                />
                                            </div>
                                        </div>

                                        {showPax && <div
                                            id="selectpax"
                                            className="traveler-fees-slide traveller_block"
                                        >
                                            <a
                                                href=""
                                                className="popup-close"
                                            >
                                                <img src="/assets/images/uc/cancel.svg" alt />
                                            </a>
                                            <label className="traveller_label">Adult(s)</label>
                                            <ul className="adults">
                                                <li className={adultCount === 1 && "active"} onClick={() => setAdultCount(1)}  >1</li>
                                                <li className={adultCount === 2 && "active"} onClick={() => setAdultCount(2)} >2</li>
                                                <li className={adultCount === 3 && "active"} onClick={() => setAdultCount(3)} >3</li>
                                                <li className={adultCount === 4 && "active"} onClick={() => setAdultCount(4)} >4</li>
                                                <li className={adultCount === 5 && "active"} onClick={() => setAdultCount(5)} >5</li>
                                                <li className={adultCount === 6 && "active"} onClick={() => setAdultCount(6)} >6</li>
                                                <li className={adultCount === 7 && "active"} onClick={() => setAdultCount(7)} >7</li>
                                                <li className={adultCount === 8 && "active"} onClick={() => setAdultCount(8)} >8</li>
                                                <li className={adultCount === 9 && "active"} onClick={() => setAdultCount(9)} >9</li>
                                            </ul>
                                            <label className="traveller_label">
                                                Children (2-11 yrs)
                                            </label>
                                            <ul className="childs">
                                                <li className={childrenCount === 0 && "active"} onClick={() => setChildrenCount(0)} >0</li>
                                                <li className={childrenCount === 1 && "active"} onClick={() => setChildrenCount(1)}  >1</li>
                                                <li className={childrenCount === 2 && "active"} onClick={() => setChildrenCount(2)} >2</li>
                                                <li className={childrenCount === 3 && "active"} onClick={() => setChildrenCount(3)} >3</li>
                                                <li className={childrenCount === 4 && "active"} onClick={() => setChildrenCount(4)} >4</li>
                                                <li className={childrenCount === 5 && "active"} onClick={() => setChildrenCount(5)} >5</li>
                                                <li className={childrenCount === 6 && "active"} onClick={() => setChildrenCount(6)} >6</li>
                                                <li className={childrenCount === 7 && "active"} onClick={() => setChildrenCount(7)} >7</li>
                                                <li className={childrenCount === 8 && "active"} onClick={() => setChildrenCount(8)} >8</li>
                                            </ul>
                                            <div className="row_2">
                                                <div className="col-50">
                                                    <label className="traveller_label">
                                                        Infant (on lap)
                                                    </label>
                                                    <ul className="infonlap">
                                                        <li className={infanctCount === 0 && "active"} onClick={() => setInfantCount(0)}>0</li>
                                                        <li className={infanctCount === 1 && "active"} onClick={() => setInfantCount(1)} >1</li>
                                                        <li className={infanctCount === 2 && "active"} onClick={() => setInfantCount(2)} >2</li>
                                                        <li className={infanctCount === 3 && "active"} onClick={() => setInfantCount(3)} >3</li>
                                                        <li className={infanctCount === 4 && "active"} onClick={() => setInfantCount(4)} >4</li>
                                                    </ul>
                                                </div>
                                                <div className="col-50 space">
                                                    <label className="traveller_label">
                                                        Infant (on seat)
                                                    </label>
                                                    <ul className="infonseat">
                                                        <li className={infantOnSeatCount === 0 && "active"} onClick={() => setInfantOnSeatCount(0)} >0</li>
                                                        <li className={infantOnSeatCount === 1 && "active"} onClick={() => setInfantOnSeatCount(1)} >1</li>
                                                        <li className={infantOnSeatCount === 2 && "active"} onClick={() => setInfantOnSeatCount(2)} >2</li>
                                                        <li className={infantOnSeatCount === 3 && "active"} onClick={() => setInfantOnSeatCount(3)} >3</li>
                                                        <li className={infantOnSeatCount === 4 && "active"} onClick={() => setInfantOnSeatCount(4)} >4</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <label id="ermsg" className="error-txt"></label>
                                            <button onClick={handleApplyFilter} className="done_button done">
                                                Apply
                                            </button>
                                            <div className="class_block">
                                                <span className="traveller_label">Cabin</span>
                                                <div className="select-dropdown drop-errow">
                                                    <select id="CabinType" name="CabinType" value={cabinType} onChange={handleCabinTypeChange}>
                                                        <option selected="selected" value="ECONOMY">Economy</option>
                                                        <option value="Premium_Economy">PremiumEconomy</option>
                                                        <option value="BUSINESS">Business</option>
                                                        <option value="FIRST">First</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <span className="tooltip-custom minor-txt ">
                                                <u className="blue">Unaccompanied Minor</u>
                                                <div className="promo-detail">
                                                    <span className="arrow"></span>
                                                    <p
                                                        className="mb5px"
                                                        style={{ textAlign: "left" }}
                                                    >
                                                        Booking flights for an unaccompanied
                                                        minor? Some airlines have restrictions on
                                                        children under the age of 18 years
                                                        traveling alone. If you have any
                                                        questions, please
                                                        <a
                                                            href="/assets/contact-us.html"
                                                            target="_blank"
                                                        >
                                                            contact us
                                                        </a>
                                                        . Otherwise please include at least 1
                                                        adult then hit "Search"
                                                    </p>
                                                </div>
                                            </span>
                                        </div>}
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="modify-spacer" />
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="row">
                                    <div
                                        className="col-sm-6 col-md-4 hide"
                                        id="div_airline"
                                        name="div_airline"
                                    >
                                        <div className="input-city selectairline">
                                            <i
                                                className="fa fa-search input-icon"
                                                aria-hidden="true"
                                            />
                                            <input
                                                className="textoverflow ui-autocomplete-input"
                                                id="airlinecode"
                                                name="airlinecode"
                                                placeholder="Search Preferred Airline"
                                                type="text"
                                                defaultValue=""
                                                autoComplete="off"
                                            />
                                            <i
                                                className="clear_field selectairline-clear"
                                                id="clrAirline"
                                                style={{ display: "none" }}
                                                onclick="clrlocation('a');"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-md-3  hide">
                                        <div style={{ marginTop: 8 }} className="hidden-xs" />
                                        <div className="inputSet2">
                                            <label className="direct-flights ml40">
                                                <input
                                                    data-val="true"
                                                    data-val-required="The SearchDirectFlight field is required."
                                                    id="SearchDirectFlight"
                                                    name="SearchDirectFlight"
                                                    type="checkbox"
                                                    defaultValue="true"
                                                />
                                                <input
                                                    name="SearchDirectFlight"
                                                    type="hidden"
                                                    defaultValue="false"
                                                />{" "}
                                                <span>Direct Flights </span>
                                            </label>
                                        </div>
                                    </div>
                                    <input
                                        type="hidden"
                                        defaultValue="false"
                                        id="isDirectFlight"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4"></div>
                        </div>
                        <span id="sameSearch" className="error-txt" />
                    </div>
                </form>
            </div> */}
            <div className="modify-engine-wrapper">
                <a href="javascript:void(0);" className="close-sidebar fa fa-close" />
                <div className="holder">
                    <div className="modify-engine">
                        <div className="container">
                            <div
                                className="search_detail edit-listing-searchdetails hand"
                                style={{ display: "none" }}
                            >
                                <div className="row">
                                    <div className="">
                                        <button
                                            type="button"
                                            className="modify_search pull-right edit-listing-search"
                                        >
                                            Edit Search
                                        </button>
                                        <div className="col-sm-8">
                                            Burbank &nbsp;
                                            <b>
                                                {" "}
                                                <i className="fa fa-exchange" />{" "}
                                            </b>
                                            &nbsp; Las Vegas
                                            <br />
                                            Wed 23Oct
                                            <b>-</b> Thu 24Oct , 1 Traveler, Economy
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="expend_search" style={{}}>
                                <form
                                    action="/us/flights/searching"
                                    autoComplete="off"
                                    id="FlightForm"
                                    method="post"
                                    target="_blank"
                                    noValidate="novalidate"
                                >
                                    {" "}
                                    <div className="modify-engine">
                                        <div className="trip-type">
                                            <ul>
                                                <li>
                                                    <div className="inputSet radio-white radio mt0">
                                                        <input
                                                            data-val="true"
                                                            data-val-required="The SearchReturnFlight field is required."
                                                            id="SearchReturnFlight"
                                                            name="SearchReturnFlight"
                                                            type="hidden"
                                                            defaultValue="True"
                                                        />
                                                        <input
                                                            id="TripType"
                                                            name="TripType"
                                                            type="hidden"
                                                            defaultValue={2}
                                                        />
                                                        <label>
                                                            <input
                                                                defaultChecked="checked"
                                                                id={2}
                                                                name="TripType"
                                                                onclick="journeyChange('2')"
                                                                type="radio"
                                                                defaultValue={2}
                                                            />
                                                            <span>Round Trip</span>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="cff-list-tab">
                                                    <div className="inputSet radio-white radio mt0">
                                                        <label>
                                                            <input
                                                                id={1}
                                                                name="TripType"
                                                                onclick="journeyChange('1')"
                                                                type="radio"
                                                                defaultValue={1}
                                                            />
                                                            <span>One Way</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="clearfix" />
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <input
                                                    id="SearchReturnFlight"
                                                    name="SearchReturnFlight"
                                                    type="hidden"
                                                    defaultValue="True"
                                                />
                                                <input
                                                    id="userSearchId"
                                                    name="userSearchId"
                                                    type="hidden"
                                                    defaultValue="17052_129e057a1df74e46b4384fb23412e345"
                                                />
                                                <input
                                                    id="pageType"
                                                    name="pageType"
                                                    type="hidden"
                                                    defaultValue="SessionExpire"
                                                />
                                                <input
                                                    id="pageID"
                                                    name="pageID"
                                                    type="hidden"
                                                    defaultValue="home"
                                                />
                                                <input
                                                    id="TripType"
                                                    name="TripType"
                                                    type="hidden"
                                                    defaultValue={2}
                                                />
                                                <div className="column-2 pr-5">
                                                    <label>Leaving from</label>
                                                    <div className="relative">
                                                        <img
                                                            src="/us/images/location-icon.png"
                                                            className="input-icon"
                                                        />
                                                        <input
                                                            className="textoverflow input_origin ui-autocomplete-input"
                                                            data-val="true"
                                                            data-val-required="The origin field is required."
                                                            id="origin"
                                                            name="origin"
                                                            placeholder="Leaving from"
                                                            type="text"
                                                            defaultValue="BUR - Bob Hope Apt,Burbank,US"
                                                            autoComplete="off"
                                                        />
                                                        <span
                                                            className="field-validation-valid"
                                                            data-valmsg-for="origin"
                                                            data-valmsg-replace="true"
                                                        />
                                                        <i
                                                            className="clear_field"
                                                            id="clrOrigin"
                                                            onclick="clrlocation('o');"
                                                        />
                                                    </div>
                                                    <span
                                                        id="sameSearch"
                                                        className="column-2 pr-5 error-txt"
                                                        style={{ color: "#ffd800", clear: "both" }}
                                                    />
                                                    <span
                                                        className="swap_button"
                                                        style={{ cursor: "pointer" }}
                                                        onclick="swapDepRet()"
                                                    >
                                                        <i className="fa fa-exchange" aria-hidden="true" />
                                                    </span>
                                                </div>
                                                <div className="column-2 pr-5">
                                                    <label>Going to</label>
                                                    <div className="relative">
                                                        <img
                                                            src="/us/images/location-icon.png"
                                                            className="input-icon"
                                                        />
                                                        <input
                                                            className="textoverflow input_destination ui-autocomplete-input"
                                                            data-val="true"
                                                            data-val-required="The destination field is required."
                                                            id="destination"
                                                            name="destination"
                                                            placeholder="Going to"
                                                            type="text"
                                                            defaultValue="LAS - Las Vegas All Airports,Las Vegas,US"
                                                            autoComplete="off"
                                                        />
                                                        <span
                                                            className="field-validation-valid"
                                                            data-valmsg-for="destination"
                                                            data-valmsg-replace="true"
                                                        />
                                                        <i
                                                            className="clear_field destination"
                                                            id="clrDestination"
                                                            onclick="clrlocation('d');"
                                                        />
                                                    </div>
                                                    <span
                                                        id="sameSearchDest"
                                                        className="error-txt"
                                                        style={{ color: "#ffd800", clear: "both" }}
                                                    />
                                                </div>
                                                <div className="column-2 pr-5 calender-blc">
                                                    <label>Travel Dates</label>
                                                    <div className="calender-txt calender-block">
                                                        <span>
                                                            <img
                                                                src="/us/images/calender-icon.png"
                                                                className="input-icon cal-icon depart-cal"
                                                            />
                                                            <input
                                                                className="departDate hasDatepicker"
                                                                id="fromDateDisplay"
                                                                name="fromDateDisplay"
                                                                readOnly="readonly"
                                                                required="required"
                                                                type="text"
                                                                defaultValue="Oct 23, 2024"
                                                            />
                                                            <input
                                                                className="pl10"
                                                                data-val="true"
                                                                data-val-date="The field TravelDate must be a date."
                                                                data-val-required="The TravelDate field is required."
                                                                id="TravelDate"
                                                                name="TravelDate"
                                                                readOnly="readonly"
                                                                required="required"
                                                                type="hidden"
                                                                defaultValue="10/23/2024 12:00:00 AM"
                                                            />
                                                        </span>
                                                        <span>
                                                            <img
                                                                src="/us/images/calender-icon.png"
                                                                className="input-icon cal-icon retcal"
                                                            />
                                                            <input
                                                                className="returnDate hasDatepicker"
                                                                id="toDateDisplay"
                                                                name="toDateDisplay"
                                                                readOnly="readonly"
                                                                required="required"
                                                                type="text"
                                                                defaultValue="Oct 24, 2024"
                                                            />
                                                            <input
                                                                className="pl10"
                                                                data-val="true"
                                                                data-val-date="The field ReturnDate must be a date."
                                                                data-val-required="The ReturnDate field is required."
                                                                id="ReturnDate"
                                                                name="ReturnDate"
                                                                readOnly="readonly"
                                                                required="required"
                                                                type="hidden"
                                                                defaultValue="10/24/2024 12:00:00 AM"
                                                            />
                                                        </span>
                                                        <div className="cleafix" />
                                                    </div>
                                                </div>
                                                <input
                                                    id="OriginAirport_AirportCode"
                                                    name="OriginAirport.AirportCode"
                                                    type="hidden"
                                                    defaultValue="BUR"
                                                />
                                                <input
                                                    id="DestinationAirport_AirportCode"
                                                    name="DestinationAirport.AirportCode"
                                                    type="hidden"
                                                    defaultValue="LAS"
                                                />
                                                <div className="column-4 pr-5 position-static">
                                                    <div className="position-relative  ">
                                                        <label>Traveler(s), Cabin</label>
                                                        <div className="relative drop-errow">
                                                            <input
                                                                type="text"
                                                                id="travelerOpen"
                                                                defaultValue="1 Traveler, Economy"
                                                                readOnly="readonly"
                                                                autoComplete="off"
                                                                onclick="showpaxpopup();"
                                                                className="pl10 hand"
                                                            />
                                                        </div>
                                                        <div
                                                            id="selectpax"
                                                            className="traveler-fees-slide traveller_block"
                                                            style={{ display: "none" }}
                                                        >
                                                            <a href="javascript:void(0);" className="popup-close">
                                                                <img src="/us/images/uc/cancel.svg" alt="" />
                                                            </a>
                                                            <label className="traveller_label">Adult(s)</label>
                                                            <ul className="adults">
                                                                <li className="active">1</li>
                                                                <li>2</li>
                                                                <li>3</li>
                                                                <li>4</li>
                                                                <li>5</li>
                                                                <li>6</li>
                                                                <li>7</li>
                                                                <li>8</li>
                                                                <li>9</li>
                                                            </ul>
                                                            <label className="traveller_label">
                                                                Children (2-11 yrs)
                                                            </label>
                                                            <ul className="childs">
                                                                <li className="active">0</li>
                                                                <li>1</li>
                                                                <li>2</li>
                                                                <li>3</li>
                                                                <li>4</li>
                                                                <li>5</li>
                                                                <li>6</li>
                                                                <li>7</li>
                                                                <li>8</li>
                                                            </ul>
                                                            <div className="row">
                                                                <div className="col-50">
                                                                    <label className="traveller_label">
                                                                        Infant (on lap)
                                                                    </label>
                                                                    <ul className="infonlap">
                                                                        <li className="active">0</li>
                                                                        <li>1</li>
                                                                        <li>2</li>
                                                                        <li>3</li>
                                                                        <li>4</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col-50 space">
                                                                    <label className="traveller_label">
                                                                        Infant (on seat)
                                                                    </label>
                                                                    <ul className="infonseat">
                                                                        <li className="active">0</li>
                                                                        <li>1</li>
                                                                        <li>2</li>
                                                                        <li>3</li>
                                                                        <li>4</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="clearfix" />
                                                            <label id="ermsg" className="error-txt" />
                                                            <button type="button" className="done_button done">
                                                                Apply
                                                            </button>
                                                            <div className="class_block">
                                                                <span className="traveller_label">Cabin</span>
                                                                <div className="select-dropdown drop-errow">
                                                                    <select id="CabinType" name="CabinType">
                                                                        <option selected="selected" value="Economy">
                                                                            Economy
                                                                        </option>
                                                                        <option value="PremiumEconomy">
                                                                            PremiumEconomy
                                                                        </option>
                                                                        <option value="Business">Business</option>
                                                                        <option value="First">First</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="clearfix" />
                                                            <span className="tooltip-custom minor-txt ">
                                                                <u className="blue">Unaccompanied Minor</u>
                                                                <div className="promo-detail">
                                                                    <span className="arrow" />
                                                                    <p className="mb5px" style={{ textAlign: "left" }}>
                                                                        Booking flights for an unaccompanied minor? Some
                                                                        airlines have restrictions on children under the
                                                                        age of 18 years traveling alone. If you have any
                                                                        questions, please <br />
                                                                        <a href="/us/contact-us" target="_blank">
                                                                            contact us
                                                                        </a>
                                                                        . Otherwise please include at least 1 adult then
                                                                        hit "Search"
                                                                    </p>
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="search-btn"
                                                    onclick="return valid('false');"
                                                >
                                                    Search
                                                </button>
                                                <input
                                                    data-val="true"
                                                    data-val-number="The field Adults must be a number."
                                                    data-val-required="The Adults field is required."
                                                    id="Adults"
                                                    name="Adults"
                                                    type="hidden"
                                                    defaultValue={1}
                                                />
                                                <input
                                                    data-val="true"
                                                    data-val-number="The field Children must be a number."
                                                    data-val-required="The Children field is required."
                                                    id="Children"
                                                    name="Children"
                                                    type="hidden"
                                                    defaultValue={0}
                                                />
                                                <input
                                                    data-val="true"
                                                    data-val-number="The field InfantWs must be a number."
                                                    data-val-required="The InfantWs field is required."
                                                    id="InfantWs"
                                                    name="InfantWs"
                                                    type="hidden"
                                                    defaultValue={0}
                                                />
                                                <input
                                                    data-val="true"
                                                    data-val-number="The field Infants must be a number."
                                                    data-val-required="The Infants field is required."
                                                    id="Infants"
                                                    name="Infants"
                                                    type="hidden"
                                                    defaultValue={0}
                                                />
                                                <input
                                                    id="CabinType"
                                                    name="CabinType"
                                                    type="hidden"
                                                    defaultValue="Economy"
                                                />
                                                <input
                                                    data-val="true"
                                                    data-val-required="The isFromAirline field is required."
                                                    id="isFromAirline"
                                                    name="isFromAirline"
                                                    type="hidden"
                                                    defaultValue="True"
                                                />
                                                <input
                                                    id="searchCampaign"
                                                    name="searchCampaign"
                                                    type="hidden"
                                                    defaultValue=""
                                                />
                                                <input
                                                    id="searchContent"
                                                    name="searchContent"
                                                    type="hidden"
                                                    defaultValue=""
                                                />
                                                <input
                                                    id="searchMedium"
                                                    name="searchMedium"
                                                    type="hidden"
                                                    defaultValue=""
                                                />
                                                <input
                                                    id="sourceMedia"
                                                    name="sourceMedia"
                                                    type="hidden"
                                                    defaultValue=""
                                                />
                                                <input
                                                    id="fromDateIn"
                                                    name="fromDateIn"
                                                    type="hidden"
                                                    defaultValue={2024}
                                                />
                                                <input
                                                    id="toDateIn"
                                                    name="toDateIn"
                                                    type="hidden"
                                                    defaultValue={2024}
                                                />
                                            </div>
                                        </div>
                                        <div className="modify-spacer" />
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <div className="row">
                                                    <div
                                                        className="col-sm-6 col-md-4 hide"
                                                        id="div_airline"
                                                        name="div_airline"
                                                    >
                                                        <div className="input-city selectairline">
                                                            <i
                                                                className="fa fa-search input-icon"
                                                                aria-hidden="true"
                                                            />
                                                            <input
                                                                className="textoverflow ui-autocomplete-input"
                                                                id="airlinecode"
                                                                name="airlinecode"
                                                                placeholder="Search Preferred Airline"
                                                                type="text"
                                                                defaultValue=""
                                                                autoComplete="off"
                                                            />
                                                            <i
                                                                className="clear_field selectairline-clear"
                                                                id="clrAirline"
                                                                style={{ display: "none" }}
                                                                onclick="clrlocation('a');"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4 col-md-3  hide">
                                                        <div style={{ marginTop: 8 }} className="hidden-xs" />
                                                        <div className="inputSet2">
                                                            <label className="direct-flights ml40">
                                                                <input
                                                                    data-val="true"
                                                                    data-val-required="The SearchDirectFlight field is required."
                                                                    id="SearchDirectFlight"
                                                                    name="SearchDirectFlight"
                                                                    type="checkbox"
                                                                    defaultValue="true"
                                                                />
                                                                <input
                                                                    name="SearchDirectFlight"
                                                                    type="hidden"
                                                                    defaultValue="false"
                                                                />{" "}
                                                                <span>Direct Flights </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        defaultValue="false"
                                                        id="isDirectFlight"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-4"></div>
                                        </div>
                                        <span id="sameSearch" className="error-txt" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default FlightSearchWrapper;