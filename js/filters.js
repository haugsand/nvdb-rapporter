app.filter('radfilter', function () {
    return function (egenskapstyper, radfilter) {
        
        if (!radfilter) {
            radfilter = [];
        }   
        output = [];

        if (egenskapstyper) {
            for (var i = 0; i < egenskapstyper.length; i++) {
                if (radfilter.indexOf(egenskapstyper[i].navn) == -1) {
                    output.push(egenskapstyper[i]);
                }
            }
            return output;
        }
    };
}); 
