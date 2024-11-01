<?php
$wp_user_security_reCaptcha_enable = (get_option('wp_user_security_reCaptcha_enable') && !empty(get_option('wp_user_security_reCaptcha_secretkey'))) ? 1 : 0;          
 
$localize_script_data = array(
    'wpuser_ajax_url' => admin_url('admin-ajax.php'),
    'wpuser_update_setting' => wp_create_nonce('wpuser-update-setting'),
    'wpuser_site_url' => site_url(),
    'plugin_url' => WPUSER_PLUGIN_URL,
    'wpuser_templateUrl' => WPUSER_TEMPLETE_URL,
    'plugin_dir' => WPUSER_PLUGIN_DIR,
    'login_redirect' =>$login_redirect,
    'wp_user_disable_login_otp' => get_option('wp_user_disable_login_otp'),
    'wp_user_enable_two_step_auth' => get_option('wp_user_enable_two_step_auth'),
    'form_id' => $form_id,
    'redirectURL' =>  (isset($_GET['redirect_to']) && !empty($_GET['redirect_to'])) ? urldecode(esc_url_raw($_GET['redirect_to'])) : '',
    'wp_user_security_reCaptcha_enable' => $wp_user_security_reCaptcha_enable,
);
    if(!is_user_logged_in()) {          
        wp_enqueue_script('wpusercustomjs', WPUSER_PLUGIN_URL . "assets/js/script.js");
        wp_localize_script('wpusercustomjs', 'wpuser', $localize_script_data);        
    } else { 
        if ( get_option('wp_user_disable_group_myprofile') != 1 ) {
            wp_enqueue_script('wpusergroupjs', WPUSER_PLUGIN_URL . "assets/js/wp_user_profile_group.js");
            wp_localize_script('wpusergroupjs', 'wpuser', $localize_script_data);
        }
    }