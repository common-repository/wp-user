var wpuser = {wpuser_ajax_url:wpuser.wpuser_ajax_url ,wp_user_security_reCaptcha_enable:wpuser.wp_user_security_reCaptcha_enable,login_redirect:wpuser.login_redirect};
    $(".navtabs a").click(function(){
         $(this).tab('show');
     });

    $(".step_btn_prev").click(function () {
        var prevTab = $(this).attr('data-prev');
        var currentTab = $(this).attr( 'data-current' );
        $('#step_count_' + prevTab).trigger('click');
        $('#step_count_' + prevTab).removeClass().addClass( 'badge bg-blue' );
        $('#step_count_' + currentTab).removeClass().addClass( 'badge bg-gray' );
    });

    $(".step_btn_next").click(function () {
        if($("#google_form"+wpuser.form_id ).valid()){
            var nextTab = $(this).attr( 'data-next' );
            $('#step_count_' + nextTab).trigger( 'click' );
            var currentTab = $(this).attr( 'data-current' );
            $('#step_count_' + currentTab).removeClass().addClass( 'badge bg-green' );
            $('#step_count_' + currentTab).parent().removeClass( 'wpuser_step_disable' );
            $('#step_count_' + nextTab).removeClass().addClass( 'badge bg-blue' );
            $('#step_count_' + nextTab).parent().removeClass( 'wpuser_step_disable' );
        }
    });

    $(".wpuser_register" ).click(function () {
        form_id = $( this ).data( "formid" )
        if ( $("#google_form"+form_id ).valid() ) {
            if (wpuser.wp_user_security_reCaptcha_enable == 1) {
                if (grecaptcha.getResponse() == '') {
                    $('#wpuser_error_register'+form_id ).html("Please verify Captcha");
                    $('#wpuser_errordiv_register'+form_id ).removeClass().addClass('alert alert-dismissible alert-warning');
                    $('#wpuser_errordiv_register'+form_id ).show();
                    return false;
                }
            }
            $.ajax({
                url: wpuser.wpuser_ajax_url + '?action=wpuser_register_action',
                data: $("#google_form"+form_id ).serialize(),
                error: function (data) {
                },
                success: function (data) {
                    var parsed = $.parseJSON(data);
                    $('#wpuser_error_register'+form_id ).html('');
                    $(".form-control").removeClass("wpuser_invalid");
                    $(".wpuser_error").removeClass("wpuser_view_error");
                    $('.wpuser_error').hide();
                    $('#wpuser_error_register'+form_id ).html(parsed.message);
                    $('#wpuser_errordiv_register'+form_id ).removeClass().addClass('alert alert-dismissible alert-' + parsed.status);
                    if (parsed.status == 'success') {
                        $("#google_form"+form_id )[0].reset();
                    }
                    //console.log(parsed.error)
                    if (parsed.status == 'warning' && typeof( parsed.error ) !== "undefined" && ( parsed.error.length != 0 )) {
                      //console.log("error");

                        $.each(parsed.error, function (key, value) {
                            if (( typeof( value ) !== "undefined" )) {
                                $('#error' + key).html(value);
                                $('#error' + key).addClass('wpuser_view_error');
                                $('.wpuser_error_' + key).html(value);
                                $('.wpuser_error_' + key).addClass('wpuser_view_error');
                                $('#' + key).addClass('wpuser_invalid');
                                //console.log(value)
                            }
                        });
                        $('.wpuser_view_error').show();

                        if( typeof( parsed.error_in_forms ) !== "undefined" && ( parsed.error_in_forms.length != 0 ) ){
                            $.each(parsed.error_in_forms, function (key, value) {
                                $('#step_count_' + key).removeClass().addClass('badge bg-red');
                            });
                        }
                    }
                    if (parsed.message == 'Registration completed') {
                        window.location.reload(true);
                    }
                    $('#wpuser_errordiv_register'+form_id ).show();
                    $("#loader_action").hide();
                    $('html, body').animate({
                        scrollTop: $('#wpuser_errordiv_register'+form_id ).offset().top
                    }, 2000);
                },
                type: 'POST'
            });
        }
    });

    $(".wpuser_login_action").click(function () {
      form_id = $( this ).data( "formid" )
      $("#loader_action").show();
        $.ajax({
        url: wpuser.wpuser_ajax_url+'?action=wpuser_login_action',
        data: $( "#wpuser_login_form"+form_id   ).serialize(),
        error: function (data) {
        },
        success: function (data) {
            var parsed = $.parseJSON(data);
            $('#upuser_error'+form_id  ).html(parsed.message);
            $('#wpuser_errordiv'+form_id  ).removeClass().addClass('alert alert-dismissible alert-' + parsed.status);
            $('#wpuser_errordiv'+form_id  ).show();
            if ( parsed.status == 'success' ) {
                if(wpuser.wp_user_enable_two_step_auth== 1){ 
                    if ( parsed.step == '2' ) {
                      $("#div_wp_user_password"+form_id  ).hide();
                      $("#wpuser_otp_"+form_id ).show();
                    } 
                } else {
                        $("#wpuser_login_form"+form_id )[0].reset();
                        if ( ( typeof wpuser.redirectURL != 'undefined' && wpuser.redirectURL.length != 0 ) ) {
                            window.location.href = wpuser.redirectURL;
                        }
                        else if ( typeof wpuser.register_redirect != 'undefined' && wpuser.register_redirect.length != 0 ) {
                            window.location.href = wpuser.register_redirect;
                        }
                        else if ( typeof( wpuser.login_redirect ) == "undefined" || wpuser.login_redirect == null || wpuser.login_redirect == '' ||  ( typeof( wpuser.login_redirect ) !== "undefined" && wpuser.login_redirect.length === 0 ) ) {
                            location.reload();
                        }
                        else {
                            window.location.href = wpuser.login_redirect;
                        }
                    } 
             }               
                $("#loader_action").hide();
        },
        type: 'POST'
    });
});

