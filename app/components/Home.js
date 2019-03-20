// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styled from 'styled-components';

import UIAddButton from 'ui-components/UIAddButton';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PasswordsContainer = styled.div`
  flex: 5;
`;
const AddButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const AddButtonStyleWrapper = styled.div`
  margin-top: 80vh;
  position: absolute;
  padding-right: 30px;
`;

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <HomeContainer>
        <PasswordsContainer />
        <AddButtonContainer>
          <AddButtonStyleWrapper>
            <UIAddButton
              onClick={() => {
                console.log('add button clicked');
              }}
            />
          </AddButtonStyleWrapper>
        </AddButtonContainer>
      </HomeContainer>
    );
  }
}
