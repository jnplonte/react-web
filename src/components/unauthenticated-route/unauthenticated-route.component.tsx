import * as PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { GetAuth } from '../../provider/authentication/authentication.provider';

const UnAuthenticatedRoute = (props: any) => {
	const { layout: Layout, component: Component, isExact, ...rest } = props;

	const { isLogin } = GetAuth();

	return (
		<Route
			{...rest}
			render={(matchProps) =>
				!isLogin ? (
					<Layout>
						<Component {...matchProps} />
					</Layout>
				) : (
					<Redirect to="/dashboard" />
				)
			}
		/>
	);
};

UnAuthenticatedRoute.propTypes = {
	component: PropTypes.any.isRequired,
	layout: PropTypes.any.isRequired,
	exact: PropTypes.bool,
	path: PropTypes.string,
};

export default UnAuthenticatedRoute;
