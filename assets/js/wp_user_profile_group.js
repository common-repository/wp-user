$("#wp_user_profile_group_submit").click(function () {
    $.ajax({
        type: "post",
        url: wpuser.wpuser_ajax_url + '?action=wpuser_add_group',
        data: $("#wp_user_group_field_form").serialize(),
        success: function (data) {
            var parsed = $.parseJSON(data);
            $("#wp_user_group_div").html('<div class="wp-user-alert alert alert-' + parsed.status + ' alert-dismissible"><button type="button" class="close" data-dismiss="alert" data-auto-dismiss="2000" aria-hidden="true">×</button>' + parsed.message + '</div>');
            if (parsed.status == 'success') {
                if (parsed.is_added_billing == '1') {
                    $('.action_box').removeClass('box-success');
                    $('.action_box').removeClass('box-primary');
                    $('.action_billing').removeClass().addClass('action_billing badge bg-blue');
                }
                if (parsed.is_added_shiping == '1') {
                    $('.action_box').removeClass('box-warning');
                    $('.action_box').removeClass('box-primary');
                    $('.action_shiping').removeClass().addClass('action_billing badge bg-blue');
                }
                $("#wp_user_group_field_form")[0].reset();
                $('#group_list').append(parsed.html);
            }
            $('#wp_user_group_div').show();
            $('body, html').animate({scrollTop:$('#wp_user_add_group_div').offset().top}, 'slow');
            return false;
        },
    });
});

$("#wp_user_profile_group_update").click(function () {
    $.ajax({
        type: "post",
        url: wpuser.wpuser_ajax_url + '?action=wpuser_update_group',
        data: $("#wp_user_group_field_form").serialize() + '&form_action=edit',
        success: function (data) {
            var parsed = $.parseJSON(data);
            $("#wp_user_group_div").html('<div class="wp-user-alert alert alert-' + parsed.status + ' alert-dismissible"><button type="button" class="close" data-dismiss="alert" data-auto-dismiss="2000" aria-hidden="true">×</button>' + parsed.message + '</div>');
            if (parsed.status == 'success') {
                $("#wp_user_group_field_form")[0].reset();
                $("#wp_user_profile_group_update").css("display", "none");
                $("#wp_user_add_group_div").css("display", "none");
                $("#wp_user_profile_group_submit").css("display", "inline-block");
                $(".group_list").css("display", "block");
                $("#wp_user_profile_close_group").css("display", "inline-block");
                $("#wp_user_profile_add_group").css("display", "inline-block");
                $(".wp_user_profile_woo_group").css("display", "block");
                $('#group_' + parsed.update_group_id).replaceWith(parsed.html);
            }
            $('#group_list').show();
            $('.group_view').hide();
        },
    });
});

$("#wp_user_profile_add_group").click(function () {
    $('#wp_user_add_group_div').show();
    $('#wp_user_profile_close_group').show();
    $('#wp_user_profile_add_group').hide();
    $("#wp_user_profile_group_submit").css("display", "inline-block");
    $('.group_list').hide();
    $('.group_view').hide();
});
$("#wp_user_profile_close_group").click(function () {
    $('#wp_user_add_group_div').hide();
    $('#wp_user_profile_add_group').show();
    $('#wp_user_profile_close_group').hide();
    $('.group_list').show();
    $('.group_view').hide();
});

function backTo(action) {
    if (action == 'myprofile') {
        $('#wp_user_add_group_div').hide();
        $('#wp_user_profile_add_group').show();
        $('#wp_user_profile_close_group').hide();
        $('.group_list').show();
        $('#profile_view').show();
        $('.group_view').hide();
        $('#group_view').html('');
    }
    else  if (action == 'groups') {
        $('#wp_user_add_group_div').hide();
        $('#wp_user_profile_add_group').show();
        $('#wp_user_profile_close_group').hide();
        $('.group_list').show();
        $('#profile_view').show();
        $('.group_view').hide();
        $('#group_view').html('');
    }

}

function group_action(id, action) {
        if (action == 'delete') {
            var r = confirm('Are you sure want to delete?');
            if (r == true) {
                groupAction(id, action);
            }
        }else {
            groupAction(id, action);
        }
}

