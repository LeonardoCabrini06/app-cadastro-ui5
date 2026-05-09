/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["appcrud/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
