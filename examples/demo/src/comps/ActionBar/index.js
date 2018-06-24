import { Heart, Download, MessageSquare, Share } from 'preact-feather';
import classnames from 'classnames';

import Action from '../Action';

import './ActionBar.scss';

const actions = [
  {
    icon: Heart,
    label: 'Like'
  },
  {
    icon: MessageSquare,
    label: 'Comment'
  },
  {
    icon: Share,
    label: 'Share'
  },
  {
    icon: Download,
    label: 'Download'
  }
];

const ActionBar = props => {
  const classes = classnames(
    'actionbar',
    props.className,
    `actionbar--${props.vertical ? 'vertical' : 'horizontal'}`
  );
  return (
    <div className={classes}>
      {actions.map(action => <Action key={action.label} {...action} />)}
    </div>
  );
};

export default ActionBar;
