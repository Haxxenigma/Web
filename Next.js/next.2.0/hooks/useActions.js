import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import * as userActions from '@/store/user/user.actions';
import * as exampleActions from '@/store/example/example.actions';

const rootActions = {
    ...userActions,
    ...exampleActions,
};

export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};