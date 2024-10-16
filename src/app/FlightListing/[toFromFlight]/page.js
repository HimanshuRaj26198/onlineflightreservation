import { useParams } from 'next/navigation';

const FlightListing = () => {
    const params = useParams();
    const iataCode = params.get('iataCode');

    return (
        <>
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
                                            <button
                                                type="button"
                                                className="modify_search pull-right edit-listing-search"
                                            >
                                                Edit Search
                                            </button>
                                            <div className="col-sm-8">
                                                Las Vegas &nbsp;
                                                <b>
                                                    {" "}
                                                    <i className="fa fa-exchange" />{" "}
                                                </b>
                                                &nbsp; Los Angeles
                                                <br />
                                                Sat 19Oct
                                                <b>-</b> Sun 20Oct , 1 Traveler, Economy
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="expend_search" style={{ display: "none" }}>
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
                                                        defaultValue="1448_84c8b2191a2848abb38ec722d9e99130"
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
                                                                defaultValue="LAS - Las Vegas All Airports,Las Vegas,US"
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
                                                                defaultValue="LAX - Los Angeles All Airports,Los Angeles,US"
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
                                                                    defaultValue="Oct 19, 2024"
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
                                                                    defaultValue="10/19/2024 12:00:00 AM"
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
                                                                    defaultValue="Oct 20, 2024"
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
                                                                    defaultValue="10/20/2024 12:00:00 AM"
                                                                />
                                                            </span>
                                                            <div className="cleafix" />
                                                        </div>
                                                    </div>
                                                    <input
                                                        id="OriginAirport_AirportCode"
                                                        name="OriginAirport.AirportCode"
                                                        type="hidden"
                                                        defaultValue="LAS"
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
                <div className="mobile-header-fixed">
                    <div className="mobile-itenery modifySearchMobile">
                        <div className="result-itenery">
                            <div className="row">
                                <div className="col-xs-12">
                                    <a>
                                        <div className="modify-src-btn">
                                            <img src="/us/images/svg/edit-icon.svg" alt="" />
                                        </div>
                                    </a>
                                    <div className="city-itenery">
                                        <div className="column">
                                            <p className="airportCode">LAS</p>
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
                                            <p className="airportCode">LAX</p>
                                        </div>
                                        <div className="clearfix" />
                                        <div className="itenery-date">
                                            Oct 19, 2024
                                            <span style={{ margin: "0 3px" }}>-</span> Oct 20, 2024
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
                            src="/us/images/svg/filter-icon.svg"
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
                                <span className="reset_filter" onclick="Filter.restFilter('airline')">
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
                                <div className="show-component-mobile">
                                    <div className="filter-main-head">
                                        Filters
                                        <svg
                                            width={16}
                                            height={16}
                                            fill="currentColor"
                                            className="bi bi-x close-sidebar"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                            />
                                        </svg>
                                    </div>
                                    <ul className="filterTabs">
                                        <li id="filterTabs_tab-1">
                                            <a data-toggle="tab" href="#tab-1">
                                                {" "}
                                                Stops
                                            </a>
                                        </li>
                                        <li id="filterTabs_tab-3">
                                            <a data-toggle="tab" href="#tab-3">
                                                {" "}
                                                Price
                                            </a>
                                        </li>
                                        <li id="filterTabs_tab-5">
                                            <a data-toggle="tab" href="#tab-5">
                                                {" "}
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
                                                        onclick="Filter.resetAll()"
                                                    >
                                                        {" "}
                                                        Reset all
                                                    </a>
                                                    <i className="fa fa-filter" aria-hidden="true" /> Filter
                                                    your result
                                                </h4>
                                                <p className="result-found">
                                                    <span id="totalResults">1966</span> Results Found{" "}
                                                </p>
                                            </div>
                                            <div
                                                id="tab-1"
                                                className="filter-item tab-pane"
                                                style={{ clear: "both" }}
                                            >
                                                <div className="head">
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="headstop"
                                                        style={{ display: "none" }}
                                                        onclick="Filter.restFilter('stops')"
                                                    >
                                                        Reset
                                                    </a>
                                                    Stops
                                                </div>
                                                <div className="filter-data">
                                                    <div className="inputSet stopset">
                                                        <label className="mode">
                                                            <span className="filter-price">$75.98</span>
                                                            <input
                                                                type="checkbox"
                                                                name="stops"
                                                                onclick="Filter.applyFilter(false)"
                                                                defaultValue={0}
                                                            />{" "}
                                                            <span>Non Stop</span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet stopset">
                                                        <label className="mode">
                                                            <span className="filter-price">$109.47</span>
                                                            <input
                                                                type="checkbox"
                                                                name="stops"
                                                                onclick="Filter.applyFilter(false)"
                                                                defaultValue={1}
                                                            />{" "}
                                                            <span>1 Stop</span>
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
                                                        onclick="Filter.restpricefilter('price')"
                                                    >
                                                        Reset
                                                    </a>
                                                    Price Range
                                                </div>
                                                <div className="filter-data">
                                                    <p className="time-filter-data">
                                                        <span className="slider-range2 pull-right">$ 1633</span>
                                                        <span className="slider-range">$ 75</span>
                                                    </p>
                                                    <div className="price-slider-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
                                                        <div
                                                            className="ui-slider-range ui-corner-all ui-widget-header"
                                                            style={{ left: "0%", width: "100%" }}
                                                        />
                                                        <span
                                                            tabIndex={0}
                                                            className="ui-slider-handle ui-corner-all ui-state-default"
                                                            style={{ left: "0%" }}
                                                        />
                                                        <span
                                                            tabIndex={0}
                                                            className="ui-slider-handle ui-corner-all ui-state-default"
                                                            style={{ left: "100%" }}
                                                        />
                                                    </div>
                                                    <br />
                                                </div>
                                            </div>
                                            <div id="tab-4" className="filter-item tab-pane">
                                                <div className="head">
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="headdeptime"
                                                        style={{ display: "none" }}
                                                        onclick="Filter.restdepfilter('deptime')"
                                                    >
                                                        Reset
                                                    </a>
                                                    <i
                                                        className="fa fa-plane"
                                                        style={{ transform: "rotate(45deg)" }}
                                                    />{" "}
                                                    From Las Vegas
                                                </div>
                                                <div className="filter-data mb20">
                                                    <ul className="time_filter _deptimecontainer">
                                                        <li className="deptimefilter" filtervalue="em">
                                                            <img
                                                                src="/us/images/listing/em.png"
                                                                id="mgem"
                                                                alt="early morning"
                                                            />
                                                            <strong>Early Morning</strong>
                                                            <div className="time">Before 6am </div>
                                                        </li>
                                                        <li className="deptimefilter" filtervalue="m">
                                                            <img
                                                                src="/us/images/listing/m.png"
                                                                id="mgm"
                                                                alt="Morning"
                                                            />
                                                            <strong>Morning</strong>
                                                            <div className="time">6am - 12pm</div>
                                                        </li>
                                                        <li className="deptimefilter" filtervalue="a">
                                                            <img
                                                                src="/us/images/listing/a.png"
                                                                id="mga"
                                                                alt="Afternoon"
                                                            />
                                                            <strong>Afternoon</strong>
                                                            <div className="time">12pm - 6pm</div>
                                                        </li>
                                                        <li className="deptimefilter" filtervalue="e">
                                                            <img
                                                                src="/us/images/listing/e.png"
                                                                id="mge"
                                                                alt="Evening"
                                                            />
                                                            <strong>Evening</strong>
                                                            <div className="time">After 6pm</div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <div className="head">
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="headrettime"
                                                            style={{ display: "none" }}
                                                            onclick="Filter.restretfilter('rettime')"
                                                        >
                                                            Reset
                                                        </a>
                                                        <i
                                                            className="fa fa-plane"
                                                            style={{ transform: "rotate(225deg)" }}
                                                        />{" "}
                                                        From Los Angeles
                                                    </div>
                                                    <div className="filter-data mb20">
                                                        <ul className="time_filter _rettimecontainer">
                                                            <li className="deptimefilter" filtervalue="em">
                                                                <img
                                                                    src="/us/images/listing/em.png"
                                                                    id="rmgem"
                                                                    alt="early morning"
                                                                />
                                                                <strong>Early Morning</strong>
                                                                <div className="time">Before 6am </div>
                                                            </li>
                                                            <li className="deptimefilter" filtervalue="m">
                                                                <img
                                                                    src="/us/images/listing/m.png"
                                                                    id="rmgm"
                                                                    alt="Morning"
                                                                />
                                                                <strong>Morning</strong>
                                                                <div className="time">6am - 12pm</div>
                                                            </li>
                                                            <li className="deptimefilter" filtervalue="a">
                                                                <img
                                                                    src="/us/images/listing/a.png"
                                                                    id="rmga"
                                                                    alt="Afternoon"
                                                                />
                                                                <strong>Afternoon</strong>
                                                                <div className="time">12pm - 6pm</div>
                                                            </li>
                                                            <li className="deptimefilter" filtervalue="e">
                                                                <img
                                                                    src="/us/images/listing/e.png"
                                                                    id="rmge"
                                                                    alt="Evening"
                                                                />
                                                                <strong>Evening</strong>
                                                                <div className="time">After 6pm</div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="tab-5" className="filter-item bdrR0 tab-pane">
                                                <div className="head">
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="headairline"
                                                        style={{ display: "none" }}
                                                        onclick="Filter.restFilter('airline')"
                                                    >
                                                        Reset
                                                    </a>
                                                    Airlines
                                                </div>
                                                <div className="filter-data">
                                                    <div className="inputSet ">
                                                        <label className="mode">
                                                            <span className="filter-price">$75.98</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Spirit Airlines"
                                                                defaultValue="NK"
                                                            />
                                                            <span>Spirit Airlines</span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet ">
                                                        <label className="mode">
                                                            <span className="filter-price">$97.98</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Spirit Airlines with others"
                                                                defaultValue="NK_M"
                                                            />
                                                            <span>
                                                                Spirit Airlines
                                                                <img src="/us/images/listing/mal-blue.png" />
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet ">
                                                        <label className="mode">
                                                            <span className="filter-price">$78.95</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Frontier Airlines"
                                                                defaultValue="F9"
                                                            />
                                                            <span>Frontier Airlines</span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet ">
                                                        <label className="mode">
                                                            <span className="filter-price">$270.20</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Alaska Airlines"
                                                                defaultValue="AS"
                                                            />
                                                            <span>Alaska Airlines</span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$176.09</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Alaska Airlines with others"
                                                                defaultValue="AS_M"
                                                            />
                                                            <span>
                                                                Alaska Airlines
                                                                <img src="/us/images/listing/mal-blue.png" />
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$262.83</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Delta Airlines"
                                                                defaultValue="DL"
                                                            />
                                                            <span>Delta Airlines</span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$176.47</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Delta Airlines with others"
                                                                defaultValue="DL_M"
                                                            />
                                                            <span>
                                                                Delta Airlines
                                                                <img src="/us/images/listing/mal-blue.png" />
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$270.96</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="American Airlines"
                                                                defaultValue="AA"
                                                            />
                                                            <span>American Airlines</span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$176.47</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="American Airlines with others"
                                                                defaultValue="AA_M"
                                                            />
                                                            <span>
                                                                American Airlines
                                                                <img src="/us/images/listing/mal-blue.png" />
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$296.36</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Southwest Airlines"
                                                                defaultValue="WN"
                                                            />
                                                            <span>Southwest Airlines</span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$196.97</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Southwest Airlines with others"
                                                                defaultValue="WN_M"
                                                            />
                                                            <span>
                                                                Southwest Airlines
                                                                <img src="/us/images/listing/mal-blue.png" />
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$270.96</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="United Airlines"
                                                                defaultValue="UA"
                                                            />
                                                            <span>United Airlines</span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$206.46</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="United Airlines with others"
                                                                defaultValue="UA_M"
                                                            />
                                                            <span>
                                                                United Airlines
                                                                <img src="/us/images/listing/mal-blue.png" />
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$581.40</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Jetblue"
                                                                defaultValue="B6"
                                                            />
                                                            <span>Jetblue</span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$330.19</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Jetblue with others"
                                                                defaultValue="B6_M"
                                                            />
                                                            <span>
                                                                Jetblue
                                                                <img src="/us/images/listing/mal-blue.png" />
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet moreairline">
                                                        <label className="mode">
                                                            <span className="filter-price">$97.98</span>
                                                            <input
                                                                type="checkbox"
                                                                name="airline"
                                                                onclick="Filter.applyFilter(false)"
                                                                airname="Avelo Airlines with others"
                                                                defaultValue="XP_M"
                                                            />
                                                            <span>
                                                                Avelo Airlines
                                                                <img src="/us/images/listing/mal-blue.png" />
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="clearfix" />
                                                    <div className="show-more">
                                                        <a
                                                            href="javascript:void(0);"
                                                            id="moreair"
                                                            onclick="Filter.showMairline()"
                                                        >
                                                            More Airlines <i className="fa fa-angle-down" />
                                                        </a>
                                                    </div>
                                                    <div
                                                        className="multi-airline-icon"
                                                        style={{ margin: "10px 0px 0px" }}
                                                    >
                                                        <img src="/us/images/listing/mal-blue.png" /> Indicate
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
                                                        onclick="Filter.restFilter('airports')"
                                                    >
                                                        Reset
                                                    </a>
                                                </div>
                                                <div className="head">
                                                    <b>
                                                        <i
                                                            className="fa fa-plane"
                                                            style={{ transform: "rotate(225deg)" }}
                                                        />{" "}
                                                        Return airports
                                                    </b>
                                                </div>
                                                <div className="filter-data">
                                                    <div className="inputSet ">
                                                        <label className="mode">
                                                            <input
                                                                type="checkbox"
                                                                name="arrivalsairports"
                                                                onclick="Filter.applyFilter(false)"
                                                                defaultValue="LAX"
                                                            />{" "}
                                                            <span>LAX (Los Angeles International) </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet ">
                                                        <label className="mode">
                                                            <input
                                                                type="checkbox"
                                                                name="arrivalsairports"
                                                                onclick="Filter.applyFilter(false)"
                                                                defaultValue="ONT"
                                                            />{" "}
                                                            <span>ONT (Ontario International) </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet ">
                                                        <label className="mode">
                                                            <input
                                                                type="checkbox"
                                                                name="arrivalsairports"
                                                                onclick="Filter.applyFilter(false)"
                                                                defaultValue="BUR"
                                                            />{" "}
                                                            <span>BUR (Bob Hope Apt) </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet ">
                                                        <label className="mode">
                                                            <input
                                                                type="checkbox"
                                                                name="arrivalsairports"
                                                                onclick="Filter.applyFilter(false)"
                                                                defaultValue="SNA"
                                                            />{" "}
                                                            <span>SNA (John Wayne) </span>
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
                                                                    onclick="Filter.setmatrixstop(0);"
                                                                    className="hand"
                                                                >
                                                                    Non-Stop <i className="fa fa-caret-right" />
                                                                </li>
                                                                <li
                                                                    onclick="Filter.setmatrixstop(1);"
                                                                    className="hand"
                                                                >
                                                                    1 Stop <i className="fa fa-caret-right" />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="pl0 col-xs-9  col-sm-10 pr0">
                                                        <div className="airline-matrix slick-initialized slick-slider">
                                                            <button
                                                                className="slick-prev slick-arrow slick-disabled"
                                                                aria-label="Previous"
                                                                type="button"
                                                                aria-disabled="true"
                                                                style={{}}
                                                            >
                                                                Previous
                                                            </button>
                                                            <div className="slick-list draggable">
                                                                <div
                                                                    className="slick-track"
                                                                    style={{
                                                                        opacity: 1,
                                                                        width: 2416,
                                                                        transform: "translate3d(0px, 0px, 0px)"
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="slick-slide slick-current slick-active"
                                                                        data-slick-index={0}
                                                                        aria-hidden="false"
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="1-NK"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'NK', 0, 'False', '1-NK', 0)"
                                                                                    >
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png" />
                                                                                        <div className="name">
                                                                                            Spirit Airlines
                                                                                        </div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0NK"
                                                                                        id={11}
                                                                                        onclick="Filter.matrixFilter(75.98, 'NK', 0, 'False', '1', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $75.98
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop1 stop1NK"
                                                                                        id={12}
                                                                                        onclick="Filter.matrixFilter(109.47, 'NK', 1, 'False', '1', '2')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $109.47
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide slick-active"
                                                                        data-slick-index={1}
                                                                        aria-hidden="false"
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="2-F9"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'F9', 0, 'False', '2-F9', 0)"
                                                                                    >
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png" />
                                                                                        <div className="name">
                                                                                            Frontier Airlines
                                                                                        </div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0F9"
                                                                                        id={21}
                                                                                        onclick="Filter.matrixFilter(78.95, 'F9', 0, 'False', '2', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $78.95
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop1 stop1F9"
                                                                                        id={22}
                                                                                        onclick="Filter.matrixFilter(191.96, 'F9', 1, 'False', '2', '2')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $191.96
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide slick-active"
                                                                        data-slick-index={2}
                                                                        aria-hidden="false"
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="3-NK"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'NK', 0, 'True', '3-NK', 0)"
                                                                                    >
                                                                                        <span
                                                                                            className="tooltip-custom"
                                                                                            style={{
                                                                                                left: "20%",
                                                                                                position: "absolute"
                                                                                            }}
                                                                                        >
                                                                                            <img
                                                                                                src="/us/images/listing/mal-blue.png"
                                                                                                className="mix-air"
                                                                                            />
                                                                                            <div className="promo-detail">
                                                                                                <p className="mb5px">
                                                                                                    Indicate Multiple Airline
                                                                                                </p>
                                                                                            </div>
                                                                                        </span>
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png" />
                                                                                        <div className="name">
                                                                                            Spirit Airlines
                                                                                        </div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0NK_M"
                                                                                        id={31}
                                                                                        onclick="Filter.matrixFilter(97.98, 'NK', 0, 'True', '3', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $97.98
                                                                                    </li>
                                                                                    <li
                                                                                        className="mstop1 stop1NK_M"
                                                                                        style={{ cursor: "default" }}
                                                                                    >
                                                                                        <i className="fa" />-
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide slick-active"
                                                                        data-slick-index={3}
                                                                        aria-hidden="false"
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="4-XP"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'XP', 0, 'True', '4-XP', 0)"
                                                                                    >
                                                                                        <span
                                                                                            className="tooltip-custom"
                                                                                            style={{
                                                                                                left: "20%",
                                                                                                position: "absolute"
                                                                                            }}
                                                                                        >
                                                                                            <img
                                                                                                src="/us/images/listing/mal-blue.png"
                                                                                                className="mix-air"
                                                                                            />
                                                                                            <div className="promo-detail">
                                                                                                <p className="mb5px">
                                                                                                    Indicate Multiple Airline
                                                                                                </p>
                                                                                            </div>
                                                                                        </span>
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/xp.png" />
                                                                                        <div className="name">Avelo Airlines</div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0XP_M"
                                                                                        id={41}
                                                                                        onclick="Filter.matrixFilter(97.98, 'XP', 0, 'True', '4', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $97.98
                                                                                    </li>
                                                                                    <li
                                                                                        className="mstop1 stop1XP_M"
                                                                                        style={{ cursor: "default" }}
                                                                                    >
                                                                                        <i className="fa" />-
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={4}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="5-AS"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'AS', 0, 'True', '5-AS', 0)"
                                                                                    >
                                                                                        <span
                                                                                            className="tooltip-custom"
                                                                                            style={{
                                                                                                left: "20%",
                                                                                                position: "absolute"
                                                                                            }}
                                                                                        >
                                                                                            <img
                                                                                                src="/us/images/listing/mal-blue.png"
                                                                                                className="mix-air"
                                                                                            />
                                                                                            <div className="promo-detail">
                                                                                                <p className="mb5px">
                                                                                                    Indicate Multiple Airline
                                                                                                </p>
                                                                                            </div>
                                                                                        </span>
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/as.png" />
                                                                                        <div className="name">
                                                                                            Alaska Airlines
                                                                                        </div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0AS_M"
                                                                                        id={51}
                                                                                        onclick="Filter.matrixFilter(176.09, 'AS', 0, 'True', '5', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $176.09
                                                                                    </li>
                                                                                    <li
                                                                                        className="mstop1 stop1AS_M"
                                                                                        style={{ cursor: "default" }}
                                                                                    >
                                                                                        <i className="fa" />-
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={5}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="6-DL"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'DL', 0, 'True', '6-DL', 0)"
                                                                                    >
                                                                                        <span
                                                                                            className="tooltip-custom"
                                                                                            style={{
                                                                                                left: "20%",
                                                                                                position: "absolute"
                                                                                            }}
                                                                                        >
                                                                                            <img
                                                                                                src="/us/images/listing/mal-blue.png"
                                                                                                className="mix-air"
                                                                                            />
                                                                                            <div className="promo-detail">
                                                                                                <p className="mb5px">
                                                                                                    Indicate Multiple Airline
                                                                                                </p>
                                                                                            </div>
                                                                                        </span>
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/dl.png" />
                                                                                        <div className="name">Delta Airlines</div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0DL_M"
                                                                                        id={61}
                                                                                        onclick="Filter.matrixFilter(176.47, 'DL', 0, 'True', '6', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $176.47
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop1 stop1DL_M"
                                                                                        id={62}
                                                                                        onclick="Filter.matrixFilter(476.45, 'DL', 1, 'True', '6', '2')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $476.45
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={6}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="7-AA"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'AA', 0, 'True', '7-AA', 0)"
                                                                                    >
                                                                                        <span
                                                                                            className="tooltip-custom"
                                                                                            style={{
                                                                                                left: "20%",
                                                                                                position: "absolute"
                                                                                            }}
                                                                                        >
                                                                                            <img
                                                                                                src="/us/images/listing/mal-blue.png"
                                                                                                className="mix-air"
                                                                                            />
                                                                                            <div className="promo-detail">
                                                                                                <p className="mb5px">
                                                                                                    Indicate Multiple Airline
                                                                                                </p>
                                                                                            </div>
                                                                                        </span>
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/aa.png" />
                                                                                        <div className="name">
                                                                                            American Airlines
                                                                                        </div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0AA_M"
                                                                                        id={71}
                                                                                        onclick="Filter.matrixFilter(176.47, 'AA', 0, 'True', '7', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $176.47
                                                                                    </li>
                                                                                    <li
                                                                                        className="mstop1 stop1AA_M"
                                                                                        style={{ cursor: "default" }}
                                                                                    >
                                                                                        <i className="fa" />-
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={7}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="8-WN"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'WN', 0, 'True', '8-WN', 0)"
                                                                                    >
                                                                                        <span
                                                                                            className="tooltip-custom"
                                                                                            style={{
                                                                                                left: "20%",
                                                                                                position: "absolute"
                                                                                            }}
                                                                                        >
                                                                                            <img
                                                                                                src="/us/images/listing/mal-blue.png"
                                                                                                className="mix-air"
                                                                                            />
                                                                                            <div className="promo-detail">
                                                                                                <p className="mb5px">
                                                                                                    Indicate Multiple Airline
                                                                                                </p>
                                                                                            </div>
                                                                                        </span>
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/wn.png" />
                                                                                        <div className="name">
                                                                                            Southwest Airlines
                                                                                        </div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0WN_M"
                                                                                        id={81}
                                                                                        onclick="Filter.matrixFilter(196.97, 'WN', 0, 'True', '8', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $196.97
                                                                                    </li>
                                                                                    <li
                                                                                        className="mstop1 stop1WN_M"
                                                                                        style={{ cursor: "default" }}
                                                                                    >
                                                                                        <i className="fa" />-
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={8}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="9-UA"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'UA', 0, 'True', '9-UA', 0)"
                                                                                    >
                                                                                        <span
                                                                                            className="tooltip-custom"
                                                                                            style={{
                                                                                                left: "20%",
                                                                                                position: "absolute"
                                                                                            }}
                                                                                        >
                                                                                            <img
                                                                                                src="/us/images/listing/mal-blue.png"
                                                                                                className="mix-air"
                                                                                            />
                                                                                            <div className="promo-detail">
                                                                                                <p className="mb5px">
                                                                                                    Indicate Multiple Airline
                                                                                                </p>
                                                                                            </div>
                                                                                        </span>
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/ua.png" />
                                                                                        <div className="name">
                                                                                            United Airlines
                                                                                        </div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0UA_M"
                                                                                        id={91}
                                                                                        onclick="Filter.matrixFilter(206.46, 'UA', 0, 'True', '9', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $206.46
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop1 stop1UA_M"
                                                                                        id={92}
                                                                                        onclick="Filter.matrixFilter(476.45, 'UA', 1, 'True', '9', '2')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $476.45
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={9}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="10-DL"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'DL', 0, 'False', '10-DL', 0)"
                                                                                    >
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/dl.png" />
                                                                                        <div className="name">Delta Airlines</div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0DL"
                                                                                        id={101}
                                                                                        onclick="Filter.matrixFilter(262.83, 'DL', 0, 'False', '10', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $262.83
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop1 stop1DL"
                                                                                        id={102}
                                                                                        onclick="Filter.matrixFilter(908.99, 'DL', 1, 'False', '10', '2')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $908.99
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={10}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="11-AS"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'AS', 0, 'False', '11-AS', 0)"
                                                                                    >
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/as.png" />
                                                                                        <div className="name">
                                                                                            Alaska Airlines
                                                                                        </div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0AS"
                                                                                        id={111}
                                                                                        onclick="Filter.matrixFilter(270.2, 'AS', 0, 'False', '11', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $270.20
                                                                                    </li>
                                                                                    <li
                                                                                        className="mstop1 stop1AS"
                                                                                        style={{ cursor: "default" }}
                                                                                    >
                                                                                        <i className="fa" />-
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={11}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="12-AA"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'AA', 0, 'False', '12-AA', 0)"
                                                                                    >
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/aa.png" />
                                                                                        <div className="name">
                                                                                            American Airlines
                                                                                        </div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0AA"
                                                                                        id={121}
                                                                                        onclick="Filter.matrixFilter(270.96, 'AA', 0, 'False', '12', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $270.96
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop1 stop1AA"
                                                                                        id={122}
                                                                                        onclick="Filter.matrixFilter(280.46, 'AA', 1, 'False', '12', '2')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $280.46
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={12}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="13-UA"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'UA', 0, 'False', '13-UA', 0)"
                                                                                    >
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/ua.png" />
                                                                                        <div className="name">
                                                                                            United Airlines
                                                                                        </div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0UA"
                                                                                        id={131}
                                                                                        onclick="Filter.matrixFilter(270.96, 'UA', 0, 'False', '13', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $270.96
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop1 stop1UA"
                                                                                        id={132}
                                                                                        onclick="Filter.matrixFilter(280.46, 'UA', 1, 'False', '13', '2')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $280.46
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={13}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="14-WN"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'WN', 0, 'False', '14-WN', 0)"
                                                                                    >
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/wn.png" />
                                                                                        <div className="name">
                                                                                            Southwest Airlines
                                                                                        </div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0WN"
                                                                                        id={141}
                                                                                        onclick="Filter.matrixFilter(296.36, 'WN', 0, 'False', '14', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $296.36
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop1 stop1WN"
                                                                                        id={142}
                                                                                        onclick="Filter.matrixFilter(304.91, 'WN', 1, 'False', '14', '2')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $304.91
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={14}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="15-B6"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'B6', 0, 'True', '15-B6', 0)"
                                                                                    >
                                                                                        <span
                                                                                            className="tooltip-custom"
                                                                                            style={{
                                                                                                left: "20%",
                                                                                                position: "absolute"
                                                                                            }}
                                                                                        >
                                                                                            <img
                                                                                                src="/us/images/listing/mal-blue.png"
                                                                                                className="mix-air"
                                                                                            />
                                                                                            <div className="promo-detail">
                                                                                                <p className="mb5px">
                                                                                                    Indicate Multiple Airline
                                                                                                </p>
                                                                                            </div>
                                                                                        </span>
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/b6.png" />
                                                                                        <div className="name">Jetblue</div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0B6_M"
                                                                                        id={151}
                                                                                        onclick="Filter.matrixFilter(330.19, 'B6', 0, 'True', '15', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $330.19
                                                                                    </li>
                                                                                    <li
                                                                                        className="mstop1 stop1B6_M"
                                                                                        style={{ cursor: "default" }}
                                                                                    >
                                                                                        <i className="fa" />-
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="slick-slide"
                                                                        data-slick-index={15}
                                                                        aria-hidden="true"
                                                                        tabIndex={-1}
                                                                        style={{ width: 151 }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                className="matrix-data"
                                                                                id="16-B6"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    display: "inline-block"
                                                                                }}
                                                                            >
                                                                                <ul>
                                                                                    <li
                                                                                        className="head"
                                                                                        onclick="Filter.matrixFilter(0, 'B6', 0, 'False', '16-B6', 0)"
                                                                                    >
                                                                                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/b6.png" />
                                                                                        <div className="name">Jetblue</div>
                                                                                    </li>
                                                                                    <li
                                                                                        className="matrix-cell mstop0 stop0B6"
                                                                                        id={161}
                                                                                        onclick="Filter.matrixFilter(581.4, 'B6', 0, 'False', '16', '1')"
                                                                                    >
                                                                                        <i className="fa" />
                                                                                        $581.40
                                                                                    </li>
                                                                                    <li
                                                                                        className="mstop1 stop1B6"
                                                                                        style={{ cursor: "default" }}
                                                                                    >
                                                                                        <i className="fa" />-
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button
                                                                className="slick-next slick-arrow"
                                                                aria-label="Next"
                                                                type="button"
                                                                style={{}}
                                                                aria-disabled="false"
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
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
                                                    onclick="Filter.matrixFilter_mobile(0, 'NK', 0, 'False', '1', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/nk.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/nk.gif';"
                                                    />
                                                    <b>$75.98</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_F9_False"
                                                    onclick="Filter.matrixFilter_mobile(0, 'F9', 0, 'False', '2', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/f9.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/f9.gif';"
                                                    />
                                                    <b>$78.95</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_NK_True"
                                                    onclick="Filter.matrixFilter_mobile(0, 'NK', 0, 'True', '3', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/nk.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/nk.gif';"
                                                    />
                                                    <span className="matrixstops">
                                                        <img src="/us/images/mal.png" />
                                                    </span>{" "}
                                                    <b>$97.98</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_XP_True"
                                                    onclick="Filter.matrixFilter_mobile(0, 'XP', 0, 'True', '4', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/xp.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/xp.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/xp.gif';"
                                                    />
                                                    <span className="matrixstops">
                                                        <img src="/us/images/mal.png" />
                                                    </span>{" "}
                                                    <b>$97.98</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_AS_True"
                                                    onclick="Filter.matrixFilter_mobile(0, 'AS', 0, 'True', '5', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/as.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/as.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/as.gif';"
                                                    />
                                                    <span className="matrixstops">
                                                        <img src="/us/images/mal.png" />
                                                    </span>{" "}
                                                    <b>$176.09</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_DL_True"
                                                    onclick="Filter.matrixFilter_mobile(0, 'DL', 0, 'True', '6', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/dl.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/dl.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/dl.gif';"
                                                    />
                                                    <span className="matrixstops">
                                                        <img src="/us/images/mal.png" />
                                                    </span>{" "}
                                                    <b>$176.47</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_AA_True"
                                                    onclick="Filter.matrixFilter_mobile(0, 'AA', 0, 'True', '7', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/aa.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/aa.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/aa.gif';"
                                                    />
                                                    <span className="matrixstops">
                                                        <img src="/us/images/mal.png" />
                                                    </span>{" "}
                                                    <b>$176.47</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_WN_True"
                                                    onclick="Filter.matrixFilter_mobile(0, 'WN', 0, 'True', '8', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/wn.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/wn.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/wn.gif';"
                                                    />
                                                    <span className="matrixstops">
                                                        <img src="/us/images/mal.png" />
                                                    </span>{" "}
                                                    <b>$196.97</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_UA_True"
                                                    onclick="Filter.matrixFilter_mobile(0, 'UA', 0, 'True', '9', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/ua.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/ua.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/ua.gif';"
                                                    />
                                                    <span className="matrixstops">
                                                        <img src="/us/images/mal.png" />
                                                    </span>{" "}
                                                    <b>$206.46</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_DL_False"
                                                    onclick="Filter.matrixFilter_mobile(0, 'DL', 0, 'False', '10', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/dl.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/dl.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/dl.gif';"
                                                    />
                                                    <b>$262.83</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_AS_False"
                                                    onclick="Filter.matrixFilter_mobile(0, 'AS', 0, 'False', '11', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/as.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/as.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/as.gif';"
                                                    />
                                                    <b>$270.20</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_AA_False"
                                                    onclick="Filter.matrixFilter_mobile(0, 'AA', 0, 'False', '12', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/aa.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/aa.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/aa.gif';"
                                                    />
                                                    <b>$270.96</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_UA_False"
                                                    onclick="Filter.matrixFilter_mobile(0, 'UA', 0, 'False', '13', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/ua.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/ua.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/ua.gif';"
                                                    />
                                                    <b>$270.96</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_WN_False"
                                                    onclick="Filter.matrixFilter_mobile(0, 'WN', 0, 'False', '14', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/wn.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/wn.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/wn.gif';"
                                                    />
                                                    <b>$296.36</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_B6_True"
                                                    onclick="Filter.matrixFilter_mobile(0, 'B6', 0, 'True', '15', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/b6.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/b6.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/b6.gif';"
                                                    />
                                                    <span className="matrixstops">
                                                        <img src="/us/images/mal.png" />
                                                    </span>{" "}
                                                    <b>$330.19</b>
                                                </li>
                                                <li
                                                    className="head matrix_mobile"
                                                    id="martix_mobile_head_B6_False"
                                                    onclick="Filter.matrixFilter_mobile(0, 'B6', 0, 'False', '16', 0)"
                                                >
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/b6.png"
                                                        onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo/b6.gif') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo/b6.gif';"
                                                    />
                                                    <b>$581.40</b>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="matrix_bottom_row">
                                        <div className="multi-airline-icon hidden-xs" style={{}}>
                                            <img src="/us/images/listing/mal-blue.png" /> Indicate Multiple
                                            Airline
                                        </div>
                                    </div>
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
                                    results shown could either be for other dates or nearby airport(s).
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
                                                onclick="Filter.resetAll()"
                                            >
                                                {" "}
                                                Reset all
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix" />
                                <div className="shorting-tab">
                                    <ul>
                                        <li
                                            id="all"
                                            className="active"
                                            onclick="Filter.showtab(this.id);"
                                        >
                                            <b>All Results</b>
                                            <br />
                                            <span id="spn_all_amount">$75.98</span>
                                        </li>
                                        <li id="nearby" onclick="Filter.showtab(this.id);">
                                            <b>Nearby Airport(s)</b>
                                            <br />
                                            <span id="spn_nearby_amount">$78.95</span>
                                        </li>
                                        <li id="flexible" onclick="Filter.showtab(this.id);">
                                            <b>Alternate Dates</b>
                                            <br />
                                            <span id="spn_flexible_amount">$75.98</span>
                                        </li>
                                        <li id="shortest" onclick="Filter.showtab(this.id);">
                                            <b>Shortest Flights</b>
                                            <br />
                                            <span id="spn_shortest_amount">$427.68</span>
                                        </li>
                                    </ul>
                                </div>
                                <div id="containerListing">
                                    <input
                                        type="hidden"
                                        name="hdn_DOB_ValidatingDate"
                                        id="hdn_DOB_ValidatingDate"
                                        defaultValue="Mon, Oct 21, 2024"
                                    />
                                    <div className="flexi-content visible-xs">
                                        <span className="mobile_alternate hidden-sm hidden-lg hidden-md">
                                            Alternate Date{" "}
                                        </span>
                                    </div>
                                    <div className="result-block FTT3000">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 h-36">
                                                <div className="flexi-content hidden-xs">
                                                    <span>Alternate Date </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="position-relative">
                                            <div
                                                id="lbyfclickflightdetail"
                                                className="row clickflightdetail containerselect"
                                                onclick="Filter.getflightdetails('FTT3000','LAS-LAX-NK-465-20241019-ECON.LAX-LAS-NK-1494-20241021-ECON.','')"
                                            >
                                                <div className="col-sm-10 col-xs-12" id="fltlst">
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <span className="price-section visible-xs">
                                                                        <price>
                                                                            $75.98
                                                                            <div className="per-adult"> (Total price)</div>
                                                                        </price>
                                                                    </span>
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sat, Oct 19, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>05:00</strong>am
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 13m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 13m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>06:13</strong>am
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:13<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="leg-devider" />
                                                    <input type="hidden" totalpage={196} />
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32A AIRBUS A320 (SHARKLETS) 123-180 STD
                                                                                        Seats{" "}
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date flex-highlight">
                                                                        Mon, Oct 21, 2024
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>04:30</strong>pm
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 19m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 19m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>05:49</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:19<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 col-xs-12 hidden-xs" id="fltprice">
                                                    <div className="price-section">
                                                        <price>
                                                            <div
                                                                className="fare-breakup"
                                                                id="farebreakup_FTT3000"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div className="fare-section">
                                                                    <div className="line2">
                                                                        <a
                                                                            href="#adult"
                                                                            data-toggle="collapse"
                                                                            className="main blue"
                                                                        >
                                                                            <span>$75.98</span>
                                                                            <b>
                                                                                1 Adult(s) <i className="fa fa-angle-down" />
                                                                            </b>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="adult"
                                                                        className="line taxes-fees collapse in"
                                                                        aria-expanded="true"
                                                                    >
                                                                        <p>
                                                                            <span>$23.80</span>
                                                                            <b>Per adult Base fare</b>
                                                                        </p>
                                                                        <p>
                                                                            <span>$52.18</span>
                                                                            <b>Per adult Taxes &amp; Fee</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="total-price">
                                                                    <span>
                                                                        <b>$75.98</b>
                                                                    </span>
                                                                    <b>Total</b>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                $75.98 <br />
                                                                <span />
                                                            </div>
                                                            <div className="per-person">
                                                                (Total price)
                                                                <button className="seedetail">Select</button>
                                                            </div>
                                                        </price>
                                                        <div className="per-person">Go Economy</div>
                                                        <div className="clearfix" />
                                                        <div className="actionicons">
                                                            <ul>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img src="/us/images/svg/check.svg" alt="" />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="tooltipBox baggage_1 text-left">
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Personal Item
                                                                        <span className="green baggage_status">
                                                                            <img
                                                                                alt="icons"
                                                                                src="/us/images/svg/check.svg"
                                                                            />{" "}
                                                                            Included
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">A laptop bag or purse</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Carry-on Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            Chargeable
                                                                        </span>
                                                                    </div>
                                                                    <div className="light" />
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Checked Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            70.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">62 linear inches</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result-block sss910">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 h-36"></div>
                                        </div>
                                        <div className="position-relative">
                                            <div
                                                id="lbyfclickflightdetail"
                                                className="row clickflightdetail containerselect"
                                                onclick="Filter.getflightdetails('sss910','LAS-LAX-F9-2263-20241019-ECON.LAX-LAS-F9-3292-20241020-ECON.','')"
                                            >
                                                <div className="col-sm-10 col-xs-12" id="fltlst">
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <span className="price-section visible-xs">
                                                                        <price>
                                                                            $78.95
                                                                            <div className="per-adult"> (Total price)</div>
                                                                        </price>
                                                                    </span>
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Frontier Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32Q AIRBUS A321NEO 206-244 STD Seats
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sat, Oct 19, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>06:45</strong>pm
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 13m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 13m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>07:58</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:13<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="leg-devider" />
                                                    <input type="hidden" totalpage={196} />
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Frontier Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32Q AIRBUS A321NEO 206-244 STD Seats{" "}
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sun, Oct 20, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>08:58</strong>pm
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 19m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 19m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>10:17</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:19<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 col-xs-12 hidden-xs" id="fltprice">
                                                    <div className="price-section">
                                                        <price>
                                                            <div
                                                                className="fare-breakup"
                                                                id="farebreakup_sss910"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div className="fare-section">
                                                                    <div className="line2">
                                                                        <a
                                                                            href="#adult"
                                                                            data-toggle="collapse"
                                                                            className="main blue"
                                                                        >
                                                                            <span>$78.95</span>
                                                                            <b>
                                                                                1 Adult(s) <i className="fa fa-angle-down" />
                                                                            </b>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="adult"
                                                                        className="line taxes-fees collapse in"
                                                                        aria-expanded="true"
                                                                    >
                                                                        <p>
                                                                            <span>$44.86</span>
                                                                            <b>Per adult Base fare</b>
                                                                        </p>
                                                                        <p>
                                                                            <span>$34.09</span>
                                                                            <b>Per adult Taxes &amp; Fee</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="total-price">
                                                                    <span>
                                                                        <b>$78.95</b>
                                                                    </span>
                                                                    <b>Total</b>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                $78.95 <br />
                                                                <span />
                                                            </div>
                                                            <div className="per-person">
                                                                (Total price)
                                                                <button className="seedetail">Select</button>
                                                            </div>
                                                        </price>
                                                        <div className="clearfix" />
                                                        <div className="actionicons">
                                                            <ul>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img src="/us/images/svg/check.svg" alt="" />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="tooltipBox baggage_1 text-left">
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Personal Item
                                                                        <span className="green baggage_status">
                                                                            <img
                                                                                alt="icons"
                                                                                src="/us/images/svg/check.svg"
                                                                            />{" "}
                                                                            Included
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Must Fit Under the Seat</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Carry-on Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            79.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Upto 35 lbs</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Checked Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            73.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Upto 40 lbs</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result-block sss914">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 h-36"></div>
                                        </div>
                                        <div className="position-relative">
                                            <div
                                                id="lbyfclickflightdetail"
                                                className="row clickflightdetail containerselect"
                                                onclick="Filter.getflightdetails('sss914','LAS-LAX-F9-3291-20241019-ECON.LAX-LAS-F9-3292-20241020-ECON.','')"
                                            >
                                                <div className="col-sm-10 col-xs-12" id="fltlst">
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <span className="price-section visible-xs">
                                                                        <price>
                                                                            $84.96
                                                                            <div className="per-adult"> (Total price)</div>
                                                                        </price>
                                                                    </span>
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Frontier Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sat, Oct 19, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>12:14</strong>pm
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 13m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 13m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>01:27</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:13<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="leg-devider" />
                                                    <input type="hidden" totalpage={196} />
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Frontier Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32Q AIRBUS A321NEO 206-244 STD Seats{" "}
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sun, Oct 20, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>08:58</strong>pm
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 19m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 19m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>10:17</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:19<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 col-xs-12 hidden-xs" id="fltprice">
                                                    <div className="price-section">
                                                        <price>
                                                            <div
                                                                className="fare-breakup"
                                                                id="farebreakup_sss914"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div className="fare-section">
                                                                    <div className="line2">
                                                                        <a
                                                                            href="#adult"
                                                                            data-toggle="collapse"
                                                                            className="main blue"
                                                                        >
                                                                            <span>$84.96</span>
                                                                            <b>
                                                                                1 Adult(s) <i className="fa fa-angle-down" />
                                                                            </b>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="adult"
                                                                        className="line taxes-fees collapse in"
                                                                        aria-expanded="true"
                                                                    >
                                                                        <p>
                                                                            <span>$50.45</span>
                                                                            <b>Per adult Base fare</b>
                                                                        </p>
                                                                        <p>
                                                                            <span>$34.51</span>
                                                                            <b>Per adult Taxes &amp; Fee</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="total-price">
                                                                    <span>
                                                                        <b>$84.96</b>
                                                                    </span>
                                                                    <b>Total</b>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                $84.96 <br />
                                                                <span />
                                                            </div>
                                                            <div className="per-person">
                                                                (Total price)
                                                                <button className="seedetail">Select</button>
                                                            </div>
                                                        </price>
                                                        <div className="clearfix" />
                                                        <div className="actionicons">
                                                            <ul>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img src="/us/images/svg/check.svg" alt="" />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="tooltipBox baggage_1 text-left">
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Personal Item
                                                                        <span className="green baggage_status">
                                                                            <img
                                                                                alt="icons"
                                                                                src="/us/images/svg/check.svg"
                                                                            />{" "}
                                                                            Included
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Must Fit Under the Seat</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Carry-on Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            79.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Upto 35 lbs</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Checked Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            73.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Upto 40 lbs</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result-block sss919">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 h-36"></div>
                                        </div>
                                        <div className="position-relative">
                                            <div
                                                id="lbyfclickflightdetail"
                                                className="row clickflightdetail containerselect"
                                                onclick="Filter.getflightdetails('sss919','LAS-LAX-F9-2263-20241019-ECON.LAX-LAS-F9-2264-20241020-ECON.','')"
                                            >
                                                <div className="col-sm-10 col-xs-12" id="fltlst">
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <span className="price-section visible-xs">
                                                                        <price>
                                                                            $103.95
                                                                            <div className="per-adult"> (Total price)</div>
                                                                            <div
                                                                                className="per-adult"
                                                                                style={{ display: "block" }}
                                                                            >
                                                                                <div
                                                                                    className="afflop afffred_10400"
                                                                                    amt={10400}
                                                                                >
                                                                                    or from <b>$10/mo</b>
                                                                                </div>
                                                                            </div>
                                                                        </price>
                                                                    </span>
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Frontier Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32Q AIRBUS A321NEO 206-244 STD Seats
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sat, Oct 19, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>06:45</strong>pm
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 13m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 13m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>07:58</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:13<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="leg-devider" />
                                                    <input type="hidden" totalpage={196} />
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Frontier Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats{" "}
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sun, Oct 20, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>02:30</strong>pm
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 19m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 19m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>03:49</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:19<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 col-xs-12 hidden-xs" id="fltprice">
                                                    <div className="price-section">
                                                        <price>
                                                            <div
                                                                className="fare-breakup"
                                                                id="farebreakup_sss919"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div className="fare-section">
                                                                    <div className="line2">
                                                                        <a
                                                                            href="#adult"
                                                                            data-toggle="collapse"
                                                                            className="main blue"
                                                                        >
                                                                            <span>$103.95</span>
                                                                            <b>
                                                                                1 Adult(s) <i className="fa fa-angle-down" />
                                                                            </b>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="adult"
                                                                        className="line taxes-fees collapse in"
                                                                        aria-expanded="true"
                                                                    >
                                                                        <p>
                                                                            <span>$68.12</span>
                                                                            <b>Per adult Base fare</b>
                                                                        </p>
                                                                        <p>
                                                                            <span>$35.83</span>
                                                                            <b>Per adult Taxes &amp; Fee</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="total-price">
                                                                    <span>
                                                                        <b>$103.95</b>
                                                                    </span>
                                                                    <b>Total</b>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                $103.95 <br />
                                                                <span />
                                                            </div>
                                                            <div className="per-person">
                                                                (Total price)
                                                                <div
                                                                    className="affirm_text"
                                                                    style={{ display: "block" }}
                                                                >
                                                                    <spna className="afflop afffred_10400" amt={10400}>
                                                                        or from <b>$10/mo</b>
                                                                    </spna>
                                                                    <div className="tooltip-custom">
                                                                        <i className="fa fa-info hand" />
                                                                        <div className="promo-detail right_tooltip">
                                                                            <div className="mb5px text-center">
                                                                                <img
                                                                                    className="easy-payment-logo"
                                                                                    src="/us/images/card-icon/affirm-logo.png?v=1.2"
                                                                                />
                                                                                <div className="textaffirm">
                                                                                    <strong>Buy now, pay over time</strong>
                                                                                </div>
                                                                            </div>
                                                                            <ul className="affirm_list 10400_afffredul">
                                                                                <li>
                                                                                    3 months <div className="price">$36</div>
                                                                                </li>
                                                                                <li>
                                                                                    6 months <div className="price">$18</div>
                                                                                </li>
                                                                                <li>
                                                                                    12 months <div className="price">$10</div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button className="seedetail">Select</button>
                                                            </div>
                                                        </price>
                                                        <div className="clearfix" />
                                                        <div className="actionicons">
                                                            <ul>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img src="/us/images/svg/check.svg" alt="" />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="tooltipBox baggage_1 text-left">
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Personal Item
                                                                        <span className="green baggage_status">
                                                                            <img
                                                                                alt="icons"
                                                                                src="/us/images/svg/check.svg"
                                                                            />{" "}
                                                                            Included
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Must Fit Under the Seat</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Carry-on Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            79.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Upto 35 lbs</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Checked Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            73.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Upto 40 lbs</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result-block FTT3003">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 h-36"></div>
                                        </div>
                                        <div className="position-relative">
                                            <div
                                                id="lbyfclickflightdetail"
                                                className="row clickflightdetail containerselect"
                                                onclick="Filter.getflightdetails('FTT3003','LAS-LAX-NK-465-20241019-ECON.LAX-LAS-NK-1724-20241020-ECON.','')"
                                            >
                                                <div className="col-sm-10 col-xs-12" id="fltlst">
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <span className="price-section visible-xs">
                                                                        <price>
                                                                            $105.98
                                                                            <div className="per-adult"> (Total price)</div>
                                                                            <div
                                                                                className="per-adult"
                                                                                style={{ display: "block" }}
                                                                            >
                                                                                <div
                                                                                    className="afflop afffred_10600"
                                                                                    amt={10600}
                                                                                >
                                                                                    or from <b>$10/mo</b>
                                                                                </div>
                                                                            </div>
                                                                        </price>
                                                                    </span>
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sat, Oct 19, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>05:00</strong>am
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 13m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 13m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>06:13</strong>am
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:13<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="leg-devider" />
                                                    <input type="hidden" totalpage={196} />
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats{" "}
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sun, Oct 20, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>10:43</strong>am
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 21m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 21m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>12:04</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:21<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 col-xs-12 hidden-xs" id="fltprice">
                                                    <div className="price-section">
                                                        <price>
                                                            <div
                                                                className="fare-breakup"
                                                                id="farebreakup_FTT3003"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div className="fare-section">
                                                                    <div className="line2">
                                                                        <a
                                                                            href="#adult"
                                                                            data-toggle="collapse"
                                                                            className="main blue"
                                                                        >
                                                                            <span>$105.98</span>
                                                                            <b>
                                                                                1 Adult(s) <i className="fa fa-angle-down" />
                                                                            </b>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="adult"
                                                                        className="line taxes-fees collapse in"
                                                                        aria-expanded="true"
                                                                    >
                                                                        <p>
                                                                            <span>$41.80</span>
                                                                            <b>Per adult Base fare</b>
                                                                        </p>
                                                                        <p>
                                                                            <span>$64.18</span>
                                                                            <b>Per adult Taxes &amp; Fee</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="total-price">
                                                                    <span>
                                                                        <b>$105.98</b>
                                                                    </span>
                                                                    <b>Total</b>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                $105.98 <br />
                                                                <span />
                                                            </div>
                                                            <div className="per-person">
                                                                (Total price)
                                                                <div
                                                                    className="affirm_text"
                                                                    style={{ display: "block" }}
                                                                >
                                                                    <spna className="afflop afffred_10600" amt={10600}>
                                                                        or from <b>$10/mo</b>
                                                                    </spna>
                                                                    <div className="tooltip-custom">
                                                                        <i className="fa fa-info hand" />
                                                                        <div className="promo-detail right_tooltip">
                                                                            <div className="mb5px text-center">
                                                                                <img
                                                                                    className="easy-payment-logo"
                                                                                    src="/us/images/card-icon/affirm-logo.png?v=1.2"
                                                                                />
                                                                                <div className="textaffirm">
                                                                                    <strong>Buy now, pay over time</strong>
                                                                                </div>
                                                                            </div>
                                                                            <ul className="affirm_list 10600_afffredul">
                                                                                <li>
                                                                                    3 months <div className="price">$36</div>
                                                                                </li>
                                                                                <li>
                                                                                    6 months <div className="price">$19</div>
                                                                                </li>
                                                                                <li>
                                                                                    12 months <div className="price">$10</div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button className="seedetail">Select</button>
                                                            </div>
                                                        </price>
                                                        <div className="per-person">Go Economy</div>
                                                        <div className="clearfix" />
                                                        <div className="actionicons">
                                                            <ul>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img src="/us/images/svg/check.svg" alt="" />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="tooltipBox baggage_1 text-left">
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Personal Item
                                                                        <span className="green baggage_status">
                                                                            <img
                                                                                alt="icons"
                                                                                src="/us/images/svg/check.svg"
                                                                            />{" "}
                                                                            Included
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">A laptop bag or purse</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Carry-on Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            Chargeable
                                                                        </span>
                                                                    </div>
                                                                    <div className="light" />
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Checked Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            70.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">62 linear inches</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result-block ftt3002ftt3006">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 h-36"></div>
                                        </div>
                                        <div className="position-relative">
                                            <div
                                                id="lbyfclickflightdetail"
                                                className="row clickflightdetail containerselect"
                                                onclick="Filter.getflightdetails('ftt3002ftt3006','LAS-LAX-NK-465-20241019-ECON.LAX-LAS-NK-202-20241020-ECON.','')"
                                            >
                                                <div className="col-sm-10 col-xs-12" id="fltlst">
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <span className="price-section visible-xs">
                                                                        <price>
                                                                            $108.98
                                                                            <div className="per-adult"> (Total price)</div>
                                                                            <div
                                                                                className="per-adult"
                                                                                style={{ display: "block" }}
                                                                            >
                                                                                <div
                                                                                    className="afflop afffred_10900"
                                                                                    amt={10900}
                                                                                >
                                                                                    or from <b>$10/mo</b>
                                                                                </div>
                                                                            </div>
                                                                        </price>
                                                                    </span>
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sat, Oct 19, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>05:00</strong>am
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 13m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 13m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>06:13</strong>am
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:13<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="leg-devider" />
                                                    <input type="hidden" totalpage={196} />
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32Q AIRBUS A321NEO 206-244 STD Seats{" "}
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sun, Oct 20, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>02:07</strong>pm
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 17m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 17m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>03:24</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:17<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 col-xs-12 hidden-xs" id="fltprice">
                                                    <div className="price-section">
                                                        <price>
                                                            <div
                                                                className="fare-breakup"
                                                                id="farebreakup_ftt3002ftt3006"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div className="fare-section">
                                                                    <div className="line2">
                                                                        <a
                                                                            href="#adult"
                                                                            data-toggle="collapse"
                                                                            className="main blue"
                                                                        >
                                                                            <span>$108.98</span>
                                                                            <b>
                                                                                1 Adult(s) <i className="fa fa-angle-down" />
                                                                            </b>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="adult"
                                                                        className="line taxes-fees collapse in"
                                                                        aria-expanded="true"
                                                                    >
                                                                        <p>
                                                                            <span>$44.80</span>
                                                                            <b>Per adult Base fare</b>
                                                                        </p>
                                                                        <p>
                                                                            <span>$64.18</span>
                                                                            <b>Per adult Taxes &amp; Fee</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="total-price">
                                                                    <span>
                                                                        <b>$108.98</b>
                                                                    </span>
                                                                    <b>Total</b>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                $108.98 <br />
                                                                <span />
                                                            </div>
                                                            <div className="per-person">
                                                                (Total price)
                                                                <div
                                                                    className="affirm_text"
                                                                    style={{ display: "block" }}
                                                                >
                                                                    <spna className="afflop afffred_10900" amt={10900}>
                                                                        or from <b>$10/mo</b>
                                                                    </spna>
                                                                    <div className="tooltip-custom">
                                                                        <i className="fa fa-info hand" />
                                                                        <div className="promo-detail right_tooltip">
                                                                            <div className="mb5px text-center">
                                                                                <img
                                                                                    className="easy-payment-logo"
                                                                                    src="/us/images/card-icon/affirm-logo.png?v=1.2"
                                                                                />
                                                                                <div className="textaffirm">
                                                                                    <strong>Buy now, pay over time</strong>
                                                                                </div>
                                                                            </div>
                                                                            <ul className="affirm_list 10900_afffredul">
                                                                                <li>
                                                                                    3 months <div className="price">$37</div>
                                                                                </li>
                                                                                <li>
                                                                                    6 months <div className="price">$19</div>
                                                                                </li>
                                                                                <li>
                                                                                    12 months <div className="price">$10</div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button className="seedetail">Select</button>
                                                            </div>
                                                        </price>
                                                        <div className="per-person">Go Economy</div>
                                                        <div className="clearfix" />
                                                        <div className="actionicons">
                                                            <ul>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img src="/us/images/svg/check.svg" alt="" />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="tooltipBox baggage_1 text-left">
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Personal Item
                                                                        <span className="green baggage_status">
                                                                            <img
                                                                                alt="icons"
                                                                                src="/us/images/svg/check.svg"
                                                                            />{" "}
                                                                            Included
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">A laptop bag or purse</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Carry-on Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            Chargeable
                                                                        </span>
                                                                    </div>
                                                                    <div className="light" />
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Checked Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            70.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">62 linear inches</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result-block sss932">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 h-36"></div>
                                        </div>
                                        <div className="position-relative">
                                            <div
                                                id="lbyfclickflightdetail"
                                                className="row clickflightdetail containerselect"
                                                onclick="Filter.getflightdetails('sss932','LAS-LAX-F9-3291-20241019-ECON.LAX-LAS-F9-2264-20241020-ECON.','')"
                                            >
                                                <div className="col-sm-10 col-xs-12" id="fltlst">
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <span className="price-section visible-xs">
                                                                        <price>
                                                                            $109.96
                                                                            <div className="per-adult"> (Total price)</div>
                                                                            <div
                                                                                className="per-adult"
                                                                                style={{ display: "block" }}
                                                                            >
                                                                                <div
                                                                                    className="afflop afffred_11000"
                                                                                    amt={11000}
                                                                                >
                                                                                    or from <b>$10/mo</b>
                                                                                </div>
                                                                            </div>
                                                                        </price>
                                                                    </span>
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Frontier Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sat, Oct 19, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>12:14</strong>pm
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 13m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 13m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>01:27</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:13<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="leg-devider" />
                                                    <input type="hidden" totalpage={196} />
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Frontier Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats{" "}
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sun, Oct 20, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>02:30</strong>pm
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 19m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 19m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>03:49</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:19<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 col-xs-12 hidden-xs" id="fltprice">
                                                    <div className="price-section">
                                                        <price>
                                                            <div
                                                                className="fare-breakup"
                                                                id="farebreakup_sss932"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div className="fare-section">
                                                                    <div className="line2">
                                                                        <a
                                                                            href="#adult"
                                                                            data-toggle="collapse"
                                                                            className="main blue"
                                                                        >
                                                                            <span>$109.96</span>
                                                                            <b>
                                                                                1 Adult(s) <i className="fa fa-angle-down" />
                                                                            </b>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="adult"
                                                                        className="line taxes-fees collapse in"
                                                                        aria-expanded="true"
                                                                    >
                                                                        <p>
                                                                            <span>$73.71</span>
                                                                            <b>Per adult Base fare</b>
                                                                        </p>
                                                                        <p>
                                                                            <span>$36.25</span>
                                                                            <b>Per adult Taxes &amp; Fee</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="total-price">
                                                                    <span>
                                                                        <b>$109.96</b>
                                                                    </span>
                                                                    <b>Total</b>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                $109.96 <br />
                                                                <span />
                                                            </div>
                                                            <div className="per-person">
                                                                (Total price)
                                                                <div
                                                                    className="affirm_text"
                                                                    style={{ display: "block" }}
                                                                >
                                                                    <spna className="afflop afffred_11000" amt={11000}>
                                                                        or from <b>$10/mo</b>
                                                                    </spna>
                                                                    <div className="tooltip-custom">
                                                                        <i className="fa fa-info hand" />
                                                                        <div className="promo-detail right_tooltip">
                                                                            <div className="mb5px text-center">
                                                                                <img
                                                                                    className="easy-payment-logo"
                                                                                    src="/us/images/card-icon/affirm-logo.png?v=1.2"
                                                                                />
                                                                                <div className="textaffirm">
                                                                                    <strong>Buy now, pay over time</strong>
                                                                                </div>
                                                                            </div>
                                                                            <ul className="affirm_list 11000_afffredul">
                                                                                <li>
                                                                                    3 months <div className="price">$38</div>
                                                                                </li>
                                                                                <li>
                                                                                    6 months <div className="price">$19</div>
                                                                                </li>
                                                                                <li>
                                                                                    12 months <div className="price">$10</div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button className="seedetail">Select</button>
                                                            </div>
                                                        </price>
                                                        <div className="clearfix" />
                                                        <div className="actionicons">
                                                            <ul>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img src="/us/images/svg/check.svg" alt="" />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="tooltipBox baggage_1 text-left">
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Personal Item
                                                                        <span className="green baggage_status">
                                                                            <img
                                                                                alt="icons"
                                                                                src="/us/images/svg/check.svg"
                                                                            />{" "}
                                                                            Included
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Must Fit Under the Seat</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Carry-on Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            79.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Upto 35 lbs</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Checked Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            73.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">Upto 40 lbs</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result-block FTT3006">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 h-36"></div>
                                        </div>
                                        <div className="position-relative">
                                            <div
                                                id="lbyfclickflightdetail"
                                                className="row clickflightdetail containerselect"
                                                onclick="Filter.getflightdetails('FTT3006','LAS-LAX-NK-465-20241019-ECON.LAX-LAS-NK-1494-20241020-ECON.','')"
                                            >
                                                <div className="col-sm-10 col-xs-12" id="fltlst">
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <span className="price-section visible-xs">
                                                                        <price>
                                                                            $124.98
                                                                            <div className="per-adult"> (Total price)</div>
                                                                            <div
                                                                                className="per-adult"
                                                                                style={{ display: "block" }}
                                                                            >
                                                                                <div
                                                                                    className="afflop afffred_12500"
                                                                                    amt={12500}
                                                                                >
                                                                                    or from <b>$11/mo</b>
                                                                                </div>
                                                                            </div>
                                                                        </price>
                                                                    </span>
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sat, Oct 19, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>05:00</strong>am
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 13m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 13m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>06:13</strong>am
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:13<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="leg-devider" />
                                                    <input type="hidden" totalpage={196} />
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32A AIRBUS A320 (SHARKLETS) 123-180 STD
                                                                                        Seats{" "}
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sun, Oct 20, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>04:30</strong>pm
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 19m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 19m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>05:49</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:19<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 col-xs-12 hidden-xs" id="fltprice">
                                                    <div className="price-section">
                                                        <price>
                                                            <div
                                                                className="fare-breakup"
                                                                id="farebreakup_FTT3006"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div className="fare-section">
                                                                    <div className="line2">
                                                                        <a
                                                                            href="#adult"
                                                                            data-toggle="collapse"
                                                                            className="main blue"
                                                                        >
                                                                            <span>$124.98</span>
                                                                            <b>
                                                                                1 Adult(s) <i className="fa fa-angle-down" />
                                                                            </b>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="adult"
                                                                        className="line taxes-fees collapse in"
                                                                        aria-expanded="true"
                                                                    >
                                                                        <p>
                                                                            <span>$60.80</span>
                                                                            <b>Per adult Base fare</b>
                                                                        </p>
                                                                        <p>
                                                                            <span>$64.18</span>
                                                                            <b>Per adult Taxes &amp; Fee</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="total-price">
                                                                    <span>
                                                                        <b>$124.98</b>
                                                                    </span>
                                                                    <b>Total</b>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                $124.98 <br />
                                                                <span />
                                                            </div>
                                                            <div className="per-person">
                                                                (Total price)
                                                                <div
                                                                    className="affirm_text"
                                                                    style={{ display: "block" }}
                                                                >
                                                                    <spna className="afflop afffred_12500" amt={12500}>
                                                                        or from <b>$11/mo</b>
                                                                    </spna>
                                                                    <div className="tooltip-custom">
                                                                        <i className="fa fa-info hand" />
                                                                        <div className="promo-detail right_tooltip">
                                                                            <div className="mb5px text-center">
                                                                                <img
                                                                                    className="easy-payment-logo"
                                                                                    src="/us/images/card-icon/affirm-logo.png?v=1.2"
                                                                                />
                                                                                <div className="textaffirm">
                                                                                    <strong>Buy now, pay over time</strong>
                                                                                </div>
                                                                            </div>
                                                                            <ul className="affirm_list 12500_afffredul">
                                                                                <li>
                                                                                    3 months <div className="price">$43</div>
                                                                                </li>
                                                                                <li>
                                                                                    6 months <div className="price">$22</div>
                                                                                </li>
                                                                                <li>
                                                                                    12 months <div className="price">$11</div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button className="seedetail">Select</button>
                                                            </div>
                                                        </price>
                                                        <div className="per-person">Go Economy</div>
                                                        <div className="clearfix" />
                                                        <div className="actionicons">
                                                            <ul>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img src="/us/images/svg/check.svg" alt="" />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="tooltipBox baggage_1 text-left">
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Personal Item
                                                                        <span className="green baggage_status">
                                                                            <img
                                                                                alt="icons"
                                                                                src="/us/images/svg/check.svg"
                                                                            />{" "}
                                                                            Included
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">A laptop bag or purse</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Carry-on Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            Chargeable
                                                                        </span>
                                                                    </div>
                                                                    <div className="light" />
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Checked Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            70.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">62 linear inches</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result-block FTT3074">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 h-36"></div>
                                        </div>
                                        <div className="position-relative">
                                            <div
                                                id="lbyfclickflightdetail"
                                                className="row clickflightdetail containerselect"
                                                onclick="Filter.getflightdetails('FTT3074','LAS-LAX-NK-211-20241019-ECON.LAX-LAS-NK-1724-20241020-ECON.','')"
                                            >
                                                <div className="col-sm-10 col-xs-12" id="fltlst">
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <span className="price-section visible-xs">
                                                                        <price>
                                                                            $135.98
                                                                            <div className="per-adult"> (Total price)</div>
                                                                            <div
                                                                                className="per-adult"
                                                                                style={{ display: "block" }}
                                                                            >
                                                                                <div
                                                                                    className="afflop afffred_13600"
                                                                                    amt={13600}
                                                                                >
                                                                                    or from <b>$12/mo</b>
                                                                                </div>
                                                                            </div>
                                                                        </price>
                                                                    </span>
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32Q AIRBUS A321NEO 206-244 STD Seats
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sat, Oct 19, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>11:48</strong>am
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 19m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 19m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>01:07</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:19<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="leg-devider" />
                                                    <input type="hidden" totalpage={196} />
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats{" "}
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sun, Oct 20, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>10:43</strong>am
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 21m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 21m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>12:04</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:21<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 col-xs-12 hidden-xs" id="fltprice">
                                                    <div className="price-section">
                                                        <price>
                                                            <div
                                                                className="fare-breakup"
                                                                id="farebreakup_FTT3074"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div className="fare-section">
                                                                    <div className="line2">
                                                                        <a
                                                                            href="#adult"
                                                                            data-toggle="collapse"
                                                                            className="main blue"
                                                                        >
                                                                            <span>$135.98</span>
                                                                            <b>
                                                                                1 Adult(s) <i className="fa fa-angle-down" />
                                                                            </b>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="adult"
                                                                        className="line taxes-fees collapse in"
                                                                        aria-expanded="true"
                                                                    >
                                                                        <p>
                                                                            <span>$59.80</span>
                                                                            <b>Per adult Base fare</b>
                                                                        </p>
                                                                        <p>
                                                                            <span>$76.18</span>
                                                                            <b>Per adult Taxes &amp; Fee</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="total-price">
                                                                    <span>
                                                                        <b>$135.98</b>
                                                                    </span>
                                                                    <b>Total</b>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                $135.98 <br />
                                                                <span />
                                                            </div>
                                                            <div className="per-person">
                                                                (Total price)
                                                                <div
                                                                    className="affirm_text"
                                                                    style={{ display: "block" }}
                                                                >
                                                                    <spna className="afflop afffred_13600" amt={13600}>
                                                                        or from <b>$12/mo</b>
                                                                    </spna>
                                                                    <div className="tooltip-custom">
                                                                        <i className="fa fa-info hand" />
                                                                        <div className="promo-detail right_tooltip">
                                                                            <div className="mb5px text-center">
                                                                                <img
                                                                                    className="easy-payment-logo"
                                                                                    src="/us/images/card-icon/affirm-logo.png?v=1.2"
                                                                                />
                                                                                <div className="textaffirm">
                                                                                    <strong>Buy now, pay over time</strong>
                                                                                </div>
                                                                            </div>
                                                                            <ul className="affirm_list 13600_afffredul">
                                                                                <li>
                                                                                    3 months <div className="price">$47</div>
                                                                                </li>
                                                                                <li>
                                                                                    6 months <div className="price">$24</div>
                                                                                </li>
                                                                                <li>
                                                                                    12 months <div className="price">$12</div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button className="seedetail">Select</button>
                                                            </div>
                                                        </price>
                                                        <div className="per-person">Go Economy</div>
                                                        <div className="clearfix" />
                                                        <div className="actionicons">
                                                            <ul>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img src="/us/images/svg/check.svg" alt="" />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="tooltipBox baggage_1 text-left">
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Personal Item
                                                                        <span className="green baggage_status">
                                                                            <img
                                                                                alt="icons"
                                                                                src="/us/images/svg/check.svg"
                                                                            />{" "}
                                                                            Included
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">A laptop bag or purse</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Carry-on Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            Chargeable
                                                                        </span>
                                                                    </div>
                                                                    <div className="light" />
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Checked Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            70.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">62 linear inches</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result-block FTT3105">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 h-36"></div>
                                        </div>
                                        <div className="position-relative">
                                            <div
                                                id="lbyfclickflightdetail"
                                                className="row clickflightdetail containerselect"
                                                onclick="Filter.getflightdetails('FTT3105','LAS-LAX-NK-1723-20241019-ECON.LAX-LAS-NK-1724-20241020-ECON.','')"
                                            >
                                                <div className="col-sm-10 col-xs-12" id="fltlst">
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <span className="price-section visible-xs">
                                                                        <price>
                                                                            $135.98
                                                                            <div className="per-adult"> (Total price)</div>
                                                                            <div
                                                                                className="per-adult"
                                                                                style={{ display: "block" }}
                                                                            >
                                                                                <div
                                                                                    className="afflop afffred_13600"
                                                                                    amt={13600}
                                                                                >
                                                                                    or from <b>$12/mo</b>
                                                                                </div>
                                                                            </div>
                                                                        </price>
                                                                    </span>
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sat, Oct 19, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>07:41</strong>am
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 19m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 19m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>09:00</strong>am
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:19<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="leg-devider" />
                                                    <input type="hidden" totalpage={196} />
                                                    <div className="depart-flight">
                                                        <a className="xs-dis-blck" href="javascript:void(0);">
                                                            <div className="row">
                                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                                    <div className="airline-detail">
                                                                        <img
                                                                            src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png"
                                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                                        />
                                                                        <div className="name">
                                                                            Spirit Airlines
                                                                            <span className="tooltip-custom">
                                                                                <div className="promo-detail">
                                                                                    <span className="arrow" />
                                                                                    <p className="mb5px">
                                                                                        32N AIRBUS A320NEO 165-194 STD Seats{" "}
                                                                                    </p>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="flex-date ">Sun, Oct 20, 2024</div>
                                                                    <div className="leg-details">
                                                                        <div className="city text-right">
                                                                            <div className="time">
                                                                                <strong>10:43</strong>am
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className=" tooltip-custom minor-txt">
                                                                                    LAX
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Los Angeles International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="connnecting-block">
                                                                        <div className="leg-points">
                                                                            <div className="tooltip-custom">
                                                                                <span className="visible-xs layovertimemob">
                                                                                    <span
                                                                                        style={{ width: "auto" }}
                                                                                        className="fa fa-clock-o"
                                                                                    />{" "}
                                                                                    1h 21m
                                                                                </span>
                                                                                <span
                                                                                    className="visible-xs"
                                                                                    style={{ width: 50 }}
                                                                                >
                                                                                    <i style={{ visibility: "hidden" }} />
                                                                                    <span className="destination_code nowrap">
                                                                                        {" "}
                                                                                        <b>Non-Stop</b>
                                                                                    </span>
                                                                                </span>
                                                                                <div className="promo-detail">
                                                                                    <p>
                                                                                        <strong>Flight Duration: </strong>1h 21m
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="leg-details">
                                                                        <div className="city">
                                                                            <div className="time">
                                                                                <strong>12:04</strong>pm
                                                                                <sup />
                                                                            </div>
                                                                            <div className="code">
                                                                                <span className="  tooltip-custom minor-txt">
                                                                                    LAS
                                                                                    <div className="promo-detail">
                                                                                        <span className="arrow" />
                                                                                        <p
                                                                                            className="mb5px"
                                                                                            style={{ textAlign: "left" }}
                                                                                        >
                                                                                            Harry Reid International
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                                    <div
                                                                        className="trip-time"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            width: 80,
                                                                            paddingTop: 20,
                                                                            color: "#333"
                                                                        }}
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
                                                                        1<span>h</span>:21<span>m</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 col-xs-12 hidden-xs" id="fltprice">
                                                    <div className="price-section">
                                                        <price>
                                                            <div
                                                                className="fare-breakup"
                                                                id="farebreakup_FTT3105"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div className="fare-section">
                                                                    <div className="line2">
                                                                        <a
                                                                            href="#adult"
                                                                            data-toggle="collapse"
                                                                            className="main blue"
                                                                        >
                                                                            <span>$135.98</span>
                                                                            <b>
                                                                                1 Adult(s) <i className="fa fa-angle-down" />
                                                                            </b>
                                                                        </a>
                                                                    </div>
                                                                    <div
                                                                        id="adult"
                                                                        className="line taxes-fees collapse in"
                                                                        aria-expanded="true"
                                                                    >
                                                                        <p>
                                                                            <span>$59.80</span>
                                                                            <b>Per adult Base fare</b>
                                                                        </p>
                                                                        <p>
                                                                            <span>$76.18</span>
                                                                            <b>Per adult Taxes &amp; Fee</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="total-price">
                                                                    <span>
                                                                        <b>$135.98</b>
                                                                    </span>
                                                                    <b>Total</b>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                $135.98 <br />
                                                                <span />
                                                            </div>
                                                            <div className="per-person">
                                                                (Total price)
                                                                <div
                                                                    className="affirm_text"
                                                                    style={{ display: "block" }}
                                                                >
                                                                    <spna className="afflop afffred_13600" amt={13600}>
                                                                        or from <b>$12/mo</b>
                                                                    </spna>
                                                                    <div className="tooltip-custom">
                                                                        <i className="fa fa-info hand" />
                                                                        <div className="promo-detail right_tooltip">
                                                                            <div className="mb5px text-center">
                                                                                <img
                                                                                    className="easy-payment-logo"
                                                                                    src="/us/images/card-icon/affirm-logo.png?v=1.2"
                                                                                />
                                                                                <div className="textaffirm">
                                                                                    <strong>Buy now, pay over time</strong>
                                                                                </div>
                                                                            </div>
                                                                            <ul className="affirm_list 13600_afffredul">
                                                                                <li>
                                                                                    3 months <div className="price">$47</div>
                                                                                </li>
                                                                                <li>
                                                                                    6 months <div className="price">$24</div>
                                                                                </li>
                                                                                <li>
                                                                                    12 months <div className="price">$12</div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button className="seedetail">Select</button>
                                                            </div>
                                                        </price>
                                                        <div className="per-person">Go Economy</div>
                                                        <div className="clearfix" />
                                                        <div className="actionicons">
                                                            <ul>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img src="/us/images/svg/check.svg" alt="" />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="relative">
                                                                        <span className="top_icon">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />
                                                                        </span>
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.2"
                                                                            className="icons icon-luggage"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="tooltipBox baggage_1 text-left">
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/p-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Personal Item
                                                                        <span className="green baggage_status">
                                                                            <img
                                                                                alt="icons"
                                                                                src="/us/images/svg/check.svg"
                                                                            />{" "}
                                                                            Included
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">A laptop bag or purse</div>
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/c-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Carry-on Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            Chargeable
                                                                        </span>
                                                                    </div>
                                                                    <div className="light" />
                                                                </div>
                                                                <div className="baggage_row">
                                                                    <div className="popup_icon relative">
                                                                        <img
                                                                            src="/us/images/svg/b-bag.svg?v=1.0"
                                                                            alt=""
                                                                            className="icons"
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        Checked Bag
                                                                        <span className="blue_text baggage_status">
                                                                            <img
                                                                                src="/us/images/svg/baggage-chargable.svg"
                                                                                alt=""
                                                                            />{" "}
                                                                            70.00
                                                                        </span>
                                                                    </div>
                                                                    <div className="light">62 linear inches</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" defaultValue={1966} id="Pcount" />
                                    <input type="hidden" id="sort_all_amt" defaultValue="75.98" />
                                    <input type="hidden" id="sort_nearby_amt" defaultValue="78.95" />
                                    <input type="hidden" id="sort_flexible_amt" defaultValue="75.98" />
                                    <input type="hidden" id="sort_shortest_amt" defaultValue="427.68" />
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
                                    defaultValue={196}
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
                            <b>4272</b> people are currently searching for flights to <br />
                            Los Angeles
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
                                Flight Prices may change frequently owing to demand and availability.
                                Start a <b>New Search</b> / <b>Refresh Result</b> to view the latest
                                deals
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
        </>
    );
};

export default FlightListing;



