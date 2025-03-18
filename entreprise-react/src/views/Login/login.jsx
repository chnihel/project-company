import React, { useEffect, useState } from 'react';
import auth from '../../service/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginError, loginRequest, loginSuccess } from '../../redux/userSlice';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [Data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const OnchangeHandler = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const SignIn = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginRequest());

      const response = await auth.SignIn(Data);
      console.log("Authentifiée avec succès :", response.data);

      const { user, tokens } = response.data;
      const itemType = user.item?.trim().toLowerCase();
      const UserStatus = user.status?.trim();
      const UserVerify = user.verify;

      console.log("Valeur normalisée de user.item :", itemType);
      console.log("Valeur normalisée de user.status :", UserStatus);
      console.log("Valeur de user.verify :", UserVerify);

      if (itemType === "entreprise" && UserVerify === true && UserStatus === "Acceptable") {
        alert("Authentifiée avec succès !");
        const userData = {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            username: user.username,
            password: user.password,
            code: user.code,
            verify: user.verify,
            item: user.item,
            logo: user.logo,
            numero: user.numero,
            siteweb: user.siteweb,
            responsable: user.responsable,
            description: user.description,
            archive: user.archive,
            status: user.status,
          },
          tokens: {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          },
        };

        dispatch(loginSuccess(userData));
        navigate('/');
      } else if (itemType === "admin") {
        alert("Authentifiée avec succès !");
        const userData = {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            username: user.username,
            password: user.password,
            code: user.code,
            verify: user.verify,
            item: user.item,
            logo: user.logo,
          },
          tokens: {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          },
        };

        dispatch(loginSuccess(userData));
        navigate('/homeAdmin');
      } else {
        alert("Accès refusé : Vérifiez vos informations !");
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      dispatch(loginError(error));
      alert("Erreur lors de l'authentification.");
    }
  };

  // 🔹 Fonction pour gérer la connexion avec Auth0
  useEffect(() => {
    if (isAuthenticated) {
      const handleAuth0Login = async () => {
        try {
          dispatch(loginRequest());
          const token = await getAccessTokenSilently();

          const userData = {
            user: {
              id: user.sub, // Auth0 ID
              email: user.email,
              name: user.name,
              picture: user.picture, // Avatar Auth0
            },
            tokens: {
              accessToken: token,
            },
          };
          navigate('/'); // Redirige vers la page d'accueil ou autre page
        } catch (error) {
          console.error("Erreur Auth0 :", error);
          dispatch(loginError(error));
        }
      };

      handleAuth0Login();
    }
  }, [isAuthenticated, user, getAccessTokenSilently, dispatch, navigate]);

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                    <img src="../assets/images/logos/logo-light.svg" alt="" />
                  </a>
                  <p className="text-center">Your Social Campaigns</p>
                  <form onSubmit={SignIn}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={OnchangeHandler} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={OnchangeHandler} />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="form-check">
                        <input className="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked />
                        <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
                          Remember this Device
                        </label>
                      </div>
                      <Link to="/forgot" className="text-primary fw-bold">Forgot Password ?</Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4">Sign In</button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">New to SeoDash?</p>
                      <Link className="text-primary fw-bold ms-2" to="/register">Create an account</Link>
                    </div>
                  </form>
                  <button onClick={() => loginWithRedirect()} className="btn btn-outline-primary w-100 py-8 fs-4 mb-4">
                    Se connecter avec Auth0
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
