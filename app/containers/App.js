import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { ipcRenderer } from 'electron';
import { exec } from 'child_process';
import DecompressZip from 'decompress-zip';
import type { Children } from 'react';

import SideBar from '../components/SideBar/SideBar';
import SupportModal from '../components/SideBar/SupportModal';
import TopBar from '../components/TopBar';
import Auth from '../components/Auth/Auth';

import { removeUser, updateProfilePic } from '../actions/user';
import { startInstall, finishInstall } from '../actions/game';

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

const mapDispatchToProps = dispatch => ({
  logout: () => {
    localStorage.removeItem('token');
    dispatch(removeUser());
  },
  updateUserPic: profilePic => dispatch(updateProfilePic(profilePic)),
  startInstalling: () => dispatch(startInstall()),
  completeInstall: () => dispatch(finishInstall())
});

let isInstalling = false;

class App extends Component {
  props: {
    children: Children,
    history: {},
    user: {},
    logout: Function, //eslint-disable-line
    updateUserPic: Function, //eslint-disable-line
    startInstalling: Function, //eslint-disable-line
    completeInstall: Function //eslint-disable-line
  };

  componentDidMount() {
    const { startInstalling } = this.props;
    ipcRenderer.on('download-finish', (event, args) => {
      const { savePath, url } = args;

      const brokenUrl = url.split('/');
      const filename = brokenUrl[brokenUrl.length - 1];
      const unzipTo = savePath.substring(0, savePath.length - filename.length);

      if (isInstalling) return;
      isInstalling = true;
      startInstalling();

      if (process.platform === 'darwin') this.unzipMac(savePath, unzipTo);
      else this.unzipWin(savePath, unzipTo);
    });

    ipcRenderer.on('updateReady', () => {
      console.log('update!');
    });
  }

  unzipMac = (savePath, unzipTo) => {
    const { completeInstall } = this.props;
    exec(`unzip ${savePath} -d ${unzipTo}`, (error) => {
      if (error) { throw error; }
      completeInstall();
      isInstalling = false;

      // Delete .zip after unzipping
      exec(`rm -rf ${savePath}`, (err) => {
        if (err) { throw err; }
      });
    });
  };

  unzipWin = (savePath, unzipTo) => {
    const { completeInstall } = this.props;
    const unzipper = new DecompressZip(savePath);

    unzipper.extract({ path: unzipTo });

    // Delete .zip after unzipping
    unzipper.on('extract', () => {
      completeInstall();
      isInstalling = false;

      exec(`DEL ${savePath}`, (error) => {
        if (error) { throw error; }
      });
    });
  };

  render() {
    const { user, logout, updateUserPic } = this.props;
    const isAuthorized = !_.isEmpty(user);
    return (
      <React.Fragment>
        {
          isAuthorized
          ? (
            <React.Fragment>
              <SideBar user={user} logout={logout} updateUserPic={updateUserPic} />
              <div id="content-container" className="content-container">
                <TopBar history={this.props.history} />
                <div className="content">
                  {this.props.children}
                  <SupportModal userId={user._id} email={user.email} />
                </div>
              </div>
            </React.Fragment>
          )
          : <Auth />
        }
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
