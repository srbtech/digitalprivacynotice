/*  This Node.js module serves Digital Privacy Notice. These Digital Privacy Notices 
 *  leverages the consumer tested and preferred content and formats developed recently
 *  as part of the joint ONC/OCR model NPP project. The Healthcare provider and Health Plan
 *  provider can customoze the content using the available configuration items.
 *
 *  
 *
 *  Company : SRB Technologies, www.srbtech.com
 *  Author : Bramh Gupta
 *
 */

"use strict"
var http = require('http');
var fs = require('fs');
var path = require('path');
var locale = require('locale');

var  supported = new locale.Locales(["en", "es"]);

function render() {

    var usageInstruction = "Usage : node digitalprivacynotice <port> <provider type: -hc or -hp> -p <language: -en or -es> \n"
             + "Where, \n\tport: Mandatory parameter Port to which PrivacyNotice module should bind to\n" 
             + "\n\t -hc or -hp : Mandatory Parameter to identify the type of provider, i.e. HealthCare provider or HealthPlan provider\n" 
             + "\t\t -hc : render HealthCare provider privacy notice \n" 
             + "\t\t -hp : render HealthPlan provider privacy notice \n" 
             + "\t\t Only one of the above values should be entered \n" 
             + "\n\t -p : Optional parameter to render single page notice. The default view is tabbed view.\n" 
             + "\n\t -en or -es : Optional parameter to force rendering in a perticular choice of lanaguage \n" 
             + "\t\t -en : render Privacy notice in English \n"
             + "\t\t -es : render Privacy notice in Spanish\n"
             + "\t\t The default langaugae, if no parameter is provided, is based on the language setting of browser of the user. \n"
             + "\t\t If no langauge is specified then the application will choose best langauge between \n" 
             + "\t\t English or Spanish for the user based on locale setting on user computer \n";
             
   
    //process input arguments
    var args = process.argv.slice(2);
    console.log('Starting process: ');
    console.log('Arguments: ', args);
    if (args.length < 2 || args.length > 4) {
        console.log("Invalid arguments provided\n");
        console.log(usageInstruction);
        process.exit(1);
    }
    // validation on port
    var port = parseInt(args[0], 10);
    if (isNaN(port)) {
        console.log(" Please enter a valid numeric value for port on which server should bind \n");
        console.log(usageInstruction);
        process.exit(1);
    }
    
    var pageView = false,
        providerType,
        lang;

    // validation on provider type    
    if (args[1] != undefined && (args[1] != "-hc" && args[1] != "-hp")) {
        console.log("Invalid provider type provided\n");
        console.log(usageInstruction);
        process.exit(1);
    }
    if (args[1]!= undefined) providerType = args[1].substring(1);
    console.log('Provider Type: ', providerType);

    // validation on page view and language third argument
    if (args[2] != undefined && (args[2] != "-p" && args[2] != "-en" && args[2] != "-es")) {
        console.log("Invalid arguments provided\n");
        console.log(usageInstruction);
        process.exit(1);
    }
    if (args[2] != undefined){
        switch (args[2]){
            case '-p':
                pageView = true;
                break;
            case '-en':
            case '-es':
                lang = args[2].substring(1);
                break;
        }
    }

   
    

    // validation on language  
    if (args[3] != undefined && (args[3] != "-en" && args[3] != "-es")) {
        console.log("Invalid language choice provided\n");
        console.log(usageInstruction);
        process.exit(1);
    }
    if (args[3] != undefined ) lang = args[3].substring(1);
    console.log('language: ', lang);

    http.createServer(function(request, response) {
        //console.log('request starting...');

        //console.log ('request.url : ' + request.url);
        //console.log ('DIRNAME :' + __dirname);
        var filePath = __dirname + request.url;
        //console.log('filepath 1:' + filePath)

        
        // put the logic to determine the correct file to serve here
        if (request.url == '/') {
           // console.log("1");
            // if the langauge is not passed as parameter, choose the best langugae based on locale
            if (lang == undefined) {
                // identify browser locale and choose between English and Spanish page
                var locales = new locale.Locales(request.headers["accept-language"]); 
                lang = locales.best(supported).toString();
                console.log('Lanaguage based on locale:', lang);
            }

            // render logic for HealthCare Provider Privacy Notice
            if (providerType == 'hc') {
                //console.log("2");
                //console.log('language:',lang);
                //console.log('language length:',lang.length);
                switch (lang) {
                    case 'es':
                        //console.log("3");
                        // put the code to write Spanish pages
                        if (pageView) {
                            // render single page view
                            filePath = __dirname + '/html/onepage_hc_es.html';
                        } else {
                            //render tabbed view which is the Default view
                            filePath = __dirname + '/html/tab_hc_es.html';
                        }
                        break;
                    case 'en':
                    default:
                    //console.log("4");
                        if (pageView) {
                            // render single page view
                            filePath = __dirname + '/html/onepage_hc_en.html';
                        } else {
                            //render tabbed view which is the Default view
                            filePath = __dirname + '/html/tab_hc_en.html';
                        }
                        break;

                }
            }
            // render logic for HealthPlan Provider Privacy Notice
            if (providerType == 'hp') {
                //console.log("3");
                switch (lang) {
                    case 'es':
                        // put the code to write Spanish pages
                        if (pageView) {
                            // render single page view
                            filePath = __dirname + '/html/onepage_hp_es.html';
                        } else {
                            //render tabbed view which is the Default view
                            filePath = __dirname + '/html/tab_hp_es.html';
                        }
                        break;

                    case 'en':
                    default:
                        if (pageView) {
                            // render single page view
                            filePath = __dirname + '/html/onepage_hp_en.html';
                        } else {
                            //render tabbed view which is the Default view
                            filePath = __dirname + '/html/tab_hp_en.html';
                        }
                        break;

                }
            }
        }
        //console.log("5");
        //console.log('filepath 2:' + filePath)

        var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
        }

        fs.exists(filePath, function(exists) {

            if (exists) {
                fs.readFile(filePath, function(error, content) {
                    if (error) {
                        response.writeHead(500);
                        response.end();
                    } else {
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.end(content, 'utf-8');
                    }
                });
            } else {
                response.writeHead(404);
                response.end();
            }
        });

    }).listen(port);
    console.log('Server running at http://localhost:' + port +'\n');

}
// export the function to make it module
exports.render = render;