if(wpuser.wp_user_disable_login_otp!= 1 || wpuser.wp_user_enable_two_step_auth == 1 ) { 

  $(".wpuser_login_resend_otp").click(function () {
    form_id = $( this ).data( "formid" )
    console.log('wpuser_login_resend_otp');
      $( "#wpuser_login_otp"+form_id  ).trigger( "click" );
  });

  $(".wpuser_otp_password_div" ).click(function () {
    form_id = $( this ).data( "formid" )
     $( "#wpuser_otp_div"+form_id  ).show();
     $("#wpuser_otp_"+form_id ).hide();
     $("#div_wp_user_password"+form_id ).show();
     $("#wpuser_otp_password_div"+form_id ).hide();
  });

$(".wpuser_login_otp" ).click(function () {
  form_id = $( this ).data( "formid" )
  console.log('wpuser_login_resend_otp111111111');
  $("#loader_action").show();
    $.ajax({
    url: wpuser.wpuser_ajax_url+'?action=wpuser_login_otp_action',
    data: $( "#wpuser_login_form"+form_id  ).serialize(),
    error: function (data) {
    },
    success: function (data) {
        var parsed = $.parseJSON(data);
        $('#upuser_error'+form_id ).html(parsed.message);
        $('#wpuser_errordiv'+form_id ).removeClass().addClass('alert alert-dismissible alert-' + parsed.status);
        $('#wpuser_errordiv'+form_id ).show();
        if ( parsed.status == 'success' ) {
            $("#div_wp_user_password"+form_id ).hide();
            $("#wpuser_otp_div"+form_id ).hide();
            $("#wpuser_otp_password_div"+form_id ).show();
            $("#wpuser_otp_"+form_id ).show();
        }
        $("#loader_action").hide();
    },
    type: 'POST'
});
});
 } 

    $(".wpuser_forgot" ).click(function () {
      $("#loader_action").show();
      form_id = $( this ).data( "formid" )
        $.ajax({
        url: wpuser.wpuser_ajax_url+'?action=wpuser_forgot_action',
        data: $("#wpuser_forgot_form"+form_id ).serialize(),
        error: function (data) {
        },
        success: function (data) {
            var parsed = $.parseJSON(data);
            $('#upuser_error_forgot'+form_id ).html(parsed.message);
            $('#wpuser_errordiv_forgot'+form_id ).removeClass().addClass('alert alert-dismissible alert-' + parsed.status);
            if (parsed.status == 'success') {
                $("#wpuser_forgot_form"+form_id )[0].reset();
            }
            $('#wpuser_errordiv_forgot'+form_id ).show();
            $("#loader_action").hide();
        },
        type: 'POST'
    });
});

    $(".wp_login_btn" ).click(function () {
        form_id = $( this ).data( "formid" )
        $('#wp_login'+form_id ).modal();
        var modal = $("#wp_login"+form_id ),
        dialog = modal.find('.modal-dialog');
    modal.css('display', 'block');
    // Dividing by two centers the modal exactly, but dividing by three
    // or four works better for larger screens.
    dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
});

    $("#wp_user_profile_div_close").click(function () {
        $("#wp_user_profile_div").hide();
    });
    $(function () {
        var file_frame;

        $(".additional-user-image").on("click", function (event) {

            event.preventDefault();

            // If the media frame already exists, reopen it.
            if (file_frame) {
                file_frame.open();
                return;
            }

            // Create the media frame.
            file_frame = wp.media.frames.file_frame = wp.media({
            title: $(this).data("uploader_title"),
            button: {
                text: $(this).data("uploader_button_text"),
            },
            multiple: false
        });

        var current_id = this.id;

        // When an image is selected, run a callback.
        file_frame.on("select", function () {
            // We set multiple to false so only get one image from the uploader
            attachment = file_frame.state().get("selection").first().toJSON();
            //$(".user_meta_image").val(attachment.url);
            $("#img_" + current_id).val(attachment.url);
            $("#user_meta_image_attachment_id").val(attachment.id);


            // Do something with attachment.id and/or attachment.url here
        });

        // Finally, open the modal
        file_frame.open();
    });

    });

    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });