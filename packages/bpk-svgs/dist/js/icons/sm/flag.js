import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M5 17H3V2c0-.6.4-1 1-1s1 .4 1 1v15zm9.6-15H6v8h8.6c.3 0 .5-.4.3-.7l-3-3.3 3-3.3c.2-.3.1-.7-.3-.7z" /></svg>;
  }

}