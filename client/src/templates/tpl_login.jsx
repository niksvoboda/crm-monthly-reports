import React, { useContext } from 'react';
import { UserContext } from '../contex';

const Tpl_login = () => {
    const now_year = new Date().getFullYear();
    //console.log(now_year);
    const {user, setUser} = useContext(UserContext)
    const Auth = () =>{
      setUser({username: null, login:'nul1l', isAuth: true, role: 0, permissions:{}})
    }

    return (
<>
<div className="container position-sticky z-index-sticky top-0">
    <div className="row">
      <div className="col-12">
      </div>
    </div>
  </div>
  <main className="main-content  mt-0">
    <div className="page-header align-items-start min-vh-100" style={{backgroundImage: "url('./assets/img/bg-login.jpg')"}}>
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Вход</h4>
                  <div className="row mt-3">
                    <div className="col-2 text-center ms-auto">
                      <a className="btn btn-link px-3" >
                        <i className="fa fa-facebook text-white text-lg"></i>
                      </a>
                    </div>
                    <div className="col-2 text-center px-1">
                      <a className="btn btn-link px-3" >
                        <i className="fa fa-github text-white text-lg"></i>
                      </a>
                    </div>
                    <div className="col-2 text-center me-auto">
                      <a className="btn btn-link px-3" >
                        <i className="fa fa-google text-white text-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form role="form" className="text-start">
                  <div className="input-group input-group-outline my-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control"/>
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control"/>
                  </div>
                  <div className="form-check form-switch d-flex align-items-center mb-3">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Запомнить меня</label>
                  </div>
                  <div className="text-center">
                    <button type="button" 
                    onClick={event=>Auth()}
                    className="btn bg-gradient-primary w-100 my-4 mb-2">Вход</button>
                  </div>
                  <p className="mt-4 text-sm text-center">
                    Нет аккаунта?&nbsp;
                    <a href="#" className="text-primary text-gradient font-weight-bold">Регистрация</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer position-absolute bottom-2 py-2 w-100">
        <div className="container">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-12 col-md-6 my-auto">
              <div className="copyright text-center text-sm text-white text-lg-start">
                © {now_year}. ООО "Динатех"                
              </div>
            </div>
            <div className="col-12 col-md-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                <li className="nav-item">
                  <a href="#" className="nav-link text-white" target="_blank">Creative Tim</a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white" target="_blank">About Us</a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white" target="_blank">Blog</a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link pe-0 text-white" target="_blank">License</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </main>
</>);
};

export default Tpl_login;