import {metrics} from './index';

const stressTest = () => {
  const meter = metrics('metrics');
  const test = () => {
    meter(
      'Session?',
      'Some Category!',
      'Sub sub category!',
      'Some action',
      'Item info',
      'tags tags!',
      'notes?');
    setTimeout(test, 1);
  };
  test();
};

export default stressTest;
