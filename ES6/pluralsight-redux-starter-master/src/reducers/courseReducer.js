export default function courseReducer(state=[], action){
  switch(action.type) {
    case 'CREATE_COURSE':
      state = action.course;
      return state;
      // return [...state,Object.assign({}, action.course)];
    case 'UPDATE_COURSE':
      state = action.course;
      return state;
    default:
      return state;
  }
}
