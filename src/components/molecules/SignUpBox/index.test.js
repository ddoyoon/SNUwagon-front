import React from 'react'
import { shallow } from 'enzyme'
import SignUpBox from '.'

const wrap = (props = {}) => shallow(<SignUpBox {...props} />).dive()

it('renders', () => {
  wrap({
    onClickBack: () => {},
    onClickSignUp: () => {},
  })
})


it('handle click sign up button', () => {
  const props = {
    onClickSignUp: jest.fn(),
  }
  const wrapper = wrap(props)
  wrapper.find('.email-input').simulate('change', { target: { value: 'email@email.com' } })
  wrapper.find('.username-input').simulate('change', { target: { value: 'user' } })
  wrapper.find('.password-input').simulate('change', { target: { value: 'pass' } })
  wrapper.find('.sign-up-button').simulate('click')
  expect(props.onClickSignUp).toHaveBeenCalled()
})

it('handle click back button', () => {
  const props = {
    onClickBack: jest.fn(),
  }
  const wrapper = wrap(props)
  wrapper.find('.back-button').simulate('click')
  expect(props.onClickBack).toHaveBeenCalled()
})