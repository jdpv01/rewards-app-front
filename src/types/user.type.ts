export default interface User {
  id?: any | null,
  email?: string,
  password?: string,
  roles?: Array<string>
}