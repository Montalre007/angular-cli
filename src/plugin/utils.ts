export const utils = {
  getResource (resourceInfos, resourceIds) {
    const array = new Array();
    if (null != resourceInfos && null != resourceIds && '' != resourceIds) {
      const resourceArray = resourceIds.split(',');
      resourceInfos.forEach(function (data, index, arr) {
        for (let i = 0; i < resourceArray.length; i++) {
          if (resourceArray[i] == data.resourceId) {
            array.push(data);
          }
        }
      });
    }
    return array;
  }
}
