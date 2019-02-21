<?php
/**
 * Plugin Name: Call Button Block
 * Plugin URI: https://github.com/ianbelanger79
 * Description: A Gutenberg Block plugin to add a block for a Call Now Button
 * Author: ianbelanger
 * Author URI: https://github.com/ianbelanger79
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
