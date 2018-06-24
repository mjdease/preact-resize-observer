import Heart from 'preact-feather/dist/icons/heart';
import Download from 'preact-feather/dist/icons/download';
import MessageSquare from 'preact-feather/dist/icons/message-square';
import Share from 'preact-feather/dist/icons/share';
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
    `actionbar--${props.vertical ? 'vertical' : 'horizontal'}`,
    props.className
  );
  return (
    <div className={classes}>
      {actions.map(action => <Action key={action.label} {...action} />)}
    </div>
  );
};

export default ActionBar;
