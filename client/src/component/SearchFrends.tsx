import React from 'react';
import { Input, List } from 'antd';

import { IUser } from '../types/UserStore';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { searchUser } from '../store/fetch/searchUser';
import SearchFrendsItem from './SearchFrendsItem';

const SearchFrends: React.FC = () => {
    const [users, setUsers] = React.useState<IUser[]>();
    const { user: MyProfile } = useTypedSelector((state) => state.UserReducer);

    React.useEffect(() => {
        (async () => {
            const data = await searchUser(MyProfile?._id!);
            setUsers(data);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = await searchUser(MyProfile?._id!, e.target.value);
        setUsers(data);
    };

    return (
        <>
            <Input onChange={onChangeSearch} placeholder="Введите имя" size="large" />
            <List
                itemLayout="horizontal"
                dataSource={users}
                pagination={{
                    pageSize: 3,
                }}
                renderItem={(user) => <SearchFrendsItem user={user} />}
            />
        </>
    );
};

export default SearchFrends;
