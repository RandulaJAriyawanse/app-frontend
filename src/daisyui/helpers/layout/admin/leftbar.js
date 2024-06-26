const findItem = (menuItems, url) => {
  for (const item of menuItems) {
    if (item.url == url) {
      return item;
    }
    if (item.children) {
      const fItem = findItem(item.children, url);
      if (fItem) {
        return fItem;
      }
    }
  }
  return null;
};

export const getActivatedLeftbarParentKeys = (menuItems, url) => {
  const menuItem = findItem(menuItems, url);
  if (!menuItem) return [];

  for (const item of menuItems) {
    if (item.key == menuItem.key) {
      return [item.key];
    }

    if (item.children) {
      for (const iItem of item.children) {
        if (iItem.key == menuItem.key) {
          return [item.key, iItem.key];
        }
      }
    }
  }
  return [];
};
