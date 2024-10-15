"use client"
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Flatpickr from 'react-flatpickr';
import { useRouter } from "next/navigation";
import 'flatpickr/dist/flatpickr.css';

const FlightSearch = ({ airline, selectedDes}) => {

    
    const router = useRouter();
    console.log(selectedDes,"Selected Dest");


    const [tripType, setTripType] = useState("One-Way");
    const [token, setToken] = useState("");

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

    // For Image Click
    const handleLocationFromImage = async (selectDes) => {
        try {

            // Fetch airports based on the location
            let response = await fetch(`https://api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${locationName}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            let result = await response.json();

            let options = result.data.map(a => ({
                label: `${a.iataCode} - ${a.name}, ${a.address.cityName}, ${a.address.countryCode}`,
                value: a.iataCode
            }));

            setDesAirportList(options);

            if (options.length > 0) {
                setDesInputValue(options[0].label);
                setDestination(options[0].label);
            }
        } catch (err) {
            console.log("Error fetching destination airports from URL location: ", err);
        }
    };

    useEffect(() => {
        handleLocationFromImage();
    });

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
        setOriginInputValue(newValue); // Update the local state with new input
        filterSourceAirportValue(newValue); // Fetch filtered airports based on new input

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

    return <>
        <form autocomplete="off" id="FlightForm" >
            <div className="searchBg">
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

                <div className="engine-bottom-txt">
                    <div className="row">
                        <div className="col-sm-3 col-sm-push-9">
                            <div className="text-right">
                                <button
                                    className="search-btn"
                                    onClick={handleSearchFlights}
                                    style={{ backgroundColor: "#E52B50" }}
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                    </div>
                    <span id="sameSearch" className="error-txt"></span>
                </div>
                <input type="hidden" id="hmpage" value="1" />
                <input
                    data-val="true"
                    data-val-number="The field Adults must be a number."
                    data-val-required="The Adults field is required."
                    id="Adults"
                    name="Adults"
                    type="hidden"
                    value="1"
                />
                <input
                    id="pageType"
                    name="pageType"
                    type="hidden"
                    value
                />
                <input id="pageID" name="pageID" type="hidden" value />
                <input
                    data-val="true"
                    data-val-number="The field Children must be a number."
                    data-val-required="The Children field is required."
                    id="Children"
                    name="Children"
                    type="hidden"
                    value="0"
                />
                <input
                    data-val="true"
                    data-val-number="The field InfantWs must be a number."
                    data-val-required="The InfantWs field is required."
                    id="InfantWs"
                    name="InfantWs"
                    type="hidden"
                    value="0"
                />
                <input
                    data-val="true"
                    data-val-number="The field Infants must be a number."
                    data-val-required="The Infants field is required."
                    id="Infants"
                    name="Infants"
                    type="hidden"
                    value="0"
                />
                <input
                    data-val="true"
                    data-val-required="The isFromAirline field is required."
                    id="isFromAirline"
                    name="isFromAirline"
                    type="hidden"
                    value="False"
                />
                <input
                    id="fromDateIn"
                    name="fromDateIn"
                    type="hidden"
                    value="2024"
                />
                <input
                    id="toDateIn"
                    name="toDateIn"
                    type="hidden"
                    value="2024"
                />
            </div>
        </form></>
}


export default FlightSearch;