import {default as React} from "react";

const {PropTypes} = React;

class ReactHtml extends React.Component {

  _render_link_to_stylesheet_ (clientAssets) {
    if (clientAssets.client) {
      return (
        <link rel="stylesheet" href={clientAssets.client.replace(/js$/, "css")} />
      );
    }
  }

  render () {
    const {props} = this,
          {clientAssets} = props,
          innerHtml = {__html: props.componentString};

    return (
      <html>
        <head>
          <title>Xrossref | tomchentw</title>
          <link href="//fonts.googleapis.com/css?family=Roboto:400,300,500"/>
          {this._render_link_to_stylesheet_(clientAssets)}
        </head>
        <body>
          <div id="react-container" dangerouslySetInnerHTML={innerHtml} />
          <script src="//www.parsecdn.com/js/parse-1.4.2.min.js" />
          <script src={clientAssets["assets/client"] || clientAssets.client} />
        </body>
      </html>
    );
  }
}

ReactHtml.propTypes = {
  componentString: PropTypes.string.isRequired,
  clientAssets: PropTypes.object.isRequired,
};

export default ReactHtml;
