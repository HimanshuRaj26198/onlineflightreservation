//Tab
var sopen = false;
var googleUser = {};
 var lc = location.href;
$(document).ready(function () {
$('#someDivId').load(atob('L3VzL2xvZ2luLmh0bWw/dj0yLjAw'));
gapi.load('auth2', function () {
       auth2 = gapi.auth2.init({
           client_id: '203058158698-l0jmp4qerb7r7ugmcr3hp7uad3lbo589.apps.googleusercontent.com',
           cookiepolicy: 'single_host_origin',
       });
       setTimeout(function () { attachSignin(document.getElementById('gsign')); attachSignin(document.getElementById('gsigup')); }, 1000); });
    //$('.tabContent').hide();
    //$('.tabContent:first').show();
    $('.tabs li a').click(function () {
        var t = $(this).attr('id');
        $('.tabContent').hide();
        $('.tabContent2').hide();
        $('#' + t + 'C').fadeIn('slow');
        $('.tabs li a').removeClass('active');
        $(this).addClass('active');
    });
    //Edit hide
    $('.edit').click(function () {
        $(this).hide();
    });

    //Edit show
    $('.button').click(function () {
        $('.edit').show();
    });

    //
    //$(".loginBar li").hover(function () {
    //    $('.overlay').show();
    //}, function () {
    //    $('.overlay').hide();
    //});

    //random
    var classes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ];
    $(".changeColor").each(function () {
        if (classes.length === 0) return false; // break jQuery each

        var index = Math.floor(Math.random() * classes.length);
        var className = classes[index];

        console.log(className);
        $(this).addClass(className);
        classes.splice(index, 1);
    });
    $(".login").click(function () {
        $(".loginMenu").toggle();
    });
    $(document).click(function (e) {
		 try {
        if (!$(event.target).parents().addBack().is('.loginDropdown')) {
            $('.loginMenu').hide();
        }
		} catch (e) {

            }
    });

});//documnet close

// Dynamic div slide
function showdiv(id, id1) {
    $("#" + id).slideDown('slow');//fadein
    $("#" + id1).slideUp('slow');//fadeout
}

function hidediv(id, id2) {
    $("#" + id).slideUp('slow');//fadeout
    $("#" + id2).slideDown('slow');//fadein
}

    

function showModalprofile(id, id1) {
    reset();
    $("#" + id).fadeIn('slow');
    $("#" + id1).fadeOut('slow');
try{	
    if (lc.indexOf("search") != -1 && lc.indexOf("purchase") != -1) {
	  shenable();
	}
}catch(e){}
}
function hideModal(id) {
    reset();
    $("#" + id).fadeOut('slow');
 if (isMob == 1) {
        try {
			if (lc.indexOf("search") != -1 && lc.indexOf("purchase") != -1) {
           history.back();	
			}		   
            Window.removeEventListener("hashchange", hndlsn);
			
        } catch (e) {
        }
    }
}

