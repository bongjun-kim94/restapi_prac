import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
          // 요청이 시작 할 때에는 error 와 users 를 초기화하고
          setError(null);
          setUsers(null);
          // loading 상태를 true 로 바꿉니다.
          setLoading(true);
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
          );
          setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          setError(e);
        }
        setLoading(false);
    };

    // axios.post()로 데이터를 등록 할 때에는 두번째 파라미터에 등록하고자 하는 정보를 넣음
    // axios.post('/users', {
    //   username: 'haha',
    //   name: 'haha'
    // })

    // useEffect에 첫번째 파라미터 등록 함수는 async를 사용 할 수 없어서 함수 내부에서 새로 선언해 주어야함
    useEffect(() => {
          fetchUsers();
    }, []);

    // 로딩상태 활성화
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    // users 값이 없을땐 null
    if (!users) return null;
    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.name}) - {user.email}
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
    );
}

export default Users;