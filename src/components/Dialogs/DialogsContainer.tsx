import Dialogs from './Dialogs.tsx';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect.js';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store.ts';
import { actionsDialogs } from '../../redux/dialogs-reducer.ts';

type MapStateToPropsType = (state: AppStateType) => void


const mapStateToProps: MapStateToPropsType = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

type MapDispatchToPropsType = (dispatch: any) => void

const mapDispatchToProps: MapDispatchToPropsType = (dispatch) => { // Передаем в функцию коннект диспатчи с экшенами
  return {
    sendMessage: (newMessageBody: string) => {
      dispatch(actionsDialogs.sendMessageCreator(newMessageBody));
    }
  }
} 

export default compose<React.Component>(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)
