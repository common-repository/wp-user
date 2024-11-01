var $ = jQuery.noConflict();
$("#wp_user_profile_div_close").click(function(){
    $("#wp_user_profile_div").hide();
});


$(function() {
    var file_frame;

    $(".additional-user-image").on("click", function( event ){

        event.preventDefault();

        // If the media frame already exists, reopen it.
        if ( file_frame ) {
          //  file_frame.open();
          //  return;
        }

        // Create the media frame.
        file_frame = wp.media.frames.file_frame = wp.media({
            title: $( this ).data( "uploader_title" ),
            button: {
                text: $( this ).data( "uploader_button_text" ),
            },
            multiple: false
        });

        var current_id=this.id;

        // When an image is selected, run a callback.
        file_frame.on( "select", function() {
            // We set multiple to false so only get one image from the uploader
            attachment = file_frame.state().get("selection").first().toJSON();
            //$(".user_meta_image").val(attachment.url);
            $("#img_"+current_id).val(attachment.url);
            $("#view_"+current_id).attr( 'src', attachment.url);
            $("#user_meta_image_attachment_id").val(attachment.id);


            // Do something with attachment.id and/or attachment.url here
        });

        // Finally, open the modal
        file_frame.open();
    });

});


$("#wpuser_update_profile_button").click(function () {
    $.ajax({
        url: wpuser.wpuser_ajax_url+'?action=wpuser_update_profile_action',
        data: $("#google_form").serialize(),
        error: function (data) {
        },
        success: function (data) {
            var parsed = $.parseJSON(data);
            $("#wpuser_errordiv_register").html('<div class="wp-user-alert alert alert-' + parsed.status + ' alert-dismissible"><button type="button" class="close" data-dismiss="alert" data-auto-dismiss="2000" aria-hidden="true">×</button>' + parsed.message + '</div>');
            if (parsed.status == 'success') {
                $('.wpuser_profile_name').html(parsed.user_info.name);
                $('.wpuser_profile_first_name').html(parsed.user_info.first_name);
                $('.wpuser_profile_last_name').html(parsed.user_info.last_name);
                $('.wpuser_profile_description').html(parsed.user_info.description);
                $('.wpuser_profile_email').html(parsed.user_info.email);
                $('.wpuser_profile_user_url').html(parsed.user_info.user_url);
                $('.wpuser_profile_img').attr('src', parsed.user_info.profile_img);
                $('.profile_background_pic').attr('src', parsed.user_info.profile_background_pic);
                $('.wpuser_profile_strength').attr('style', 'width:' + parsed.user_info.wpuser_profile_strength + '%');
                $('.wpuser_profile_strength').html(parsed.user_info.wpuser_profile_strength + '%');
                $.each(parsed.user_info.advanced, function (i, val) {
                    $('.wpuser_profile_' + i).html(val);
                    $('.wpuser_profile_url_' + i).attr('href', val);
                });
            }
            $('#wpuser_errordiv_register').show();
        },
        type: 'POST'
    });
});

$("#wp_user_address_field_submit").click(function () {
        $.ajax({
            type: "POST",
            url: wpuser.wpuser_ajax_url + '?action=wpuser_address',
            data: $('#wp_user_address_field_form').serialize(),
            error: function (data) {
            },
            success: function (data) {
                var parsed = $.parseJSON(data);
                $("#wp_user_address_label").html(parsed.message);
                $("#wp_user_address_div").removeClass().addClass("wp-user-alert alert alert-dismissible alert-" + parsed.status);
                $("#wp_user_address_div").show();
                $("#pass1").val("");
                $("#pass2").val("");
            }
        });
    });

$("#wp_user_address_div_close").click(function(){
    $("#wp_user_address_div").hide();
});

$("#wp_user_profile_contact_submit").click(function () {
    $.ajax({
        type: "post",
        url: wpuser.wpuser_ajax_url+'?action=wpuser_contact',
        data: $("#wp_user_profile_contact_form").serialize(),
        success: function (data) {
            var parsed = $.parseJSON(data);
            $("#wp_user_contact_div").html('<div class="wp-user-alert alert alert-' + parsed.status + ' alert-dismissible"><button type="button" class="close" data-dismiss="alert" data-auto-dismiss="2000" aria-hidden="true">×</button>' + parsed.message + '</div>');
            if (parsed.status == 'success') {
                $("#wp_user_profile_contact_form")[0].reset();
            }
            $('#wp_user_contact_div').show();
        },
    });
});

$(".wp-user-alert").fadeTo(1000, 500).slideUp(500, function(){
    $(".wp-user-alert").alert('close');
});

$(".wpuser_sendmail").click(function () {
    $("#wpuser_myModal").modal();
    var modal = $("#wpuser_myModal"),
        dialog = modal.find('.modal-dialog');
    modal.css('display', 'block');
    var wpuser_profile_name=$("#wpuser_profile_name").html();
    $("#wpuser_mail_to_name").html(wpuser_profile_name);
    // Dividing by two centers the modal exactly, but dividing by three
    // or four works better for larger screens.
    // dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
});

$(".wpuser_viewimage").click(function () {
    var wpuser_profile_name = $("#wpuser_profile_name").html();
    var wpuser_profile_image = $(this).attr('src');
    var wpuser_profile_alt = $(this).attr('alt');    
    if( wpuser_profile_alt.length != 0 ){
        wpuser_profile_name = wpuser_profile_name +' ('+ wpuser_profile_alt+ ')';
    }
    $("#wpuser_image_name").html( wpuser_profile_name );
    $("#wpuser_image_url").attr( 'src', wpuser_profile_image );
    $("#wpuser_view_image").modal();
    var modal = $("#wpuser_view_image"),
        dialog = modal.find('.modal-dialog');
    modal.css('display', 'block');
});

$("#wpuser_send_mail").click(function () {
    if(wpuser.wp_user_security_reCaptcha_enable){
        if (grecaptcha.getResponse() == '') {
            $('#wpuser_errordiv_send_mail').html("Please verify Captcha");
            $('#wpuser_errordiv_send_mail').removeClass().addClass('alert alert-dismissible alert-warning');
            $('#wpuser_errordiv_send_mail').show();
            return false;
        }
    }
    $.ajax({
        url: wpuser.wpuser_ajax_url+'?action=wpuser_send_mail_action',
        data: $("#google_form").serialize(),
        error: function (data) {
        },
        success: function (data) {
            var parsed = $.parseJSON(data);
            $('#wpuser_errordiv_send_mail').html(parsed.message);
            $('#wpuser_errordiv_send_mail').removeClass().addClass('alert alert-dismissible alert-' + parsed.status);
            if (parsed.status == 'success') {
                $("#google_form")[0].reset();
            }
            $('#wpuser_errordiv_send_mail').show();
        },
        type: 'POST'
    });
});

$.extend({
    getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name){
        return $.getUrlVars()[name];
    }
});

