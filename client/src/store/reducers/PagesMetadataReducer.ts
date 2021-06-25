type TPagesMetadataState = {
    collapsed: boolean;
};

enum TPagesMetadataActionEnum {
    SET_COLLEPSED = 'SET_COLLEPSED',
}

type TSetCollepsed = {
    type: TPagesMetadataActionEnum.SET_COLLEPSED;
};

type TPagesMetadataAction = TSetCollepsed;

const defaultStore: TPagesMetadataState = {
    collapsed: false, // стостояние бокового меню, нужно было вынести для верстки
};

export const PagesMetadataReducer = (
    state = defaultStore,
    action: TPagesMetadataAction,
): TPagesMetadataState => {
    switch (action.type) {
        case TPagesMetadataActionEnum.SET_COLLEPSED:
            return { ...state, collapsed: !state.collapsed };
        default:
            return state;
    }
};

export const setCollepsed = (): TSetCollepsed => ({
    type: TPagesMetadataActionEnum.SET_COLLEPSED,
});
