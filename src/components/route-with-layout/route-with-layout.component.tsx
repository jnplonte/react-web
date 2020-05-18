import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Route } from 'react-router-dom';

const routeWithLayout = (props: any) => {
  const { layout: Layout, component: Component, isExact, ...rest } = props;
  return (
    <Route
      {...rest}
      render={ (matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      ) }
    />
  );
};

routeWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string,
};

export default routeWithLayout;
