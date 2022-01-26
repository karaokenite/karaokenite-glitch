const path = require("path");
const { startCase } = require("lodash");

function iconTemplate(api, opts, { jsx }) {
  const template = api.template.smart({ plugins: ["jsx"] });
  const { componentName, filePath } = opts.state;
  const exportName = componentName.replace("Svg", "");
  const title = startCase(path.basename(filePath, ".svg"));

  return template.ast`
    import * as React from 'react';
    import { Svg } from '@animus-ui/components';
    
    export const ${exportName} = React.forwardRef(({
      title = "${title}",
      titleId,
      size = 16,
      height = size,
      width = size,
      ...props
    },
      svgRef
    ) => {
      return ${jsx};
    });
  `;
}

module.exports = iconTemplate;