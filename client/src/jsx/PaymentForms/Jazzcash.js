import React, { Fragment } from 'react'
import PageTItle from '../layouts/PageTitle'
import jazzlogo from '../../images/paymentlogos/jazzcash.png'
import card from '../../images/paymentlogos/card.png'
export const Jazzcash = () => {
  return (
         <>
        <div className='row'>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
            
              <h4 className='card-title'>JAZZ-CASH TRANSACTION</h4>
              <img width='30px' height='30px' src={jazzlogo}/>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-group'>
                    <input
                      type='Number'
                      className='form-control input-default '
                      placeholder='Enter Amount'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='Number'
                      className='form-control input-default '
                      placeholder='Confirm Transactions'
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
              <h4 className='card-title'>Card Details</h4>
              <img width='50px' height='30px' src={card}/>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-group'>
                    <input
                      type='Number'
                      className='form-control input-default '
                      placeholder='2223-xxxx-xxxx-xx'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='Number'
                      className='form-control input-default '
                      placeholder='Expiry Date'
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='Number'
                      className='form-control input-default '
                      placeholder='CVV'
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
              <h4 className='card-title'>Confirmation</h4>
              <button type='submit' className='btn btn-primary mb-2'>
                        Submit
                </button>  
            </div>
          </div>
        </div>
        
        
        {/* <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Inline Checkboxes</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-group'>
                    <div className='form-check form-check-inline'>
                      <label className='form-check-label'>
                        <input
                          type='checkbox'
                          className='form-check-input'
                          value=''
                          defaultChecked
                        />
                        Option 1
                      </label>
                    </div>
                    <div className='form-check form-check-inline'>
                      <label className='form-check-label'>
                        <input
                          type='checkbox'
                          className='form-check-input'
                          value=''
                        />
                        Option 2
                      </label>
                    </div>
                    <div className='form-check form-check-inline disabled'>
                      <label className='form-check-label'>
                        <input
                          type='checkbox'
                          className='form-check-input'
                          value=''
                          disabled
                        />
                        Disabled
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Radio Buttons</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-group mb-0'>
                    <div className='radio'>
                      <label>
                        <input type='radio' name='optradio' /> Option 1
                      </label>
                    </div>
                    <div className='radio'>
                      <label>
                        <input type='radio' name='optradio' /> Option 2
                      </label>
                    </div>
                    <div className='radio disabled'>
                      <label>
                        <input type='radio' name='optradio' disabled /> Option 3
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Inline Radio </h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-group mb-0'>
                    <label className='radio-inline mr-3'>
                      <input type='radio' name='optradio' /> Option 1
                    </label>
                    <label className='radio-inline mr-3'>
                      <input type='radio' name='optradio' /> Option 2
                    </label>
                    <label className='radio-inline mr-3'>
                      <input type='radio' name='optradio' /> Option 3
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>readOnly</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-group'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='readOnly input here…'
                      readOnly
                    />
                  </div>
                  <div className='form-group row'>
                    <label className='col-sm-3 col-form-label'>Email</label>
                    <div className='col-sm-9'>
                      <input
                        type='text'
                        readOnly
                        className='form-control-plaintext'
                        value='email@example.com'
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                    <label className='col-sm-3 col-form-label'>Password</label>
                    <div className='col-sm-9'>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='Password'
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Inline Form</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form
                  className='form-inline'
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className='form-group mb-2'>
                    <label className='sr-only'>Email</label>
                    <input
                      type='text'
                      readOnly
                      className='form-control-plaintext'
                      value='email@example.com'
                    />
                  </div>
                  <div className='form-group mx-sm-3 mb-2'>
                    <label className='sr-only'>Password</label>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Password'
                    />
                  </div>
                  <button type='submit' className='btn btn-primary mb-2'>
                    Confirm identity
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Form grid</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='First name'
                      />
                    </div>
                    <div className='col-sm-6 mt-2 mt-sm-0'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Last name'
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Form Row</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-row'>
                    <div className='col-sm-6'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='First name'
                      />
                    </div>
                    <div className='col-sm-6 mt-2 mt-sm-0'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Last name'
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Form Label Size</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-group row'>
                    <label className='col-sm-2 col-form-label col-form-label-sm'>
                      Email
                    </label>
                    <div className='col-sm-10'>
                      <input
                        type='email'
                        className='form-control form-control-sm'
                        placeholder='col-form-label-sm'
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                    <label className='col-sm-2 col-form-label'>Email</label>
                    <div className='col-sm-10'>
                      <input
                        type='email'
                        className='form-control'
                        placeholder='col-form-label'
                      />
                    </div>
                  </div>
                  <div className='form-group row'>
                    <label className='col-sm-2 col-form-label col-form-label-lg'>
                      Email
                    </label>
                    <div className='col-sm-10'>
                      <input
                        type='email'
                        className='form-control form-control-lg'
                        placeholder='col-form-label-lg'
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Column size</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-row'>
                    <div className='col-sm-7'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='City'
                      />
                    </div>
                    <div className='col mt-2 mt-sm-0'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='State'
                      />
                    </div>
                    <div className='col mt-2 mt-sm-0'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Zip'
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Auto-sizing</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-row align-items-center'>
                    <div className='col-auto'>
                      <label className='sr-only'>Name</label>
                      <input
                        type='text'
                        className='form-control mb-2'
                        placeholder='Jane Doe'
                      />
                    </div>
                    <div className='col-auto'>
                      <label className='sr-only'>Username</label>
                      <div className='input-group mb-2'>
                        <div className='input-group-prepend'>
                          <div className='input-group-text'>@</div>
                        </div>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Username'
                        />
                      </div>
                    </div>
                    <div className='col-auto'>
                      <div className='form-check mb-2'>
                        <input className='form-check-input' type='checkbox' />
                        <label className='form-check-label'>Remember me</label>
                      </div>
                    </div>
                    <div className='col-12'>
                      <button type='submit' className='btn btn-primary mb-2'>
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Custom Select</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-row align-items-center'>
                    <div className='col-auto my-1'>
                      <div className='form-group d-flex align-items-center'>
                        <label className='mr-sm-2'>Preference</label>
                        <select
                          defaultValue={'option'}
                          className='form-control form-control-lg'
                          id='inlineFormCustomSelect'
                        >
                          <option value='option' disabled>
                            Choose...
                          </option>
                          <option value='1'>One</option>
                          <option value='2'>Two</option>
                          <option value='3'>Three</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Disabled forms</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <fieldset disabled>
                    <div className='form-group'>
                      <label>Disabled input</label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Disabled input'
                      />
                    </div>
                    <div className='form-group'>
                      <label>Disabled select menu</label>
                      <select defaultValue={'option'} className='form-control'>
                        <option>Disabled select</option>
                      </select>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        disabled
                      />
                      <label className='form-check-label'>
                        Can't check this
                      </label>
                    </div>
                    <button type='submit' className='btn btn-primary mt-3'>
                      Submit
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Input Group</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form action='#'>
                  <div className='input-group mb-3 input-warning-o'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>@</span>
                    </div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Username'
                    />
                  </div>
                  <div className='input-group mb-3 input-success-o'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>@</span>
                    </div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Username'
                    />
                  </div>
                  <div className='input-group mb-3 input-primary'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder="Recipient's username"
                    />
                    <div className='input-group-append'>
                      <span className='input-group-text'>@example.com</span>
                    </div>
                  </div>

                  <label>Your vanity URL</label>
                  <div className='input-group mb-3  input-success'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        https://example.com
                      </span>
                    </div>
                    <input type='text' className='form-control' />
                  </div>

                  <div className='input-group mb-3  input-info'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>$</span>
                    </div>
                    <input type='text' className='form-control' />
                    <div className='input-group-append'>
                      <span className='input-group-text'>.00</span>
                    </div>
                  </div>

                  <div className='input-group   input-danger'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>With textarea</span>
                    </div>
                    <textarea className='form-control'></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Input Group Size</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form action='#'>
                  <div className='input-group input-group-sm mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>Small</span>
                    </div>
                    <input type='text' className='form-control' />
                  </div>

                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>Default</span>
                    </div>
                    <input type='text' className='form-control' />
                  </div>

                  <div className='input-group input-group-lg'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>Large</span>
                    </div>
                    <input type='text' className='form-control' />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Checkboxes and radios</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form action='#'>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <div className='input-group-text'>
                        <input type='checkbox' />
                      </div>
                    </div>
                    <input type='text' className='form-control' />
                  </div>

                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <div className='input-group-text'>
                        <input type='radio' />
                      </div>
                    </div>
                    <input type='text' className='form-control' />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Multiple inputs</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form action='#'>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        First and last name
                      </span>
                    </div>
                    <input type='text' className='form-control' />
                    <input type='text' className='form-control' />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Multiple addons</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form action='#'>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>$</span>
                      <span className='input-group-text'>0.00</span>
                    </div>
                    <input type='text' className='form-control' />
                  </div>

                  <div className='input-group'>
                    <input type='text' className='form-control' />
                    <div className='input-group-append'>
                      <span className='input-group-text'>$</span>
                      <span className='input-group-text'>0.00</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Button addons</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form action='#'>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <button className='btn btn-primary' type='button'>
                        Button
                      </button>
                    </div>
                    <input type='text' className='form-control' />
                  </div>

                  <div className='input-group mb-3'>
                    <input type='text' className='form-control' />
                    <div className='input-group-append'>
                      <button className='btn btn-primary' type='button'>
                        Button
                      </button>
                    </div>
                  </div>

                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <button className='btn btn-primary' type='button'>
                        Button
                      </button>
                      <button className='btn btn-primary' type='button'>
                        Button
                      </button>
                    </div>
                    <input type='text' className='form-control' />
                  </div>

                  <div className='input-group'>
                    <input type='text' className='form-control' />
                    <div className='input-group-append'>
                      <button className='btn btn-primary' type='button'>
                        Button
                      </button>
                      <button className='btn btn-primary' type='button'>
                        Button
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Buttons with dropdowns</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form action='#'>
                  <div className='input-group mb-3'>
                    <Dropdown className='input-group-prepend'>
                      <Dropdown.Toggle
                        variant=''
                        className='btn btn-primary dropdown-toggle'
                        type='button'
                        data-toggle='dropdown'
                      >
                        Dropdown
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='dropdown-menu'>
                        <Dropdown.Item className='dropdown-item' to='#'>
                          Action
                        </Dropdown.Item>
                        <Dropdown.Item className='dropdown-item' to='#'>
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item className='dropdown-item' to='#'>
                          Something else here
                        </Dropdown.Item>
                        <div
                          role='separator'
                          className='dropdown-divider'
                        ></div>
                        <Dropdown.Item className='dropdown-item' to='#'>
                          Separated link
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <input type='text' className='form-control' />
                  </div>

                  <div className='input-group'>
                    <input type='text' className='form-control' />
                    <Dropdown className='input-group-prepend'>
                      <Dropdown.Toggle
                        variant=''
                        className='btn btn-primary dropdown-toggle'
                        type='button'
                        data-toggle='dropdown'
                      >
                        Dropdown
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='dropdown-menu'>
                        <Dropdown.Item className='dropdown-item' to='#'>
                          Action
                        </Dropdown.Item>
                        <Dropdown.Item className='dropdown-item' to='#'>
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item className='dropdown-item' to='#'>
                          Something else here
                        </Dropdown.Item>
                        <div
                          role='separator'
                          className='dropdown-divider'
                        ></div>
                        <Dropdown.Item className='dropdown-item' to='#'>
                          Separated link
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>{' '}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Segmented buttons</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form action='#'>
                  <div className='input-group mb-3'>
                    <SplitButton
                      className='input-group-prepend ml-1'
                      as={ButtonGroup}
                      variant='primary'
                      id='dropdown-button-drop-dwon'
                      drop='dwon'
                      title='Action'
                    >
                      <Dropdown.Item className='dropdown-item' to='#'>
                        Action
                      </Dropdown.Item>
                      <Dropdown.Item className='dropdown-item' to='#'>
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item className='dropdown-item' to='#'>
                        Something else here
                      </Dropdown.Item>
                      <div role='separator' className='dropdown-divider'></div>
                      <Dropdown.Item className='dropdown-item' to='#'>
                        Separated link
                      </Dropdown.Item>
                    </SplitButton>
                    <input type='text' className='form-control' />
                  </div>

                  <div className='input-group'>
                    <input type='text' className='form-control' />
                    <SplitButton
                      className='input-group-prepend ml-1'
                      as={ButtonGroup}
                      variant='primary'
                      id='dropdown-button-drop-dwon'
                      drop='dwon'
                      title='Action'
                    >
                      <Dropdown.Item className='dropdown-item' to='#'>
                        Action
                      </Dropdown.Item>
                      <Dropdown.Item className='dropdown-item' to='#'>
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item className='dropdown-item' to='#'>
                        Something else here
                      </Dropdown.Item>
                      <div role='separator' className='dropdown-divider'></div>
                      <Dropdown.Item className='dropdown-item' to='#'>
                        Separated link
                      </Dropdown.Item>
                    </SplitButton>{' '}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Custom select</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form'>
                <form action='#'>
                  <div className='input-group mb-3' >
                    <div className='input-group-prepend'>
                      <label className='input-group-text'>Options</label>
                    </div>
                    <select
                      defaultValue={'option'}
                      className='form-control form-control-lg'
                    >
                      <option value='option' disabled>
                        Choose...
                      </option>
                      <option value='1'>One</option>
                      <option value='2'>Two</option>
                      <option value='3'>Three</option>
                    </select>
                  </div>

                  <div className='input-group mb-3' >
                    <select
                      defaultValue={'option'}
                      className='form-control form-control-lg'
                    >
                      <option value='option' disabled>
                        Choose...
                      </option>
                      <option value='1'>One</option>
                      <option value='2'>Two</option>
                      <option value='3'>Three</option>
                    </select>
                    <div className='input-group-append'>
                      <label className='input-group-text'>Options</label>
                    </div>
                  </div>

                  <div className='input-group mb-3' >
                    <div className='input-group-prepend'>
                      <button className='btn btn-primary' type='button'>
                        Button
                      </button>
                    </div>
                    <select
                      defaultValue={'option'}
                      className='form-control form-control-xl'
                    >
                      <option value='option' disabled>
                        Choose...
                      </option>
                      <option value='1'>One</option>
                      <option value='2'>Two</option>
                      <option value='3'>Three</option>
                    </select>
                  </div>

                  <div className='input-group' >
                    <select
                      defaultValue={'option'}
                      className='form-control form-control-xl'
                    >
                      <option value='option' disabled>
                        Choose...
                      </option>
                      <option value='1'>One</option>
                      <option value='2'>Two</option>
                      <option value='3'>Three</option>
                    </select>
                    <div className='input-group-append'>
                      <button className='btn btn-primary' type='button'>
                        Button
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Custom file input</h4>
            </div>
            <div className='card-body'>
              <div className='basic-form custom_file_input'>
                <form action='#'>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>Upload</span>
                    </div>
                    <div className='custom-file'>
                      <input type='file' className='custom-file-input' />
                      <label className='custom-file-label'>Choose file</label>
                    </div>
                  </div>

                  <div className='input-group mb-3'>
                    <div className='custom-file'>
                      <input type='file' className='custom-file-input' />
                      <label className='custom-file-label'>Choose file</label>
                    </div>
                    <div className='input-group-append'>
                      <span className='input-group-text'>Upload</span>
                    </div>
                  </div>

                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <button className='btn btn-primary btn-sm' type='button'>
                        Button
                      </button>
                    </div>
                    <div className='custom-file'>
                      <input type='file' className='custom-file-input' />
                      <label className='custom-file-label'>Choose file</label>
                    </div>
                  </div>

                  <div className='input-group'>
                    <div className='custom-file'>
                      <input type='file' className='custom-file-input' />
                      <label className='custom-file-label'>Choose file</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}
