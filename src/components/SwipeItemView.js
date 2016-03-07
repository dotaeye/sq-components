import React, { Component }from 'react';
import ReactDOM from 'react-dom';
import { Motion, spring } from 'react-motion';
import Box from 'sq-box';

const initialScrollable = Box.initScrollable();

class SwipeItemView extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {fill,scrollable,children,style}=this.props;
    return (
      <Box fill={fill} scrollable={initialScrollable} direction='column'
           style={Object.assign(style,{'flexShrink':0})}
        >
        {children}
      </Box>
    )
  }
}

SwipeItemView.defaultProps = {
  fill: true,
  scrollable: true,
  style:{}
};

SwipeItemView.propTypes = {

  /**
   * If true,the swipe item view will fill the parent container
   */
  fill: React.PropTypes.bool,

  /**
   * If true,the swipe item view will support scroll
   */
  scrollable: React.PropTypes.bool,

  /**
   * This is the inlined style that will be applied
   * on the root component.
   */
  style: React.PropTypes.object,

};

export default SwipeItemView;