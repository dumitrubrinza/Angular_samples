<h1>Start-up.</h1>

Later in the semester we will use node.js as our server, however, for now a simple HTTP server is sufficient to test our SPA apps. http-server is a zero-configuration command-line http server. If you have not already installed it, then do so by typing the following command in a terminal window:

   <b>$ npm install http-server -g </b>

Download and unzip this file - it's the AngularJS sample code provided with the lecture slides on Data Binding and Filters. Open a second terminal window, go to the AngularJS_samples folder (using the cd command) and start the http server by typing the following command:

   <b>$ http-server  </b>

In the Chrome web browser, enter the URL: http://localhost:8080/. Your browser page should look similar to the following:

img

<p>In the browser, navigate to: http://localhost:8080/01-data-bindings/index2.html, and also examine (using Sublime Text editor) the source code in the associated file (AngularJS_samples\01-data-bindings/index2.html). In the browser, navigate to: http://localhost:8080/02-ng-repeat/, and examine the code in the associated file (AngularJS_samples\02-ng=repeat/index.html). Finally, do the same for http://localhost:8080/03-filters/ </p>

Download and unzip this file. The content of the labApps folder is illustrated below:

img

Stop the HTTP server. go to the labAppsfolder (using cd) and start the server again. In the browser navigate to http://localhost:8080/ and refresh the page.