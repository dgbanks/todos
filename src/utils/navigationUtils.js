import { NavigationActions } from "react-navigation";

let NAVIGATOR;

const setNavigator = ref => {
  NAVIGATOR = ref;
};

const navigate = (routeName, params) => {
  NAVIGATOR.dispatch(NavigationActions.navigate({ routeName, params }));
};

const goBack = () => {
  NAVIGATOR.dispatch(NavigationActions.back());
};

const setParams = params => {
  const key = NAVIGATOR._navigation.state.routes[0].key;
  NAVIGATOR.dispatch(NavigationActions.setParams({ key, params }));
};

export default { setNavigator, navigate, goBack, setParams };
