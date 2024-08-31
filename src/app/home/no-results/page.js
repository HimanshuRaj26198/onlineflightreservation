const NoResults = () => {
    return <div className="body-content" bis_skin_checked={1}>
        <div
            id="_flight-details"
            className="flight-details collapse"
            style={{ height: "100%!important" }}
            bis_skin_checked={1}
        ></div>
        <div
            id="overlay_detail"
            className="midum-overlay"
            style={{ display: "none" }}
            bis_skin_checked={1}
        />
        <div className="modify-engine-wrapper" bis_skin_checked={1}>
            <a href="javascript:void(0);" className="close-sidebar fa fa-close" />
            <div className="holder" bis_skin_checked={1}>
                <div className="modify-engine" bis_skin_checked={1}>
                    <div className="container" bis_skin_checked={1}>
                        <div
                            className="search_detail edit-listing-searchdetails hand"
                            bis_skin_checked={1}
                        >
                            <div className="row" bis_skin_checked={1}>
                                <div className="" bis_skin_checked={1}>
                                    <button
                                        type="button"
                                        className="modify_search pull-right edit-listing-search"
                                    >
                                        Edit Search
                                    </button>
                                    <div className="col-sm-8" bis_skin_checked={1}>
                                        Patna &nbsp;
                                        <b>
                                            {" "}
                                            <i
                                                className="fa fa-long-arrow-right"
                                                aria-hidden="true"
                                            />{" "}
                                        </b>
                                        &nbsp; Los Angeles
                                        <br />
                                        Fri 30Aug , 1 Traveler, Economy
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="expend_search"
                            style={{ display: "none" }}
                            bis_skin_checked={1}
                        >
                            <form
                                action="/us/flights/searching"
                                autoComplete="off"
                                id="FlightForm"
                                method="post"
                                target="_blank"
                                noValidate="novalidate"
                            >
                                {" "}
                                <div className="modify-engine" bis_skin_checked={1}>
                                    <div className="trip-type" bis_skin_checked={1}>
                                        <a className="close-listing-search visible-lg visible-md">
                                            Close{/* */} [x]
                                        </a>
                                        <ul>
                                            <li>
                                                <div
                                                    className="inputSet radio-white radio mt0"
                                                    bis_skin_checked={1}
                                                >
                                                    <input
                                                        data-val="true"
                                                        data-val-required="The SearchReturnFlight field is required."
                                                        id="SearchReturnFlight"
                                                        name="SearchReturnFlight"
                                                        type="hidden"
                                                        defaultValue="false"
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
                                                            onclick="journeyChange('2')"
                                                            type="radio"
                                                            defaultValue={2}
                                                        />
                                                        <span>Round Trip</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li className="cff-list-tab">
                                                <div
                                                    className="inputSet radio-white radio mt0"
                                                    bis_skin_checked={1}
                                                >
                                                    <label>
                                                        <input
                                                            defaultChecked="checked"
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
                                        <div className="clearfix" bis_skin_checked={1} />
                                    </div>
                                    <div className="row" bis_skin_checked={1}>
                                        <div className="col-sm-12" bis_skin_checked={1}>
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
                                                defaultValue="21988_b7b2a3a2f8e44ce6a66bfeea7258ae9d"
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
                                            <div className="column-2 pr-5" bis_skin_checked={1}>
                                                <label>Leaving from</label>
                                                <div className="relative" bis_skin_checked={1}>
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
                                                        defaultValue="PAT - Jayaprakash Narayan,Patna,IN"
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
                                            <div className="column-2 pr-5" bis_skin_checked={1}>
                                                <label>Going to</label>
                                                <div className="relative" bis_skin_checked={1}>
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
                                                        defaultValue="LAX - Los Angeles All Airports,Los Angeles,California,US"
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
                                            <div
                                                className="column-2 pr-5 calender-blc"
                                                bis_skin_checked={1}
                                            >
                                                <label>Travel Dates</label>
                                                <div
                                                    className="calender-txt calender-block"
                                                    bis_skin_checked={1}
                                                >
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
                                                            defaultValue="Aug 30, 2024"
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
                                                            defaultValue="8/30/2024 12:00:00 AM"
                                                        />
                                                    </span>
                                                    <span>
                                                        <img
                                                            src="/us/images/calender-icon.png"
                                                            className="input-icon cal-icon retcal"
                                                            style={{ display: "none" }}
                                                        />
                                                        <input
                                                            className="returnDate hasDatepicker"
                                                            id="toDateDisplay"
                                                            name="toDateDisplay"
                                                            readOnly="readonly"
                                                            required="required"
                                                            type="text"
                                                            defaultValue="Sep 05, 2024"
                                                            style={{ display: "none" }}
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
                                                            defaultValue="9/6/2024 9:19:43 AM"
                                                        />
                                                    </span>
                                                    <div className="cleafix" bis_skin_checked={1} />
                                                </div>
                                            </div>
                                            <input
                                                id="OriginAirport_AirportCode"
                                                name="OriginAirport.AirportCode"
                                                type="hidden"
                                                defaultValue="PAT"
                                            />
                                            <input
                                                id="DestinationAirport_AirportCode"
                                                name="DestinationAirport.AirportCode"
                                                type="hidden"
                                                defaultValue="LAX"
                                            />
                                            <div
                                                className="column-4 pr-5 position-static"
                                                bis_skin_checked={1}
                                            >
                                                <div className="position-relative  " bis_skin_checked={1}>
                                                    <label>Traveler(s), Cabin</label>
                                                    <div
                                                        className="relative drop-errow"
                                                        bis_skin_checked={1}
                                                    >
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
                                                        bis_skin_checked={1}
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
                                                        <div className="row" bis_skin_checked={1}>
                                                            <div className="col-50" bis_skin_checked={1}>
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
                                                            <div className="col-50 space" bis_skin_checked={1}>
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
                                                        <div className="clearfix" bis_skin_checked={1} />
                                                        <label id="ermsg" className="error-txt" />
                                                        <button type="button" className="done_button done">
                                                            Apply
                                                        </button>
                                                        <div className="class_block" bis_skin_checked={1}>
                                                            <span className="traveller_label">Cabin</span>
                                                            <div
                                                                className="select-dropdown drop-errow"
                                                                bis_skin_checked={1}
                                                            >
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
                                                        <div className="clearfix" bis_skin_checked={1} />
                                                        <span className="tooltip-custom minor-txt ">
                                                            <u className="blue">Unaccompanied Minor</u>
                                                            <div className="promo-detail" bis_skin_checked={1}>
                                                                <span className="arrow" />
                                                                <p
                                                                    className="mb5px"
                                                                    style={{ textAlign: "left" }}
                                                                >
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
                                    <div className="modify-spacer" bis_skin_checked={1} />
                                    <div className="row" bis_skin_checked={1}>
                                        <div className="col-sm-8" bis_skin_checked={1}>
                                            <div className="row" bis_skin_checked={1}>
                                                <div
                                                    className="col-sm-6 col-md-4 hide"
                                                    id="div_airline"
                                                    name="div_airline"
                                                    bis_skin_checked={1}
                                                >
                                                    <div
                                                        className="input-city selectairline"
                                                        bis_skin_checked={1}
                                                    >
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
                                                <div
                                                    className="col-sm-4 col-md-3  hide"
                                                    bis_skin_checked={1}
                                                >
                                                    <div
                                                        style={{ marginTop: 8 }}
                                                        className="hidden-xs"
                                                        bis_skin_checked={1}
                                                    />
                                                    <div className="inputSet2" bis_skin_checked={1}>
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
                                        <div className="col-sm-4" bis_skin_checked={1}></div>
                                    </div>
                                    <span id="sameSearch" className="error-txt" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mobile-header-fixed" bis_skin_checked={1}>
            <div className="mobile-itenery modifySearchMobile" bis_skin_checked={1}>
                <div className="result-itenery" bis_skin_checked={1}>
                    <div className="row" bis_skin_checked={1}>
                        <div className="col-xs-12" bis_skin_checked={1}>
                            <a>
                                <div className="modify-src-btn" bis_skin_checked={1}>
                                    <img src="/us/images/svg/edit-icon.svg" alt="" />
                                </div>
                            </a>
                            <div className="city-itenery" bis_skin_checked={1}>
                                <div className="column" bis_skin_checked={1}>
                                    <p className="airportCode">PAT</p>
                                </div>
                                <div className="column" bis_skin_checked={1}>
                                    <div className="airporticon" bis_skin_checked={1}>
                                        <b>
                                            {" "}
                                            <i
                                                className="fa fa-long-arrow-right"
                                                aria-hidden="true"
                                            />{" "}
                                        </b>
                                    </div>
                                </div>
                                <div className="column" bis_skin_checked={1}>
                                    <p className="airportCode">LAX</p>
                                </div>
                                <div className="clearfix" bis_skin_checked={1} />
                                <div className="itenery-date" bis_skin_checked={1}>
                                    Aug 30, 2024
                                    <span className="traveller-xxs">
                                        <span>&nbsp; | &nbsp;</span>1 Traveler
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <loading>
            <div
                className="loader"
                style={{ position: "absolute", display: "none" }}
                bis_skin_checked={1}
            />
        </loading>
        <div id="div_gotopayment" style={{ display: "none" }} bis_skin_checked={1}>
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
                bis_skin_checked={1}
            >
                <img src="/images/loading.gif" style={{ width: 80 }} />
                <span
                    id="loadermsg"
                    style={{ fontSize: 12, color: "rgb(255, 127, 0)", display: "none" }}
                />
            </div>
            <div className="midum-overlay" id="fadebackground" bis_skin_checked={1} />
        </div>
        <div className="listing-wrapper" bis_skin_checked={1}>
            <div className="container" bis_skin_checked={1}>
                <input type="hidden" id="tabvalue" name="tabvalue" defaultValue="all" />
                <div className="row" bis_skin_checked={1}>
                    <div className="col-sm-12 col-md-12 col-xs-12" bis_skin_checked={1}>
                        <div className="row" bis_skin_checked={1}>
                            <div className="col-md-12" bis_skin_checked={1}>
                                <div className="no-result" bis_skin_checked={1}>
                                    <img src="/us/images/session-expire-icon.png" alt="" />
                                    <div className="oops" bis_skin_checked={1} />
                                    <div className="head" bis_skin_checked={1}>
                                        No result found
                                    </div>
                                    <p className="text">
                                        We’ve searched more than 400 airlines that we sell,
                                        <br /> and couldn't find any flights from <strong>
                                            PAT
                                        </strong>{" "}
                                        to <strong>LAX</strong>
                                    </p>
                                    <div className="bottom" bis_skin_checked={1}>
                                        <p>Call us at (24x7)</p>
                                        <a
                                            className="call_number"
                                            id="noresult_contact"
                                            href="tel:+1-844-774-6584"
                                        >
                                            +1-844-774-6584
                                        </a>
                                        <br />
                                        <a href="/" className="home_button">
                                            <i className="fa fa-angle-left" aria-hidden="true" /> Go
                                            Home
                                        </a>
                                    </div>
                                </div>
                            </div>
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
        <div
            className="trigger-wrapper"
            style={{ display: "none" }}
            bis_skin_checked={1}
        >
            <div className="trigger-searching" bis_skin_checked={1}>
                <span className="close-btn" id="tiggerclose">
                    <img src="/us/images/trigger-mobile/close-icon.svg" />
                </span>
                <img
                    src="/us/images/trigger-mobile/user-icon.svg"
                    className="user-icon"
                />
                <div className="head" bis_skin_checked={1}>
                    Book before fare goes up!
                </div>
                <p className="con-txt">
                    <b>3588</b> people are currently searching for flights to <br />
                    Los Angeles
                </p>
            </div>
            <div className="mobile-laover" bis_skin_checked={1} />
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
                        Flight Prices may change frequently owing to demand and availability.
                        Start a <b>New Search</b> / <b>Refresh Result</b> to view the latest
                        deals
                    </p>
                </div>
                <br />
                <div className="call-btn" bis_skin_checked={1}>
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
            <div className="midum-overlay" id="fadebackground" bis_skin_checked={1} />
        </div>
    </div>
}


export default NoResults;