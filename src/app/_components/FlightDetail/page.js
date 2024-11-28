import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import SignInComponent from "../SignIn/page";
import SignUpComponent from "../SignUp/page";

const FlightDetail = ({ selectedFlight, travellerDetails }) => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const hideSignIn = () => {
        setShowSignIn(false);
    }

    const hideSignUp = () => {
        setShowSignUp(false);
    }

    const showSignUpForm = () => {
        setShowSignIn(false);
        setShowSignUp(true);
    }

    const showSignInFor = () => {
        setShowSignUp(false);
        setShowSignIn(true);
    }

    const handleCotnueViewDetail = () => {
        // if (!user) {
        //     setShowSignIn(true);
        // } else {
        localStorage.setItem("selectedflight", JSON.stringify(selectedFlight));
        localStorage.setItem("travellerDetails", JSON.stringify(travellerDetails));
        router.push(`/home/flights/flight/purchase/${selectedFlight.itineraries[0].segments[0].departure.iataCode}-${selectedFlight.itineraries[0].segments[0].arrival.iataCode}`)
        // }

    }

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
            return `${hours}:${minutes} ${ampm}`
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
    return <>
        {showSignIn && <SignInComponent hideLoginPopup={hideSignIn} showSignUp={showSignUpForm} />}
        {showSignUp && <SignUpComponent hideSignUp={hideSignUp} showSignIn={showSignInFor} />}
        {/* <!-- flight leg Start here  --> */}
        <div class="flight-leg-info" bis_skin_checked="1">

            {/* <!-- Depart Start here--> */}
            <div class="flight__content-box" id="deptab" bis_skin_checked="1">
                {/* <!--Repeat block Start here --> */}
                {selectedFlight.itineraries[0].segments.map((a, i) => {
                    return <>
                        <div class="flight-details-segment" bis_skin_checked="1">
                            {/* <!--Depart block Start here --> */}
                            <div class="flight-schedule flight_departure" bis_skin_checked="1">
                                <div class="flight_scheduleTime" bis_skin_checked="1">
                                    <strong>{getTimeFromDate(a.departure.at, false)}</strong>
                                    <div class="date " bis_skin_checked="1">{getFormattedDate(a.departure.at)}</div>
                                </div>
                                <div class="flight_scheduleStops-circle" bis_skin_checked="1"></div>
                                <div class="flight_scheduleLocation" bis_skin_checked="1">
                                    <div class="city" bis_skin_checked="1">{a.departure.airport.city}</div>
                                    <div class="airportname" bis_skin_checked="1">{a.departure.airport.name} ({a.departure.airport.iata}), {a.departure.airport.country}</div>
                                </div>
                            </div>
                            {/* <!-- End here--> */}
                            {/* <!--Trip time --> */}
                            <div class="flight_detailsInfoTravel" bis_skin_checked="1">
                                <div class="flight_stopIntervalSeparator" bis_skin_checked="1"></div>
                                <div class="flight-travel-details" bis_skin_checked="1">
                                    <div class="airlines-details" bis_skin_checked="1">
                                        <div class="right" style={{ marginBottom: "10px" }} bis_skin_checked="1">
                                            <div class="air-name" bis_skin_checked="1">
                                                <img src={a.airline.logo} alt="AIR INDIA" />
                                                {a.airline.name}
                                                - {a.carrierCode} {a.aircraft['code']}<br />
                                                <span class="text-gray">
                                                    Cabin : <span class="cabin_Out " id="cabin_Out_0">
                                                        {a.cabin}
                                                    </span>

                                                    <div class="flight-info flap-info-devider" bis_skin_checked="1">
                                                        Aircraft : {a.aircraft.code}
                                                        {/* <span class="tooltip-custom">
                                                    <i class="fa fa-info hand"></i>
                                                    <div class="promo-detail right_tooltip" bis_skin_checked="1">
                                                        <p class="mb5px">321 AIRBUS INDUSTRIE A321 JET 174-220 STD Seats</p>
                                                    </div>
                                                </span> */}

                                                    </div>



                                                    <div bis_skin_checked="1">




                                                    </div>


                                                </span>
                                            </div>

                                        </div>
                                        <div class="clearfix" bis_skin_checked="1"></div>

                                    </div>

                                    <div class="seat-pitch" id="BLR-DEL-AI-808-20240831-ECON" style={{ display: "none" }} bis_skin_checked="1">
                                    </div>

                                </div>

                                <div class="clearfix" bis_skin_checked="1"></div>
                            </div>
                            {/* <!--Trip time --> */}
                            {/* <!--arrival block Start here --> */}
                            <div class="flight-schedule flight_arrival" bis_skin_checked="1">
                                <div class="flight_scheduleTime" bis_skin_checked="1">
                                    <strong>{getTimeFromDate(a.arrival.at)}</strong>
                                    <div class="date" bis_skin_checked="1">{getFormattedDate(a.arrival.at)}</div>
                                </div>

                                <div class="flight_scheduleStops-circle" bis_skin_checked="1"></div>
                                <div class="flight_scheduleLocation" bis_skin_checked="1">

                                    <div class="city" bis_skin_checked="1">{a.arrival.airport.city}</div>
                                    <div class="airportname" bis_skin_checked="1">{a.arrival.airport.name} {a.arrival.airport.city} ({a.arrival.airport.iata}), {a.arrival.airport.country}</div>
                                </div>
                                <div class="clearfix" bis_skin_checked="1"></div>
                            </div>
                            {/* <!-- End here--> */}
                        </div>
                        {i !== selectedFlight.itineraries[0].segments.length - 1 && <div class="flight-details-segment" bis_skin_checked="1">
                            <div class="flight-stop flight-stop--danger" bis_skin_checked="1">
                                <div class="flight-duration" title="Transfer time" bis_skin_checked="1"><i class="fa fa-clock-o"></i> {calculateLayoverTime(selectedFlight)[0].itineraries.layover_time}</div>
                                <div class="flight-stop-interval" bis_skin_checked="1">
                                    <div class="flight_stopIntervalSeparator" bis_skin_checked="1"></div>
                                    <div class="flight-layover-label" bis_skin_checked="1">Layover in {a.arrival.airport.city}</div>
                                </div>
                                <div class="clearfix" bis_skin_checked="1"></div>
                            </div>
                        </div>}
                    </>
                })}
                {/* <!--Repeat block Start here --> */}
                <div class="total-trip-time" bis_skin_checked="1">
                    <i class="fa fa-clock-o"></i> Departure Trip Time: <b>{extractDuration(selectedFlight.itineraries[0].duration)}</b>
                </div>

            </div>
            <div class="flight__content-box" id="rettab" style={{ display: "none" }} bis_skin_checked="1">
                {/* <!--Repeat block Start here --> */}

                <div class="total-trip-time" bis_skin_checked="1">
                    <i class="fa fa-clock-o"></i> Return Trip Time: <b>3h 0m</b>
                </div>



            </div>
            {/* <!-- Depart End here--> */}
            <div class="flight__content-box fare-breakup breakup_tab" id="pricetab" style={{ display: "none" }} bis_skin_checked="1">


                {/* <!--Adult Section--> */}
                <div class="fare-section" bis_skin_checked="1">
                    <div class="line2" bis_skin_checked="1">
                        <a class="main blue">
                            <span>{selectedFlight.travelerPricings[0].price.total}</span>
                            <b>
                                1 Adult(s)
                            </b>
                        </a>
                    </div>
                    <div class="line taxes-fees" bis_skin_checked="1">
                        <p>
                            <span>$64.00</span>
                            <b>Per adult Base fare</b>
                        </p>
                        <p>
                            <span>$15.80</span>
                            <b>Per adult Taxes &amp; Fee</b>
                        </p>
                    </div>
                </div>

                <div class="total-price" bis_skin_checked="1">
                    <span><b>${selectedFlight.price.grandTotal}</b></span>
                    <b>Total</b>
                </div>

            </div>

            {/* <!-- Refundable Start here --> */}
            {/* <!-- Refundable Booking Start here --> */}
            <div class="refundableBox" bis_skin_checked="1">

                <h4><img src="/assets/images/listing/rp-icon.svg" alt="Refundable" class="rp-icon" /> Refundable Booking</h4>
                <div class="refundable_inner" bis_skin_checked="1">

                    {/* <!--<div class="refund-subtital">Choose Refundable Booking and receive a flight refund <b>($79.80)</b> even <b>up to 60 days</b> after you missed the flight and can <b>provide evidence</b> for one of the many reasons including:</div>--> */}

                    <div class="refund-subtital" bis_skin_checked="1">Upgrade your booking and receive a <b>100% refund</b> if you cannot attend and can evidence one of the many reasons in our <a onclick="window.open('https://www.refundable.me/extended/en/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')" href="javascript: void(0);" class="text-link" style={{ color: "#1a58c4" }}>Terms &amp; Conditions</a>, which you accept when you select a Refundable Booking.</div>


                    <div class="covid-txt" bis_skin_checked="1">COVID-19 Infection and Isolation, <a onclick="window.open('https://www.refundable.me/covid/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')" href="javascript: void(0);" class="text-link">see details</a></div>

                    <div class="check-list" bis_skin_checked="1">
                        <img src="/assets/images/listing/shild.png" alt="shild" class="icon_image" />
                        <ul>
                            <li>Flight refund: <b>($79.80)</b></li>
                            <li>Home Emergency</li>
                            <li>Illness / Injury (including Covid-19)</li>
                            <li>Adverse Weather</li>
                            <li>Sickness, Accident and Injury</li>
                            <li>Private vehicle failure</li>
                            <li>Pre-existing Medical Condition</li>
                            <li>Public Transport Failure</li>
                            <li>Mechanical Breakdown</li>
                            <li class="moreList" style={{ display: "none" }}>
                                <ul>
                                    <li>Jury Service</li>
                                    <li>Death of Immediate Family</li>
                                    <li>Court Summons</li>
                                    <li>Theft of Documents</li>
                                    <li>Pregnancy Complication</li>
                                    <li>Scheduled airline failure</li>
                                    <li>Armed Forces &amp; Emergency Services Recall</li>
                                    <li>Flight disruption</li>
                                    <li>Relocated for Work</li>
                                    <li>Changes to Examination Dates</li>
                                </ul>
                            </li>
                            <li class="manymore">And Many More...</li>

                        </ul>
                    </div>

                    <div class="price" bis_skin_checked="1">
                        <span class="fraPrice">$11.97</span>
                        <small class="perperson">per person</small>
                    </div>

                    <div class="text-center" bis_skin_checked="1">
                        <button id="btnSelectfra_sss901" class="continue_btn" onclick="$('#div_gotopayment').show();Filter.submitbut('sss901',1)" onClick={handleCotnueViewDetail}>Continue with Refundable Booking</button>
                    </div>
                </div>
            </div>
            {/* <!-- Refundable End here --> */}


            {/* <!-- Baggage Information Start here--> */}

            {/* <!--check baggage--> */}
            <div class="baggage_information-new" bis_skin_checked="1">
                <h4><img src="/assets/images/listing/baggage-icon.svg" alt="Baggage Information" class="baggage-icon" /> Baggage Information</h4>
                <div class="baggageBox" bis_skin_checked="1">
                    <div class="block w-100" bis_skin_checked="1">
                        <div class="head" bis_skin_checked="1">
                            <div class="air-name" bis_skin_checked="1"><img src={selectedFlight.itineraries[0].segments[0].airline.logo} /> {selectedFlight.itineraries[0].segments[0].airline.name} </div>
                        </div>
                        <div class="content" bis_skin_checked="1">
                            <ul>
                                <li>
                                    <div class="d-flex" bis_skin_checked="1">
                                        <div class="t-left" bis_skin_checked="1">
                                            <div class="baggageicons" bis_skin_checked="1"> <img src="/assets/images/svg/p-bag.svg" alt="" class="icons" /> </div>
                                            Personal Item
                                            <div class="light" bis_skin_checked="1"><div class="visible-xs" bis_skin_checked="1"> <strong></strong></div>  </div>


                                        </div>
                                        <div class="green t-right2 baggage_status" bis_skin_checked="1"><img src="/assets/images/svg/check.svg" alt="" /> Included</div>
                                        <div class="t-right" bis_skin_checked="1"> <strong></strong></div>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex" bis_skin_checked="1">
                                        <div class="t-left" bis_skin_checked="1">
                                            <div class="baggageicons" bis_skin_checked="1"> <img src="/assets/images/svg/c-bag.svg" alt="" class="icons" /> </div>
                                            Carry-on Bag
                                            <div class="light" bis_skin_checked="1"><div class="visible-xs" bis_skin_checked="1"> <strong></strong></div>  </div>


                                        </div>
                                        <div class="green t-right2 baggage_status" bis_skin_checked="1"><img src="/assets/images/svg/check.svg" alt="" /> Included</div>
                                        <div class="t-right" bis_skin_checked="1"> <strong></strong></div>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex" bis_skin_checked="1">
                                        <div class="t-left" bis_skin_checked="1">
                                            <div class="baggageicons" bis_skin_checked="1"> <img src="/assets/images/svg/b-bag.svg" alt="" class="icons" /> </div>
                                            Checked Bag
                                            <div class="light" bis_skin_checked="1"><div class="visible-xs" bis_skin_checked="1"> <strong>15K</strong></div>  </div>


                                        </div>
                                        <div class="green t-right2 baggage_status" bis_skin_checked="1"><img src="/assets/images/svg/check.svg" alt="" /> Included</div>
                                        <div class="t-right" bis_skin_checked="1"> <strong>15K</strong></div>
                                    </div>
                                </li>
                            </ul>

                            <p class="text" style={{ whiteSpace: "normal", marginBottom: 0, borderBottom: "none" }}>All prices are quoted in USD. Baggage allowance and fee amounts are not quaranteed and are subject to change by the airline. be sure to verify the actual fees with your airline(s) before you travel. </p>
                            <p class="text" style={{ whiteSpace: "normal", marginTop: 0 }}>
                                Confirm bag fees, weight and size restrictions with
                                <a href="http://www.airindia.in/checked-baggage-allowances.htm" rel="nofollow" target="_blank" class="ng-binding">{selectedFlight.itineraries[0].segments[0].airline.name}</a>&nbsp;<i class="fa fa-external-link" aria-hidden="true"></i>
                            </p>


                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Baggage Information End here--> */}
            {/* <!-- Refundable End here --> */}






        </div>
        {/* <!--flight Leg End here --> */}
        <div class="popup-price-strip" bis_skin_checked="1">
            <div class="row" bis_skin_checked="1">
                <div class="col-xs-12" bis_skin_checked="1">
                    <div class="price-section pull-right" bis_skin_checked="1">
                        <button id="btnSelect_sss901" onClick={handleCotnueViewDetail}>Continue</button>
                    </div>
                    <div class="price-section pull-left txt-left" bis_skin_checked="1">
                        <price style={{ cursor: "default" }}>
                            <div bis_skin_checked="1">
                                ${selectedFlight.travelerPricings[0].price.total}
                                <span class="per-person">
                                    (Per adult)

                                    <div bis_skin_checked="1"><b>${selectedFlight.price.total} One-way for {parseInt(travellerDetails.adults) + parseInt(travellerDetails.child) + parseInt(travellerDetails.infant)} travelers</b></div>
                                </span>
                                <div class="event_nobooking" bis_skin_checked="1"> NO BOOKING  <span class="fee">FEE</span></div>
                            </div>
                            {/* <!-- Affirm--> */}
                            <div class="affirm_text affirm_flap" style={{ display: "block" }} bis_skin_checked="1">
                                <spna class="afflop afffred_25400" amt="25400">or from <b>$23/mo</b></spna>
                                <div class="tooltip-custom" bis_skin_checked="1">
                                    <i class="fa fa-info hand"></i>
                                    <div class="promo-detail right_tooltip bottom_tooltip" bis_skin_checked="1">
                                        <div class="mb5px text-center" bis_skin_checked="1">
                                            <img class="easy-payment-logo" src="/us/images/card-icon/affirm-logo.png?v=1.2" />
                                            <div class="textaffirm" bis_skin_checked="1"><strong>Buy now, pay over time</strong></div>
                                        </div>

                                        <ul class="affirm_list 25400_afffredul"><li>3 months  <div class="price" bis_skin_checked="1">$87</div></li><li>6 months <div class="price" bis_skin_checked="1">$44</div></li><li>12 months  <div class="price" bis_skin_checked="1">$23</div></li></ul>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Affirm--> */}
                        </price>
                        {/* <div class="usp-tabs">
                                    <ul>
                                        <li class="hidden-sm hidden-xs" style="cursor:pointer; border-right:0;"><a aria-hidden="true" onclick="window.open('/assets/baggage-fees-info?airline=AI','_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=500,height=300');">Baggage Fees <i class="fa fa-suitcase"></i></a></li>
                                        <li class="visible-xs visible-sm" style="cursor:pointer; border-right:0;"><a onclick="Filter.getflightbaggage('AI')" data-toggle="modal" data-target="#baggage-fees-popup">Baggage Fees <i class="fa fa-suitcase"></i></a></li>
                                    </ul>
                                </div>
                                */}
                    </div>
                </div>

            </div>
        </div>
        {/* <!--Price End--> */}

        <div class="overlay" bis_skin_checked="1">
            <div class="seat-pitch-details" bis_skin_checked="1">
                <i class="fa fa-times-circle close-seat atpcolistclose" aria-hidden="true"></i>
                <div class="seatinfo_slider" bis_skin_checked="1">
                    <div class="slider-3" id="atpcoslider" style={{ paddingLeft: "10px" }} bis_skin_checked="1">

                    </div>
                </div>
            </div>
        </div>


    </>
}


export default FlightDetail;