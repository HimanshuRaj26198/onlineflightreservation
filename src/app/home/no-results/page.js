'use client'

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FlightSearch from "@/app/_components/FlightSearch/page";

const NoResults = () => {

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    const searchParam = useSearchParams();


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

    const [isFlightSearchVisible, setFlightSearchVisible] = useState(false);

    // Handler to open FlightSearch component
    const openFlightSearch = () => {
        setFlightSearchVisible(true);
    }
    const closeFlightSearch = () => {
        setFlightSearchVisible(false);
    };


    return <div classNameName="body-content" bis_skin_checked={1}>
        <div
            id="_flight-details"
            classNameName="flight-details collapse"
            style={{ height: "100%!important" }}
            bis_skin_checked={1}
        ></div>
        <div
            id="overlay_detail"
            classNameName="midum-overlay"
            style={{ display: "none" }}
            bis_skin_checked={1}
        />
        <div classNameName="modify-engine-wrapper" bis_skin_checked={1}>
            <a href="javascript:void(0);" classNameName="close-sidebar fa fa-close" />
            <div classNameName="holder" bis_skin_checked={1}>
                <div classNameName="modify-engine" bis_skin_checked={1}>
                    <div classNameName="container">
                        <div classNameName="search_detail edit-listing-searchdetails hand">
                            {!isSearchVisible ? (
                                <div classNameName="row" onClick={handleEditSearchClick} style={{ cursor: 'pointer' }}>
                                    <div classNameName="">
                                        <div classNameName="search_detail edit-listing-searchdetails hand">
                                            <div classNameName="col-sm-8">
                                                {searchParam.get("tripType") === 'Round-Trip' ? (
                                                    <>
                                                        {searchParam.get("origin")} &nbsp;
                                                        <b>
                                                            <i classNameName="fa fa-exchange" />
                                                        </b>
                                                        &nbsp; {searchParam.get("destination")}
                                                        <br />
                                                        {searchParam.get("depDate")}, {searchParam.get("returnD")}, 1 Travelers {searchParam.get("cabin")}
                                                    </>
                                                ) : (
                                                    <>
                                                        {searchParam.get("origin")} &nbsp;
                                                        <b>
                                                            <i classNameName="fa fa-arrow-right" />
                                                        </b>
                                                        &nbsp; {searchParam.get("destination")}
                                                        <br />
                                                        {searchParam.get("depDate")}, 1 Travelers {searchParam.get("cabin")}
                                                    </>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                classNameName="modify_search pull-right edit-listing-search"
                                                onClick={handleEditSearchClick}
                                            >
                                                Edit Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <a classNameName="close-listing-search visible-lg visible-md" onClick={handleEditSearchClick}>
                                        Close {/* */} [x]
                                    </a>
                                    <div ref={searchRef}
                                    >
                                        <FlightSearch />
                                    </div>
                                </>
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div classNameName="mobile-header-fixed" bis_skin_checked={1}>
            <div classNameName="mobile-itenery modifySearchMobile" bis_skin_checked={1}>
                <div classNameName="result-itenery" bis_skin_checked={1}>
                    <div classNameName="row">
                        <div classNameName="col-xs-12">
                            <a href="javascript:void(0);" onClick={openFlightSearch}>
                                <div classNameName="modify-src-btn">
                                    <img
                                        src="https://www.lookbyfare.com/us/images/svg/edit-icon.svg"
                                        alt="Edit Icon"
                                    />
                                </div>
                            </a>
                            {isFlightSearchVisible && (
                                <div classNameName="modify-engine-wrapper open">
                                    <a
                                        href="javascript:void(0);"
                                        classNameName="close-sidebar fa fa-close"
                                        onClick={() => setFlightSearchVisible(false)}
                                    />

                                    <div classNameName="holder">
                                        <div classNameName="modify-engine">
                                            <div classNameName="container">
                                                <div classNameName="search_detail edit-listing-searchdetails hand">
                                                    {!isSearchVisible ? (
                                                        <FlightSearch />
                                                    ) : (
                                                        <a
                                                            classNameName="close-listing-search visible-lg visible-md"
                                                            onClick={() => setIsSearchVisible(false)}
                                                        >
                                                            Close {/* [x] */}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div classNameName="city-itenery">
                                <div classNameName="column">
                                    <p classNameName="airportCode">{searchParam.get("origin")}</p>
                                </div>
                                <div classNameName="column">
                                    <div classNameName="airporticon">
                                        <b>
                                            <i classNameName="fa fa-long-arrow-right" aria-hidden="true" />
                                        </b>
                                    </div>
                                </div>
                                <div classNameName="column">
                                    <p classNameName="airportCode">{searchParam.get("destination")}</p>
                                </div>
                                <div classNameName="clearfix" />

                                <div classNameName="itenery-date">

                                    {searchParam.get("tripType") === 'Round-Trip' ? (
                                        <>
                                            {searchParam.get("depDate")}, {searchParam.get("returnD")},
                                            <span>1 Traveler</span>,
                                            {searchParam.get("cabin")}
                                        </>
                                    ) : (
                                        <>
                                            {searchParam.get("depDate")},
                                            <span>1 Traveler</span>,
                                            {searchParam.get("cabin")}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <loading>
            <div
                classNameName="loader"
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
            <div classNameName="midum-overlay" id="fadebackground" bis_skin_checked={1} />
        </div>
        <div classNameName="listing-wrapper" bis_skin_checked={1}>
            <div classNameName="container" bis_skin_checked={1}>
                <input type="hidden" id="tabvalue" name="tabvalue" defaultValue="all" />
                <div classNameName="row" bis_skin_checked={1}>
                    <div classNameName="col-sm-12 col-md-12 col-xs-12" bis_skin_checked={1}>
                        <div classNameName="row" bis_skin_checked={1}>
                            <div classNameName="col-md-12" bis_skin_checked={1}>
                                <div classNameName="no-result" bis_skin_checked={1}>
                                    <img src="/us/images/session-expire-icon.png" alt="" />
                                    <div classNameName="oops" bis_skin_checked={1} />
                                    <div classNameName="head" bis_skin_checked={1}>
                                        No result found
                                    </div>
                                    <p classNameName="text">
                                        We’ve searched more than 400 airlines that we sell,
                                        <br /> and couldn't find any flights from <strong>
                                            {searchParam.get("origin")}
                                        </strong>{" "}
                                        to <strong>{searchParam.get("destination")}</strong>
                                    </p>
                                    <div classNameName="bottom" bis_skin_checked={1}>
                                        <p>Call us at (24x7)</p>
                                        <a
                                            classNameName="call_number"
                                            id="noresult_contact"
                                            href="tel:+1-844-774-6584"
                                        >
                                            +1-844-774-6584
                                        </a>
                                        <br />
                                        <a href="/" classNameName="home_button">
                                            <i classNameName="fa fa-angle-left" aria-hidden="true" /> Go
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
            classNameName="trigger-wrapper"
            style={{ display: "none" }}
            bis_skin_checked={1}
        >
            <div classNameName="trigger-searching" bis_skin_checked={1}>
                <span classNameName="close-btn" id="tiggerclose">
                    <img src="/us/images/trigger-mobile/close-icon.svg" />
                </span>
                <img
                    src="/us/images/trigger-mobile/user-icon.svg"
                    classNameName="user-icon"
                />
                <div classNameName="head" bis_skin_checked={1}>
                    Book before fare goes up!
                </div>
                <p classNameName="con-txt">
                    <b>3588</b> people are currently searching for flights to <br />
                    Los Angeles
                </p>
            </div>
            <div classNameName="mobile-laover" bis_skin_checked={1} />
        </div>
        <style
            dangerouslySetInnerHTML={{
                __html:
                    "\n    .navbar-nav {\n        display: none;\n    }\n\n    .footer-component {\n        display: none;\n    }\n\n    .copyright-block {\n        border-top: 1px solid #ccc;\n        padding-top: 30px;\n    }\n\n    .airline-matrix-wrapper .slick-slider .slick-prev, .airline-matrix-wrapper .slick-slider .slick-next {\n        top: -15px;\n        background: #1b75bc;\n        border-radius: 100%;\n        border: 0;\n        width: 26px;\n        height: 26px;\n        right: -15px !important;\n    }\n\n    .airline-matrix-wrapper .slick-slider .slick-prev {\n        left: inherit;\n        right: 15px !important;\n    }\n@media (max-width: 479px) {\n        .navbar-toggle {\n            display: none;\n        }\n    }\n\t\n"
            }}
        />
        <div
            classNameName="list-count"
            id="session-expire-warning-modal"
            style={{ display: "none" }}
            bis_skin_checked={1}
        >
            <div classNameName="list-count-banner" bis_skin_checked={1}>
                <div classNameName="top-head" bis_skin_checked={1}>
                    <div classNameName="timer-icon" align="center" bis_skin_checked={1}>
                        <i classNameName="fa fa-clock-o" style={{ fontSize: 42 }} />
                    </div>
                </div>
                <br />
                <div classNameName="btm-txt txt2" bis_skin_checked={1}>
                    <p>
                        Flight Prices may change frequently owing to demand and availability.
                        Start a <b>New Search</b> / <b>Refresh Result</b> to view the latest
                        deals
                    </p>
                </div>
                <br />
                <div classNameName="call-btn" bis_skin_checked={1}>
                    <a
                        href="javascript:searchAgain('flight');"
                        id="refResult"
                        classNameName="w200"
                    >
                        Refresh Result
                    </a>
                    <a href="/us" id="sess_startagain" classNameName="w200">
                        Start Again
                    </a>
                </div>
            </div>
            <div classNameName="midum-overlay" id="fadebackground" bis_skin_checked={1} />
        </div>
    </div>
}


export default NoResults;