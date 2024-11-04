import React, { useState } from 'react';

const PassengerForm = () => {
    const currentYear = new Date().getFullYear();
    const [lastName, setLastName] = useState('');
    const [dobMonth, setDobMonth] = useState('');
    const [dobDate, setDobDate] = useState('');
    const [dobYear, setDobYear] = useState('');

    const years = Array.from({ length: currentYear - 1913 }, (_, i) => currentYear - i); // Generates years from current year to 1914

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleDobMonthChange = (e) => {
        setDobMonth(e.target.value);
    };

    const handleDobDateChange = (e) => {
        setDobDate(e.target.value);
    };

    const handleDobYearChange = (e) => {
        setDobYear(e.target.value);
    };

    return (
        <div className="row">
            <div className="col-sm-5 col-xs-12">
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
                    value={lastName}
                    onChange={handleLastNameChange}
                />
                <span
                    className="field-validation-valid"
                    data-valmsg-for="flightBookingRequest.PassengerList[0].LastName"
                    data-valmsg-replace="true"
                />
                <span className="required_mobile">*</span>
            </div>
            <div className="col-sm-7 col-xs-12">
                <div className="row">
                    <div className="col-xs-12">
                        <label>
                            <span>
                                Date of Birth <small>(above 18)</small>
                            </span>
                            <span className="required">*</span>
                        </label>
                    </div>
                    <div className="col-sm-4 col-xs-4 month">
                        <div className="form-righterrow">
                            <select
                                className="Traveler"
                                data-val="true"
                                data-val-number="The field DobMonth must be a number."
                                data-val-required="The DobMonth field is required."
                                id="DobMonth_0"
                                name="flightBookingRequest.PassengerList[0].DobMonth"
                                value={dobMonth}
                                onChange={handleDobMonthChange}
                            >
                                <option value="">Month</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString('default', { month: 'short' })}
                                    </option>
                                ))}
                            </select>
                            <span
                                className="field-validation-valid"
                                data-valmsg-for="flightBookingRequest.PassengerList[0].DobMonth"
                                data-valmsg-replace="true"
                            />
                        </div>
                    </div>
                    <div className="col-sm-4 col-xs-4 day">
                        <div className="form-righterrow">
                            <select
                                className="Traveler"
                                id="DobDate_0"
                                name="flightBookingRequest.PassengerList[0].DobDate"
                                value={dobDate}
                                onChange={handleDobDateChange}
                            >
                                <option value="">Day</option>
                                {Array.from({ length: 31 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <span
                                className="field-validation-valid"
                                data-valmsg-for="flightBookingRequest.PassengerList[0].DobDate"
                                data-valmsg-replace="true"
                            />
                        </div>
                    </div>
                    <div className="col-sm-4 col-xs-4 year">
                        <div className="form-righterrow">
                            <select
                                className="Traveler"
                                id="DobYear_0"
                                name="flightBookingRequest.PassengerList[0].DobYear"
                                value={dobYear}
                                onChange={handleDobYearChange}
                            >
                                <option value="">Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
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
    );
};

export default PassengerForm;
