const webpack = require(`webpack`);

if (process.env.NODE_ENV === `production`) {
  module.exports = new webpack.DefinePlugin({
    // https://www.google.com/analytics/web/?hl=en#dashboard/default/a41104589w100577949p104471624/
    "process.env.GOOGLE_ANALYTICS_TRACK_NUMBER": JSON.stringify(`UA-41104589-16`),
    "process.env.GOOGLE_ANALYTICS_ID": JSON.stringify(`104471624`), // Get this from https://ga-dev-tools.appspot.com/query-explorer/
  });
} else {
  module.exports = new webpack.DefinePlugin({
  // https://www.google.com/analytics/web/?hl=en#dashboard/default/a41104589w100513541p104405838/
    "process.env.GOOGLE_ANALYTICS_TRACK_NUMBER": JSON.stringify(`UA-41104589-15`),
    "process.env.GOOGLE_ANALYTICS_ID": JSON.stringify(`104405838`), // Get this from https://ga-dev-tools.appspot.com/query-explorer/
  });
}
