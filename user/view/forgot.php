<div role="tabpanel" class="tab-pane <?php echo esc_attr( $forgot_class ) ?>" id="forgotController<?php echo esc_attr( $form_id ) ?>">
    <div class="box">
        <div class="wpuser_form_header box-header with-border">
            <h3 class="box-title"><?php echo esc_attr( $wp_user_forgot_title ) ?></h3>
            </div>
        <div class="box-body">
        <div style="display: none;" id="wpuser_errordiv_forgot<?php echo esc_attr( $form_id ) ?>"
             class="alert alert-dismissible fade in" role="alert"><label
                id="upuser_error_forgot<?php echo esc_attr( $form_id ) ?>"></label></div>
        <form method="post" id="wpuser_forgot_form<?php echo esc_attr( $form_id ) ?>">
            <div class="row">
                <div class="col-xs-12 col-md-12">
            <?php
            do_action('wp_user_hook_forgot_form_header');
            foreach ($wp_user_options_forgot_form as $array) {
                echo profileController::edit_fields($array['meta_key'], $array, $wp_user_appearance_skin, $form_id, null, 'login');
            }
            do_action('wp_user_hook_forgot_form') ?>
                    </div>
                </div>
            <div class="row">
                <div class="col-xs-12 col-md-12">
                  <div class="col-xs-12 col-md-12 text-center">
                    <input type="button" style="width: 300px;" data-formid="<?php echo esc_attr( $form_id )?>" id="wpuser_forgot<?php echo esc_attr( $form_id ) ?>" class="wpuser_forgot wpuser_button wpuser_button btn <?php echo esc_attr( $wp_user_appearance_button_type ) ?> btn-primary"
                           name="forgot_password" value="<?php _e('Forgot', 'wpuser') ?>">
                </div>
                </div>
                <?php do_action('wp_user_hook_forgot_form_footer') ?>
                <!-- /.col -->
            </div>
        </form>
            </div>
        <div class="navtabs box-footer">
        <a aria-controls="loginController<?php echo esc_attr( $form_id ) ?>" role="tab" data-toggle="tab"
           href="#loginController<?php echo esc_attr( $form_id ) ?>"><?php echo esc_attr( $wp_user_login_title ) ?></a><br>
            </div>
    </div>
</div>