function showScreen(id, id1) {
    $("#" + id).show('slow');
    $("#" + id1).hide('slow');
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function validatePass(pswd) {
    if (pswd.length < 4) {
        return false;
    }
    if (pswd.length > 4) {
        return false;
    }
    if (!pswd.match(/[0-9]/)) {
        return false;
    }

    return true;
}
function confirmvalidatePass(pswd, confpswd) {
    if (pswd != confpswd) {
        return false;
    }
    return true;
}
function isNumeric(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
};
function removeloginvalid(id) {
    $("#" + id).hover(function () {
    }, function () {      
            $(this).css({ 'border': "1px solid #ccc" });
            $(this).nextAll(".error_text").first().css({ 'display': "none" })        
    });
}


function CrearteProfile() {
    var status = true;
    if (!isEmail($('#UserName').val())) {
        $('#UserName').focus();
        $('#UserName').css({ 'border': "solid 1px red" });
        $("#UserName").nextAll(".error_text").first().css({ 'display': "block" })
        status = false;
    }
    else { $('#UserName').css({ 'border': "1px solid #ccc" }); }
    if ($('#FirstName').val() == "") {
        $('#FirstName').focus();
        $('#FirstName').css({ 'border': "solid 1px red" });
        $("#FirstName").nextAll(".error_text").first().css({ 'display': "block" })
        status = false;
    }
    else { $('#FirstName').css({ 'border': "1px solid #ccc" }); }
    if ($('#LastName').val() == "") {
        $('#LastName').focus();
        $('#LastName').css({ 'border': "solid 1px red" });
        $("#LastName").nextAll(".error_text").first().css({ 'display': "block" })
        status = false;
    }
    else { $('#LastName').css({ 'border': "1px solid #ccc" }); }
    if (!validatePass($('#Password').val())) {
        $('#Password').focus();
        $('.error').css('display', 'block');
        $('#Password').css({ 'border': "solid 1px red" });
        $("#Password").nextAll(".error_text").first().css({ 'display': "block" })
        status = false;
    }
    else { $('#Password').css({ 'border': "1px solid #ccc" }); }
    if (!confirmvalidatePass($('#Password').val(), $("#ConfirmPassword").val())) {
        $('#ConfirmPassword').focus();
        $('#ConfirmPassword').css({ 'border': "solid 1px red" });
        //$("#ConfirmPassword").nextAll(".error_text").first().text($("#ConfirmPassword").val() != "Confirm pin must be match with original pin" ? "" : "Please enter your confirm pin");
        $("#ConfirmPassword").nextAll(".error_text").first().css({ 'display': "block" })
        status = false;
    }
    else { $('#ConfirmPassword').css({ 'border': "1px solid #ccc" }); }
    if (status == true) {
        $('.button_loding_div').css({ 'display': "block" })
        var request = {
            SiteID: 160,
            UserName: $("#UserName").val(),
            Password: $("#Password").val(),
            FirstName: $("#FirstName").val(),
            LastName: $("#LastName").val(),
        };
        let dtareq = window.btoa(JSON.stringify(request));
        $.ajax({
            url: "/us/home/createprofile",
            method: "POST",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          //  contentType: "application/json;",
           // data: JSON.stringify(request),
            data: {
                Userdata: dtareq
            },
            success: function (data) {               
                if (data.user.Error == null) {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    $('.button_loding_div').css({ 'display': "none" })
                    hideModal('singUp')
                    $("#divwelcome").css('display', 'block');
                    $("#divlogin").css('display', 'none');
                    $("#flightBookingRequest_Contact_Email,#Contact_Email").val(data.user.ProfileInfo.Email);
                  //  $("#displayusername").text('Welcome ' + data.user.ProfileInfo.FirstName);
                    setUserName(data.user.ProfileInfo.FirstName);
                    $("#profile_setting").css('display', 'block');
                    if (data.user.ProfileInfo.socailmedia == true) {
                        $("#profile_setting").css('display', 'none');
                    }
                    showallmess("Sign In Successful");
                }
                else {
                    $("#Message").css('display', 'block');
                    $('.button_loding_div').css({ 'display': "none" })
                    $("#Message").text(data.user.Error.ErrorDetail);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    else { return false; }

}


function login() {
    var status = true;
    if (!isEmail($('#loginUsername').val())) {
        $('#loginUsername').focus();
        $('#loginUsername').css({ 'border': "solid 1px red" });
        $("#loginUsername").nextAll(".error_text").first().css({ 'display': "block" })
        status = false;
    }
    else { $('#loginUsername').css({ 'border': "1px solid #ccc" }); }
    if (!validatePass($('#loginPassword').val())) {
        $('#loginPassword').focus();
        $('.error').css('display', 'block');
        $('#loginPassword').css({ 'border': "solid 1px red" });
        $("#loginPassword").nextAll(".error_text").first().css({ 'display': "block" })
        status = false;
    }
    else { $('#loginPassword').css({ 'border': "1px solid #ccc" }); }

    if (status == true) {
        var request = {
            SiteID: 160,
            UserName: window.btoa($("#loginUsername").val()),
            Password: window.btoa($("#loginPassword").val()),
        };
        let dtareq = window.btoa(JSON.stringify(request));
        $('.button_loding_div').css({ 'display': "block" })
        $.ajax({
            url: "/us/home/loginprofile",
            method: "POST",
           /* contentType: "application/json;",*/
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            //data:JSON.stringify(request),
            data: {
                Userdata: dtareq
            },          
            success: function (data) {               
                if (data.user.Error == null) {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    hideModal('signIn')
                    $("#divwelcome").css('display', 'block');
                    $("#divlogin").css('display', 'none');
                    $('.button_loding_div').css({ 'display': "none" })
                    $("#flightBookingRequest_Contact_Email,#Contact_Email").val(data.user.ProfileInfo.Email);
                    //  $("#displayusername").text('Welcome ' + data.user.ProfileInfo.FirstName);
                    setUserName(data.user.ProfileInfo.FirstName);
                    $("#profile_setting").css('display', 'block');
                    if (data.user.ProfileInfo.socailmedia == true) {
                        $("#profile_setting").css('display', 'none');
                    }
                    showallmess("Sign In Successful");
                }
                else {
                    $("#Messagelogin").css('display', 'block');
                    $('.button_loding_div').css({ 'display': "none" })
					if(data.user.Error != null && data.user.Error.ErrorCode=="IN002006")
					{$("#Messagelogin").text("User Not Found, Please Sign up");}
				else if(data.user.Error != null && data.user.Error.ErrorCode=="IN002008")
				{ 
			           showModalprofile('forgot_popup', 'signIn', 'firstScreen');
                        $("#Messagelogin").css('display', 'none');                       
                        $("#MessageForgot").css('display', 'block');
                        $("#MessageForgot").text("You cannot access your profile as the wrong pin has been keyed in by you. Please fill in your email id to change the pin and access your account.");
       			}
				else{
                    $("#Messagelogin").text("Invalid credentials provided. Please try again");
				}
				$("#loginUsername").val('');
             $("#loginPassword").val('');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    else { return false; }

}


$(document).ready(function () { 
    var dats = JSON.parse(localStorage.getItem('currentUser'));
    if (dats != null && dats.user.ProfileInfo != null) {
        var d = new Date();
        var totaltime = diff_minutes(dats.user.ExpiryDate, d)
        if (totaltime > 0) {
            $("#divwelcome").css('display', 'block');
            $("#divlogin").css('display', 'none');
            $("#flightBookingRequest_Contact_Email,#Contact_Email").val(dats.user.ProfileInfo.Email);
      //  $("#displayusername").text('Welcome ' + dats.user.ProfileInfo.FirstName);
        setUserName(dats.user.ProfileInfo.FirstName);
	    $("#profile_setting").css('display', 'block');
        if (dats.user.ProfileInfo.socailmedia == true) {
            $("#profile_setting").css('display', 'none');
        }

        }
        else {
            localStorage.removeItem('currentUser');    
            $("#flightBookingRequest_Contact_Email,#Contact_Email").val('');
            $("#divwelcome").css('display', 'none');
            $("#divlogin").css('display', 'block');
			 if ($(window).width() > 1000) {
			        $("<div>").attr({ id: "g_id_onload", "data-client_id": "203058158698-l0jmp4qerb7r7ugmcr3hp7uad3lbo589.apps.googleusercontent.com", "data-callback": "g_hCr"}).appendTo("body");
			 }
        }

    }
    else {
        localStorage.removeItem('currentUser');    
        $("#flightBookingRequest_Contact_Email,#Contact_Email").val('');
        $("#divwelcome").css('display', 'none');
        $("#divlogin").css('display', 'block');
		if ($(window).width() > 1000) {
        $("<div>").attr({ id: "g_id_onload", "data-client_id": "203058158698-l0jmp4qerb7r7ugmcr3hp7uad3lbo589.apps.googleusercontent.com", "data-callback": "g_hCr"}).appendTo("body");
		}
    }
});
function diff_minutes(dt2, dt1) {

    var diff = (new Date(dt2).getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return diff;

}

function logout() {

    var dats = JSON.parse(localStorage.getItem('currentUser'));
    if (dats != null) {
        request = {
            UserKey: dats.user.ProfileInfo.UserKey,
            Token: dats.token
        };
try{
        $.ajax({
            url: "/us/home/updatelastlogin",
            method: "POST",
            contentType: "application/json;",
            data: JSON.stringify(request),
            success: function (data) {
                //console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
catch(err) {
  
}
    }
    facebookLogout();
    signOut();
	localStorage.removeItem('currentUser');
    showallmess("Sign out Successful");
    $("#flightBookingRequest_Contact_Email,#Contact_Email").val('');
    $("#divwelcome").css('display', 'none');
    $("#divlogin").css('display', 'block');
}
function Forgort() {
    var dats = JSON.parse(localStorage.getItem('currentUser'));

    if (!isEmail($('#forgotEmail').val())) {
        $('#forgotEmail').focus();
        $('#forgotEmail').css({ 'border': "solid 1px red" });
        $("#forgotEmail").nextAll(".error_text").first().css({ 'display': "block" })
        return false;
    }
    request = {
        UserName: $("#forgotEmail").val(),
        Token: dats != null ? dats.token : ""
    };
    $('.button_loding_div').css({ 'display': "block" })
    $.ajax({
        url: "/us/home/sendforgotpassword",
        method: "POST",
        contentType: "application/json;",
        data: JSON.stringify(request),
        success: function (data) {
            if (data.Error == null) {
                $("#MessageForgot").css('display', 'block');
                $("#MessageForgot").text("Reset pin mail sent on your registered mail id");
            }
            else {
                $("#MessageForgot").css('display', 'block');
                $("#MessageForgot").text(data.Error.ErrorDetail);
            }
            $('.button_loding_div').css({ 'display': "none" })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });


    //$("#divwelcome").css('display', 'none');
    //$("#divlogin").css('display', 'block');/us/login.html?v=1.00
}

function reset() {
    $('.button_loding_div').css({ 'display': "none" })
    $(".error_text").css({ 'display': 'none' });
    $("#UserName").val('');
    $("#Password").val('');
    $("#FirstName").val('');
    $("#LastName").val('');
    $('#ConfirmPassword').val('');
    $("#loginUsername").val('');
    $("#loginPassword").val('');
    $("#forgotEmail").val('');
    $("#Message").css('display', 'none');
    $("#Messagelogin").css('display', 'none');
    $("#MessageForgot").css('display', 'none');
}
function showallmess(mess) {
    $("#poupupMessage").text(mess);
    $(".sucessfull_message").css('display', 'block');
    setTimeout(function () {
        $(".sucessfull_message").css('display', 'none');
    }, 5000);
}



window.fbAsyncInit = function () { FB.init({ appId: '4551199668312007', cookie: true, xfbml: true, version: 'v2.8' }); };
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function facebookLogin() {
    if (typeof FB !== 'undefined') {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
	}
}

function statusChangeCallback(response) {
   // console.log("status" + response);
    if (response.status === "connected") {      
        fetchUserProfile();
    }
    else {       
        facebookLoginByDialog();
    }
}
function fetchUserProfile() {
    FB.api('/me?fields=first_name,last_name,email', function (response) {     
        var request = {
            SiteID: 160,
            UserName: response.email,
            FirstName: response.first_name,
            LastName: response.last_name,
            SocailMedia: "FACEBOOK",
        };
        passSocialData(request)
    });
}
function facebookLoginByDialog() {
    FB.login(function (response) {
		if (response.authResponse) {
        statusChangeCallback(response);}
    }, { scope: 'public_profile, email' });
}

// logging out the user from Facebook

function facebookLogout() {
    FB.logout(function (response) {
        //statusChangeCallback(response);
    });
}
function passSocialData(userData) {
    let dtareq = window.btoa(JSON.stringify(userData));
    $.ajax({
        url: "/us/home/loginprofilewithsocialmedia",
        method: "POST",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
       // contentType: "application/json;",
       // data: JSON.stringify(userData),
        data: {
            Userdata: dtareq
        },
        success: function (data) {
            if (data.user.Error == null) {
                localStorage.setItem('currentUser', JSON.stringify(data));
                hideModal('signIn');
				hideModal('singUp');
                $("#divwelcome").css('display', 'block');
                $("#divlogin").css('display', 'none');
                $('.button_loding_div').css({ 'display': "none" })
                $("#flightBookingRequest_Contact_Email,#Contact_Email").val(data.user.ProfileInfo.Email);
                //$("#displayusername").text('Welcome ' + data.user.ProfileInfo.FirstName);
                setUserName(data.user.ProfileInfo.FirstName);
                $("#profile_setting").css('display', 'block');
                if (data.user.ProfileInfo.socailmedia == true)
                {
                    $("#profile_setting").css('display', 'none');
                }
                showallmess("Sign In Successful");
            }
            else {
                $("#Messagelogin").css('display', 'block');
                $('.button_loding_div').css({ 'display': "none" })
                $("#Messagelogin").text("Invalid credentials provided. Please try again");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function onSignIn(googleUser) {
	 if (sessionStorage.getItem('myUserEntity') == null) {
        var profile = googleUser.getBasicProfile();
        var request = {
            SiteID: 160,
            UserName: profile.getEmail(),
            FirstName: profile.getGivenName(),
            LastName: profile.getFamilyName(),
            SocailMedia: "GOOGLE",
        };
        var myUserEntity = {};
        myUserEntity.Id = profile.getId();      
        sessionStorage.setItem('myUserEntity', JSON.stringify(myUserEntity));
        passSocialData(request);
    }
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {		
      sessionStorage.removeItem('myUserEntity');
         auth2.disconnect();
    });
}
function setUserName(str) {
    if (str.length > 15) {
        var res = str.substring(0, 12);
        $(".displayusername").html('<span>Welcome</span> ' +  res + '...');
    }
    else { $(".displayusername").html('<span>Welcome</span> ' + str); }
    $("#displayusername_mob").html(str.substring(0,1).toUpperCase());
}
function g_hCr(response) {   
    $.ajax({
        url: "https://cdnancillaries.cheapflightsfares.com/test/seatmap/getuserdata?tkn=" + response.credential,
        method: "GET",
        contentType: "application/json;",      
        success: function (data) {
            var request = {
                SiteID: 160,
                UserName: data.email,
                FirstName: data.given_name,
                LastName: data.family_name,
                SocailMedia: "GOOGLE",
            };           
            passSocialData(request);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
function attachSignin(element) {
    auth2.attachClickHandler(element, {},
        function (googleUser) {
            onSignIn(googleUser);
           // document.getElementById('gsign').test('signed in');
        }, function (error) {
           // document.getElementById('gsign').test('Google');
        });
}
function hndlsn() {    
    if (isMob == 1) {
        if ("" === window.location.hash.replace("#", "")) {
            if (!sopen) {
                return;
            }
            else {
                sopen = false;                
                reset();
                $("#singUp").fadeOut('slow');
                $("#signIn").fadeOut('slow'); 
 $("#forgot_popup").fadeOut('slow');				
                window.removeEventListener("hashchange", hndlsn);
            }
        }
       
    }
}
function shenable() {
    try {
        if (isMob == 1) {
            sopen = true;
            window.location.hash = "#signin";
            window.addEventListener("hashchange", hndlsn);

        }
    } catch (e) {

    }
}
    
