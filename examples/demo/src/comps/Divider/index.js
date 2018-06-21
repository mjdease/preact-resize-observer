import classnames from 'classnames';

import './Divider.scss';

const Divider = props => {
  const classes = classnames(
    'divider',
    { 'divider--vertical': props.vertical },
    { 'divider--horizontal': props.horizontal }
  );
  return <div className={classes} />;
};

export default Divider;
