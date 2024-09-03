"use client"

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

const PurchasePage = () => {
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [travellerDetails, setTravellerDetails] = useState({});
    const [flightDetailVisible, setFlightDetailVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [formedFilled, setFormFilled] = useState(false);
    const emailRef = useRef("");
    const phoneRef = useRef("");
    const alternateNumRef = useRef("");
    const [travellerCount, setTravellerCount] = useState({
        "adults": {
            "count": 0,
            "perAdult": 0
        },
        "child": {
            "count": 0,
            "perChild": 0
        },
        "infant": {
            "count": 0,
            "perInfant": 0
        },
        "totalPrice": 0
    });

    const handleCustomerDetailCollection = (e) => {
        e.preventDefault();
        if (emailRef.current.value === "" && phoneRef.current.value === "") {
            toast.error("Please fill the billing details first!")
        } else if (emailRef.current.value === "") {
            toast.error("Please add email first!")
        } else if (phoneRef === "") {
            toast.error("Please add the phone first!")
        } else {
            let contactFormData = new FormData();
            contactFormData.append("Email", emailRef.current.value);
            contactFormData.append("Mobile", phoneRef.current.value);
            contactFormData.append("AlternateMobile", alternateNumRef.current.value);
            fetch("https://script.google.com/macros/s/AKfycbwVmb-Fq-ph0V-Buszfxf-iww-DuyO7M7s7APz-3-yNsDeXO3XWQCG3-djqs9kJ1X1CdA/exec",
                {
                    method: "POST",
                    body: contactFormData
                }
            ).then(res => console.log(res), setFormFilled(true)).catch(err => console.log(err));
        }

    }

    // Function to handle the scroll event
    const handleScroll = () => {
        const s = window.scrollY || window.pageYOffset;
        const d = document.documentElement.scrollHeight || document.body.scrollHeight;
        const c = window.innerHeight;
        const scrollPercent = (s / (d - c)) * 100;

        if (scrollPercent >= 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    function summarizeTravelers(travelers) {
        // Initialize counters and totals
        const counts = {
            adults: { count: 0, total: 0 },
            child: { count: 0, total: 0 },
            infant: { count: 0, total: 0 }
        };

        // Iterate over each traveler
        travelers.forEach(traveler => {
            // Extract the traveler type and price information
            const { travelerType, price } = traveler;
            const totalPrice = parseFloat(price.total);

            // Update counts and totals based on traveler type
            if (travelerType === 'ADULT') {
                counts.adults.count += 1;
                counts.adults.total += totalPrice;
            } else if (travelerType === 'CHILD') {
                counts.child.count += 1;
                counts.child.total += totalPrice;
            } else if (travelerType === 'INFANT') {
                counts.infant.count += 1;
                counts.infant.total += totalPrice;
            }
        });

        // Calculate rates for each category
        const calculateRate = (total, count) => count > 0 ? (total / count).toFixed(2) : '0.00';

        const adultsRate = calculateRate(counts.adults.total, counts.adults.count);
        const childRate = calculateRate(counts.child.total, counts.child.count);
        const infantRate = calculateRate(counts.infant.total, counts.infant.count);

        // Calculate total price
        const totalPrice = counts.adults.total + counts.child.total + counts.infant.total;

        // Return the summary object
        return {
            adults: { count: counts.adults.count, rate: parseFloat(adultsRate) },
            child: { count: counts.child.count, rate: parseFloat(childRate) },
            infant: { count: counts.infant.count, rate: parseFloat(infantRate) },
            totalPrice: totalPrice.toFixed(2)
        };
    }


    useEffect(() => {
        if (window) {
            window.addEventListener('scroll', handleScroll);
            // Clean up the event listener on component unmount
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [])

    function calculateLayoverTime(flightOffer) {
        const itineraries = flightOffer.itineraries;
        const layovers = [];

        itineraries.forEach(itinerary => {
            const segments = itinerary.segments;
            for (let i = 0; i < segments.length - 1; i++) {
                const arrivalTime = new Date(segments[i].arrival.at);
                const departureTime = new Date(segments[i + 1].departure.at);

                const layoverDuration = (departureTime - arrivalTime) / 60000; // Duration in minutes

                layovers.push({
                    layover_duration: layoverDuration, // in minutes
                    layover: layoverDuration > 0,
                    itineraries: {
                        layover_time: `${Math.floor(layoverDuration / 60)}H ${layoverDuration % 60}M`
                    }
                });
            }
        });

        return layovers;
    }

    const getFormattedDate = (date) => {
        let newDate = new Date(date)
        if (!isNaN(newDate)) {
            const formattedDate = newDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            return formattedDate;
        } else {
            console.log("Not a valid date");
        }
    };
    const getTimeFromDate = (date, fullhours) => {
        let newDate = new Date(date);

        // Get hours and minutes
        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';

        if (fullhours) {
            // Add leading zero to minutes if needed
            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            // Add leading zero to hours if needed
            if (hours < 10) {
                hours = '0' + hours;
            }
            return `${hours}:${minutes}`;
        } else {
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return { hours: `${hours}:${minutes}`, ampm: `${ampm}` }
        }

    };

    function extractDuration(ptString) {
        // Define a regular expression to match hours and minutes
        const regex = /PT(\d+H)?(\d+M)?/;

        // Use the regex to extract hours and minutes
        const matches = ptString.match(regex);

        // Initialize hours and minutes
        let hours = '';
        let minutes = '';

        if (matches) {
            // Extract hours if present
            if (matches[1]) {
                hours = matches[1].replace('H', '') + 'H';
            }

            // Extract minutes if present
            if (matches[2]) {
                minutes = matches[2].replace('M', '') + 'M';
            }
        }

        // Return the formatted duration as "XH YM"
        return `${hours} ${minutes || '00M'}`.trim();
    }

    useEffect(() => {
        try {
            console.log(JSON.parse(localStorage.getItem("selectedflight")), "selectedflight");
            setSelectedFlight(JSON.parse(localStorage.getItem("selectedflight")));
            setTravellerDetails(JSON.parse(localStorage.getItem("travellerDetails")));
            setTravellerCount(summarizeTravelers(JSON.parse(localStorage.getItem("selectedflight")).travelerPricings));
            console.log(summarizeTravelers(JSON.parse(localStorage.getItem("selectedflight")).travelerPricings), "SUMMARIZED")
        } catch (e) {
            console.log(e);
        }
    }, [])

    const printEvent = (e) => {
        console.log(e.target)
    };
    return <>
        {selectedFlight && <div className="body-content" bis_skin_checked="1">
            <div className="payment-wrapper kaxsdc" data-event="load" bis_skin_checked={1}>
                <div className="container" bis_skin_checked={1}>
                    <div className="row" bis_skin_checked={1}>
                        <div className="col-sm-2 col-xs-12" bis_skin_checked={1}>
                            <div className="go-button" bis_skin_checked={1}>
                                <a href={""} onclick="gotolisting()">
                                    <i className="fa fa-angle-left" aria-hidden="true" /> Change Flight
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-10 hidden-xs" bis_skin_checked={1}>
                            <ul className="secure_payment">
                                <li>
                                    <span>
                                        <img src="/assets/images/payment/secure.png" alt="" /> Secure <br />
                                        Payment System
                                    </span>
                                </li>
                                <li>
                                    <span className="easy">
                                        <img src="/assets/images/payment/essy-booking.png" alt="" /> Easy
                                        <br /> Booking
                                    </span>
                                </li>
                                <li>
                                    <span className="certified">
                                        <img src="/assets/images/payment/certified.png" alt="" /> Certified
                                        <br />
                                        Travel Portal
                                    </span>
                                </li>
                                <li className="last">
                                    <span className="certified">
                                        <img src="/assets/images/payment/essy-booking.png" alt="" /> Focused
                                        on <br />
                                        Quality Services
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <input type="hidden" defaultValue={1} id="totalPax" />
                    <form
                        action="/assets/flights/prebooked"
                        autoComplete="off"
                        id="fltpaymentform"
                        method="post"
                    >

                        <input type="hidden" id="isUprgadeAvail" />
                        <input
                            id="flightBookingRequest_userSessionID"
                            name="flightBookingRequest.userSessionID"
                            type="hidden"
                            defaultValue="16991_ee7d79c2968541e8ba92dabd0aca43b4"
                        />
                        <input
                            data-val="true"
                            data-val-number="The field oldPriceForTF must be a number."
                            data-val-required="The oldPriceForTF field is required."
                            id="flightBookingRequest_oldPriceForTF"
                            name="flightBookingRequest.oldPriceForTF"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            data-val="true"
                            data-val-number="The field IsSoldOut must be a number."
                            data-val-required="The IsSoldOut field is required."
                            id="flightBookingRequest_IsSoldOut"
                            name="flightBookingRequest.IsSoldOut"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            id="flightBookingRequest_NearBy"
                            name="flightBookingRequest.NearBy"
                            type="hidden"
                            defaultValue="no"
                        />
                        <input
                            id="flightBookingRequest_FlexSearch"
                            name="flightBookingRequest.FlexSearch"
                            type="hidden"
                            defaultValue="no"
                        />
                        <input
                            id="flightBookingRequest_KountSessionID"
                            name="flightBookingRequest.KountSessionID"
                            type="hidden"
                            defaultValue="3404b72840944f078d9c44bdf7a21cb1"
                        />
                        <input
                            id="flightBookingRequest_img_val"
                            name="flightBookingRequest.img_val"
                            type="hidden"
                            defaultValue=""
                        />
                        <input
                            id="flightBookingRequest_bagSellPosposition"
                            name="flightBookingRequest.bagSellPosposition"
                            type="hidden"
                            defaultValue=""
                        />
                        <input
                            id="flightBookingRequest_ResponseUniqueKey"
                            name="flightBookingRequest.ResponseUniqueKey"
                            type="hidden"
                            defaultValue="1601141000blrhydai591t31aug20241435hyddelai418t31aug20241735290824010823222d612344cc4eba8271f1003bea675c"
                        />
                        <input
                            data-val="true"
                            data-val-number="The field SeatMinprice must be a number."
                            data-val-required="The SeatMinprice field is required."
                            id="flightBookingRequest_SeatMinprice"
                            name="flightBookingRequest.SeatMinprice"
                            type="hidden"
                            defaultValue=""
                        />
                        <input
                            data-val="true"
                            data-val-number="The field baggNO must be a number."
                            data-val-required="The baggNO field is required."
                            id="flightBookingRequest_baggNO"
                            name="flightBookingRequest.baggNO"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            data-val="true"
                            data-val-number="The field baggNI must be a number."
                            data-val-required="The baggNI field is required."
                            id="flightBookingRequest_baggNI"
                            name="flightBookingRequest.baggNI"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            data-val="true"
                            data-val-number="The field baggNCO must be a number."
                            data-val-required="The baggNCO field is required."
                            id="flightBookingRequest_baggNCO"
                            name="flightBookingRequest.baggNCO"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            data-val="true"
                            data-val-number="The field baggNCI must be a number."
                            data-val-required="The baggNCI field is required."
                            id="flightBookingRequest_baggNCI"
                            name="flightBookingRequest.baggNCI"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            data-val="true"
                            data-val-number="The field BaggagePrice must be a number."
                            data-val-required="The BaggagePrice field is required."
                            id="flightBookingRequest_BaggagePrice"
                            name="flightBookingRequest.BaggagePrice"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            id="flightBookingRequest_flightid"
                            name="flightBookingRequest.flightid"
                            type="hidden"
                            defaultValue="sss913"
                        />
                        <input
                            name="__RequestVerificationToken"
                            type="hidden"
                            defaultValue="1B6vOSriZWuwEaKPhz7PAuYPpCykp2q52mH61yCbTOiLHzOMmMzWd9oGy7aD899vmtcTDCn3TWVg6Dit1lztPeZQ9Cy8KP7VKyPvHlhY5tk1"
                        />
                        <input type="hidden" id="customValuesAffirm" name="customValuesAffirm" />
                        <input type="hidden" id="airline_selected" defaultValue="AI" />
                        <input type="hidden" id="sourceMedia" defaultValue="googlepmax" />
                        <input
                            type="hidden"
                            id="_todaydate"
                            name="_todaydate"
                            defaultValue="08/22/2024"
                        />
                        <div className="row" bis_skin_checked={1}>
                            <div
                                className="col-xs-12  col-lg-3 col-lg-push-9"
                                id="add_block"
                                bis_skin_checked={1}
                            ></div>
                            <div
                                className="col-xs-12 col-md-12 col-sm-12 col-lg-9 col-lg-pull-3 validateinput"
                                id="fltBookingDetails"
                                bis_skin_checked={1}
                            >
                                <div id="div_Itinerary" className="step1" bis_skin_checked={1}>
                                    <div className="payment_itinary" bis_skin_checked={1}>
                                        <div className="row" bis_skin_checked={1}>
                                            <div className="col-sm-12" bis_skin_checked={1}>
                                                <div className="mainheading" bis_skin_checked={1}>
                                                    <img
                                                        src="/assets/images/svg/p-flight-summary.svg"
                                                        className="icon flightdetail"
                                                    />
                                                    Flight Summary
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="hidden"
                                            name="hdn_DOB_ValidatingDate"
                                            id="hdn_DOB_ValidatingDate"
                                            defaultValue="Sat, Aug 31, 2024"
                                        />
                                        <div
                                            className="flexi-content visible-xs"
                                            bis_skin_checked={1}
                                        ></div>
                                        <div className="result-block sss913" bis_skin_checked={1}>
                                            <div className="row" bis_skin_checked={1}>
                                                <div className="col-md-6 col-xs-12" bis_skin_checked={1}>
                                                    <div
                                                        className="flexi-content hidden-xs"
                                                        bis_skin_checked={1}
                                                    ></div>
                                                </div>
                                                <div
                                                    className="col-md-6 col-xs-12 text-right"
                                                    bis_skin_checked={1}
                                                >
                                                    <div
                                                        className="easy-free-cancellation"
                                                        bis_skin_checked={1}
                                                    >
                                                        <i className="fa fa-check" aria-hidden="true" /> Easy
                                                        Cancelation within 24 hours.
                                                        <span className="tooltip-custom">
                                                            <i
                                                                className="fa fa-info hand"
                                                                style={{ color: "#fff", borderColor: "#fff" }}
                                                            />
                                                            <div className="promo-detail" bis_skin_checked={1}>
                                                                <span className="arrow" />
                                                                <p>
                                                                    Easy cancelation within 24 hours for a fee by
                                                                    calling our 24x7 support team.
                                                                </p>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="position-relative" bis_skin_checked={1}>
                                                <div
                                                    className="row clickflightdetail"
                                                    onclick=""
                                                    bis_skin_checked={1}
                                                >
                                                    <div
                                                        className="col-sm-10 col-xs-12 col-sm-12"
                                                        id="fltlst"
                                                        bis_skin_checked={1}
                                                    >
                                                        <div className="depart-flight" bis_skin_checked={1}>
                                                            <a className="xs-dis-blck" href={""}>
                                                                <div className="row" bis_skin_checked={1}>
                                                                    <div
                                                                        className="col-sm-3 col-xs-12 no-padding-left"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <div
                                                                            className="airline-detail"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <span className="price-section visible-xs">
                                                                                <price>
                                                                                    ${selectedFlight.price.base}
                                                                                    <div
                                                                                        className="per-adult"
                                                                                        bis_skin_checked={1}
                                                                                    >
                                                                                        (per adult)
                                                                                    </div>
                                                                                </price>
                                                                            </span>
                                                                            <img
                                                                                src={selectedFlight.itineraries[0].segments[0].airline.logo}
                                                                                onError="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/ai.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/ai.png';"
                                                                            />
                                                                            <div className="name" bis_skin_checked={1}>
                                                                                Air India
                                                                                <span className="tooltip-custom">
                                                                                    <div
                                                                                        className="promo-detail"
                                                                                        bis_skin_checked={1}
                                                                                    >
                                                                                        <span className="arrow" />
                                                                                        <p className="mb5px">
                                                                                            359 AIRBUS INDUSTRIE A350-900 JET
                                                                                            314-475 STD Seats
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-sm-7 col-xs-12"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <div className="flex-date " bis_skin_checked={1}>
                                                                            {getFormattedDate(selectedFlight.itineraries[0].segments[0].departure.at)}
                                                                        </div>
                                                                        <div className="leg-details" bis_skin_checked={1}>
                                                                            <div
                                                                                className="city text-right"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div className="time" bis_skin_checked={1}>
                                                                                    <strong>{getTimeFromDate(selectedFlight.itineraries[0].segments[0].departure.at, false).hours}</strong> {getTimeFromDate(selectedFlight.itineraries[0].segments[0].departure.at, false).ampm}
                                                                                </div>
                                                                                <div className="code" bis_skin_checked={1}>
                                                                                    <span className=" tooltip-custom minor-txt">
                                                                                        {selectedFlight.itineraries[0].segments[0].departure.iataCode}
                                                                                        <div
                                                                                            className="promo-detail"
                                                                                            bis_skin_checked={1}
                                                                                        >
                                                                                            <span className="arrow" />
                                                                                            <p
                                                                                                className="mb5px"
                                                                                                style={{ textAlign: "left" }}
                                                                                            >
                                                                                                {selectedFlight.itineraries[0].segments[0].departure.airport.name}
                                                                                            </p>
                                                                                        </div>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="connnecting-block"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <div
                                                                                className="leg-points"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div
                                                                                    className="tooltip-custom"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <span className="visible-xs layovertimemob">
                                                                                        <span
                                                                                            style={{ width: "auto" }}
                                                                                            className="fa fa-clock-o"
                                                                                        />
                                                                                        {extractDuration(selectedFlight.itineraries[0].duration)}
                                                                                    </span>
                                                                                    {calculateLayoverTime(selectedFlight).length > 0 && <span>
                                                                                        <div
                                                                                            className="layovertime hidden-xs"
                                                                                            bis_skin_checked={1}
                                                                                        >
                                                                                            1<span>h</span> 50<span>m</span>
                                                                                        </div>
                                                                                        <i />
                                                                                        <div
                                                                                            className="destination_code"
                                                                                            bis_skin_checked={1}
                                                                                        >

                                                                                            <b>HYD</b>
                                                                                        </div>
                                                                                    </span>}
                                                                                    <div
                                                                                        className="promo-detail"
                                                                                        bis_skin_checked={1}
                                                                                    >
                                                                                        <p>
                                                                                            <strong>Flight Duration: </strong>{extractDuration(selectedFlight.itineraries[0].duration)}
                                                                                        </p>
                                                                                        <p>
                                                                                            <strong>Layover 1:</strong> 1h 50m,
                                                                                            Rajiv Gandhi International
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="leg-details" bis_skin_checked={1}>
                                                                            <div className="city" bis_skin_checked={1}>
                                                                                <div className="time" bis_skin_checked={1}>
                                                                                    <strong>{getTimeFromDate(selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.at, false).hours}</strong> {getTimeFromDate(selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.at, false).ampm}
                                                                                    <sup />
                                                                                </div>
                                                                                <div className="code" bis_skin_checked={1}>
                                                                                    <span className="  tooltip-custom minor-txt">
                                                                                        {selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.iataCode}
                                                                                        <div
                                                                                            className="promo-detail"
                                                                                            bis_skin_checked={1}
                                                                                        >
                                                                                            <span className="arrow" />
                                                                                            <p
                                                                                                className="mb5px"
                                                                                                style={{ textAlign: "left" }}
                                                                                            >
                                                                                                Indira Gandhi International New Delhi
                                                                                            </p>
                                                                                        </div>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-sm-2 col-xs-12 p0px hidden-xs"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <div
                                                                            className="trip-time"
                                                                            style={{
                                                                                fontSize: 12,
                                                                                width: 80,
                                                                                paddingTop: 20,
                                                                                color: "#333"
                                                                            }}
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={12}
                                                                                height={12}
                                                                                fill="currentColor"
                                                                                className="bi bi-clock"
                                                                                viewBox="0 0 16 16"
                                                                                style={{ verticalAlign: "middle" }}
                                                                            >
                                                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                                                            </svg>
                                                                            {extractDuration(selectedFlight.itineraries[0].duration)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                id="flight_detail_payment"
                                                className="row"
                                                bis_skin_checked={1}
                                            >
                                                <div className="col-sm-9 col-xs-7" bis_skin_checked={1}></div>
                                                <div className="col-sm-3 col-xs-5" bis_skin_checked={1}>
                                                    <div className="flight-details-btn" bis_skin_checked={1}>
                                                        <a
                                                            style={{ zIndex: 5 }}
                                                            onClick={() => { return setFlightDetailVisible((prev => !prev)) }}
                                                        >
                                                            Flight Details
                                                            <i className="fa fa-angle-down sss606 arr-down" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            {flightDetailVisible && <div
                                                id="flight-details"
                                                className="flight-details"
                                                bis_skin_checked={1}
                                            >
                                                <div className="flight-leg-info" bis_skin_checked={1}>
                                                    <div
                                                        className="detail-head visible-xs"
                                                        bis_skin_checked={1}
                                                    >
                                                        <a
                                                            className="close-btn visible-xs"
                                                            data-toggle="collapse"
                                                            onclick="handleToggleFilterspdtl()"
                                                        >
                                                            X
                                                        </a>
                                                        Flight Details
                                                    </div>
                                                    <ul className="flight-leg-tab" role="tablist">
                                                        <li role="presentation" className="active">
                                                            <a
                                                                href="#departuresss913"
                                                                aria-controls="Departure"
                                                                role="tab"
                                                                data-toggle="tab"
                                                            >
                                                                Departure
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content" bis_skin_checked={1}>
                                                        <div
                                                            role="tabpanel"
                                                            className="tab-pane active"
                                                            id="departuresss913"
                                                            bis_skin_checked={1}
                                                        >
                                                            {
                                                                selectedFlight.itineraries[0].segments.map((a, i) => {
                                                                    return <> <div className="flight-details-segment" bis_skin_checked={1}>
                                                                        <div
                                                                            className="flight-schedule flight_departure"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <div
                                                                                className="flight_scheduleTime"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <strong>{getTimeFromDate(a.departure.at).hours}{getTimeFromDate(a.departure.at).ampm}</strong>
                                                                                <div className="date " bis_skin_checked={1}>
                                                                                    {getFormattedDate(a.departure.at)}
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className="flight_scheduleStops-circle"
                                                                                bis_skin_checked={1}
                                                                            />
                                                                            <div
                                                                                className="flight_scheduleLocation"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div className="city" bis_skin_checked={1}>
                                                                                    {a.departure.airport.city}
                                                                                </div>
                                                                                <div className="airportname" bis_skin_checked={1}>
                                                                                    {a.departure.airport.name} ({a.departure.iataCode}), {a.departure.airport.country}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="flight_detailsInfoTravel"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <div
                                                                                className="flight_stopIntervalSeparator"
                                                                                bis_skin_checked={1}
                                                                            />
                                                                            <div
                                                                                className="flight-travel-details"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div
                                                                                    className="airlines-details"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <div className="right" bis_skin_checked={1}>
                                                                                        <div
                                                                                            className="air-name"
                                                                                            bis_skin_checked={1}
                                                                                        >
                                                                                            <img
                                                                                                src={a.airline.logo}
                                                                                                alt="AIR INDIA"
                                                                                            />
                                                                                            {a.airline.name} - {a.carrierCode} {a.aircraft.code}
                                                                                            <br />
                                                                                            <span className="text-gray">
                                                                                                Cabin:
                                                                                                <span
                                                                                                    className="cabin_Out "
                                                                                                    id="cabin_Out_0"
                                                                                                >
                                                                                                    {a.cabin}
                                                                                                </span>
                                                                                                <div
                                                                                                    className="flight-leg-info"
                                                                                                    style={{ marginTop: 1 }}
                                                                                                    bis_skin_checked={1}
                                                                                                >
                                                                                                    Aircraft - {a.aircraft.code}
                                                                                                    {/* <span className="tooltip-custom">
                                                                                                    <i className="fa fa-info hand" />
                                                                                                    <div
                                                                                                        className="promo-detail"
                                                                                                        bis_skin_checked={1}
                                                                                                    >
                                                                                                        <p className="mb5px">
                                                                                                            359 AIRBUS INDUSTRIE A350-900 JET
                                                                                                            314-475 STD Seats
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </span> */}
                                                                                                </div>
                                                                                                <div bis_skin_checked={1}></div>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="clearfix"
                                                                                        bis_skin_checked={1}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="clearfix" bis_skin_checked={1} />
                                                                        </div>
                                                                        <div
                                                                            className="flight-schedule flight_arrival"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <div
                                                                                className="flight_scheduleTime"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <strong>{getTimeFromDate(a.arrival.at, false).hours} {getTimeFromDate(a.arrival.at, false).ampm}</strong>
                                                                                <div className="date" bis_skin_checked={1}>
                                                                                    {getFormattedDate(a.arrival.at)}
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className="flight_scheduleStops-circle"
                                                                                bis_skin_checked={1}
                                                                            />
                                                                            <div
                                                                                className="flight_scheduleLocation"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div className="city" bis_skin_checked={1}>
                                                                                    {a.arrival.airport.city}
                                                                                </div>
                                                                                <div className="airportname" bis_skin_checked={1}>
                                                                                    {a.arrival.airport.name} ({a.arrival.airport.city}), {a.arrival.airport.country}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                        {i < selectedFlight.itineraries[0].segments.length - 1 && <div
                                                                            className="flight-details-segment"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <div
                                                                                className="flight-stop flight-stop--danger"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div
                                                                                    className="flight-duration"
                                                                                    title="Transfer time"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <i className="fa fa-clock-o" /> {calculateLayoverTime(selectedFlight).length > 0 && calculateLayoverTime(selectedFlight)[i].itineraries.layover_time}
                                                                                </div>
                                                                                <div
                                                                                    className="flight-stop-interval"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <div
                                                                                        className="flight_stopIntervalSeparator"
                                                                                        bis_skin_checked={1}
                                                                                    />
                                                                                    <div
                                                                                        className="flight-layover-label"
                                                                                        bis_skin_checked={1}
                                                                                    >
                                                                                        Layover in {a.arrival.airport.city}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="clearfix" bis_skin_checked={1} />
                                                                            </div>
                                                                        </div>}
                                                                    </>
                                                                })
                                                            }
                                                            <div className="total-trip-time" bis_skin_checked={1}>
                                                                <i className="fa fa-clock-o" /> Departure Trip Time:
                                                                <b>{extractDuration(selectedFlight.itineraries[0].duration)}</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                        <div
                                            id="baggage-fees-popup"
                                            className="modal fade"
                                            role="dialog"
                                            bis_skin_checked={1}
                                        >
                                            <div className="modal-content" bis_skin_checked={1}>
                                                <div className="close_window" bis_skin_checked={1}>
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
                                                <div id="fltbaggage" bis_skin_checked={1}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="hidden"
                                        id="responsebagg"
                                        defaultValue="1601141000blrhydai591t31aug20241435hyddelai418t31aug20241735290824010823222d612344cc4eba8271f1003bea675c"
                                    />
                                    <div className="form-box" bis_skin_checked={1}>
                                        <div className="mainheading" bis_skin_checked={1}>
                                            <img
                                                src="/assets/images/svg/p-contact.svg"
                                                className="icon contact-info"
                                            />
                                            Booking details will be sent to
                                        </div>
                                        <div className="row" bis_skin_checked={1}>
                                            <div className="col-sm-4 col-xs-12" bis_skin_checked={1}>
                                                <label className="label_hide_mobile">
                                                    Email <span className="required">*</span>
                                                </label>
                                                <input
                                                    autoComplete="off"
                                                    className="Payment esname"
                                                    id="flightBookingRequest_Contact_Email"
                                                    placeholder="Email"
                                                    type="text"
                                                    ref={emailRef}
                                                />
                                                <label
                                                    style={{ fontSize: 13, top: "-8px", position: "relative" }}
                                                >
                                                    (Booking Details Via email)
                                                </label>
                                                <span
                                                    className="field-validation-valid"
                                                    data-valmsg-for="flightBookingRequest.Contact.Email"
                                                    data-valmsg-replace="true"
                                                />
                                                <span className="required_mobile">*</span>
                                            </div>
                                            <div className="col-sm-8 col-xs-12" bis_skin_checked={1}>
                                                <div className="row" bis_skin_checked={1}>
                                                    <div className="col-sm-3 col-xs-12" bis_skin_checked={1}>
                                                        <label>
                                                            Country code<span className="required">*</span>
                                                        </label>
                                                        <div className="country-code mb20" bis_skin_checked={1}>
                                                            <div className="intl-tel-input" bis_skin_checked={1}>
                                                                <div
                                                                    className="flag-dropdown f16"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <div className="selected-flag" bis_skin_checked={1}>
                                                                        <div className="flag us" bis_skin_checked={1}>
                                                                            <div
                                                                                className="down-arrow"
                                                                                bis_skin_checked={1}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <ul className="country-list hide">
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={93}
                                                                            data-country-code="af"
                                                                        >
                                                                            <div className="flag af" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Afghanistan
                                                                            </span>
                                                                            <span className="dial-code">+93</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={355}
                                                                            data-country-code="al"
                                                                        >
                                                                            <div className="flag al" bis_skin_checked={1} />
                                                                            <span className="country-name">Albania</span>
                                                                            <span className="dial-code">+355</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={213}
                                                                            data-country-code="dz"
                                                                        >
                                                                            <div className="flag dz" bis_skin_checked={1} />
                                                                            <span className="country-name">Algeria</span>
                                                                            <span className="dial-code">+213</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1684}
                                                                            data-country-code="as"
                                                                        >
                                                                            <div className="flag as" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                American Samoa
                                                                            </span>
                                                                            <span className="dial-code">+1684</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={376}
                                                                            data-country-code="ad"
                                                                        >
                                                                            <div className="flag ad" bis_skin_checked={1} />
                                                                            <span className="country-name">Andorra</span>
                                                                            <span className="dial-code">+376</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={244}
                                                                            data-country-code="ao"
                                                                        >
                                                                            <div className="flag ao" bis_skin_checked={1} />
                                                                            <span className="country-name">Angola</span>
                                                                            <span className="dial-code">+244</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1264}
                                                                            data-country-code="ai"
                                                                        >
                                                                            <div className="flag ai" bis_skin_checked={1} />
                                                                            <span className="country-name">Anguilla</span>
                                                                            <span className="dial-code">+1264</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={672}
                                                                            data-country-code="aq"
                                                                        >
                                                                            <div className="flag aq" bis_skin_checked={1} />
                                                                            <span className="country-name">Antarctica</span>
                                                                            <span className="dial-code">+672</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1268}
                                                                            data-country-code="ag"
                                                                        >
                                                                            <div className="flag ag" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Antigua and Barbuda
                                                                            </span>
                                                                            <span className="dial-code">+1268</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={54}
                                                                            data-country-code="ar"
                                                                        >
                                                                            <div className="flag ar" bis_skin_checked={1} />
                                                                            <span className="country-name">Argentina</span>
                                                                            <span className="dial-code">+54</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={374}
                                                                            data-country-code="am"
                                                                        >
                                                                            <div className="flag am" bis_skin_checked={1} />
                                                                            <span className="country-name">Armenia</span>
                                                                            <span className="dial-code">+374</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={297}
                                                                            data-country-code="aw"
                                                                        >
                                                                            <div className="flag aw" bis_skin_checked={1} />
                                                                            <span className="country-name">Aruba</span>
                                                                            <span className="dial-code">+297</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={61}
                                                                            data-country-code="au"
                                                                        >
                                                                            <div className="flag au" bis_skin_checked={1} />
                                                                            <span className="country-name">Australia</span>
                                                                            <span className="dial-code">+61</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={43}
                                                                            data-country-code="at"
                                                                        >
                                                                            <div className="flag at" bis_skin_checked={1} />
                                                                            <span className="country-name">Austria</span>
                                                                            <span className="dial-code">+43</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={994}
                                                                            data-country-code="az"
                                                                        >
                                                                            <div className="flag az" bis_skin_checked={1} />
                                                                            <span className="country-name">Azerbaijan</span>
                                                                            <span className="dial-code">+994</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1242}
                                                                            data-country-code="bs"
                                                                        >
                                                                            <div className="flag bs" bis_skin_checked={1} />
                                                                            <span className="country-name">Bahamas</span>
                                                                            <span className="dial-code">+1242</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={973}
                                                                            data-country-code="bh"
                                                                        >
                                                                            <div className="flag bh" bis_skin_checked={1} />
                                                                            <span className="country-name">Bahrain</span>
                                                                            <span className="dial-code">+973</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={880}
                                                                            data-country-code="bd"
                                                                        >
                                                                            <div className="flag bd" bis_skin_checked={1} />
                                                                            <span className="country-name">Bangladesh</span>
                                                                            <span className="dial-code">+880</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1246}
                                                                            data-country-code="bb"
                                                                        >
                                                                            <div className="flag bb" bis_skin_checked={1} />
                                                                            <span className="country-name">Barbados</span>
                                                                            <span className="dial-code">+1246</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={375}
                                                                            data-country-code="by"
                                                                        >
                                                                            <div className="flag by" bis_skin_checked={1} />
                                                                            <span className="country-name">Belarus</span>
                                                                            <span className="dial-code">+375</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={32}
                                                                            data-country-code="be"
                                                                        >
                                                                            <div className="flag be" bis_skin_checked={1} />
                                                                            <span className="country-name">Belgium</span>
                                                                            <span className="dial-code">+32</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={501}
                                                                            data-country-code="bz"
                                                                        >
                                                                            <div className="flag bz" bis_skin_checked={1} />
                                                                            <span className="country-name">Belize</span>
                                                                            <span className="dial-code">+501</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={229}
                                                                            data-country-code="bj"
                                                                        >
                                                                            <div className="flag bj" bis_skin_checked={1} />
                                                                            <span className="country-name">Benin</span>
                                                                            <span className="dial-code">+229</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1441}
                                                                            data-country-code="bm"
                                                                        >
                                                                            <div className="flag bm" bis_skin_checked={1} />
                                                                            <span className="country-name">Bermuda</span>
                                                                            <span className="dial-code">+1441</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={975}
                                                                            data-country-code="bt"
                                                                        >
                                                                            <div className="flag bt" bis_skin_checked={1} />
                                                                            <span className="country-name">Bhutan</span>
                                                                            <span className="dial-code">+975</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={591}
                                                                            data-country-code="bo"
                                                                        >
                                                                            <div className="flag bo" bis_skin_checked={1} />
                                                                            <span className="country-name">Bolivia</span>
                                                                            <span className="dial-code">+591</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={599}
                                                                            data-country-code="bq"
                                                                        >
                                                                            <div className="flag bq" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Bonaire, Sint Eustatius and Saba
                                                                            </span>
                                                                            <span className="dial-code">+599</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={387}
                                                                            data-country-code="ba"
                                                                        >
                                                                            <div className="flag ba" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Bosnia Herzegovina
                                                                            </span>
                                                                            <span className="dial-code">+387</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={267}
                                                                            data-country-code="bw"
                                                                        >
                                                                            <div className="flag bw" bis_skin_checked={1} />
                                                                            <span className="country-name">Botswana</span>
                                                                            <span className="dial-code">+267</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={55}
                                                                            data-country-code="br"
                                                                        >
                                                                            <div className="flag br" bis_skin_checked={1} />
                                                                            <span className="country-name">Brazil</span>
                                                                            <span className="dial-code">+55</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={246}
                                                                            data-country-code="io"
                                                                        >
                                                                            <div className="flag io" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                British Indian Ocean Territory
                                                                            </span>
                                                                            <span className="dial-code">+246</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1284}
                                                                            data-country-code="vg"
                                                                        >
                                                                            <div className="flag vg" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                British Virgin Islands
                                                                            </span>
                                                                            <span className="dial-code">+1284</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={673}
                                                                            data-country-code="bn"
                                                                        >
                                                                            <div className="flag bn" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Brunei Darussalam
                                                                            </span>
                                                                            <span className="dial-code">+673</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={359}
                                                                            data-country-code="bg"
                                                                        >
                                                                            <div className="flag bg" bis_skin_checked={1} />
                                                                            <span className="country-name">Bulgaria</span>
                                                                            <span className="dial-code">+359</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={226}
                                                                            data-country-code="bf"
                                                                        >
                                                                            <div className="flag bf" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Burkina Faso
                                                                            </span>
                                                                            <span className="dial-code">+226</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={257}
                                                                            data-country-code="bi"
                                                                        >
                                                                            <div className="flag bi" bis_skin_checked={1} />
                                                                            <span className="country-name">Burundi</span>
                                                                            <span className="dial-code">+257</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={855}
                                                                            data-country-code="kh"
                                                                        >
                                                                            <div className="flag kh" bis_skin_checked={1} />
                                                                            <span className="country-name">Cambodia</span>
                                                                            <span className="dial-code">+855</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={237}
                                                                            data-country-code="cm"
                                                                        >
                                                                            <div className="flag cm" bis_skin_checked={1} />
                                                                            <span className="country-name">Cameroon</span>
                                                                            <span className="dial-code">+237</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1}
                                                                            data-country-code="ca"
                                                                        >
                                                                            <div className="flag ca" bis_skin_checked={1} />
                                                                            <span className="country-name">Canada</span>
                                                                            <span className="dial-code">+1</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={238}
                                                                            data-country-code="cv"
                                                                        >
                                                                            <div className="flag cv" bis_skin_checked={1} />
                                                                            <span className="country-name">Cape Verde</span>
                                                                            <span className="dial-code">+238</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1345}
                                                                            data-country-code="ky"
                                                                        >
                                                                            <div className="flag ky" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Cayman Islands
                                                                            </span>
                                                                            <span className="dial-code">+1345</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={236}
                                                                            data-country-code="cf"
                                                                        >
                                                                            <div className="flag cf" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Central African Republic
                                                                            </span>
                                                                            <span className="dial-code">+236</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={235}
                                                                            data-country-code="td"
                                                                        >
                                                                            <div className="flag td" bis_skin_checked={1} />
                                                                            <span className="country-name">Chad</span>
                                                                            <span className="dial-code">+235</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={56}
                                                                            data-country-code="cl"
                                                                        >
                                                                            <div className="flag cl" bis_skin_checked={1} />
                                                                            <span className="country-name">Chile</span>
                                                                            <span className="dial-code">+56</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={86}
                                                                            data-country-code="cn"
                                                                        >
                                                                            <div className="flag cn" bis_skin_checked={1} />
                                                                            <span className="country-name">China</span>
                                                                            <span className="dial-code">+86</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={61}
                                                                            data-country-code="cx"
                                                                        >
                                                                            <div className="flag cx" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Christmas Island
                                                                            </span>
                                                                            <span className="dial-code">+61</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={61}
                                                                            data-country-code="cc"
                                                                        >
                                                                            <div className="flag cc" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Cocos Islands
                                                                            </span>
                                                                            <span className="dial-code">+61</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={57}
                                                                            data-country-code="co"
                                                                        >
                                                                            <div className="flag co" bis_skin_checked={1} />
                                                                            <span className="country-name">Colombia</span>
                                                                            <span className="dial-code">+57</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={269}
                                                                            data-country-code="km"
                                                                        >
                                                                            <div className="flag km" bis_skin_checked={1} />
                                                                            <span className="country-name">Comoros</span>
                                                                            <span className="dial-code">+269</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={682}
                                                                            data-country-code="ck"
                                                                        >
                                                                            <div className="flag ck" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Cook Islands
                                                                            </span>
                                                                            <span className="dial-code">+682</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={506}
                                                                            data-country-code="cr"
                                                                        >
                                                                            <div className="flag cr" bis_skin_checked={1} />
                                                                            <span className="country-name">Costa Rica</span>
                                                                            <span className="dial-code">+506</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={385}
                                                                            data-country-code="hr"
                                                                        >
                                                                            <div className="flag hr" bis_skin_checked={1} />
                                                                            <span className="country-name">Croatia</span>
                                                                            <span className="dial-code">+385</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={53}
                                                                            data-country-code="cu"
                                                                        >
                                                                            <div className="flag cu" bis_skin_checked={1} />
                                                                            <span className="country-name">Cuba</span>
                                                                            <span className="dial-code">+53</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={599}
                                                                            data-country-code="cw"
                                                                        >
                                                                            <div className="flag cw" bis_skin_checked={1} />
                                                                            <span className="country-name">Curacao</span>
                                                                            <span className="dial-code">+599</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={357}
                                                                            data-country-code="cy"
                                                                        >
                                                                            <div className="flag cy" bis_skin_checked={1} />
                                                                            <span className="country-name">Cyprus</span>
                                                                            <span className="dial-code">+357</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={420}
                                                                            data-country-code="cz"
                                                                        >
                                                                            <div className="flag cz" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Czech Republic
                                                                            </span>
                                                                            <span className="dial-code">+420</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={243}
                                                                            data-country-code="cd"
                                                                        >
                                                                            <div className="flag cd" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Democratic Republic of the Congo
                                                                            </span>
                                                                            <span className="dial-code">+243</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={45}
                                                                            data-country-code="dk"
                                                                        >
                                                                            <div className="flag dk" bis_skin_checked={1} />
                                                                            <span className="country-name">Denmark</span>
                                                                            <span className="dial-code">+45</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={253}
                                                                            data-country-code="dj"
                                                                        >
                                                                            <div className="flag dj" bis_skin_checked={1} />
                                                                            <span className="country-name">Djibouti</span>
                                                                            <span className="dial-code">+253</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1767}
                                                                            data-country-code="dm"
                                                                        >
                                                                            <div className="flag dm" bis_skin_checked={1} />
                                                                            <span className="country-name">Dominica</span>
                                                                            <span className="dial-code">+1767</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1849}
                                                                            data-country-code="do"
                                                                        >
                                                                            <div className="flag do" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Dominican Republic
                                                                            </span>
                                                                            <span className="dial-code">+1849</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={670}
                                                                            data-country-code="tl"
                                                                        >
                                                                            <div className="flag tl" bis_skin_checked={1} />
                                                                            <span className="country-name">East Timor</span>
                                                                            <span className="dial-code">+670</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={593}
                                                                            data-country-code="ec"
                                                                        >
                                                                            <div className="flag ec" bis_skin_checked={1} />
                                                                            <span className="country-name">Ecuador</span>
                                                                            <span className="dial-code">+593</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={20}
                                                                            data-country-code="eg"
                                                                        >
                                                                            <div className="flag eg" bis_skin_checked={1} />
                                                                            <span className="country-name">Egypt</span>
                                                                            <span className="dial-code">+20</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={503}
                                                                            data-country-code="sv"
                                                                        >
                                                                            <div className="flag sv" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                El Salvador
                                                                            </span>
                                                                            <span className="dial-code">+503</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={240}
                                                                            data-country-code="gq"
                                                                        >
                                                                            <div className="flag gq" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Equatorial Guinea
                                                                            </span>
                                                                            <span className="dial-code">+240</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={291}
                                                                            data-country-code="er"
                                                                        >
                                                                            <div className="flag er" bis_skin_checked={1} />
                                                                            <span className="country-name">Eritrea</span>
                                                                            <span className="dial-code">+291</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={372}
                                                                            data-country-code="ee"
                                                                        >
                                                                            <div className="flag ee" bis_skin_checked={1} />
                                                                            <span className="country-name">Estonia</span>
                                                                            <span className="dial-code">+372</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={268}
                                                                            data-country-code="sz"
                                                                        >
                                                                            <div className="flag sz" bis_skin_checked={1} />
                                                                            <span className="country-name">Eswatini</span>
                                                                            <span className="dial-code">+268</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={251}
                                                                            data-country-code="et"
                                                                        >
                                                                            <div className="flag et" bis_skin_checked={1} />
                                                                            <span className="country-name">Ethiopia</span>
                                                                            <span className="dial-code">+251</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={500}
                                                                            data-country-code="fk"
                                                                        >
                                                                            <div className="flag fk" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Falkland Islands
                                                                            </span>
                                                                            <span className="dial-code">+500</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={298}
                                                                            data-country-code="fo"
                                                                        >
                                                                            <div className="flag fo" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Faroe Islands
                                                                            </span>
                                                                            <span className="dial-code">+298</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={679}
                                                                            data-country-code="fj"
                                                                        >
                                                                            <div className="flag fj" bis_skin_checked={1} />
                                                                            <span className="country-name">Fiji</span>
                                                                            <span className="dial-code">+679</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={358}
                                                                            data-country-code="fi"
                                                                        >
                                                                            <div className="flag fi" bis_skin_checked={1} />
                                                                            <span className="country-name">Finland</span>
                                                                            <span className="dial-code">+358</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={33}
                                                                            data-country-code="fr"
                                                                        >
                                                                            <div className="flag fr" bis_skin_checked={1} />
                                                                            <span className="country-name">France</span>
                                                                            <span className="dial-code">+33</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={594}
                                                                            data-country-code="gf"
                                                                        >
                                                                            <div className="flag gf" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                French Guiana
                                                                            </span>
                                                                            <span className="dial-code">+594</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={689}
                                                                            data-country-code="pf"
                                                                        >
                                                                            <div className="flag pf" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                French Polynesia
                                                                            </span>
                                                                            <span className="dial-code">+689</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={241}
                                                                            data-country-code="ga"
                                                                        >
                                                                            <div className="flag ga" bis_skin_checked={1} />
                                                                            <span className="country-name">Gabon</span>
                                                                            <span className="dial-code">+241</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={220}
                                                                            data-country-code="gm"
                                                                        >
                                                                            <div className="flag gm" bis_skin_checked={1} />
                                                                            <span className="country-name">Gambia</span>
                                                                            <span className="dial-code">+220</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={995}
                                                                            data-country-code="ge"
                                                                        >
                                                                            <div className="flag ge" bis_skin_checked={1} />
                                                                            <span className="country-name">Georgia</span>
                                                                            <span className="dial-code">+995</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={49}
                                                                            data-country-code="de"
                                                                        >
                                                                            <div className="flag de" bis_skin_checked={1} />
                                                                            <span className="country-name">Germany</span>
                                                                            <span className="dial-code">+49</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={233}
                                                                            data-country-code="gh"
                                                                        >
                                                                            <div className="flag gh" bis_skin_checked={1} />
                                                                            <span className="country-name">Ghana</span>
                                                                            <span className="dial-code">+233</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={350}
                                                                            data-country-code="gi"
                                                                        >
                                                                            <div className="flag gi" bis_skin_checked={1} />
                                                                            <span className="country-name">Gibraltar</span>
                                                                            <span className="dial-code">+350</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={30}
                                                                            data-country-code="gr"
                                                                        >
                                                                            <div className="flag gr" bis_skin_checked={1} />
                                                                            <span className="country-name">Greece</span>
                                                                            <span className="dial-code">+30</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={299}
                                                                            data-country-code="gl"
                                                                        >
                                                                            <div className="flag gl" bis_skin_checked={1} />
                                                                            <span className="country-name">Greenland</span>
                                                                            <span className="dial-code">+299</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1473}
                                                                            data-country-code="gd"
                                                                        >
                                                                            <div className="flag gd" bis_skin_checked={1} />
                                                                            <span className="country-name">Grenada</span>
                                                                            <span className="dial-code">+1473</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={590}
                                                                            data-country-code="gp"
                                                                        >
                                                                            <div className="flag gp" bis_skin_checked={1} />
                                                                            <span className="country-name">Guadeloupe</span>
                                                                            <span className="dial-code">+590</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1671}
                                                                            data-country-code="gu"
                                                                        >
                                                                            <div className="flag gu" bis_skin_checked={1} />
                                                                            <span className="country-name">Guam</span>
                                                                            <span className="dial-code">+1671</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={502}
                                                                            data-country-code="gt"
                                                                        >
                                                                            <div className="flag gt" bis_skin_checked={1} />
                                                                            <span className="country-name">Guatemala</span>
                                                                            <span className="dial-code">+502</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={441481}
                                                                            data-country-code="gg"
                                                                        >
                                                                            <div className="flag gg" bis_skin_checked={1} />
                                                                            <span className="country-name">Guernsey</span>
                                                                            <span className="dial-code">+441481</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={224}
                                                                            data-country-code="gn"
                                                                        >
                                                                            <div className="flag gn" bis_skin_checked={1} />
                                                                            <span className="country-name">Guinea</span>
                                                                            <span className="dial-code">+224</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={245}
                                                                            data-country-code="gw"
                                                                        >
                                                                            <div className="flag gw" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Guinea-Bissau
                                                                            </span>
                                                                            <span className="dial-code">+245</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={592}
                                                                            data-country-code="gy"
                                                                        >
                                                                            <div className="flag gy" bis_skin_checked={1} />
                                                                            <span className="country-name">Guyana</span>
                                                                            <span className="dial-code">+592</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={509}
                                                                            data-country-code="ht"
                                                                        >
                                                                            <div className="flag ht" bis_skin_checked={1} />
                                                                            <span className="country-name">Haiti</span>
                                                                            <span className="dial-code">+509</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={672}
                                                                            data-country-code="hm"
                                                                        >
                                                                            <div className="flag hm" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Heard Island and McDonald Islands
                                                                            </span>
                                                                            <span className="dial-code">+672</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={504}
                                                                            data-country-code="hn"
                                                                        >
                                                                            <div className="flag hn" bis_skin_checked={1} />
                                                                            <span className="country-name">Honduras</span>
                                                                            <span className="dial-code">+504</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={852}
                                                                            data-country-code="hk"
                                                                        >
                                                                            <div className="flag hk" bis_skin_checked={1} />
                                                                            <span className="country-name">Hong Kong</span>
                                                                            <span className="dial-code">+852</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={36}
                                                                            data-country-code="hu"
                                                                        >
                                                                            <div className="flag hu" bis_skin_checked={1} />
                                                                            <span className="country-name">Hungary</span>
                                                                            <span className="dial-code">+36</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={354}
                                                                            data-country-code="is"
                                                                        >
                                                                            <div className="flag is" bis_skin_checked={1} />
                                                                            <span className="country-name">Iceland</span>
                                                                            <span className="dial-code">+354</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={91}
                                                                            data-country-code="in"
                                                                        >
                                                                            <div className="flag in" bis_skin_checked={1} />
                                                                            <span className="country-name">India</span>
                                                                            <span className="dial-code">+91</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={62}
                                                                            data-country-code="id"
                                                                        >
                                                                            <div className="flag id" bis_skin_checked={1} />
                                                                            <span className="country-name">Indonesia</span>
                                                                            <span className="dial-code">+62</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={98}
                                                                            data-country-code="ir"
                                                                        >
                                                                            <div className="flag ir" bis_skin_checked={1} />
                                                                            <span className="country-name">Iran</span>
                                                                            <span className="dial-code">+98</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={964}
                                                                            data-country-code="iq"
                                                                        >
                                                                            <div className="flag iq" bis_skin_checked={1} />
                                                                            <span className="country-name">Iraq</span>
                                                                            <span className="dial-code">+964</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={353}
                                                                            data-country-code="ie"
                                                                        >
                                                                            <div className="flag ie" bis_skin_checked={1} />
                                                                            <span className="country-name">Ireland</span>
                                                                            <span className="dial-code">+353</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={441624}
                                                                            data-country-code="im"
                                                                        >
                                                                            <div className="flag im" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Isle of Man
                                                                            </span>
                                                                            <span className="dial-code">+441624</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={972}
                                                                            data-country-code="il"
                                                                        >
                                                                            <div className="flag il" bis_skin_checked={1} />
                                                                            <span className="country-name">Israel</span>
                                                                            <span className="dial-code">+972</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={39}
                                                                            data-country-code="it"
                                                                        >
                                                                            <div className="flag it" bis_skin_checked={1} />
                                                                            <span className="country-name">Italy</span>
                                                                            <span className="dial-code">+39</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={225}
                                                                            data-country-code="ci"
                                                                        >
                                                                            <div className="flag ci" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Ivory Coast
                                                                            </span>
                                                                            <span className="dial-code">+225</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1876}
                                                                            data-country-code="jm"
                                                                        >
                                                                            <div className="flag jm" bis_skin_checked={1} />
                                                                            <span className="country-name">Jamaica</span>
                                                                            <span className="dial-code">+1876</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={81}
                                                                            data-country-code="jp"
                                                                        >
                                                                            <div className="flag jp" bis_skin_checked={1} />
                                                                            <span className="country-name">Japan</span>
                                                                            <span className="dial-code">+81</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={441534}
                                                                            data-country-code="je"
                                                                        >
                                                                            <div className="flag je" bis_skin_checked={1} />
                                                                            <span className="country-name">Jersey</span>
                                                                            <span className="dial-code">+441534</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={962}
                                                                            data-country-code="jo"
                                                                        >
                                                                            <div className="flag jo" bis_skin_checked={1} />
                                                                            <span className="country-name">Jordan</span>
                                                                            <span className="dial-code">+962</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={7}
                                                                            data-country-code="kz"
                                                                        >
                                                                            <div className="flag kz" bis_skin_checked={1} />
                                                                            <span className="country-name">Kazakhstan</span>
                                                                            <span className="dial-code">+7</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={254}
                                                                            data-country-code="ke"
                                                                        >
                                                                            <div className="flag ke" bis_skin_checked={1} />
                                                                            <span className="country-name">Kenya</span>
                                                                            <span className="dial-code">+254</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={686}
                                                                            data-country-code="ki"
                                                                        >
                                                                            <div className="flag ki" bis_skin_checked={1} />
                                                                            <span className="country-name">Kiribati</span>
                                                                            <span className="dial-code">+686</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={965}
                                                                            data-country-code="kw"
                                                                        >
                                                                            <div className="flag kw" bis_skin_checked={1} />
                                                                            <span className="country-name">Kuwait</span>
                                                                            <span className="dial-code">+965</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={996}
                                                                            data-country-code="kg"
                                                                        >
                                                                            <div className="flag kg" bis_skin_checked={1} />
                                                                            <span className="country-name">Kyrgyzstan</span>
                                                                            <span className="dial-code">+996</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={856}
                                                                            data-country-code="la"
                                                                        >
                                                                            <div className="flag la" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Lao Peoples Democratic Republic
                                                                            </span>
                                                                            <span className="dial-code">+856</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={371}
                                                                            data-country-code="lv"
                                                                        >
                                                                            <div className="flag lv" bis_skin_checked={1} />
                                                                            <span className="country-name">Latvia</span>
                                                                            <span className="dial-code">+371</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={961}
                                                                            data-country-code="lb"
                                                                        >
                                                                            <div className="flag lb" bis_skin_checked={1} />
                                                                            <span className="country-name">Lebanon</span>
                                                                            <span className="dial-code">+961</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={266}
                                                                            data-country-code="ls"
                                                                        >
                                                                            <div className="flag ls" bis_skin_checked={1} />
                                                                            <span className="country-name">Lesotho</span>
                                                                            <span className="dial-code">+266</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={231}
                                                                            data-country-code="lr"
                                                                        >
                                                                            <div className="flag lr" bis_skin_checked={1} />
                                                                            <span className="country-name">Liberia</span>
                                                                            <span className="dial-code">+231</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={218}
                                                                            data-country-code="ly"
                                                                        >
                                                                            <div className="flag ly" bis_skin_checked={1} />
                                                                            <span className="country-name">Libya</span>
                                                                            <span className="dial-code">+218</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={423}
                                                                            data-country-code="li"
                                                                        >
                                                                            <div className="flag li" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Liechtenstein
                                                                            </span>
                                                                            <span className="dial-code">+423</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={370}
                                                                            data-country-code="lt"
                                                                        >
                                                                            <div className="flag lt" bis_skin_checked={1} />
                                                                            <span className="country-name">Lithuania</span>
                                                                            <span className="dial-code">+370</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={352}
                                                                            data-country-code="lu"
                                                                        >
                                                                            <div className="flag lu" bis_skin_checked={1} />
                                                                            <span className="country-name">Luxembourg</span>
                                                                            <span className="dial-code">+352</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={853}
                                                                            data-country-code="mo"
                                                                        >
                                                                            <div className="flag mo" bis_skin_checked={1} />
                                                                            <span className="country-name">Macau</span>
                                                                            <span className="dial-code">+853</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={261}
                                                                            data-country-code="mg"
                                                                        >
                                                                            <div className="flag mg" bis_skin_checked={1} />
                                                                            <span className="country-name">Madagascar</span>
                                                                            <span className="dial-code">+261</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={265}
                                                                            data-country-code="mw"
                                                                        >
                                                                            <div className="flag mw" bis_skin_checked={1} />
                                                                            <span className="country-name">Malawi</span>
                                                                            <span className="dial-code">+265</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={60}
                                                                            data-country-code="my"
                                                                        >
                                                                            <div className="flag my" bis_skin_checked={1} />
                                                                            <span className="country-name">Malaysia</span>
                                                                            <span className="dial-code">+60</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={960}
                                                                            data-country-code="mv"
                                                                        >
                                                                            <div className="flag mv" bis_skin_checked={1} />
                                                                            <span className="country-name">Maldives</span>
                                                                            <span className="dial-code">+960</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={223}
                                                                            data-country-code="ml"
                                                                        >
                                                                            <div className="flag ml" bis_skin_checked={1} />
                                                                            <span className="country-name">Mali</span>
                                                                            <span className="dial-code">+223</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={356}
                                                                            data-country-code="mt"
                                                                        >
                                                                            <div className="flag mt" bis_skin_checked={1} />
                                                                            <span className="country-name">Malta</span>
                                                                            <span className="dial-code">+356</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={692}
                                                                            data-country-code="mh"
                                                                        >
                                                                            <div className="flag mh" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Marshall Islands
                                                                            </span>
                                                                            <span className="dial-code">+692</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={596}
                                                                            data-country-code="mq"
                                                                        >
                                                                            <div className="flag mq" bis_skin_checked={1} />
                                                                            <span className="country-name">Martinique</span>
                                                                            <span className="dial-code">+596</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={222}
                                                                            data-country-code="mr"
                                                                        >
                                                                            <div className="flag mr" bis_skin_checked={1} />
                                                                            <span className="country-name">Mauritania</span>
                                                                            <span className="dial-code">+222</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={230}
                                                                            data-country-code="mu"
                                                                        >
                                                                            <div className="flag mu" bis_skin_checked={1} />
                                                                            <span className="country-name">Mauritius</span>
                                                                            <span className="dial-code">+230</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={262}
                                                                            data-country-code="yt"
                                                                        >
                                                                            <div className="flag yt" bis_skin_checked={1} />
                                                                            <span className="country-name">Mayotte</span>
                                                                            <span className="dial-code">+262</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={52}
                                                                            data-country-code="mx"
                                                                        >
                                                                            <div className="flag mx" bis_skin_checked={1} />
                                                                            <span className="country-name">Mexico</span>
                                                                            <span className="dial-code">+52</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={691}
                                                                            data-country-code="fm"
                                                                        >
                                                                            <div className="flag fm" bis_skin_checked={1} />
                                                                            <span className="country-name">Micronesia</span>
                                                                            <span className="dial-code">+691</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={373}
                                                                            data-country-code="md"
                                                                        >
                                                                            <div className="flag md" bis_skin_checked={1} />
                                                                            <span className="country-name">Moldova</span>
                                                                            <span className="dial-code">+373</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={377}
                                                                            data-country-code="mc"
                                                                        >
                                                                            <div className="flag mc" bis_skin_checked={1} />
                                                                            <span className="country-name">Monaco</span>
                                                                            <span className="dial-code">+377</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={976}
                                                                            data-country-code="mn"
                                                                        >
                                                                            <div className="flag mn" bis_skin_checked={1} />
                                                                            <span className="country-name">Mongolia</span>
                                                                            <span className="dial-code">+976</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={382}
                                                                            data-country-code="me"
                                                                        >
                                                                            <div className="flag me" bis_skin_checked={1} />
                                                                            <span className="country-name">Montenegro</span>
                                                                            <span className="dial-code">+382</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1664}
                                                                            data-country-code="ms"
                                                                        >
                                                                            <div className="flag ms" bis_skin_checked={1} />
                                                                            <span className="country-name">Montserrat</span>
                                                                            <span className="dial-code">+1664</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={212}
                                                                            data-country-code="ma"
                                                                        >
                                                                            <div className="flag ma" bis_skin_checked={1} />
                                                                            <span className="country-name">Morocco</span>
                                                                            <span className="dial-code">+212</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={258}
                                                                            data-country-code="mz"
                                                                        >
                                                                            <div className="flag mz" bis_skin_checked={1} />
                                                                            <span className="country-name">Mozambique</span>
                                                                            <span className="dial-code">+258</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={95}
                                                                            data-country-code="mm"
                                                                        >
                                                                            <div className="flag mm" bis_skin_checked={1} />
                                                                            <span className="country-name">Myanmar</span>
                                                                            <span className="dial-code">+95</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={264}
                                                                            data-country-code="na"
                                                                        >
                                                                            <div className="flag na" bis_skin_checked={1} />
                                                                            <span className="country-name">Namibia</span>
                                                                            <span className="dial-code">+264</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={674}
                                                                            data-country-code="nr"
                                                                        >
                                                                            <div className="flag nr" bis_skin_checked={1} />
                                                                            <span className="country-name">Nauru</span>
                                                                            <span className="dial-code">+674</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={977}
                                                                            data-country-code="np"
                                                                        >
                                                                            <div className="flag np" bis_skin_checked={1} />
                                                                            <span className="country-name">Nepal</span>
                                                                            <span className="dial-code">+977</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={31}
                                                                            data-country-code="nl"
                                                                        >
                                                                            <div className="flag nl" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Netherlands
                                                                            </span>
                                                                            <span className="dial-code">+31</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={687}
                                                                            data-country-code="nc"
                                                                        >
                                                                            <div className="flag nc" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                New Caledonia
                                                                            </span>
                                                                            <span className="dial-code">+687</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={64}
                                                                            data-country-code="nz"
                                                                        >
                                                                            <div className="flag nz" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                New Zealand
                                                                            </span>
                                                                            <span className="dial-code">+64</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={505}
                                                                            data-country-code="ni"
                                                                        >
                                                                            <div className="flag ni" bis_skin_checked={1} />
                                                                            <span className="country-name">Nicaragua</span>
                                                                            <span className="dial-code">+505</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={227}
                                                                            data-country-code="ne"
                                                                        >
                                                                            <div className="flag ne" bis_skin_checked={1} />
                                                                            <span className="country-name">Niger</span>
                                                                            <span className="dial-code">+227</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={234}
                                                                            data-country-code="ng"
                                                                        >
                                                                            <div className="flag ng" bis_skin_checked={1} />
                                                                            <span className="country-name">Nigeria</span>
                                                                            <span className="dial-code">+234</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={683}
                                                                            data-country-code="nu"
                                                                        >
                                                                            <div className="flag nu" bis_skin_checked={1} />
                                                                            <span className="country-name">Niue</span>
                                                                            <span className="dial-code">+683</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={672}
                                                                            data-country-code="nf"
                                                                        >
                                                                            <div className="flag nf" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Norfolk Island
                                                                            </span>
                                                                            <span className="dial-code">+672</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={850}
                                                                            data-country-code="kp"
                                                                        >
                                                                            <div className="flag kp" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                North Korea
                                                                            </span>
                                                                            <span className="dial-code">+850</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1670}
                                                                            data-country-code="mp"
                                                                        >
                                                                            <div className="flag mp" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Northern Mariana Islands
                                                                            </span>
                                                                            <span className="dial-code">+1670</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={47}
                                                                            data-country-code="no"
                                                                        >
                                                                            <div className="flag no" bis_skin_checked={1} />
                                                                            <span className="country-name">Norway</span>
                                                                            <span className="dial-code">+47</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={968}
                                                                            data-country-code="om"
                                                                        >
                                                                            <div className="flag om" bis_skin_checked={1} />
                                                                            <span className="country-name">Oman</span>
                                                                            <span className="dial-code">+968</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={92}
                                                                            data-country-code="pk"
                                                                        >
                                                                            <div className="flag pk" bis_skin_checked={1} />
                                                                            <span className="country-name">Pakistan</span>
                                                                            <span className="dial-code">+92</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={680}
                                                                            data-country-code="pw"
                                                                        >
                                                                            <div className="flag pw" bis_skin_checked={1} />
                                                                            <span className="country-name">Palau</span>
                                                                            <span className="dial-code">+680</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={970}
                                                                            data-country-code="ps"
                                                                        >
                                                                            <div className="flag ps" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Palestinian Territory, Occupied
                                                                            </span>
                                                                            <span className="dial-code">+970</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={507}
                                                                            data-country-code="pa"
                                                                        >
                                                                            <div className="flag pa" bis_skin_checked={1} />
                                                                            <span className="country-name">Panama</span>
                                                                            <span className="dial-code">+507</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={675}
                                                                            data-country-code="pg"
                                                                        >
                                                                            <div className="flag pg" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Papua New Guinea
                                                                            </span>
                                                                            <span className="dial-code">+675</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={595}
                                                                            data-country-code="py"
                                                                        >
                                                                            <div className="flag py" bis_skin_checked={1} />
                                                                            <span className="country-name">Paraguay</span>
                                                                            <span className="dial-code">+595</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={51}
                                                                            data-country-code="pe"
                                                                        >
                                                                            <div className="flag pe" bis_skin_checked={1} />
                                                                            <span className="country-name">Peru</span>
                                                                            <span className="dial-code">+51</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={63}
                                                                            data-country-code="ph"
                                                                        >
                                                                            <div className="flag ph" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Philippines
                                                                            </span>
                                                                            <span className="dial-code">+63</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={64}
                                                                            data-country-code="pn"
                                                                        >
                                                                            <div className="flag pn" bis_skin_checked={1} />
                                                                            <span className="country-name">Pitcairn</span>
                                                                            <span className="dial-code">+64</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={48}
                                                                            data-country-code="pl"
                                                                        >
                                                                            <div className="flag pl" bis_skin_checked={1} />
                                                                            <span className="country-name">Poland</span>
                                                                            <span className="dial-code">+48</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={351}
                                                                            data-country-code="pt"
                                                                        >
                                                                            <div className="flag pt" bis_skin_checked={1} />
                                                                            <span className="country-name">Portugal</span>
                                                                            <span className="dial-code">+351</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1787}
                                                                            data-country-code="pr"
                                                                        >
                                                                            <div className="flag pr" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Puerto Rico
                                                                            </span>
                                                                            <span className="dial-code">+1787</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={974}
                                                                            data-country-code="qa"
                                                                        >
                                                                            <div className="flag qa" bis_skin_checked={1} />
                                                                            <span className="country-name">Qatar</span>
                                                                            <span className="dial-code">+974</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={389}
                                                                            data-country-code="mk"
                                                                        >
                                                                            <div className="flag mk" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Republic of Macedonia
                                                                            </span>
                                                                            <span className="dial-code">+389</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={242}
                                                                            data-country-code="cg"
                                                                        >
                                                                            <div className="flag cg" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Republic of the Congo
                                                                            </span>
                                                                            <span className="dial-code">+242</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={262}
                                                                            data-country-code="re"
                                                                        >
                                                                            <div className="flag re" bis_skin_checked={1} />
                                                                            <span className="country-name">Reunion</span>
                                                                            <span className="dial-code">+262</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={40}
                                                                            data-country-code="ro"
                                                                        >
                                                                            <div className="flag ro" bis_skin_checked={1} />
                                                                            <span className="country-name">Romania</span>
                                                                            <span className="dial-code">+40</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={7}
                                                                            data-country-code="ru"
                                                                        >
                                                                            <div className="flag ru" bis_skin_checked={1} />
                                                                            <span className="country-name">Russia</span>
                                                                            <span className="dial-code">+7</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={250}
                                                                            data-country-code="rw"
                                                                        >
                                                                            <div className="flag rw" bis_skin_checked={1} />
                                                                            <span className="country-name">Rwanda</span>
                                                                            <span className="dial-code">+250</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={590}
                                                                            data-country-code="bl"
                                                                        >
                                                                            <div className="flag bl" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Saint Barthelemy
                                                                            </span>
                                                                            <span className="dial-code">+590</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={290}
                                                                            data-country-code="sh"
                                                                        >
                                                                            <div className="flag sh" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Saint Helena
                                                                            </span>
                                                                            <span className="dial-code">+290</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={590}
                                                                            data-country-code="mf"
                                                                        >
                                                                            <div className="flag mf" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Saint Martin
                                                                            </span>
                                                                            <span className="dial-code">+590</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={685}
                                                                            data-country-code="ws"
                                                                        >
                                                                            <div className="flag ws" bis_skin_checked={1} />
                                                                            <span className="country-name">Samoa</span>
                                                                            <span className="dial-code">+685</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={378}
                                                                            data-country-code="sm"
                                                                        >
                                                                            <div className="flag sm" bis_skin_checked={1} />
                                                                            <span className="country-name">San Marino</span>
                                                                            <span className="dial-code">+378</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={239}
                                                                            data-country-code="st"
                                                                        >
                                                                            <div className="flag st" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Sao Tome and Principe
                                                                            </span>
                                                                            <span className="dial-code">+239</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={966}
                                                                            data-country-code="sa"
                                                                        >
                                                                            <div className="flag sa" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Saudi Arabia
                                                                            </span>
                                                                            <span className="dial-code">+966</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={221}
                                                                            data-country-code="sn"
                                                                        >
                                                                            <div className="flag sn" bis_skin_checked={1} />
                                                                            <span className="country-name">Senegal</span>
                                                                            <span className="dial-code">+221</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={381}
                                                                            data-country-code="rs"
                                                                        >
                                                                            <div className="flag rs" bis_skin_checked={1} />
                                                                            <span className="country-name">Serbia</span>
                                                                            <span className="dial-code">+381</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={248}
                                                                            data-country-code="sc"
                                                                        >
                                                                            <div className="flag sc" bis_skin_checked={1} />
                                                                            <span className="country-name">Seychelles</span>
                                                                            <span className="dial-code">+248</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={232}
                                                                            data-country-code="sl"
                                                                        >
                                                                            <div className="flag sl" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Sierra Leone
                                                                            </span>
                                                                            <span className="dial-code">+232</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={65}
                                                                            data-country-code="sg"
                                                                        >
                                                                            <div className="flag sg" bis_skin_checked={1} />
                                                                            <span className="country-name">Singapore</span>
                                                                            <span className="dial-code">+65</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1721}
                                                                            data-country-code="sx"
                                                                        >
                                                                            <div className="flag sx" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Sint Maarten
                                                                            </span>
                                                                            <span className="dial-code">+1721</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={421}
                                                                            data-country-code="sk"
                                                                        >
                                                                            <div className="flag sk" bis_skin_checked={1} />
                                                                            <span className="country-name">Slovakia</span>
                                                                            <span className="dial-code">+421</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={386}
                                                                            data-country-code="si"
                                                                        >
                                                                            <div className="flag si" bis_skin_checked={1} />
                                                                            <span className="country-name">Slovenia</span>
                                                                            <span className="dial-code">+386</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={677}
                                                                            data-country-code="sb"
                                                                        >
                                                                            <div className="flag sb" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Solomon Islands
                                                                            </span>
                                                                            <span className="dial-code">+677</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={252}
                                                                            data-country-code="so"
                                                                        >
                                                                            <div className="flag so" bis_skin_checked={1} />
                                                                            <span className="country-name">Somalia</span>
                                                                            <span className="dial-code">+252</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={27}
                                                                            data-country-code="za"
                                                                        >
                                                                            <div className="flag za" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                South Africa
                                                                            </span>
                                                                            <span className="dial-code">+27</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={500}
                                                                            data-country-code="gs"
                                                                        >
                                                                            <div className="flag gs" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                South Georgia and the South Sandwich Islands
                                                                            </span>
                                                                            <span className="dial-code">+500</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={82}
                                                                            data-country-code="kr"
                                                                        >
                                                                            <div className="flag kr" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                South Korea
                                                                            </span>
                                                                            <span className="dial-code">+82</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={211}
                                                                            data-country-code="ss"
                                                                        >
                                                                            <div className="flag ss" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                South Sudan
                                                                            </span>
                                                                            <span className="dial-code">+211</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={34}
                                                                            data-country-code="es"
                                                                        >
                                                                            <div className="flag es" bis_skin_checked={1} />
                                                                            <span className="country-name">Spain</span>
                                                                            <span className="dial-code">+34</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={94}
                                                                            data-country-code="lk"
                                                                        >
                                                                            <div className="flag lk" bis_skin_checked={1} />
                                                                            <span className="country-name">Sri Lanka</span>
                                                                            <span className="dial-code">+94</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1869}
                                                                            data-country-code="kn"
                                                                        >
                                                                            <div className="flag kn" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                St. Christopher (St. Kitts) Nevis
                                                                            </span>
                                                                            <span className="dial-code">+1869</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1758}
                                                                            data-country-code="lc"
                                                                        >
                                                                            <div className="flag lc" bis_skin_checked={1} />
                                                                            <span className="country-name">St. Lucia</span>
                                                                            <span className="dial-code">+1758</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={508}
                                                                            data-country-code="pm"
                                                                        >
                                                                            <div className="flag pm" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                St. Pierre and Miquelon
                                                                            </span>
                                                                            <span className="dial-code">+508</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1784}
                                                                            data-country-code="vc"
                                                                        >
                                                                            <div className="flag vc" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                St. Vincent and The Grenadines
                                                                            </span>
                                                                            <span className="dial-code">+1784</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={249}
                                                                            data-country-code="sd"
                                                                        >
                                                                            <div className="flag sd" bis_skin_checked={1} />
                                                                            <span className="country-name">Sudan</span>
                                                                            <span className="dial-code">+249</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={597}
                                                                            data-country-code="sr"
                                                                        >
                                                                            <div className="flag sr" bis_skin_checked={1} />
                                                                            <span className="country-name">Suriname</span>
                                                                            <span className="dial-code">+597</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={47}
                                                                            data-country-code="sj"
                                                                        >
                                                                            <div className="flag sj" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Svalbard and Jan Mayen
                                                                            </span>
                                                                            <span className="dial-code">+47</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={46}
                                                                            data-country-code="se"
                                                                        >
                                                                            <div className="flag se" bis_skin_checked={1} />
                                                                            <span className="country-name">Sweden</span>
                                                                            <span className="dial-code">+46</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={41}
                                                                            data-country-code="ch"
                                                                        >
                                                                            <div className="flag ch" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Switzerland
                                                                            </span>
                                                                            <span className="dial-code">+41</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={963}
                                                                            data-country-code="sy"
                                                                        >
                                                                            <div className="flag sy" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Syrian Arab Republic
                                                                            </span>
                                                                            <span className="dial-code">+963</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={886}
                                                                            data-country-code="tw"
                                                                        >
                                                                            <div className="flag tw" bis_skin_checked={1} />
                                                                            <span className="country-name">Taiwan</span>
                                                                            <span className="dial-code">+886</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={992}
                                                                            data-country-code="tj"
                                                                        >
                                                                            <div className="flag tj" bis_skin_checked={1} />
                                                                            <span className="country-name">Tajikistan</span>
                                                                            <span className="dial-code">+992</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={255}
                                                                            data-country-code="tz"
                                                                        >
                                                                            <div className="flag tz" bis_skin_checked={1} />
                                                                            <span className="country-name">Tanzania</span>
                                                                            <span className="dial-code">+255</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={66}
                                                                            data-country-code="th"
                                                                        >
                                                                            <div className="flag th" bis_skin_checked={1} />
                                                                            <span className="country-name">Thailand</span>
                                                                            <span className="dial-code">+66</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={228}
                                                                            data-country-code="tg"
                                                                        >
                                                                            <div className="flag tg" bis_skin_checked={1} />
                                                                            <span className="country-name">Togo</span>
                                                                            <span className="dial-code">+228</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={690}
                                                                            data-country-code="tk"
                                                                        >
                                                                            <div className="flag tk" bis_skin_checked={1} />
                                                                            <span className="country-name">Tokelau</span>
                                                                            <span className="dial-code">+690</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={676}
                                                                            data-country-code="to"
                                                                        >
                                                                            <div className="flag to" bis_skin_checked={1} />
                                                                            <span className="country-name">Tonga</span>
                                                                            <span className="dial-code">+676</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1868}
                                                                            data-country-code="tt"
                                                                        >
                                                                            <div className="flag tt" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Trinidad and Tobago
                                                                            </span>
                                                                            <span className="dial-code">+1868</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={216}
                                                                            data-country-code="tn"
                                                                        >
                                                                            <div className="flag tn" bis_skin_checked={1} />
                                                                            <span className="country-name">Tunisia</span>
                                                                            <span className="dial-code">+216</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={90}
                                                                            data-country-code="tr"
                                                                        >
                                                                            <div className="flag tr" bis_skin_checked={1} />
                                                                            <span className="country-name">Turkey</span>
                                                                            <span className="dial-code">+90</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={993}
                                                                            data-country-code="tm"
                                                                        >
                                                                            <div className="flag tm" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Turkmenistan
                                                                            </span>
                                                                            <span className="dial-code">+993</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1649}
                                                                            data-country-code="tc"
                                                                        >
                                                                            <div className="flag tc" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Turks and Caicos Islands
                                                                            </span>
                                                                            <span className="dial-code">+1649</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={688}
                                                                            data-country-code="tv"
                                                                        >
                                                                            <div className="flag tv" bis_skin_checked={1} />
                                                                            <span className="country-name">Tuvalu</span>
                                                                            <span className="dial-code">+688</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={256}
                                                                            data-country-code="ug"
                                                                        >
                                                                            <div className="flag ug" bis_skin_checked={1} />
                                                                            <span className="country-name">Uganda</span>
                                                                            <span className="dial-code">+256</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={380}
                                                                            data-country-code="ua"
                                                                        >
                                                                            <div className="flag ua" bis_skin_checked={1} />
                                                                            <span className="country-name">Ukraine</span>
                                                                            <span className="dial-code">+380</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={971}
                                                                            data-country-code="ae"
                                                                        >
                                                                            <div className="flag ae" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                United Arab Emirates
                                                                            </span>
                                                                            <span className="dial-code">+971</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={44}
                                                                            data-country-code="gb"
                                                                        >
                                                                            <div className="flag gb" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                United Kingdom
                                                                            </span>
                                                                            <span className="dial-code">+44</span>
                                                                        </li>
                                                                        <li
                                                                            className="country active"
                                                                            data-dial-code={1}
                                                                            data-country-code="us"
                                                                        >
                                                                            <div className="flag us" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                United States
                                                                            </span>
                                                                            <span className="dial-code">+1</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={246}
                                                                            data-country-code="um"
                                                                        >
                                                                            <div className="flag um" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                United States Minor Outlying Islands (the)
                                                                            </span>
                                                                            <span className="dial-code">+246</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={598}
                                                                            data-country-code="uy"
                                                                        >
                                                                            <div className="flag uy" bis_skin_checked={1} />
                                                                            <span className="country-name">Uruguay</span>
                                                                            <span className="dial-code">+598</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={1340}
                                                                            data-country-code="vi"
                                                                        >
                                                                            <div className="flag vi" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                US Virgin Islands
                                                                            </span>
                                                                            <span className="dial-code">+1340</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={998}
                                                                            data-country-code="uz"
                                                                        >
                                                                            <div className="flag uz" bis_skin_checked={1} />
                                                                            <span className="country-name">Uzbekistan</span>
                                                                            <span className="dial-code">+998</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={678}
                                                                            data-country-code="vu"
                                                                        >
                                                                            <div className="flag vu" bis_skin_checked={1} />
                                                                            <span className="country-name">Vanuatu</span>
                                                                            <span className="dial-code">+678</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={379}
                                                                            data-country-code="va"
                                                                        >
                                                                            <div className="flag va" bis_skin_checked={1} />
                                                                            <span className="country-name">Vatican</span>
                                                                            <span className="dial-code">+379</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={58}
                                                                            data-country-code="ve"
                                                                        >
                                                                            <div className="flag ve" bis_skin_checked={1} />
                                                                            <span className="country-name">Venezuela</span>
                                                                            <span className="dial-code">+58</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={84}
                                                                            data-country-code="vn"
                                                                        >
                                                                            <div className="flag vn" bis_skin_checked={1} />
                                                                            <span className="country-name">Vietnam</span>
                                                                            <span className="dial-code">+84</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={212}
                                                                            data-country-code="eh"
                                                                        >
                                                                            <div className="flag eh" bis_skin_checked={1} />
                                                                            <span className="country-name">
                                                                                Western Sahara
                                                                            </span>
                                                                            <span className="dial-code">+212</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={967}
                                                                            data-country-code="ye"
                                                                        >
                                                                            <div className="flag ye" bis_skin_checked={1} />
                                                                            <span className="country-name">Yemen</span>
                                                                            <span className="dial-code">+967</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={260}
                                                                            data-country-code="zm"
                                                                        >
                                                                            <div className="flag zm" bis_skin_checked={1} />
                                                                            <span className="country-name">Zambia</span>
                                                                            <span className="dial-code">+260</span>
                                                                        </li>
                                                                        <li
                                                                            className="country"
                                                                            data-dial-code={263}
                                                                            data-country-code="zw"
                                                                        >
                                                                            <div className="flag zw" bis_skin_checked={1} />
                                                                            <span className="country-name">Zimbabwe</span>
                                                                            <span className="dial-code">+263</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <input
                                                                    className="nonvalidateTxt"
                                                                    id="PhoneCode"
                                                                    name="flightBookingRequest.Contact.Intcode"
                                                                    placeholder="e.g"
                                                                    readOnly="True"
                                                                    type="tel"
                                                                    defaultValue={+1}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9 col-xs-12" bis_skin_checked={1}>
                                                        <div className="row" bis_skin_checked={1}>
                                                            <div
                                                                className="col-sm-6 col-xs-12"
                                                                bis_skin_checked={1}
                                                            >
                                                                <label className="label_hide_mobile">
                                                                    Billing Phone Number
                                                                    <span className="required">*</span>
                                                                </label>
                                                                <input
                                                                    autoComplete="off"
                                                                    className="phone-number Payment numeric"
                                                                    id="flightBookingRequest_Contact_BillingPhone"
                                                                    ref={phoneRef}
                                                                    maxLength={15}
                                                                    minLength={10}
                                                                    name="flightBookingRequest.Contact.BillingPhone"
                                                                    placeholder="Billing Phone Number"
                                                                    type="tel"
                                                                    defaultValue=""
                                                                />
                                                                <label
                                                                    id="us_sms"
                                                                    style={{
                                                                        fontSize: 13,
                                                                        top: "-8px",
                                                                        position: "relative"
                                                                    }}
                                                                >
                                                                    (Booking Details Via SMS)
                                                                </label>
                                                                <span
                                                                    className="field-validation-valid"
                                                                    data-valmsg-for="flightBookingRequest.Contact.BillingPhone"
                                                                    data-valmsg-replace="true"
                                                                />
                                                                <span className="required_mobile">*</span>
                                                            </div>
                                                            <div
                                                                className="col-sm-6 col-xs-12"
                                                                bis_skin_checked={1}
                                                            >
                                                                <label className="label_hide_mobile">
                                                                    Alternate Phone Number
                                                                </label>
                                                                <input
                                                                    autoComplete="off"
                                                                    className="phone-number  nonvalidateTxt numeric"
                                                                    id="flightBookingRequest_Contact_AlternatePhone"
                                                                    maxLength={15}
                                                                    minLength={10}
                                                                    ref={alternateNumRef}
                                                                    name="flightBookingRequest.Contact.AlternatePhone"
                                                                    placeholder="Alternate Phone Number"
                                                                    type="tel"
                                                                    defaultValue=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="imp-msg contact_sms_check" bis_skin_checked={1}>
                                            <div
                                                className="mb20"
                                                style={{ color: "red", display: "none" }}
                                                id="altntext"
                                                bis_skin_checked={1}
                                            >
                                                Alternate number (if provided) must be different from billing
                                                phone number.
                                            </div>
                                            <div className="inputSet" bis_skin_checked={1}>
                                                <label>
                                                    <input
                                                        defaultChecked="checked"
                                                        data-val="true"
                                                        data-val-required="The IsSubscribed field is required."
                                                        id="flightBookingRequest_IsSubscribed"
                                                        name="flightBookingRequest.IsSubscribed"
                                                        type="checkbox"
                                                        defaultValue="true"
                                                    />
                                                    <input
                                                        name="flightBookingRequest.IsSubscribed"
                                                        type="hidden"
                                                        defaultValue="false"
                                                    />
                                                    <span />
                                                </label>
                                                Send me latest travel deals and special offers via email
                                                and/or SMS.
                                            </div>
                                            <div className="mb20" bis_skin_checked={1}>
                                                <b style={{ color: "#ff7f00" }}>

                                                    <i className="fa fa-warning" /> Important!
                                                </b>
                                                Provide your valid email and phone number to receive e-tickets
                                                and your flight updates.
                                            </div>
                                        </div>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                            <button style={{ backgroundColor: "#0066b2", color: "white", fontWeight: 500, textAlign: "center", border: 0, padding: "10px" }} onClick={handleCustomerDetailCollection} >Proceed to add travellers <i class="fa-solid fa-angles-down"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div id="div_Traveler" className="step2" bis_skin_checked={1}>
                                    {formedFilled && <div className="form-box" bis_skin_checked={1}>
                                        <div className="mainheading" bis_skin_checked={1}>
                                            <img
                                                src="/assets/images/svg/p-traveller-information.svg"
                                                className="icon traveller-info"
                                            />
                                            Traveler Information
                                        </div>
                                        <input
                                            data-val="true"
                                            data-val-number="The field Count must be a number."
                                            data-val-required="The Count field is required."
                                            id="flightBookingRequest_PassengerList_Count"
                                            name="flightBookingRequest.PassengerList.Count"
                                            type="hidden"
                                            defaultValue={1}
                                        />
                                        <input
                                            data-val="true"
                                            data-val-number="The field Gds must be a number."
                                            data-val-required="The Gds field is required."
                                            id="flightBookingRequest_Flight_Gds"
                                            name="flightBookingRequest.Flight.Gds"
                                            type="hidden"
                                            defaultValue={114}
                                        />
                                        <input type="hidden" id="hvtflgg" defaultValue="false" />
                                        <input type="hidden" id="valc" defaultValue="AI" />
                                        <input
                                            data-val="true"
                                            data-val-required="The PassengerType field is required."
                                            id="flightBookingRequest_PassengerList_0__PassengerType"
                                            name="flightBookingRequest.PassengerList[0].PassengerType"
                                            type="hidden"
                                            defaultValue="Adult"
                                        />
                                        <input
                                            data-val="true"
                                            data-val-required="The IsLeadPassenger field is required."
                                            id="flightBookingRequest_PassengerList_0__IsLeadPassenger"
                                            name="flightBookingRequest.PassengerList[0].IsLeadPassenger"
                                            type="hidden"
                                            defaultValue="True"
                                        />
                                        <input
                                            data-val="true"
                                            data-val-number="The field TravelerNo must be a number."
                                            data-val-required="The TravelerNo field is required."
                                            id="flightBookingRequest_PassengerList_0__TravelerNo"
                                            name="flightBookingRequest.PassengerList[0].TravelerNo"
                                            type="hidden"
                                            defaultValue={1}
                                        />
                                        <div className="head" id="p0_wrapper" bis_skin_checked={1}>
                                            Adult 1
                                            <p>Passenger details must match your passport or photo ID</p>
                                        </div>
                                        <div className="gender-type" bis_skin_checked={1}>
                                            <ul>
                                                <li>
                                                    <div className="inputSet" bis_skin_checked={1}>
                                                        <label>
                                                            <input
                                                                defaultChecked="checked"
                                                                data-val="true"
                                                                data-val-number="The field Gender must be a number."
                                                                data-val-required="The Gender field is required."
                                                                id="flightBookingRequest_PassengerList_0__Gender"
                                                                name="flightBookingRequest.PassengerList[0].Gender"
                                                                onclick="selectTitle(0, 1 )"
                                                                type="radio"
                                                                defaultValue={1}
                                                            />
                                                            <span>Male</span>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="inputSet" bis_skin_checked={1}>
                                                        <label>
                                                            <input
                                                                id="flightBookingRequest_PassengerList_0__Gender"
                                                                name="flightBookingRequest.PassengerList[0].Gender"
                                                                onclick="selectTitle(0, 2 )"
                                                                type="radio"
                                                                defaultValue={2}
                                                            />
                                                            <span>Female</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="clearfix" bis_skin_checked={1} />
                                        </div>
                                        <div className="row" bis_skin_checked={1}>
                                            <div className="col-sm-5 col-xs-12" bis_skin_checked={1}>
                                                <label className="label_hide_mobile">
                                                    First Name<span className="required">*</span>
                                                </label>
                                                <input
                                                    className="Traveler esname alphanumeric"
                                                    data-val="true"
                                                    data-val-required="The FirstName field is required."
                                                    id="flightBookingRequest_PassengerList_0__FirstName"
                                                    maxLength={54}
                                                    name="flightBookingRequest.PassengerList[0].FirstName"
                                                    placeholder="First Name"
                                                    type="text"
                                                    defaultValue=""
                                                />
                                                <span
                                                    className="field-validation-valid"
                                                    data-valmsg-for="flightBookingRequest.PassengerList[0].FirstName"
                                                    data-valmsg-replace="true"
                                                />
                                                <span className="required_mobile">*</span>
                                            </div>
                                            <div className="col-sm-5 col-xs-12" bis_skin_checked={1}>
                                                <label className="label_hide_mobile">
                                                    Middle Name<small> (Optional)</small>
                                                </label>
                                                <input
                                                    className="nonvalidateTxt esname alphanumeric"
                                                    id="flightBookingRequest_PassengerList_0__MiddleName"
                                                    maxLength={54}
                                                    name="flightBookingRequest.PassengerList[0].MiddleName"
                                                    onBlur={() => printEvent()}
                                                    placeholder="Middle Name (Optional)"
                                                    type="text"
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>
                                        <div className="row" bis_skin_checked={1}>
                                            <div className="col-sm-5 col-xs-12" bis_skin_checked={1}>
                                                <label className="label_hide_mobile">
                                                    Last Name<span className="required">*</span>
                                                </label>
                                                <input
                                                    className="Traveler esname alphanumeric"
                                                    data-val="true"
                                                    data-val-required="The LastName field is required."
                                                    id="flightBookingRequest_PassengerList_0__LastName"
                                                    maxLength={54}
                                                    name="flightBookingRequest.PassengerList[0].LastName"
                                                    placeholder="Last Name"
                                                    type="text"
                                                    defaultValue=""
                                                />
                                                <span
                                                    className="field-validation-valid"
                                                    data-valmsg-for="flightBookingRequest.PassengerList[0].LastName"
                                                    data-valmsg-replace="true"
                                                />
                                                <span className="required_mobile">*</span>
                                            </div>
                                            <div className="col-sm-7 col-xs-12" bis_skin_checked={1}>
                                                <div className="row" bis_skin_checked={1}>
                                                    <div className="col-xs-12" bis_skin_checked={1}>
                                                        <label>
                                                            <span>
                                                                Date of Birth <small>(above 18)</small>
                                                            </span>
                                                            <span className="required">*</span>
                                                        </label>
                                                    </div>
                                                    <div
                                                        className="col-sm-4 col-xs-4 month"
                                                        bis_skin_checked={1}
                                                    >
                                                        <div className="form-righterrow" bis_skin_checked={1}>
                                                            <select
                                                                className="Traveler"
                                                                data-val="true"
                                                                data-val-number="The field DobMonth must be a number."
                                                                data-val-required="The DobMonth field is required."
                                                                id="DobMonth_0"
                                                                name="flightBookingRequest.PassengerList[0].DobMonth"
                                                            >
                                                                <option value="">Month</option>
                                                                <option value={1}>Jan</option>
                                                                <option value={2}>Feb</option>
                                                                <option value={3}>Mar</option>
                                                                <option value={4}>Apr</option>
                                                                <option value={5}>May</option>
                                                                <option value={6}>Jun</option>
                                                                <option value={7}>Jul</option>
                                                                <option value={8}>Aug</option>
                                                                <option value={9}>Sep</option>
                                                                <option value={10}>Oct</option>
                                                                <option value={11}>Nov</option>
                                                                <option value={12}>Dec</option>
                                                            </select>
                                                            <span
                                                                className="field-validation-valid"
                                                                data-valmsg-for="flightBookingRequest.PassengerList[0].DobMonth"
                                                                data-valmsg-replace="true"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4 col-xs-4 day" bis_skin_checked={1}>
                                                        <div className="form-righterrow" bis_skin_checked={1}>
                                                            <select
                                                                className="Traveler"
                                                                id="DobDate_0"
                                                                name="flightBookingRequest.PassengerList[0].DobDate"
                                                                onChange="validateDOB(0, 'Adult')"
                                                            >
                                                                <option value="">Day</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                                <option>6</option>
                                                                <option>7</option>
                                                                <option>8</option>
                                                                <option>9</option>
                                                                <option>10</option>
                                                                <option>11</option>
                                                                <option>12</option>
                                                                <option>13</option>
                                                                <option>14</option>
                                                                <option>15</option>
                                                                <option>16</option>
                                                                <option>17</option>
                                                                <option>18</option>
                                                                <option>19</option>
                                                                <option>20</option>
                                                                <option>21</option>
                                                                <option>22</option>
                                                                <option>23</option>
                                                                <option>24</option>
                                                                <option>25</option>
                                                                <option>26</option>
                                                                <option>27</option>
                                                                <option>28</option>
                                                                <option>29</option>
                                                                <option>30</option>
                                                                <option>31</option>
                                                            </select>
                                                            <span
                                                                className="field-validation-valid"
                                                                data-valmsg-for="flightBookingRequest.PassengerList[0].DobDate"
                                                                data-valmsg-replace="true"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-sm-4 col-xs-4 year"
                                                        bis_skin_checked={1}
                                                    >
                                                        <div className="form-righterrow" bis_skin_checked={1}>
                                                            <select
                                                                className="Traveler"
                                                                id="DobYear_0"
                                                                name="flightBookingRequest.PassengerList[0].DobYear"
                                                                onChange="validateDOB(0, 'Adult')"
                                                            >
                                                                <option value="">Year</option>
                                                                <option>2012</option>
                                                                <option>2011</option>
                                                                <option>2010</option>
                                                                <option>2009</option>
                                                                <option>2008</option>
                                                                <option>2007</option>
                                                                <option>2006</option>
                                                                <option>2005</option>
                                                                <option>2004</option>
                                                                <option>2003</option>
                                                                <option>2002</option>
                                                                <option>2001</option>
                                                                <option>2000</option>
                                                                <option>1999</option>
                                                                <option>1998</option>
                                                                <option>1997</option>
                                                                <option>1996</option>
                                                                <option>1995</option>
                                                                <option>1994</option>
                                                                <option>1993</option>
                                                                <option>1992</option>
                                                                <option>1991</option>
                                                                <option>1990</option>
                                                                <option>1989</option>
                                                                <option>1988</option>
                                                                <option>1987</option>
                                                                <option>1986</option>
                                                                <option>1985</option>
                                                                <option>1984</option>
                                                                <option>1983</option>
                                                                <option>1982</option>
                                                                <option>1981</option>
                                                                <option>1980</option>
                                                                <option>1979</option>
                                                                <option>1978</option>
                                                                <option>1977</option>
                                                                <option>1976</option>
                                                                <option>1975</option>
                                                                <option>1974</option>
                                                                <option>1973</option>
                                                                <option>1972</option>
                                                                <option>1971</option>
                                                                <option>1970</option>
                                                                <option>1969</option>
                                                                <option>1968</option>
                                                                <option>1967</option>
                                                                <option>1966</option>
                                                                <option>1965</option>
                                                                <option>1964</option>
                                                                <option>1963</option>
                                                                <option>1962</option>
                                                                <option>1961</option>
                                                                <option>1960</option>
                                                                <option>1959</option>
                                                                <option>1958</option>
                                                                <option>1957</option>
                                                                <option>1956</option>
                                                                <option>1955</option>
                                                                <option>1954</option>
                                                                <option>1953</option>
                                                                <option>1952</option>
                                                                <option>1951</option>
                                                                <option>1950</option>
                                                                <option>1949</option>
                                                                <option>1948</option>
                                                                <option>1947</option>
                                                                <option>1946</option>
                                                                <option>1945</option>
                                                                <option>1944</option>
                                                                <option>1943</option>
                                                                <option>1942</option>
                                                                <option>1941</option>
                                                                <option>1940</option>
                                                                <option>1939</option>
                                                                <option>1938</option>
                                                                <option>1937</option>
                                                                <option>1936</option>
                                                                <option>1935</option>
                                                                <option>1934</option>
                                                                <option>1933</option>
                                                                <option>1932</option>
                                                                <option>1931</option>
                                                                <option>1930</option>
                                                                <option>1929</option>
                                                                <option>1928</option>
                                                                <option>1927</option>
                                                                <option>1926</option>
                                                                <option>1925</option>
                                                                <option>1924</option>
                                                                <option>1923</option>
                                                                <option>1922</option>
                                                                <option>1921</option>
                                                                <option>1920</option>
                                                                <option>1919</option>
                                                                <option>1918</option>
                                                                <option>1917</option>
                                                                <option>1916</option>
                                                                <option>1915</option>
                                                                <option>1914</option>
                                                                <option>1913</option>
                                                            </select>
                                                            <span
                                                                className="field-validation-valid"
                                                                data-valmsg-for="flightBookingRequest.PassengerList[0].DobYear"
                                                                data-valmsg-replace="true"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            id="dobMsg_0"
                                            style={{
                                                display: "none",
                                                color: "#f00",
                                                paddingBottom: 10,
                                                fontSize: 13
                                            }}
                                            bis_skin_checked={1}
                                        >
                                            <i
                                                className="fa fa-angle-double-right"
                                                style={{ display: "none" }}
                                                id="dobMsgI_0"
                                            />
                                            <i
                                                className="fa fa-angle-double-right"
                                                style={{ display: "none" }}
                                                id="paxMsgI_0"
                                            />
                                        </div>
                                        <div className="imp-msg" bis_skin_checked={1}>
                                            <div className="more-info" bis_skin_checked={1}>
                                                <a
                                                    href="#pasngrOD_0"
                                                    id="pasngrMI_0"
                                                    data-toggle="collapse"
                                                    onclick="showDetail('0');"
                                                    className="collapsed"
                                                    aria-expanded="false"
                                                >
                                                    (+) More Info
                                                </a>
                                                <small className="ffsmall_text">
                                                    (Optional TSA Precheck and Redress Number)
                                                </small>
                                            </div>
                                            <div className="mb20" bis_skin_checked={1} />
                                        </div>
                                        <div
                                            id="pasngrOD_0"
                                            className="pasngrOD_0 collapse"
                                            aria-expanded="false"
                                            bis_skin_checked={1}
                                        >
                                            <div className="row" id="emergency_0" bis_skin_checked={1}>
                                                <div className="col-sm-5 col-xs-12" bis_skin_checked={1}>
                                                    <label>Emergency contact name</label>
                                                    <input
                                                        className="alphanumeric nonvalidateTxt"
                                                        id="flightBookingRequest_Contact_EmergencyContactName"
                                                        name="flightBookingRequest.Contact.EmergencyContactName"
                                                        placeholder="Name"
                                                        type="text"
                                                        defaultValue=""
                                                    />
                                                </div>
                                                <div className="col-sm-7 col-xs-12" bis_skin_checked={1}>
                                                    <div className="row" bis_skin_checked={1}>
                                                        <div className="col-sm-5 col-xs-12" bis_skin_checked={1}>
                                                            <label>Country code</label>
                                                            <div className="country-code mb20" bis_skin_checked={1}>
                                                                <div className="intl-tel-input" bis_skin_checked={1}>
                                                                    <div
                                                                        className="flag-dropdown f16"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <div
                                                                            className="selected-flag"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <div className="flag us" bis_skin_checked={1}>
                                                                                <div
                                                                                    className="down-arrow"
                                                                                    bis_skin_checked={1}
                                                                                ></div>
                                                                            </div>
                                                                        </div>
                                                                        <ul className="country-list hide">
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={93}
                                                                                data-country-code="af"
                                                                            >
                                                                                <div
                                                                                    className="flag af"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Afghanistan
                                                                                </span>
                                                                                <span className="dial-code">+93</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={355}
                                                                                data-country-code="al"
                                                                            >
                                                                                <div
                                                                                    className="flag al"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Albania</span>
                                                                                <span className="dial-code">+355</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={213}
                                                                                data-country-code="dz"
                                                                            >
                                                                                <div
                                                                                    className="flag dz"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Algeria</span>
                                                                                <span className="dial-code">+213</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={1684}
                                                                                data-country-code="as"
                                                                            >
                                                                                <div
                                                                                    className="flag as"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    American Samoa
                                                                                </span>
                                                                                <span className="dial-code">+1684</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={376}
                                                                                data-country-code="ad"
                                                                            >
                                                                                <div
                                                                                    className="flag ad"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Andorra</span>
                                                                                <span className="dial-code">+376</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={244}
                                                                                data-country-code="ao"
                                                                            >
                                                                                <div
                                                                                    className="flag ao"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Angola</span>
                                                                                <span className="dial-code">+244</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={1264}
                                                                                data-country-code="ai"
                                                                            >
                                                                                <div
                                                                                    className="flag ai"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Anguilla</span>
                                                                                <span className="dial-code">+1264</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={672}
                                                                                data-country-code="aq"
                                                                            >
                                                                                <div
                                                                                    className="flag aq"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Antarctica
                                                                                </span>
                                                                                <span className="dial-code">+672</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={1268}
                                                                                data-country-code="ag"
                                                                            >
                                                                                <div
                                                                                    className="flag ag"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Antigua and Barbuda
                                                                                </span>
                                                                                <span className="dial-code">+1268</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={54}
                                                                                data-country-code="ar"
                                                                            >
                                                                                <div
                                                                                    className="flag ar"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Argentina
                                                                                </span>
                                                                                <span className="dial-code">+54</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={374}
                                                                                data-country-code="am"
                                                                            >
                                                                                <div
                                                                                    className="flag am"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Armenia</span>
                                                                                <span className="dial-code">+374</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={297}
                                                                                data-country-code="aw"
                                                                            >
                                                                                <div
                                                                                    className="flag aw"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Aruba</span>
                                                                                <span className="dial-code">+297</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={61}
                                                                                data-country-code="au"
                                                                            >
                                                                                <div
                                                                                    className="flag au"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Australia
                                                                                </span>
                                                                                <span className="dial-code">+61</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={43}
                                                                                data-country-code="at"
                                                                            >
                                                                                <div
                                                                                    className="flag at"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Austria</span>
                                                                                <span className="dial-code">+43</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={994}
                                                                                data-country-code="az"
                                                                            >
                                                                                <div
                                                                                    className="flag az"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Azerbaijan
                                                                                </span>
                                                                                <span className="dial-code">+994</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={1242}
                                                                                data-country-code="bs"
                                                                            >
                                                                                <div
                                                                                    className="flag bs"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Bahamas</span>
                                                                                <span className="dial-code">+1242</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={973}
                                                                                data-country-code="bh"
                                                                            >
                                                                                <div
                                                                                    className="flag bh"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Bahrain</span>
                                                                                <span className="dial-code">+973</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={880}
                                                                                data-country-code="bd"
                                                                            >
                                                                                <div
                                                                                    className="flag bd"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Bangladesh
                                                                                </span>
                                                                                <span className="dial-code">+880</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={1246}
                                                                                data-country-code="bb"
                                                                            >
                                                                                <div
                                                                                    className="flag bb"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Barbados</span>
                                                                                <span className="dial-code">+1246</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={375}
                                                                                data-country-code="by"
                                                                            >
                                                                                <div
                                                                                    className="flag by"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Belarus</span>
                                                                                <span className="dial-code">+375</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={32}
                                                                                data-country-code="be"
                                                                            >
                                                                                <div
                                                                                    className="flag be"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Belgium</span>
                                                                                <span className="dial-code">+32</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={501}
                                                                                data-country-code="bz"
                                                                            >
                                                                                <div
                                                                                    className="flag bz"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Belize</span>
                                                                                <span className="dial-code">+501</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={229}
                                                                                data-country-code="bj"
                                                                            >
                                                                                <div
                                                                                    className="flag bj"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Benin</span>
                                                                                <span className="dial-code">+229</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={1441}
                                                                                data-country-code="bm"
                                                                            >
                                                                                <div
                                                                                    className="flag bm"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Bermuda</span>
                                                                                <span className="dial-code">+1441</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={975}
                                                                                data-country-code="bt"
                                                                            >
                                                                                <div
                                                                                    className="flag bt"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Bhutan</span>
                                                                                <span className="dial-code">+975</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={591}
                                                                                data-country-code="bo"
                                                                            >
                                                                                <div
                                                                                    className="flag bo"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Bolivia</span>
                                                                                <span className="dial-code">+591</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={599}
                                                                                data-country-code="bq"
                                                                            >
                                                                                <div
                                                                                    className="flag bq"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Bonaire, Sint Eustatius and Saba
                                                                                </span>
                                                                                <span className="dial-code">+599</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={387}
                                                                                data-country-code="ba"
                                                                            >
                                                                                <div
                                                                                    className="flag ba"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Bosnia Herzegovina
                                                                                </span>
                                                                                <span className="dial-code">+387</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={267}
                                                                                data-country-code="bw"
                                                                            >
                                                                                <div
                                                                                    className="flag bw"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Botswana</span>
                                                                                <span className="dial-code">+267</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={55}
                                                                                data-country-code="br"
                                                                            >
                                                                                <div
                                                                                    className="flag br"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Brazil</span>
                                                                                <span className="dial-code">+55</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={246}
                                                                                data-country-code="io"
                                                                            >
                                                                                <div
                                                                                    className="flag io"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    British Indian Ocean Territory
                                                                                </span>
                                                                                <span className="dial-code">+246</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={1284}
                                                                                data-country-code="vg"
                                                                            >
                                                                                <div
                                                                                    className="flag vg"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    British Virgin Islands
                                                                                </span>
                                                                                <span className="dial-code">+1284</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={673}
                                                                                data-country-code="bn"
                                                                            >
                                                                                <div
                                                                                    className="flag bn"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Brunei Darussalam
                                                                                </span>
                                                                                <span className="dial-code">+673</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={359}
                                                                                data-country-code="bg"
                                                                            >
                                                                                <div
                                                                                    className="flag bg"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Bulgaria</span>
                                                                                <span className="dial-code">+359</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={226}
                                                                                data-country-code="bf"
                                                                            >
                                                                                <div
                                                                                    className="flag bf"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Burkina Faso
                                                                                </span>
                                                                                <span className="dial-code">+226</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={257}
                                                                                data-country-code="bi"
                                                                            >
                                                                                <div
                                                                                    className="flag bi"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Burundi</span>
                                                                                <span className="dial-code">+257</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={855}
                                                                                data-country-code="kh"
                                                                            >
                                                                                <div
                                                                                    className="flag kh"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Cambodia</span>
                                                                                <span className="dial-code">+855</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={237}
                                                                                data-country-code="cm"
                                                                            >
                                                                                <div
                                                                                    className="flag cm"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Cameroon</span>
                                                                                <span className="dial-code">+237</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={1}
                                                                                data-country-code="ca"
                                                                            >
                                                                                <div
                                                                                    className="flag ca"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Canada</span>
                                                                                <span className="dial-code">+1</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={238}
                                                                                data-country-code="cv"
                                                                            >
                                                                                <div
                                                                                    className="flag cv"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Cape Verde
                                                                                </span>
                                                                                <span className="dial-code">+238</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={1345}
                                                                                data-country-code="ky"
                                                                            >
                                                                                <div
                                                                                    className="flag ky"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Cayman Islands
                                                                                </span>
                                                                                <span className="dial-code">+1345</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={236}
                                                                                data-country-code="cf"
                                                                            >
                                                                                <div
                                                                                    className="flag cf"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Central African Republic
                                                                                </span>
                                                                                <span className="dial-code">+236</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={235}
                                                                                data-country-code="td"
                                                                            >
                                                                                <div
                                                                                    className="flag td"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Chad</span>
                                                                                <span className="dial-code">+235</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={56}
                                                                                data-country-code="cl"
                                                                            >
                                                                                <div
                                                                                    className="flag cl"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">Chile</span>
                                                                                <span className="dial-code">+56</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={86}
                                                                                data-country-code="cn"
                                                                            >
                                                                                <div
                                                                                    className="flag cn"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">China</span>
                                                                                <span className="dial-code">+86</span>
                                                                            </li>
                                                                            <li
                                                                                className="country"
                                                                                data-dial-code={61}
                                                                                data-country-code="cx"
                                                                            >
                                                                                <div
                                                                                    className="flag cx"
                                                                                    bis_skin_checked={1}
                                                                                />
                                                                                <span className="country-name">
                                                                                    Christmas Island
                                                                                </span>
                                                                                <span className="dial-code">+61</span>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{61}"
                                                                                data-country-code="cc"
                                                                            >
                                                                                <div
                                                                                    classname="flag cc"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Cocos Islands
                                                                                    </span>
                                                                                    <span classname="dial-code">+61</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{57}"
                                                                                data-country-code="co"
                                                                            >
                                                                                <div
                                                                                    classname="flag co"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Colombia
                                                                                    </span>
                                                                                    <span classname="dial-code">+57</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{269}"
                                                                                data-country-code="km"
                                                                            >
                                                                                <div
                                                                                    classname="flag km"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Comoros
                                                                                    </span>
                                                                                    <span classname="dial-code">+269</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{682}"
                                                                                data-country-code="ck"
                                                                            >
                                                                                <div
                                                                                    classname="flag ck"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Cook Islands
                                                                                    </span>
                                                                                    <span classname="dial-code">+682</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{506}"
                                                                                data-country-code="cr"
                                                                            >
                                                                                <div
                                                                                    classname="flag cr"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Costa Rica
                                                                                    </span>
                                                                                    <span classname="dial-code">+506</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{385}"
                                                                                data-country-code="hr"
                                                                            >
                                                                                <div
                                                                                    classname="flag hr"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Croatia
                                                                                    </span>
                                                                                    <span classname="dial-code">+385</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{53}"
                                                                                data-country-code="cu"
                                                                            >
                                                                                <div
                                                                                    classname="flag cu"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Cuba</span>
                                                                                    <span classname="dial-code">+53</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{599}"
                                                                                data-country-code="cw"
                                                                            >
                                                                                <div
                                                                                    classname="flag cw"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Curacao
                                                                                    </span>
                                                                                    <span classname="dial-code">+599</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{357}"
                                                                                data-country-code="cy"
                                                                            >
                                                                                <div
                                                                                    classname="flag cy"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Cyprus</span>
                                                                                    <span classname="dial-code">+357</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{420}"
                                                                                data-country-code="cz"
                                                                            >
                                                                                <div
                                                                                    classname="flag cz"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Czech Republic
                                                                                    </span>
                                                                                    <span classname="dial-code">+420</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{243}"
                                                                                data-country-code="cd"
                                                                            >
                                                                                <div
                                                                                    classname="flag cd"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Democratic Republic of the Congo
                                                                                    </span>
                                                                                    <span classname="dial-code">+243</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{45}"
                                                                                data-country-code="dk"
                                                                            >
                                                                                <div
                                                                                    classname="flag dk"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Denmark
                                                                                    </span>
                                                                                    <span classname="dial-code">+45</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{253}"
                                                                                data-country-code="dj"
                                                                            >
                                                                                <div
                                                                                    classname="flag dj"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Djibouti
                                                                                    </span>
                                                                                    <span classname="dial-code">+253</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1767}"
                                                                                data-country-code="dm"
                                                                            >
                                                                                <div
                                                                                    classname="flag dm"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Dominica
                                                                                    </span>
                                                                                    <span classname="dial-code">+1767</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1849}"
                                                                                data-country-code="do"
                                                                            >
                                                                                <div
                                                                                    classname="flag do"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Dominican Republic
                                                                                    </span>
                                                                                    <span classname="dial-code">+1849</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{670}"
                                                                                data-country-code="tl"
                                                                            >
                                                                                <div
                                                                                    classname="flag tl"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        East Timor
                                                                                    </span>
                                                                                    <span classname="dial-code">+670</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{593}"
                                                                                data-country-code="ec"
                                                                            >
                                                                                <div
                                                                                    classname="flag ec"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Ecuador
                                                                                    </span>
                                                                                    <span classname="dial-code">+593</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{20}"
                                                                                data-country-code="eg"
                                                                            >
                                                                                <div
                                                                                    classname="flag eg"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Egypt</span>
                                                                                    <span classname="dial-code">+20</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{503}"
                                                                                data-country-code="sv"
                                                                            >
                                                                                <div
                                                                                    classname="flag sv"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        El Salvador
                                                                                    </span>
                                                                                    <span classname="dial-code">+503</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{240}"
                                                                                data-country-code="gq"
                                                                            >
                                                                                <div
                                                                                    classname="flag gq"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Equatorial Guinea
                                                                                    </span>
                                                                                    <span classname="dial-code">+240</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{291}"
                                                                                data-country-code="er"
                                                                            >
                                                                                <div
                                                                                    classname="flag er"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Eritrea
                                                                                    </span>
                                                                                    <span classname="dial-code">+291</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{372}"
                                                                                data-country-code="ee"
                                                                            >
                                                                                <div
                                                                                    classname="flag ee"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Estonia
                                                                                    </span>
                                                                                    <span classname="dial-code">+372</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{268}"
                                                                                data-country-code="sz"
                                                                            >
                                                                                <div
                                                                                    classname="flag sz"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Eswatini
                                                                                    </span>
                                                                                    <span classname="dial-code">+268</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{251}"
                                                                                data-country-code="et"
                                                                            >
                                                                                <div
                                                                                    classname="flag et"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Ethiopia
                                                                                    </span>
                                                                                    <span classname="dial-code">+251</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{500}"
                                                                                data-country-code="fk"
                                                                            >
                                                                                <div
                                                                                    classname="flag fk"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Falkland Islands
                                                                                    </span>
                                                                                    <span classname="dial-code">+500</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{298}"
                                                                                data-country-code="fo"
                                                                            >
                                                                                <div
                                                                                    classname="flag fo"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Faroe Islands
                                                                                    </span>
                                                                                    <span classname="dial-code">+298</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{679}"
                                                                                data-country-code="fj"
                                                                            >
                                                                                <div
                                                                                    classname="flag fj"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Fiji</span>
                                                                                    <span classname="dial-code">+679</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{358}"
                                                                                data-country-code="fi"
                                                                            >
                                                                                <div
                                                                                    classname="flag fi"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Finland
                                                                                    </span>
                                                                                    <span classname="dial-code">+358</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{33}"
                                                                                data-country-code="fr"
                                                                            >
                                                                                <div
                                                                                    classname="flag fr"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">France</span>
                                                                                    <span classname="dial-code">+33</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{594}"
                                                                                data-country-code="gf"
                                                                            >
                                                                                <div
                                                                                    classname="flag gf"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        French Guiana
                                                                                    </span>
                                                                                    <span classname="dial-code">+594</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{689}"
                                                                                data-country-code="pf"
                                                                            >
                                                                                <div
                                                                                    classname="flag pf"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        French Polynesia
                                                                                    </span>
                                                                                    <span classname="dial-code">+689</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{241}"
                                                                                data-country-code="ga"
                                                                            >
                                                                                <div
                                                                                    classname="flag ga"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Gabon</span>
                                                                                    <span classname="dial-code">+241</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{220}"
                                                                                data-country-code="gm"
                                                                            >
                                                                                <div
                                                                                    classname="flag gm"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Gambia</span>
                                                                                    <span classname="dial-code">+220</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{995}"
                                                                                data-country-code="ge"
                                                                            >
                                                                                <div
                                                                                    classname="flag ge"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Georgia
                                                                                    </span>
                                                                                    <span classname="dial-code">+995</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{49}"
                                                                                data-country-code="de"
                                                                            >
                                                                                <div
                                                                                    classname="flag de"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Germany
                                                                                    </span>
                                                                                    <span classname="dial-code">+49</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{233}"
                                                                                data-country-code="gh"
                                                                            >
                                                                                <div
                                                                                    classname="flag gh"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Ghana</span>
                                                                                    <span classname="dial-code">+233</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{350}"
                                                                                data-country-code="gi"
                                                                            >
                                                                                <div
                                                                                    classname="flag gi"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Gibraltar
                                                                                    </span>
                                                                                    <span classname="dial-code">+350</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{30}"
                                                                                data-country-code="gr"
                                                                            >
                                                                                <div
                                                                                    classname="flag gr"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Greece</span>
                                                                                    <span classname="dial-code">+30</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{299}"
                                                                                data-country-code="gl"
                                                                            >
                                                                                <div
                                                                                    classname="flag gl"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Greenland
                                                                                    </span>
                                                                                    <span classname="dial-code">+299</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1473}"
                                                                                data-country-code="gd"
                                                                            >
                                                                                <div
                                                                                    classname="flag gd"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Grenada
                                                                                    </span>
                                                                                    <span classname="dial-code">+1473</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{590}"
                                                                                data-country-code="gp"
                                                                            >
                                                                                <div
                                                                                    classname="flag gp"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Guadeloupe
                                                                                    </span>
                                                                                    <span classname="dial-code">+590</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1671}"
                                                                                data-country-code="gu"
                                                                            >
                                                                                <div
                                                                                    classname="flag gu"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Guam</span>
                                                                                    <span classname="dial-code">+1671</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{502}"
                                                                                data-country-code="gt"
                                                                            >
                                                                                <div
                                                                                    classname="flag gt"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Guatemala
                                                                                    </span>
                                                                                    <span classname="dial-code">+502</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{441481}"
                                                                                data-country-code="gg"
                                                                            >
                                                                                <div
                                                                                    classname="flag gg"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Guernsey
                                                                                    </span>
                                                                                    <span classname="dial-code">+441481</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{224}"
                                                                                data-country-code="gn"
                                                                            >
                                                                                <div
                                                                                    classname="flag gn"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Guinea</span>
                                                                                    <span classname="dial-code">+224</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{245}"
                                                                                data-country-code="gw"
                                                                            >
                                                                                <div
                                                                                    classname="flag gw"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Guinea-Bissau
                                                                                    </span>
                                                                                    <span classname="dial-code">+245</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{592}"
                                                                                data-country-code="gy"
                                                                            >
                                                                                <div
                                                                                    classname="flag gy"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Guyana</span>
                                                                                    <span classname="dial-code">+592</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{509}"
                                                                                data-country-code="ht"
                                                                            >
                                                                                <div
                                                                                    classname="flag ht"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Haiti</span>
                                                                                    <span classname="dial-code">+509</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{672}"
                                                                                data-country-code="hm"
                                                                            >
                                                                                <div
                                                                                    classname="flag hm"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Heard Island and McDonald Islands
                                                                                    </span>
                                                                                    <span classname="dial-code">+672</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{504}"
                                                                                data-country-code="hn"
                                                                            >
                                                                                <div
                                                                                    classname="flag hn"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Honduras
                                                                                    </span>
                                                                                    <span classname="dial-code">+504</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{852}"
                                                                                data-country-code="hk"
                                                                            >
                                                                                <div
                                                                                    classname="flag hk"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Hong Kong
                                                                                    </span>
                                                                                    <span classname="dial-code">+852</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{36}"
                                                                                data-country-code="hu"
                                                                            >
                                                                                <div
                                                                                    classname="flag hu"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Hungary
                                                                                    </span>
                                                                                    <span classname="dial-code">+36</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{354}"
                                                                                data-country-code="is"
                                                                            >
                                                                                <div
                                                                                    classname="flag is"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Iceland
                                                                                    </span>
                                                                                    <span classname="dial-code">+354</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{91}"
                                                                                data-country-code="in"
                                                                            >
                                                                                <div
                                                                                    classname="flag in"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">India</span>
                                                                                    <span classname="dial-code">+91</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{62}"
                                                                                data-country-code="id"
                                                                            >
                                                                                <div
                                                                                    classname="flag id"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Indonesia
                                                                                    </span>
                                                                                    <span classname="dial-code">+62</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{98}"
                                                                                data-country-code="ir"
                                                                            >
                                                                                <div
                                                                                    classname="flag ir"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Iran</span>
                                                                                    <span classname="dial-code">+98</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{964}"
                                                                                data-country-code="iq"
                                                                            >
                                                                                <div
                                                                                    classname="flag iq"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Iraq</span>
                                                                                    <span classname="dial-code">+964</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{353}"
                                                                                data-country-code="ie"
                                                                            >
                                                                                <div
                                                                                    classname="flag ie"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Ireland
                                                                                    </span>
                                                                                    <span classname="dial-code">+353</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{441624}"
                                                                                data-country-code="im"
                                                                            >
                                                                                <div
                                                                                    classname="flag im"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Isle of Man
                                                                                    </span>
                                                                                    <span classname="dial-code">+441624</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{972}"
                                                                                data-country-code="il"
                                                                            >
                                                                                <div
                                                                                    classname="flag il"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Israel</span>
                                                                                    <span classname="dial-code">+972</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{39}"
                                                                                data-country-code="it"
                                                                            >
                                                                                <div
                                                                                    classname="flag it"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Italy</span>
                                                                                    <span classname="dial-code">+39</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{225}"
                                                                                data-country-code="ci"
                                                                            >
                                                                                <div
                                                                                    classname="flag ci"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Ivory Coast
                                                                                    </span>
                                                                                    <span classname="dial-code">+225</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1876}"
                                                                                data-country-code="jm"
                                                                            >
                                                                                <div
                                                                                    classname="flag jm"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Jamaica
                                                                                    </span>
                                                                                    <span classname="dial-code">+1876</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{81}"
                                                                                data-country-code="jp"
                                                                            >
                                                                                <div
                                                                                    classname="flag jp"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Japan</span>
                                                                                    <span classname="dial-code">+81</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{441534}"
                                                                                data-country-code="je"
                                                                            >
                                                                                <div
                                                                                    classname="flag je"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Jersey</span>
                                                                                    <span classname="dial-code">+441534</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{962}"
                                                                                data-country-code="jo"
                                                                            >
                                                                                <div
                                                                                    classname="flag jo"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Jordan</span>
                                                                                    <span classname="dial-code">+962</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{7}"
                                                                                data-country-code="kz"
                                                                            >
                                                                                <div
                                                                                    classname="flag kz"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Kazakhstan
                                                                                    </span>
                                                                                    <span classname="dial-code">+7</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{254}"
                                                                                data-country-code="ke"
                                                                            >
                                                                                <div
                                                                                    classname="flag ke"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Kenya</span>
                                                                                    <span classname="dial-code">+254</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{686}"
                                                                                data-country-code="ki"
                                                                            >
                                                                                <div
                                                                                    classname="flag ki"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Kiribati
                                                                                    </span>
                                                                                    <span classname="dial-code">+686</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{965}"
                                                                                data-country-code="kw"
                                                                            >
                                                                                <div
                                                                                    classname="flag kw"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Kuwait</span>
                                                                                    <span classname="dial-code">+965</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{996}"
                                                                                data-country-code="kg"
                                                                            >
                                                                                <div
                                                                                    classname="flag kg"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Kyrgyzstan
                                                                                    </span>
                                                                                    <span classname="dial-code">+996</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{856}"
                                                                                data-country-code="la"
                                                                            >
                                                                                <div
                                                                                    classname="flag la"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Lao Peoples Democratic Republic
                                                                                    </span>
                                                                                    <span classname="dial-code">+856</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{371}"
                                                                                data-country-code="lv"
                                                                            >
                                                                                <div
                                                                                    classname="flag lv"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Latvia</span>
                                                                                    <span classname="dial-code">+371</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{961}"
                                                                                data-country-code="lb"
                                                                            >
                                                                                <div
                                                                                    classname="flag lb"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Lebanon
                                                                                    </span>
                                                                                    <span classname="dial-code">+961</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{266}"
                                                                                data-country-code="ls"
                                                                            >
                                                                                <div
                                                                                    classname="flag ls"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Lesotho
                                                                                    </span>
                                                                                    <span classname="dial-code">+266</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{231}"
                                                                                data-country-code="lr"
                                                                            >
                                                                                <div
                                                                                    classname="flag lr"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Liberia
                                                                                    </span>
                                                                                    <span classname="dial-code">+231</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{218}"
                                                                                data-country-code="ly"
                                                                            >
                                                                                <div
                                                                                    classname="flag ly"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Libya</span>
                                                                                    <span classname="dial-code">+218</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{423}"
                                                                                data-country-code="li"
                                                                            >
                                                                                <div
                                                                                    classname="flag li"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Liechtenstein
                                                                                    </span>
                                                                                    <span classname="dial-code">+423</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{370}"
                                                                                data-country-code="lt"
                                                                            >
                                                                                <div
                                                                                    classname="flag lt"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Lithuania
                                                                                    </span>
                                                                                    <span classname="dial-code">+370</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{352}"
                                                                                data-country-code="lu"
                                                                            >
                                                                                <div
                                                                                    classname="flag lu"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Luxembourg
                                                                                    </span>
                                                                                    <span classname="dial-code">+352</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{853}"
                                                                                data-country-code="mo"
                                                                            >
                                                                                <div
                                                                                    classname="flag mo"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Macau</span>
                                                                                    <span classname="dial-code">+853</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{261}"
                                                                                data-country-code="mg"
                                                                            >
                                                                                <div
                                                                                    classname="flag mg"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Madagascar
                                                                                    </span>
                                                                                    <span classname="dial-code">+261</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{265}"
                                                                                data-country-code="mw"
                                                                            >
                                                                                <div
                                                                                    classname="flag mw"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Malawi</span>
                                                                                    <span classname="dial-code">+265</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{60}"
                                                                                data-country-code="my"
                                                                            >
                                                                                <div
                                                                                    classname="flag my"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Malaysia
                                                                                    </span>
                                                                                    <span classname="dial-code">+60</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{960}"
                                                                                data-country-code="mv"
                                                                            >
                                                                                <div
                                                                                    classname="flag mv"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Maldives
                                                                                    </span>
                                                                                    <span classname="dial-code">+960</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{223}"
                                                                                data-country-code="ml"
                                                                            >
                                                                                <div
                                                                                    classname="flag ml"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Mali</span>
                                                                                    <span classname="dial-code">+223</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{356}"
                                                                                data-country-code="mt"
                                                                            >
                                                                                <div
                                                                                    classname="flag mt"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Malta</span>
                                                                                    <span classname="dial-code">+356</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{692}"
                                                                                data-country-code="mh"
                                                                            >
                                                                                <div
                                                                                    classname="flag mh"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Marshall Islands
                                                                                    </span>
                                                                                    <span classname="dial-code">+692</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{596}"
                                                                                data-country-code="mq"
                                                                            >
                                                                                <div
                                                                                    classname="flag mq"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Martinique
                                                                                    </span>
                                                                                    <span classname="dial-code">+596</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{222}"
                                                                                data-country-code="mr"
                                                                            >
                                                                                <div
                                                                                    classname="flag mr"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Mauritania
                                                                                    </span>
                                                                                    <span classname="dial-code">+222</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{230}"
                                                                                data-country-code="mu"
                                                                            >
                                                                                <div
                                                                                    classname="flag mu"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Mauritius
                                                                                    </span>
                                                                                    <span classname="dial-code">+230</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{262}"
                                                                                data-country-code="yt"
                                                                            >
                                                                                <div
                                                                                    classname="flag yt"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Mayotte
                                                                                    </span>
                                                                                    <span classname="dial-code">+262</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{52}"
                                                                                data-country-code="mx"
                                                                            >
                                                                                <div
                                                                                    classname="flag mx"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Mexico</span>
                                                                                    <span classname="dial-code">+52</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{691}"
                                                                                data-country-code="fm"
                                                                            >
                                                                                <div
                                                                                    classname="flag fm"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Micronesia
                                                                                    </span>
                                                                                    <span classname="dial-code">+691</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{373}"
                                                                                data-country-code="md"
                                                                            >
                                                                                <div
                                                                                    classname="flag md"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Moldova
                                                                                    </span>
                                                                                    <span classname="dial-code">+373</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{377}"
                                                                                data-country-code="mc"
                                                                            >
                                                                                <div
                                                                                    classname="flag mc"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Monaco</span>
                                                                                    <span classname="dial-code">+377</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{976}"
                                                                                data-country-code="mn"
                                                                            >
                                                                                <div
                                                                                    classname="flag mn"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Mongolia
                                                                                    </span>
                                                                                    <span classname="dial-code">+976</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{382}"
                                                                                data-country-code="me"
                                                                            >
                                                                                <div
                                                                                    classname="flag me"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Montenegro
                                                                                    </span>
                                                                                    <span classname="dial-code">+382</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1664}"
                                                                                data-country-code="ms"
                                                                            >
                                                                                <div
                                                                                    classname="flag ms"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Montserrat
                                                                                    </span>
                                                                                    <span classname="dial-code">+1664</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{212}"
                                                                                data-country-code="ma"
                                                                            >
                                                                                <div
                                                                                    classname="flag ma"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Morocco
                                                                                    </span>
                                                                                    <span classname="dial-code">+212</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{258}"
                                                                                data-country-code="mz"
                                                                            >
                                                                                <div
                                                                                    classname="flag mz"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Mozambique
                                                                                    </span>
                                                                                    <span classname="dial-code">+258</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{95}"
                                                                                data-country-code="mm"
                                                                            >
                                                                                <div
                                                                                    classname="flag mm"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Myanmar
                                                                                    </span>
                                                                                    <span classname="dial-code">+95</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{264}"
                                                                                data-country-code="na"
                                                                            >
                                                                                <div
                                                                                    classname="flag na"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Namibia
                                                                                    </span>
                                                                                    <span classname="dial-code">+264</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{674}"
                                                                                data-country-code="nr"
                                                                            >
                                                                                <div
                                                                                    classname="flag nr"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Nauru</span>
                                                                                    <span classname="dial-code">+674</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{977}"
                                                                                data-country-code="np"
                                                                            >
                                                                                <div
                                                                                    classname="flag np"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Nepal</span>
                                                                                    <span classname="dial-code">+977</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{31}"
                                                                                data-country-code="nl"
                                                                            >
                                                                                <div
                                                                                    classname="flag nl"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Netherlands
                                                                                    </span>
                                                                                    <span classname="dial-code">+31</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{687}"
                                                                                data-country-code="nc"
                                                                            >
                                                                                <div
                                                                                    classname="flag nc"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        New Caledonia
                                                                                    </span>
                                                                                    <span classname="dial-code">+687</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{64}"
                                                                                data-country-code="nz"
                                                                            >
                                                                                <div
                                                                                    classname="flag nz"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        New Zealand
                                                                                    </span>
                                                                                    <span classname="dial-code">+64</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{505}"
                                                                                data-country-code="ni"
                                                                            >
                                                                                <div
                                                                                    classname="flag ni"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Nicaragua
                                                                                    </span>
                                                                                    <span classname="dial-code">+505</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{227}"
                                                                                data-country-code="ne"
                                                                            >
                                                                                <div
                                                                                    classname="flag ne"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Niger</span>
                                                                                    <span classname="dial-code">+227</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{234}"
                                                                                data-country-code="ng"
                                                                            >
                                                                                <div
                                                                                    classname="flag ng"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Nigeria
                                                                                    </span>
                                                                                    <span classname="dial-code">+234</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{683}"
                                                                                data-country-code="nu"
                                                                            >
                                                                                <div
                                                                                    classname="flag nu"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Niue</span>
                                                                                    <span classname="dial-code">+683</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{672}"
                                                                                data-country-code="nf"
                                                                            >
                                                                                <div
                                                                                    classname="flag nf"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Norfolk Island
                                                                                    </span>
                                                                                    <span classname="dial-code">+672</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{850}"
                                                                                data-country-code="kp"
                                                                            >
                                                                                <div
                                                                                    classname="flag kp"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        North Korea
                                                                                    </span>
                                                                                    <span classname="dial-code">+850</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1670}"
                                                                                data-country-code="mp"
                                                                            >
                                                                                <div
                                                                                    classname="flag mp"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Northern Mariana Islands
                                                                                    </span>
                                                                                    <span classname="dial-code">+1670</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{47}"
                                                                                data-country-code="no"
                                                                            >
                                                                                <div
                                                                                    classname="flag no"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Norway</span>
                                                                                    <span classname="dial-code">+47</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{968}"
                                                                                data-country-code="om"
                                                                            >
                                                                                <div
                                                                                    classname="flag om"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Oman</span>
                                                                                    <span classname="dial-code">+968</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{92}"
                                                                                data-country-code="pk"
                                                                            >
                                                                                <div
                                                                                    classname="flag pk"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Pakistan
                                                                                    </span>
                                                                                    <span classname="dial-code">+92</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{680}"
                                                                                data-country-code="pw"
                                                                            >
                                                                                <div
                                                                                    classname="flag pw"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Palau</span>
                                                                                    <span classname="dial-code">+680</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{970}"
                                                                                data-country-code="ps"
                                                                            >
                                                                                <div
                                                                                    classname="flag ps"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Palestinian Territory, Occupied
                                                                                    </span>
                                                                                    <span classname="dial-code">+970</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{507}"
                                                                                data-country-code="pa"
                                                                            >
                                                                                <div
                                                                                    classname="flag pa"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Panama</span>
                                                                                    <span classname="dial-code">+507</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{675}"
                                                                                data-country-code="pg"
                                                                            >
                                                                                <div
                                                                                    classname="flag pg"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Papua New Guinea
                                                                                    </span>
                                                                                    <span classname="dial-code">+675</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{595}"
                                                                                data-country-code="py"
                                                                            >
                                                                                <div
                                                                                    classname="flag py"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Paraguay
                                                                                    </span>
                                                                                    <span classname="dial-code">+595</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{51}"
                                                                                data-country-code="pe"
                                                                            >
                                                                                <div
                                                                                    classname="flag pe"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Peru</span>
                                                                                    <span classname="dial-code">+51</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{63}"
                                                                                data-country-code="ph"
                                                                            >
                                                                                <div
                                                                                    classname="flag ph"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Philippines
                                                                                    </span>
                                                                                    <span classname="dial-code">+63</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{64}"
                                                                                data-country-code="pn"
                                                                            >
                                                                                <div
                                                                                    classname="flag pn"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Pitcairn
                                                                                    </span>
                                                                                    <span classname="dial-code">+64</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{48}"
                                                                                data-country-code="pl"
                                                                            >
                                                                                <div
                                                                                    classname="flag pl"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Poland</span>
                                                                                    <span classname="dial-code">+48</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{351}"
                                                                                data-country-code="pt"
                                                                            >
                                                                                <div
                                                                                    classname="flag pt"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Portugal
                                                                                    </span>
                                                                                    <span classname="dial-code">+351</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1787}"
                                                                                data-country-code="pr"
                                                                            >
                                                                                <div
                                                                                    classname="flag pr"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Puerto Rico
                                                                                    </span>
                                                                                    <span classname="dial-code">+1787</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{974}"
                                                                                data-country-code="qa"
                                                                            >
                                                                                <div
                                                                                    classname="flag qa"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Qatar</span>
                                                                                    <span classname="dial-code">+974</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{389}"
                                                                                data-country-code="mk"
                                                                            >
                                                                                <div
                                                                                    classname="flag mk"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Republic of Macedonia
                                                                                    </span>
                                                                                    <span classname="dial-code">+389</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{242}"
                                                                                data-country-code="cg"
                                                                            >
                                                                                <div
                                                                                    classname="flag cg"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Republic of the Congo
                                                                                    </span>
                                                                                    <span classname="dial-code">+242</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{262}"
                                                                                data-country-code="re"
                                                                            >
                                                                                <div
                                                                                    classname="flag re"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Reunion
                                                                                    </span>
                                                                                    <span classname="dial-code">+262</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{40}"
                                                                                data-country-code="ro"
                                                                            >
                                                                                <div
                                                                                    classname="flag ro"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Romania
                                                                                    </span>
                                                                                    <span classname="dial-code">+40</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{7}"
                                                                                data-country-code="ru"
                                                                            >
                                                                                <div
                                                                                    classname="flag ru"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Russia</span>
                                                                                    <span classname="dial-code">+7</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{250}"
                                                                                data-country-code="rw"
                                                                            >
                                                                                <div
                                                                                    classname="flag rw"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Rwanda</span>
                                                                                    <span classname="dial-code">+250</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{590}"
                                                                                data-country-code="bl"
                                                                            >
                                                                                <div
                                                                                    classname="flag bl"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Saint Barthelemy
                                                                                    </span>
                                                                                    <span classname="dial-code">+590</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{290}"
                                                                                data-country-code="sh"
                                                                            >
                                                                                <div
                                                                                    classname="flag sh"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Saint Helena
                                                                                    </span>
                                                                                    <span classname="dial-code">+290</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{590}"
                                                                                data-country-code="mf"
                                                                            >
                                                                                <div
                                                                                    classname="flag mf"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Saint Martin
                                                                                    </span>
                                                                                    <span classname="dial-code">+590</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{685}"
                                                                                data-country-code="ws"
                                                                            >
                                                                                <div
                                                                                    classname="flag ws"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Samoa</span>
                                                                                    <span classname="dial-code">+685</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{378}"
                                                                                data-country-code="sm"
                                                                            >
                                                                                <div
                                                                                    classname="flag sm"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        San Marino
                                                                                    </span>
                                                                                    <span classname="dial-code">+378</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{239}"
                                                                                data-country-code="st"
                                                                            >
                                                                                <div
                                                                                    classname="flag st"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Sao Tome and Principe
                                                                                    </span>
                                                                                    <span classname="dial-code">+239</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{966}"
                                                                                data-country-code="sa"
                                                                            >
                                                                                <div
                                                                                    classname="flag sa"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Saudi Arabia
                                                                                    </span>
                                                                                    <span classname="dial-code">+966</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{221}"
                                                                                data-country-code="sn"
                                                                            >
                                                                                <div
                                                                                    classname="flag sn"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Senegal
                                                                                    </span>
                                                                                    <span classname="dial-code">+221</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{381}"
                                                                                data-country-code="rs"
                                                                            >
                                                                                <div
                                                                                    classname="flag rs"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Serbia</span>
                                                                                    <span classname="dial-code">+381</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{248}"
                                                                                data-country-code="sc"
                                                                            >
                                                                                <div
                                                                                    classname="flag sc"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Seychelles
                                                                                    </span>
                                                                                    <span classname="dial-code">+248</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{232}"
                                                                                data-country-code="sl"
                                                                            >
                                                                                <div
                                                                                    classname="flag sl"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Sierra Leone
                                                                                    </span>
                                                                                    <span classname="dial-code">+232</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{65}"
                                                                                data-country-code="sg"
                                                                            >
                                                                                <div
                                                                                    classname="flag sg"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Singapore
                                                                                    </span>
                                                                                    <span classname="dial-code">+65</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1721}"
                                                                                data-country-code="sx"
                                                                            >
                                                                                <div
                                                                                    classname="flag sx"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Sint Maarten
                                                                                    </span>
                                                                                    <span classname="dial-code">+1721</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{421}"
                                                                                data-country-code="sk"
                                                                            >
                                                                                <div
                                                                                    classname="flag sk"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Slovakia
                                                                                    </span>
                                                                                    <span classname="dial-code">+421</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{386}"
                                                                                data-country-code="si"
                                                                            >
                                                                                <div
                                                                                    classname="flag si"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Slovenia
                                                                                    </span>
                                                                                    <span classname="dial-code">+386</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{677}"
                                                                                data-country-code="sb"
                                                                            >
                                                                                <div
                                                                                    classname="flag sb"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Solomon Islands
                                                                                    </span>
                                                                                    <span classname="dial-code">+677</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{252}"
                                                                                data-country-code="so"
                                                                            >
                                                                                <div
                                                                                    classname="flag so"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Somalia
                                                                                    </span>
                                                                                    <span classname="dial-code">+252</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{27}"
                                                                                data-country-code="za"
                                                                            >
                                                                                <div
                                                                                    classname="flag za"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        South Africa
                                                                                    </span>
                                                                                    <span classname="dial-code">+27</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{500}"
                                                                                data-country-code="gs"
                                                                            >
                                                                                <div
                                                                                    classname="flag gs"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        South Georgia and the South Sandwich
                                                                                        Islands
                                                                                    </span>
                                                                                    <span classname="dial-code">+500</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{82}"
                                                                                data-country-code="kr"
                                                                            >
                                                                                <div
                                                                                    classname="flag kr"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        South Korea
                                                                                    </span>
                                                                                    <span classname="dial-code">+82</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{211}"
                                                                                data-country-code="ss"
                                                                            >
                                                                                <div
                                                                                    classname="flag ss"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        South Sudan
                                                                                    </span>
                                                                                    <span classname="dial-code">+211</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{34}"
                                                                                data-country-code="es"
                                                                            >
                                                                                <div
                                                                                    classname="flag es"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Spain</span>
                                                                                    <span classname="dial-code">+34</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{94}"
                                                                                data-country-code="lk"
                                                                            >
                                                                                <div
                                                                                    classname="flag lk"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Sri Lanka
                                                                                    </span>
                                                                                    <span classname="dial-code">+94</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1869}"
                                                                                data-country-code="kn"
                                                                            >
                                                                                <div
                                                                                    classname="flag kn"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        St. Christopher (St. Kitts) Nevis
                                                                                    </span>
                                                                                    <span classname="dial-code">+1869</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1758}"
                                                                                data-country-code="lc"
                                                                            >
                                                                                <div
                                                                                    classname="flag lc"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        St. Lucia
                                                                                    </span>
                                                                                    <span classname="dial-code">+1758</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{508}"
                                                                                data-country-code="pm"
                                                                            >
                                                                                <div
                                                                                    classname="flag pm"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        St. Pierre and Miquelon
                                                                                    </span>
                                                                                    <span classname="dial-code">+508</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1784}"
                                                                                data-country-code="vc"
                                                                            >
                                                                                <div
                                                                                    classname="flag vc"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        St. Vincent and The Grenadines
                                                                                    </span>
                                                                                    <span classname="dial-code">+1784</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{249}"
                                                                                data-country-code="sd"
                                                                            >
                                                                                <div
                                                                                    classname="flag sd"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Sudan</span>
                                                                                    <span classname="dial-code">+249</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{597}"
                                                                                data-country-code="sr"
                                                                            >
                                                                                <div
                                                                                    classname="flag sr"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Suriname
                                                                                    </span>
                                                                                    <span classname="dial-code">+597</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{47}"
                                                                                data-country-code="sj"
                                                                            >
                                                                                <div
                                                                                    classname="flag sj"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Svalbard and Jan Mayen
                                                                                    </span>
                                                                                    <span classname="dial-code">+47</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{46}"
                                                                                data-country-code="se"
                                                                            >
                                                                                <div
                                                                                    classname="flag se"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Sweden</span>
                                                                                    <span classname="dial-code">+46</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{41}"
                                                                                data-country-code="ch"
                                                                            >
                                                                                <div
                                                                                    classname="flag ch"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Switzerland
                                                                                    </span>
                                                                                    <span classname="dial-code">+41</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{963}"
                                                                                data-country-code="sy"
                                                                            >
                                                                                <div
                                                                                    classname="flag sy"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Syrian Arab Republic
                                                                                    </span>
                                                                                    <span classname="dial-code">+963</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{886}"
                                                                                data-country-code="tw"
                                                                            >
                                                                                <div
                                                                                    classname="flag tw"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Taiwan</span>
                                                                                    <span classname="dial-code">+886</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{992}"
                                                                                data-country-code="tj"
                                                                            >
                                                                                <div
                                                                                    classname="flag tj"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Tajikistan
                                                                                    </span>
                                                                                    <span classname="dial-code">+992</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{255}"
                                                                                data-country-code="tz"
                                                                            >
                                                                                <div
                                                                                    classname="flag tz"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Tanzania
                                                                                    </span>
                                                                                    <span classname="dial-code">+255</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{66}"
                                                                                data-country-code="th"
                                                                            >
                                                                                <div
                                                                                    classname="flag th"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Thailand
                                                                                    </span>
                                                                                    <span classname="dial-code">+66</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{228}"
                                                                                data-country-code="tg"
                                                                            >
                                                                                <div
                                                                                    classname="flag tg"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Togo</span>
                                                                                    <span classname="dial-code">+228</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{690}"
                                                                                data-country-code="tk"
                                                                            >
                                                                                <div
                                                                                    classname="flag tk"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Tokelau
                                                                                    </span>
                                                                                    <span classname="dial-code">+690</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{676}"
                                                                                data-country-code="to"
                                                                            >
                                                                                <div
                                                                                    classname="flag to"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Tonga</span>
                                                                                    <span classname="dial-code">+676</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1868}"
                                                                                data-country-code="tt"
                                                                            >
                                                                                <div
                                                                                    classname="flag tt"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Trinidad and Tobago
                                                                                    </span>
                                                                                    <span classname="dial-code">+1868</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{216}"
                                                                                data-country-code="tn"
                                                                            >
                                                                                <div
                                                                                    classname="flag tn"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Tunisia
                                                                                    </span>
                                                                                    <span classname="dial-code">+216</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{90}"
                                                                                data-country-code="tr"
                                                                            >
                                                                                <div
                                                                                    classname="flag tr"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Turkey</span>
                                                                                    <span classname="dial-code">+90</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{993}"
                                                                                data-country-code="tm"
                                                                            >
                                                                                <div
                                                                                    classname="flag tm"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Turkmenistan
                                                                                    </span>
                                                                                    <span classname="dial-code">+993</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1649}"
                                                                                data-country-code="tc"
                                                                            >
                                                                                <div
                                                                                    classname="flag tc"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Turks and Caicos Islands
                                                                                    </span>
                                                                                    <span classname="dial-code">+1649</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{688}"
                                                                                data-country-code="tv"
                                                                            >
                                                                                <div
                                                                                    classname="flag tv"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Tuvalu</span>
                                                                                    <span classname="dial-code">+688</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{256}"
                                                                                data-country-code="ug"
                                                                            >
                                                                                <div
                                                                                    classname="flag ug"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Uganda</span>
                                                                                    <span classname="dial-code">+256</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{380}"
                                                                                data-country-code="ua"
                                                                            >
                                                                                <div
                                                                                    classname="flag ua"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Ukraine
                                                                                    </span>
                                                                                    <span classname="dial-code">+380</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{971}"
                                                                                data-country-code="ae"
                                                                            >
                                                                                <div
                                                                                    classname="flag ae"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        United Arab Emirates
                                                                                    </span>
                                                                                    <span classname="dial-code">+971</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{44}"
                                                                                data-country-code="gb"
                                                                            >
                                                                                <div
                                                                                    classname="flag gb"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        United Kingdom
                                                                                    </span>
                                                                                    <span classname="dial-code">+44</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country active"
                                                                                data-dial-code="{1}"
                                                                                data-country-code="us"
                                                                            >
                                                                                <div
                                                                                    classname="flag us"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        United States
                                                                                    </span>
                                                                                    <span classname="dial-code">+1</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{246}"
                                                                                data-country-code="um"
                                                                            >
                                                                                <div
                                                                                    classname="flag um"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        United States Minor Outlying Islands (the)
                                                                                    </span>
                                                                                    <span classname="dial-code">+246</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{598}"
                                                                                data-country-code="uy"
                                                                            >
                                                                                <div
                                                                                    classname="flag uy"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Uruguay
                                                                                    </span>
                                                                                    <span classname="dial-code">+598</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{1340}"
                                                                                data-country-code="vi"
                                                                            >
                                                                                <div
                                                                                    classname="flag vi"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        US Virgin Islands
                                                                                    </span>
                                                                                    <span classname="dial-code">+1340</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{998}"
                                                                                data-country-code="uz"
                                                                            >
                                                                                <div
                                                                                    classname="flag uz"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Uzbekistan
                                                                                    </span>
                                                                                    <span classname="dial-code">+998</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{678}"
                                                                                data-country-code="vu"
                                                                            >
                                                                                <div
                                                                                    classname="flag vu"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Vanuatu
                                                                                    </span>
                                                                                    <span classname="dial-code">+678</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{379}"
                                                                                data-country-code="va"
                                                                            >
                                                                                <div
                                                                                    classname="flag va"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Vatican
                                                                                    </span>
                                                                                    <span classname="dial-code">+379</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{58}"
                                                                                data-country-code="ve"
                                                                            >
                                                                                <div
                                                                                    classname="flag ve"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Venezuela
                                                                                    </span>
                                                                                    <span classname="dial-code">+58</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{84}"
                                                                                data-country-code="vn"
                                                                            >
                                                                                <div
                                                                                    classname="flag vn"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Vietnam
                                                                                    </span>
                                                                                    <span classname="dial-code">+84</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{212}"
                                                                                data-country-code="eh"
                                                                            >
                                                                                <div
                                                                                    classname="flag eh"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Western Sahara
                                                                                    </span>
                                                                                    <span classname="dial-code">+212</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{967}"
                                                                                data-country-code="ye"
                                                                            >
                                                                                <div
                                                                                    classname="flag ye"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Yemen</span>
                                                                                    <span classname="dial-code">+967</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{260}"
                                                                                data-country-code="zm"
                                                                            >
                                                                                <div
                                                                                    classname="flag zm"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">Zambia</span>
                                                                                    <span classname="dial-code">+260</span>
                                                                                </div>
                                                                            </li>
                                                                            <li
                                                                                classname="country"
                                                                                data-dial-code="{263}"
                                                                                data-country-code="zw"
                                                                            >
                                                                                <div
                                                                                    classname="flag zw"
                                                                                    bis_skin_checked="{1}"
                                                                                >
                                                                                    <span classname="country-name">
                                                                                        Zimbabwe
                                                                                    </span>
                                                                                    <span classname="dial-code">+263</span>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                        <input
                                                                            classname="nonvalidateTxt"
                                                                            id="PhoneCode2"
                                                                            name="flightBookingRequest.Contact.EmergencyPhoneCode"
                                                                            placeholder="e.g"
                                                                            readOnly="True"
                                                                            type="tel"
                                                                            defaultValue="{+1}"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="col-sm-7 col-xs-12"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <label>Emergency Phone Number</label>
                                                                    <input
                                                                        autoComplete="off"
                                                                        className="phone-number nonvalidateTxt numeric"
                                                                        id="flightBookingRequest_Contact_EmergencyPhoneNumber"
                                                                        maxLength={15}
                                                                        minLength={10}
                                                                        name="flightBookingRequest.Contact.EmergencyPhoneNumber"
                                                                        onKeyUp="limit(this, 15)"
                                                                        type="number"
                                                                        defaultValue=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row" bis_skin_checked={1}>
                                                        <div className="col-sm-6 col-xs-12" bis_skin_checked={1}>
                                                            <label>
                                                                TSA precheck
                                                                <span className="tooltip-custom">
                                                                    <i className="fa fa-info hand" />
                                                                    <div
                                                                        className="promo-detail tsa_tooltip"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <span className="arrow" />
                                                                        <p
                                                                            className="mb5px"
                                                                            style={{ textAlign: "left" }}
                                                                        >
                                                                            The Known Traveler Number is also referred to as
                                                                            Pass ID, TSA PreCheck and Global Entry Number.
                                                                            It can be found on the top-left corner on the
                                                                            back of your Trusted Traveler membership card.
                                                                        </p>
                                                                    </div>
                                                                </span>
                                                            </label>
                                                            <input
                                                                className="nonvalidateTxt alphanumericbothwithoutspace"
                                                                id="flightBookingRequest_PassengerList_0__TSAPrecheckNumber"
                                                                name="flightBookingRequest.PassengerList[0].TSAPrecheckNumber"
                                                                placeholder="Known Traveler Number (Optional)"
                                                                type="text"
                                                                defaultValue=""
                                                            />
                                                        </div>
                                                        <div className="col-sm-6 col-xs-12" bis_skin_checked={1}>
                                                            <label>
                                                                Redress number
                                                                <span className="tooltip-custom">
                                                                    <i className="fa fa-info hand" />
                                                                    <div
                                                                        className="promo-detail tsa_tooltip"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <span className="arrow" />
                                                                        <p
                                                                            className="mb5px"
                                                                            style={{ textAlign: "left" }}
                                                                        >
                                                                            A Redress is a unique number that is assigned to
                                                                            a passenger by the Department of Homeland
                                                                            Security (DHS) for the purpose of promoting the
                                                                            resolution with previous watch list alerts.
                                                                        </p>
                                                                    </div>
                                                                </span>
                                                            </label>
                                                            <input
                                                                className="numeric nonvalidateTxt"
                                                                id="flightBookingRequest_PassengerList_0__TSARedressNumber"
                                                                name="flightBookingRequest.PassengerList[0].TSARedressNumber"
                                                                placeholder="(Optional)"
                                                                type="number"
                                                                defaultValue=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flight-refundable-container" bis_skin_checked={1}>
                                            <div className="main-head refund-label" bis_skin_checked={1}>
                                                <img
                                                    src="/assets/images/svg/p-refund-protected.svg"
                                                    className="rp-icon"
                                                />
                                                Refundable Booking
                                            </div>
                                            <div className="row" bis_skin_checked={1}>
                                                <div className="col-md-12 col-xs-12" bis_skin_checked={1}>
                                                    <div
                                                        className="flight-refundable-content"
                                                        bis_skin_checked={1}
                                                    >
                                                        <div className="refund-subtital" bis_skin_checked={1}>
                                                            Upgrade your booking and receive a <b>100% refund</b> if
                                                            you cannot attend and can evidence one of the many
                                                            reasons in our
                                                            <a
                                                                onclick="window.open('https://www.refundable.me/extended/en/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                href={""}
                                                                className="text-link"
                                                                style={{ color: "#1a58c4" }}
                                                            >
                                                                Terms &amp; Conditions
                                                            </a>
                                                            , which you accept when you select a Refundable Booking.
                                                        </div>
                                                        <div className="covid-txt" bis_skin_checked={1}>
                                                            COVID-19 Infection and Isolation,
                                                            <a
                                                                onclick="window.open('https://www.refundable.me/covid/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                href={""}
                                                                className="text-link"
                                                            >
                                                                see details
                                                            </a>
                                                        </div>
                                                        <div className="refund-details" bis_skin_checked={1}>
                                                            <img
                                                                src="/assets/images/listing/shild.png"
                                                                alt="shild"
                                                                className="icon_image"
                                                            />
                                                            <ul className="fraList">
                                                                <li>
                                                                    Flight refund: <b>($91.40)</b>
                                                                </li>
                                                                <li>Home Emergency</li>
                                                                <li>Illness / Injury (including Covid-19)</li>
                                                                <li>Adverse Weather</li>
                                                                <li>Sickness, Accident and Injury</li>
                                                                <li>Private vehicle failure</li>
                                                                <li>Pre-existing Medical Condition</li>
                                                                <li>Public Transport Failure</li>
                                                                <li className="moreList" style={{ display: "none" }}>
                                                                    <ul>
                                                                        <li>Mechanical Breakdown</li>
                                                                        <li>Jury Service</li>
                                                                        <li>Death of Immediate Family</li>
                                                                        <li>Court Summons</li>
                                                                        <li>Theft of Documents</li>
                                                                        <li>Pregnancy Complication</li>
                                                                        <li>Scheduled airline failure</li>
                                                                        <li>
                                                                            Armed Forces &amp; Emergency Services Recall
                                                                        </li>
                                                                        <li>Flight disruption</li>
                                                                        <li>Relocated for Work</li>
                                                                        <li>Changes to Examination Dates</li>
                                                                    </ul>
                                                                </li>
                                                                <li className="manymore">And Many More...</li>
                                                            </ul>
                                                        </div>
                                                        <div
                                                            className="total-price refund-price"
                                                            bis_skin_checked={1}
                                                        >
                                                            <b>$13.71</b> per person
                                                        </div>
                                                        <div className="row" bis_skin_checked={1}>
                                                            <div
                                                                className="col-sm-6 col-xs-12"
                                                                bis_skin_checked={1}
                                                            >
                                                                <div
                                                                    className="wselection inputSet "
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <label onclick="applyRRefundable('true','13.71')">
                                                                        <input type="radio" name="RefundProtect" />
                                                                        <span>
                                                                            <b>Yes,</b> make my booking refundable
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="col-sm-6 col-xs-12"
                                                                bis_skin_checked={1}
                                                            >
                                                                <div
                                                                    className="wselection inputSet "
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <label onclick="applyRRefundable('false','13.71')">
                                                                        <input type="radio" name="RefundProtect" />
                                                                        <span>
                                                                            <b>No,</b> don't make my booking refundable
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="upgrade-txt hidden" bis_skin_checked={1}>
                                                            <p>
                                                                Upgrade your booking for a small increase of $13.71
                                                                and receive a 100% refund if you cannot attend and can
                                                                <b>provide evidence</b> for one of the many reasons in
                                                                our
                                                                <a
                                                                    onclick="window.open('https://www.refundable.me/extended/en/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                    href={""}
                                                                    className="text-link"
                                                                    style={{ textDecoration: "underline" }}
                                                                >
                                                                    Terms &amp; Conditions
                                                                </a>
                                                                , which you accept when you select a Refundable
                                                                Booking.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <input
                                                data-val="true"
                                                data-val-number="The field RefundProtectAmount must be a number."
                                                data-val-required="The RefundProtectAmount field is required."
                                                id="flightBookingRequest_RefundProtectAmount"
                                                name="flightBookingRequest.RefundProtectAmount"
                                                type="hidden"
                                                defaultValue={0}
                                            />
                                        </div>
                                        <div
                                            className="flightdetails-payment options-container"
                                            id="seatMaindiv"
                                            bis_skin_checked={1}
                                            style={{ display: "none" }}
                                        >
                                            <div className="contents" bis_skin_checked={1}>
                                                <div className="mainheading" bis_skin_checked={1}>

                                                    <img
                                                        src="/assets/images/svg/p-seatmap.svg"
                                                        className="icon seatmap"
                                                    />
                                                    Select Seats (Recommended)
                                                </div>
                                                <div id="_flightseatmapcontainer" bis_skin_checked={1}>
                                                    <div className="row" id="loadshw" bis_skin_checked={1}>

                                                        <div className="col-sm-12" bis_skin_checked={1}>

                                                            <div className="feed-content" bis_skin_checked={1}>

                                                                <h3>Reserve your favorite seats to:</h3>
                                                                <ul>

                                                                    <li>
                                                                        <i className="fa fa-check" aria-hidden="true" />
                                                                        Select your preferred seat(s)
                                                                    </li>
                                                                    <li>
                                                                        <i className="fa fa-check" aria-hidden="true" />
                                                                        Enjoy extra legroom
                                                                    </li>
                                                                    <li>
                                                                        <i className="fa fa-check" aria-hidden="true" />
                                                                        Stream your choice of movies, games, and access
                                                                        other information on your individual video screen
                                                                    </li>
                                                                    <li>
                                                                        <i className="fa fa-check" aria-hidden="true" />
                                                                        Keep your gadgets charged via electronic plug-in
                                                                    </li>
                                                                </ul>
                                                                <img
                                                                    className="seat-image"
                                                                    src="https://cmsrepository.com/static/ancillaries/seatmap//images/seatmap/160/desktop-seat.gif"
                                                                />
                                                                <img
                                                                    className="mobileseat-image"
                                                                    src="https://cmsrepository.com/static/ancillaries/seatmap//images/seatmap/160/seatmap-mobile.gif"
                                                                />
                                                                <div className="clearfix" bis_skin_checked={1} />
                                                                <a
                                                                    className="view_seat_button"
                                                                    style={{ display: "none" }}
                                                                    href={""}
                                                                    data-toggle="collapse"
                                                                    data-target="#seatmapShow"
                                                                >
                                                                    Hide Seat Map
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="loading_div"
                                                        className="loading_div text-center"
                                                        style={{ borderTop: "1px dotted #ccc" }}
                                                        bis_skin_checked={1}
                                                    >
                                                        <img
                                                            className="seat-image"
                                                            src="https://cmsrepository.com/static/ancillaries/seatmap//images/seatmap/160/loading.gif"
                                                        />
                                                        <div style={{ marginTop: "-16px" }} bis_skin_checked={1}>
                                                            Please wait...
                                                        </div>
                                                    </div>
                                                    <div id="dvPostBind" bis_skin_checked={1} />
                                                </div>
                                                <input
                                                    type="hidden"
                                                    id="seatmapkey"
                                                    name="seatmapkey"
                                                    defaultValue="1601141000blrhydai591t31aug20241435hyddelai418t31aug20241735290824010823222d612344cc4eba8271f1003bea675c"
                                                />
                                                <input
                                                    type="hidden"
                                                    id="upgratekey"
                                                    name="upgratekey"
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>
                                        <input
                                            id="flightBookingRequest_seatmapdata"
                                            name="flightBookingRequest.seatmapdata"
                                            type="hidden"
                                            defaultValue=""
                                        />
                                        <input
                                            data-val="true"
                                            data-val-required="The IsInsuranceApplied field is required."
                                            id="flightBookingRequest_IsInsuranceApplied"
                                            name="flightBookingRequest.IsInsuranceApplied"
                                            type="hidden"
                                            defaultValue="false"
                                        />
                                        <div id="insuranceMainDiv" bis_skin_checked={1}>
                                            <div className="options-container" bis_skin_checked={1}>
                                                <div className="contents" bis_skin_checked={1}>
                                                    <div id="dvPostBindInsurance" bis_skin_checked={1}>
                                                        <div className="mainheading" bis_skin_checked={1}>
                                                            <img
                                                                src="/assets/images/svg/p-travel-protection-plan.svg"
                                                                className="icon travelprotection"
                                                            />
                                                            Travel Protection Plan
                                                            <div
                                                                className="trip_protection_strip hidden-xs hidden-sm hidden-md"
                                                                style={{ display: "none" }}
                                                                bis_skin_checked={1}
                                                            >
                                                                <span className="price">
                                                                    <span id="Ins_perPaxDisplay">
                                                                        <span>
                                                                            <strong>Adult:</strong> $28.00
                                                                        </span>
                                                                        <small className="per-pax">Per pax</small>
                                                                    </span>
                                                                    <br />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="travel-protection-block"
                                                            bis_skin_checked={1}
                                                        >
                                                            <div className="row" bis_skin_checked={1}>
                                                                <div
                                                                    className="col-sm-9 col-xs-12"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <div className="row" bis_skin_checked={1}>
                                                                        <div
                                                                            className="col-md-6 col-sm-12 col-xs-12"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <ul>
                                                                                <li>
                                                                                    Air Ticket Cost* protected if
                                                                                    <b>Trip Cancelation</b> due to a covered
                                                                                    reason, including sickness of a traveling
                                                                                    companion.
                                                                                </li>
                                                                                <li>
                                                                                    Up to $750 <b>Travel Delay</b>, including
                                                                                    delays relating to quarantine.
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div
                                                                            className="col-md-6 col-sm-12 col-xs-12"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <ul>
                                                                                <li>
                                                                                    Up to $50,000 <b>Emergency Evacuation.</b>
                                                                                </li>
                                                                                <li>
                                                                                    Up to $25,000 <b>Medical Expense</b>, covers
                                                                                    COVID-19 the same as any sickness.
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="txt" bis_skin_checked={1}>
                                                                        * To a Maximum of $10,000 for Domestic Air Tickets
                                                                        or $50,000 for International Air Tickets. Trip
                                                                        cancelation due to government travel advisories or
                                                                        fear of travel is not covered.
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="col-sm-3 hidden-xs"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <img
                                                                        src="/assets/images/payment/travel-protection-plan.gif"
                                                                        className="image-bnr"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* New start for mobile */}
                                                        <div id="div_insurance" bis_skin_checked={1}>
                                                            <div
                                                                className="fare-protection-plan"
                                                                style={{ display: "none" }}
                                                                bis_skin_checked={1}
                                                            >
                                                                <div className="row" bis_skin_checked={1}>
                                                                    <div className="col-xs-6" bis_skin_checked={1}>
                                                                        <strong>Adult:</strong> $28.00
                                                                        <small className="per-pax">Per Pax</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div bis_skin_checked={1}>
                                                                <div className="insurance-price" bis_skin_checked={1}>
                                                                    $28.00<span className="per-pax">Per Person</span>
                                                                </div>
                                                            </div>
                                                            {/* New end for mobile */}
                                                            <div className="row" bis_skin_checked={1}>
                                                                <div
                                                                    className="col-sm-11 col-xs-12"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <div className="select-option" bis_skin_checked={1}>
                                                                        <ul>
                                                                            <li>
                                                                                <div
                                                                                    className="trip_protection_tooltip"
                                                                                    style={{ display: "none" }}
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <span
                                                                                        className="close_tooltip"
                                                                                        onclick="closeTPPTips()"
                                                                                    >
                                                                                        <svg
                                                                                            width={16}
                                                                                            height={16}
                                                                                            fill="currentColor"
                                                                                            className="bi bi-x-circle-fill"
                                                                                            viewBox="0 0 16 16"
                                                                                        >
                                                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <p>
                                                                                        <i
                                                                                            className="fa fa-thumbs-up"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                        Opt for our Travel Protection Plan for
                                                                                        $28.00 and protect your trip costs of
                                                                                        $91.40 from unexpected events.
                                                                                    </p>
                                                                                </div>
                                                                                <div
                                                                                    className="inputSet"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <label>
                                                                                        <input
                                                                                            type="radio"
                                                                                            onclick="applyInsurance('true','28')"
                                                                                            id="Insurance"
                                                                                            defaultValue="true"
                                                                                            name="Insurance"
                                                                                        />
                                                                                        <span>
                                                                                            <b>Yes,</b> I want to protect my trip
                                                                                        </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div
                                                                                    className="inputSet"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <label>
                                                                                        <input
                                                                                            type="radio"
                                                                                            onclick="applyInsurance('false','28')"
                                                                                            id="Insurance"
                                                                                            defaultValue="false"
                                                                                            name="Insurance"
                                                                                        />
                                                                                        <span>
                                                                                            <b>No,</b> I would risk my entire trip
                                                                                            <b>
                                                                                                ($<span id="grndTotalIns">91.40</span>
                                                                                                )
                                                                                            </b>
                                                                                        </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="error_text"
                                                                style={{
                                                                    display: "block",
                                                                    background: "#fff0e5",
                                                                    border: "1px solid #ff6e03",
                                                                    padding: "5px 5px 5px 27px",
                                                                    fontWeight: 500,
                                                                    fontSize: 12,
                                                                    position: "relative",
                                                                    margin: "-3px 0 15px 0"
                                                                }}
                                                                bis_skin_checked={1}
                                                            >
                                                                <i
                                                                    className="fa fa-info-circle"
                                                                    aria-hidden="true"
                                                                    style={{
                                                                        fontSize: 19,
                                                                        position: "absolute",
                                                                        left: 5
                                                                    }}
                                                                />
                                                                Travel Protection is not available to residents of New
                                                                York.
                                                            </div>
                                                            <div bis_skin_checked={1}>
                                                                The quoted price for the travel protection plan cost
                                                                includes the plan premium and a fee for non-insurance
                                                                assistance services. Please see
                                                                <a
                                                                    onclick="window.open('https://www.tripmate.com/main/consumer-disclosures/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                    href={""}
                                                                >
                                                                    important disclosures
                                                                </a>
                                                                .
                                                            </div>
                                                            <p>

                                                                <span>

                                                                    To learn more
                                                                    <a href="/assets/travel-insurance" target="_blank">
                                                                        click here
                                                                    </a>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="loadinginsurance_div"
                                                        className="loadinginsurance_div text-center"
                                                        style={{ borderTop: "1px dotted #ccc", display: "none" }}
                                                        bis_skin_checked={1}
                                                    >
                                                        <img
                                                            className="seat-image"
                                                            src="/assets/images/loading.gif"
                                                        />
                                                        <div style={{ marginTop: "-16px" }} bis_skin_checked={1}>
                                                            Please wait...
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            data-val="true"
                                            data-val-required="The isTCPIncludesBRB field is required."
                                            id="flightBookingRequest_isTCPIncludesBRB"
                                            name="flightBookingRequest.isTCPIncludesBRB"
                                            type="hidden"
                                            defaultValue="False"
                                        />
                                        <input
                                            data-val="true"
                                            data-val-number="The field Macp must be a number."
                                            data-val-required="The Macp field is required."
                                            id="flightBookingRequest_Macp"
                                            name="flightBookingRequest.Macp"
                                            type="hidden"
                                            defaultValue={0}
                                        />
                                        <div
                                            className="toster_anceliry"
                                            id="tcp_toster"
                                            style={{ display: "none" }}
                                            bis_skin_checked={1}
                                        >
                                            <img src="/assets/images/payment/toster-icon.png" alt="" />
                                            <p>
                                                <a href={""} className="toster-closebtn">
                                                    X
                                                </a>
                                                Success! Travelers' Trusted Program has been added.
                                            </p>
                                        </div>
                                        <div
                                            className="options-container travelers-concierge"
                                            bis_skin_checked={1}
                                        >
                                            <div className="contents" bis_skin_checked={1}>
                                                <div className="mainheading" bis_skin_checked={1}>
                                                    <img
                                                        src="/assets/images/svg/p-tcp.svg"
                                                        className="icon tcpicon"
                                                    />
                                                    Travelers' Trusted Program <span>(TTP)</span>
                                                </div>
                                                <div
                                                    className="tcp_contentBox"
                                                    id="tcp_collapse"
                                                    style={{ display: "block" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="row" bis_skin_checked={1}>
                                                        <div className="col-md-12" bis_skin_checked={1}>
                                                            <img
                                                                src="/assets/images/payment/tcp-image.svg"
                                                                className="tcp_image hidden"
                                                                alt="user image"
                                                            />
                                                            <p className="tcp_text_black">
                                                                Step up your travel game with Travelers' Trusted
                                                                Program (TTP), for you can trust us with all of your
                                                                travel-related assistance.
                                                            </p>
                                                            <div className="tcp_plan" bis_skin_checked={1}>
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="text-left heading">Services</th>
                                                                            <th className="tdwidth heading"> Standard</th>
                                                                            <th className="tdwidth heading"> Premium </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="pd-top">
                                                                                <strong>Baggage Protection</strong>
                                                                                <span>
                                                                                    Get benefits of up to $1000 per bag
                                                                                </span>
                                                                            </td>
                                                                            <td className="tdwidth">
                                                                                <img
                                                                                    src="/assets/images/payment/minus.png"
                                                                                    alt="alt"
                                                                                />
                                                                            </td>
                                                                            <td className="tdwidth">
                                                                                <img src="/assets/images/payment/check.svg" />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <strong> Dedicated Services</strong>
                                                                                <span>
                                                                                    Dedicated Personalized Service &amp;
                                                                                    Toll-Free
                                                                                </span>
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/minus.png" />
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/check.svg" />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <strong>Cancelation</strong>
                                                                                <span>Within 24 hrs</span>
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/check.svg" />
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/check.svg" />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <strong>Rescheduling</strong>
                                                                                <span>
                                                                                    If the airline changes its schedule, we will
                                                                                    help you find the next best alternative.
                                                                                </span>
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/minus.png" />
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/check.svg" />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                valign="bottom"
                                                                                style={{ verticalAlign: "bottom" }}
                                                                            >
                                                                                <a
                                                                                    href={""}
                                                                                    data-target="#tcpTxt"
                                                                                    className="learn-more collapsed"
                                                                                    data-toggle="collapse"
                                                                                >
                                                                                    Learn more
                                                                                </a>
                                                                            </td>
                                                                            <td>
                                                                                <div
                                                                                    className="tcp_price"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <strong>
                                                                                        <i className="fa fa-usd" />
                                                                                        0.00
                                                                                    </strong>
                                                                                    Per Person
                                                                                </div>
                                                                                <a
                                                                                    href={""}
                                                                                    style={{ cursor: "default" }}
                                                                                    className="selected-btn"
                                                                                >
                                                                                    Included
                                                                                </a>
                                                                            </td>
                                                                            <td className="btm-blue">
                                                                                <div
                                                                                    className="tcp_price"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <strong>
                                                                                        <i className="fa fa-usd" />
                                                                                        19.89
                                                                                    </strong>
                                                                                    Per Person
                                                                                </div>
                                                                                <a
                                                                                    href={""}
                                                                                    id="buttcpselect"
                                                                                    onclick="addedtcp('19.89')"
                                                                                    className="selected-btn active"
                                                                                >
                                                                                    Add
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="tcpTxt"
                                                        className="learn-more-content collapse"
                                                        bis_skin_checked={1}
                                                    >
                                                        <ul className="nav nav-tabs" role="tablist">
                                                            <li role="presentation" className="active">
                                                                <a
                                                                    href="#tcp-tnc"
                                                                    aria-controls="TCP"
                                                                    role="tab"
                                                                    data-toggle="tab"
                                                                >
                                                                    Terms and Conditions
                                                                </a>
                                                            </li>
                                                            <li role="presentation">
                                                                <a
                                                                    href="#brb-tnc"
                                                                    aria-controls="BRB"
                                                                    role="tab"
                                                                    data-toggle="tab"
                                                                >
                                                                    Baggage Protection Policy
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        <div className="tab-content" bis_skin_checked={1}>
                                                            <div
                                                                role="tabpanel"
                                                                className="tab-pane active"
                                                                id="tcp-tnc"
                                                                bis_skin_checked={1}
                                                            >
                                                                <div className="text-justify" bis_skin_checked={1}>
                                                                    <p className="mt5">
                                                                        Signing up for “Travelers' Trusted Program” will
                                                                        entitle you to some remarkable benefits. It will
                                                                        let you cancel and rebook your flight tickets
                                                                        without paying any change and cancelation
                                                                        penalties and our service fee. And that’s not it,
                                                                        you get a host of other benefits as well.
                                                                    </p>
                                                                    <p className="mt5">
                                                                        Travelers' Trusted Programc subscribers are
                                                                        warranted free rescheduling and name changes,
                                                                        individualized dedicated service without any
                                                                        charges, a separate Toll-Free Number along with
                                                                        complimentary seat assignment and meal preference
                                                                        on international sector.
                                                                    </p>
                                                                    <p className="mt5" style={{ marginBottom: 10 }}>
                                                                        <strong>Note:</strong> This is an additional
                                                                        service that we offer, other than Insurance plan
                                                                        and it is non-refundable.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                role="tabpanel"
                                                                className="tab-pane"
                                                                id="brb-tnc"
                                                                bis_skin_checked={1}
                                                            >
                                                                <p>
                                                                    NOTE: This service is applicable for this flight
                                                                    booking only. If you require any changes, you must
                                                                    report to
                                                                    <a
                                                                        href="mailto:info@blueribbonbags.com"
                                                                        className="brb-link"
                                                                    >
                                                                        info@blueribbonbags.com
                                                                    </a>
                                                                    prior your scheduled departure. Please mention your
                                                                    Service Agreement Number in the subject line and it
                                                                    may require additional purchases.
                                                                </p>
                                                                <p>
                                                                    Once clicked on 'Add', I agree to the
                                                                    <a
                                                                        className="brb-link"
                                                                        target="_blank"
                                                                        href="/assets/description.pdf"
                                                                    >
                                                                        Terms and Conditions*
                                                                    </a>
                                                                </p>
                                                                <h4>A Comprehensive Overview</h4>
                                                                <p>
                                                                    Please note that this service is provided on
                                                                    TourTravelHub by Blue Ribbon Bags.
                                                                </p>
                                                                <ul className="brb-list">
                                                                    <li>
                                                                        Once added to your booking, Blue Ribbon Bags (BRB)
                                                                        will track your delayed baggage and speed up its
                                                                        return within 96 hours (4 days of your flight
                                                                        arrival) of it being lost.
                                                                    </li>
                                                                    <li>
                                                                        Each purchase of BRB is per person, per round trip
                                                                        and does not include the connections during your
                                                                        flight trip.
                                                                    </li>
                                                                    <li>
                                                                        Under this protection plan categorized into three,
                                                                        Blue Ribbon Bag will pay you.
                                                                    </li>
                                                                </ul>
                                                                <p className="clearfix" />
                                                                <p className="mt10">

                                                                    <span>

                                                                        Please click here to
                                                                        <b>
                                                                            <a
                                                                                href="/assets/baggage-protection"
                                                                                target="_blank"
                                                                            >
                                                                                View the Description of Baggage
                                                                            </a>
                                                                        </b>
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    id="tcp_message"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <img
                                                        src="/assets/images/payment/tcp-image-selected.svg"
                                                        className="tcp_selected_image hidden"
                                                        alt="user image"
                                                    />
                                                    <div className="tcp_greatChoise" bis_skin_checked={1}>
                                                        <b>Great Choice!</b> You have selected Travelers' Trusted
                                                        Program <br /> Please continue and complete your booking!
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            id="div_Optionals"
                                            className="step3"
                                            bis_skin_checked={1}
                                        ></div>
                                        <div
                                            className="price-summary"
                                            id="price_block"
                                            bis_skin_checked={1}
                                            style={{ top: isScrolled ? 0 : 134, left: "1062.6px" }}
                                        >
                                            <div className="content-box" bis_skin_checked={1}>
                                                <div
                                                    className="mainheading mobile-title"
                                                    bis_skin_checked={1}
                                                >
                                                    <img
                                                        src="/assets/images/svg/p-payment-detail.svg"
                                                        className="icon priceicon"
                                                    />
                                                    Fare Summary
                                                </div>
                                                <div id="paxfaredetails" bis_skin_checked={1}>
                                                    <div className="fare-section" bis_skin_checked={1}>
                                                        <div
                                                            className="main traveler-fees-toggle"
                                                            bis_skin_checked={1}
                                                        >
                                                            <span>
                                                                $<span id="adultPricingTotal">{(Math.round((travellerCount.adults.count * travellerCount.adults.rate) * 100) / 100).toFixed(2)}</span>
                                                            </span>
                                                            Adult ({travellerCount.adults.count} X ${travellerCount.adults.rate})
                                                        </div>
                                                        {travellerCount.child.count > 0 && <div
                                                            className="main traveler-fees-toggle"
                                                            bis_skin_checked={1}
                                                        >
                                                            <span>
                                                                $<span id="adultPricingTotal">{(Math.round((travellerCount.child.count * travellerCount.child.rate) * 100) / 100).toFixed(2)}</span>
                                                            </span>
                                                            Child ({travellerCount.child.count} X ${travellerCount.child.rate})
                                                        </div>}
                                                        {travellerCount.infant.count > 0 && <div
                                                            className="main traveler-fees-toggle"
                                                            bis_skin_checked={1}
                                                        >
                                                            <span>
                                                                $<span id="adultPricingTotal">{(Math.round((travellerCount.infant.count * travellerCount.infant.rate) * 100) / 100).toFixed(2)}</span>
                                                            </span>
                                                            Child ({travellerCount.infant.count} X ${travellerCount.infant.rate})
                                                        </div>}
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        id="hdntotal"
                                                        name="hdntotal"
                                                        defaultValue="91.4"
                                                    />
                                                </div>
                                                <div
                                                    className="fare-section dni"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spdnitaxamt">0</span>
                                                        </span>
                                                        DNI Taxes (Tourism Tax)
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section bagggae-txt"
                                                    id="priceCheckedBaggage"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div
                                                        className="main"
                                                        onclick="showhidebaggageparent()"
                                                        bis_skin_checked={1}
                                                    >
                                                        <span>
                                                            $<span id="totalCheckedBgg">0</span>
                                                        </span>
                                                        Baggage Details
                                                        <i className="fa bggangle fa-angle-double-down" />
                                                        &nbsp;
                                                        <a
                                                            className="remove-btn cursor-pointer"
                                                            onclick="showbagpopup();"
                                                        >
                                                            <img src="/assets/images/payment/trash-icon.svg" />
                                                        </a>
                                                    </div>
                                                    <div
                                                        className="traveler-fees-slide1"
                                                        id="priceOutBaggage"
                                                        style={{ display: "none" }}
                                                        bis_skin_checked={1}
                                                    />
                                                </div>
                                                <div
                                                    className="fare-section olgtxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnolgamt">0</span>
                                                        </span>
                                                        Outward Luggage
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section ilgtxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnilgamt">0</span>
                                                        </span>
                                                        Return Luggage
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section slgtxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnslgamt">0</span>
                                                        </span>
                                                        Luggage Fee
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section instxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spninsamt">0</span>
                                                        </span>
                                                        Travel Insurance
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section rfndtxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div
                                                        className="main"
                                                        style={{ lineHeight: 16 }}
                                                        bis_skin_checked={1}
                                                    >
                                                        <span>
                                                            $<span id="spnrfntamt">0</span>
                                                        </span>
                                                        Flight Refund <br />
                                                        Assurance
                                                        <a
                                                            className="remove-btn cursor-pointer"
                                                            onclick="RRfnd();"
                                                        >
                                                            <img src="/assets/images/payment/trash-icon.svg?v=1.0" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section Refundtxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnRefundamt">0</span>
                                                        </span>
                                                        Refundable Booking
                                                        <a
                                                            onclick="applyRRefundable('false', '13.71');"
                                                            href={""}
                                                            className="remove-btn cursor-pointer"
                                                        >
                                                            <img src="/assets/images/payment/trash-icon.svg" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section webchk"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnwebchkamt">0</span>
                                                        </span>
                                                        Web Check In &nbsp;&nbsp;
                                                        <a
                                                            className="remove-btn cursor-pointer"
                                                            onclick="Rchkamt();"
                                                        >
                                                            <img src="/assets/images/payment/trash-icon.svg" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section tcptxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spntcpamt">0</span>
                                                        </span>
                                                        Traveler's <br /> Trusted Program &nbsp;
                                                        <a onclick="removetcp();" href={""}>
                                                            <img src="/assets/images/payment/trash-icon.svg" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section tcptxt1"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnbagamt">0.00</span>
                                                        </span>
                                                        <b className="green">Free</b> Baggage Protection
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section flxtxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnflxtkt">0</span>
                                                        </span>
                                                        Flexible Ticket
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section seattxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnseatamt">0</span>
                                                        </span>
                                                        Seat Assignment &nbsp;
                                                        <a
                                                            href={""}
                                                            className="view_seatmap"
                                                            style={{
                                                                color: "#4863DB",
                                                                fontSize: 12,
                                                                textDecoration: "underline"
                                                            }}
                                                        >
                                                            View
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section spntxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span className="copoun_applytext">
                                                            - $<span id="spncpmamt" />
                                                        </span>
                                                        Coupon Discount
                                                        <a
                                                            href={""}
                                                            onclick="applyCoupon();"
                                                            className="remove"
                                                        >
                                                            Remove
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="fare-section spntxt" bis_skin_checked={1}>
                                                    {/* <div className="main" bis_skin_checked={1}>
                                                        <span className="added_green" style={{ paddingLeft: 5 }}>
                                                            $0.00
                                                        </span>
                                                        <span className="price_cut">$10</span>
                                                        <div className="event_nobooking" bis_skin_checked={1}>

                                                        </div>
                                                        <small className="eventapplycoppon">
                                                            Labor Day Saving Applied
                                                        </small>
                                                    </div> */}
                                                </div>
                                                <div
                                                    className="fare-section total-price"
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main  bold" bis_skin_checked={1}>
                                                        <input
                                                            type="hidden"
                                                            id="hdntotal"
                                                            name="hdntotal"
                                                            defaultValue="91.4"
                                                        />
                                                        <input
                                                            data-val="true"
                                                            data-val-number="The field AmountToCharge must be a number."
                                                            data-val-required="The AmountToCharge field is required."
                                                            id="flightBookingRequest_Payment_AmountToCharge"
                                                            name="flightBookingRequest.Payment.AmountToCharge"
                                                            type="hidden"
                                                            defaultValue="91.40"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            id="affGrandtotal"
                                                            name="affGrandtotal"
                                                        />
                                                        <span>
                                                            $<span id="fltTotal">{selectedFlight.price.total}</span>
                                                        </span>
                                                        Total Price (USD)
                                                        <div
                                                            className="tooltip-custom fareladder-tooltip"
                                                            bis_skin_checked={1}
                                                        >
                                                            <i className="fareladder-icon fa fa-info hand" />
                                                            <div
                                                                id="fareladorPromod"
                                                                className="promo-detail"
                                                                style={{ display: "none" }}
                                                                bis_skin_checked={1}
                                                            >
                                                                <span className="arrow" />
                                                                <span className="fareladder-close">
                                                                    <svg
                                                                        width={18}
                                                                        height={18}
                                                                        fill="currentColor"
                                                                        className="bi bi-x-circle-fill"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                                                    </svg>
                                                                </span>
                                                                <p
                                                                    className="mb5px hidden-xs hidden-sm"
                                                                    style={{ textAlign: "left" }}
                                                                >
                                                                    Total price includes base price, our <br />
                                                                    <a
                                                                        onclick="window.open('/us/taxes-fees#serviceFeesc', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                        href={""}
                                                                    >
                                                                        service fees
                                                                    </a>
                                                                    and
                                                                    <a
                                                                        onclick="window.open('/us/taxes-fees', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                        href={""}
                                                                    >
                                                                        taxes and fees
                                                                    </a>
                                                                    .
                                                                </p>
                                                                <p
                                                                    className="mb5px visible-xs visible-sm"
                                                                    style={{ textAlign: "left" }}
                                                                >
                                                                    Total price includes base price, our <br />
                                                                    <a
                                                                        onclick="Filter.getmobile_popup('tnf','serviceFeesc')"
                                                                        className="text_link"
                                                                        data-toggle="modal"
                                                                        data-target="#mobile-popup"
                                                                        href={""}
                                                                    >
                                                                        service fees
                                                                    </a>
                                                                    and
                                                                    <a
                                                                        onclick="    Filter.getmobile_popup('tnf')"
                                                                        className="text_link"
                                                                        data-toggle="modal"
                                                                        data-target="#mobile-popup"
                                                                        href={""}
                                                                    >
                                                                        taxes and fees
                                                                    </a>
                                                                    .
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content-box" bis_skin_checked={1}>
                                                <input
                                                    id="flightBookingRequest_couponsCode"
                                                    name="flightBookingRequest.couponsCode"
                                                    type="hidden"
                                                    defaultValue=""
                                                />
                                                <input
                                                    id="flightBookingRequest_coupons"
                                                    name="flightBookingRequest.coupons"
                                                    type="hidden"
                                                    defaultValue=""
                                                />
                                                <input
                                                    data-val="true"
                                                    data-val-number="The field couponsAmt must be a number."
                                                    data-val-required="The couponsAmt field is required."
                                                    id="flightBookingRequest_couponsAmt"
                                                    name="flightBookingRequest.couponsAmt"
                                                    type="hidden"
                                                    defaultValue={0}
                                                />
                                                <p className="note">
                                                    <b>Note:</b>
                                                    All fares are quoted in USD. Additional baggage fees may
                                                    apply as per the airline policies. Your credit/debit card
                                                    may be billed in multiple charges totaling the final total
                                                    price.
                                                    <span id="tpnote" style={{ display: "none" }}>
                                                        The travel protection plan cost includes the plan premium
                                                        and a fee for non-insurance assistance services. Please
                                                        see
                                                        <a
                                                            onclick="window.open('https://www.tripmate.com/main/consumer-disclosures/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                            href={""}
                                                            style={{
                                                                color: "#4863db",
                                                                textDecoration: "underline",
                                                                display: "inline-block"
                                                            }}
                                                        >
                                                            important disclosures
                                                        </a>
                                                        .
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div id="div_Payment" className="step4" bis_skin_checked={1}>
                                            <div className="form-box" bis_skin_checked={1}>
                                                <div className="mainheading" bis_skin_checked={1}>
                                                    <img
                                                        src="/assets/images/svg/p-billing-information.svg"
                                                        className="icon billing-info"
                                                    />
                                                    Billing Information
                                                </div>
                                                <p>(As per Bank records or credit card company)</p>
                                                <div className="row" bis_skin_checked={1}>
                                                    <div className="col-sm-6 col-xs-12" bis_skin_checked={1}>
                                                        <input
                                                            type="hidden"
                                                            id="istf"
                                                            name="istf"
                                                            defaultValue={0}
                                                        />
                                                        <label className="label_hide_mobile">
                                                            Select Country<span className="required">*</span>
                                                        </label>
                                                        <div className="form-righterrow" bis_skin_checked={1}>
                                                            <select
                                                                className="Payment"
                                                                data-val="true"
                                                                data-val-required="The Country field is required."
                                                                id="flightBookingRequest_Payment_Country"
                                                                name="flightBookingRequest.Payment.Country"

                                                            >
                                                                <option value="">Select Country</option>
                                                                <option value="AF">Afghanistan</option>
                                                                <option value="AL">Albania</option>
                                                                <option value="DZ">Algeria</option>
                                                                <option value="AS">American Samoa</option>
                                                                <option value="AD">Andorra</option>
                                                                <option value="AO">Angola</option>
                                                                <option value="AI">Anguilla</option>
                                                                <option value="AQ">Antarctica</option>
                                                                <option value="AG">Antigua and Barbuda</option>
                                                                <option value="AR">Argentina</option>
                                                                <option value="AM">Armenia</option>
                                                                <option value="AW">Aruba</option>
                                                                <option value="AU">Australia</option>
                                                                <option value="AT">Austria</option>
                                                                <option value="AZ">Azerbaijan</option>
                                                                <option value="BS">Bahamas</option>
                                                                <option value="BH">Bahrain</option>
                                                                <option value="BD">Bangladesh</option>
                                                                <option value="BB">Barbados</option>
                                                                <option value="BY">Belarus</option>
                                                                <option value="BE">Belgium</option>
                                                                <option value="BZ">Belize</option>
                                                                <option value="BJ">Benin</option>
                                                                <option value="BM">Bermuda</option>
                                                                <option value="BT">Bhutan</option>
                                                                <option value="BO">Bolivia</option>
                                                                <option value="BQ">
                                                                    Bonaire, Sint Eustatius and Saba
                                                                </option>
                                                                <option value="BA">Bosnia Herzegovina</option>
                                                                <option value="BW">Botswana</option>
                                                                <option value="BR">Brazil</option>
                                                                <option value="IO">
                                                                    British Indian Ocean Territory
                                                                </option>
                                                                <option value="VG">British Virgin Islands</option>
                                                                <option value="BN">Brunei Darussalam</option>
                                                                <option value="BG">Bulgaria</option>
                                                                <option value="BF">Burkina Faso</option>
                                                                <option value="BI">Burundi</option>
                                                                <option value="KH">Cambodia</option>
                                                                <option value="CM">Cameroon</option>
                                                                <option value="CA">Canada</option>
                                                                <option value="CV">Cape Verde</option>
                                                                <option value="KY">Cayman Islands</option>
                                                                <option value="CF">Central African Republic</option>
                                                                <option value="TD">Chad</option>
                                                                <option value="CL">Chile</option>
                                                                <option value="CN">China</option>
                                                                <option value="CX">Christmas Island</option>
                                                                <option value="CC">Cocos Islands</option>
                                                                <option value="CO">Colombia</option>
                                                                <option value="KM">Comoros</option>
                                                                <option value="CK">Cook Islands</option>
                                                                <option value="CR">Costa Rica</option>
                                                                <option value="HR">Croatia</option>
                                                                <option value="CU">Cuba</option>
                                                                <option value="CW">Curacao</option>
                                                                <option value="CY">Cyprus</option>
                                                                <option value="CZ">Czech Republic</option>
                                                                <option value="CD">
                                                                    Democratic Republic of the Congo
                                                                </option>
                                                                <option value="DK">Denmark</option>
                                                                <option value="DJ">Djibouti</option>
                                                                <option value="DM">Dominica</option>
                                                                <option value="DO">Dominican Republic</option>
                                                                <option value="TL">East Timor</option>
                                                                <option value="EC">Ecuador</option>
                                                                <option value="EG">Egypt</option>
                                                                <option value="SV">El Salvador</option>
                                                                <option value="GQ">Equatorial Guinea</option>
                                                                <option value="ER">Eritrea</option>
                                                                <option value="EE">Estonia</option>
                                                                <option value="SZ">Eswatini</option>
                                                                <option value="ET">Ethiopia</option>
                                                                <option value="FK">Falkland Islands</option>
                                                                <option value="FO">Faroe Islands</option>
                                                                <option value="FJ">Fiji</option>
                                                                <option value="FI">Finland</option>
                                                                <option value="FR">France</option>
                                                                <option value="GF">French Guiana</option>
                                                                <option value="PF">French Polynesia</option>
                                                                <option value="GA">Gabon</option>
                                                                <option value="GM">Gambia</option>
                                                                <option value="GE">Georgia</option>
                                                                <option value="DE">Germany</option>
                                                                <option value="GH">Ghana</option>
                                                                <option value="GI">Gibraltar</option>
                                                                <option value="GR">Greece</option>
                                                                <option value="GL">Greenland</option>
                                                                <option value="GD">Grenada</option>
                                                                <option value="GP">Guadeloupe</option>
                                                                <option value="GU">Guam</option>
                                                                <option value="GT">Guatemala</option>
                                                                <option value="GG">Guernsey</option>
                                                                <option value="GN">Guinea</option>
                                                                <option value="GW">Guinea-Bissau</option>
                                                                <option value="GY">Guyana</option>
                                                                <option value="HT">Haiti</option>
                                                                <option value="HM">
                                                                    Heard Island and McDonald Islands
                                                                </option>
                                                                <option value="HN">Honduras</option>
                                                                <option value="HK">Hong Kong</option>
                                                                <option value="HU">Hungary</option>
                                                                <option value="IS">Iceland</option>
                                                                <option value="IN">India</option>
                                                                <option value="ID">Indonesia</option>
                                                                <option value="IR">Iran</option>
                                                                <option value="IQ">Iraq</option>
                                                                <option value="IE">Ireland</option>
                                                                <option value="IM">Isle of Man</option>
                                                                <option value="IL">Israel</option>
                                                                <option value="IT">Italy</option>
                                                                <option value="CI">Ivory Coast</option>
                                                                <option value="JM">Jamaica</option>
                                                                <option value="JP">Japan</option>
                                                                <option value="JE">Jersey</option>
                                                                <option value="JO">Jordan</option>
                                                                <option value="KZ">Kazakhstan</option>
                                                                <option value="KE">Kenya</option>
                                                                <option value="KI">Kiribati</option>
                                                                <option value="KW">Kuwait</option>
                                                                <option value="KG">Kyrgyzstan</option>
                                                                <option value="LA">
                                                                    Lao Peoples Democratic Republic
                                                                </option>
                                                                <option value="LV">Latvia</option>
                                                                <option value="LB">Lebanon</option>
                                                                <option value="LS">Lesotho</option>
                                                                <option value="LR">Liberia</option>
                                                                <option value="LY">Libya</option>
                                                                <option value="LI">Liechtenstein</option>
                                                                <option value="LT">Lithuania</option>
                                                                <option value="LU">Luxembourg</option>
                                                                <option value="MO">Macau</option>
                                                                <option value="MG">Madagascar</option>
                                                                <option value="MW">Malawi</option>
                                                                <option value="MY">Malaysia</option>
                                                                <option value="MV">Maldives</option>
                                                                <option value="ML">Mali</option>
                                                                <option value="MT">Malta</option>
                                                                <option value="MH">Marshall Islands</option>
                                                                <option value="MQ">Martinique</option>
                                                                <option value="MR">Mauritania</option>
                                                                <option value="MU">Mauritius</option>
                                                                <option value="YT">Mayotte</option>
                                                                <option value="MX">Mexico</option>
                                                                <option value="FM">Micronesia</option>
                                                                <option value="MD">Moldova</option>
                                                                <option value="MC">Monaco</option>
                                                                <option value="MN">Mongolia</option>
                                                                <option value="ME">Montenegro</option>
                                                                <option value="MS">Montserrat</option>
                                                                <option value="MA">Morocco</option>
                                                                <option value="MZ">Mozambique</option>
                                                                <option value="MM">Myanmar</option>
                                                                <option value="NA">Namibia</option>
                                                                <option value="NR">Nauru</option>
                                                                <option value="NP">Nepal</option>
                                                                <option value="NL">Netherlands</option>
                                                                <option value="NC">New Caledonia</option>
                                                                <option value="NZ">New Zealand</option>
                                                                <option value="NI">Nicaragua</option>
                                                                <option value="NE">Niger</option>
                                                                <option value="NG">Nigeria</option>
                                                                <option value="NU">Niue</option>
                                                                <option value="NF">Norfolk Island</option>
                                                                <option value="KP">North Korea</option>
                                                                <option value="MP">Northern Mariana Islands</option>
                                                                <option value="NO">Norway</option>
                                                                <option value="OM">Oman</option>
                                                                <option value="PK">Pakistan</option>
                                                                <option value="PW">Palau</option>
                                                                <option value="PS">
                                                                    Palestinian Territory, Occupied
                                                                </option>
                                                                <option value="PA">Panama</option>
                                                                <option value="PG">Papua New Guinea</option>
                                                                <option value="PY">Paraguay</option>
                                                                <option value="PE">Peru</option>
                                                                <option value="PH">Philippines</option>
                                                                <option value="PN">Pitcairn</option>
                                                                <option value="PL">Poland</option>
                                                                <option value="PT">Portugal</option>
                                                                <option value="PR">Puerto Rico</option>
                                                                <option value="QA">Qatar</option>
                                                                <option value="MK">Republic of Macedonia</option>
                                                                <option value="CG">Republic of the Congo</option>
                                                                <option value="RE">Reunion</option>
                                                                <option value="RO">Romania</option>
                                                                <option value="RU">Russia</option>
                                                                <option value="RW">Rwanda</option>
                                                                <option value="BL">Saint Barthelemy</option>
                                                                <option value="SH">Saint Helena</option>
                                                                <option value="MF">Saint Martin</option>
                                                                <option value="WS">Samoa</option>
                                                                <option value="SM">San Marino</option>
                                                                <option value="ST">Sao Tome and Principe</option>
                                                                <option value="SA">Saudi Arabia</option>
                                                                <option value="SN">Senegal</option>
                                                                <option value="RS">Serbia</option>
                                                                <option value="SC">Seychelles</option>
                                                                <option value="SL">Sierra Leone</option>
                                                                <option value="SG">Singapore</option>
                                                                <option value="SX">Sint Maarten</option>
                                                                <option value="SK">Slovakia</option>
                                                                <option value="SI">Slovenia</option>
                                                                <option value="SB">Solomon Islands</option>
                                                                <option value="SO">Somalia</option>
                                                                <option value="ZA">South Africa</option>
                                                                <option value="GS">
                                                                    South Georgia and the South Sandwich Islands
                                                                </option>
                                                                <option value="KR">South Korea</option>
                                                                <option value="SS">South Sudan</option>
                                                                <option value="ES">Spain</option>
                                                                <option value="LK">Sri Lanka</option>
                                                                <option value="KN">
                                                                    St. Christopher (St. Kitts) Nevis
                                                                </option>
                                                                <option value="LC">St. Lucia</option>
                                                                <option value="PM">St. Pierre and Miquelon</option>
                                                                <option value="VC">
                                                                    St. Vincent and The Grenadines
                                                                </option>
                                                                <option value="SD">Sudan</option>
                                                                <option value="SR">Suriname</option>
                                                                <option value="SJ">Svalbard and Jan Mayen</option>
                                                                <option value="SE">Sweden</option>
                                                                <option value="CH">Switzerland</option>
                                                                <option value="SY">Syrian Arab Republic</option>
                                                                <option value="TW">Taiwan</option>
                                                                <option value="TJ">Tajikistan</option>
                                                                <option value="TZ">Tanzania</option>
                                                                <option value="TH">Thailand</option>
                                                                <option value="TG">Togo</option>
                                                                <option value="TK">Tokelau</option>
                                                                <option value="TO">Tonga</option>
                                                                <option value="TT">Trinidad and Tobago</option>
                                                                <option value="TN">Tunisia</option>
                                                                <option value="TR">Turkey</option>
                                                                <option value="TM">Turkmenistan</option>
                                                                <option value="TC">Turks and Caicos Islands</option>
                                                                <option value="TV">Tuvalu</option>
                                                                <option value="UG">Uganda</option>
                                                                <option value="UA">Ukraine</option>
                                                                <option value="AE">United Arab Emirates</option>
                                                                <option value="GB">United Kingdom</option>
                                                                <option value="US">United States</option>
                                                                <option value="UM">
                                                                    United States Minor Outlying Islands (the)
                                                                </option>
                                                                <option value="UY">Uruguay</option>
                                                                <option value="VI">US Virgin Islands</option>
                                                                <option value="UZ">Uzbekistan</option>
                                                                <option value="VU">Vanuatu</option>
                                                                <option value="VA">Vatican</option>
                                                                <option value="VE">Venezuela</option>
                                                                <option value="VN">Vietnam</option>
                                                                <option value="EH">Western Sahara</option>
                                                                <option value="YE">Yemen</option>
                                                                <option value="ZM">Zambia</option>
                                                                <option value="ZW">Zimbabwe</option>
                                                            </select>
                                                            <span
                                                                className="field-validation-valid"
                                                                data-valmsg-for="flightBookingRequest.Payment.Country"
                                                                data-valmsg-replace="true"
                                                            />
                                                        </div>
                                                        <span className="required_mobile">*</span>
                                                    </div>
                                                    <div
                                                        className="col-sm-6 hidden-xs"
                                                        bis_skin_checked={1}
                                                    ></div>
                                                </div>
                                                <div className="row" bis_skin_checked={1}>
                                                    <div className="col-xs-12" bis_skin_checked={1}>
                                                        <label className="label_hide_mobile">
                                                            Address<span className="required">*</span>
                                                        </label>
                                                        <textarea
                                                            autoComplete="off"
                                                            className="Payment pac-target-input"
                                                            cols={20}
                                                            data-val="true"
                                                            data-val-required="The Address1 field is required."
                                                            id="flightBookingRequest_Payment_Address1"
                                                            maxLength={150}
                                                            name="flightBookingRequest.Payment.Address1"
                                                            placeholder="Address"
                                                            rows={2}
                                                            defaultValue={""}
                                                        />
                                                        <span
                                                            className="field-validation-valid"
                                                            data-valmsg-for="flightBookingRequest.Payment.Address1"
                                                            data-valmsg-replace="true"
                                                        />
                                                        <span className="required_mobile">*</span>
                                                    </div>
                                                </div>
                                                <div className="row" bis_skin_checked={1}>
                                                    <div className="col-xs-12" bis_skin_checked={1}>
                                                        <div className="row" bis_skin_checked={1}>
                                                            <div
                                                                className="col-sm-4 col-xs-12"
                                                                id="ddlState"
                                                                bis_skin_checked={1}
                                                            >
                                                                <label className="label_hide_mobile">
                                                                    State/Province<span className="required">*</span>
                                                                </label>
                                                                <div className="form-righterrow" bis_skin_checked={1}>
                                                                    <select
                                                                        className="Payment"
                                                                        id="flightBookingRequest_Payment_State"
                                                                        name="flightBookingRequest.Payment.State"
                                                                    >
                                                                        <option value="">Select State</option>
                                                                        <option value="AA">
                                                                            Armed Forces (the) Americas
                                                                        </option>
                                                                        <option value="AE">Armed Forces Europe</option>
                                                                        <option value="AE">Armed Forces Africa</option>
                                                                        <option value="AE">
                                                                            Armed Forces Middle East
                                                                        </option>
                                                                        <option value="AE">Armed Forces Canada</option>
                                                                        <option value="AP">Armed Forces Pacific</option>
                                                                        <option value="AL">Alabama</option>
                                                                        <option value="AK">Alaska</option>
                                                                        <option value="AZ">Arizona</option>
                                                                        <option value="AR">Arkansas</option>
                                                                        <option value="CA">California</option>
                                                                        <option value="CO">Colorado</option>
                                                                        <option value="CT">Connecticut</option>
                                                                        <option value="DE">Delaware</option>
                                                                        <option value="DC">District of Columbia</option>
                                                                        <option value="FL">Florida</option>
                                                                        <option value="GA">Georgia</option>
                                                                        <option value="HI">Hawaii</option>
                                                                        <option value="ID">Idaho</option>
                                                                        <option value="IL">Illinois</option>
                                                                        <option value="IN">Indiana</option>
                                                                        <option value="IA">Iowa</option>
                                                                        <option value="KS">Kansas</option>
                                                                        <option value="KY">Kentucky</option>
                                                                        <option value="LA">Louisiana</option>
                                                                        <option value="ME">Maine</option>
                                                                        <option value="MD">Maryland</option>
                                                                        <option value="MA">Massachusetts</option>
                                                                        <option value="MI">Michigan</option>
                                                                        <option value="MN">Minnesota</option>
                                                                        <option value="MS">Mississippi</option>
                                                                        <option value="MO">Missouri</option>
                                                                        <option value="MT">Montana</option>
                                                                        <option value="NE">Nebraska</option>
                                                                        <option value="NV">Nevada</option>
                                                                        <option value="NH">New Hampshire</option>
                                                                        <option value="NJ">New Jersey</option>
                                                                        <option value="NM">New Mexico</option>
                                                                        <option value="NY">New York</option>
                                                                        <option value="NC">North Carolina</option>
                                                                        <option value="ND">North Dakota</option>
                                                                        <option value="OH">Ohio</option>
                                                                        <option value="OK">Oklahoma</option>
                                                                        <option value="OR">Oregon</option>
                                                                        <option value="PW">Palau</option>
                                                                        <option value="PA">Pennsylvania</option>
                                                                        <option value="PR">Puerto Rico</option>
                                                                        <option value="RI">Rhode Island</option>
                                                                        <option value="SC">South Carolina</option>
                                                                        <option value="SD">South Dakota</option>
                                                                        <option value="TN">Tennessee</option>
                                                                        <option value="TX">Texas</option>
                                                                        <option value="UT">Utah</option>
                                                                        <option value="VT">Vermont</option>
                                                                        <option value="VA">Virginia</option>
                                                                        <option value="WA">Washington</option>
                                                                        <option value="WV">West Virginia</option>
                                                                        <option value="WI">Wisconsin</option>
                                                                        <option value="WY">Wyoming</option>
                                                                    </select>
                                                                </div>
                                                                <span className="required_mobile">*</span>
                                                                <div
                                                                    className="error_text"
                                                                    style={{
                                                                        display: "block",
                                                                        background: "#fff0e5",
                                                                        border: "1px solid #ff6e03",
                                                                        padding: "5px 5px 5px 27px",
                                                                        fontWeight: 500,
                                                                        fontSize: 12,
                                                                        position: "relative",
                                                                        margin: "-3px 0 15px 0"
                                                                    }}
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <i
                                                                        className="fa fa-info-circle"
                                                                        aria-hidden="true"
                                                                        style={{
                                                                            fontSize: 19,
                                                                            position: "absolute",
                                                                            left: 5
                                                                        }}
                                                                    />
                                                                    Travel Protection is not available to residents of
                                                                    New York.
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="col-sm-4 col-xs-12"
                                                                style={{ display: "none" }}
                                                                id="txtState"
                                                                bis_skin_checked={1}
                                                            >
                                                                <label className="label_hide_mobile">
                                                                    State/Province
                                                                </label>
                                                                <input
                                                                    className="nonvalidateTxt"
                                                                    id="flightBookingRequest_Payment_State1"
                                                                    name="flightBookingRequest.Payment.State1"
                                                                    placeholder="State/Province"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                            </div>
                                                            <div
                                                                className="col-sm-4 col-xs-12"
                                                                bis_skin_checked={1}
                                                            >
                                                                <label className="label_hide_mobile">
                                                                    City Town<span className="required">*</span>
                                                                </label>
                                                                <input
                                                                    autoComplete="off"
                                                                    className="Payment alphanumeric"
                                                                    data-val="true"
                                                                    data-val-required="The City field is required."
                                                                    id="flightBookingRequest_Payment_City"
                                                                    name="flightBookingRequest.Payment.City"
                                                                    placeholder="City Town"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                                <span className="required_mobile">*</span>
                                                            </div>
                                                            <div
                                                                className="col-sm-4 col-xs-12"
                                                                bis_skin_checked={1}
                                                            >
                                                                <label className="label_hide_mobile">
                                                                    Postal Code<span className="required">*</span>
                                                                </label>
                                                                <input
                                                                    autoComplete="off"
                                                                    className="Payment pincodeval"
                                                                    data-val="true"
                                                                    data-val-required="The PostalCode field is required."
                                                                    id="flightBookingRequest_Payment_PostalCode"
                                                                    maxLength={7}
                                                                    minLength={5}
                                                                    name="flightBookingRequest.Payment.PostalCode"
                                                                    placeholder="Postal Code"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                                <span
                                                                    className="field-validation-valid"
                                                                    data-valmsg-for="flightBookingRequest.Payment.PostalCode"
                                                                    data-valmsg-replace="true"
                                                                />
                                                                <span className="required_mobile">*</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="imp-msg" bis_skin_checked={1} />
                                            </div>
                                            <div className="form-box" bis_skin_checked={1}>
                                                <div className="mainheading" bis_skin_checked={1}>
                                                    <img
                                                        src="/assets/images/svg/p-payment-detail.svg"
                                                        className="icon payment-icon"
                                                    />
                                                    Payment Details
                                                </div>
                                                <p>
                                                    All card information is fully encrypted, secure and
                                                    protected.
                                                </p>
                                                <p id="paymess" style={{ color: "red", display: "none" }}>
                                                    please select payment methord
                                                </p>
                                                <div className="row" bis_skin_checked={1}>
                                                    <div
                                                        className="col-sm-12 col-xs-12 relative"
                                                        bis_skin_checked={1}
                                                    >
                                                        <div
                                                            className="inputSet paymentradio"
                                                            bis_skin_checked={1}
                                                        >
                                                            <img
                                                                className="debit-card-logo pull-right"
                                                                src="/assets/images/card-icon/debitcard-blank.svg?v=1.2"
                                                            />
                                                            <label
                                                                className="pcc card_tab payment_tab"
                                                                onclick="showcarddata('true');"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    defaultValue="true"
                                                                    defaultChecked=""
                                                                />
                                                                <span>
                                                                    <b>Debit/Credit Card</b>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="row pay-with-cc"
                                                    style={{ display: "block" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="row" bis_skin_checked={1}>
                                                        <div
                                                            className="col-sm-6 col-sm-push-6 col-xs-12"
                                                            bis_skin_checked={1}
                                                        >
                                                            <div className="payment-method" bis_skin_checked={1}>
                                                                <span className="hidden-xs">

                                                                    Available payment methods
                                                                </span>
                                                                <img src="/assets/images/payment/card-sprite.png?v=1.2" />
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-sm-6 col-sm-pull-6 col-xs-12 data-hj-suppress"
                                                            bis_skin_checked={1}
                                                        >
                                                            <label className="label_hide_mobile">
                                                                Credit/Debit Card No
                                                                <span className="required">*</span>
                                                            </label>
                                                            <div
                                                                className="inbx-cc card-js relative"
                                                                bis_skin_checked={1}
                                                            >
                                                                <div
                                                                    className="card-number-wrapper"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <input
                                                                        autoComplete="off"
                                                                        className="card-number txtdgt numeric Payment "
                                                                        classval="data-numeric"
                                                                        data-val="true"
                                                                        data-val-required="The CardNumber field is required."
                                                                        id="flightBookingRequest_Payment_CardNumber"
                                                                        maxLength={19}
                                                                        minLength={17}
                                                                        name="flightBookingRequest.Payment.CardNumber"
                                                                        placeholder="Credit/Debit Card No"
                                                                        type="tel"
                                                                        defaultValue=""
                                                                        x-autocompletetype="cc-number"
                                                                        autocompletetype="cc-number"
                                                                        autoCorrect="off"
                                                                        spellCheck="off"
                                                                        autoCapitalize="off"
                                                                    />
                                                                    <div
                                                                        className="card-type-icon"
                                                                        bis_skin_checked={1}
                                                                    ></div>
                                                                    <div className="icon" bis_skin_checked={1}>
                                                                        <svg
                                                                            version="1.1"
                                                                            id="Capa_1"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                            x="0px"
                                                                            y="3px"
                                                                            width="24px"
                                                                            height="17px"
                                                                            viewBox="0 0 216 146"
                                                                            enableBackground="new 0 0 216 146"
                                                                            xmlSpace="preserve"
                                                                        >
                                                                            <g>
                                                                                <path
                                                                                    className="svg"
                                                                                    d="M182.385,14.258c-2.553-2.553-5.621-3.829-9.205-3.829H42.821c-3.585,0-6.653,1.276-9.207,3.829c-2.553,2.553-3.829,5.621-3.829,9.206v99.071c0,3.585,1.276,6.654,3.829,9.207c2.554,2.553,5.622,3.829,9.207,3.829H173.18c3.584,0,6.652-1.276,9.205-3.829s3.83-5.622,3.83-9.207V23.464C186.215,19.879,184.938,16.811,182.385,14.258z M175.785,122.536c0,0.707-0.258,1.317-0.773,1.834c-0.516,0.515-1.127,0.772-1.832,0.772H42.821c-0.706,0-1.317-0.258-1.833-0.773c-0.516-0.518-0.774-1.127-0.774-1.834V73h135.571V122.536z M175.785,41.713H40.214v-18.25c0-0.706,0.257-1.316,0.774-1.833c0.516-0.515,1.127-0.773,1.833-0.773H173.18c0.705,0,1.316,0.257,1.832,0.773c0.516,0.517,0.773,1.127,0.773,1.833V41.713z"
                                                                                />
                                                                                <rect
                                                                                    className="svg"
                                                                                    x="50.643"
                                                                                    y="104.285"
                                                                                    width="20.857"
                                                                                    height="10.429"
                                                                                ></rect>
                                                                                <rect
                                                                                    className="svg"
                                                                                    x="81.929"
                                                                                    y="104.285"
                                                                                    width="31.286"
                                                                                    height="10.429"
                                                                                />
                                                                            </g>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="expiry-container"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <div
                                                                        className="expiry-wrapper"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <div bis_skin_checked={1}>
                                                                            <input
                                                                                className="expiry"
                                                                                placeholder="MM / YY"
                                                                                type="tel"
                                                                                maxLength={7}
                                                                                x-autocompletetype="cc-exp"
                                                                                autocompletetype="cc-exp"
                                                                                autoCorrect="off"
                                                                                spellCheck="off"
                                                                                autoCapitalize="off"
                                                                            />
                                                                            <input className="expiry-month" type="hidden" />
                                                                            <input className="expiry-year" type="hidden" />
                                                                        </div>
                                                                        <div className="icon" bis_skin_checked={1}>
                                                                            <svg
                                                                                version="1.1"
                                                                                id="Capa_1"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                                x="0px"
                                                                                y="4px"
                                                                                width="24px"
                                                                                height="16px"
                                                                                viewBox="0 0 216 146"
                                                                                enableBackground="new 0 0 216 146"
                                                                                xmlSpace="preserve"
                                                                            >
                                                                                <path
                                                                                    className="svg"
                                                                                    d="M172.691,23.953c-2.062-2.064-4.508-3.096-7.332-3.096h-10.428v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.554-2.553-5.621-3.83-9.207-3.83h-5.213c-3.586,0-6.654,1.277-9.207,3.83c-2.554,2.553-3.83,5.622-3.83,9.206v7.822H92.359v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.553-2.553-5.622-3.83-9.207-3.83h-5.214c-3.585,0-6.654,1.277-9.207,3.83c-2.553,2.553-3.83,5.622-3.83,9.206v7.822H50.643c-2.825,0-5.269,1.032-7.333,3.096s-3.096,4.509-3.096,7.333v104.287c0,2.823,1.032,5.267,3.096,7.332c2.064,2.064,4.508,3.096,7.333,3.096h114.714c2.824,0,5.27-1.032,7.332-3.096c2.064-2.064,3.096-4.509,3.096-7.332V31.286C175.785,28.461,174.754,26.017,172.691,23.953z M134.073,13.036c0-0.761,0.243-1.386,0.731-1.874c0.488-0.488,1.113-0.733,1.875-0.733h5.213c0.762,0,1.385,0.244,1.875,0.733c0.488,0.489,0.732,1.114,0.732,1.874V36.5c0,0.761-0.244,1.385-0.732,1.874c-0.49,0.488-1.113,0.733-1.875,0.733h-5.213c-0.762,0-1.387-0.244-1.875-0.733s-0.731-1.113-0.731-1.874V13.036z M71.501,13.036c0-0.761,0.244-1.386,0.733-1.874c0.489-0.488,1.113-0.733,1.874-0.733h5.214c0.761,0,1.386,0.244,1.874,0.733c0.488,0.489,0.733,1.114,0.733,1.874V36.5c0,0.761-0.244,1.386-0.733,1.874c-0.489,0.488-1.113,0.733-1.874,0.733h-5.214c-0.761,0-1.386-0.244-1.874-0.733c-0.488-0.489-0.733-1.113-0.733-1.874V13.036z M165.357,135.572H50.643V52.143h114.714V135.572z"
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="cvc-container" bis_skin_checked={1}>
                                                                    <div className="cvc-wrapper" bis_skin_checked={1}>
                                                                        <input
                                                                            className="cvc"
                                                                            placeholder="CVC"
                                                                            type="tel"
                                                                            maxLength={3}
                                                                            x-autocompletetype="cc-csc"
                                                                            autocompletetype="cc-csc"
                                                                            autoCorrect="off"
                                                                            spellCheck="off"
                                                                            autoCapitalize="off"
                                                                        />
                                                                        <div className="icon" bis_skin_checked={1}>
                                                                            <svg
                                                                                version="1.1"
                                                                                id="Capa_1"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                                x="0px"
                                                                                y="3px"
                                                                                width="24px"
                                                                                height="17px"
                                                                                viewBox="0 0 216 146"
                                                                                enableBackground="new 0 0 216 146"
                                                                                xmlSpace="preserve"
                                                                            >
                                                                                <path
                                                                                    className="svg"
                                                                                    d="M152.646,70.067c-1.521-1.521-3.367-2.281-5.541-2.281H144.5V52.142c0-9.994-3.585-18.575-10.754-25.745c-7.17-7.17-15.751-10.755-25.746-10.755s-18.577,3.585-25.746,10.755C75.084,33.567,71.5,42.148,71.5,52.142v15.644h-2.607c-2.172,0-4.019,0.76-5.54,2.281c-1.521,1.52-2.281,3.367-2.281,5.541v46.929c0,2.172,0.76,4.019,2.281,5.54c1.521,1.52,3.368,2.281,5.54,2.281h78.214c2.174,0,4.02-0.76,5.541-2.281c1.52-1.521,2.281-3.368,2.281-5.54V75.607C154.93,73.435,154.168,71.588,152.646,70.067z M128.857,67.786H87.143V52.142c0-5.757,2.037-10.673,6.111-14.746c4.074-4.074,8.989-6.11,14.747-6.11s10.673,2.036,14.746,6.11c4.073,4.073,6.11,8.989,6.11,14.746V67.786z"
                                                                                ></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <input
                                                            id="flightBookingRequest_Payment_CardCode"
                                                            name="flightBookingRequest.Payment.CardCode"
                                                            type="hidden"
                                                            defaultValue=""
                                                        />
                                                        <input
                                                            id="flightBookingRequest_Payment_MaskCardNumber"
                                                            name="flightBookingRequest.Payment.MaskCardNumber"
                                                            type="hidden"
                                                            defaultValue=""
                                                        />
                                                        <input type="hidden" defaultValue="" id="cardNo" />
                                                    </div>
                                                    <div className="row" bis_skin_checked={1}>
                                                        <div className="col-sm-6 col-xs-12" bis_skin_checked={1}>
                                                            <label className="label_hide_mobile">
                                                                Card holder's name<span className="required">*</span>
                                                            </label>
                                                            <div bis_skin_checked={1}>
                                                                <input
                                                                    autoComplete="off"
                                                                    className="alphanumeric esname Payment "
                                                                    data-val="true"
                                                                    data-val-required="The CardHolderName field is required."
                                                                    id="flightBookingRequest_Payment_CardHolderName"
                                                                    maxLength={50}
                                                                    minLength={2}
                                                                    name="flightBookingRequest.Payment.CardHolderName"
                                                                    onKeyPress="return isCharOnly(event);"
                                                                    placeholder="Card holder's name"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                                <span
                                                                    className="field-validation-valid"
                                                                    data-valmsg-for="flightBookingRequest.Payment.CardHolderName"
                                                                    data-valmsg-replace="true"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 hidden-xs" bis_skin_checked={1}>
                                                            <a
                                                                onclick="window.open('https://www.TourTravelHub.com/us/security-metrices-certificate.pdf?v5', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=900,height=600, screenX=100,screenY=50')"
                                                                href={""}
                                                            >
                                                                <img
                                                                    src="/assets/images/footer/security-metrices-blue.svg"
                                                                    style={{ verticalAlign: "middle", marginTop: 30 }}
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="row" bis_skin_checked={1}>
                                                        <div className="col-sm-6 col-xs-12" bis_skin_checked={1}>
                                                            <div className="row" bis_skin_checked={1}>
                                                                <div
                                                                    className="col-sm-4 col-xs-4"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <label>

                                                                        Exp. Month<span className="required">*</span>
                                                                    </label>
                                                                    <div
                                                                        className="form-righterrow"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <select
                                                                            className="Payment "
                                                                            data-val="true"
                                                                            data-val-required="The ExpiryMonth field is required."
                                                                            id="flightBookingRequest_Payment_ExpiryMonth"
                                                                            name="flightBookingRequest.Payment.ExpiryMonth"
                                                                        >
                                                                            <option value="">Select</option>
                                                                            <option value={1}>01-Jan</option>
                                                                            <option value={2}>02-Feb</option>
                                                                            <option value={3}>03-Mar</option>
                                                                            <option value={4}>04-Apr</option>
                                                                            <option value={5}>05-May</option>
                                                                            <option value={6}>06-Jun</option>
                                                                            <option value={7}>07-Jul</option>
                                                                            <option value={8}>08-Aug</option>
                                                                            <option value={9}>09-Sep</option>
                                                                            <option value={10}>10-Oct</option>
                                                                            <option value={11}>11-Nov</option>
                                                                            <option value={12}>12-Dec</option>
                                                                        </select>
                                                                        <span
                                                                            className="field-validation-valid"
                                                                            data-valmsg-for="flightBookingRequest.Payment.ExpiryMonth"
                                                                            data-valmsg-replace="true"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="col-sm-4 col-xs-4"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <label>
                                                                        Exp. Year<span className="required">*</span>
                                                                    </label>
                                                                    <div
                                                                        className="form-righterrow"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <select
                                                                            className="Payment "
                                                                            data-val="true"
                                                                            data-val-required="The ExpiryYear field is required."
                                                                            id="flightBookingRequest_Payment_ExpiryYear"
                                                                            name="flightBookingRequest.Payment.ExpiryYear"
                                                                        >
                                                                            <option value="">Select</option>
                                                                            <option>2024</option>
                                                                            <option>2025</option>
                                                                            <option>2026</option>
                                                                            <option>2027</option>
                                                                            <option>2028</option>
                                                                            <option>2029</option>
                                                                            <option>2030</option>
                                                                            <option>2031</option>
                                                                            <option>2032</option>
                                                                            <option>2033</option>
                                                                            <option>2034</option>
                                                                            <option>2035</option>
                                                                        </select>
                                                                        <span
                                                                            className="field-validation-valid"
                                                                            data-valmsg-for="flightBookingRequest.Payment.ExpiryYear"
                                                                            data-valmsg-replace="true"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="col-sm-4 col-xs-4"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <label>
                                                                        CVV<span className="required">*</span>
                                                                    </label>
                                                                    <input
                                                                        autoComplete="off"
                                                                        className="numeric Payment numbersOnly "
                                                                        data-val="true"
                                                                        data-val-required="The CvvNo field is required."
                                                                        id="flightBookingRequest_Payment_CvvNo"
                                                                        maxLength={4}
                                                                        minLength={3}
                                                                        name="flightBookingRequest.Payment.CvvNo"
                                                                        type="password"
                                                                        defaultValue=""
                                                                    />
                                                                    <span
                                                                        className="field-validation-valid"
                                                                        data-valmsg-for="flightBookingRequest.Payment.CvvNo"
                                                                        data-valmsg-replace="true"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 col-xs-12" bis_skin_checked={1}>
                                                            <div
                                                                className="cvv-txt"
                                                                id="three"
                                                                bis_skin_checked={1}
                                                            >
                                                                <img src="/assets/images/payment/cvv.png" />
                                                                <span> 3 Digit number from your card</span>
                                                                <span className="cardImg hidden-xs" />
                                                            </div>
                                                            <div
                                                                className="cvv-txt"
                                                                style={{ display: "none" }}
                                                                id="Four"
                                                                bis_skin_checked={1}
                                                            >
                                                                <img src="/assets/images/payment/cvv.png" />
                                                                <span> 4 Digit number from your card</span>
                                                                <span className="cardImg hidden-xs" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="norton-block" bis_skin_checked={1}>
                                                    <a
                                                        className="visible-xs"
                                                        onclick="window.open('https://www.TourTravelHub.com/us/security-metrices-certificate.pdf?v5', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=900,height=600, screenX=100,screenY=50')"
                                                        href={""}
                                                    >
                                                        <img
                                                            src="/assets/images/footer/security-metrices-blue.svg"
                                                            style={{ verticalAlign: "middle" }}
                                                            className="godaddy"
                                                        />
                                                    </a>
                                                    <span className="digicert-logo">
                                                        <div
                                                            id="DigiCertClickID_7dlUvcGZpayment"
                                                            bis_skin_checked={1}
                                                        >
                                                            <div
                                                                id="DigiCertClickID_7dlUvcGZpaymentSeal"
                                                                bis_skin_checked={1}
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
                                                                    id="DigiCertClickID_7dlUvcGZpayment_object"
                                                                    type="image/svg+xml"
                                                                    data="//seal.digicert.com/seals/cascade/?tag=7dlUvcGZ&referer=www.TourTravelHub.com&format=svg&an=min"
                                                                    role="link"
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
                                                                        cursor: "pointer"
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <img
                                                        src="/assets/images/payment/godaddy.png"
                                                        className="godaddy"
                                                    />
                                                </div>
                                                {/*  */}
                                            </div>
                                            <div className="form-box" bis_skin_checked={1}>
                                                <div style={{ marginBottom: 5 }} bis_skin_checked={1}>
                                                    Please be careful - Passenger details must match your
                                                    passport or photo ID
                                                </div>
                                                <div className="head" bis_skin_checked={1}>
                                                    <p id="pxdtails">
                                                        <span>

                                                            Adult 1 - <span id="p0_confirm_name">Missing name</span>
                                                            <a
                                                                href="javacript:void(0);"
                                                                onclick="scrollToElement('#p0_wrapper')"
                                                            >
                                                                (make changes)
                                                            </a>
                                                        </span>
                                                        <br />
                                                    </p>
                                                </div>
                                                <div className="imp-msg" bis_skin_checked={1}>
                                                    <div className="tnc-txt" bis_skin_checked={1}>
                                                        <p className="hidden-xs hidden-sm">
                                                            By clicking, <span className="bkdyntxt">Book Now</span>
                                                            I agree that I have read and accepted TourTravelHub
                                                            <a href="/assets/terms-conditions" target="_blank">
                                                                Terms &amp; Conditions
                                                            </a>
                                                            and
                                                            <a href="/assets/privacy-policy" target="_blank">
                                                                Privacy Policy
                                                            </a>
                                                        </p>
                                                        <p className="visible-xs visible-sm">
                                                            By clicking, <span className="bkdyntxt">Book Now</span>
                                                            I agree that I have read and accepted TourTravelHub
                                                            <a
                                                                onclick="Filter.getmobile_popup('tnc')"
                                                                className="text_link"
                                                                data-toggle="modal"
                                                                data-target="#mobile-popup"
                                                                href={""}
                                                            >
                                                                Terms &amp; Conditions
                                                            </a>
                                                            and
                                                            <a
                                                                onclick="Filter.getmobile_popup('privacypolicy')"
                                                                className="text_link"
                                                                data-toggle="modal"
                                                                data-target="#mobile-popup"
                                                                href={""}
                                                            >
                                                                Privacy Policy
                                                            </a>
                                                        </p>
                                                        <div className="clearfix" bis_skin_checked={1} />
                                                    </div>
                                                </div>
                                                <div className="step-continue" bis_skin_checked={1}>
                                                    <button
                                                        className="main-btn pay-cc"
                                                        onclick="return ValidationForBooking('false');"
                                                        id="btnBookNow"
                                                        name="btnBookNow"
                                                    >
                                                        <i className="fa fa-lock" aria-hidden="true" /> Book Now
                                                    </button>
                                                    <button
                                                        className="main-btn  pay-affirm"
                                                        type="button"
                                                        onclick="return PayaffirmPayment();"
                                                        style={{ display: "none" }}
                                                    >

                                                        Book with <span className="affirm-btn" />
                                                    </button>
                                                    <p>
                                                        <br />
                                                        <small>
                                                            Your payment details are secured via 256 Bit encryption
                                                            by GoDaddy
                                                        </small>
                                                    </p>
                                                </div>
                                                <div className="imp-msg" bis_skin_checked={1}>
                                                    <div className="tnc-txt" bis_skin_checked={1}>
                                                        <p>
                                                            <b>NOTE: </b>
                                                            <span className="text-blue">
                                                                Please check if the dates and timings of flight
                                                                departure are correct.
                                                            </span>
                                                            Also, make sure that the name of the traveler is
                                                            accurate as tickets are non-refundable and any change in
                                                            the name of the traveler is not permitted. Date and
                                                            routing changes will be subject to airline penalties and
                                                            our service fees. Fares are not guaranteed until
                                                            ticketed. All our service fees and taxes are included in
                                                            the total ticket cost. Itineraries cannot be changed
                                                            within 7 days before departure, and no credit will be
                                                            issued. You can cancel your reservation within 24 hrs of
                                                            purchase for a full refund by calling our 24/7 customer
                                                            support provided the purchase was made before 7 days of
                                                            departure. However, a nominal cancelation fee will be
                                                            applicable.
                                                        </p>
                                                        <div className="clearfix" bis_skin_checked={1} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="st_footer" bis_skin_checked={1} />
                                        </div>
                                    </div>}
                                </div>
                                <div
                                    id="div_gotopayment"
                                    style={{ display: "none" }}
                                    bis_skin_checked={1}
                                >
                                    <div
                                        style={{
                                            padding: 7,
                                            width: 119,
                                            position: "fixed",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            zIndex: 10007,
                                            background: "#fff",
                                            textAlign: "center",
                                            borderRadius: 10
                                        }}
                                        bis_skin_checked={1}
                                    >
                                        <img src="/images/loading.gif" style={{ width: 80 }} />
                                    </div>
                                    <div
                                        className="midum-overlay"
                                        id="fadebackground"
                                        bis_skin_checked={1}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <style
                        dangerouslySetInnerHTML={{
                            __html:
                                "\n                                                .navbar-nav, .traveler-fees-slide {\n                                                    display: none;\n        }\n\n                                                .footer-component {\n                                                    display: none;\n        }\n\n                                                .copyright-block {\n                                                    border - top: 1px solid #ccc;\n                                                padding-top: 30px;\n        }\n                                            "
                        }}
                    />
                    <div
                        id="div_sessioTimeOut"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div className="list-count" bis_skin_checked={1}>
                            <div className="list-count-banner sesson-exp" bis_skin_checked={1}>
                                <div className="top-head" bis_skin_checked={1}>
                                    <div className="lto2" bis_skin_checked={1}>
                                        Your Session will expire in
                                    </div>
                                    <div className="clock_timer" bis_skin_checked={1}>
                                        <img
                                            src="/assets/images/listing/timer.png"
                                            style={{ width: 24, marginRight: 7 }}
                                        />
                                        <span id="timer">15m 00s </span>
                                    </div>
                                </div>
                                <div
                                    className="btm-txt txt2"
                                    style={{ marginBottom: 15 }}
                                    bis_skin_checked={1}
                                >
                                    Click "Continue" button to working on this page
                                </div>
                                <div
                                    className="call-btn"
                                    onclick="hideSessionAlert()"
                                    bis_skin_checked={1}
                                >
                                    <a href={""} className="w200">
                                        Continue
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="list-count"
                        id="session-expire-warning-modal"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div className="list-count-banner" bis_skin_checked={1}>
                            <div className="top-head" bis_skin_checked={1}>
                                <div className="timer-icon" align="center" bis_skin_checked={1}>
                                    <i className="fa fa-clock-o" style={{ fontSize: 42 }} />
                                </div>
                            </div>
                            <br />
                            <div className="btm-txt txt2" bis_skin_checked={1}>
                                <p>
                                    Flight Prices may change frequently owing to demand and
                                    availability. Start a <b>New Search</b> to view the latest deals
                                </p>
                            </div>
                            <br />
                            <div className="call-btn" bis_skin_checked={1}>
                                <a href="/us" id="sess_startagain" className="w200">
                                    Start Again
                                </a>
                            </div>
                        </div>
                        <div className="midum-overlay" id="fadebackground" bis_skin_checked={1} />
                    </div>
                    <div
                        id="confrmWait"
                        className="list-count"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div
                            className="list-count-banner"
                            style={{ minHeight: "auto" }}
                            bis_skin_checked={1}
                        >
                            <div align="center" bis_skin_checked={1}>
                                <img src="/assets/images/payment/loading.gif" />
                            </div>
                            <div
                                className="top-head"
                                style={{ minHeight: "auto" }}
                                bis_skin_checked={1}
                            >
                                <div className="lto2" bis_skin_checked={1}>
                                    Please Wait
                                    <br />
                                    while your booking request is being processed...
                                </div>
                            </div>
                            <div className="btm-txt txt2" bis_skin_checked={1}>
                                Please do not close this page or press your browser's back button.
                            </div>
                        </div>
                        <div className="midum-overlay" bis_skin_checked={1} />
                    </div>
                    <div
                        className="list-count in"
                        id="tfPriceChange"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div
                            className="list-count-banner"
                            style={{ minHeight: "auto", textAlign: "center" }}
                            bis_skin_checked={1}
                        >
                            <div
                                className="top-head"
                                style={{ minHeight: "auto" }}
                                bis_skin_checked={1}
                            >
                                <div
                                    className="call-btn"
                                    align="center"
                                    style={{ marginBottom: 20 }}
                                    bis_skin_checked={1}
                                >
                                    <img src="/assets/images/payment/price-up.png" />
                                </div>
                                <h4 style={{ color: "#4863db" }}>
                                    Airline increased the fare by <span id="incresedamount">$91.4</span>
                                </h4>
                            </div>
                            <div className="btm-txt mb20" bis_skin_checked={1}>
                                Your updated total fare is <b id="incresedfare">$91.4</b>. Previous
                                total fare was <b id="oldfare">$0</b>
                            </div>
                            <div className="btm-txt mb20" bis_skin_checked={1}>
                                Airlines keep updating their fares over their system which causes fare
                                changes from time to time.
                            </div>
                            <div className="call-btn" bis_skin_checked={1}>
                                <a
                                    href={""}
                                    onclick="return continueBooking();"
                                    id="contBooking"
                                    className="w200"
                                    style={{ fontSize: 14, fontWeight: 400 }}
                                >

                                    Continue Booking
                                </a>
                                <a
                                    href={""}
                                    onclick="gotolisting();"
                                    id="pkAnotherFlight"
                                    className="w200"
                                    style={{
                                        background: "#333",
                                        marginLeft: 5,
                                        fontSize: 14,
                                        fontWeight: 400
                                    }}
                                >
                                    Select Another flight
                                </a>
                            </div>
                        </div>
                        <div className="midum-overlay" id="fadebackground" bis_skin_checked={1} />
                    </div>
                    <div
                        id="mobile-popup"
                        className="modal fade"
                        role="dialog"
                        bis_skin_checked={1}
                    >
                        <div className="modal-content" bis_skin_checked={1}>
                            <div className="close_window" bis_skin_checked={1}>
                                <button type="button" className="back_btn" data-dismiss="modal">
                                    <span className="fa fa-angle-left" />
                                </button>
                                <span id="popup_header">Terms &amp; Conditions</span>
                                <button type="button" className="close_btn" data-dismiss="modal">
                                    X
                                </button>
                            </div>
                            <div id="fltpopup" bis_skin_checked={1}></div>
                        </div>
                    </div>
                    <div
                        id="modaliframe"
                        className="modal fade"
                        tabIndex={-1}
                        role="dialog"
                        bis_skin_checked={1}
                    >
                        <div className="modal-dialog" bis_skin_checked={1}>
                            <div className="modal-content" bis_skin_checked={1}>
                                <div
                                    className="modal-body"
                                    id="iframe-container"
                                    bis_skin_checked={1}
                                >
                                    <iframe style={{ width: "100%", height: 450, border: 0 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="common_popup delete-bags-pop"
                        id="deltebagpopup"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div className="center-block" bis_skin_checked={1}>
                            <div className="outer" bis_skin_checked={1}>
                                <div className="newbaggage" bis_skin_checked={1}>
                                    <div className="icon-box" bis_skin_checked={1}>
                                        <img src="/assets/images/payment/addbag/delete-icon.svg" />
                                    </div>
                                    <div className="bags-box" bis_skin_checked={1}>
                                        <h6>Want to delete the bags?</h6>
                                        <p>Baggage charges are up to 50% higher at the airport !!</p>
                                        <div className="btn-box" bis_skin_checked={1}>
                                            <a onclick="removelallbagsok();" href={""}>
                                                Remove Bags
                                            </a>
                                            <a
                                                onclick="closebagpopup();"
                                                className="active"
                                                href={""}
                                            >
                                                I'll keep the bags
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="common_popup  successfully-added-pop"
                        id="successfullyaddedpop"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div className="center-block" bis_skin_checked={1}>
                            <div className="outer" bis_skin_checked={1}>
                                <div className="newbaggage" bis_skin_checked={1}>
                                    <div className="succesfull-box" bis_skin_checked={1}>
                                        <svg
                                            className="checkmark"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 52 52"
                                        >
                                            <circle
                                                className="checkmark__circle"
                                                cx={26}
                                                cy={26}
                                                r={25}
                                                fill="none"
                                            />
                                            <path
                                                className="checkmark__check"
                                                fill="none"
                                                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                            />
                                        </svg>
                                        <h6>Request has been successfully processed.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="common_popup"
                        id="callpoppay"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div className="center-block" bis_skin_checked={1}>
                            <div className="outer" bis_skin_checked={1}>
                                <div className="inner callpopup_inner" bis_skin_checked={1}>
                                    <a
                                        href={""}
                                        onclick="closeallpopup();"
                                        className="close_popup"
                                    >
                                        <svg
                                            width={16}
                                            height={16}
                                            fill="currentColor"
                                            className="bi bi-x-circle-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                        </svg>
                                    </a>
                                    <div className="toplogo" bis_skin_checked={1}>
                                        <img src="/assets/images/logo.png" alt="logo" />
                                    </div>
                                    <div className="images" bis_skin_checked={1}>
                                        <img
                                            src="/assets/images/payment/popup_image.png"
                                            alt="image"
                                            className="main_image"
                                        />
                                    </div>
                                    <h3>Can't Decide On Your Flight Booking?</h3>
                                    <p className="phoneonly">Phone Only Deals</p>
                                    <span className="extradiscount">Get Extra 15% Off</span>
                                    <a href="tel:+1-714-782-7027" className="call_action">
                                        <svg
                                            width={20}
                                            height={20}
                                            fill="currentColor"
                                            className="bi bi-telephone-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                                            />
                                        </svg>
                                        Call Now: +1-714-782-7027
                                    </a>
                                    <p className="expert">To Speak With A Travel Expert 24/7 Support</p>
                                    <div className="popuprating" bis_skin_checked={1}>
                                        <div className="left" bis_skin_checked={1}>
                                            <div className="poprating" bis_skin_checked={1}>
                                                <img
                                                    src="/assets/images/trustpilot/trust-pilot.png"
                                                    className="trustlogo"
                                                />
                                                <div className="excellent" bis_skin_checked={1}>
                                                    <b>Excellent</b>
                                                    <img
                                                        src="/images/trustpilot/stars-4.5.svg"
                                                        className="starimg"
                                                    />
                                                </div>
                                                <div className="review-txt" bis_skin_checked={1}>
                                                    (4.7) Based on 2341 Reviews
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right" bis_skin_checked={1}>
                                            <div className="poprating" bis_skin_checked={1}>
                                                <img
                                                    src="https://www.TourTravelHub.com/us/images/sitejabber/sitejabber-logo.svg?v=1.0"
                                                    className="sitejaberlogo"
                                                />
                                                <div className="excellent" bis_skin_checked={1}>
                                                    <b>Excellent</b>
                                                    <span className="sitejebber">
                                                        <span className="fill" style={{ width: "90%" }} />
                                                    </span>
                                                </div>
                                                <div className="review-txt" bis_skin_checked={1}>
                                                    (4.7) Based on 9,820 Reviews
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}</>
}

export default PurchasePage;