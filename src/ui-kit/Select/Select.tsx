import React from 'react';
import { Select as AntSelect, SelectProps } from 'antd';
import { classNames } from '@utils';
import type { BaseSelectRef } from 'rc-select/lib/BaseSelect';
import { ISelect } from './types';
import './select.less';

const { Option } = AntSelect;

const Select = React.forwardRef<BaseSelectRef, SelectProps & ISelect>((props, ref) => {
  const {
    data, className, ...rest
  } = props;

  return (
    <AntSelect
      className={classNames('ui-kit-select', className)}
      ref={ref}
      {...rest}
    >
      {
        data.map((item) => {
          return (
            <Option key={item.id}>
              {item.value}
            </Option>
          );
        })
      }
    </AntSelect>
  );
});

export default Select;
