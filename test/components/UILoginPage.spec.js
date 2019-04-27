import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import UILoginPage from '../../app/components/Login/UILoginPage';
import * as dataTestIds from 'constants/dataTestIds';

import { findComponentByDataTestId } from '../testUtils';

Enzyme.configure({ adapter: new Adapter() });

function setup(componentState = {}) {
  const props = {
    onLoginClicked: spy(),
    authenticated: false
  };

  const component = shallow(<UILoginPage {...props} />);
  component.setState(componentState);
  const loginButton = findComponentByDataTestId(
    component,
    dataTestIds.LOGIN_BUTTON_ID
  );
  const usernameInput = findComponentByDataTestId(
    component,
    dataTestIds.LOGIN_USERNAME_INPUT_ID
  );
  const passwordInput = findComponentByDataTestId(
    component,
    dataTestIds.LOGIN_PASSWORD_INPUT_ID
  );

  return {
    component,
    loginButton,
    usernameInput,
    passwordInput,
    props
  };
}

describe('UILoginPage component', () => {
  it('renders correctly', () => {
    const { props } = setup();
    const tree = renderer.create(<UILoginPage {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('login button should call onLoginClicked with correct paramaters', () => {
    const componentState = {
      username: 'hello',
      password: 'world'
    };
    const { component, loginButton, props } = setup(componentState);
    loginButton.simulate('click');
    expect(
      props.onLoginClicked.calledWith(
        componentState.username,
        componentState.password
      )
    ).toBe(true);
  });

  it('should update state when handleInputUpdate is called', () => {
    const { component, usernameInput, passwordInput } = setup();
    const USERNAME = 'hello';
    const PASSWORD = 'world';

    usernameInput.simulate('change', { target: { value: USERNAME } });
    passwordInput.simulate('change', { target: { value: PASSWORD } });

    expect(component.state().username).toBe(USERNAME);
    expect(component.state().password).toBe(PASSWORD);
  });
});
