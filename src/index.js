import Brahma from './brahma';

const writer = (brahma) => (location, section, category,
                            action, item, tags, notes) => {
  brahma.write(location, section, category, action, item, tags, notes);
};

export const metrics = (directoryName) => {
  const b = new Brahma(directoryName, 3600000);
  return writer(b);
};

export const logging = (directoryName) => {
  const b = new Brahma(directoryName, 3600000);
  return writer(b);
};

export const stressTest = () => {
  const meter = metrics('metrics');
  const test = () => {
    // meter('Some category', 'some action', 'tags tags!', 'notes?');
    setTimeout(test, 1);
  };
  test();
};
