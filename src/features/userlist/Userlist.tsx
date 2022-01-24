import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Userlist.module.scss';

interface UsersState {
  user: {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
  };
}

export function Userlist({ user }: UsersState) {
  return (
    <div key={user.id} className={styles.card}>
      <img src={user.avatar_url} alt="avatar" />
      <div className={styles.info}>
        <div>{user.login}</div>
        <div>Тип: {user.type}</div>
        <Link to={`user/${user.login}`}>Профиль</Link>
      </div>
    </div>
  );
}
