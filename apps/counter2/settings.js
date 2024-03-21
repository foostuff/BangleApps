(function (back) {
    var FILE = "counter2.json";
    defaults={
        counter0:10,
        counter1:20,
        max0:15,
        max1:25
    };
    settings = Object.assign(defaults, require('Storage').readJSON(FILE, true) || {});

    function writeSettings() {
        require('Storage').writeJSON(FILE, settings);
    }

    menu = {
        "": { "title": "Counter2" },
        "< Back": () => back(),
        'Default C1': {
            value: settings.max0,
            min: 0, max: 25,
            onchange: v => {
                settings.max0 = v;
                writeSettings();
            }
        },
        'Default C2': {
            value: settings.max1,
            min: 0, max: 25,
            onchange: v => {
                settings.max1 = v;
                writeSettings();
            }
        },

    };
    // Show the menu
    E.showMenu(menu);
});
