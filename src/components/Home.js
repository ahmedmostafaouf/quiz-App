import { React, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CubeOutlineIcon from 'mdi-react/CubeOutlineIcon';

const Home = () => (
  <Fragment>
    <Helmet>
      <title> Quize App - Home</title>
    </Helmet>
    <div id='home'>
      <section>
        <div style={{ textAlign: 'center' }}>
          <CubeOutlineIcon className='cube cube' />
        </div>
        <h1>Quize App </h1>
        <div className='play-button-container'>
          <ul>
            <li>
              <Link className='play-button' to='/play/instruction'>
                Play
              </Link>
            </li>
          </ul>
        </div>
        <div className='auth-container'>
          <Link to='/login' className='auth-login'>
            Login
          </Link>
          <Link to='/register' className='auth-register'>
            Register
          </Link>
        </div>
      </section>
    </div>
  </Fragment>
);
export default Home;
