
bench = function (method, iterations, args, context) {

    var time = 0;
    var timer = function (action) {
        var d = Date.now();
        if (time < 1 || action === 'start') {
            time = d;
            return 0;
        } else if (action === 'stop') {
            var t = d - time;
            time = 0;    
            return t;
        } else {
            return d - time;    
        }
    };

    var result = [];
    var i = 0;
    timer('start');
    while (i < iterations) {
        result.push(method.apply(context, args));
        i++;
    }

    var execTime = timer('stop');

   console.log("Mean execution time was: ", execTime / iterations);
   console.log("Sum execution time was: ", execTime);
   console.log("Result of the method call was:", result[0]);

    return execTime;  
};
