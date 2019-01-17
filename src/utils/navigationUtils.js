import { NavigationActions } from "react-navigation";

let NAVIGATOR;

const setNavigator = (ref) => {
  NAVIGATOR = ref;
};

const navigate = (routeName, params) => {
  NAVIGATOR.dispatch(NavigationActions.navigate({ routeName, params }));
};

const goBack = () => {
  NAVIGATOR.dispatch(NavigationActions.back());
};

export default { setNavigator, navigate, goBack };
