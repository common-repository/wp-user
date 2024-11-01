<?php

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly
if (!class_exists('WPUserAdminAssets')) :

    class WPUserAdminAssets {

        public function __construct() {
            add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));
        }

        // Enqueue scripts
        public function admin_scripts() {
            if (isset($_GET['page'])) {
                if (in_array(sanitize_text_field($_GET['page']), array("wp-user-setting", "wp-user-list", 'wp-user-subscription','wp-user-addons','wp_user-woocommerce','wp-socil-login'))) {
                        //JS
                        wp_enqueue_script('jquery');                   
                        wp_enqueue_script('jquery-ui-core');
                        wp_enqueue_script('wpdbbootstrap', WPUSER_PLUGIN_URL . "assets/js/bootstrap.min.js");
                        if (in_array(sanitize_text_field($_GET['page']), array("wp-user-list"))) {
                            //jPList lib
                            wp_enqueue_script('wpuserjplist', WPUSER_PLUGIN_URL . "assets/js/jplist/jplist.core.min.js");
                            wp_enqueue_script('wpuserjplistbootstrap', WPUSER_PLUGIN_URL . "assets/js/jplist/jplist.bootstrap-filter-dropdown.min.js");
                            wp_enqueue_script('wpuserapppagination', WPUSER_PLUGIN_URL . "assets/js/jplist/jplist.bootstrap-pagination-bundle.min.js");
                            wp_enqueue_script('wpusersortdropdown', WPUSER_PLUGIN_URL . "assets/js/jplist/jplist.bootstrap-sort-dropdown.min.js");
                            wp_enqueue_script('wpusersortfilter', WPUSER_PLUGIN_URL . "assets/js/jplist/jplist.textbox-filter.min.js");
                        }

                        //CSS
                        wp_enqueue_style('wpdbbootstrapcss', WPUSER_PLUGIN_URL . "assets/css/bootstrap.min.css");
                        wp_enqueue_style('wpdbbootstrapcdncss', WPUSER_PLUGIN_URL . "assets/css/font-awesome.min.css");
                        wp_enqueue_style('wpdbadminltecss', WPUSER_PLUGIN_URL . "assets/dist/css/AdminLTE.min.css");
                        wp_enqueue_style('wpdbbskinscss', WPUSER_PLUGIN_URL . "assets/dist/css/skins/_all-skins.min.css");
                        wp_enqueue_style('wpdbiCheckcss', WPUSER_PLUGIN_URL . "assets/plugins/iCheck/flat/blue.css");
                    
                        wp_enqueue_style('wpusermailchimp', WPUSER_PLUGIN_URL . "assets/css/wpusermailchimp.css");

                        wp_enqueue_media();
                        wp_enqueue_script('wpuserajax', WPUSER_PLUGIN_URL . "assets/js/ajax.min.js");
                        wp_enqueue_script('wpdbbootstrapconfirmbox', WPUSER_PLUGIN_URL . "assets/js/jquery.sortable.min.js");
                        
                        $localize_script = array(
                            'wpuser_ajax_url' => admin_url('admin-ajax.php'),
                            'wpuser_update_setting' => wp_create_nonce('wpuser-update-setting'),
                            'wpuser_site_url' => site_url(),
                            'plugin_url' => WPUSER_PLUGIN_URL,
                            'wpuser_templateUrl' => WPUSER_TEMPLETE_URL,
                            'plugin_dir' => WPUSER_PLUGIN_DIR,
                            'wpuser_user_i18n' => WPUSER_USER_i18n,
                            'wpuser_lang' => get_option('wp_user_language')
                        );
                        wp_localize_script('wpuserajax', 'wpuser_link', $localize_script);
                        if (in_array(sanitize_text_field($_GET['page']), array('wp-user-setting'))) {
                            wp_enqueue_script('wpuserprofiletab', WPUSER_PLUGIN_URL . "assets/js/wp_user_profile_tab.js",null,null,true);
                            wp_localize_script('wpuserprofiletab', 'wpuser', $localize_script);
                        }
                }
            }
        }

    }

endif;

$obj = new WPUserAdminAssets();