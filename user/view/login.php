<div role="tabpanel" class="tab-pane <?php echo esc_attr( $login_class ) ?>" id="loginController<?php echo esc_attr( $form_id ) ?>"
     class="login-box-body">
    <div class="box">
        <div class="wpuser_form_header box-header with-border navtabs">
            <h3 class="box-title"><?php echo esc_attr( $wp_user_login_title )?></h3>
            <a style="float: right" class="forgot_password" href="#forgotController<?php echo esc_attr( $form_id ) ?>" aria-controls="forgotController<?php echo esc_attr( $form_id ) ?>"
               role="tab" data-toggle="tab"><?php echo esc_attr( $wp_user_forgot_title ) ?></a>
        </div>
        <div class="box-body">
        <div style="display: none;" id="wpuser_errordiv<?php echo esc_attr( $form_id )?>"
             class="alert alert-dismissible fade in" role="alert"><label
                id="upuser_error<?php echo esc_attr( $form_id )?>"></label></div>
        <form method="post" onsubmit="return false" id="wpuser_login_form<?php echo esc_attr( $form_id )?>">
            <?php do_action('wp_user_hook_login_form_header') ?>
            <div class="row">
                <div class="col-xs-12">
            <?php
            foreach ($wp_user_options_signin_form as $array) {
                echo profileController::edit_fields( $array['meta_key'], $array, $wp_user_appearance_skin, $form_id, null, 'login' );
            }
            do_action('wp_user_hook_login_form', $atts, $form_id );
            ?>
                    </div>
                </div>
            <div class="row">
                <!-- /.col -->
                <div class="col-xs-12">
                    <div class="col-xs-12 text-center">
                      <input type="submit" style="max-width: 300px;width:100%" data-formid="<?php echo esc_attr( $form_id )?>"  id="wpuser_login<?php echo esc_attr( $form_id )?>" class="wpuser_button btn wpuser_login_action <?php echo esc_attr( $wp_user_appearance_button_type )?> btn-primary"
                           name="wpuser_login" value="<?php _e('Sign In', 'wpuser') ?>">
                    </div>
                </div>
                <div class="col-xs-12">
                    <?php do_action('wp_user_hook_login_form_footer', $atts, $form_id ) ?>
                </div>
                <!-- /.col -->
            </div>
        </form>
            </div>
        <div class="box-footer navtabs">
        <?php if (!$wp_user_register_enable) { ?>
            <a style="float: right" href="#registerController<?php echo esc_attr( $form_id ) ?>"
               aria-controls="registerController<?php echo esc_attr( $form_id )?>" role="tab" data-toggle="tab"
               class="text-center"><?php echo esc_attr( $wp_user_register_title )?></a>
        <?php } ?>
        </div>

    </div>
</div>