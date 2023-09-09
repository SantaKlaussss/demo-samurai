import Dialogs from './Dialogs.tsx';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect.tsx';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store.ts';
import { actionsDialogs } from '../../redux/dialogs-reducer.ts';

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

export default compose<React.ComponentType>(
  withAuthRedirect,
  connect(mapStateToProps, {...actionsDialogs })
)(Dialogs)
