import React, { Suspense } from 'react';
import './App.css';
import Nav from './components/Nav/Nav.tsx';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer.tsx';
import HeaderComponent from './components/Header/HeaderContaier.tsx';
import LoginPage from './components/Login/Login.tsx';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer.ts';
import Preloader from './components/common/Preloader/Preloader.tsx';
import { AppStateType } from './redux/redux-store';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer.tsx'));

type PropsType = ReturnType<typeof mapStateToProps>
type MapdispatchPropsType = {
  initializeApp: () => void
}

  class App extends React.Component <PropsType & MapdispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp(); //Информация про авторизованного
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    } else {

      return (
        <Suspense fallback={<Preloader />}>
          <Router basename={process.env.PUBLIC_URL}>
            <div className='app-wrapper'>
              <HeaderComponent />
              <Nav />
              <div className={'app-wrapper-content'}>
                <Routes>
                  <Route path='/dialogs/*' element={<DialogsContainer />} />
                  <Route path='/profile/:userId?' element={<ProfileContainer />} />
                  <Route path='/users/*' element={<UsersContainer pageTitle={'Самурай'}/>} />
                  <Route path='/login/*' element={<LoginPage />} />
                </Routes>
              </div>
            </div>
          </Router>
        </Suspense>
      );
    }
  }

}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, { initializeApp })(App);
