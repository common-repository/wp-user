<?php
$wp_user_appearance_icon = (isset($atts['icon'])) ? $atts['icon'] : get_option('wp_user_appearance_icon');
$wp_user_appearance_skin = (isset($atts['layout']) && !empty($atts['layout'])) ? $atts['layout'] :
    (get_option('wp_user_appearance_skin') ? get_option('wp_user_appearance_skin') : 'default');
$wp_user_register_enable = get_option('wp_user_disable_signup');
$wp_user_register_enable = (isset($atts['form_type']) && $atts['form_type'] == 'login' ) ? true : $wp_user_register_enable;
$wp_user_login_disable = (isset($atts['form_type']) && $atts['form_type'] == 'register' ) ? true : false;
$wp_user_appearance_button_type = (isset($wp_user_appearance['button']['type']) && !empty($wp_user_appearance['button']['type'])) ? $wp_user_appearance['button']['type'] : 'btn-flat';
$wp_user_login_title = (isset($atts['login_title']) ) ? $atts['login_title'] : __('Sign In', 'wpuser');
$wp_user_register_title = (isset($atts['register_title']) ) ? $atts['register_title'] : __('Sign Up', 'wpuser');
$wp_user_forgot_title = (isset($atts['forgot_title']) ) ? $atts['forgot_title'] : __('Forgot Password', 'wpuser');
$layout = $wp_user_appearance_skin;

include('option.php');
?>

<div class="tab-content">
  <!-- Image loader -->
 <div id="loader_action" style="display: none;position: fixed;top: 50%; left: 45%;z-index: 99999;">
       <img src="<?php echo esc_url(WPUSER_PLUGIN_ASSETS_URL) ?>/images/icon_loading.gif">
  </div>
   <!-- Image loader -->
    <?php
    if ( false == $wp_user_login_disable ) {
    include('login.php');
    include('forgot.php');
  } else {
    $register_class = 'active';
  }
    if ( false == $wp_user_register_enable ) {
        include('register.php');
    } ?>
</div>