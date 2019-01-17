import { NavigationActions } from "react-navigation";

let NAVIGATOR;

export const setNavigator = (ref) => {
  NAVIGATOR = ref;
};

export const navigate = (routeName, params) => {
  NAVIGATOR.dispatch(NavigationActions.navigate({ routeName, params }));
};