function groupAction(id, action) {
    var wpuser_update_setting = wpuser.wpuser_update_setting;
    jQuery.ajax({
        type: "post",
        dataType: "json",
        url: wpuser.wpuser_ajax_url + '?action=wpuser_group_action',
        data: 'id=' + id + '&group_action=' + action  + '&wpuser_update_setting=' + wpuser_update_setting,
        success: function (response) {
            if (!(action == 'edit' || action == 'view' || action == 'join' || action == 'leave')) {
                jQuery("#address_response_message").html('<div class="wp-user-alert alert alert-' + response.status + ' alert-dismissible"><button type="button" class="close" data-dismiss="alert" data-auto-dismiss="2000" aria-hidden="true">×</button>' + response.message + '</div>');
            }
            if (response.status == 'success') {
                if (action == 'delete') {
                    $('.group_' + id + ' div').remove();
                } else if (action == 'edit') {
                    $("#wp_user_profile_group_update").css("display", "inline-block");
                    $("#wp_user_add_group_div").css("display", "block");
                    $("#wp_user_profile_group_submit").css("display", "none");
                   // $("#group_list").css("display", "none");
                    $('.group_list').hide();
                    $('.group_view').hide();
                    $("#wp_user_profile_close_group").css("display", "none");
                    $("#wp_user_profile_add_group").css("display", "none");
                    $('#update_group_id').val(response.update_group_id);
                    $.each(response.data, function (i, val) {
                        $('#form_' + i).val(val);
                    });
                }
                else if (action == 'view') {
                    $("#wp_user_profile_group_submit").css("display", "none");
                    // $("#group_list").css("display", "none");
                    $('#profile_view').hide();
                    $('#group_view').show();
                    $("#wp_user_profile_close_group").css("display", "none");
                    $("#wp_user_profile_add_group").css("display", "none");
                    $('#group_view').html(response.html)
                }
                else if (action == 'join') {
                    $('.group_join_'+id).html(response.html);
                    var member_count = $('#member_count'+id).html();
                    member_count= parseInt(member_count) +1 ;
                    $('.member_count'+id).html(member_count)
                }
                else if (action == 'leave') {
                    $('.group_join_'+id).html(response.html);
                    var member_count = $('#member_count'+id).html();
                    member_count= parseInt(member_count) - 1 ;
                    $('.member_count'+id).html(member_count)
                }
            }
        }
    })
}

function getGroupFilterData() {
    if (!($('#wpuser_filter_category').length && $('#wpuser_filter_area').length)) {
        getGroupFilter();
    }
}

function getGroupFilter() {
    $.ajax({
        type: "post",
        dataType: "json",
        url: wpuser.wpuser_ajax_url + '?action=wpuser_getGroupFilterData',
        data: 'type=all',
        success: function (response) {
            if (response.status == 'warning')
                $("#response_message").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" data-auto-dismiss="2000" aria-hidden="true">×</button><h4><i class="icon fa fa-ban"></i> Error!</h4>' + response.message + '</div>');
            else if (response.status == 'success') {
                var filter_html='';
                if (!(response.category.length === 0)) {
                    filter_html +='<div class="form-group col-md-6">';
                    filter_html +='<label>Category</label>';
                    filter_html +='<select id="wpuser_filter_category" name="wpuser_filter_category" class="form-control wpuser_filter_category" multiple="">';
                    $.each(response.category, function (i, val) {
                        filter_html += '<option value="'+val+'">'+val+'</option>';
                    });
                    filter_html +='</select>';
                    filter_html +='</div>';
                    $("#advanced_filter").append(filter_html);
                }
                var filter_html='';
                if (!(response.area.length === 0)) {
                    filter_html +='<div class="form-group col-md-6">';
                    filter_html +='<label>Area</label>';
                    filter_html +='<select id="wpuser_filter_area" name="wpuser_filter_area" class="form-control wpuser_filter_area" multiple="">';
                    $.each(response.area, function (i, val) {
                        filter_html += '<option value="'+val+'">'+val+'</option>';
                    });
                    filter_html +='</select>';
                    filter_html +='</div>';
                    $("#advanced_filter").append(filter_html);
                }
            }
        }
    });
}
function showFilterResult(str) {
    $("#filterlivesearch").html('');
    if (str.length == 0) {
        $("#filterlivesearch").html('');
        document.getElementById("filterlivesearch").style.border = "0px";
        return;
    }else if (str.length >= 4) {
        $("#filterlivesearch").html('');
        $.ajax({
            type: "post",
            dataType: "json",
            url: wpuser.wpuser_ajax_url + '?action=wpuser_getGroupTitleSearch',
            data: 'type=livesearch&wpuser_filter_search=' + str,
            success: function (response) {
                if (response.status == 'success') {
                    if (!(response.list.length === 0)) {
                       // $("#filterlivesearch").append('<ul class="list-group">');
                        $.each(response.list, function (i, val) {
                            $("#filterlivesearch").append('<a class="list-group-item" onclick="setFilterTitle(\''+this.title+'\')">'+val.title+'</a>');
                        });
                       // $("#filterlivesearch").append('</ul>');
                        document.getElementById("filterlivesearch").style.border="1px solid #A5ACB2";
                    }else{
                        $("#filterlivesearch").html('');
                    }
                }
            }
        });
    }
}
function setFilterTitle(htmlString) {
    $('#wpuser_filter_search').val( htmlString );
    $("#filterlivesearch").html('');
}

