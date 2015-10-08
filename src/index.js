import Brahma from './brahma';

const writer = (brahma) => (session, category, subcategory,
                            action, item, tags, notes) => {
  brahma.write(session, category, subcategory, action, item, tags, notes);
};

export const metrics = (directoryName) => {
  const b = new Brahma(directoryName, 3600000);
  return writer(b);
};

export const logging = (directoryName) => {
  const b = new Brahma(directoryName, 3600000);
  return writer(b);
};
