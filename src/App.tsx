import React from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from './app/hooks';
import { Userlist } from './features/userlist/Userlist';
import { getUsers, nextPage, prevPage, users, getPage } from './features/userlist/userlistSlice';

import styles from './App.module.scss';


function App() {
  const gitUsers = useAppSelector(users)
  const page = useAppSelector(getPage)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getUsers(page))
  }, [dispatch, page])

  return (
    <div className={styles.wrap}>
      <h3>Пользователи GitHub</h3>
      <div className={styles.users}>
        {gitUsers?.length ?
          gitUsers.map(user => {
            return <Userlist user={user} key={user.id} />
          }) : <div>Загрузка...</div>}
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          aria-label="Prev page"
          onClick={() => dispatch(prevPage())}
          disabled={page === 0 ? true : false}
        >
          Назад
        </button>
        <button
          className={styles.button}
          aria-label="Next page"
          onClick={() => dispatch(nextPage())}
          disabled={page === 1000 ? true : false}
        >
          Далее
        </button>
      </div>
    </div>
  );
}

export default App;
