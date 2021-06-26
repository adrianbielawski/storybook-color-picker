import Adapter from 'enzyme-adapter-react-16';
import 'regenerator-runtime/runtime'
import Enzyme from 'enzyme'
Enzyme.configure({ adapter: new Adapter() });