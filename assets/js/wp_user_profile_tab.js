var $ = jQuery.noConflict();
$("#wp_user_profile_tab_submit").click(function () {
    $.ajax({
        type: "post",
        url:  wpuser.wpuser_ajax_url+'?action=wpuser_add_tab',
        data: $("#wp_user_tab_field_form").serialize(),
        success: function (data) {
            var parsed = $.parseJSON(data);
            $("#wp_user_tab_div").html('<div class="alert alert-' + parsed.status + ' alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' + parsed.message + '</div>');
            if (parsed.status == 'success') {                          
                $("#wp_user_tab_field_form")[0].reset();
                $('#tab_list').append(parsed.html);
            }
            $('#wp_user_tab_div').show();
        },
    });
});

$("#wp_user_profile_tab_update").click(function () {
    $.ajax({
        type: "post",
        url:  wpuser.wpuser_ajax_url+'?action=wpuser_update_tabs',
        data: $("#wp_user_tab_field_form").serialize() + '&form_action=edit',
        success: function (data) {
            var parsed = $.parseJSON(data);
            $("#tab_response_message").html('<div class="alert alert-' + parsed.status + ' alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' + parsed.message + '</div>');
            if (parsed.status == 'success') {
                $("#wp_user_tab_field_form")[0].reset();
                $("#wp_user_profile_tab_update").css("display", "none");
                $("#wp_user_add_tab_div").css("display", "none");
                $("#wp_user_profile_tab_submit").css("display", "inline-block");
                $("#tab_list").css("display", "block");
                $("#wp_user_profile_close_tab").css("display", "inline-block");
                $("#wp_user_profile_add_tab").css("display", "inline-block");
                $(".wp_user_profile_woo_tab").css("display", "block");
                $('#box_' + parsed.update_tab_id).replaceWith(parsed.html);
            }
            $('#wp_user_tab_div').show();
        },
    });
});

$("#wp_user_profile_add_tab").click(function () {
    $('#wp_user_add_tab_div').show();
    $('#wp_user_profile_close_tab').show();
    $('#wp_user_profile_add_tab').hide();
});
$("#wp_user_profile_close_tab").click(function () {
    $('#wp_user_add_tab_div').hide();
    $('#wp_user_profile_add_tab').show();
    $('#wp_user_profile_close_tab').hide();
});

function tab_action(type, label, action) {
    if (action == 'delete') {
        var r = confirm("Are you sure want to delete");
        if (r == true) {
            tabAction(type, label, action);
        }
    } else {
        tabAction(type, label, action);
    }
}

function tabAction(tab_id, label, action) {
    var wpuser_update_setting =  wpuser.wpuser_update_setting;
    jQuery.ajax({
        type: "post",
        dataType: "json",
        url:  wpuser.wpuser_ajax_url+'?action=wpuser_tab_action',
        data: 'tab_id=' + tab_id + '&tab_action=' + action + '&tab_title=' + label + '&wpuser_update_setting=' + wpuser_update_setting,
        success: function (response) {
            if (action != 'edit') {
                jQuery("#tab_response_message").html('<div class="alert alert-' + response.status + ' alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' + response.message + '</div>');
            }
            if (response.status == 'success') {
                if (action == 'delete') {
                    $('#box_' + tab_id + ' div').remove();
                } else if (action == 'duplicate') {
                    // var parsed = $.parseJSON(response);
                    $('#tab_list').append(response.html);
                }else if (action == 'show') {
                         $('#body_' + tab_id).removeClass('box-default').addClass('box-success');
                         $('#iconvisible_'+tab_id).html(response.html);
                }
                else if (action == 'hide') {
                      $('#body_' + tab_id).removeClass('box-success').addClass('box-default');
                      $('#iconvisible_'+tab_id).html(response.html);
                } else if (action == 'edit') {
                    $("#wp_user_profile_tab_update").css("display", "inline-block");
                    $("#wp_user_add_tab_div").css("display", "block");
                    $("#wp_user_profile_tab_submit").css("display", "none");
                    $("#tab_list").css("display", "none");
                    $("#wp_user_profile_close_tab").css("display", "none");
                    $("#wp_user_profile_add_tab").css("display", "none");
                    $(".wp_user_profile_woo_tab").css("display", "none");
                    $("#wpuser_tab_type").val(response.data.tab_title);
                    $('#update_tab_id').val(response.data.tab_id);
                    $.each(response.data, function (i, val) {
                        $('#' + i).val(val);
                    });
                    if (!(typeof response.data.is_link === 'undefined')) {
                        if (response.data.is_link == 'on') {
                            $('#is_link').prop('checked', true);
                            //$('#is_link').attr('checked');
                        }
                    }
                    if ( typeof response.data.tab_visible_role !== 'undefined' && response.data.tab_visible_role.length != 0) {
                        $.each(response.data.tab_visible_role, function (i, val) {
                            $('#tab_visible_role' + val.replace(" ", "_")).prop('checked', true);
                        });
                    }

                    if ( typeof response.data.tab_visible_role_edit_level !== 'undefined' && response.data.tab_visible_role_edit_level.length != 0) {
                        $.each(response.data.tab_visible_role_edit_level, function (i, val) {
                            $('#tab_visible_role_edit_level' + val.replace(" ", "_")).prop('checked', true);
                        });
                    }

                    if ( typeof response.data.tab_visible_role_view !== 'undefined' && response.data.tab_visible_role_view.length != 0) {
                        $.each(response.data.tab_visible_role_view, function (i, val) {
                            $('#tab_visible_role_view' + val.replace(" ", "_")).prop('checked', true);
                        });
                    }
                    
                    if ( typeof response.data.tab_visible_role_view_level !== 'undefined' && response.data.tab_visible_role_view_level.length != 0) {
                        $.each(response.data.tab_visible_role_view_level, function (i, val) {
                            $('#tab_visible_role_view_level' + val.replace(" ", "_")).prop('checked', true);
                        });
                    }
                }
            }
        }
    })
}

function tabSortAction(productOrder) {
    var wpuser_update_setting =  wpuser.wpuser_update_setting;
    jQuery.ajax({
        type: "post",
        dataType: "json",
        url:  wpuser.wpuser_ajax_url+'?action=wpuser_tab_sort_action',
        data: 'tab_ids=' + productOrder +'&wpuser_update_setting=' + wpuser_update_setting,
        success: function (response) {
        }
    })
}

$(function() {
    $('.sortable').sortable({
        update: function(event, ui) {
            var productOrder = $(this).sortable('toArray').toString();
            tabSortAction(productOrder);
        }
    });
});