import React from "react";
import { Modal, Button } from 'antd';
import { IFrame } from "elements";

export default class GameModal extends React.Component {



  render() {

    console.log("RENDER");

    return (
      <Modal
        className="c-GameModal"
        visible={this.props.visible || false}
        onCancel={this.props.onClose}
      >
        <IFrame url={this.props.game_url} force_loading allowFullScreen />
        {/* <Iframe
          url={this.props.game_url + `?t=${Math.random()}`}
          width="100%"
          height="100%"
          className="iframe-game"
          display="initial"
          position="relative"
          allowFullScreen
        /> */}
      </Modal>
    );
  }
}