$("#wpuser_filter_form").focusout(function(){
  //  $("#filterlivesearch").html('');
});

$("#resetFilter").click(function(){
    getGrouprList(1);
});


function getGrouprList(page) {
    // $("#wpuser_mail_to_userid").val(id);
    var wpuser_filter_search= $("#wpuser_filter_search").val();
    var wpuser_filter_category =null;
    if($('#wpuser_filter_category').length){
         wpuser_filter_category = $('#wpuser_filter_category').val();
    }
    var wpuser_filter_area =null;
    if($('#wpuser_filter_category').length){
        wpuser_filter_area = $('#wpuser_filter_area').val();
    }

    if(wpuser_filter_search.length >= 1 || wpuser_filter_area!=null || wpuser_filter_category !=null){
        $('#wpuser_filter').removeClass('text-muted').addClass('text-green');
    }else{
        $('#wpuser_filter').removeClass('text-green').addClass('text-muted');
    }

    if($('#wpuser_filter_by_user').length){
        wpuser_filter_by_user = $('#wpuser_filter_by_user').val();
    }else{
        wpuser_filter_by_user=0;
    }

    if($('#wpuser_my_profile_group').length){
        wpuser_my_profile_group = $('#wpuser_my_profile_group').val();
    }else{
        wpuser_my_profile_group=0;
    }

    $("#find_groups").html('');
    $("#group_pagination").html('');
    $.ajax({
        type: "post",
        dataType: "json",
        url: wpuser.wpuser_ajax_url + '?action=wpuser_getGrouprList',
        data: 'page=' + page + '&wpuser_filter_search=' + wpuser_filter_search+ '&wpuser_filter_category=' + wpuser_filter_category+ '&wpuser_filter_area=' + wpuser_filter_area+ '&wpuser_filter_by_user=' + wpuser_filter_by_user,
        success: function (response) {
            if (response.status == 'warning')
                $("#response_message").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" data-auto-dismiss="2000" aria-hidden="true">×</button><h4><i class="icon fa fa-ban"></i> Error!</h4>' + response.message + '</div>');
            else if (response.status == 'success') {
                $("#groupTitle").html('Groups - <span class="group_count">' +response.pagination.total_count+'</span>');
                if (response.list.length === 0) {
                    $("#find_groups").html('No Groups Found');
                } else {
                    $.each(response.list, function (i, val) {
                        group_button='';
                        if(wpuser.isUserLogged==1) {
                            if (val.is_admin == 1) {
                                if(wpuser_filter_by_user!=0 && wpuser_my_profile_group!=0) {
                                    var group_button = '<span class="group_join_' + val.id + '" id="group_join_f_' + val.id + '"><button type="button" class="btn btn-warning" onclick="group_action(' + val.id + ',\'delete\')"> Delete Group</button><a class="pull-right" title="Edit" onclick="group_action(' + val.id + ',\'edit\')"><i class="fa fa-fw fa-gear"></i></a></span>';
                                }
                            } else if (val.is_member == 1 && val.is_admin != 1) {
                                var group_button = '<span class="group_join_' + val.id + '" id="group_join_f_' + val.id + '"><button type="button" class="btn btn-default" onclick="group_action(' + val.id + ',\'leave\')"> Leave Group</button></a></span>';
                            } else {
                                var group_button = '<span class="group_join_' + val.id + '" id="group_join_f_' + val.id + '"><button type="button" class="btn btn-primary" onclick="group_action(' + val.id + ',\'join\')"> Join</button></a></span>';
                            }
                        }
                        if(val.title==1){
                            var title='<small class="text-muted">' + val.title + '</small>';
                        }else{
                            var title='';
                        }
                        $("#find_groups").append('<div id="group_f_' + val.id + '" class="group_' + val.id + ' col-lg-6 col-xs-6">'
                            + '<div class="small-box bg-gray">'
                            + '<div class="inner"><label><a class="pull-right" href="#" title="View ' + val.id + '" onclick="group_action(' + val.id + ',\'view\')">' + val.title + '</a></label><p id="group_count"><label class="member_count' + val.id + '" id="member_count' + val.id + '">' + val.member_count + '</label> members</p></div>'
                        + '<div class="icon">'
                        + '<i class="' + val.icon + '"></i>'
                        + '</div>'
                        + '<p class="small-box-footer">'+group_button+'</p>'
                        + '</div>'
                        + '</div>');

                    });
                    if (response.pagination.total_pages > 1) {
                        var pages = ' ';
                        var active = ' ';
                        var page_next = ' ';
                        var page_prev = ' ';
                        for (i = 1; i <= response.pagination.total_pages; i++) {
                            if (i == response.pagination.page) {
                                active = ' active ';
                            } else {
                                active = ' ';
                            }

                            if (response.pagination.page != 1) {
                                page_prev = '<li class="page-item"><a onclick="getGrouprList('+ (parseInt(response.pagination.page) - 1) + ')" class="page-link" tabindex="-1">Previous</a></li>';
                            }else{
                                page_prev = '<li  class="page-item"><a disabled="disabled" class="disabled page-link" tabindex="-1">Previous</a></li>';
                            }
                            if (response.pagination.page != response.pagination.total_pages) {
                                page_next = '<li class="page-item"><a onclick="getGrouprList('+ (parseInt(response.pagination.page) + 1) + ')" class="page-link">Next</a></li>';
                            }else{
                                page_next = '<li class="page-item"><a disabled="disabled" class="disabled page-link">Next</a></li>';
                            }

                            pages = pages + '<li class="page-item ' + active + '"><a onclick="getGrouprList(' + i + ')" class="page-link" >' + i + '</a></li>';
                        }
                        $("#group_pagination").append(
                            page_prev
                            + pages
                            + page_next
                        );
                    }
                }
            }
        }
    });
}



