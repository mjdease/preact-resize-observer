import './Action.scss';

const Action = ({ icon: Icon, label }) => (
  <div className="action">
    <Icon className="action__icon" size={18} />
    <div className="action__label">{label}</div>
  </div>
);

export default Action;
