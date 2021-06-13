import React from "react";

import * as ace from "ace-builds";

export const useAce = (renderChartFn, dependencies) => {
  const ref = React.useRef();

  React.useEffect(() => {
    renderChartFn(ace.select(ref.current));

    return () => {};
  }, [renderChartFn, ...dependencies]);

  return ref;
};
