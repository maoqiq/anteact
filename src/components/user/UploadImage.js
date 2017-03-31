import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Upload, Icon, message} from 'antd';
const Dragger = Upload.Dragger;


class UploadImage extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(info) {
    if (this.props.onChange) {
      this.props.onChange(info);
    }
  }

  render() {
    const draggerConfig = {
      name: 'file',
      multiple: true,
      showUploadList: false,
      action: '/1.0/ssp/image/upload',
      onChange: this.handleChange
    };

    const draggerStyles = {
      backgroundImage: `url(${this.props.imgUrl})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: '200px',
    }

    return (
      <div className="dragger-wrap" style={{...draggerStyles}}>
        <Dragger {...draggerConfig} style={{padding: '20px'}} className="dragger">
          {!this.props.imgUrl &&
          <div className="isShowImage">
            <p className="ant-upload-drag-icon">
              <Icon type="inbox"/>
            </p>
            <p className="ant-upload-text">点击或拖拽图片到此处上传</p>
            <p className="ant-upload-hint">格式限制JPG/JPEG/PNG</p>
          </div>
          }
        </Dragger>
      </div>
    )
  }
}


export default UploadImage
