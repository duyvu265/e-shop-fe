import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../../features/Admin/usersSlice';
import AddLinkButton from './AddLinkButton';
import Search from './Search';
import UsersTable from './../Users/UsersTable';
import Pagination from '../../../Pagination';

const Users = () => {
  const dispatch = useDispatch();
  const { users, error } = useSelector(state => state.usersSlice.users);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const dataLimit = 5;
  const totalData = userData?.length;
  const totalPages = Math.ceil(totalData / dataLimit);

  const currentUser = userData.slice((page - 1) * dataLimit, page * dataLimit);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchUsers({ signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(users)) {
      setUserData(users);
    } else {
      setUserData([]);
    }
  }, [users]);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filteredUsers = users?.filter(user =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setUserData(filteredUsers);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (error) {
    return <div className='text-center my-5 text-red-500'>{error}</div>;
  }

  return (
    <div className='container mx-auto'>
      <div className='card my-5 shadow-md'>
        <div className='card-header py-3 flex justify-between items-center'>
          <AddLinkButton btntext={'Add User'} link={'/admin/users/add'} />
          <Search handleSearch={handleSearch} />
        </div>
        <div className='card-body'>
          {userData.length ? (
            <>
              <UsersTable users={currentUser} />
              <Pagination
                currentPage={page}
                hasPrev={page > 1}
                hasNext={page < totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className='text-center my-5'>No users found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
