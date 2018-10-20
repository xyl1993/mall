const Login = ()=> import('./auth/login');
const test = ()=> import('./test/test');
export default [{
  path: '/login',
  component: Login,
  name: '登陆'
},{
  path: '/test',
  component: test,
  name: 'canvers'
}]