import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CryptocapeLogo from '../img/Cryptocape9.png';
import FullWidthTabs from './FullWidthTabs';
import PageContainer from './PageContainer';
import { mailFolderListItems, otherMailFolderListItems } from './NavigationItems';
// import { SimpleMediaCard } from './SimpleMediaCard';

const drawerWidth = 210;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fixed',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#3f51b5',
    background: '-webkit-linear-gradient(-90deg, #3f51b5, #2d0056)',
    background: '-o-linear-gradient(-90deg, #3f51b5, #2d0056)',
    background: '-moz-linear-gradient(-90deg, #3f51b5, #2d0056)',
    background: 'linear-gradient(-90deg, #3f51b5, #2d0056)',
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    width: drawerWidth,
    zIndex: 1080,
  },
  drawerPaperPlaceholder: {
    position: 'relative',
    width: drawerWidth,
    zIndex: 1080,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  transitionWidth: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class App extends React.Component {
  state = {
    open: false,
    anchor: 'left',
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open }, function(){
      setTimeout(function(){
        window.dispatchEvent(new Event('resize'))
      }, 100)
    });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    let widthOverride = {
      width: window.innerWidth + "px"
    }
    if (open && drawerWidth) {
      widthOverride = {
        width: "calc(100% - " + drawerWidth + "px)"
      }
    }

    const drawer = (
      <div>
        <div
          className={classes.drawerPaperPlaceholder}>
        </div>
        <Drawer
          variant="persistent"
          anchor={anchor}
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
          </div>
          <Divider />
          <List>{mailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </Drawer>
      </div>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        {/* <TextField
          id="persistent-anchor"
          select
          label="Anchor"
          value={anchor}
          onChange={this.handleChangeAnchor}
          margin="normal"
        >
          <MenuItem value="left">left</MenuItem>
          <MenuItem value="right">right</MenuItem>
        </TextField> */}
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={true}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classNames(classes.menuButton) + " menu-button"}
              >
                <MenuIcon />
              </IconButton>
              <a className={"header-logo"} href="./">
                <img className={"header-logo"} src={CryptocapeLogo} />
              </a>
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
            style={{ maxWidth: '100%' }}
          >
            <div className={classes.drawerHeader} />
            <div className={classNames({[classes.pageWidth]: open}) + " " + classes.transitionWidth} style={widthOverride}>
              <PageContainer/>
            </div>
          </main>
          {after}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);