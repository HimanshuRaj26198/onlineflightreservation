'use client';

const confirmationPage = () => {
    return (
        <div style={{ background: "#fff", margin: 0, padding: 0 }}>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n\n        .reviews-bg {\n            background: url(https://cmsrepository.com/static/flights/common/confirmation/review-bg-lg.jpg) no-repeat;\n            border-radius: 10px;\n        }\n\n        .reviews-table {\n            background: #fff;\n            padding: 20px 10px;\n            border-radius: 5px;\n            box-shadow: 0 0 3px #ccc;\n            margin-top: 10px;\n            border-collapse: separate;\n        }\n\n        @media print {\n            .no-print, .no-print * {\n                display: none !important;\n            }\n\n            .noprint {\n                display: none !important;\n            }\n        }\n\n        @page {\n            size: auto;\n            margin: 0mm;\n        }\n\n        .confirmation-body {\n            width: 960px;\n            padding: 15px 0;\n            margin: auto;\n        }\n\n        .container-fluid, .container {\n            width: 960px;\n        }\n\n        .navbar-toggle {\n            display: none !important;\n        }\n\n        .footer-component {\n            width: 100%;\n        }\n\n        .w600 {\n            width: 960px;\n        }\n\n        .w560 {\n            width: 920px;\n        }\n\n   \n\n        .tabel-format td, .tabel-format th {\n            padding: 5px !important;\n        }\n\n        .tabel-format2 td, .tabel-format2 th {\n            padding: 10px !important;\n        }\n\n        .body-content {\n            width: 100%;\n        }\n\n        .fs15 {\n            font-size: 15px;\n        }\n\n        .manage-booking {\n            font-size: 16px;\n            background: #0000003b;\n            padding: 5px 15px 5px 6px;\n            border-radius: 30px;\n            display: inline-block;\n            font-weight: 500;\n            color: #fff;\n            text-decoration: none;\n        }\n\n            .manage-booking:hover, .manage-booking:focus {\n                text-decoration: none;\n                color: #fff;\n            }\n\n        .w20 {\n            width: 20px;\n        }\n\n        .h20 {\n            height: 20px;\n        }\n\n        .w10 {\n            width: 10px;\n        }\n\n        .ref-number {\n            font-size: 16px;\n            width: 350px;\n            background: #fff;\n            color: #1F1F1F;\n            padding: 5px 15px 5px 25px;\n            border-radius: 0 30px 30px 0;\n            font-weight: 500;\n            text-align: left;\n        }\n\n            .ref-number b {\n                color: #4863db;\n                font-size: 23px;\n            }\n\n        .status {\n            font-size: 16px;\n            background: #fff;\n            color: #333;\n            padding: 8px 14px;\n            border-radius: 30px;\n            display: inline-block;\n            font-weight: 500;\n            text-align: center;\n        }\n\n            .status .circle {\n                width: 10px;\n                height: 10px;\n                background: #1DCD70;\n                display: inline-block;\n                border-radius: 100%;\n            }\n\n        .welcome-txt {\n            font-size: 24px;\n            font-weight: bold;\n        }\n\n        .w160 {\n            width: 160px;\n        }\n\n        .stops {\n            text-align: center;\n            font-size: 12px;\n            color: #666;\n        }\n\n        .tcp-call {\n            cursor: pointer;\n            text-decoration: none;\n        }\n\n        .flight-duration {\n            text-align: right;\n        }\n\n        .checkin-price {\n            line-height: 1.5em;\n            text-align: right;\n            color: #8D8D8D;\n        }\n\n        .recommended-strip {\n            background: #3AB54A;\n            padding: 10px;\n            border-radius: 0 5px 0 0;\n            color: #fff;\n            font-size: 14px;\n            font-weight: 600;\n            text-align: center;\n        }\n\n        .status-iconalign {\n            width: 5%;\n            text-align: center;\n        }\n\n        .status-block {\n            position: relative;\n        }\n\n        .status-line-center {\n            position: absolute;\n            top: 70px;\n            text-align: center;\n            width: 160px;\n            left: 50%;\n            transform: translate(-50%, 0);\n            color: #fff;\n        }\n\n        .status-line-right {\n            left: 15px;\n        }\n\n        .site-ccnumber {\n            background: url(https://cmsrepository.com/static/flights/common/confirmation/travelopick/support.png) no-repeat center right;\n            padding: 10px 60px 10px 10px;\n            text-align: right;\n            line-height: 1em;\n        }\n\n            .site-ccnumber a {\n                font-size: 26px;\n                font-weight: bold;\n                color: #1DCD70;\n                text-decoration: none;\n            }\n\n                .site-ccnumber a p {\n                    font-size: 12px;\n                    color: #555;\n                }\n\n        .logo-img img {\n            margin-top: 15px;\n        }\n\n        hr {\n            margin: 2px 0;\n        }\n        .tcp-call {\n            display: block;\n        }\n\n        .thumb-himages {\n            width: 100%;\n            height: 150px;\n            border: 1px solid #fff;\n            border-top-left-radius: 10px;\n            border-top-right-radius: 10px;\n        }\n\n        .cardeal-img {\n            width: 179px;\n        }\n\n        .cardeal-name {\n            color: #1B1B1B;\n            font-size: 20px;\n            font-weight: 800;\n            letter-spacing: 0;\n        }\n\n        .hoteldeal-box {\n            width: 49%;\n            border: 0;\n            border-radius: 10px;\n            background: #fff;\n            box-shadow: 0px 0px 6px #00000029;\n            vertical-align: top;\n        }\n\n        .hoteldeal-container {\n            background: #ffffff url(https://cmsrepository.com/static/flights/common/confirmation/congrats-bg-lg.jpg) no-repeat;\n            text-align: left;\n            border-radius: 5px;\n            padding: 10px;\n            box-shadow: 0px 0px 6px #00000029;\n        }\n\n        .cardeal-container {\n            background: #ffffff url(https://cmsrepository.com/static/flights/common/confirmation/car-deal-lg.jpg) no-repeat;\n            text-align: left;\n            border-radius: 5px;\n            padding: 10px;\n            box-shadow: 0px 0px 6px #00000029;\n        }\n\n        .hoteldeal-names {\n            color: #000;\n            font-size: 18px;\n            font-weight: 600;\n            padding-left: 10px;\n        }\n\n        .dealview-btn {\n            background: #4d62d6;\n            color: #ffffff;\n            border-radius: 5px;\n            padding: 10px 0;\n            text-decoration: none;\n            font-size: 16px;\n            display: block;\n            width: 100px;\n            float: right;\n            text-align: center;\n        }\n\n            .dealview-btn:hover, .dealview-btn:focus {\n                color: #fff;\n                text-decoration: none;\n            }\n\n        .cardealview-btn {\n            background: #4d62d6;\n            color: #ffffff;\n            border-radius: 5px;\n            padding: 10px 0;\n            text-decoration: none;\n            font-size: 17px;\n            width: 50%;\n            display: block;\n            margin: auto;\n        }\n\n            .cardealview-btn:hover, .cardealview-btn:focus {\n                color: #fff;\n                text-decoration: none;\n            }\n\n        .starrating-deal {\n            padding-left: 8px;\n            width: 50%;\n        }\n\n        .cardeal-box {\n            padding: 10px 0;\n        }\n\n        .dealboox-pad {\n            padding: 10px 15px;\n        }\n\n        .cardealboox-pad {\n            padding: 10px 15px;\n        }\n\n        .cardeal-price {\n            color: #3AB54A;\n            font-size: 20px;\n            font-weight: 500;\n            line-height: 30px;\n            letter-spacing: 0;\n            text-align: center;\n        }\n\n        .tpp-banner {\n            background: url(https://cmsrepository.com/static/flights/common/confirmation/tpp-banner-lg.jpg?v568) no-repeat;\n            background-size: cover;\n            padding: 20px;\n            border-radius: 10px;\n        }\n\n        .pricelock-booking {\n            background: #fff; padding: 6px 10px; border-radius: 5px;color:#333;\n        }\n        .pricelock-status { \n            font-size: 14px;background:#6AA1FF;padding: 5px 15px 5px 6px;border-radius: 5px;display: inline-block;font-weight:500;color: #fff;text-decoration: none; \n        }\n\n\n        @media(max-width:767px) {\n            .tpp-banner {\n                background: url(https://cmsrepository.com/static/flights/common/confirmation/tpp-banner.jpg?v5898) no-repeat;\n                background-size: cover;\n                padding: 10px;\n            }\n\n            .pricelock-booking {\n                background: #fff;\n                padding: 6px 10px;\n                border-radius: 5px;\n                color: #333;\n                display: block;\n                font-size: 12px;\n                margin-right: 13px;\n                height: 58px;\n                text-align: center;\n            }\n            .pricelock-status {   \n                font-size: 14px;\n                background: #6AA1FF;\n                padding: 9px 15px 9px 6px;\n                border-radius: 5px;\n                display: inline-block;\n                font-weight: 500;\n                color: #fff;\n                text-decoration: none;\n                height: 58px;\n                text-align: center; \n            }\n\n\n            .exclusive-perks {\n                width: 75%;\n            }\n\n            .thumb-himages {\n                height: 100px;\n            }\n\n            .cardeal-img {\n                width: 100px;\n            }\n\n            .cardeal-name {\n                font-size: 14px;\n            }\n\n            .cardeal-box {\n                background: #fff;\n                padding: 10px;\n                border-radius: 10px;\n            }\n\n            .mobb-one {\n                display: none;\n            }\n\n            .congrats-img {\n                width: 50%;\n            }\n\n            .hoteldeal-names {\n                font-size: 15px;\n            }\n\n            .dealview-btn {\n                width: 60px;\n                float: none;\n            }\n\n            .starrating-deal {\n                width: 60%;\n            }\n\n                .starrating-deal img {\n                    width: 14px;\n                }\n\n            .cardealview-btn {\n                width: 88%;\n                font-size: 15px;\n            }\n\n            .hoteldeal-container {\n                background: #ffffff url(https://cmsrepository.com/static/flights/common/confirmation/congrats-bg.jpg) no-repeat;\n                padding: 0;\n            }\n\n            .cardeal-container {\n                background: #ffffff url(https://cmsrepository.com/static/flights/common/confirmation/car-deal.jpg) no-repeat;\n                padding: 0;\n            }\n\n            .dealboox-pad {\n                padding: 10px;\n            }\n\n            .cardealboox-pad {\n                padding: 0 10px;\n            }\n\n            .cardeal-price {\n                font-size: 16px;\n            }\n\n            .reviews-table {\n                padding: 15px 2px;\n                width: 95%;\n            }\n\n            .confirmation-body {\n                font-size: 12px;\n                padding: 0;\n                width: 100%;\n            }\n\n            .container-fluid, .container {\n                width: 100%;\n            }\n\n            .w600 {\n                width: 100%;\n            }\n\n            .footer-component {\n                width: 100%;\n            }\n\n            .fs15 {\n                font-size: 14px;\n            }\n\n            .w10 {\n                display: none;\n            }\n\n            .manage-booking {\n                font-size: 12px;\n                padding: 5px;\n                width: 152px;\n                text-align: center;\n            }\n\n            .w20 {\n                width: 10px;\n            }\n\n            .h20 {\n                height: 10px;\n            }\n\n            .ref-number {\n                font-size: 12px;\n                width: auto;\n                padding: 5px 10px;\n                text-align: left;\n            }\n\n                .ref-number b {\n                    color: #1dcd70;\n                    font-size: 16px;\n                }\n\n            .status {\n                font-size: 12px;\n            }\n\n            .welcome-txt {\n                font-size: 18px;\n            }\n\n            .w55px {\n                width: 55px;\n            }\n\n            .w160 {\n                width: 94px;\n            }\n\n            .w560 {\n                width: 100%;\n            }\n\n            .stops {\n                font-size: 9px;\n                width: 95px;\n            }\n\n            .tcp-call {\n                display: block;\n                font-size: 11px;\n            }\n\n            .flight-duration {\n                font-size: 11px;\n            }\n\n            .mobile-td100 {\n                display: block !important;\n                width: 100% !important;\n            }\n\n            .checkin-price {\n                text-align: center;\n            }\n\n            .recommended-strip {\n                padding: 10px 0px;\n                font-size: 12px;\n                width: 42%;\n            }\n\n            .status-line-left, .status-line-center, .status-line-right {\n                top: 40px;\n                width: 70px;\n            }\n\n            .img-rotate {\n                transform: rotate(90deg);\n            }\n\n            .site-ccnumber {\n                line-height: 0.8em;\n                margin: 5px 0;\n                padding: 10px 54px 10px 0px;\n            }\n\n                .site-ccnumber a {\n                    font-size: 16px;\n                }\n\n                    .site-ccnumber a p {\n                        font-size: 11px;\n                    }\n\n            .logo-img img {\n                width: 130px;\n            }\n\n            .customer-supportimg {\n                width: 85%;\n            }\n\n            .get-boarding-pass, .print-ticket {\n                display: none;\n            }\n        }\n    "
                }}
            />
            <div className="container confirmation-body">
                <table
                    align="center"
                    bgcolor="#fff"
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    className="w600"
                    style={{ border: "1px solid #eee", fontFamily: "Montserrat,Arial" }}
                >
                    <tbody>
                        <tr>
                            <td>
                                <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                                    <tbody>
                                        <tr>
                                            <td style={{ background: "#1b75bc", color: "#ffffff" }}>
                                                <table
                                                    width="100%"
                                                    cellPadding={0}
                                                    cellSpacing={0}
                                                    border={0}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td className="h20" />
                                                        </tr>
                                                        <tr>
                                                            <td className="h20">
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="w20" />
                                                                            <td>
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{ color: "#ffffff" }}
                                                                                    className="fs15"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <b style={{ fontWeight: 600 }}>
                                                                                                    Booking Date:
                                                                                                </b>{" "}
                                                                                                30 Nov, 2024 | 06:56:55 (EST)
                                                                                            </td>
                                                                                            <td />
                                                                                            <td align="right">
                                                                                                <a
                                                                                                    href="https://www.lookbyfare.com/us/profile/"
                                                                                                    target="_blank"
                                                                                                    className="manage-booking"
                                                                                                >
                                                                                                    <img
                                                                                                        src="https://cmsrepository.com/static/flights/common/eticket/manage-booking.png"
                                                                                                        style={{
                                                                                                            verticalAlign: "middle",
                                                                                                            marginRight: 2
                                                                                                        }}
                                                                                                    />
                                                                                                    Manage Booking
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td height={10} />
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="welcome-txt">
                                                                                                Hello, Shubham Kumar
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td height={10} />
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                            <td className="w20" />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="ref-number">
                                                                                    {" "}
                                                                                    Booking Reference No: <b>2227984</b>
                                                                                </div>
                                                                            </td>
                                                                            <td>&nbsp;</td>
                                                                            <td align="right">
                                                                                <div className="status">
                                                                                    {" "}
                                                                                    <span
                                                                                        className="circle"
                                                                                        style={{ background: "#FF1920" }}
                                                                                    />{" "}
                                                                                    Status:{" "}
                                                                                    <b style={{ color: "#FF1920" }}>Failed</b>
                                                                                </div>
                                                                            </td>
                                                                            <td className="w20" />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="h20" />
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="w20" />
                                                                            <td>
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{ marginBottom: 50 }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td width="5%" />
                                                                                            <td
                                                                                                width="5%"
                                                                                                className="status-block"
                                                                                            >
                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/payment-steps/check-icon.png" />
                                                                                                <span className="status-line-center">
                                                                                                    Booking Received
                                                                                                </span>
                                                                                            </td>
                                                                                            <td width={1}>
                                                                                                <img
                                                                                                    src="https://cmsrepository.com/static/flights/common/confirmation/payment-steps/lg/solid-line.png"
                                                                                                    width="100%"
                                                                                                />
                                                                                            </td>
                                                                                            <td className="status-iconalign status-block">
                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/payment-steps/processing-icon.png" />
                                                                                                <span className="status-line-center">
                                                                                                    Payment Verification
                                                                                                </span>
                                                                                            </td>
                                                                                            <td width={1}>
                                                                                                <img
                                                                                                    src="https://cmsrepository.com/static/flights/common/confirmation/payment-steps/lg/dotted-line.png"
                                                                                                    width="100%"
                                                                                                />
                                                                                            </td>
                                                                                            <td className="status-iconalign status-block">
                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/payment-steps/blank-circle.png" />
                                                                                                <span className="status-line-center">
                                                                                                    Payment Successful
                                                                                                </span>
                                                                                            </td>
                                                                                            <td width={1}>
                                                                                                <img
                                                                                                    src="https://cmsrepository.com/static/flights/common/confirmation/payment-steps/lg/dotted-line.png"
                                                                                                    width="100%"
                                                                                                />
                                                                                            </td>
                                                                                            <td className="status-iconalign status-block">
                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/payment-steps/blank-circle.png" />
                                                                                                <span className="status-line-center status-line-right">
                                                                                                    e-Ticket
                                                                                                </span>
                                                                                            </td>
                                                                                            <td width="5%" />
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                {/* <img src="https://cmsrepository.com/static/flights/common/confirmation/steps-payment-successful.png" />
                                        <img src="https://cmsrepository.com/static/flights/common/confirmation/steps-payment-fail.png" /> */}
                                                                            </td>
                                                                            <td className="w20" />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="h20" />
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="h20" />
                                        </tr>
                                        <tr>
                                            <td>
                                                <table
                                                    width="100%"
                                                    cellPadding={0}
                                                    cellSpacing={0}
                                                    border={0}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td className="w20" />
                                                            <td>
                                                                {/*Main Body Start*/}
                                                                {/*Confirmation number*/}
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    {/* <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    lineHeight: 20,
                                                                                    color: "#21356e",
                                                                                    padding: 10,
                                                                                    border: "1px solid #4863DB",
                                                                                    borderRadius: 3
                                                                                }}
                                                                            >
                                                                                <div
                                                                                    style={{
                                                                                        color: "#FF6E03",
                                                                                        fontWeight: "bold",
                                                                                        paddingBottom: 5
                                                                                    }}
                                                                                >
                                                                                    Thank you for choosing Lookbyfare
                                                                                </div>
                                                                                <b>Disclaimer:</b> We regret to inform you
                                                                                that your booking failed due to some issue
                                                                                from the airline(s). One of our associates
                                                                                will contact you shortly to assist you. You
                                                                                may also contact us at{" "}
                                                                                <a
                                                                                    href="tel:+1-248-274-7239"
                                                                                    style={{
                                                                                        cursor: "pointer",
                                                                                        color: "#21356E",
                                                                                        textDecoration: "none",
                                                                                        fontWeight: 700
                                                                                    }}
                                                                                >
                                                                                    +1-248-274-7239
                                                                                </a>{" "}
                                                                                at your convenience.
                                                                            </td>
                                                                        </tr>
                                                                    </tbody> */}
                                                                </table>
                                                                <br />
                                                                {/*Flight Itenerary Start*/}
                                                                <table
                                                                    className="w560"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#1b75bc",
                                                                                    padding: 10,
                                                                                    borderRadius: "5px 5px  0 0"
                                                                                }}
                                                                            >
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{ color: "#fff", fontSize: 14 }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style={{ fontWeight: 600 }}>
                                                                                                <img
                                                                                                    src="https://cmsrepository.com/static/flights/common/eticket/plane.png"
                                                                                                    style={{
                                                                                                        verticalAlign: "middle",
                                                                                                        marginRight: 5,
                                                                                                        fontWeight: 600
                                                                                                    }}
                                                                                                />{" "}
                                                                                                Departure Fri, 13 December, 2024
                                                                                            </td>
                                                                                            {/* <td className="flight-duration">
                                                                                                Duration: <b>8hr 50min</b>
                                                                                            </td> */}
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#E1ECFF",
                                                                                    padding: 5,
                                                                                    fontSize: 11,
                                                                                    fontWeight: 600,
                                                                                    color: "#3B3B3B"
                                                                                }}
                                                                            >
                                                                                <span style={{ color: "#1b75bc" }}>
                                                                                    Leg 1 of 2{" "}
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    padding: "10px 10px 20px 10px",
                                                                                    background: "#F5F5F5",
                                                                                    borderRadius: "0 0 5px 5px"
                                                                                }}
                                                                            >
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{
                                                                                        borderColor: "#ccc",
                                                                                        borderCollapse: "collapse",
                                                                                        fontSize: 12,
                                                                                        color: "#202020",
                                                                                        borderRadius: "0 0 5px 5px"
                                                                                    }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="w160">
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        lineHeight: "1.8em",
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/kl.png"
                                                                                                                    width={32}
                                                                                                                />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{ fontWeight: 600 }}
                                                                                                            >
                                                                                                                KLM
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td height={5} />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    fontWeight: 600,
                                                                                                                    fontSize: 14
                                                                                                                }}
                                                                                                            >
                                                                                                                Flight 628 |{" "}
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        fontWeight: 500
                                                                                                                    }}
                                                                                                                >
                                                                                                                    Aircraft 333
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td className="h20" />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <table
                                                                                                                    width="100%"
                                                                                                                    cellPadding={0}
                                                                                                                    cellSpacing={0}
                                                                                                                    border={0}
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        lineHeight: "1.8em",
                                                                                                                        color: "#202020"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    color: "#666666"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                Cabin
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr
                                                                                                                            style={{
                                                                                                                                fontWeight: 600
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <td>Economy</td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td width={5} />
                                                                                            <td
                                                                                                width={1}
                                                                                                style={{
                                                                                                    borderLeft: "1px dotted #ccc"
                                                                                                }}
                                                                                            />
                                                                                            <td width={10} />
                                                                                            <td>
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 18 }}>
                                                                                                                    {" "}
                                                                                                                    MIA
                                                                                                                </b>{" "}
                                                                                                                <br />
                                                                                                                <b style={{ fontSize: 12 }}>
                                                                                                                    Miami(FL)
                                                                                                                </b>
                                                                                                            </td>
                                                                                                            <td>&nbsp;</td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 18 }}>
                                                                                                                    {" "}
                                                                                                                    AMS
                                                                                                                </b>{" "}
                                                                                                                <br />
                                                                                                                <b style={{ fontSize: 12 }}>
                                                                                                                    Amsterdam
                                                                                                                </b>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3} height={10} />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color: "#666666"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {" "}
                                                                                                                    Miami International{" "}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td className="stops">
                                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/plane-stop.png" />{" "}
                                                                                                                <br />
                                                                                                                Non Stop
                                                                                                            </td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color: "#666666"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {" "}
                                                                                                                    Schiphol Airport{" "}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3} height={10} />
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 130,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    04:25 PM
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        color: "#666",
                                                                                                                        padding: "5px 0"
                                                                                                                    }}
                                                                                                                ></div>
                                                                                                            </td>
                                                                                                            <td>&nbsp;</td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 180,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    07:15 AM
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        color: "#666",
                                                                                                                        padding: "5px 0"
                                                                                                                    }}
                                                                                                                ></div>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3}>
                                                                                                                <br />
                                                                                                                <b>Baggage:</b> Personal
                                                                                                                Item, Carry-on, Checked Bag{" "}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {/*Layover table */}
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#ffe2cd",
                                                                                    textAlign: "center",
                                                                                    fontSize: 12,
                                                                                    fontWeight: 600,
                                                                                    padding: "7px 10px",
                                                                                    borderRadius: 5,
                                                                                    color: "#21356e"
                                                                                }}
                                                                            >
                                                                                Layover in Schiphol Airport (AMS) : 5hr 5min
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height={10} />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table
                                                                    className="w560"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#d1e0f9",
                                                                                    padding: "10px 0 5px 0"
                                                                                }}
                                                                            >
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="w20" />
                                                                                            <td
                                                                                                style={{
                                                                                                    fontSize: 14,
                                                                                                    fontWeight: 600,
                                                                                                    color: "#3b3b3b"
                                                                                                }}
                                                                                            >
                                                                                                Sat, 14 December, 2024
                                                                                            </td>
                                                                                            <td
                                                                                                style={{
                                                                                                    fontSize: 14,
                                                                                                    fontWeight: 500,
                                                                                                    color: "#3b3b3b",
                                                                                                    textAlign: "right"
                                                                                                }}
                                                                                            >
                                                                                                Duration: <b>8hr 20min</b>
                                                                                            </td>
                                                                                            <td className="w20" />
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#e1ecff",
                                                                                    padding: "5px 5px 10px 20px",
                                                                                    fontSize: 11,
                                                                                    fontWeight: 600,
                                                                                    color: "#3b3b3b"
                                                                                }}
                                                                            >
                                                                                <span style={{ color: "#1b75bc" }}>
                                                                                    Leg 2 of 2{" "}
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    padding: "10px 10px 20px 10px",
                                                                                    background: "#F5F5F5",
                                                                                    borderRadius: "0 0 5px 5px"
                                                                                }}
                                                                            >
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{
                                                                                        borderColor: "#ccc",
                                                                                        borderCollapse: "collapse",
                                                                                        fontSize: 12,
                                                                                        color: "#202020",
                                                                                        borderRadius: "0 0 5px 5px"
                                                                                    }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="w160">
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        lineHeight: "1.8em",
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/kl.png"
                                                                                                                    width={32}
                                                                                                                />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{ fontWeight: 600 }}
                                                                                                            >
                                                                                                                KLM
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td height={5} />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    fontWeight: 600,
                                                                                                                    fontSize: 14
                                                                                                                }}
                                                                                                            >
                                                                                                                Flight 871 |{" "}
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        fontWeight: 500
                                                                                                                    }}
                                                                                                                >
                                                                                                                    Aircraft 77W
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td className="h20" />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <table
                                                                                                                    width="100%"
                                                                                                                    cellPadding={0}
                                                                                                                    cellSpacing={0}
                                                                                                                    border={0}
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        lineHeight: "1.8em",
                                                                                                                        color: "#202020"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    color: "#666666"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                Cabin
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr
                                                                                                                            style={{
                                                                                                                                fontWeight: 600
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <td>Economy</td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td width={5} />
                                                                                            <td
                                                                                                width={1}
                                                                                                style={{
                                                                                                    borderLeft: "1px dotted #ccc"
                                                                                                }}
                                                                                            />
                                                                                            <td width={10} />
                                                                                            <td>
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 18 }}>
                                                                                                                    {" "}
                                                                                                                    AMS
                                                                                                                </b>{" "}
                                                                                                                <br />
                                                                                                                <b style={{ fontSize: 12 }}>
                                                                                                                    Amsterdam
                                                                                                                </b>
                                                                                                            </td>
                                                                                                            <td>&nbsp;</td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 18 }}>
                                                                                                                    {" "}
                                                                                                                    DEL
                                                                                                                </b>{" "}
                                                                                                                <br />
                                                                                                                <b style={{ fontSize: 12 }}>
                                                                                                                    Delhi
                                                                                                                </b>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3} height={10} />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color: "#666666"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {" "}
                                                                                                                    Schiphol Airport{" "}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td className="stops">
                                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/plane-stop.png" />{" "}
                                                                                                                <br />
                                                                                                                Non Stop
                                                                                                            </td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color: "#666666"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {" "}
                                                                                                                    Indira Gandhi
                                                                                                                    International New Delhi{" "}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3} height={10} />
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 130,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    12:20 PM
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        color: "#666",
                                                                                                                        padding: "5px 0"
                                                                                                                    }}
                                                                                                                ></div>
                                                                                                            </td>
                                                                                                            <td>&nbsp;</td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 180,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color: "#4f8ffc",
                                                                                                                        fontStyle: "italic",
                                                                                                                        marginRight: 5
                                                                                                                    }}
                                                                                                                >
                                                                                                                    Next Day
                                                                                                                </span>
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    01:10 AM
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        color: "#666",
                                                                                                                        padding: "5px 0"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <span>Terminal 3</span>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3}>
                                                                                                                <br />
                                                                                                                <b>Baggage:</b> Personal
                                                                                                                Item, Carry-on, Checked Bag{" "}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {/*Layover table */}
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height={10} />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table
                                                                    className="w560"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#1b75bc",
                                                                                    padding: 10,
                                                                                    borderRadius: "5px 5px  0 0"
                                                                                }}
                                                                            >
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{ color: "#fff", fontSize: 14 }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style={{ fontWeight: 600 }}>
                                                                                                <img
                                                                                                    src="https://cmsrepository.com/static/flights/common/eticket/return-plane.png"
                                                                                                    style={{
                                                                                                        verticalAlign: "middle",
                                                                                                        marginRight: 5,
                                                                                                        fontWeight: 600
                                                                                                    }}
                                                                                                />{" "}
                                                                                                Return Tue, 07 January, 2025
                                                                                            </td>
                                                                                            {/* <td className="flight-duration">
                                                                                                Duration: <b>9hr 35min</b>
                                                                                            </td> */}
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#E1ECFF",
                                                                                    padding: 5,
                                                                                    fontSize: 11,
                                                                                    fontWeight: 600,
                                                                                    color: "#3B3B3B"
                                                                                }}
                                                                            >
                                                                                <span style={{ color: "#1b75bc" }}>
                                                                                    Leg 1 of 3{" "}
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    padding: "10px 10px 20px 10px",
                                                                                    background: "#F5F5F5",
                                                                                    borderRadius: "0 0 5px 5px"
                                                                                }}
                                                                            >
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{
                                                                                        borderColor: "#ccc",
                                                                                        borderCollapse: "collapse",
                                                                                        fontSize: 12,
                                                                                        color: "#202020",
                                                                                        borderRadius: "0 0 5px 5px"
                                                                                    }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="w160">
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        lineHeight: "1.8em",
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/kl.png"
                                                                                                                    width={32}
                                                                                                                />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{ fontWeight: 600 }}
                                                                                                            >
                                                                                                                KLM
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td height={5} />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    fontWeight: 600,
                                                                                                                    fontSize: 14
                                                                                                                }}
                                                                                                            >
                                                                                                                Flight 872 |{" "}
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        fontWeight: 500
                                                                                                                    }}
                                                                                                                >
                                                                                                                    Aircraft 77W
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td className="h20" />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <table
                                                                                                                    width="100%"
                                                                                                                    cellPadding={0}
                                                                                                                    cellSpacing={0}
                                                                                                                    border={0}
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        lineHeight: "1.8em",
                                                                                                                        color: "#202020"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    color: "#666666"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                Cabin
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr
                                                                                                                            style={{
                                                                                                                                fontWeight: 600
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <td>Economy</td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td width={5} />
                                                                                            <td
                                                                                                width={1}
                                                                                                style={{
                                                                                                    borderLeft: "1px dotted #ccc"
                                                                                                }}
                                                                                            />
                                                                                            <td width={10} />
                                                                                            <td>
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 18 }}>
                                                                                                                    {" "}
                                                                                                                    DEL
                                                                                                                </b>{" "}
                                                                                                                <br />
                                                                                                                <b style={{ fontSize: 12 }}>
                                                                                                                    Delhi
                                                                                                                </b>
                                                                                                            </td>
                                                                                                            <td>&nbsp;</td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 18 }}>
                                                                                                                    {" "}
                                                                                                                    AMS{" "}
                                                                                                                </b>{" "}
                                                                                                                <br />
                                                                                                                <b style={{ fontSize: 12 }}>
                                                                                                                    Amsterdam
                                                                                                                </b>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3} height={10} />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color: "#666666"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {" "}
                                                                                                                    Indira Gandhi
                                                                                                                    International New Delhi{" "}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td className="stops">
                                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/plane-stop.png" />{" "}
                                                                                                                <br />
                                                                                                                Non Stop
                                                                                                            </td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color: "#666666"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {" "}
                                                                                                                    Schiphol Airport{" "}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3} height={10} />
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style={{ width: 130 }}>
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    03:20 AM
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        color: "#666",
                                                                                                                        padding: "5px 0"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <span>Terminal 3</span>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td>&nbsp;</td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 180
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    08:25 AM
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        color: "#666",
                                                                                                                        padding: "5px 0"
                                                                                                                    }}
                                                                                                                ></div>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3}>
                                                                                                                <br />
                                                                                                                <b>Baggage:</b> Personal
                                                                                                                Item, Carry-on, Checked Bag{" "}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {/*Layover table */}
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#ffe2cd",
                                                                                    textAlign: "center",
                                                                                    fontSize: 12,
                                                                                    fontWeight: 600,
                                                                                    padding: "7px 10px",
                                                                                    borderRadius: 5,
                                                                                    color: "#21356e"
                                                                                }}
                                                                            >
                                                                                Layover in Schiphol Airport (AMS) : 1hr
                                                                                55min
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height={10} />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table
                                                                    className="w560"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#d1e0f9",
                                                                                    padding: "10px 0 5px 0"
                                                                                }}
                                                                            >
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="w20" />
                                                                                            <td
                                                                                                style={{
                                                                                                    fontSize: 14,
                                                                                                    fontWeight: 600,
                                                                                                    color: "#3b3b3b"
                                                                                                }}
                                                                                            >
                                                                                                Tue, 07 January, 2025
                                                                                            </td>
                                                                                            <td
                                                                                                style={{
                                                                                                    fontSize: 14,
                                                                                                    fontWeight: 500,
                                                                                                    color: "#3b3b3b",
                                                                                                    textAlign: "right"
                                                                                                }}
                                                                                            >
                                                                                                Duration: <b>1hr 25min</b>
                                                                                            </td>
                                                                                            <td className="w20" />
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#e1ecff",
                                                                                    padding: "5px 5px 10px 20px",
                                                                                    fontSize: 11,
                                                                                    fontWeight: 600,
                                                                                    color: "#3b3b3b"
                                                                                }}
                                                                            >
                                                                                <span style={{ color: "#1b75bc" }}>
                                                                                    Leg 2 of 3{" "}
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    padding: "10px 10px 20px 10px",
                                                                                    background: "#F5F5F5",
                                                                                    borderRadius: "0 0 5px 5px"
                                                                                }}
                                                                            >
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{
                                                                                        borderColor: "#ccc",
                                                                                        borderCollapse: "collapse",
                                                                                        fontSize: 12,
                                                                                        color: "#202020",
                                                                                        borderRadius: "0 0 5px 5px"
                                                                                    }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="w160">
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        lineHeight: "1.8em",
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/kl.png"
                                                                                                                    width={32}
                                                                                                                />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{ fontWeight: 600 }}
                                                                                                            >
                                                                                                                KLM
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td height={5} />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    fontWeight: 600,
                                                                                                                    fontSize: 14
                                                                                                                }}
                                                                                                            >
                                                                                                                Flight 1005 |{" "}
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        fontWeight: 500
                                                                                                                    }}
                                                                                                                >
                                                                                                                    Aircraft 73H
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td className="h20" />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <table
                                                                                                                    width="100%"
                                                                                                                    cellPadding={0}
                                                                                                                    cellSpacing={0}
                                                                                                                    border={0}
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        lineHeight: "1.8em",
                                                                                                                        color: "#202020"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    color: "#666666"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                Cabin
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr
                                                                                                                            style={{
                                                                                                                                fontWeight: 600
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <td>Economy</td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td width={5} />
                                                                                            <td
                                                                                                width={1}
                                                                                                style={{
                                                                                                    borderLeft: "1px dotted #ccc"
                                                                                                }}
                                                                                            />
                                                                                            <td width={10} />
                                                                                            <td>
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 18 }}>
                                                                                                                    {" "}
                                                                                                                    AMS
                                                                                                                </b>{" "}
                                                                                                                <br />
                                                                                                                <b style={{ fontSize: 12 }}>
                                                                                                                    Amsterdam
                                                                                                                </b>
                                                                                                            </td>
                                                                                                            <td>&nbsp;</td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 18 }}>
                                                                                                                    {" "}
                                                                                                                    LHR{" "}
                                                                                                                </b>{" "}
                                                                                                                <br />
                                                                                                                <b style={{ fontSize: 12 }}>
                                                                                                                    London
                                                                                                                </b>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3} height={10} />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color: "#666666"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {" "}
                                                                                                                    Schiphol Airport{" "}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td className="stops">
                                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/plane-stop.png" />{" "}
                                                                                                                <br />
                                                                                                                Non Stop
                                                                                                            </td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color: "#666666"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {" "}
                                                                                                                    Heathrow{" "}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3} height={10} />
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style={{ width: 130 }}>
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    10:20 AM
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        color: "#666",
                                                                                                                        padding: "5px 0"
                                                                                                                    }}
                                                                                                                ></div>
                                                                                                            </td>
                                                                                                            <td>&nbsp;</td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 180
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    10:45 AM
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        color: "#666",
                                                                                                                        padding: "5px 0"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <span>Terminal 4</span>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3}>
                                                                                                                <br />
                                                                                                                <b>Baggage:</b> Personal
                                                                                                                Item, Carry-on, Checked Bag{" "}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {/*Layover table */}
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#ffe2cd",
                                                                                    textAlign: "center",
                                                                                    fontSize: 12,
                                                                                    fontWeight: 600,
                                                                                    padding: "7px 10px",
                                                                                    borderRadius: 5,
                                                                                    color: "#21356e"
                                                                                }}
                                                                            >
                                                                                Layover in Heathrow (LHR) : 3hr 15min
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height={10} />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table
                                                                    className="w560"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#d1e0f9",
                                                                                    padding: "10px 0 5px 0"
                                                                                }}
                                                                            >
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="w20" />
                                                                                            <td
                                                                                                style={{
                                                                                                    fontSize: 14,
                                                                                                    fontWeight: 600,
                                                                                                    color: "#3b3b3b"
                                                                                                }}
                                                                                            >
                                                                                                Tue, 07 January, 2025
                                                                                            </td>
                                                                                            <td
                                                                                                style={{
                                                                                                    fontSize: 14,
                                                                                                    fontWeight: 500,
                                                                                                    color: "#3b3b3b",
                                                                                                    textAlign: "right"
                                                                                                }}
                                                                                            >
                                                                                                Duration: <b>10hr 30min</b>
                                                                                            </td>
                                                                                            <td className="w20" />
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#e1ecff",
                                                                                    padding: "5px 5px 10px 20px",
                                                                                    fontSize: 11,
                                                                                    fontWeight: 600,
                                                                                    color: "#3b3b3b"
                                                                                }}
                                                                            >
                                                                                <span style={{ color: "#1b75bc" }}>
                                                                                    Leg 3 of 3{" "}
                                                                                </span>
                                                                                | Operated By Virgin Atlantic{" "}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    padding: "10px 10px 20px 10px",
                                                                                    background: "#F5F5F5",
                                                                                    borderRadius: "0 0 5px 5px"
                                                                                }}
                                                                            >
                                                                                <table
                                                                                    width="100%"
                                                                                    cellPadding={0}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{
                                                                                        borderColor: "#ccc",
                                                                                        borderCollapse: "collapse",
                                                                                        fontSize: 12,
                                                                                        color: "#202020",
                                                                                        borderRadius: "0 0 5px 5px"
                                                                                    }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td className="w160">
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        lineHeight: "1.8em",
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/kl.png"
                                                                                                                    width={32}
                                                                                                                />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{ fontWeight: 600 }}
                                                                                                            >
                                                                                                                KLM
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td height={5} />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    fontWeight: 600,
                                                                                                                    fontSize: 14
                                                                                                                }}
                                                                                                            >
                                                                                                                Flight 2518 |{" "}
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        fontWeight: 500
                                                                                                                    }}
                                                                                                                >
                                                                                                                    Aircraft 339
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td className="h20" />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <table
                                                                                                                    width="100%"
                                                                                                                    cellPadding={0}
                                                                                                                    cellSpacing={0}
                                                                                                                    border={0}
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        lineHeight: "1.8em",
                                                                                                                        color: "#202020"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    color: "#666666"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                Cabin
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr
                                                                                                                            style={{
                                                                                                                                fontWeight: 600
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <td>Economy</td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td width={5} />
                                                                                            <td
                                                                                                width={1}
                                                                                                style={{
                                                                                                    borderLeft: "1px dotted #ccc"
                                                                                                }}
                                                                                            />
                                                                                            <td width={10} />
                                                                                            <td>
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 18 }}>
                                                                                                                    {" "}
                                                                                                                    LHR
                                                                                                                </b>{" "}
                                                                                                                <br />
                                                                                                                <b style={{ fontSize: 12 }}>
                                                                                                                    London
                                                                                                                </b>
                                                                                                            </td>
                                                                                                            <td>&nbsp;</td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 18 }}>
                                                                                                                    {" "}
                                                                                                                    MIA{" "}
                                                                                                                </b>{" "}
                                                                                                                <br />
                                                                                                                <b style={{ fontSize: 12 }}>
                                                                                                                    Miami(FL)
                                                                                                                </b>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3} height={10} />
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color: "#666666"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {" "}
                                                                                                                    Heathrow{" "}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                            <td className="stops">
                                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/plane-stop.png" />{" "}
                                                                                                                <br />
                                                                                                                Non Stop
                                                                                                            </td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 140,
                                                                                                                    verticalAlign: "top"
                                                                                                                }}
                                                                                                            >
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        color: "#666666"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {" "}
                                                                                                                    Miami International{" "}
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3} height={10} />
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{
                                                                                                        fontSize: 12,
                                                                                                        color: "#202020"
                                                                                                    }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style={{ width: 130 }}>
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    02:00 PM
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        color: "#666",
                                                                                                                        padding: "5px 0"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <span>Terminal 3</span>
                                                                                                                </div>
                                                                                                            </td>
                                                                                                            <td>&nbsp;</td>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    textAlign: "right",
                                                                                                                    width: 180
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    07:30 PM
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        fontSize: 12,
                                                                                                                        color: "#666",
                                                                                                                        padding: "5px 0"
                                                                                                                    }}
                                                                                                                ></div>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td colSpan={3}>
                                                                                                                <br />
                                                                                                                <b>Baggage:</b> Personal
                                                                                                                Item, Carry-on, Checked Bag{" "}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {/*Layover table */}
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height={10} />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {/*Baggage Details Start*/}
                                                                {/* <table
                                                                    className="w560"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#1b75bc",
                                                                                    padding: 10,
                                                                                    borderRadius: "5px 5px  0 0",
                                                                                    color: "#fff",
                                                                                    fontSize: 14,
                                                                                    fontWeight: 600
                                                                                }}
                                                                            >
                                                                                <img
                                                                                    src="https://cmsrepository.com/static/flights/common/eticket/baggage-icon.png"
                                                                                    style={{
                                                                                        verticalAlign: "middle",
                                                                                        marginRight: 5
                                                                                    }}
                                                                                />{" "}
                                                                                Baggage Details
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <table
                                                                                    className="tabel-format"
                                                                                    width="100%"
                                                                                    cellPadding={10}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{
                                                                                        background: "#F5F5F5",
                                                                                        borderRadius: "0 0 5px 5px"
                                                                                    }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style={{
                                                                                                    background: "#D4E1F7",
                                                                                                    borderRightColor: "#8ea7d1",
                                                                                                    borderRight: "1px solid #8ea7d1"
                                                                                                }}
                                                                                                width="50%"
                                                                                            >
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{ fontSize: 12 }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td width={60}>
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/kl.png"
                                                                                                                    width={32}
                                                                                                                />
                                                                                                            </td>
                                                                                                            <td className="w10" />
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    lineHeight: "1.8em"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 16 }}>
                                                                                                                    Departure
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                Klm
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td
                                                                                                style={{ background: "#D4E1F7" }}
                                                                                                width="50%"
                                                                                            >
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{ fontSize: 12 }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td width={60}>
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/kl.png"
                                                                                                                    width={32}
                                                                                                                />
                                                                                                            </td>
                                                                                                            <td className="w10" />
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    lineHeight: "1.8em"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 16 }}>
                                                                                                                    Return
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                Klm
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td
                                                                                                style={{
                                                                                                    borderRight: "1px solid #ddd",
                                                                                                    borderBottom: "1px solid #ddd"
                                                                                                }}
                                                                                            >
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{ fontSize: 12 }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td width={60}>
                                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/baggage1.png" />
                                                                                                            </td>
                                                                                                            <td className="w10" />
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    lineHeight: "1.8em"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    Personal Item
                                                                                                                </b>
                                                                                                                <br /> A laptop bag or purse
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td
                                                                                                style={{
                                                                                                    borderBottom: "1px solid #ddd"
                                                                                                }}
                                                                                            >
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{ fontSize: 12 }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td width={60}>
                                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/baggage1.png" />
                                                                                                            </td>
                                                                                                            <td className="w10" />
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    lineHeight: "1.8em"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    Personal Item
                                                                                                                </b>
                                                                                                                <br /> A laptop bag or purse
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td
                                                                                                style={{
                                                                                                    borderRight: "1px solid #ddd",
                                                                                                    borderBottom: "1px solid #ddd"
                                                                                                }}
                                                                                            >
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{ fontSize: 12 }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td width={60}>
                                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/baggage2.png" />
                                                                                                            </td>
                                                                                                            <td className="w10" />
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    lineHeight: "1.8em"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    Carry-on Bag
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <span
                                                                                                                    style={{ fontSize: 14 }}
                                                                                                                >
                                                                                                                    Included
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td
                                                                                                style={{
                                                                                                    borderBottom: "1px solid #ddd"
                                                                                                }}
                                                                                            >
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{ fontSize: 12 }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td width={60}>
                                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/baggage2.png" />
                                                                                                            </td>
                                                                                                            <td className="w10" />
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    lineHeight: "1.8em"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    Carry-on Bag
                                                                                                                </b>{" "}
                                                                                                                <br />
                                                                                                                <span
                                                                                                                    style={{ fontSize: 14 }}
                                                                                                                >
                                                                                                                    Included
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td
                                                                                                style={{
                                                                                                    borderRight: "1px solid #ddd",
                                                                                                    paddingBottom: 30
                                                                                                }}
                                                                                            >
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{ fontSize: 12 }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td width={60}>
                                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/baggage3.png" />
                                                                                                            </td>
                                                                                                            <td className="w10" />
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    lineHeight: "1.8em"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    Checked Bag
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <span
                                                                                                                    style={{ fontSize: 14 }}
                                                                                                                >
                                                                                                                    Included
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td style={{ paddingBottom: 30 }}>
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    cellPadding={0}
                                                                                                    cellSpacing={0}
                                                                                                    border={0}
                                                                                                    style={{ fontSize: 12 }}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td width={60}>
                                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/baggage3.png" />
                                                                                                            </td>
                                                                                                            <td className="w10" />
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    lineHeight: "1.8em"
                                                                                                                }}
                                                                                                            >
                                                                                                                <b style={{ fontSize: 14 }}>
                                                                                                                    Checked Bag
                                                                                                                </b>
                                                                                                                <br />
                                                                                                                <span
                                                                                                                    style={{ fontSize: 14 }}
                                                                                                                >
                                                                                                                    Included
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            {" "}
                                                                            <td className="h20" />
                                                                        </tr>
                                                                    </tbody>
                                                                </table> */}
                                                                {/*Traveller Details*/}
                                                                <table
                                                                    className="w560"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    background: "#1b75bc",
                                                                                    color: "#fff",
                                                                                    padding: 10,
                                                                                    borderRadius: "5px 5px  0 0",
                                                                                    fontWeight: 600
                                                                                }}
                                                                            >
                                                                                <img
                                                                                    src="https://cmsrepository.com/static/flights/common/eticket/user.png"
                                                                                    style={{ verticalAlign: "middle" }}
                                                                                />{" "}
                                                                                Traveler(s) Details
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                {/*table data*/}
                                                                                <table
                                                                                    width="100%"
                                                                                    className="tabel-format2"
                                                                                    cellPadding={10}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{
                                                                                        borderColor: "#ccc",
                                                                                        borderCollapse: "collapse",
                                                                                        fontSize: 13,
                                                                                        background: "#F5F5F5",
                                                                                        fontWeight: "bold",
                                                                                        color: "#1F1F1F",
                                                                                        borderRadius: "0 0 5px 5px"
                                                                                    }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <th
                                                                                                style={{
                                                                                                    color: "#666666",
                                                                                                    borderRight: "1px solid #ddd",
                                                                                                    borderBottom: "1px solid #ddd",
                                                                                                    textAlign: "left",
                                                                                                    fontWeight: 500
                                                                                                }}
                                                                                            >
                                                                                                Traveler(s) Name
                                                                                            </th>
                                                                                            <th
                                                                                                style={{
                                                                                                    color: "#666666",
                                                                                                    borderRight: "1px solid #ddd",
                                                                                                    borderBottom: "1px solid #ddd",
                                                                                                    textAlign: "left",
                                                                                                    fontWeight: 500
                                                                                                }}
                                                                                            >
                                                                                                Gender
                                                                                            </th>
                                                                                            <th
                                                                                                style={{
                                                                                                    color: "#666666",
                                                                                                    borderBottom: "1px solid #ddd",
                                                                                                    textAlign: "left",
                                                                                                    fontWeight: 500
                                                                                                }}
                                                                                            >
                                                                                                DOB
                                                                                            </th>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td
                                                                                                style={{
                                                                                                    borderRight: "1px solid #ddd"
                                                                                                }}
                                                                                            >
                                                                                                1. Shubham Kumar
                                                                                            </td>
                                                                                            <td
                                                                                                style={{
                                                                                                    borderRight: "1px solid #ddd"
                                                                                                }}
                                                                                            >
                                                                                                Male,
                                                                                                <span style={{ fontWeight: 500 }}>
                                                                                                    Adult
                                                                                                </span>
                                                                                            </td>
                                                                                            <td>03 February 1978</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td
                                                                                                style={{
                                                                                                    borderRight: "1px solid #ddd"
                                                                                                }}
                                                                                            >
                                                                                                2. Saurav Kumar
                                                                                            </td>
                                                                                            <td
                                                                                                style={{
                                                                                                    borderRight: "1px solid #ddd"
                                                                                                }}
                                                                                            >
                                                                                                Male,
                                                                                                <span style={{ fontWeight: 500 }}>
                                                                                                    Child
                                                                                                </span>
                                                                                            </td>
                                                                                            <td>08 March 2015</td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="h20" />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {/*Price Detail Start*/}
                                                                <table
                                                                    className="w560"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#1b75bc",
                                                                                    padding: 10,
                                                                                    borderRadius: "5px 5px  0 0",
                                                                                    color: "#fff",
                                                                                    fontSize: 14,
                                                                                    fontWeight: 600
                                                                                }}
                                                                            >
                                                                                <img
                                                                                    src="https://cmsrepository.com/static/flights/common/eticket/price-icon.png"
                                                                                    style={{
                                                                                        verticalAlign: "middle",
                                                                                        marginRight: 5
                                                                                    }}
                                                                                />{" "}
                                                                                Price Details
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <table
                                                                                    className="tabel-format2"
                                                                                    width="100%"
                                                                                    cellPadding={10}
                                                                                    cellSpacing={0}
                                                                                    border={0}
                                                                                    style={{
                                                                                        borderColor: "#ccc",
                                                                                        borderCollapse: "collapse",
                                                                                        fontSize: 14,
                                                                                        background: "#F5F5F5",
                                                                                        fontWeight: "bold",
                                                                                        color: "#1F1F1F",
                                                                                        borderRadius: "0 0 5px 5px"
                                                                                    }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td>Flight Price</td>
                                                                                            <td style={{ textAlign: "right" }}>
                                                                                                $4466.72
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td
                                                                                                style={{
                                                                                                    borderTop: "1px dashed #ddd",
                                                                                                    color: "#3AB54A",
                                                                                                    fontWeight: "bold"
                                                                                                }}
                                                                                            >
                                                                                                <span style={{ color: "#1F1F1F" }}>
                                                                                                    Flight Watcher
                                                                                                </span>
                                                                                            </td>
                                                                                            <td
                                                                                                style={{
                                                                                                    borderTop: "1px dashed #ddd",
                                                                                                    color: "#3AB54A",
                                                                                                    textAlign: "right",
                                                                                                    fontWeight: "bold"
                                                                                                }}
                                                                                            >
                                                                                                Free{" "}
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td
                                                                                                style={{
                                                                                                    paddingBottom: 20,
                                                                                                    fontSize: 16,
                                                                                                    color: "#1b75bc",
                                                                                                    borderTop: "2px solid #ddd"
                                                                                                }}
                                                                                            >
                                                                                                Total Travel Cost
                                                                                            </td>
                                                                                            <td
                                                                                                style={{
                                                                                                    paddingBottom: 20,
                                                                                                    fontSize: 16,
                                                                                                    textAlign: "right",
                                                                                                    color: "#ff7f00",
                                                                                                    borderTop: "2px solid #ddd"
                                                                                                }}
                                                                                            >
                                                                                                $4466.72
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            {" "}
                                                                            <td className="h20" />
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    fontSize: 12,
                                                                                    lineHeight: "1.6em"
                                                                                }}
                                                                            >
                                                                                The total travel cost in the amount of{" "}
                                                                                <b>$4466.72</b> were charged to the (Visa)
                                                                                ending in <b>1234 </b> of{" "}
                                                                                <b>(Shubham Kumar)</b> Your Credit/Debit
                                                                                card may be billed in multiple charges
                                                                                totaling the final price.
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            {" "}
                                                                            <td className="h20" />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {/*Note Start*/}
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style={{
                                                                                    background: "#fff",
                                                                                    border: "1px solid #C5C5C5",
                                                                                    color: "#666666",
                                                                                    padding: 10,
                                                                                    fontSize: 12,
                                                                                    lineHeight: "1.6em"
                                                                                }}
                                                                            >
                                                                                <b style={{ color: "#1F1F1F" }}>
                                                                                    <span style={{ color: "#4863db" }}>
                                                                                        Note:
                                                                                    </span>{" "}
                                                                                    This is not your E-Ticket and is not valid
                                                                                    for travel{" "}
                                                                                </b>
                                                                                <br />
                                                                                We regret to inform you that your booking
                                                                                failed due to some issue from the
                                                                                airline(s). One of our associates will
                                                                                contact you shortly to assist you. You may
                                                                                also contact us at{" "}
                                                                                <a
                                                                                    href="tel:+1-248-274-7239"
                                                                                    style={{
                                                                                        cursor: "pointer",
                                                                                        color: "#666666",
                                                                                        textDecoration: "none",
                                                                                        fontWeight: 700
                                                                                    }}
                                                                                >
                                                                                    +1-248-274-7239
                                                                                </a>{" "}
                                                                                at your convenience.{" "}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            {" "}
                                                                            <td className="h20" />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {/*Reviews Start*/}
                                                                {/*Customer Review start*/}
                                                                <table
                                                                    width="100%"
                                                                    border={0}
                                                                    cellSpacing={0}
                                                                    cellPadding={0}
                                                                    className="reviews-bg"
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height={200} valign="middle">
                                                                                <table
                                                                                    width="100%"
                                                                                    border={0}
                                                                                    cellSpacing={0}
                                                                                    cellPadding={0}
                                                                                    style={{ color: "#fff" }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style={{
                                                                                                    fontSize: 20,
                                                                                                    fontWeight: 300,
                                                                                                    lineHeight: "2.1",
                                                                                                    textAlign: "center"
                                                                                                }}
                                                                                            >
                                                                                                Check Out Reviews
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td
                                                                                                style={{
                                                                                                    fontSize: 25,
                                                                                                    fontWeight: 700,
                                                                                                    textAlign: "center"
                                                                                                }}
                                                                                            >
                                                                                                From Our Happy Customers
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td valign="top">
                                                                                <table
                                                                                    align="center"
                                                                                    border={0}
                                                                                    cellSpacing={0}
                                                                                    cellPadding={0}
                                                                                    className="reviews-table"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                width="5%"
                                                                                                className="hidden-xs"
                                                                                            />
                                                                                            <td width="5%" />
                                                                                            <td width="30%">
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    border={0}
                                                                                                    cellSpacing={0}
                                                                                                    cellPadding={0}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td height={28} valign="top">
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/trustpilot-logo.png"
                                                                                                                    width={107}
                                                                                                                />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                height={25}
                                                                                                                valign="center"
                                                                                                            >
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/t-star.png"
                                                                                                                    width={14}
                                                                                                                />
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/t-star.png"
                                                                                                                    width={14}
                                                                                                                />
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/t-star.png"
                                                                                                                    width={14}
                                                                                                                />
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/t-star.png"
                                                                                                                    width={14}
                                                                                                                />
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/t-star-h.png"
                                                                                                                    width={14}
                                                                                                                />
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        fontWeight: 500,
                                                                                                                        fontSize: 17,
                                                                                                                        display: "inline-block"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    (4.7)
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    fontWeight: 600,
                                                                                                                    fontSize: 11
                                                                                                                }}
                                                                                                            >
                                                                                                                Based on 2,430 Reviews
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td
                                                                                                width="5%"
                                                                                                className="hidden-xs"
                                                                                            />
                                                                                            <td width="5%" />
                                                                                            <td width="30%">
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    border={0}
                                                                                                    cellSpacing={0}
                                                                                                    cellPadding={0}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td height={28} valign="top">
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/sitejabber-logo.png"
                                                                                                                    width={112}
                                                                                                                />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                height={25}
                                                                                                                valign="middle"
                                                                                                            >
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/s-star.png"
                                                                                                                    width={14}
                                                                                                                />
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/s-star.png"
                                                                                                                    width={14}
                                                                                                                />
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/s-star.png"
                                                                                                                    width={14}
                                                                                                                />
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/s-star.png"
                                                                                                                    width={14}
                                                                                                                />
                                                                                                                <img
                                                                                                                    src="https://cmsrepository.com/static/flights/mailer/abandoned-cart/s-star.png"
                                                                                                                    width={14}
                                                                                                                />
                                                                                                                <span
                                                                                                                    style={{
                                                                                                                        fontWeight: 500,
                                                                                                                        fontSize: 17,
                                                                                                                        display: "inline-block"
                                                                                                                    }}
                                                                                                                >
                                                                                                                    (4.7)
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style={{
                                                                                                                    fontWeight: 600,
                                                                                                                    fontSize: 11
                                                                                                                }}
                                                                                                            >
                                                                                                                Instant Feedback <br />
                                                                                                                Based on 10,752 Reviews
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                            <td width="5%" />
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr className="hidden-xs">
                                                                            <td height={40} />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>{" "}
                                                                {/*Reviews End*/}
                                                                {/*webchcking Detail Start*/}
                                                                {/*Hotel Deal Start*/}
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height={20} />
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <table
                                                                                    width="100%"
                                                                                    border={0}
                                                                                    cellSpacing={0}
                                                                                    cellPadding={0}
                                                                                    className="hoteldeal-container"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td height={10} />
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td style={{ textAlign: "center" }}>
                                                                                                <img
                                                                                                    src="https://cmsrepository.com/static/flights/common/confirmation/congrats.png"
                                                                                                    className="congrats-img"
                                                                                                />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td height={20} />
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td
                                                                                                style={{
                                                                                                    textAlign: "center",
                                                                                                    fontSize: 16,
                                                                                                    lineHeight: 25,
                                                                                                    color: "#fff"
                                                                                                }}
                                                                                            >
                                                                                                You've unlocked Savings worth up to
                                                                                                30% <br />
                                                                                                on Hotels. Add a Hotel &amp; Save.
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td height={25} />
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="dealboox-pad">
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    border={0}
                                                                                                    cellSpacing={0}
                                                                                                    cellPadding={0}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td className="hoteldeal-box">
                                                                                                                <table
                                                                                                                    width="100%"
                                                                                                                    border={0}
                                                                                                                    cellSpacing={0}
                                                                                                                    cellPadding={0}
                                                                                                                >
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td colSpan={2}>
                                                                                                                                <img
                                                                                                                                    src="//i.travelapi.com/hotels/1000000/50000/43300/43240/f1242ae5_z.jpg"
                                                                                                                                    className="thumb-himages"
                                                                                                                                    onerror="this.src='https://cmsrepository.com/static/HotelImages/HotelDefaultImages/no-hotel-photo-1.jpg'"
                                                                                                                                    style={{
                                                                                                                                        borderTopLeftRadius: 10,
                                                                                                                                        borderTopRightRadius: 10
                                                                                                                                    }}
                                                                                                                                />
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                className="hoteldeal-names"
                                                                                                                            >
                                                                                                                                Quality Inn &amp;
                                                                                                                                Suites
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td className="starrating-deal">
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingRight: 10,
                                                                                                                                    textAlign: "right"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <a
                                                                                                                                    style={{
                                                                                                                                        fontSize: 12,
                                                                                                                                        textDecoration:
                                                                                                                                            "underline",
                                                                                                                                        color:
                                                                                                                                            "#3B3B3B",
                                                                                                                                        fontWeight: 600
                                                                                                                                    }}
                                                                                                                                    href="https://www.lookbyfare.com/us/hotel/hotel/hotelsearch?ls=Del Rio, United States&lid=5409&hs=lst&tr=1&cin=2024-12-14&cout=2024-12-16&rc=a1c1-0&pos=37&pbid=2227984&hid=59946"
                                                                                                                                >
                                                                                                                                    36 Reviews
                                                                                                                                </a>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                style={{
                                                                                                                                    fontSize: 12,
                                                                                                                                    color: "#3B3B3B",
                                                                                                                                    paddingLeft: 10,
                                                                                                                                    lineHeight: 17
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                {" "}
                                                                                                                                3616 Veterans Blvd.,
                                                                                                                                Del Rio, TX-Texas,
                                                                                                                                US, 78840
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingLeft: 8,
                                                                                                                                    width: "50%",
                                                                                                                                    fontSize: 13,
                                                                                                                                    color: "#3B3B3B",
                                                                                                                                    letterSpacing:
                                                                                                                                        "0.5"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <b
                                                                                                                                    style={{
                                                                                                                                        color:
                                                                                                                                            "#3AB54A",
                                                                                                                                        fontSize: 19,
                                                                                                                                        fontWeight: 600,
                                                                                                                                        lineHeight: 22,
                                                                                                                                        letterSpacing: 0
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    $61.18
                                                                                                                                </b>
                                                                                                                                <br />
                                                                                                                                Avg/ night
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingRight: 10
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <a
                                                                                                                                    href="https://www.lookbyfare.com/us/hotel/hotel/hotelsearch?ls=Del Rio, United States&lid=5409&hs=lst&tr=1&cin=2024-12-14&cout=2024-12-16&rc=a1c1-0&pos=37&pbid=2227984&hid=59946"
                                                                                                                                    target="_blank"
                                                                                                                                    className="dealview-btn"
                                                                                                                                >
                                                                                                                                    View
                                                                                                                                </a>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={10}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                            <td
                                                                                                                style={{ width: "2%" }}
                                                                                                            ></td>
                                                                                                            <td className="hoteldeal-box">
                                                                                                                <table
                                                                                                                    width="100%"
                                                                                                                    border={0}
                                                                                                                    cellSpacing={0}
                                                                                                                    cellPadding={0}
                                                                                                                >
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td colSpan={2}>
                                                                                                                                <img
                                                                                                                                    src="https://cmsrepository.com/static/HotelImages/HotelDefaultImages/no-hotel-photo-1.jpg"
                                                                                                                                    className="thumb-himages"
                                                                                                                                    onerror="this.src='https://cmsrepository.com/static/HotelImages/HotelDefaultImages/no-hotel-photo-1.jpg'"
                                                                                                                                    style={{
                                                                                                                                        borderTopLeftRadius: 10,
                                                                                                                                        borderTopRightRadius: 10
                                                                                                                                    }}
                                                                                                                                />
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                className="hoteldeal-names"
                                                                                                                            >
                                                                                                                                Ramada Del Rio
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td className="starrating-deal">
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingRight: 10,
                                                                                                                                    textAlign: "right"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <a
                                                                                                                                    style={{
                                                                                                                                        fontSize: 12,
                                                                                                                                        textDecoration:
                                                                                                                                            "underline",
                                                                                                                                        color:
                                                                                                                                            "#3B3B3B",
                                                                                                                                        fontWeight: 600
                                                                                                                                    }}
                                                                                                                                    href="https://www.lookbyfare.com/us/hotel/hotel/hotelsearch?ls=Del Rio, United States&lid=5409&hs=lst&tr=1&cin=2024-12-14&cout=2024-12-16&rc=a1c1-0&pos=37&pbid=2227984&hid=126954"
                                                                                                                                >
                                                                                                                                    584 Reviews
                                                                                                                                </a>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                style={{
                                                                                                                                    fontSize: 12,
                                                                                                                                    color: "#3B3B3B",
                                                                                                                                    paddingLeft: 10,
                                                                                                                                    lineHeight: 17
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                {" "}
                                                                                                                                2101 Veterans Blvd,
                                                                                                                                Del Rio, TX-Texas,
                                                                                                                                US, 78840
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingLeft: 8,
                                                                                                                                    width: "50%",
                                                                                                                                    fontSize: 13,
                                                                                                                                    color: "#3B3B3B",
                                                                                                                                    letterSpacing:
                                                                                                                                        "0.5"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <b
                                                                                                                                    style={{
                                                                                                                                        color:
                                                                                                                                            "#3AB54A",
                                                                                                                                        fontSize: 19,
                                                                                                                                        fontWeight: 600,
                                                                                                                                        lineHeight: 22,
                                                                                                                                        letterSpacing: 0
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    $108.90
                                                                                                                                </b>
                                                                                                                                <br />
                                                                                                                                Avg/ night
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingRight: 10
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <a
                                                                                                                                    href="https://www.lookbyfare.com/us/hotel/hotel/hotelsearch?ls=Del Rio, United States&lid=5409&hs=lst&tr=1&cin=2024-12-14&cout=2024-12-16&rc=a1c1-0&pos=37&pbid=2227984&hid=126954"
                                                                                                                                    target="_blank"
                                                                                                                                    className="dealview-btn"
                                                                                                                                >
                                                                                                                                    View
                                                                                                                                </a>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={10}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                            <td
                                                                                                                style={{ width: "2%" }}
                                                                                                            ></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td height={5} />
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="dealboox-pad">
                                                                                                <table
                                                                                                    width="100%"
                                                                                                    border={0}
                                                                                                    cellSpacing={0}
                                                                                                    cellPadding={0}
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td className="hoteldeal-box">
                                                                                                                <table
                                                                                                                    width="100%"
                                                                                                                    border={0}
                                                                                                                    cellSpacing={0}
                                                                                                                    cellPadding={0}
                                                                                                                >
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td colSpan={2}>
                                                                                                                                <img
                                                                                                                                    src="https://cmsrepository.com/static/HotelImages/MainImages/67/66695.jpg"
                                                                                                                                    className="thumb-himages"
                                                                                                                                    onerror="this.src='https://cmsrepository.com/static/HotelImages/HotelDefaultImages/no-hotel-photo-1.jpg'"
                                                                                                                                    style={{
                                                                                                                                        borderTopLeftRadius: 10,
                                                                                                                                        borderTopRightRadius: 10
                                                                                                                                    }}
                                                                                                                                />
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                className="hoteldeal-names"
                                                                                                                            >
                                                                                                                                Holiday Inn Express
                                                                                                                                Hotel And Suites Del
                                                                                                                                Rio
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td className="starrating-deal">
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingRight: 10,
                                                                                                                                    textAlign: "right"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <a
                                                                                                                                    style={{
                                                                                                                                        fontSize: 12,
                                                                                                                                        textDecoration:
                                                                                                                                            "underline",
                                                                                                                                        color:
                                                                                                                                            "#3B3B3B",
                                                                                                                                        fontWeight: 600
                                                                                                                                    }}
                                                                                                                                    href="https://www.lookbyfare.com/us/hotel/hotel/hotelsearch?ls=Del Rio, United States&lid=5409&hs=lst&tr=1&cin=2024-12-14&cout=2024-12-16&rc=a1c1-0&pos=37&pbid=2227984&hid=66695"
                                                                                                                                >
                                                                                                                                    89 Reviews
                                                                                                                                </a>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                style={{
                                                                                                                                    fontSize: 12,
                                                                                                                                    color: "#3B3B3B",
                                                                                                                                    paddingLeft: 10,
                                                                                                                                    lineHeight: 17
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                {" "}
                                                                                                                                2410 N Bedell Ave,
                                                                                                                                Del Rio, TX-Texas,
                                                                                                                                US, 78840
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingLeft: 8,
                                                                                                                                    width: "50%",
                                                                                                                                    fontSize: 13,
                                                                                                                                    color: "#3B3B3B",
                                                                                                                                    letterSpacing:
                                                                                                                                        "0.5"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <b
                                                                                                                                    style={{
                                                                                                                                        color:
                                                                                                                                            "#3AB54A",
                                                                                                                                        fontSize: 19,
                                                                                                                                        fontWeight: 600,
                                                                                                                                        lineHeight: 22,
                                                                                                                                        letterSpacing: 0
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    $108.96
                                                                                                                                </b>
                                                                                                                                <br />
                                                                                                                                Avg/ night
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingRight: 10
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <a
                                                                                                                                    href="https://www.lookbyfare.com/us/hotel/hotel/hotelsearch?ls=Del Rio, United States&lid=5409&hs=lst&tr=1&cin=2024-12-14&cout=2024-12-16&rc=a1c1-0&pos=37&pbid=2227984&hid=66695"
                                                                                                                                    target="_blank"
                                                                                                                                    className="dealview-btn"
                                                                                                                                >
                                                                                                                                    View
                                                                                                                                </a>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={10}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                            <td
                                                                                                                style={{ width: "2%" }}
                                                                                                            ></td>
                                                                                                            <td className="hoteldeal-box">
                                                                                                                <table
                                                                                                                    width="100%"
                                                                                                                    border={0}
                                                                                                                    cellSpacing={0}
                                                                                                                    cellPadding={0}
                                                                                                                >
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td colSpan={2}>
                                                                                                                                <img
                                                                                                                                    src="https://cmsrepository.com/static/HotelImages/MainImages/97/96380.jpg"
                                                                                                                                    className="thumb-himages"
                                                                                                                                    onerror="this.src='https://cmsrepository.com/static/HotelImages/HotelDefaultImages/no-hotel-photo-1.jpg'"
                                                                                                                                    style={{
                                                                                                                                        borderTopLeftRadius: 10,
                                                                                                                                        borderTopRightRadius: 10
                                                                                                                                    }}
                                                                                                                                />
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                className="hoteldeal-names"
                                                                                                                            >
                                                                                                                                Best Western Inn Of
                                                                                                                                Del Rio
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td className="starrating-deal">
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                                <img src="https://cmsrepository.com/static/flights/common/confirmation/rate-star.png" />
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingRight: 10,
                                                                                                                                    textAlign: "right"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <a
                                                                                                                                    style={{
                                                                                                                                        fontSize: 12,
                                                                                                                                        textDecoration:
                                                                                                                                            "underline",
                                                                                                                                        color:
                                                                                                                                            "#3B3B3B",
                                                                                                                                        fontWeight: 600
                                                                                                                                    }}
                                                                                                                                    href="https://www.lookbyfare.com/us/hotel/hotel/hotelsearch?ls=Del Rio, United States&lid=5409&hs=lst&tr=1&cin=2024-12-14&cout=2024-12-16&rc=a1c1-0&pos=37&pbid=2227984&hid=96380"
                                                                                                                                >
                                                                                                                                    176 Reviews
                                                                                                                                </a>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                style={{
                                                                                                                                    fontSize: 12,
                                                                                                                                    color: "#3B3B3B",
                                                                                                                                    paddingLeft: 10,
                                                                                                                                    lineHeight: 17
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                {" "}
                                                                                                                                810 Veterans Blvd,
                                                                                                                                Del Rio, TX-Texas,
                                                                                                                                US, 78840
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={5}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingLeft: 8,
                                                                                                                                    width: "50%",
                                                                                                                                    fontSize: 13,
                                                                                                                                    color: "#3B3B3B",
                                                                                                                                    letterSpacing:
                                                                                                                                        "0.5"
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <b
                                                                                                                                    style={{
                                                                                                                                        color:
                                                                                                                                            "#3AB54A",
                                                                                                                                        fontSize: 19,
                                                                                                                                        fontWeight: 600,
                                                                                                                                        lineHeight: 22,
                                                                                                                                        letterSpacing: 0
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    $137.74
                                                                                                                                </b>
                                                                                                                                <br />
                                                                                                                                Avg/ night
                                                                                                                            </td>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    paddingRight: 10
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <a
                                                                                                                                    href="https://www.lookbyfare.com/us/hotel/hotel/hotelsearch?ls=Del Rio, United States&lid=5409&hs=lst&tr=1&cin=2024-12-14&cout=2024-12-16&rc=a1c1-0&pos=37&pbid=2227984&hid=96380"
                                                                                                                                    target="_blank"
                                                                                                                                    className="dealview-btn"
                                                                                                                                >
                                                                                                                                    View
                                                                                                                                </a>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                colSpan={2}
                                                                                                                                height={10}
                                                                                                                            />
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                            <td
                                                                                                                style={{ width: "2%" }}
                                                                                                            ></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td height={5} />
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {/*Hotel Deal End*/}
                                                                {/*main body end*/}
                                                            </td>
                                                            <td className="w20" />
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height={20} />
                                        </tr>
                                        <tr>
                                            <td style={{ background: "#F5F5F5" }}>
                                                <table
                                                    width="100%"
                                                    cellPadding={0}
                                                    cellSpacing={0}
                                                    border={0}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            {" "}
                                                            <td className="h20" />
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table
                                                                    width="100%"
                                                                    cellPadding={0}
                                                                    cellSpacing={0}
                                                                    border={0}
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="w20" />
                                                                            <td
                                                                                style={{
                                                                                    fontSize: 12,
                                                                                    lineHeight: "1.6em",
                                                                                    color: "#666666"
                                                                                }}
                                                                            >
                                                                                <b
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        display: "block",
                                                                                        marginBottom: 10,
                                                                                        color: "#1F1F1F"
                                                                                    }}
                                                                                >
                                                                                    Lookbyfare Ticket Policies, Rules and
                                                                                    Restrictions
                                                                                </b>
                                                                                Please note that most airline tickets, along
                                                                                with all service fees and charges, are
                                                                                non-transferable and non-refundable. Name
                                                                                changes in the itinerary are not allowed.
                                                                                The fare does not include baggage, Carry-On
                                                                                fees, and any fees charged by the airline
                                                                                directly. Airfares are only guaranteed once
                                                                                ticketed by the airline. Any changes,
                                                                                modifications, and charges are solely
                                                                                subjected to the availability and the rules
                                                                                and regulation of the airline. It is the
                                                                                responsibility of the traveler to update and
                                                                                collect all travel documents required to
                                                                                travel to your destination is complete and
                                                                                valid. Visit our{" "}
                                                                                <a
                                                                                    href="https://www.lookbyfare.com/us/terms-conditions"
                                                                                    target="_blank"
                                                                                    style={{ color: "#4863db" }}
                                                                                >
                                                                                    Terms &amp; Conditions
                                                                                </a>{" "}
                                                                                Page for more details.
                                                                                <br />
                                                                                <br />
                                                                                <b
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        display: "block",
                                                                                        marginBottom: 10,
                                                                                        color: "#137720"
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src="https://cmsrepository.com/static/flights/common/confirmation/check2.png"
                                                                                        style={{
                                                                                            verticalAlign: "middle",
                                                                                            marginRight: 5
                                                                                        }}
                                                                                    />{" "}
                                                                                    Free Cancelation within 24 hours{" "}
                                                                                </b>
                                                                                <ul
                                                                                    style={{
                                                                                        listStyle: "disc",
                                                                                        margin: "0px 0 0 18px",
                                                                                        padding: 0
                                                                                    }}
                                                                                >
                                                                                    <li>
                                                                                        The amount of airline tickets and the
                                                                                        service fees charged for booking are
                                                                                        non-refundable after 24 hours.
                                                                                    </li>
                                                                                    <li>
                                                                                        Any cancelation beyond 24 hours is
                                                                                        subject to the rules of the concerned
                                                                                        airline. However, a cancelation fee will
                                                                                        be applicable.
                                                                                    </li>
                                                                                    <li>
                                                                                        Tickets can be canceled within 24 hours
                                                                                        of booking for a fee via calling our
                                                                                        24/7 customer support.
                                                                                    </li>
                                                                                    <li>
                                                                                        In case of a no-show, the ticket is
                                                                                        non-refundable, and the whole amount is
                                                                                        forfeited by the airline. To avoid a
                                                                                        no-show, kindly notify us at least 4
                                                                                        hours before the flight departure.
                                                                                    </li>
                                                                                    <li>
                                                                                        {" "}
                                                                                        Once a ticket is purchased, changes in
                                                                                        the passenger name(s) are not allowed as
                                                                                        per the airline policy. Any changes made
                                                                                        to the itinerary are restricted and are
                                                                                        subject to the rules of the concerned
                                                                                        airline.
                                                                                    </li>
                                                                                </ul>
                                                                                <b style={{ color: "#4863db" }}>
                                                                                    Please note:
                                                                                </b>{" "}
                                                                                Tickets of all the low-cost airlines
                                                                                purchased within 7 days (168 hours) of the
                                                                                travel date are non-refundable after the
                                                                                time of purchase.
                                                                                <br />
                                                                                <br />
                                                                                <b
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        display: "block",
                                                                                        marginBottom: 10,
                                                                                        color: "#1F1F1F"
                                                                                    }}
                                                                                >
                                                                                    Voluntary Itinerary Changes
                                                                                </b>
                                                                                While most itineraries ticketed by
                                                                                Lookbyfare allow for changes and
                                                                                modifications, most of these changes in
                                                                                itinerary require issuing a new ticket,
                                                                                according to airline policy. Please note
                                                                                that all and any changes are subject to
                                                                                availability and may incur penalties based
                                                                                on the airline rules and regulations, the
                                                                                fare difference from the original airfare,
                                                                                and our service fees.
                                                                                <br />
                                                                                <br />
                                                                                <b
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        display: "block",
                                                                                        marginBottom: 10,
                                                                                        color: "#1F1F1F"
                                                                                    }}
                                                                                >
                                                                                    Involuntary Itinerary Changes{" "}
                                                                                    <span
                                                                                        style={{
                                                                                            fontStyle: "italic",
                                                                                            fontSize: 13
                                                                                        }}
                                                                                    >
                                                                                        (Changes done directly by the airline)
                                                                                    </span>
                                                                                </b>
                                                                                Please note that we have no control over any
                                                                                changes to a scheduled flight itinerary made
                                                                                by the airline. In such a situation, if the
                                                                                airline informs us of a viable option, we
                                                                                will update you of the changes through the
                                                                                email you have used to book your flight
                                                                                ticket. When the airline does not offer us a
                                                                                workable option, our schedule change
                                                                                specialists will assist and review your
                                                                                reservation.
                                                                                <b
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        display: "block",
                                                                                        marginBottom: 10,
                                                                                        color: "#1F1F1F"
                                                                                    }}
                                                                                >
                                                                                    Add on Services
                                                                                </b>
                                                                                <div>
                                                                                    <b
                                                                                        style={{
                                                                                            fontSize: 13,
                                                                                            display: "block",
                                                                                            marginBottom: 10,
                                                                                            color: "#005DBA"
                                                                                        }}
                                                                                    >
                                                                                        Travel Protection
                                                                                    </b>
                                                                                    We highly recommend you to protect your
                                                                                    travel by adding Travel Protection Plan to
                                                                                    your flight.
                                                                                    <br />
                                                                                    <br />
                                                                                    <b>Please note that:</b>
                                                                                    <ul
                                                                                        style={{
                                                                                            listStyle: "disc",
                                                                                            margin: "0px 0 0 18px",
                                                                                            padding: 0
                                                                                        }}
                                                                                    >
                                                                                        <li>
                                                                                            Travel protection plan coverage will
                                                                                            come into effect only once the premium
                                                                                            for the plan is received in full.
                                                                                        </li>
                                                                                        <li>
                                                                                            The plan will also cover only the
                                                                                            Itinerary you have purchased through
                                                                                            the site in which you have purchased
                                                                                            your travel protection plan.
                                                                                        </li>
                                                                                    </ul>
                                                                                    To review full plan details online, go to:{" "}
                                                                                    <a
                                                                                        href="https://www.lookbyfare.com/us/travel-insurance"
                                                                                        target="_blank"
                                                                                        style={{
                                                                                            color: "#4F8FFC",
                                                                                            textDecoration: "none",
                                                                                            fontWeight: "bold"
                                                                                        }}
                                                                                    >
                                                                                        https://www.lookbyfare.com/us/travel-insurance
                                                                                    </a>
                                                                                    <br /> <br />
                                                                                </div>
                                                                                <div>
                                                                                    <b
                                                                                        style={{
                                                                                            fontSize: 13,
                                                                                            display: "block",
                                                                                            marginBottom: 10,
                                                                                            color: "#005DBA"
                                                                                        }}
                                                                                    >
                                                                                        Online\Web Check In
                                                                                    </b>
                                                                                    Please visit our online check-in page to
                                                                                    check in online and print your boarding
                                                                                    pass.
                                                                                    <br />
                                                                                    Visit:
                                                                                    <a
                                                                                        href="https://www.lookbyfare.com/us/airlines/web-check-in/online-check-in"
                                                                                        style={{
                                                                                            color: "#4F8FFC",
                                                                                            textDecoration: "none",
                                                                                            fontWeight: "bold"
                                                                                        }}
                                                                                        target="_blank"
                                                                                    >
                                                                                        https://www.lookbyfare.com/us/airlines/web-check-in/online-check-in
                                                                                    </a>
                                                                                    <br />
                                                                                    <br />
                                                                                </div>
                                                                            </td>
                                                                            <td className="w20" />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            {" "}
                                                            <td className="h20" />
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default confirmationPage;