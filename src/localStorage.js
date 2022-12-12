export const loadState = () => {
    try {
      //const serializedState = localStorage.getItem("cfstate");
      const authJson = localStorage['auth'];
      if (!authJson) {
        return undefined;
      }
      return JSON.parse(authJson);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("auth", serializedState);
    } catch {
      // ignore write errors
    }
  };
  