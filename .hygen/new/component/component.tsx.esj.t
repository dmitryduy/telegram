---
to: <%= absPath %>/<%= componentName %>.tsx
---
import React from 'react';

import {<%= componentName %>Styled} from './<%= componentName %>.styles';

interface I<%= componentName %>Props {
    prop: string
}

const <%= componentName %>: React.FC<I<%= componentName %>Props> = ({prop}) => {
  return (
    <<%= componentName %>Styled>
      {prop}
    </<%= componentName %>Styled>
  );
};

export default <%= componentName %>;