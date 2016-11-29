export function createCourse(course){
  return {type:'CREATE_COURSE', course}
}
export function updateCourse(course){
  return {type:'UPDATE_COURSE', course}
}
