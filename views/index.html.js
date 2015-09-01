import {
  default as React,
} from "react";

import {
  WebpackNullEntry,
  WebpackScriptEntry,
  WebpackStyleEntry,
  ReactRenderToStringEntry,
} from "reacthtmlpack/lib/entry";

export default (
  <html>
    <head>
      <title>Xrossref | tomchentw</title>
      <link href="//fonts.googleapis.com/css?family=Roboto:400,300,500"/>
      <WebpackStyleEntry
        chunkName="client"
        chunkFilepath="./src/client.js"
        configFilepath="../Client.webpackConfig.js"
      />
      <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing" />
    </head>
    <body>
      <ReactRenderToStringEntry
        id="react-container"
        tagName="div"
        chunkName="server"
        chunkFilepath="./src/ReactRoot.js"
        configFilepath="../Server.webpackConfig.js"
      />
      <script src="//www.parsecdn.com/js/parse-1.4.2.min.js" />
      <WebpackScriptEntry
        chunkName="client"
        chunkFilepath="./src/client.js"
        configFilepath="../Client.webpackConfig.js"
      />
      <WebpackNullEntry
        chunkName="../../cloud/main"
        chunkFilepath="./src/parse.js"
        configFilepath="../Parse.webpackConfig.js"
      />
    </body>
  </html>
);
