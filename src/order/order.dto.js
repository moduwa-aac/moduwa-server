export const toOrderPatchResponse = ({
  updatedCategoryCount,
  updatedWordCount,
  categoryOrders = [],
  wordOrders = [],
}) => ({
  updatedCategoryCount,
  updatedWordCount,
  categoryOrders,
  wordOrders,
});
