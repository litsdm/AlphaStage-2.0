import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { ipcRenderer } from 'electron';
import { exec } from 'child_process';
import { graphql } from 'react-apollo';
import DecompressZip from 'decompress-zip';
import swal from 'sweetalert';
import { func, object, node } from 'prop-types';

import client from '../client';

import SideBar from '../components/SideBar/SideBar';
import SupportModal from '../components/SideBar/SupportModal';
import TopBar from '../components/TopBar';
import Auth from '../components/Auth/Auth';
import Controls from '../components/Controls';

import userLevel from '../graphql/userLevel.graphql';

import { removeUser, updateProfilePic } from '../actions/user';
import { startInstall, finishInstall } from '../actions/game';

const withLevel = graphql(userLevel, {
  props: ({ data }) => {
    if (!data.user) return { loading: data.loading };
    if (data.error) return { hasErrors: true };
    return {
      userExp: data.user,
    };
  },
  options: ({ user }) => ({ variables: { id: user._id } })
});

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

const mapDispatchToProps = dispatch => ({
  logout: () => {
    localStorage.removeItem('token');
    dispatch(removeUser());
    client.resetStore();
  },
  updateUserPic: profilePic => dispatch(updateProfilePic(profilePic)),
  startInstalling: () => dispatch(startInstall()),
  completeInstall: () => dispatch(finishInstall())
});

let isInstalling = false;

class App extends Component {
  state = {
    expFill: ''
  }

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
      swal({
        title: 'Update Available!',
        text: 'Alpha Stage needs to restart so this update can be installed. Do you want to restart it?',
        icon: 'info',
        buttons: {
          cancel: 'Later',
          restart: {
            text: 'Restart now',
            value: 'quitAndInstall'
          }
        }
      })
        .then(event => ipcRenderer.send(event))
        .catch(err => console.log(err));
    });
  }

  componentWillReceiveProps(nextProps) {
    const { experience, nextLevelExp } = nextProps.userExp;
    if (experience !== this.props.userExp.experience) {
      const fill = (experience * 100) / nextLevelExp;
      this.setState({ expFill: `${fill}%` });
    }
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
    const { user, logout, updateUserPic, userExp } = this.props;
    const { expFill } = this.state;
    const isAuthorized = !_.isEmpty(user);
    return (
      <React.Fragment>
        {
          isAuthorized
          ? (
            <React.Fragment>
              {
                process.platform !== 'darwin'
                  ? <Controls />
                  : null
              }
              <SideBar
                user={{ ...user, ...userExp }}
                expFill={expFill}
                logout={logout}
                updateUserPic={updateUserPic}
              />
              <div
                id="content-container"
                className="content-container"
                style={process.platform !== 'darwin' ? { marginTop: '24px' } : {}}
              >
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

App.propTypes = {
  children: node.isRequired,
  history: object,
  user: object,
  userExp: object,
  logout: func.isRequired,
  updateUserPic: func.isRequired,
  startInstalling: func.isRequired,
  completeInstall: func.isRequired
};

App.defaultProps = {
  history: {},
  user: {},
  userExp: {}
};

const graphqlApp = withLevel(App);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(graphqlApp));
