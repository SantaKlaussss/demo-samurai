import React, { Suspense } from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderComponent from './components/Header/HeaderContaier';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
// import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp(); //Информация про авторизованного
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    } else {

      return (
        <Suspense fallback={<Preloader />}>
          <Router>
            <div className='app-wrapper'>
              <HeaderComponent />
              <Nav />
              <div className={'app-wrapper-content'}>
                <Routes>
                  <Route path='/dialogs/*' element={<DialogsContainer />} />
                  <Route path='/profile/:userId?' element={<ProfileContainer />} />
                  <Route path='/users/*' element={<UsersContainer />} />
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

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, { initializeApp })(App);
