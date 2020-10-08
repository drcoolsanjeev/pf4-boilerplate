import React from "react";
import { useHistory } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { Alert, PageSection, AlertActionLink } from "@patternfly/react-core";

const styles = StyleSheet.create({
  alert: {
    backgroundColor: "var(--pf-c-alert--m-inline--BackgroundColor)"
  }
});
interface INotFoundProps {
  updateState: (error: boolean) => void;
}

const NotFound: React.FunctionComponent<INotFoundProps> = ({ updateState }) => {
  const history = useHistory();

  const handleAlertActionLink = () => {
    updateState && updateState(false);
    history.push("/");
  };

  return (
    <PageSection>
      <Alert
        id="not-found-unexpected error-alert"
        variant="danger"
        title="Unexpected Error"
        className={css(styles.alert)}
        actionLinks={
          <AlertActionLink
            id="not-found-take-me-home-alert-action-link"
            onClick={handleAlertActionLink}
          >
            Take me home
          </AlertActionLink>
        }
      >
        Something went wrong. Please try again!
      </Alert>
    </PageSection>
  );
};

export { NotFound };
