'use client';

import React, { useState } from 'react';
import { Country, State, City } from "country-state-city"


const BillingInfo = () => {

    const [selectedCountry, setSelectedCountry] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);

    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        setSelectedCountry(countryCode);
        setStates(State.getStatesOfCountry(countryCode));

    };

    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        setSelectedState(stateCode);
        setCities(City.getCitiesOfState(selectedCountry, stateCode));
    };

    return (
        <div className="form-box" bis_skin_checked={1}>
            <div className="mainheading" bis_skin_checked={1}>
                <img
                    src="/assets/images/svg/p-billing-information.svg"
                    className="icon billing-info"
                />
                Billing Information
            </div>
            <p>(As per Bank records or credit card company)</p>
            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <input type="hidden" id="istf" name="istf" defaultValue={0} />
                    <label className="label_hide_mobile">
                        Select Country<span className="required">*</span>
                    </label>
                    <div className="form-righterrow">
                        <select
                            className="Payment"
                            data-val="true"
                            data-val-required="The Country field is required."
                            id="flightBookingRequest_Payment_Country"
                            name="flightBookingRequest.Payment.Country"
                            onChange={handleCountryChange}
                            value={selectedCountry}
                        >
                            <option value="">Select Country</option>
                            {Country.getAllCountries().map((country) => (
                                <option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <span className="required_mobile">*</span>
                </div>
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
                            <div className="form-righterrow">
                                <select
                                    className="Payment"
                                    id="flightBookingRequest_Payment_State"
                                    name="flightBookingRequest.Payment.State"
                                    disabled={!selectedCountry}
                                    onChange={handleStateChange}
                                    value={selectedState}
                                >
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state.isoCode} value={state.isoCode}>
                                            {state.name}
                                        </option>
                                    ))}
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
                            <div className="form-righterrow">
                                <select
                                    className="Payment"
                                    id="flightBookingRequest_Payment_City"
                                    name="flightBookingRequest.Payment.City"
                                    disabled={!selectedState}
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city.isoCode} value={city.isoCode}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
    )
}

export default BillingInfo;