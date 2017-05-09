import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

class CompanyForm extends Component {
  render() {
    return (
      <FormItem
        {...formItemLayout}
        label="营业执照:"
      >
        {isShowFinancialInput ?
          (<span>
                    {getFieldDecorator('businessLicenseUrl', {
                      rules: [{
                        required: true, message: '请输入营业执照'
                      }],
                      initialValue: userInfo.finance.licenseUrl
                    })(
                      <div style={{marginTop: 16, height: 200}}>
                        <Dragger {...businessLicenseDrops} style={{padding: '20px'}}>
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox"/>
                          </p>
                          <p className="ant-upload-text">点击或拖拽图片到此处上传营业执照</p>
                          <p className="ant-upload-hint">格式限制JPG/JPEG/PNG</p>
                        </Dragger>
                      </div>
                    )}
                  </span>)
          : <span>{userInfo.finance.licenseUrl}</span>
        }
      </FormItem>
    )
  }
}

export default CompanyForm
