import { Button, ButtonProps, message } from 'antd';
import axios from 'axios';
import classnames from 'classnames';
import React, { FC, useEffect, useState } from 'react';

type UserRoleType = 'USER' | 'ADMIN';

type Props = ButtonProps;

type GetUserRoleRes = {
  userType: UserRoleType;
};

const mapper: Record<UserRoleType, string> = {
  USER: '普通用户',
  ADMIN: '管理员',
};

const getUserRole = async () => {
  return await axios.get<GetUserRoleRes>('localhost:668');
};

export const AuthButton: FC<Props> = (props) => {
  const { children, className, ...restProps } = props;

  const [userType, setUserType] = useState<UserRoleType>();

  const getLoginState = async () => {
    const res = await getUserRole();
    setUserType(res.data.userType);
  };

  useEffect(() => {
    getLoginState().catch((e) => {
      message.error(e.message);
    });
  }, []);

  return (
    <Button {...restProps} className={classnames(className)}>
      {mapper[userType!] || ''}
      {children}
    </Button>
  );
};
