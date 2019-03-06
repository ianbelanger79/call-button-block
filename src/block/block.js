/**
 * BLOCK: call-button-block
 *
 * Registering a dynamic block with Gutenberg.
 * Dynamic block, renders and saves a Call Now Button
 */
 
//  Import CSS.
import './style.scss';
import './editor.scss';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { omit, pick } from 'lodash';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const {
	RichText,
	getColorClassName,
} = wp.editor;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import edit from './edit';

const blockAttributes = {
	url: {
		type: 'string',
	},
	title: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'title',
	},
	text: {
		type: 'string',
		source: 'html',
		selector: 'a',
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
};

const colorsMigration = ( attributes ) => {
	return omit( {
		...attributes,
		customTextColor: attributes.textColor && '#' === attributes.textColor[ 0 ] ? attributes.textColor : undefined,
		customBackgroundColor: attributes.color && '#' === attributes.color[ 0 ] ? attributes.color : undefined,
	}, [ 'color', 'textColor' ] );
};

/**
 * Register: Call Button Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cnb/call-button-block', {

	title: __( 'Call Button' ),
	description: __( 'Prompt visitors to take action with a Call Now Button.' ),
	icon: 'phone',
	category: 'common',
	keywords: [
		__( 'Call Now Button' ),
		__( 'call-button-block' ),
	],
	attributes: blockAttributes,
	supports: {
		align: true,
		alignWide: false,
	},
	styles: [
		{ name: 'default', label: _x( 'Default', 'block style' ), isDefault: true },
		{ name: 'outline', label: __( 'Outline' ) },
		{ name: 'squared', label: _x( 'Squared', 'block style' ) },
	],

	edit,

	save( { attributes } ) {
		const {
			url,
			text,
			title,
			backgroundColor,
			textColor,
			customBackgroundColor,
			customTextColor,
		} = attributes;

		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const buttonClasses = classnames( 'wp-block-button__link eig_call_button', {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
		} );

		const buttonStyle = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
		};

		var telnum = attributes.url;
		if( telnum ) {
			var regex = /\D/gi;
			var phonenum = telnum.replace(regex, '');
		} else {
			var phonenum = attributes.url;
		}

		return (
			<div className="eig_call">
				<RichText.Content
					tagName="a"
					className={ buttonClasses }
					href={ 'tel:' + phonenum }
					title={ title }
					style={ buttonStyle }
					value={ text }
				/>
			</div>
		);
	},
	
});
