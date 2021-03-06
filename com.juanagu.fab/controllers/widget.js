/**
 * @author jagu
 * @
 */
/** ------------------------
 Constants
 ------------------------**/
var TAG = 'com.juanagu.fab';
/** ------------------------
 Fields
 ------------------------**/
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var initialize = false;
var isEnabled = true;
/** ------------------------
 Methods
 ------------------------**/
/**
 * apply properties to controller
 * @param {Object} properties
 */
var applyProperties = function(properties) {

	if (_.isObject(properties)) {

		if (_.has(properties, 'backgroundColor')) {
			$.circle.backgroundColor = properties.backgroundColor;
			$.circle.borderColor = properties.backgroundColor;
		}

		if (_.has(properties, 'circle')) {
			_.extend($.circle, _.omit(properties.circle, 'backgroundColor', 'borderColor'));
		}

		if (_.has(properties, 'icon')) {
			_.extend($.icon, properties.icon);
		}

		_.extend($.touch, _.omit(properties, 'backgroundColor', 'circle', 'icon'));
	}
};

/**
 * http://www.tidev.io/2014/09/18/cleaning-up-alloy-controllers/
 */
var cleanup = function() {
	try {
		// let Alloy clean up listeners to global collections for data-binding
		// always call it since it'll just be empty if there are none
		$.destroy();
		// remove all event listeners on the controller
		$.off();
	} catch(e) {
	}
};

/**
 * apply listeners to controller
 */
var applyListeners = function() {
};

/**
 * initialize controller
 */
var init = function() {
	if (!initialize) {
		initialize = true;
		applyProperties(args);
		applyListeners();
		$.touch.show();
	}
};

/**
 * enabled widget
 */
var enabled = function() {
	isEnabled = true;
	$.touch.opacity = 1;
};

/**
 * disabled widget
 */
var disabled = function() {
	isEnabled = false;
	$.touch.opacity = 0.5;
};

/** ------------------------
 Listeners
 ------------------------**/
/**
 *
 */

/**
 * when window is opened
 */
var onOpen = function(e) {
	_.defer(init);
};

/**
 * when window is closed
 * @param {Object} e
 */
var onClose = function(e) {
	cleanup();
};

/**
 * Fired as soon as the device detects a touch gesture.
 * @param {Object} e
 */
var onTouchStart = function(e) {

};

/**
 * Fired when a touch event is completed.
 * On the Android platform, other gesture events, such as longpress or swipe,
 * cancel touch events, so this event may not be triggered after a touchstart event.
 * @param {Object} e
 */
var onTouchEnd = function(e) {

};

/**
 * Fired when the device detects a click against the view.
 * There is a subtle difference between singletap and click events.
 * A singletap event is generated when the user taps the screen briefly without moving their finger. This gesture will also generate a click event.
 * However, a click event can also be generated when the user touches, moves their finger, and then removes it from the screen.
 * On Android, a click event can also be generated by a trackball click.
 * @param {Object} e
 */
var onClick = function(e) {
	if (isEnabled) {
		$.trigger('click', e);
	}
};

/** ------------------------
 public
 ------------------------**/
exports.applyProperties = applyProperties;
exports.onOpen = onOpen;
exports.onClose = onClose;
exports.cleanup = cleanup;
exports.init = init;
exports.enabled = enabled;
exports.disabled = disabled;
