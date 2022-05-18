
const initState =
{
    heroes: []
}


const heroesReducer = (state = initState, action) => {
    const funcs = {
        'LOAD_HEROES': () => ({ ...state, heroes: action.payload }),

        'DEL_HERO': () => {
            const filterArr = state.heroes.filter(hero => hero.id !== action.payload)
            return { ...state, heroes: filterArr }
        }
    }
    if (action.type in funcs)
        return funcs[action.type]();
    else
        return state;
}

export default heroesReducer;