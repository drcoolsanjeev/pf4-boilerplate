import React from "react";
import { useHistory } from "react-router-dom";

import "@patternfly/react-core/dist/styles/base.css";
import { AppLayoutContext } from "use-patternfly";
import { Brand, Avatar, Page } from "@patternfly/react-core";

import { NavToolBar } from "components";

import { AppNavHeader } from "./AppNavHeader";
import brandImg from "./assets/images/logo.svg";
import avatarImg from "./assets/images/img_avatar.svg";
import "./App.css";

const avatar = (
  <React.Fragment>
    <Avatar src={avatarImg} className="app-avatar" alt="avatar" />
  </React.Fragment>
);

const logoText = process.env.REACT_APP_NAME
  ? process.env.REACT_APP_NAME + " Logo"
  : "Console Logo";
const brandImgLogo = <Brand alt={logoText} />;

const AppLayout: React.FC = () => {
  const history = useHistory();
  const [breadcrumb, setBreadcrumb] = React.useState<
    React.ReactNode | undefined
  >();
  const previousBreadcrumb = React.useRef<React.ReactNode | null>();

  const handleSetBreadcrumb = React.useCallback(
    (newBreadcrumb: React.ReactNode) => {
      if (previousBreadcrumb.current !== newBreadcrumb) {
        previousBreadcrumb.current = newBreadcrumb;
        setBreadcrumb(previousBreadcrumb.current);
      }
    },
    [setBreadcrumb, previousBreadcrumb]
  );
  const logoProps = React.useMemo(
    () => ({
      onClick: () => history.push("/")
    }),
    []
  );

  const header = (
    <AppNavHeader
      logo={brandImgLogo}
      logoProps={logoProps}
      avatar={avatar}
      toolbar={<NavToolBar />}
    />
  );
  return (
    <AppLayoutContext.Provider value={{ setBreadcrumb: handleSetBreadcrumb }}>
      <Page
        header={header}
        breadcrumb={breadcrumb}
        mainContainerId="main-container"
      ></Page>
    </AppLayoutContext.Provider>
  );
};

export default AppLayout;
