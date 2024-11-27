"use client"

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/_components/firebase/config";
import { useRouter } from "next/navigation";
import countryCodeArr from "@/assets/Country_Code.json"
import PassengerForm from "@/app/_components/PassengerForm/page";
import BillingInfo from "@/app/_components/billingInfo/page";

const PurchasePage = () => {
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [travellerDetails, setTravellerDetails] = useState({});
    const [travellersDetails, setTravellersDetails] = useState([]);
    const [isAffirmPayment, setIsAffirmPayment] = useState(false);

    const [flightDetailVisible, setFlightDetailVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [formedFilled, setFormFilled] = useState(false);
    const emailRef = useRef("");
    const phoneRef = useRef("");

    const alternateNumRef = useRef("");
    const [selectedCountry, setSelectedCountry] = useState(countryCodeArr[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpens, setIsDropdownOpens] = useState(false);

    const [isMoreInfoVisible, setIsMoreInfoVisible] = useState(false);
    const [year, setYears] = useState([]);
    const currentYear = new Date().getFullYear();
    const [mobileVisible, setMobileVisible] = useState(false);
    const [travelers, setTravelers] = useState([]);

    const cardRef = useRef("");
    const cvcRef = useRef("");
    const cvvRef = useRef("");
    const cardnoRef = useRef("");
    const expmonthRef = useRef("");

    const expyearRef = useRef("");
    const cardholdernameRef = useRef("");
    const router = useRouter();
    const tripDetails = [];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleDropdowns = () => {
        setIsDropdownOpens(!isDropdownOpens);
    };

    const styles = {
        flagDropdown: {
            position: 'relative',
            cursor: 'pointer',
        },
        selectedFlag: {
            display: 'flex',
            alignItems: 'center',
        },
        downArrow: {
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #000', // Change color as needed
            marginLeft: '60px',
        },
        countryList: {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            border: '1px solid #ccc',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
            display: isDropdownOpen ? 'block' : 'none',
        },
        countryItem: {
            padding: '10px',
            cursor: 'pointer',
        },
        countryItemHover: {
            background: '#f0f0f0',
        },
    };

    const styles1 = {
        flagDropdown: {
            position: 'relative',
            cursor: 'pointer',
        },
        selectedFlag: {
            display: 'flex',
            alignItems: 'center',
        },
        downArrow: {
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #000', // Change color as needed
            marginLeft: '120px',
        },
        countryList: {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            border: '1px solid #ccc',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
            display: isDropdownOpens ? 'block' : 'none',
        },
        countryItem: {
            padding: '10px',
            cursor: 'pointer',
        },
        countryItemHover: {
            background: '#f0f0f0',
        },
    };

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

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const phoneRegex = /^\d{10,15}$/;

        if (emailRef.current.value === "" && phoneRef.current.value === "") {
            toast.error("Please fill the billing details first!")
        } else if (!emailRegex.test(emailRef.current.value)) {
            toast.error("Please enter a valid email address!")
        } else if (!phoneRegex.test(phoneRef.current.value)) {
            toast.error("Please enter a valid phone number!")
        } else {
            const contactData = {
                Email: emailRef.current.value,
                Mobile: phoneRef.current.value,
                AlternateMobile: alternateNumRef.current.value,
                CountryCode: selectedCountry.dialCode
            };
            tripDetails.push(contactData);

            // Log the data to verify
            // console.log("CONTACT DATA: ", contactData);
            fetch("https://script.google.com/macros/s/AKfycbwVmb-Fq-ph0V-Buszfxf-iww-DuyO7M7s7APz-3-yNsDeXO3XWQCG3-djqs9kJ1X1CdA/exec",
                {
                    method: "POST",
                    body: contactData
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

    // Initialize counters and totals
    function summarizeTravelers(travelers) {
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

    console.log(selectedFlight, "SELECTED FLIGHT");
    // console.log(selectedFlight,"SELECTED FLIGHT");

    const printEvent = (e) => {
        console.log(e.target)
    };

    const gotolisting = () => {
        router.back();
    }

    // Fetch the Country Code based on current location
    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await fetch('http://ip-api.com/json');
                const data = await response.json();
                // console.log("DataGeo", data);

                if (data.status === 'fail') {
                } else {
                    const userCountryCode = data.countryCode;
                    const country = countryCodeArr.find(c => c.countryCode.toUpperCase() === userCountryCode);
                    console.log(country, "CountryCode-1");
                    setSelectedCountry(country || countryCodeArr[0]);
                }
            } catch (err) {
                console.error('Error fetching location:', err);
            } finally {
            }
        };

        getLocation();
    }, []);

    const toggleMoreInfo = (e) => {
        e.preventDefault();
        setIsMoreInfoVisible(!isMoreInfoVisible);
    };

    useEffect(() => {
        const yearList = [];
        for (let i = 0; i < 12; i++) {
            yearList.push(currentYear + i);
        }
        setYears(yearList);
    }, [currentYear]);

    // Effect to set travelers based on the details (adults, children, infants)
    useEffect(() => {
        const updatedTravelers = [];

        if (travellerDetails.adults > 0) {
            updatedTravelers.push(
                ...Array.from({ length: travellerDetails.adults }, (_, index) => ({
                    id: `adult-${index + 1}`,
                    gender: '1', // Default gender (Male)
                    title: '',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    dobMonth: '',
                    dobDate: '',
                    dobYear: '',
                    emergencyContactName: '',
                    phoneCode: '',
                    tsaPrecheckNumber: '',
                    redressNumber: '',
                    emergencyContactNumber: '',
                    travelerType: 'Adult', // Default traveler type (Adult)
                }))
            );
        }

        if (travellerDetails.child > 0) {
            updatedTravelers.push(
                ...Array.from({ length: travellerDetails.child }, (_, index) => ({
                    id: `child-${index + 1}`,
                    gender: '1', // Default gender (Male)
                    title: '',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    dobMonth: '',
                    dobDate: '',
                    dobYear: '',
                    emergencyContactName: '',
                    phoneCode: '',
                    tsaPrecheckNumber: '',
                    redressNumber: '',
                    emergencyContactNumber: '',
                    travelerType: 'Child', // Default traveler type (Child)
                }))
            );
        }

        if (travellerDetails.infant > 0) {
            updatedTravelers.push(
                ...Array.from({ length: travellerDetails.infant }, (_, index) => ({
                    id: `infant-${index + 1}`,
                    gender: '1', // Default gender (Male)
                    title: '',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    dobMonth: '',
                    dobDate: '',
                    dobYear: '',
                    emergencyContactName: '',
                    phoneCode: '',
                    tsaPrecheckNumber: '',
                    redressNumber: '',
                    emergencyContactNumber: '',
                    travelerType: 'Infant', // Default traveler type (Infant)
                }))
            );
        }

        setTravelers(updatedTravelers);
    }, [travellerDetails]);

    // Billing Info
    const [billingInfo, setBillingInfo] = useState({
        country: "",
        address: "",
        state: "",
        city: "",
        postalCode: "",
    });

    // Card Details
    const [cardDetails, setCardDetails] = useState({
        cardType: "Debit card",
        cardHolderName: "",
        cardNo: "",
        expiry: {
            month: "",
            year: "",
            cvv: "",
        },
    });

    useEffect(() => {
        console.log("Saving card details:", cardDetails);
    }, [cardDetails]);

    const handleInputChange = (e) => {
        const { value } = e.target; // Get the value from the target element
        if (e.target === cardnoRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                cardNo: value, // Update the cardNo property
            }));
        } else if (e.target === cardRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                cardType: value, // Update the cardType property
            }));
        } else if (e.target === cardholdernameRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                cardHolderName: value, // Update the cardHolderName property
            }));
        } else if (e.target === expmonthRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                expiry: {
                    ...prevDetails.expiry,
                    month: value, // Update the month property
                },
            }));
        } else if (e.target === expyearRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                expiry: {
                    ...prevDetails.expiry,
                    year: value, // Update the year property
                },
            }));
        } else if (e.target === cvvRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                expiry: {
                    ...prevDetails.expiry,
                    cvv: value, // Update the cvv property
                },
            }));
        }
    };

    // For Validation of the form
    // const validateForm = () => {
    //     const missingFields = [];

    //     // Traveler Info validation
    //     if (!travelerInfo.title) missingFields.push("Title");
    //     if (!travelerInfo.firstName) missingFields.push("First Name");
    //     if (!travelerInfo.lastName) missingFields.push("Last Name");
    //     if (!travelerInfo.gender) missingFields.push("Gender");
    //     if (
    //         !travelerInfo.dob.day ||
    //         !travelerInfo.dob.month ||
    //         !travelerInfo.dob.year
    //     ) {
    //         missingFields.push("Date of Birth");
    //     }

    //     // Card Info validation
    //     if (!cardDetails.cardHolderName) missingFields.push("Card Holder Name");
    //     if (!cardDetails.cardNo) missingFields.push("Card Number");
    //     if (
    //         !cardDetails.expiry.month ||
    //         !cardDetails.expiry.year ||
    //         !cardDetails.expiry.cvv
    //     ) {
    //         missingFields.push("Card Expiry and CVV");
    //     }

    //     // Billing Info validation
    //     if (!billingInfo.country) missingFields.push("Country");
    //     if (!billingInfo.address) missingFields.push("Address");
    //     if (!billingInfo.state) missingFields.push("State");
    //     if (!billingInfo.city) missingFields.push("City");
    //     if (!billingInfo.postalCode) missingFields.push("Postal Code");

    //     // Contact Info validation
    //     if (!contactInfo.email) missingFields.push("Email");
    //     if (contactInfo.email !== contactInfo.retypeEmail)
    //         missingFields.push("Emails do not match");

    //     if (missingFields.length > 0) {
    //         toast.error(
    //             `Please fill the following fields: ${missingFields.join(", ")}`
    //         );
    //         return false;
    //     }

    //     return true;
    // };

    const handleSubmitTravellersDetails = async () => {
        // Validate the form before submitting
        //if (validateForm()) {
        // Combine all the data into a single traveler object

        const newTraveler = {
            travelers,
            cardDetails,
            billingInfo,
        };

        // Add the new traveler to the array of travelers
        setTravellersDetails((prevState) => [...prevState, newTraveler]);
        setTravelers([]);

        // Clear individual fields after adding to the array
        setCardDetails({
            cardHolderName: "",
            cardNo: "",
            expiry: { month: "", year: "", cvv: "" },
        });

        setBillingInfo({
            country: "",
            address: "",
            state: "",
            city: "",
            postalCode: "",
        });

        alert("Traveler details have been successfully added!");
        await handleSubmit(newTraveler);  // Send email after traveler details are added
    };

    // Function to send email with the traveler details
    const handleSubmit = async (travelerData) => {


        const emailContent = `
        Hello ${travelerData.travelers[0].firstName} ${travelerData.travelers[0].lastName},
    
    Thank you for booking with us. Here are your details:
    
    Traveler Info:
    Name: ${travelerData.travelers[0].firstName} ${travelerData.travelers[0].lastName}
    Email: ${travelerData.travelers[0].email || 'Not Provided'}
    Date of Birth: ${travelerData.travelers[0].dobDay || 'Not Provided'} ${travelerData.travelers[0].dobMonth || 'Not Provided'} ${travelerData.travelers[0].dobYear || 'Not Provided'}
    Gender: ${travelerData.travelers[0].gender === '1' ? 'Male' : 'Female'} 
    Phone Code: ${travelerData.travelers[0].phoneCode || 'Not Provided'}
    
    Billing Info:
    Address: ${travelerData.billingInfo.address || 'Not Provided'}
    Country: ${travelerData.billingInfo.country || 'Not Provided'}
    State: ${travelerData.billingInfo.state || 'Not Provided'}
    City: ${travelerData.billingInfo.city || 'Not Provided'}
    Postal Code: ${travelerData.billingInfo.postalCode || 'Not Provided'}
    
    Card Info (for confirmation):
    Card Holder: ${travelerData.cardDetails.cardHolderName || 'Not Provided'}
    Card Number: ${travelerData.cardDetails.cardNo ? '**** **** **** ' + travelerData.cardDetails.cardNo.slice(-4) : 'Not Provided'}
    Card Type: ${travelerData.cardDetails.cardType || 'Not Provided'}
    Expiry Date: ${travelerData.cardDetails.expiry.month || 'MM'}/${travelerData.cardDetails.expiry.year || 'YY'} (CVV: ${travelerData.cardDetails.expiry.cvv || 'Not Provided'})
    `;

        // Sending the email
        const res = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: emailRef.current.value,
                subject: 'Booking Confirmation and Traveler Details',
                text: emailContent,
            }),
        });

        const data = await res.json();
        if (res.ok) {
            toast.success('Booking email sent successfully!');
        } else {
            toast.error(data.error || 'Something went wrong!');
        }
    };


    useEffect(() => {
        console.log("Updated travellers details:", travellersDetails);
    }, [travellersDetails]);

    // Helper function to get years for DOB
    const getYears = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 100 }, (_, index) => currentYear - index);
    };

    const years = getYears();

    // Handle input changes for each traveler
    const handleInputChanges = (travelerId, e) => {
        const { name, value } = e.target;

        // Use the travelerId to find the specific traveler and update their data
        setTravelers((prevTravelers) => {
            // Find the traveler in the array by matching the id
            const updatedTravelers = prevTravelers.map((traveler) =>
                traveler.id === travelerId
                    ? { ...traveler, [name]: value } // Update the traveler by ID
                    : traveler // Keep the rest unchanged
            );

            return updatedTravelers;
        });
    };

    const [gender, setGender] = useState([
        { id: 1, gender: '1', title: 'Mr' },
        { id: 2, gender: '2', title: 'Mrs' },
    ]);

    // Handle gender change for each traveler
    const handleGenderChange = (id, gender) => {
        const updatedTravelers = [...travelers];

        // Find the traveler with the matching id
        const travelerIndex = updatedTravelers.findIndex(traveler => traveler.id === id);

        // If the traveler is found, update their gender and title
        if (travelerIndex !== -1) {
            updatedTravelers[travelerIndex] = {
                ...updatedTravelers[travelerIndex],
                gender,
                title: gender === '1' ? 'Mr' : gender === '2' ? 'Mrs' : '',
            };

            // Update the state with the new travelers array
            setTravelers(updatedTravelers);
        }
    };

    const handleTitleChange = (id, event) => {
        const updatedTravelers = [...travelers];

        // Find the traveler with the matching id
        const travelerIndex = updatedTravelers.findIndex(traveler => traveler.id === id);

        // If the traveler is found, update their title
        if (travelerIndex !== -1) {
            updatedTravelers[travelerIndex] = {
                ...updatedTravelers[travelerIndex],
                title: event.target.value, // Update the title based on the selected value
            };

            // Update the state with the new travelers array
            setTravelers(updatedTravelers);
        }
    };

    // Handle country selection from dropdown
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        const updatedTravelers = [...travelers];
        updatedTravelers.forEach((traveler, index) => {
            traveler.phoneCode = country.dialCode;
        });
        setTravelers(updatedTravelers);
        setIsDropdownOpens(false);
    };

    // Calculate the age and set the travelerType
    const calculateAge = (dobDate, dobMonth, dobYear) => {
        const currentDate = new Date();
        const birthDate = new Date(dobYear, dobMonth - 1, dobDate); // Month is 0-based in JavaScript Date
        let age = currentDate.getFullYear() - birthDate.getFullYear();

        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        // If birthday hasn't occurred yet this year, subtract 1 from age
        if (currentMonth < birthDate.getMonth() || (currentMonth === birthDate.getMonth() && currentDay < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const getTravelerType = (dobDate, dobMonth, dobYear) => {
        const age = calculateAge(dobDate, dobMonth, dobYear);
        if (age >= 12) return 'Adult'; // Adult
        if (age >= 2) return 'Child'; // Child
        return 'Infant'; // Infant
    };

    useEffect(() => {
        // Avoid updating the state unnecessarily to prevent infinite re-renders
        setTravelers((prevTravelers) => {
            const updatedTravelers = prevTravelers.map((traveler) => {
                if (traveler.dobDate && traveler.dobMonth && traveler.dobYear) {
                    const travelerType = getTravelerType(
                        traveler.dobDate,
                        traveler.dobMonth,
                        traveler.dobYear
                    );

                    // Only update if the travelerType has actually changed
                    if (traveler.travelerType !== travelerType) {
                        return { ...traveler, travelerType };
                    }
                }
                return traveler;
            });

            // Only update if there's a change
            const isDifferent = !prevTravelers.every((traveler, index) => {
                return JSON.stringify(traveler) === JSON.stringify(updatedTravelers[index]);
            });

            // If no changes, return the previous state, otherwise return updated state
            return isDifferent ? updatedTravelers : prevTravelers;
        });
    }, [travelers]); // Include travelers as dependency to trigger when travelers change

    tripDetails.push(travelers);
    console.log(tripDetails, "TRAVELERS-DETAILS");

    const handleAffirmPayment = () => {
        console.log('Processing payment with Affirm...');

    };

    useEffect(() => {
        setIsAffirmPayment(true);
    }, []);

    const scrollToMissingField = (travelerId) => {
        const travelerForm = document.getElementById(`${travelerId}_wrapper`);
        if (travelerForm) {
            const inputs = travelerForm.querySelectorAll('input');
            for (let input of inputs) {
                // Check if the field is empty
                if (!input.value.trim()) {
                    input.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    break;
                }
            }
        }
    };

    return <>
        {selectedFlight && <div className="body-content" bis_skin_checked="1">
            <div className="payment-wrapper kaxsdc" data-event="load" bis_skin_checked={1}>
                <div className="container" bis_skin_checked={1}>
                    <div className="row" bis_skin_checked={1}>
                        <div className="col-sm-2 col-xs-12" bis_skin_checked={1}>
                            <div className="go-button">
                                <a href="#" onClick={gotolisting}>
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

                    {/* MAIN-FORM */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); // Prevent default form submission behavior
                            handleSubmitTravellersDetails(); // Call the first function
                        }}
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
                                                   
                                                    {/* Country Code */}
                                                    <div className="col-sm-3 col-xs-12">
                                                        <label>
                                                            Country code<span className="required">*</span>
                                                        </label>
                                                        <div className="country-code mb20">
                                                            <div className="intl-tel-input">
                                                                <div className="flag-dropdown f16" onClick={toggleDropdown}>
                                                                    <div className="selected-flag">
                                                                        <div className={`flag ${selectedCountry.countryCode}`} />
                                                                        <div className="down-arrow" style={styles.downArrow} />
                                                                    </div>
                                                                    <ul className={`country-list ${isDropdownOpen ? '' : 'hide'}`} style={styles.countryList}>
                                                                        {countryCodeArr.map((country) => (
                                                                            <li
                                                                                key={country.countryCode}
                                                                                className="country"
                                                                                data-dial-code={country.dialCode}
                                                                                data-country-code={country.countryCode}
                                                                                onClick={() => handleCountrySelect(country)}
                                                                            >
                                                                                <div className={`flag ${country.countryCode}`} />
                                                                                <span className="country-name">{country.name}</span>
                                                                                <span className="dial-code">{country.dialCode}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                <input
                                                                    className="nonvalidateTxt"
                                                                    id="PhoneCode"
                                                                    name="flightBookingRequest.Contact.Intcode"
                                                                    placeholder="e.g"
                                                                    readOnly
                                                                    type="tel"
                                                                    value={selectedCountry.dialCode}
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
                                    {formedFilled && <div className="form-box" bis_skin_checked={1} >
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

                                        {travelers.length > 0 && (
                                            <>
                                                {/* New Section for Adult */}
                                                {travelers.filter(traveler => traveler.travelerType === 'Adult').map((adult, index) => (
                                                    <div key={adult.id}>

                                                        <div className="head" id="p0_wrapper" bis_skin_checked={1}>
                                                            {adult.travelerType} {index + 1}
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
                                                                                value="1"
                                                                                checked={adult.gender === '1'}
                                                                                onChange={() => handleGenderChange(adult.id, '1')}
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
                                                                                value="2"
                                                                                checked={adult.gender === '2'}
                                                                                onChange={() => handleGenderChange(adult.id, '2')}
                                                                            />
                                                                            <span>Female</span>
                                                                        </label>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix" bis_skin_checked={1} />
                                                        </div>

                                                        <div className="row" bis_skin_checked={1}>

                                                            <div className="col-sm-2 col-xs-12">
                                                                <label>
                                                                    Title
                                                                    <span className="required">*</span>
                                                                </label>
                                                                <div className="form-righterrow">
                                                                    <select
                                                                        className=""
                                                                        id="flightBookingRequest_PassengerList_0__Title"
                                                                        name="flightBookingRequest.PassengerList[0].Title"
                                                                        onChange={(e) => handleTitleChange(adult.id, e)}
                                                                        value={adult.title}
                                                                    >
                                                                        <option value="">Title</option>
                                                                        {adult.gender === '1' && (
                                                                            <option value="Mr">Mr</option>
                                                                        )}
                                                                        {adult.gender === '2' && (
                                                                            <option value="Mrs">Mrs</option>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
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
                                                                    name="firstName"
                                                                    value={adult.firstName}
                                                                    onChange={(e) => handleInputChanges(adult.id, e)}
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
                                                                    name="middleName"
                                                                    value={adult.middleName}
                                                                    onChange={(e) => handleInputChanges(adult.id, e)}
                                                                    onBlur={(e) => printEvent(e)}
                                                                    placeholder="Middle Name (Optional)"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                            </div>

                                                        </div>
                                                        {/* Passenger Form */}
                                                        <PassengerForm
                                                            index={adult.id}
                                                            lastName={adult.lastName}
                                                            dobMonth={adult.dobMonth}
                                                            dobDate={adult.dobDate}
                                                            dobYear={adult.dobYear}
                                                            handleInputChanges={handleInputChanges} />
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

                                                        <div className="imp-msg">
                                                            {/* More Info Link */}
                                                            <div className="more-info">
                                                                <a
                                                                    href="#pasngrOD_0"
                                                                    id="pasngrMI_0"
                                                                    onClick={toggleMoreInfo}
                                                                    style={{ cursor: 'pointer' }}
                                                                >
                                                                    {isMoreInfoVisible ? '(-) Hide Info' : '(+) More Info'}
                                                                </a>
                                                                <small className="ffsmall_text">
                                                                    (Optional TSA Precheck and Redress Number)
                                                                </small>
                                                            </div>

                                                            {/* The additional info section that can be toggled */}
                                                            {isMoreInfoVisible && (
                                                                <div id="pasngrOD_0" className="pasngrOD_0">
                                                                    <div className="row" id="emergency_0">
                                                                        <div className="col-sm-5 col-xs-12">
                                                                            <label>Emergency contact name</label>
                                                                            <input
                                                                                className="alphanumeric nonvalidateTxt"
                                                                                id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                name="emergencyContactName"
                                                                                placeholder="Name"
                                                                                type="text"
                                                                                value={adult.emergencyContactName}
                                                                                onChange={(e) => handleInputChanges(adult.id, e)}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-7 col-xs-12">
                                                                            <div className="row">
                                                                                <div className="col-sm-5 col-xs-12">
                                                                                    <label>Country code</label>
                                                                                    <div className="country-code mb20">
                                                                                        <div className="intl-tel-input">
                                                                                            <div className="flag-dropdown f16" onClick={toggleDropdowns}>
                                                                                                <div className="selected-flag">
                                                                                                    <div className={`flag ${selectedCountry.countryCode}`} />
                                                                                                    <div className="down-arrow" style={styles1.downArrow} />
                                                                                                </div>
                                                                                                <ul className={`country-list ${isDropdownOpens ? '' : 'hide'}`} style={styles1.countryList}>
                                                                                                    {countryCodeArr.map((country) => (
                                                                                                        <li
                                                                                                            key={country.countryCode}
                                                                                                            className="country"
                                                                                                            data-dial-code={country.dialCode}
                                                                                                            data-country-code={country.countryCode}
                                                                                                            onClick={() => handleCountrySelect(country)}
                                                                                                        >
                                                                                                            <div className={`flag ${country.countryCode}`} />
                                                                                                            <span className="country-name">{country.name}</span>
                                                                                                            <span className="dial-code">{country.dialCode}</span>
                                                                                                        </li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            </div>
                                                                                            <input
                                                                                                className="nonvalidateTxt"
                                                                                                id={`PhoneCode_${index}`}
                                                                                                name="phoneCode"
                                                                                                placeholder="e.g"
                                                                                                readOnly
                                                                                                type="tel"
                                                                                                value={adult.phoneNumber}
                                                                                                onChange={(e) => handleInputChanges(adult.id, e)}

                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-7 col-xs-12">
                                                                                    <label>Emergency contact number</label>
                                                                                    <input
                                                                                        className="alphanumeric nonvalidateTxt"
                                                                                        id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                        name="emergencyContactNumber"
                                                                                        placeholder="Name"
                                                                                        type="text"
                                                                                        value={adult.emergencyContactNumber}
                                                                                        onChange={(e) => handleInputChanges(adult.id, e)}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-sm-6 col-xs-12">
                                                                                    <label>
                                                                                        TSA Precheck
                                                                                        <span className="tooltip-custom">
                                                                                            <i className="fa fa-info hand" />
                                                                                            <div className="promo-detail tsa_tooltip">
                                                                                                <span className="arrow" />
                                                                                                <p className="mb5px" style={{ textAlign: 'left' }}>
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
                                                                                        id={`flightBookingRequest_PassengerList_${index}__TSAPrecheckNumber`}
                                                                                        name="tsaPrecheckNumber"
                                                                                        placeholder="Known Traveler Number (Optional)"
                                                                                        type="text"
                                                                                        value={adult.tsaPrecheckNumber}
                                                                                        onChange={(e) => handleInputChanges(adult.id, e)}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-sm-6 col-xs-12">
                                                                                    <label>
                                                                                        Redress number
                                                                                        <span className="tooltip-custom">
                                                                                            <i className="fa fa-info hand" />
                                                                                            <div className="promo-detail tsa_tooltip">
                                                                                                <span className="arrow" />
                                                                                                <p className="mb5px" style={{ textAlign: 'left' }}>
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
                                                                                        id={`flightBookingRequest_PassengerList_${index}__TSARedressNumber`}
                                                                                        name="redressNumber"
                                                                                        placeholder="(Optional)"
                                                                                        type="number"
                                                                                        value={adult.redressNumber}
                                                                                        onChange={(e) => handleInputChanges(adult.id, e)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* {travelers.length > 1 && (
                                                    <button type="button" onClick={() => removeAdult(travelers.length - 1)} style={buttonStyle}>
                                                        Remove Last Traveller
                                                    </button>

                                                )} */}
                                                    </div>
                                                ))}

                                                {/* New Section for Child */}
                                                {travelers.filter(traveler => traveler.travelerType === 'Child').map((child, index) => (
                                                    <div key={child.id}>

                                                        <div className="head" id="p0_wrapper" bis_skin_checked={1}>
                                                            {child.travelerType} {index + 1}
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
                                                                                value="1"
                                                                                checked={child.gender === '1'}
                                                                                onChange={() => handleGenderChange(child.id, '1')}
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
                                                                                value="2"
                                                                                checked={child.gender === '2'}
                                                                                onChange={() => handleGenderChange(child.id, '2')}
                                                                            />
                                                                            <span>Female</span>
                                                                        </label>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix" bis_skin_checked={1} />
                                                        </div>
                                                        <div className="row" bis_skin_checked={1}>
                                                            <div className="col-sm-2 col-xs-12">
                                                                <label>
                                                                    Title
                                                                    <span className="required">*</span>
                                                                </label>
                                                                <div className="form-righterrow">
                                                                    <select
                                                                        className=""
                                                                        id="flightBookingRequest_PassengerList_0__Title"
                                                                        name="flightBookingRequest.PassengerList[0].Title"
                                                                        onChange={(e) => handleTitleChange(child.id, e)}
                                                                        value={child.title}
                                                                    >
                                                                        <option value="">Title</option>
                                                                        {child.gender === '1' && (
                                                                            <option value="Mr">Mr</option>
                                                                        )}
                                                                        {child.gender === '2' && (
                                                                            <option value="Mrs">Mrs</option>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
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
                                                                    name="firstName"
                                                                    value={child.firstName}
                                                                    onChange={(e) => handleInputChanges(child.id, e)}
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
                                                                    name="middleName"
                                                                    value={child.middleName}
                                                                    onChange={(e) => handleInputChanges(child.id, e)}
                                                                    onBlur={(e) => printEvent(e)}
                                                                    placeholder="Middle Name (Optional)"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* Passenger Form */}
                                                        <PassengerForm
                                                            index={child.id}
                                                            lastName={child.lastName}
                                                            dobMonth={child.dobMonth}
                                                            dobDate={child.dobDate}
                                                            dobYear={child.dobYear}
                                                            handleInputChanges={handleInputChanges} />

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
                                                        <div className="imp-msg">
                                                            {/* More Info Link */}
                                                            <div className="more-info">
                                                                <a
                                                                    href="#pasngrOD_0"
                                                                    id="pasngrMI_0"
                                                                    onClick={toggleMoreInfo}
                                                                    style={{ cursor: 'pointer' }}
                                                                >
                                                                    {isMoreInfoVisible ? '(-) Hide Info' : '(+) More Info'}
                                                                </a>
                                                                <small className="ffsmall_text">
                                                                    (Optional TSA Precheck and Redress Number)
                                                                </small>
                                                            </div>

                                                            {/* The additional info section that can be toggled */}
                                                            {isMoreInfoVisible && (
                                                                <div id="pasngrOD_0" className="pasngrOD_0">
                                                                    <div className="row" id="emergency_0">
                                                                        <div className="col-sm-5 col-xs-12">
                                                                            <label>Emergency contact name</label>
                                                                            <input
                                                                                className="alphanumeric nonvalidateTxt"
                                                                                id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                name="emergencyContactName"
                                                                                placeholder="Name"
                                                                                type="text"
                                                                                value={child.emergencyContactName}
                                                                                onChange={(e) => handleInputChanges(child.id, e)}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-7 col-xs-12">
                                                                            <div className="row">
                                                                                <div className="col-sm-5 col-xs-12">
                                                                                    <label>Country code</label>
                                                                                    <div className="country-code mb20">
                                                                                        <div className="intl-tel-input">
                                                                                            <div className="flag-dropdown f16" onClick={toggleDropdowns}>
                                                                                                <div className="selected-flag">
                                                                                                    <div className={`flag ${selectedCountry.countryCode}`} />
                                                                                                    <div className="down-arrow" style={styles1.downArrow} />
                                                                                                </div>
                                                                                                <ul className={`country-list ${isDropdownOpens ? '' : 'hide'}`} style={styles1.countryList}>
                                                                                                    {countryCodeArr.map((country) => (
                                                                                                        <li
                                                                                                            key={country.countryCode}
                                                                                                            className="country"
                                                                                                            data-dial-code={country.dialCode}
                                                                                                            data-country-code={country.countryCode}
                                                                                                            onClick={() => handleCountrySelect(country)}
                                                                                                        >
                                                                                                            <div className={`flag ${country.countryCode}`} />
                                                                                                            <span className="country-name">{country.name}</span>
                                                                                                            <span className="dial-code">{country.dialCode}</span>
                                                                                                        </li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            </div>
                                                                                            <input
                                                                                                className="nonvalidateTxt"
                                                                                                id={`PhoneCode_${index}`}
                                                                                                name="phoneCode"
                                                                                                placeholder="e.g"
                                                                                                readOnly
                                                                                                type="tel"
                                                                                                value={child.phoneNumber}
                                                                                                onChange={(e) => handleInputChanges(child.id, e)}

                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-7 col-xs-12">
                                                                                    <label>Emergency contact number</label>
                                                                                    <input
                                                                                        className="alphanumeric nonvalidateTxt"
                                                                                        id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                        name="emergencyContactNumber"
                                                                                        placeholder="Name"
                                                                                        type="text"
                                                                                        value={child.emergencyContactNumber}
                                                                                        onChange={(e) => handleInputChanges(child.id, e)}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-sm-6 col-xs-12">
                                                                                    <label>
                                                                                        TSA Precheck
                                                                                        <span className="tooltip-custom">
                                                                                            <i className="fa fa-info hand" />
                                                                                            <div className="promo-detail tsa_tooltip">
                                                                                                <span className="arrow" />
                                                                                                <p className="mb5px" style={{ textAlign: 'left' }}>
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
                                                                                        id={`flightBookingRequest_PassengerList_${index}__TSAPrecheckNumber`}
                                                                                        name="tsaPrecheckNumber"
                                                                                        placeholder="Known Traveler Number (Optional)"
                                                                                        type="text"
                                                                                        value={child.tsaPrecheckNumber}
                                                                                        onChange={(e) => handleInputChanges(child.id, e)}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-sm-6 col-xs-12">
                                                                                    <label>
                                                                                        Redress number
                                                                                        <span className="tooltip-custom">
                                                                                            <i className="fa fa-info hand" />
                                                                                            <div className="promo-detail tsa_tooltip">
                                                                                                <span className="arrow" />
                                                                                                <p className="mb5px" style={{ textAlign: 'left' }}>
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
                                                                                        id={`flightBookingRequest_PassengerList_${index}__TSARedressNumber`}
                                                                                        name="redressNumber"
                                                                                        placeholder="(Optional)"
                                                                                        type="number"
                                                                                        value={child.redressNumber}
                                                                                        onChange={(e) => handleInputChanges(child.id, e)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* {travelers.length > 1 && (
                                                    <button type="button" onClick={() => removeAdult(travelers.length - 1)} style={buttonStyle}>
                                                        Remove Last Traveller
                                                    </button>

                                                )} */}
                                                    </div>
                                                ))}

                                                {/* New Section for Infant */}
                                                {travelers.filter(traveler => traveler.travelerType === 'Infant').map((Infant, index) => (
                                                    <div key={Infant.id}>

                                                        <div className="head" id="p0_wrapper" bis_skin_checked={1}>
                                                            {Infant.travelerType} {index + 1}
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
                                                                                value="1"
                                                                                checked={Infant.gender === '1'}
                                                                                onChange={() => handleGenderChange(Infant.id, '1')}
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
                                                                                value="2"
                                                                                checked={Infant.gender === '2'}
                                                                                onChange={() => handleGenderChange(Infant.id, '2')}
                                                                            />
                                                                            <span>Female</span>
                                                                        </label>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="clearfix" bis_skin_checked={1} />
                                                        </div>
                                                        <div className="row" bis_skin_checked={1}>
                                                            <div className="col-sm-2 col-xs-12">
                                                                <label>
                                                                    Title
                                                                    <span className="required">*</span>
                                                                </label>
                                                                <div className="form-righterrow">
                                                                    <select
                                                                        className=""
                                                                        id="flightBookingRequest_PassengerList_0__Title"
                                                                        name="flightBookingRequest.PassengerList[0].Title"
                                                                        onChange={(e) => handleTitleChange(Infant.id, e)}
                                                                        value={Infant.title}
                                                                    >
                                                                        <option value="">Title</option>
                                                                        {Infant.gender === '1' && (
                                                                            <option value="Mr">Mr</option>
                                                                        )}
                                                                        {Infant.gender === '2' && (
                                                                            <option value="Mrs">Mrs</option>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
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
                                                                    name="firstName"
                                                                    value={Infant.firstName}
                                                                    onChange={(e) => handleInputChanges(Infant.id, e)}
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
                                                                    name="middleName"
                                                                    value={Infant.middleName}
                                                                    onChange={(e) => handleInputChanges(Infant.id, e)}
                                                                    onBlur={(e) => printEvent(e)}
                                                                    placeholder="Middle Name (Optional)"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* Passenger Form */}
                                                        <PassengerForm
                                                            index={Infant.id}
                                                            lastName={Infant.lastName}
                                                            dobMonth={Infant.dobMonth}
                                                            dobDate={Infant.dobDate}
                                                            dobYear={Infant.dobYear}
                                                            handleInputChanges={handleInputChanges} />

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
                                                        <div className="imp-msg">
                                                            {/* More Info Link */}
                                                            <div className="more-info">
                                                                <a
                                                                    href="#pasngrOD_0"
                                                                    id="pasngrMI_0"
                                                                    onClick={toggleMoreInfo}
                                                                    style={{ cursor: 'pointer' }}
                                                                >
                                                                    {isMoreInfoVisible ? '(-) Hide Info' : '(+) More Info'}
                                                                </a>
                                                                <small className="ffsmall_text">
                                                                    (Optional TSA Precheck and Redress Number)
                                                                </small>
                                                            </div>

                                                            {/* The additional info section that can be toggled */}
                                                            {isMoreInfoVisible && (
                                                                <div id="pasngrOD_0" className="pasngrOD_0">
                                                                    <div className="row" id="emergency_0">
                                                                        <div className="col-sm-5 col-xs-12">
                                                                            <label>Emergency contact name</label>
                                                                            <input
                                                                                className="alphanumeric nonvalidateTxt"
                                                                                id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                name="emergencyContactName"
                                                                                placeholder="Name"
                                                                                type="text"
                                                                                value={Infant.emergencyContactName}
                                                                                onChange={(e) => handleInputChanges(Infant.id, e)}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-7 col-xs-12">
                                                                            <div className="row">
                                                                                <div className="col-sm-5 col-xs-12">
                                                                                    <label>Country code</label>
                                                                                    <div className="country-code mb20">
                                                                                        <div className="intl-tel-input">
                                                                                            <div className="flag-dropdown f16" onClick={toggleDropdowns}>
                                                                                                <div className="selected-flag">
                                                                                                    <div className={`flag ${selectedCountry.countryCode}`} />
                                                                                                    <div className="down-arrow" style={styles1.downArrow} />
                                                                                                </div>
                                                                                                <ul className={`country-list ${isDropdownOpens ? '' : 'hide'}`} style={styles1.countryList}>
                                                                                                    {countryCodeArr.map((country) => (
                                                                                                        <li
                                                                                                            key={country.countryCode}
                                                                                                            className="country"
                                                                                                            data-dial-code={country.dialCode}
                                                                                                            data-country-code={country.countryCode}
                                                                                                            onClick={() => handleCountrySelect(country)}
                                                                                                        >
                                                                                                            <div className={`flag ${country.countryCode}`} />
                                                                                                            <span className="country-name">{country.name}</span>
                                                                                                            <span className="dial-code">{country.dialCode}</span>
                                                                                                        </li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            </div>
                                                                                            <input
                                                                                                className="nonvalidateTxt"
                                                                                                id={`PhoneCode_${index}`}
                                                                                                name="phoneCode"
                                                                                                placeholder="e.g"
                                                                                                readOnly
                                                                                                type="tel"
                                                                                                value={Infant.phoneNumber}
                                                                                                onChange={(e) => handleInputChanges(Infant.id, e)}

                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-7 col-xs-12">
                                                                                    <label>Emergency contact number</label>
                                                                                    <input
                                                                                        className="alphanumeric nonvalidateTxt"
                                                                                        id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                        name="emergencyContactNumber"
                                                                                        placeholder="Name"
                                                                                        type="text"
                                                                                        value={Infant.emergencyContactNumber}
                                                                                        onChange={(e) => handleInputChanges(Infant.id, e)}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-sm-6 col-xs-12">
                                                                                    <label>
                                                                                        TSA Precheck
                                                                                        <span className="tooltip-custom">
                                                                                            <i className="fa fa-info hand" />
                                                                                            <div className="promo-detail tsa_tooltip">
                                                                                                <span className="arrow" />
                                                                                                <p className="mb5px" style={{ textAlign: 'left' }}>
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
                                                                                        id={`flightBookingRequest_PassengerList_${index}__TSAPrecheckNumber`}
                                                                                        name="tsaPrecheckNumber"
                                                                                        placeholder="Known Traveler Number (Optional)"
                                                                                        type="text"
                                                                                        value={Infant.tsaPrecheckNumber}
                                                                                        onChange={(e) => handleInputChanges(Infant.id, e)}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-sm-6 col-xs-12">
                                                                                    <label>
                                                                                        Redress number
                                                                                        <span className="tooltip-custom">
                                                                                            <i className="fa fa-info hand" />
                                                                                            <div className="promo-detail tsa_tooltip">
                                                                                                <span className="arrow" />
                                                                                                <p className="mb5px" style={{ textAlign: 'left' }}>
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
                                                                                        id={`flightBookingRequest_PassengerList_${index}__TSARedressNumber`}
                                                                                        name="redressNumber"
                                                                                        placeholder="(Optional)"
                                                                                        type="number"
                                                                                        value={Infant.redressNumber}
                                                                                        onChange={(e) => handleInputChanges(Infant.id, e)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* {travelers.length > 1 && (
                                                    <button type="button" onClick={() => removeAdult(travelers.length - 1)} style={buttonStyle}>
                                                        Remove Last Traveller
                                                    </button>

                                                )} */}
                                                    </div>
                                                ))}
                                            </>
                                        )}


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
                                                {/* CHANGHES 2 */}
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
                                            {/* Billing Information */}
                                            <BillingInfo
                                                setBillingInfo={setBillingInfo}
                                                billingInfo={billingInfo}
                                            />

                                            {/* PAYMENT DETAILS */}

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
                                                                src="https://www.lookbyfare.com/us/images/card-icon/debitcard-blank.svg?v=1.2"
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
                                                                    ref={cardRef}
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
                                                                <img src="https://www.lookbyfare.com/us/images/payment/card-sprite.png?v=1.2" />
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
                                                                        ref={cardnoRef}
                                                                        onChange={handleInputChange}
                                                                        value={cardDetails.cardNo}
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
                                                                            ref={cvcRef}
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
                                                                    placeholder="Card holder's name"
                                                                    type="text"
                                                                    defaultValue=""
                                                                    ref={cardholdernameRef}
                                                                    onChange={handleInputChange}
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
                                                                    src="https://www.lookbyfare.com/us/images/footer/security-metrices-blue.svg"
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
                                                                            ref={expmonthRef}
                                                                            value={cardDetails.expiry.month}
                                                                            onChange={handleInputChange}
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
                                                                    <div className="form-righterrow">
                                                                        <select
                                                                            className="Payment"
                                                                            id="flightBookingRequest_Payment_ExpiryYear"
                                                                            name="flightBookingRequest.Payment.ExpiryYear"
                                                                            defaultValue=""
                                                                            ref={expyearRef}
                                                                            value={cardDetails.expiry.year}
                                                                            onChange={handleInputChange}
                                                                        >
                                                                            <option value="">Select</option>
                                                                            {year.map((year) => (
                                                                                <option key={year} value={year}>
                                                                                    {year}
                                                                                </option>
                                                                            ))}
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
                                                                        ref={cvvRef}
                                                                        value={cardDetails.expiry.cvv}
                                                                        onChange={handleInputChange}
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
                                                                <img src="https://www.lookbyfare.com/us/images/payment/cvv.png" />
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
                                                            src="https://www.lookbyfare.com/us/images/payment/godaddy.png"
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
                                                {travelers.map((traveler, index) => (
                                                    <div className="head" key={traveler.id}>
                                                        <p id="pxdtails">
                                                            <span>
                                                                {traveler.travelerType} {index + 1} -{' '}
                                                                <span id={`p0_confirm_name_${traveler.id}`}>
                                                                    {traveler.firstName && traveler.lastName
                                                                        ? `${traveler.firstName} ${traveler.lastName}`
                                                                        : 'Missing name'}
                                                                </span>

                                                                <a
                                                                    href="javascript:void(0);"
                                                                    onClick={() => scrollToMissingField(traveler.id)}

                                                                >
                                                                    (make changes)
                                                                </a>
                                                            </span>
                                                            <br />
                                                        </p>

                                                    </div>
                                                ))}
                                                <div className="imp-msg" bis_skin_checked={1}>
                                                    <div className="tnc-txt" bis_skin_checked={1}>
                                                        {/* Desktop View */}
                                                        {!mobileVisible && (
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
                                                        )}


                                                        {mobileVisible && (
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
                                                        )}
                                                        <div className="clearfix" bis_skin_checked={1} />
                                                    </div>
                                                </div>
                                                <div className="step-continue" bis_skin_checked={1}>
                                                    <button
                                                        className="main-btn pay-cc"
                                                        id="btnBookNow"
                                                        name="btnBookNow"
                                                    >
                                                        <i className="fa fa-lock" aria-hidden="true" /> Book Now
                                                    </button>

                                                    {!isAffirmPayment && (
                                                        <button
                                                            className="main-btn pay-affirm"
                                                            type="button"
                                                            onClick={handleAffirmPayment}
                                                        >
                                                            Book with <span className="affirm-btn" />
                                                        </button>
                                                    )}
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