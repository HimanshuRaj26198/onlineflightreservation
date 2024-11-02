"use client"
import FlightOfferCard from '@/app/_components/FlightOffers/page';
import FlightSearchWrapper from '@/app/_components/FlightSearchWrapper/page';
import { useParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from "react";
import ShortedFlightCard from '@/app/_components/ShorttestFlightCard/page';
import AlternateFlightCard from '@/app/_components/AlternateFlightCard/page'
import NearestFlightCard from '@/app/_components/NearestFlightCard/page'
import AllFlight from '@/app/_components/AllResult/page'
import FlightDataArr from '@/assets/Flight_Data_US.json'
import FlightCard from '@/app/_components/FlightCard/page';
import airlines from "../../../../lib/airlines.json";
import airportsDB from "../../../../lib/airports.json";





const FlightListing = () => {
    const params = useParams();
    const searchRef = useRef(null);
    const [FlightList, setFlightList] = useState([]);
    // const iataCode = params.get('iataCode');

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [maxHeight, setMaxHeight] = useState("0px");
    const [activeTab, setActiveTab] = useState('all');


    useEffect(() => {
        let newFlightList = FlightDataArr.map(a => {
            a.stops = a.itineraries[0].segments.length - 1;
            console.log("Flight Data Single", a);
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
        setFlightList(newFlightList)
    }, [])

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

    return (
        <>
            {/* <noscript
                dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5L5GNW3" height="0" width="0" style="display:none;visibility:hidden;"></iframe>`
                }}
            ></noscript> */}

            <header>
                {/* <div className="header-call-strip">
                    <a id="hdr_contactNo" href="tel:+1-248-274-7239">
                        <img
                            src="/us/images/uc/animation-call-white-icon.gif"
                            width={22}
                            height={22}
                        />{" "}
                        Call Now:
                        <span id="hdr_span">+1-248-274-7239</span>
                    </a>
                </div> */}
                {/* <header className="navigation_block ">
                    <nav className="navbar-default navbar-static-top menuBox">
                        <div className="container">
                            <div className="navbar-header">
                                <a
                                    href="javascript:$zopim.livechat.window.show();"
                                    className="chat-iconss visible-xs"
                                    style={{
                                        position: "absolute",
                                        right: 78,
                                        top: "-1px",
                                        fontSize: 27,
                                        fontWeight: 700,
                                        color: "#ff7f00"
                                    }}
                                >
                                    <i className="fa fa-commenting" aria-hidden="true" />
                                </a>
                                <button type="button" className="navbar-toggle">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                                <a className="navbar-brand" href="/us/">
                                    <img
                                        src="/us/images/logo.png"
                                        alt="https://www.lookbyfare.com/us"
                                    />
                                </a>
                            </div>
                            <div id="navbar" className="navbar-collapse main_navigation">
                                <a href="" className="mobileMenuClose">
                                    X
                                </a>
                                <div className="pull-right phone-number">
                                    <div className="call_27">Call 24/7 for our best deals</div>
                                    <a
                                        className="phoneNumber"
                                        id="nav_contactNo"
                                        href="tel:+1-248-274-7239"
                                        onclick="activityTracker($('#nav_contactNo').text(), $('#userSearchId') == undefined ? null : $('#userSearchId').val(), 'n');"
                                    >
                                        <img
                                            src="/us/images/uc/newcall.gif?1222"
                                            className="call-icon"
                                        />
                                        +1-248-274-7239
                                    </a>
                                </div>
                            </div>
                            <ul className="profile_menu">
                                <li>
                                    <div className="topmenuBox">
                                        <ul id="divlogin" style={{ display: "block" }}>
                                            <li className="dropdown loginDropdown">
                                                <a
                                                    href="javascript:void(0);"
                                                    onclick="showModalprofile('signIn')"
                                                    className="login"
                                                >
                                                    &nbsp;<span className="hidden-xs">Sign in</span>
                                                </a>
                                            </li>
                                        </ul>
                                        <ul id="divwelcome" style={{ display: "none" }}>
                                            <li className="dropdown loginDropdown">
                                                <a href="javascript:void(0);" className="login">
                                                    <span
                                                        id="displayusername_mob"
                                                        className="visible-xs short_name"
                                                    >
                                                        S
                                                    </span>
                                                    <span className="displayusername hidden-xs" />
                                                    &nbsp;
                                                    <span className="fa fa-angle-down support-icon hidden-xs" />
                                                </a>
                                                <ul className="loginMenu">
                                                    <li className="visible-xs mobileusername">
                                                        <div className="welcomename-mobile">
                                                            <span className="displayusername" />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <a onclick="logout();" className="signout">
                                                            Sign Out
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="submenuLsit">
                        <div className="holder">
                            <div className="block">
                                <h4>Special Deals</h4>
                                <ul>
                                    <li>
                                        <a href="/us/deals/deals-under-99">Deals Under $99</a>
                                    </li>
                                    <li>
                                        <a href="/us/deals/deals-under-199">Deals Under $199</a>
                                    </li>
                                    <li>
                                        <a href="/us/deals/cheap-domestic-flights">
                                            Cheap Domestic Flights
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/deals/international-flights-deals">
                                            International Flight Deals
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/deals/military-flight-deals">
                                            Military Flight Deals
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/deals/senior-travel-deals">Senior Travel Deals</a>
                                    </li>
                                    <li>
                                        <a href="/us/deals/cheap-flights-for-students">
                                            Cheap Flights For Students
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/deals/business-class-flight-deals">
                                            Business Class Flight Deals
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/deals/first-class-deals">First Class Deals</a>
                                    </li>
                                    <li>
                                        <a href="/us/deals/solo-travel-deals">Solo Travel Deals</a>
                                    </li>
                                    <li>
                                        <a href="/us/deals/group-travel-deals">Group Travel Deals</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="block bg_gray">
                                <h4>Domestic Flights</h4>
                                <ul>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-atlanta-atl-usa">
                                            Flights to Atlanta
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-charlotte-clt-usa">
                                            Flights to Charlotte
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-chicago-chi-usa">
                                            Flights to Chicago
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-dallas-dfw-usa">
                                            Flights to Dallas
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-detroit-dtt-usa">
                                            Flights to Detroit
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-houston-hou-usa">
                                            Flights to Houston
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-miami-mia-usa">
                                            Flights to Miami
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-newyork-nyc-usa">
                                            Flights to New York
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-san-francisco-sfo-usa">
                                            Flights to San Francisco
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-seattle-sea-usa">
                                            Flights to Seattle
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-washington-was-usa">
                                            Flights to Washington
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="block">
                                <h4>International Flights</h4>
                                <ul>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-london-lon-united-kingdom">
                                            Flights to London
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-madrid-mad-spain">
                                            Flights to Madrid
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-manila-mnl-philippines">
                                            Flights to Manila
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-sydney-syd-australia">
                                            Flights to Sydney
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-tel-aviv-tlv-israel">
                                            Flights to Tel Aviv
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-dublin-dub-ireland">
                                            Flights to Dublin
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-amsterdam-ams-netherlands">
                                            Flights to Amsterdam
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-frankfurt-fra-germany">
                                            Flights to Frankfurt
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/flights/cheap-flights-to-rome-rom-italy">
                                            Flights to Rome
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="block bg_gray">
                                <h4>US Airlines</h4>
                                <ul>
                                    <li>
                                        <a href="/us/airlines/jetblue-flights-b6">JetBlue Airlines</a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/united-airlines-ua">United Airlines</a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/american-airlines-aa">
                                            American Airlines
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/spirit-airlines-nk">Spirit Airlines</a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/frontier-airlines-f9">
                                            Frontier Airlines
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/alaska-airlines-as">Alaska Airlines</a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/hawaiian-airlines-ha">
                                            Hawaiian Airlines
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/sun-country-airlines-sy">
                                            Sun Country Airlines
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/allegiant-air-flights-g4">
                                            Allegiant Airlines
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="block">
                                <h4>Foreign Airlines</h4>
                                <ul>
                                    <li>
                                        <a href="/us/airlines/aeromexico-flights-am">
                                            Aeromexico Airlines
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/volaris-airlines-y4">Volaris Airlines</a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/caribbean-airlines-bw">
                                            Caribbean Airlines
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/westjet-ws">Westjet Airlines</a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/air-india-ai">Air India</a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/emirates-flights-ek">Emirates Airlines</a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/etihad-airways-ey">Etihad Airways</a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/lufthansa-lh">Lufthansa</a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/turkish-airlines-tk">Turkish Airlines</a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/all-nippon-airways-nh">
                                            All Nippon Airways
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/cathay-pacific-flights-cx">
                                            Cathay Pacific Airways
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/philippine-airlines-pr">
                                            Philippine Airlines
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/us/airlines/british-airways-ba">British Airways</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header> */}
                <div className="mobile-overlay" style={{ display: "none" }} />
            </header>
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
                                                        Oakland &nbsp;
                                                        <b>
                                                            {" "}
                                                            <i className="fa fa-exchange" />{" "}
                                                        </b>
                                                        &nbsp; Las Vegas
                                                        <br />
                                                        Sat 19Oct <b>-</b> Tue 22Oct , 1 Traveler, Economy
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
                                    < FlightSearchWrapper />
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
                                                    <span id="totalResults">994</span> Results Found{" "}
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
                                                            <span className="filter-price">$93.97</span>
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
                                                            <span className="filter-price">$171.47</span>
                                                            <input
                                                                type="checkbox"
                                                                name="stops"
                                                                onclick="Filter.applyFilter(false)"
                                                                defaultValue={1}
                                                            />{" "}
                                                            <span>1 Stop</span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet stopset">
                                                        <label className="mode">
                                                            <span className="filter-price">$236.97</span>
                                                            <input
                                                                type="checkbox"
                                                                name="stops"
                                                                onclick="Filter.applyFilter(false)"
                                                                defaultValue={2}
                                                            />{" "}
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
                                                        onclick="Filter.restpricefilter('price')"
                                                    >
                                                        Reset
                                                    </a>
                                                    Price Range
                                                </div>
                                                <div className="filter-data">
                                                    <p className="time-filter-data">
                                                        <span className="slider-range2 pull-right">$ 831</span>
                                                        <span className="slider-range">$ 93</span>
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
                                                    From Oakland
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
                                                        From Las Vegas
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
                                                            <span className="filter-price">$93.97</span>
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
                                                            <span className="filter-price">$136.98</span>
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
                                                            <span className="filter-price">$278.97</span>
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
                                                            <span className="filter-price">$381.25</span>
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
                                                            <span className="filter-price">$278.97</span>
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
                                                            <span className="filter-price">$400.79</span>
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
                                                            <span className="filter-price">$408.19</span>
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
                                                            <span className="filter-price">$427.94</span>
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
                                                            <span className="filter-price">$763.39</span>
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
                                                            <span className="filter-price">$453.19</span>
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
                                                            <span className="filter-price">$465.96</span>
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
                                                    <i
                                                        className="fa fa-plane"
                                                        style={{ transform: "rotate(45deg)" }}
                                                    />
                                                    <span> Departure airports</span>
                                                </div>
                                                <div className="filter-data">
                                                    <div className="inputSet ">
                                                        <label className="mode">
                                                            <input
                                                                type="checkbox"
                                                                name="departureairports"
                                                                onclick="Filter.applyFilter(false)"
                                                                defaultValue="SJC"
                                                            />{" "}
                                                            <span>SJC (San Jose Municipal) </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet ">
                                                        <label className="mode">
                                                            <input
                                                                type="checkbox"
                                                                name="departureairports"
                                                                onclick="Filter.applyFilter(false)"
                                                                defaultValue="OAK"
                                                            />{" "}
                                                            <span>OAK (Oakland International) </span>
                                                        </label>
                                                    </div>
                                                    <div className="inputSet ">
                                                        <label className="mode">
                                                            <input
                                                                type="checkbox"
                                                                name="departureairports"
                                                                onclick="Filter.applyFilter(false)"
                                                                defaultValue="SFO"
                                                            />{" "}
                                                            <span>SFO (San Francisco International) </span>
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
                                    <FlightOfferCard />
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
                                            className={activeTab === 'all' ? 'active' : ''}
                                            onClick={() => handleTabClick('all')}
                                        >
                                            <b>All Results</b>
                                            <br />
                                            <span id="spn_all_amount">$93.97</span>
                                        </li>
                                        <li
                                            id="nearby"
                                            className={activeTab === 'nearby' ? 'active' : ''}
                                            onClick={() => handleTabClick('nearby')}
                                        >
                                            <b>Nearby Airport(s)</b>
                                            <br />
                                            <span id="spn_nearby_amount">$93.97</span>
                                        </li>
                                        <li
                                            id="shortest"
                                            className={activeTab === 'shortest' ? 'active' : ''}
                                            onClick={() => handleTabClick('shortest')}
                                        >
                                            <b>Shortest Flights</b>
                                            <br />
                                            <span id="spn_shortest_amount">$278.97</span>
                                        </li>
                                        <li
                                            id="flexible"
                                            className={activeTab === 'flexible' ? 'active' : ''}
                                            onClick={() => handleTabClick('flexible')}
                                        >
                                            <b>Alternate Dates</b>
                                            <br />
                                            <span id="spn_flexible_amount">$180.98</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Content Area */}
                                <div className="result-block sss901">
                                    <div className="row">
                                        <div className="col-md-12 col-xs-12 h-36">
                                            <div className="flexi-content hidden-xs">
                                                <span>{activeTab === 'all' ? 'All Results' : activeTab === 'nearby' ? 'Nearby Airports' : activeTab === 'shortest' ? 'Shortest Flights' : 'Alternate Dates'}</span>
                                            </div>
                                        </div>
                                    </div>


                                    {activeTab === 'all' && FlightList.map((flight) => <FlightCard flight={flight} />)}
                                    {/* {activeTab === 'nearby' && FlightDataArr.nearby.map((flight) => <NearestFlightCard key={flight.id} flight={flight} />)}
                                    {activeTab === 'shortest' && FlightDataArr.shortest.map((flight) => <ShortedFlightCard key={flight.id} flight={flight} />)}
                                    {activeTab === 'flexible' && FlightDataArr.flexible.map((flight) => <AlternateFlightCard key={flight.id} flight={flight} />)} */}
                                </div>
                                <div id="containerListing">
                                    <input
                                        type="hidden"
                                        name="hdn_DOB_ValidatingDate"
                                        id="hdn_DOB_ValidatingDate"
                                        defaultValue="Tue, Oct 22, 2024"
                                    />
                                    <div className="flexi-content visible-xs">
                                        <span className="mobile_alternate hidden-sm hidden-lg hidden-md">
                                            Nearby Airports{" "}
                                        </span>
                                    </div>
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
            <iframe
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
            />
            <footer className="footer_block">
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
                                write to us at{" "}
                                <a href="mailto:support@lookbyfare.com">support@lookbyfare.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
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



