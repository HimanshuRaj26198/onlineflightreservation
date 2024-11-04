'use client';

const ShortedFlightCard = ({flights}) => {
    return (
        <div
            id="lbyfclickflightdetail"
            className="row clickflightdetail containerselect"
            onclick="Filter.getflightdetails('sss901','SJC-LAS-F9-4104-20241019-ECON.LAS-SJC-F9-4103-20241022-ECON.','')"
        >
            <div className="col-sm-10 col-xs-12" id="fltlst">
                <div className="depart-flight">
                    <a className="xs-dis-blck" href="javascript:void(0);">
                        <div className="row">
                            <div className="col-sm-3 col-xs-12 no-padding-left">
                                <span className="price-section visible-xs">
                                    <price>
                                        $93.97
                                        <div className="per-adult">
                                            {" "}
                                            (Total price)
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
                                <div className="flex-date ">
                                    Sat, Oct 19, 2024
                                </div>
                                <div className="leg-details">
                                    <div className="city text-right">
                                        <div className="time">
                                            <strong>09:59</strong>pm
                                        </div>
                                        <div className="code">
                                            <span className="highlight tooltip-custom minor-txt">
                                                SJC
                                                <div className="promo-detail">
                                                    <span className="arrow" />
                                                    <p
                                                        className="mb5px"
                                                        style={{ textAlign: "left" }}
                                                    >
                                                        San Jose Municipal
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
                                                1h 30m
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
                                                    <strong>Flight Duration: </strong>1h 30m
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="leg-details">
                                    <div className="city">
                                        <div className="time">
                                            <strong>11:29</strong>pm
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
                                    1<span>h</span>:30<span>m</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="leg-devider" />
                <input type="hidden" totalpage={99} />
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
                                <div className="flex-date ">
                                    Tue, Oct 22, 2024
                                </div>
                                <div className="leg-details">
                                    <div className="city text-right">
                                        <div className="time">
                                            <strong>03:28</strong>pm
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
                                                1h 27m
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
                                                    <strong>Flight Duration: </strong>1h 27m
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="leg-details">
                                    <div className="city">
                                        <div className="time">
                                            <strong>04:55</strong>pm
                                            <sup />
                                        </div>
                                        <div className="code">
                                            <span className="highlight  tooltip-custom minor-txt">
                                                SJC
                                                <div className="promo-detail">
                                                    <span className="arrow" />
                                                    <p
                                                        className="mb5px"
                                                        style={{ textAlign: "left" }}
                                                    >
                                                        San Jose Municipal
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
                                    1<span>h</span>:27<span>m</span>
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
                            id="farebreakup_sss901"
                            style={{ display: "none" }}
                        >
                            <div className="fare-section">
                                <div className="line2">
                                    <a
                                        href="#adult"
                                        data-toggle="collapse"
                                        className="main blue"
                                    >
                                        <span>$93.97</span>
                                        <b>
                                            1 Adult(s){" "}
                                            <i className="fa fa-angle-down" />
                                        </b>
                                    </a>
                                </div>
                                <div
                                    id="adult"
                                    className="line taxes-fees collapse in"
                                    aria-expanded="true"
                                >
                                    <p>
                                        <span>$58.83</span>
                                        <b>Per adult Base fare</b>
                                    </p>
                                    <p>
                                        <span>$35.14</span>
                                        <b>Per adult Taxes &amp; Fee</b>
                                    </p>
                                </div>
                            </div>
                            <div className="total-price">
                                <span>
                                    <b>$93.97</b>
                                </span>
                                <b>Total</b>
                            </div>
                        </div>
                        <div>
                            $93.97 <br />
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
                                <div className="light">
                                    Must Fit Under the Seat
                                </div>
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
    )
}

export default ShortedFlightCard;