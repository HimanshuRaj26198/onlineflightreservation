"use client"
import Script from "next/script";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SignInComponent from "../SignIn/page";
import SignUpComponent from "../SignUp/page";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
const Navbar = () => {
    const [mobMenuOpen, setMobMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginPopupVisible, setLoginPopupVisible] = useState(false);
    const [signUpVisible, setSignUpVisible] = useState(false);
    const [user, setUser] = useState(null);

    const hideLoginPopup = () => {
        setLoginPopupVisible(false);
    }
    const hideSignUp = () => {
        setSignUpVisible(false);
    }

    const showSignUp = () => {
        setSignUpVisible(true);
        setLoginPopupVisible(false);
    }

    const showSignIn = () => {
        // setLoginPopupVisible(true);
        // setSignUpVisible(false);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (document) {
            let customScript = document.createElement("script");
            customScript.innerHTML = `
          $(window).resize(function () {
 if ($(window).width() <= 768) {
               $('.submenuLsit').hide();
            } else {
				$('.mobile-overlay').hide();
            }
			});
	$(document).ready(function() {
	
		$(".dealClick").click(function() {
			$(".submenuLsit").slideToggle();
			$(".nav.navbar-nav.navbar-right .dropdown").removeClass("open");
		});

		$('.submenuLsit a').click(function(event) {
			$('.submenuLsit').hide();
		});

		$('body').click(function(event) {
			$('.submenuLsit').hide();
		});

		$('.dealClick').click(function(event) {
			event.stopPropagation();
		});

		//Mobile Realted Deal 
			$(".dealClickMobile").click(function() {
			$(".submenuMobileLsit").slideToggle();
			$(this).toggleClass('active')
		});
		$(".submenuMobileLsit h4").click(function() {
			$(".submenuMobileLsit ul").slideUp('slow');
			$('.submenuMobileLsit h4').removeClass('active_lavel2');
			if (($(this).next(".submenuMobileLsit ul").css("display")) == "none") {
				$(this).next(".submenuMobileLsit ul").slideDown('slow');
				$(this).addClass('active_lavel2')
			}

		});
		//End
		
		//mobile menu
		//  $('.navbar-toggle').click(function(){
		// 	$(this).toggleClass('active')
		// 	$('.main_navigation').toggleClass('mainMenuopen')
		// 	$('.mobile-overlay').show();
		// 	$('.mobileMenuClose').addClass('active')
		// 	$('body').addClass('open-model')
		// });
		// $('.mobileMenuClose').click(function(){
		// 	$('.navbar-toggle').removeClass('active');
		// 	$('.main_navigation').removeClass('mainMenuopen')
		// 	$('.mobile-overlay').hide();
		// 	$('body').removeClass('open-model')
		// });
		

	});`;

            const gtag = document.createElement("script");
            gtag.src = "https://www.googletagmanager.com/gtag/js?id=AW-16665917801";

            const inlineScript = document.createElement('script');
            inlineScript.innerHTML = `
     window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'AW-16665917801');`

            //talk With Live Chat Code
            const tawktoScript = document.createElement("script");
            tawktoScript.type = "text/javascript";
            tawktoScript.innerHTML = `(function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/66bce0ce146b7af4a43a7218/1i58ssag4';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();`;

            const clarityScript = document.createElement("script");
            clarityScript.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "nrs7azjqz2");`;


            document.body.appendChild(tawktoScript);
            document.body.appendChild(clarityScript);
            document.head.appendChild(customScript);
            document.head.appendChild(gtag);
            document.head.appendChild(inlineScript);
            document.head.appendChild(clarityScript)
            document.head.appendChild(tawktoScript)
            return (() => {
                document.head.removeChild(customScript);
                document.head.removeChild(gtag);
                document.head.removeChild(inlineScript);
                document.head.removeChild(clarityScript);
                document.head.removeChild(tawktoScript);
            })

        }
    }, [])

    // Function for live chat
    const showLiveChat = () => {
        if (window.Tawk_API && window.Tawk_API.showWidget) {
            window.Tawk_API.showWidget();
            window.Tawk_API.maximize();
        }
    };
    
    return <>

        <header className="navigation_block ">
            <div className="header-call-strip">
                <a id="hdr_contactNo" href="tel:+1(888) 267-5955">
                    <img src="/assets/images/uc/animation-call-white-icon.gif" width="22" height="22" /> Call Now:
                    <span id="hdr_span">+1(888) 267-5955</span>
                </a>
            </div>
            <nav className="navbar-default navbar-static-top menuBox">
                <div className="container">
                    <div className="navbar-header">
                        <a href="#" className="chat-iconss visible-xs" style={{
                            position: "absolute",
                            right: "78px",
                            top: "-1px",
                            fontSize: "27px",
                            fontWeight: 700,
                            color: "#ff7f00"
                        }}></a>
                        <button onClick={() => setMobMenuOpen(prev => !prev)} type="button" className="navbar-toggle">
                            <span className="sr-only">Toggle navigation</span>
                            {mobMenuOpen ? <span><a href className="mobileMenuClose">X</a></span> : <><span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span></>}
                        </button>

                        <a className="navbar-brand" href="/"><img src="/assets/logo.png"
                            alt="https://onlineflightreservations.one" /></a>
                    </div>
                    <div id="navbar" className={`navbar-collapse ${mobMenuOpen ? "mainMenuOpen" : "main_navigation"}`}>
                        {/* <a href className="mobileMenuClose">X</a> */}
                        <div style={{ backgroundColor: "#0066b2" }} className="pull-right phone-number">
                            <div className="call_27">Call 24/7 for our best deals</div>
                            <a className="phoneNumber" id="nav_contactNo" href="tel:+1(888) 267-5955">
                                <img src="/assets/images/uc/newcall3a02.gif?1222" className="call-icon" />
                                +1(888) 267-5955
                            </a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/"> Flights</a></li>
                            {/* <li className="hidden-md hidden-sm hidden-xs"><a className="all-in-menu dealClick"
                                href="#" > Deals <span
                                    className="fa fa-angle-down support-icon"></span></a></li> */}
                            <li className="dropdown">
                                <a onClick={() => setDropdownOpen(prev => !prev)} className="dropdown-toggle" data-toggle="dropdown"
                                    role="button" aria-haspopup="true" aria-expanded="false">Support {dropdownOpen ? <span
                                        className="fa fa-angle-up support-icon"></span> : <span
                                            className="fa fa-angle-down support-icon"></span>}</a>
                                {dropdownOpen && <ul className="dropdown-menu">
                                    <li><a href="/contact-us" target="_blank"><i className="fa fa-address-book-o"
                                        aria-hidden="true"></i> Contact Us</a></li>
                                    <li role="separator" className="divider"></li>

                                    {/* For Live Chat  */}
                                    <a href="#" id="liveChatBtn" onClick={showLiveChat}>
                                        <i className="fa fa-comment-o" aria-hidden="true"></i> Live Chat
                                    </a>
                                </ul>}
                            </li>
                        </ul>
                    </div>

                    <ul className="profile_menu">
                        <li>
                            <div className="topmenuBox">
                                {/* <ul id="divlogin" style={{ display: "block" }}>
                                    <li style={{ cursor: "pointer" }} className="dropdown loginDropdown">
                                        {!user || !sessionStorage.getItem('user') ? <a onClick={() => setLoginPopupVisible(true)}
                                            className="login">&nbsp;<span className="hidden-xs">Sign in</span></a> : <a onClick={() => { signOut(auth); sessionStorage.removeItem("user") }}
                                                className="login">&nbsp;<span className="hidden-xs">Sign out</span></a>}
                                    </li>
                                </ul> */}
                                <ul id="divwelcome" style={{ display: "none" }}>
                                    <li className="dropdown loginDropdown">
                                        <a href="#" className="login">
                                            <span id="displayusername_mob" className="visible-xs short_name">S</span>
                                            <span className="displayusername hidden-xs"></span>&nbsp;<span
                                                className="fa fa-angle-down support-icon hidden-xs"></span>
                                        </a>
                                        <ul className="loginMenu">
                                            <li className="visible-xs mobileusername">
                                                <div className="welcomename-mobile">
                                                    <span className="displayusername"></span>
                                                </div>
                                            </li>
                                            <li><a href="us/profile/profile/mytrip.html" target="_blank">My Booking</a>
                                            </li>
                                            <li><a href="us/profile/profile/myinformation.html" target="_blank"
                                                className="myinformation">My Information</a></li>
                                            <li><a href="us/profile/profile/offers.html" target="_blank"
                                                className="reward">Latest Offer</a></li>
                                            <li id="profile_setting"><a href="us/profile/profile/settings.html"
                                                target="_blank" className="setting">Settings</a></li>
                                            <li><a href="us/profile/profile/writeus.html" target="_blank"
                                                className="deal">Write To Us</a></li>
                                            <li><a className="signout">Sign Out</a></li>
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
                            <li><a href="us/deals/deals-under-99.html">Deals Under $99</a></li>
                            <li><a href="us/deals/deals-under-199.html">Deals Under $199</a></li>
                            <li><a href="us/deals/cheap-domestic-flights.html">Cheap Domestic Flights</a></li>
                            <li><a href="us/deals/international-flights-deals.html">International Flight Deals</a></li>
                            <li><a href="us/deals/military-flight-deals.html">Military Flight Deals</a></li>
                            <li><a href="us/deals/senior-travel-deals.html">Senior Travel Deals</a></li>
                            <li><a href="us/deals/cheap-flights-for-students.html">Cheap Flights For Students</a></li>
                            <li><a href="us/deals/business-class-flight-deals.html">Business Class Flight Deals</a></li>
                            <li><a href="us/deals/first-class-deals.html">First Class Deals</a></li>
                            <li><a href="us/deals/solo-travel-deals.html">Solo Travel Deals</a></li>
                            <li><a href="us/deals/group-travel-deals.html">Group Travel Deals</a></li>
                        </ul>
                    </div>
                    <div className="block bg_gray">
                        <h4>Domestic Flights</h4>
                        <ul>
                            <li><a href="us/flights/cheap-flights-to-atlanta-atl-usa.html">Flights to Atlanta</a></li>
                            <li><a href="us/flights/cheap-flights-to-charlotte-clt-usa.html">Flights to Charlotte</a>
                            </li>
                            <li><a href="us/flights/cheap-flights-to-chicago-chi-usa.html">Flights to Chicago</a></li>
                            <li><a href="us/flights/cheap-flights-to-dallas-dfw-usa.html">Flights to Dallas</a></li>
                            <li><a href="us/flights/cheap-flights-to-detroit-dtt-usa.html">Flights to Detroit</a></li>
                            <li><a href="us/flights/cheap-flights-to-houston-hou-usa.html">Flights to Houston</a></li>
                            <li><a href="us/flights/cheap-flights-to-miami-mia-usa.html">Flights to Miami</a></li>
                            <li><a href="us/flights/cheap-flights-to-newyork-nyc-usa.html">Flights to New York</a></li>
                            <li><a href="us/flights/cheap-flights-to-san-francisco-sfo-usa.html">Flights to San
                                Francisco</a></li>
                            <li><a href="us/flights/cheap-flights-to-seattle-sea-usa.html">Flights to Seattle</a></li>
                            <li><a href="us/flights/cheap-flights-to-washington-was-usa.html">Flights to Washington</a>
                            </li>
                        </ul>
                    </div>
                    <div className="block">
                        <h4>International Flights</h4>
                        <ul>
                            <li><a href="us/flights/cheap-flights-to-london-lon-united-kingdom.html">Flights to
                                London</a></li>
                            <li><a href="us/flights/cheap-flights-to-madrid-mad-spain.html">Flights to Madrid</a></li>
                            <li><a href="us/flights/cheap-flights-to-manila-mnl-philippines.html">Flights to Manila</a>
                            </li>
                            <li><a href="us/flights/cheap-flights-to-sydney-syd-australia.html">Flights to Sydney</a>
                            </li>
                            <li><a href="us/flights/cheap-flights-to-tel-aviv-tlv-israel.html">Flights to Tel Aviv</a>
                            </li>
                            <li><a href="us/flights/cheap-flights-to-dublin-dub-ireland.html">Flights to Dublin</a></li>
                            <li><a href="us/flights/cheap-flights-to-amsterdam-ams-netherlands.html">Flights to
                                Amsterdam</a></li>
                            <li><a href="us/flights/cheap-flights-to-frankfurt-fra-germany.html">Flights to
                                Frankfurt</a></li>
                            <li><a href="us/flights/cheap-flights-to-rome-rom-italy.html">Flights to Rome</a></li>
                        </ul>
                    </div>
                    <div className="block bg_gray">
                        <h4>US Airlines</h4>
                        <ul>
                            <li><a href="us/airlines/jetblue-flights-b6.html">JetBlue Airlines</a></li>
                            <li><a href="us/airlines/united-airlines-ua.html">United Airlines</a></li>
                            <li><a href="us/airlines/american-airlines-aa.html">American Airlines</a></li>
                            <li><a href="us/airlines/spirit-airlines-nk.html">Spirit Airlines</a></li>
                            <li><a href="us/airlines/frontier-airlines-f9.html">Frontier Airlines</a></li>
                            <li><a href="us/airlines/alaska-airlines-as.html">Alaska Airlines</a></li>
                            <li><a href="us/airlines/hawaiian-airlines-ha.html">Hawaiian Airlines</a></li>
                            <li><a href="us/airlines/sun-country-airlines-sy.html">Sun Country Airlines</a></li>
                            <li><a href="us/airlines/allegiant-air-flights-g4.html">Allegiant Airlines</a></li>
                        </ul>
                    </div>
                    <div className="block">
                        <h4>Foreign Airlines</h4>
                        <ul>
                            <li><a href="us/airlines/aeromexico-flights-am.html">Aeromexico Airlines</a></li>
                            <li><a href="us/airlines/volaris-airlines-y4.html">Volaris Airlines</a></li>
                            <li><a href="us/airlines/caribbean-airlines-bw.html">Caribbean Airlines</a></li>
                            <li><a href="us/airlines/westjet-ws.html">Westjet Airlines</a></li>
                            <li><a href="us/airlines/air-india-ai.html">Air India</a></li>
                            <li><a href="us/airlines/emirates-flights-ek.html">Emirates Airlines</a></li>
                            <li><a href="us/airlines/etihad-airways-ey.html">Etihad Airways</a></li>
                            <li><a href="us/airlines/lufthansa-flights-lh.html">Lufthansa</a></li>
                            <li><a href="us/airlines/turkish-airlines-tk.html">Turkish Airlines</a></li>
                            <li><a href="us/airlines/all-nippon-airways-nh.html">All Nippon Airways</a></li>
                            <li><a href="us/airlines/cathay-pacific-flights-cx.html">Cathay Pacific Airways</a></li>
                            <li><a href="us/airlines/philippine-airlines-pr.html">Philippine Airlines</a></li>
                            <li><a href="us/airlines/british-airways-ba.html">British Airways</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </header>
        {loginPopupVisible && !signUpVisible && <SignInComponent hideLoginPopup={hideLoginPopup} showSignUp={showSignUp} />}
        {signUpVisible && !loginPopupVisible && <SignUpComponent hideSignUp={hideSignUp} showSignIn={showSignIn} />}
    </>
}

export default Navbar;