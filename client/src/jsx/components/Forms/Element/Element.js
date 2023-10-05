import React, { Fragment, useState } from 'react'

import PageTItle from '../../../layouts/PageTitle'

import { SplitButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap'

const Element = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    companyName: '',
    province: '',
    city: '',
    address: '',
    logo: null,
    webUrl: '',
    ceoName: '',
    ceoNum: '',
    ceoEmail: '',
    pocName: '',
    pocNum: '',
    pocDes: '',
    dailyAvg: '',
    maxAmount: '',
    maxProduct: '',
    ipServer: '',
    userName: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }

    // Check file size (example: max size of 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
    }

    setFormData({
        ...formData,
        logo: file,
    });
};
  const validate = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company Name is required';
    }



    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("i am here");
        const response = await fetch('http://payment.hashirtechnologies.com/api/registerform', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log("hello",response);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log('Data sent successfully!');
    } catch (error) {
        console.error('Error sending data:', error);
    }
};

  return (
    <Fragment>
      <PageTItle activeMenu='Element' motherMenu='Form' />
      <div className='row'>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Basic Information</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Company Name'
                      name='companyName'
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.companyName && (
                    <div className='error-message'>{errors.companyName}s</div>
                  )}
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Province'
                      name='province'
                      value={formData.province}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='City Name'
                      name='city'
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='file'
                      className='form-control input-rounded'
                      placeholder='Upload Logo'
                      value={formData.logo}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Web URL'
                      name='webUrl'
                      value={formData.webUrl}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='CEO NAME'
                      name='ceoname'
                      value={formData.ceoName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='CEO EMAIL'
                      name='ceo_email'
                      value={formData.ceoEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='number'
                      className='form-control input-default '
                      placeholder='ceo_number'
                      name='ceonum'
                      value={formData.ceoNum}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='POC Name'
                      name='pocname'
                      value={formData.pocName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='POC Number'
                      name='pocnumber'
                      value={formData.pocNum}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='POC Designation'
                      name='poc_desig'
                      value={formData.pocDes}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Transactions Details</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-group'>
                    <input
                      type='Number'
                      className='form-control input-default '
                      placeholder='Daily Trasaction Average'
                      value={formData.dailyAvg}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='Number'
                      className='form-control input-default '
                      placeholder='Max Trasaction Daily'
                      value={formData.maxAmount}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='Number'
                      className='form-control input-default '
                      placeholder='Max One Product Daily'
                      value={formData.maxProduct}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className='card-header'>
              <div className='card'>
                <h4 className='card-title'>Technical Details</h4>
              </div></div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-group'>
                    <input
                      type='Number'
                      className='form-control input-default '
                      placeholder='IP-Address'
                      value={formData.ipServer}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Username'
                      value={formData.userName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      className='form-control input-default '
                      placeholder='Password'
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className='card-header'>
              <div className='card'>
                <h4 className='card-title'>Payment Platforms</h4>
              </div></div>
            <div className='card-body'>
              <div className='row'>
                <div className='col-xl-4 col-xxl-6 col-6'>
                  <div className='custom-control custom-checkbox mb-3'>
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='customCheckBox1'
                      required
                    />
                    <label
                      className='custom-control-label'
                      htmlFor='customCheckBox1'
                    >
                      EasyPaisa
                    </label>
                  </div>
                </div>
                <div className='col-xl-4 col-xxl-6 col-6'>
                  <div className='custom-control custom-checkbox mb-3 checkbox-info'>
                    <input
                      type='checkbox'
                      defaultChecked
                      className='custom-control-input'
                      id='customCheckBox2'
                      required
                    />
                    <label
                      className='custom-control-label'
                      htmlFor='customCheckBox2'
                    >
                      JazzCash
                    </label>
                  </div>
                </div>

                <div className='col-xl-4 col-xxl-6 col-6'>
                  <div className='custom-control custom-checkbox mb-3 checkbox-success'>
                    <input
                      type='checkbox'
                      defaultChecked
                      className='custom-control-input'
                      id='customCheckBox3'
                      required
                    />
                    <label
                      className='custom-control-label'
                      htmlFor='customCheckBox3'
                    >
                      PayFast
                    </label>
                  </div>
                </div>
                <div className='col-xl-4 col-xxl-6 col-6'>
                  <div className='custom-control custom-checkbox mb-3 checkbox-warning'>
                    <input
                      type='checkbox'
                      defaultChecked
                      className='custom-control-input'
                      id='customCheckBox4'
                      required
                    />
                    <label
                      className='custom-control-label'
                      htmlFor='customCheckBox4'
                    >
                      HBL
                    </label>
                  </div>
                </div>
                <div className='col-xl-4 col-xxl-6 col-6'>
                  <div className='custom-control custom-checkbox mb-3 checkbox-danger'>
                    <input
                      type='checkbox'
                      defaultChecked
                      className='custom-control-input'
                      id='customCheckBox5'
                      required
                    />
                    <label
                      className='custom-control-label'
                      htmlFor='customCheckBox5'
                    >
                      U-bank
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Confirmation</h4>
              <button onClick={handleSubmit} type='submit' className='btn btn-primary mb-2'>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Element