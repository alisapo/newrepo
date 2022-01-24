import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/hooks';
import { getUser, getUserRepos, user, url, repos } from './userPageSlice';

import RepoCard from '../repoCard/repoCard';
import styles from './UserPage.module.scss';

interface UserpageState {
  user: {
    avatar_url: string;
    name: string;
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

const UserPage = () => {
  const dispatch = useDispatch();

  const { login } = useParams();

  const userData = useAppSelector(user);
  const reposUrl = useAppSelector(url);
  const userRepos = useAppSelector(repos);

  //get user info
  React.useEffect(() => {
    dispatch(getUser(login))
  }, [dispatch])

  //get repos of user
  React.useEffect(() => {
    dispatch(getUserRepos(reposUrl))
  }, [reposUrl])

  return (
    <div className={styles.page}>
      <h3>{userData?.login}</h3>
      <div className={styles.repoinfo}>
        <div className={styles.avatar}>
          <img src={userData?.avatar_url} alt="avatar" />
          <div className={styles.name}>
            <p>{userData?.name}</p>
            <a href={userData?.html_url}>GitHub</a>
          </div>
        </div>
        <div className={styles.repos}>
          <p>Недавно обновлённые репозитории</p>
          <div className={styles.repocards}>
            {userRepos?.length ? userRepos.map(repo => {
              return (
                <RepoCard repo={repo} key={repo.id} />
              )
            }) : <div>Загрузка...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