function getMemberListByGroupID(id, page) {
    // $("#wpuser_mail_to_userid").val(id);
    $("#group_members_list").html('');
    $("#group_members_pagination").html('');
    $.ajax({
        type: "post",
        dataType: "json",
        url: wpuser.wpuser_ajax_url + '?action=wpuser_getMemberByGroupID',
        data: 'id=' + id + '&page=' + page ,
        success: function (response) {
            if (response.status == 'warning')
                $("#response_message").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" data-auto-dismiss="2000" aria-hidden="true">×</button><h4><i class="icon fa fa-ban"></i> Error!</h4>' + response.message + '</div>');
            else if (response.status == 'success') {
                $("#gropupLabel").html('Members -'+response.pagination.total_count);
                if (response.list.length === 0) {
                    $("#follower_list").html('No Members Found');
                } else {
                    $.each(response.list, function (i, val) {
                        if(val.is_admin==1){
                            var is_admin='<small class="text-muted">Group admin</small>';
                        }else{
                            var is_admin='';
                        }
                        if(val.title==1){
                            var title='<small class="text-muted">' + val.title + '</small>';
                        }else{
                            var title='';
                        }
                        $("#group_members_list").append(' <div class="col-md-6 group-list-item list-even" id="follow_user_' + val.id + '">'
                            + '<div class="box box-primary wpuser-custom-box">'
                            + '<div class="box-body box-profile" style="padding:0px !important">'
                            + '<div style="margin: 10px;" class="media-left pos-rel col-md-3">'
                            + '<a> <img class="wpuser-thumb img-circle img-xs" src="' + val.profile_image + '" width="40px" alt="Profile Picture"></a>'
                            + '</div>'
                            + ' <div class="media-body">'
                            + '<div class="pull-left"><a target="_blank" href="' + val.profile_url + '"><h5 class="member_list_display_name mar-no">' + val.name + '</h5></a>'
                            + title
                            + is_admin
                            + '</div>'
                            + '<div class="pull-right" style="margin-top: 10px; margin-right: 10px;">'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div></div>');

                    });
                    if (response.pagination.total_pages > 1) {
                        var pages = ' ';
                        var active = ' ';
                        var page_next = ' ';
                        var page_prev = ' ';
                        for (i = 1; i <= response.pagination.total_pages; i++) {
                            if (i == response.pagination.page) {
                                active = ' active ';
                            } else {
                                active = ' ';
                            }

                            if (response.pagination.page != 1) {
                                page_prev = '<li class="page-item"><a onclick="getMemberListByGroupID(' + id + ',' + (parseInt(response.pagination.page) - 1) + ')" class="page-link" tabindex="-1">Previous</a></li>';
                            }
                            if (response.pagination.page != response.pagination.total_pages) {
                                page_next = '<li class="page-item"><a onclick="getMemberListByGroupID(' + id + ',' + (parseInt(response.pagination.page) + 1) + ')" class="page-link">Next</a></li>';
                            }

                            pages = pages + '<li class="page-item ' + active + '"><a onclick="getMemberListByGroupID(' + id + ',' + i + ')" class="page-link" >' + i + '</a></li>';
                        }
                        $("#group_members_pagination").append(
                            page_prev
                            + pages
                            + page_next
                        );
                    }
                }
            }
        }
    });
}