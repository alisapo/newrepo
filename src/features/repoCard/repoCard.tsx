import React from 'react';
import styles from './RepoCard.module.scss';

interface RepoState {
  repo: {
    html_url: string;
    id: number;
    name: string;
    description: string;
    language: string;
    updated_at: string;
  };
}

const RepoCard = ({ repo }: RepoState) => {
  return (
    <div key={repo.id} className={styles.repocard}>
      <a href={repo.html_url}>{repo.name}</a>
      <div>{repo.description}</div>
      <div className={styles.language}>Язык: {repo.language}</div>
      <div className={styles.upd}>Обновлено: {repo.updated_at}</div>
    </div>
  );
}

export default RepoCard;
