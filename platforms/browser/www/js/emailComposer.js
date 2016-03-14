
/* This is not used, it is just here as a referance and maybe could be altered for what we want*/

(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        checkAvailable: function () {
            if (!this.checkSimulator()) {
            	cordova.plugins.email.isAvailable(this.callback);
            }
        },

        composeEmail: function () {
            if (!this.checkSimulator()) {
                cordova.plugins.email.open({
                    to:          ['person1@domain.com'],
                    cc:          ['person2@domain.com'],
                    bcc:         ['person3@domain.com', 'person4@domain.com'],
                    attachments: ['file://styles/images/logo.png', 'file://styles/images/logo2x.png'],
                    subject:     'EmailComposer plugin test',
                    body:        '<h2>Hello!</h2>This is a nice <strong>HTML</strong> email with two attachments.',
                    isHtml:      true
                }, this.callback)
            }
        },

        callback: function(msg) {
            navigator.notification.alert(JSON.stringify(msg), null, 'EmailComposer callback', 'Close');
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.cordova === undefined || window.cordova.plugins === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);