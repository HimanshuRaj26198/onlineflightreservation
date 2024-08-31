"use client"
import FlightCard from "@/app/_components/FlightCard/page";
import FilterCarousel from "@/app/_components/SlickCrousel/page";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import airportsDB from "../../../../../lib/airports.json";
import airlines from "../../../../../lib/airlines.json";
import FlightDetail from "@/app/_components/FlightDetail/page";
import { motion } from 'framer-motion';
import Loading from "@/app/loading";
import OfferPopup from "@/app/_components/OfferPopup/page";



const FlightResultCompnent = () => {
    const router = useRouter();

    const [flightList, setFlightList] = useState([]);
    const [flightDetail, setFlightDetailVisible] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [mobileFilterVisible, setMobileFilterVisible] = useState(false);
    const [openedFilter, setOpenedFilter] = useState("Stops");
    const [filtersObj, setFiltersObj] = useState({ stops: 0 });
    const [offerPopupVisible, setOfferPopupVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const searchParam = useSearchParams();


    const variants = {
        hidden: { x: '100%', opacity: 0 }, // Start off-screen to the right
        visible: { x: 0, opacity: 1, transition: { ease: "easeOut", duration: 0.5 } },
        exit: { x: '100%', opacity: 0, transition: { ease: "easeIn", duration: 0.5 } }
    };

    // const sortByStop = () => {
    //     let sortByStop = flightList.sort((a, b) => {
    //         return b.stop - a.stop
    //     });

    //     console.log(sortByStop, "Sorted flights array");
    //     // setFlightList(sortByStop);
    // }

    const filterStops = (num) => {
        setFiltersObj(prevFiltersObj => ({
            ...prevFiltersObj,
            stops: prevFiltersObj.stops === num ? '' : num
        }));
    }

    const hideOfferPopup = () => {
        setOfferPopupVisible(false);
    }

    useEffect(() => {
        console.log(filtersObj);
    }, filtersObj);



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
            try {
                const response = await fetch("https://api.amadeus.com/v2/shopping/flight-offers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${searchParam.get("tk")}`
                    },
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
                if (FlightList.length <= 0) {
                    router.push("/home/no-results");
                } else {
                    setFlightList(FlightList);
                    setLoading(false);
                    let offerInterval = setInterval(() => {
                        if (!offerPopupVisible) {
                            setOfferPopupVisible(true);
                        }
                    }, 25000);
                }
            } catch (err) {
                router.push("/home/no-results");
            }
        }
        fetchFlightOffers();
    }, [])

    return <>
        {!offerPopupVisible && flightList && <div onClick={() => setOfferPopupVisible(true)} className="count-top-icon pointer uc-minimize-strip" id="reopen_ucb" bis_skin_checked="1">
            <div className="strip-content ng-binding" bis_skin_checked="1">
                <img src="/assets/images/uc/mob-call.gif" />
                <img className="tel-icon" src="/assets/images/uc/telephone-call.svg" />
                $  {flightList[0] && flightList[0].travelerPricings[0].price.total - 4}
                {/* <span className="Timer">00:14:16</span> */}
            </div>
        </div>}
        {offerPopupVisible && <OfferPopup hideOfferPopup={hideOfferPopup} flight={flightList[0]} />}
        {loading && <Loading />}
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
        <div className="body-content">
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
                                        <button
                                            type="button"
                                            className="modify_search pull-right edit-listing-search"
                                        >
                                            Edit Search
                                        </button>
                                        <div className="col-sm-8">
                                            Boston &nbsp;
                                            <b>
                                                {" "}
                                                <i
                                                    className="fa fa-long-arrow-right"
                                                    aria-hidden="true"
                                                />{" "}
                                            </b>
                                            &nbsp; Los Angeles
                                            <br />
                                            Thu 29Aug , 1 Traveler, Economy
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="expend_search" style={{ display: "none" }}>
                                <form
                                    autoComplete="off"
                                    id="FlightForm"
                                    method="post"
                                    target="_blank"
                                >
                                    <div className="modify-engine">
                                        <div className="trip-type">
                                            <a className="close-listing-search visible-lg visible-md">
                                                Close{/* */} [x]
                                            </a>
                                            <ul>
                                                <li>
                                                    <div className="inputSet radio-white radio mt0">
                                                        <input
                                                            data-val="true"
                                                            data-val-required="The SearchReturnFlight field is required."
                                                            id="SearchReturnFlight"
                                                            name="SearchReturnFlight"
                                                            type="hidden"
                                                            defaultValue="False"
                                                        />
                                                        <input
                                                            id="TripType"
                                                            name="TripType"
                                                            type="hidden"
                                                            defaultValue={1}
                                                        />
                                                        <label>
                                                            <input
                                                                defaultChecked="checked"
                                                                id={2}
                                                                name="TripType"
                                                                onClick="journeyChange('2')"
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
                                                                defaultChecked="checked"
                                                                id={1}
                                                                name="TripType"
                                                                onClick="journeyChange('1')"
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
                                                    defaultValue="False"
                                                />
                                                <input
                                                    id="userSearchId"
                                                    name="userSearchId"
                                                    type="hidden"
                                                    defaultValue="11882_1bf981885cf04e498f9404db71939fb4"
                                                />
                                                <input
                                                    id="pageType"
                                                    name="pageType"
                                                    type="hidden"
                                                    defaultValue="home"
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
                                                    defaultValue={1}
                                                />
                                                <div className="column-2 pr-5">
                                                    <label>Leaving from</label>
                                                    <div className="relative">
                                                        <img
                                                            src="/assets/images/location-icon.png"
                                                            className="input-icon"
                                                        />
                                                        <input
                                                            className="textoverflow input_origin"
                                                            data-val="true"
                                                            data-val-required="The origin field is required."
                                                            id="origin"
                                                            name="origin"
                                                            placeholder="Leaving from"
                                                            type="text"
                                                            defaultValue="BOS - Boston All Airports,Boston,Massachusetts,US"
                                                        />
                                                        <span
                                                            className="field-validation-valid"
                                                            data-valmsg-for="origin"
                                                            data-valmsg-replace="true"
                                                        />
                                                        <i
                                                            className="clear_field"
                                                            id="clrOrigin"
                                                            onClick="clrlocation('o');"
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
                                                        onClick="swapDepRet()"
                                                    >
                                                        <i className="fa fa-exchange" aria-hidden="true" />
                                                    </span>
                                                </div>
                                                <div className="column-2 pr-5">
                                                    <label>Going to</label>
                                                    <div className="relative">
                                                        <img
                                                            src="/assets/images/location-icon.png"
                                                            className="input-icon"
                                                        />
                                                        <input
                                                            className="textoverflow input_destination"
                                                            data-val="true"
                                                            data-val-required="The destination field is required."
                                                            id="destination"
                                                            name="destination"
                                                            placeholder="Going to"
                                                            type="text"
                                                            defaultValue="LAX - Los Angeles All Airports,Los Angeles,California,US"
                                                        />
                                                        <span
                                                            className="field-validation-valid"
                                                            data-valmsg-for="destination"
                                                            data-valmsg-replace="true"
                                                        />
                                                        <i
                                                            className="clear_field destination"
                                                            id="clrDestination"
                                                            onClick="clrlocation('d');"
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
                                                                src="/assets/images/calender-icon.png"
                                                                className="input-icon cal-icon depart-cal"
                                                            />
                                                            <input
                                                                className="departDate"
                                                                id="fromDateDisplay"
                                                                name="fromDateDisplay"
                                                                readOnly="readonly"
                                                                required="required"
                                                                type="text"
                                                                defaultValue="Aug 29, 2024"
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
                                                                defaultValue="8/29/2024 12:00:00 AM"
                                                            />
                                                        </span>
                                                        <span>
                                                            <img
                                                                src="/assets/images/calender-icon.png"
                                                                className="input-icon cal-icon retcal"
                                                            />
                                                            <input
                                                                className="returnDate"
                                                                id="toDateDisplay"
                                                                name="toDateDisplay"
                                                                readOnly="readonly"
                                                                required="required"
                                                                type="text"
                                                                defaultValue="Sep 01, 2024"
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
                                                                defaultValue="9/1/2024 7:48:34 AM"
                                                            />
                                                        </span>
                                                        <div className="cleafix" />
                                                    </div>
                                                </div>
                                                <input
                                                    id="OriginAirport_AirportCode"
                                                    name="OriginAirport.AirportCode"
                                                    type="hidden"
                                                    defaultValue="BOS"
                                                />
                                                <input
                                                    id="DestinationAirport_AirportCode"
                                                    name="DestinationAirport.AirportCode"
                                                    type="hidden"
                                                    defaultValue="LAX"
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
                                                                onClick="showpaxpopup();"
                                                                className="pl10 hand"
                                                            />
                                                        </div>
                                                        <div
                                                            id="selectpax"
                                                            className="traveler-fees-slide traveller_block"
                                                            style={{ display: "none" }}
                                                        >
                                                            <a href="javascript:void(0);" className="popup-close">
                                                                <img src="/assets/images/uc/cancel.svg" alt="" />
                                                            </a>
                                                            <label className="traveller_label">Adult(s)</label>
                                                            <ul className="adults">
                                                                <li>1</li>
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
                                                                <li>0</li>
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
                                                                        <li>0</li>
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
                                                                        <li>0</li>
                                                                        <li>1</li>
                                                                        <li>2</li>
                                                                        <li>3</li>
                                                                        <li>4</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="clearfix" />
                                                            <label id="ermsg" className="error-txt" />
                                                            <button className="done_button done">
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
                                                                    <p
                                                                        className="mb5px"
                                                                        style={{ textAlign: "left" }}
                                                                    >
                                                                        Booking flights for an unaccompanied minor? Some
                                                                        airlines have restrictions on children under the
                                                                        age of 18 years traveling alone. If you have any
                                                                        questions, please <br />
                                                                        <a href="/assets/contact-us" target="_blank">
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
                                                    onClick="return valid('false');"
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
                                                    defaultValue="False"
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
                                                    defaultValue="googlepmax"
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
                                                            />
                                                            <i
                                                                className="clear_field selectairline-clear"
                                                                id="clrAirline"
                                                                style={{ display: "none" }}
                                                                onClick="clrlocation('a');"
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
                                                                />
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
            <div className="mobile-header-fixed">
                <div className="mobile-itenery modifySearchMobile">
                    <div className="result-itenery">
                        <div className="row">
                            <div className="col-xs-12">
                                <a>
                                    <div className="modify-src-btn">
                                        <img src="/assets/images/svg/edit-icon.svg" alt="" />
                                    </div>
                                </a>
                                <div className="city-itenery">
                                    <div className="column">
                                        <p className="airportCode">BOS</p>
                                    </div>
                                    <div className="column">
                                        <div className="airporticon">
                                            <b>
                                                {" "}
                                                <i
                                                    className="fa fa-long-arrow-right"
                                                    aria-hidden="true"
                                                />{" "}
                                            </b>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <p className="airportCode">LAX</p>
                                    </div>
                                    <div className="clearfix" />
                                    <div className="itenery-date">
                                        Aug 29, 2024
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
                        className="filter_icon_mobile responsiveFilter_btn" onClick={() => setMobileFilterVisible(true)}
                        src="/assets/images/svg/filter-icon.svg"
                    />
                    <ul>
                        <li id="filter_strip_mobile_stops">
                            <a
                                onClick="Filter.filtertabactive('tab-1', 'stops');"
                                href="javascript:void(0);"
                            >
                                Stops
                            </a>
                            <span className="reset_filter" onClick="Filter.restFilter('stops')">
                                X
                            </span>
                        </li>
                        <li id="filter_strip_mobile_price">
                            <a
                                onClick="Filter.filtertabactive('tab-3', 'price');"
                                href="javascript:void(0);"
                            >
                                Price
                            </a>
                            <span className="reset_filter" onClick="Filter.restpricefilter('')">
                                X
                            </span>
                        </li>
                        <li id="filter_strip_mobile_airlines">
                            <a
                                onClick="Filter.filtertabactive('tab-5', 'airlines');"
                                href="javascript:void(0);"
                            >
                                {" "}
                                Airlines
                            </a>{" "}
                            <span className="reset_filter" onClick="Filter.restFilter('airline')">
                                X
                            </span>
                        </li>
                        <li id="filter_strip_mobile_time">
                            <a
                                onClick="Filter.filtertabactive('tab-4', 'time');"
                                href="javascript:void(0);"
                            >
                                Time
                            </a>{" "}
                            <span
                                className="reset_filter"
                                onClick="Filter.restmobdepretfilter('')"
                            >
                                X
                            </span>
                        </li>
                        <li id="filter_strip_mobile_airports">
                            <a
                                onClick="Filter.filtertabactive('tab-6', 'airports');"
                                href="javascript:void(0);"
                            >
                                Airports
                            </a>{" "}
                            <span
                                className="reset_filter"
                                onClick="Filter.restFilter('airports')"
                            >
                                X
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <loading>
                <div className="loader" style={{ position: "absolute", display: "none" }} />
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
                    <span id="loadermsg" style={{ fontSize: 12, color: "#ff7f00" }} />
                </div>
                <div className="midum-overlay" id="fadebackground" />
            </div>
            <div className="listing-wrapper">
                <div className="container">
                    <input type="hidden" id="tabvalue" name="tabvalue" defaultValue="all" />
                    <a
                        className="matrix_btn visible-sm hidden-xs"
                        role="button"
                        id="marixOption"
                        data-toggle="collapse"
                        onClick="matrixOpen();"
                        href="javascript:void(0);"
                        aria-expanded="true"
                        aria-controls="airlineMatrixblock"
                        style={{ marginLeft: 5 }}
                    >
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
                                                    style={{ display: "none" }}
                                                    onClick="Filter.resetAll()"
                                                >
                                                    Reset all
                                                </a>
                                                <i className="fa fa-filter" aria-hidden="true" /> Filter
                                                your result
                                            </h4>
                                            <p className="result-found">
                                                <span id="totalResults">572</span> Results Found{" "}
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
                                                    className="headstop"
                                                    style={{ display: "none" }}
                                                    onClick="Filter.restFilter('stops')"
                                                >
                                                    Reset
                                                </a>
                                                Stops
                                            </div>
                                            <div className="filter-data">
                                                <div className="inputSet stopset">
                                                    <label className="mode">
                                                        <span className="filter-price">$138.99</span>
                                                        <input
                                                            type="checkbox"
                                                            name="stops"
                                                            checked={filtersObj.stops === 0}
                                                            onChange={() => filterStops(0)}
                                                            defaultValue={0}
                                                        />
                                                        <span>Non Stop</span>
                                                    </label>
                                                </div>
                                                <div className="inputSet stopset">
                                                    <label className="mode">
                                                        <span className="filter-price">$101.48</span>
                                                        <input
                                                            type="checkbox"
                                                            name="stops"
                                                            onClick="Filter.applyFilter(false)"
                                                            defaultValue={1}
                                                        />
                                                        <span>1 Stop</span>
                                                    </label>
                                                </div>
                                                <div className="inputSet stopset">
                                                    <label className="mode">
                                                        <span className="filter-price">$338.50</span>
                                                        <input
                                                            type="checkbox"
                                                            name="stops"
                                                            onClick="Filter.applyFilter(false)"
                                                            defaultValue={2}
                                                        />
                                                        <span>2 Stops</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tab-3" className="filter-item tab-pane">
                                            <div className="head">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="headprice"
                                                    style={{ display: "none" }}
                                                    onClick="Filter.restpricefilter('price')"
                                                >
                                                    Reset
                                                </a>
                                                Price Range
                                            </div>
                                            <div className="filter-data">
                                                <p className="time-filter-data">
                                                    <span className="slider-range2 pull-right">$ 1235</span>
                                                    <span className="slider-range">$ 101</span>
                                                </p>
                                                <div className="price-slider-range" />
                                                <br />
                                            </div>
                                        </div>
                                        <div id="tab-4" className="filter-item tab-pane">
                                            <div className="head">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="headdeptime"
                                                    style={{ display: "none" }}
                                                    onClick="Filter.restdepfilter('deptime')"
                                                >
                                                    Reset
                                                </a>
                                                <i
                                                    className="fa fa-plane"
                                                    style={{ transform: "rotate(45deg)" }}
                                                />{" "}
                                                From Boston
                                            </div>
                                            <div className="filter-data mb20">
                                                <ul className="time_filter _deptimecontainer">
                                                    <li className="deptimefilter" filtervalue="em">
                                                        <img
                                                            src="/assets/images/listing/em.png"
                                                            id="mgem"
                                                            alt="early morning"
                                                        />
                                                        <strong>Early Morning</strong>
                                                        <div className="time">Before 6am </div>
                                                    </li>
                                                    <li className="deptimefilter" filtervalue="m">
                                                        <img
                                                            src="/assets/images/listing/m.png"
                                                            id="mgm"
                                                            alt="Morning"
                                                        />
                                                        <strong>Morning</strong>
                                                        <div className="time">6am - 12pm</div>
                                                    </li>
                                                    <li className="deptimefilter" filtervalue="a">
                                                        <img
                                                            src="/assets/images/listing/a.png"
                                                            id="mga"
                                                            alt="Afternoon"
                                                        />
                                                        <strong>Afternoon</strong>
                                                        <div className="time">12pm - 6pm</div>
                                                    </li>
                                                    <li className="deptimefilter" filtervalue="e">
                                                        <img
                                                            src="/assets/images/listing/e.png"
                                                            id="mge"
                                                            alt="Evening"
                                                        />
                                                        <strong>Evening</strong>
                                                        <div className="time">After 6pm</div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div id="tab-5" className="filter-item bdrR0 tab-pane">
                                            <div className="head">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="headairline"
                                                    style={{ display: "none" }}
                                                    onClick="Filter.restFilter('airline')"
                                                >
                                                    Reset
                                                </a>
                                                Airlines
                                            </div>
                                            <div className="filter-data">
                                                <div className="inputSet ">
                                                    <label className="mode">
                                                        <span className="filter-price">$101.48</span>
                                                        <input
                                                            type="checkbox"
                                                            name="airline"
                                                            onClick="Filter.applyFilter(false)"
                                                            airname="Spirit Airlines"
                                                            defaultValue="NK"
                                                        />
                                                        <span>Spirit Airlines</span>
                                                    </label>
                                                </div>
                                                <div className="inputSet ">
                                                    <label className="mode">
                                                        <span className="filter-price">$208.97</span>
                                                        <input
                                                            type="checkbox"
                                                            name="airline"
                                                            onClick="Filter.applyFilter(false)"
                                                            airname="Delta Airlines"
                                                            defaultValue="DL"
                                                        />
                                                        <span>Delta Airlines</span>
                                                    </label>
                                                </div>
                                                <div className="inputSet ">
                                                    <label className="mode">
                                                        <span className="filter-price">$613.98</span>
                                                        <input
                                                            type="checkbox"
                                                            name="airline"
                                                            onClick="Filter.applyFilter(false)"
                                                            airname="Delta Airlines with others"
                                                            defaultValue="DL_M"
                                                        />
                                                        <span>
                                                            Delta Airlines
                                                            <img src="/assets/images/listing/mal-blue.png" />
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="inputSet ">
                                                    <label className="mode">
                                                        <span className="filter-price">$240.84</span>
                                                        <input
                                                            type="checkbox"
                                                            name="airline"
                                                            onClick="Filter.applyFilter(false)"
                                                            airname="United Airlines"
                                                            defaultValue="UA"
                                                        />
                                                        <span>United Airlines</span>
                                                    </label>
                                                </div>
                                                <div className="inputSet moreairline">
                                                    <label className="mode">
                                                        <span className="filter-price">$661.98</span>
                                                        <input
                                                            type="checkbox"
                                                            name="airline"
                                                            onClick="Filter.applyFilter(false)"
                                                            airname="United Airlines with others"
                                                            defaultValue="UA_M"
                                                        />
                                                        <span>
                                                            United Airlines
                                                            <img src="/assets/images/listing/mal-blue.png" />
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="inputSet moreairline">
                                                    <label className="mode">
                                                        <span className="filter-price">$246.03</span>
                                                        <input
                                                            type="checkbox"
                                                            name="airline"
                                                            onClick="Filter.applyFilter(false)"
                                                            airname="Southwest Airlines"
                                                            defaultValue="WN"
                                                        />
                                                        <span>Southwest Airlines</span>
                                                    </label>
                                                </div>
                                                <div className="inputSet moreairline">
                                                    <label className="mode">
                                                        <span className="filter-price">$281.63</span>
                                                        <input
                                                            type="checkbox"
                                                            name="airline"
                                                            onClick="Filter.applyFilter(false)"
                                                            airname="Sun Country"
                                                            defaultValue="SY"
                                                        />
                                                        <span>Sun Country</span>
                                                    </label>
                                                </div>
                                                <div className="inputSet moreairline">
                                                    <label className="mode">
                                                        <span className="filter-price">$286.10</span>
                                                        <input
                                                            type="checkbox"
                                                            name="airline"
                                                            onClick="Filter.applyFilter(false)"
                                                            airname="Jetblue"
                                                            defaultValue="B6"
                                                        />
                                                        <span>Jetblue</span>
                                                    </label>
                                                </div>
                                                <div className="inputSet moreairline">
                                                    <label className="mode">
                                                        <span className="filter-price">$286.47</span>
                                                        <input
                                                            type="checkbox"
                                                            name="airline"
                                                            onClick="Filter.applyFilter(false)"
                                                            airname="American Airlines"
                                                            defaultValue="AA"
                                                        />
                                                        <span>American Airlines</span>
                                                    </label>
                                                </div>
                                                <div className="inputSet moreairline">
                                                    <label className="mode">
                                                        <span className="filter-price">$295.60</span>
                                                        <input
                                                            type="checkbox"
                                                            name="airline"
                                                            onClick="Filter.applyFilter(false)"
                                                            airname="Alaska Airlines"
                                                            defaultValue="AS"
                                                        />
                                                        <span>Alaska Airlines</span>
                                                    </label>
                                                </div>
                                                <div className="inputSet moreairline">
                                                    <label className="mode">
                                                        <span className="filter-price">$613.98</span>
                                                        <input
                                                            type="checkbox"
                                                            name="airline"
                                                            onClick="Filter.applyFilter(false)"
                                                            airname="Alaska Airlines with others"
                                                            defaultValue="AS_M"
                                                        />
                                                        <span>
                                                            Alaska Airlines
                                                            <img src="/assets/images/listing/mal-blue.png" />
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="clearfix" />
                                                <div className="show-more">
                                                    <a
                                                        href="javascript:void(0);"
                                                        id="moreair"
                                                        onClick="Filter.showMairline()"
                                                    >
                                                        More Airlines <i className="fa fa-angle-down" />
                                                    </a>
                                                </div>
                                                <div
                                                    className="multi-airline-icon"
                                                    style={{ display: "none", margin: "10px 0 0" }}
                                                >
                                                    <img src="/assets/images/listing/mal-blue.png" /> Indicate
                                                    Multiple Airline
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tab-6" className="filter-item tab-pane">
                                            <div className="head">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="headairport"
                                                    style={{ display: "none" }}
                                                    onClick="Filter.restFilter('airports')"
                                                >
                                                    Reset
                                                </a>
                                                <i
                                                    className="fa fa-plane"
                                                    style={{ transform: "rotate(45deg)" }}
                                                />
                                                <span>Departure airports</span>
                                            </div>
                                            <div className="filter-data">
                                                <div className="inputSet ">
                                                    <label className="mode">
                                                        <input
                                                            type="checkbox"
                                                            name="departureairports"
                                                            onClick="Filter.applyFilter(false)"
                                                            defaultValue="BOS"
                                                        />{" "}
                                                        <span>BOS (Edward L Logan International) </span>
                                                    </label>
                                                </div>
                                                <div className="inputSet ">
                                                    <label className="mode">
                                                        <input
                                                            type="checkbox"
                                                            name="departureairports"
                                                            onClick="Filter.applyFilter(false)"
                                                            defaultValue="PVD"
                                                        />{" "}
                                                        <span>PVD (T F Green State Apt) </span>
                                                    </label>
                                                </div>
                                                <div className="inputSet ">
                                                    <label className="mode">
                                                        <input
                                                            type="checkbox"
                                                            name="departureairports"
                                                            onClick="Filter.applyFilter(false)"
                                                            defaultValue="MHT"
                                                        />{" "}
                                                        <span>MHT (Manchester Boston Regional) </span>
                                                    </label>
                                                </div>
                                                <div className="clearfix" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mobile-button">
                                    <a
                                        href="javascript:void(0);"
                                        onClick="Filter.resetAll()"
                                        className="reset-all-filters"
                                    >
                                        Reset all Filter
                                    </a>
                                    <a href="javascript:void(0);" className="apply-filters">
                                        Close
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-9 col-xs-12">
                            {/* <div className="listing-matrix-section">
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
                                                                onClick="Filter.setmatrixstop(0);"
                                                                className="hand"
                                                            >
                                                                Non-Stop <i className="fa fa-caret-right" />
                                                            </li>
                                                            <li
                                                                onClick="Filter.setmatrixstop(3);"
                                                                className="hand"
                                                            >
                                                                1+ Stop <i className="fa fa-caret-right" />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="pl0 col-xs-9  col-sm-10 pr0">
                                                    <FilterCarousel />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="airline-matrix-mobile visible-xs"
                                        id="showMatrixInMobile"
                                    >
                                        <ul>
                                            <li
                                                className="head matrix_mobile"
                                                id="martix_mobile_head_NK_False"
                                                onClick="Filter.matrixFilter_mobile(0, 'NK', 0, 'False', '1', 0)"
                                            >
                                                <img
                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                    onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/nk.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/nk.gif';"
                                                />
                                                <b>$101.48</b>
                                            </li>
                                            <li
                                                className="head matrix_mobile"
                                                id="martix_mobile_head_DL_False"
                                                onClick="Filter.matrixFilter_mobile(0, 'DL', 0, 'False', '2', 0)"
                                            >
                                                <img
                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/dl.png"
                                                    onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/dl.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/dl.gif';"
                                                />
                                                <b>$208.97</b>
                                            </li>
                                            <li
                                                className="head matrix_mobile"
                                                id="martix_mobile_head_UA_False"
                                                onClick="Filter.matrixFilter_mobile(0, 'UA', 0, 'False', '3', 0)"
                                            >
                                                <img
                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/ua.png"
                                                    onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/ua.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/ua.gif';"
                                                />
                                                <b>$240.84</b>
                                            </li>
                                            <li
                                                className="head matrix_mobile"
                                                id="martix_mobile_head_WN_False"
                                                onClick="Filter.matrixFilter_mobile(0, 'WN', 0, 'False', '4', 0)"
                                            >
                                                <img
                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/wn.png"
                                                    onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/wn.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/wn.gif';"
                                                />
                                                <b>$246.03</b>
                                            </li>
                                            <li
                                                className="head matrix_mobile"
                                                id="martix_mobile_head_SY_False"
                                                onClick="Filter.matrixFilter_mobile(0, 'SY', 0, 'False', '5', 0)"
                                            >
                                                <img
                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/sy.png"
                                                    onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/sy.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/sy.gif';"
                                                />
                                                <b>$281.63</b>
                                            </li>
                                            <li
                                                className="head matrix_mobile"
                                                id="martix_mobile_head_B6_False"
                                                onClick="Filter.matrixFilter_mobile(0, 'B6', 0, 'False', '6', 0)"
                                            >
                                                <img
                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/b6.png"
                                                    onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/b6.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/b6.gif';"
                                                />
                                                <b>$286.10</b>
                                            </li>
                                            <li
                                                className="head matrix_mobile"
                                                id="martix_mobile_head_AA_False"
                                                onClick="Filter.matrixFilter_mobile(0, 'AA', 0, 'False', '7', 0)"
                                            >
                                                <img
                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/aa.png"
                                                    onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/aa.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/aa.gif';"
                                                />
                                                <b>$286.47</b>
                                            </li>
                                            <li
                                                className="head matrix_mobile"
                                                id="martix_mobile_head_AS_False"
                                                onClick="Filter.matrixFilter_mobile(0, 'AS', 0, 'False', '8', 0)"
                                            >
                                                <img
                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/as.png"
                                                    onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/as.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/as.gif';"
                                                />
                                                <b>$295.60</b>
                                            </li>
                                            <li
                                                className="head matrix_mobile"
                                                id="martix_mobile_head_DL_True"
                                                onClick="Filter.matrixFilter_mobile(0, 'DL', 0, 'True', '9', 0)"
                                            >
                                                <img
                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/dl.png"
                                                    onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/dl.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/dl.gif';"
                                                />
                                                <span className="matrixstops">
                                                    <img src="/assets/images/mal.png" />
                                                </span>
                                                <b>$613.98</b>
                                            </li>
                                            <li
                                                className="head matrix_mobile"
                                                id="martix_mobile_head_AS_True"
                                                onClick="Filter.matrixFilter_mobile(0, 'AS', 0, 'True', '10', 0)"
                                            >
                                                <img
                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/as.png"
                                                    onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/as.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/as.gif';"
                                                />
                                                <span className="matrixstops">
                                                    <img src="/assets/images/mal.png" />
                                                </span>
                                                <b>$613.98</b>
                                            </li>
                                            <li
                                                className="head matrix_mobile"
                                                id="martix_mobile_head_UA_True"
                                                onClick="Filter.matrixFilter_mobile(0, 'UA', 0, 'True', '11', 0)"
                                            >
                                                <img
                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/ua.png"
                                                    onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/ua.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/ua.gif';"
                                                />
                                                <span className="matrixstops">
                                                    <img src="/assets/images/mal.png" />
                                                </span>
                                                <b>$661.98</b>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="matrix_bottom_row">
                                    <div
                                        className="multi-airline-icon hidden-xs"
                                        style={{ display: "none" }}
                                    >
                                        <img src="/assets/images/listing/mal-blue.png" /> Indicate Multiple
                                        Airline
                                    </div>
                                </div>
                            </div> */}
                            <div className="covid-list hidden-xs">
                                <b>Note:</b> All the fares displayed are for One Way Trip and are in
                                USD, inclusive of base fare, taxes and service fees. Additional{" "}
                                <a
                                    href="/assets/baggage-fees"
                                    style={{ color: "#4863db" }}
                                    target="_blank"
                                >
                                    baggage fees
                                </a>{" "}
                                may apply as per the airline(s) policies. Some of the flights
                                results shown could either be for other dates or nearby airport(s).
                            </div>
                            <div className="covid-list visible-xs">
                                <b>Note:</b> All the fares displayed are for
                                <span id="covidAirlinemsg" style={{ display: "none" }}>
                                    One Way Trip and are in USD, inclusive of base fare, taxes and
                                    service fees. Additional{" "}
                                    <a href="/assets/baggage-fees" target="_blank">
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
                                <div style={{ float: "left" }}>
                                    <ul></ul>
                                </div>
                                <div style={{ float: "left" }}>
                                    <div
                                        className="filter-item filter_top_info"
                                        style={{ marginTop: 2, paddingLeft: 20 }}
                                    >
                                        <a
                                            href="javascript:void(0);"
                                            className="clear-all-filters pull-right hidden-xs"
                                            style={{ display: "none" }}
                                            onClick="Filter.resetAll()"
                                        >
                                            Reset all
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix" />
                            {/* <div className="shorting-tab">
                                <ul>
                                    <li
                                        id="all"
                                        className="active"
                                        onClick="Filter.showtab(this.id);"
                                    >
                                        <b>All Results</b>
                                        <br />
                                        <span id="spn_all_amount">$101.48</span>
                                    </li>
                                    <li id="nearby" onClick="Filter.showtab(this.id);">
                                        <b>Nearby Airport(s)</b>
                                        <br />
                                        <span id="spn_nearby_amount">$208.97</span>
                                    </li>
                                    <li id="flexible" onClick="Filter.showtab(this.id);">
                                        <b>Alternate Dates</b>
                                        <br />
                                        <span id="spn_flexible_amount">$101.48</span>
                                    </li>
                                    <li id="shortest" onClick={sortByStop}>
                                        <b>Shortest Flights</b>
                                        <br />
                                        <span id="spn_shortest_amount">$325.99</span>
                                    </li>
                                </ul>
                            </div> */}
                            <div id="containerListing">
                                <input
                                    type="hidden"
                                    name="hdn_DOB_ValidatingDate"
                                    id="hdn_DOB_ValidatingDate"
                                    defaultValue="Fri, Aug 30, 2024"
                                />
                                {/* <div className="flexi-content visible-xs">
                                    <span className="mobile_alternate hidden-sm hidden-lg hidden-md">
                                        Alternate Date{" "}
                                    </span>
                                </div> */}
                                {flightList && flightList.map(a => {

                                    return <FlightCard setSelectedFlight={setSelectedFlight} setFlightDetailVisible={setFlightDetailVisible} flight={a} />

                                })}
                                <input type="hidden" defaultValue={572} id="Pcount" />
                                <input type="hidden" id="sort_all_amt" defaultValue="101.48" />
                                <input type="hidden" id="sort_nearby_amt" defaultValue="208.97" />
                                <input type="hidden" id="sort_flexible_amt" defaultValue="101.48" />
                                <input type="hidden" id="sort_shortest_amt" defaultValue="325.99" />
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
                                defaultValue={57}
                            />
                            <div
                                className="load-more"
                                style={{ cursor: "pointer" }}
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
                        <img src="/assets/images/trigger-mobile/close-icon.svg" />
                    </span>
                    <img
                        src="/assets/images/trigger-mobile/user-icon.svg"
                        className="user-icon"
                    />
                    <div className="head">Book before fare goes up!</div>
                    <p className="con-txt">
                        <b>4515</b> people are currently searching for flights to <br />
                        Los Angeles
                    </p>
                </div>
                <div className="mobile-laover" />
            </div>
            {/* <style
                // dangerouslySetInnerHTML={{
                //     __html:
                //         "\n            .navbar-nav {\n                display: none;\n            }\n\n            .footer-component {\n                display: none;\n            }\n\n            .copyright-block {\n                border-top: 1px solid #ccc;\n                padding-top: 30px;\n            }\n\n            .airline-matrix-wrapper .slick-slider .slick-prev,\n            .airline-matrix-wrapper .slick-slider .slick-next {\n                top: -15px;\n                background: #1b75bc;\n                border-radius: 100%;\n                border: 0;\n                width: 26px;\n                height: 26px;\n                right: -15px !important;\n            }\n\n            .airline-matrix-wrapper .slick-slider .slick-prev {\n                left: inherit;\n                right: 15px !important;\n            }\n\n            @media (max-width: 479px) {\n                .navbar-toggle {\n                    display: none;\n                }\n            }\n        "
                // }}
            /> */}
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
                            Flight Prices may change frequently owing to demand and availability.
                            Start a <b>New Search</b> / <b>Refresh Result</b> to view the latest
                            deals
                        </p>
                    </div>
                    <br />
                    <div className="call-btn">
                        <a
                            href=""
                            id="refResult"
                            className="w200"
                        >
                            Refresh Result
                        </a>
                        <a href="/assets" id="sess_startagain" className="w200">
                            Start Again
                        </a>
                    </div>
                </div>
                <div className="midum-overlay" id="fadebackground" />
            </div>
        </div>

        {/* <script src="/assets/scripts/custom-profile.js?v=69.2.7006"></script>
        <script src="/assets/scripts/every000where.js?v=69.2.7006"></script>
        <script src="/assets/scripts/offersjs.js?v=69.2.7006"></script> */}
    </>
}

export default FlightResultCompnent;    