import classnames from 'classnames';

import './Divider.scss';

const Divider = props => {
  const classes = classnames(
    'divider',
    props.vertical ? 'divider--vertical' : 'divider--horizontal'
  );
  return <div className={classes} />;
};

export default Divider;
