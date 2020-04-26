import { configure, shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import React from 'react'

import Button from '../src/components/generic/Button'


configure({ adapter: new Adapter() })

describe('Test Generic Components', function() {
  describe('Test Simple Button Component', function() {
    it('Test Label prop', function() {
      const buttonNode = shallow(<Button label="Push Me"/>)
      expect(buttonNode.find('span').text()).equal("Push Me")
    });

    it('Test smallText prop', function() {
      let buttonNode = shallow(<Button />)
      expect(buttonNode.exists('small')).to.equal(false)

      const smallText = "Hey I am tiny text"
      buttonNode = shallow(<Button smallText={smallText} />)
      expect(buttonNode.find('small').text()).equal(smallText)
    });

    it('Test onClick props', function() {
      const clickCallback = sinon.spy()
      const buttonNode = shallow(<Button onClick={clickCallback}/>)
      buttonNode.find("button").simulate("click")
      sinon.assert.called(clickCallback)
    });

    it('Test disabled prop prevents onClick', function() {
      const clickCallback = sinon.spy()

      // Disabled does not work on shallow components, therefore mount is required
      const buttonNode = mount(<Button onClick={clickCallback} disabled={true}/>)
      buttonNode.mount()
      buttonNode.find("button").simulate("click")
      sinon.assert.notCalled(clickCallback)
    });
  });

});
