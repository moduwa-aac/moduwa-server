import { BaseError } from "../errors/app.error.js";
import {
  getUserCategoryIdsOwned,
  getUserWordIdsOwned,
  updatePm03Orders,
} from "./order.repository.js";

export const patchOrderService = async ({
  userId,
  categoryOrders,
  wordOrders,
}) => {
  const updatedCategoryCount = categoryOrders?.length ?? 0;
  const updatedWordCount = wordOrders?.length ?? 0;

  if (categoryOrders?.length) {
    const ids = categoryOrders.map((o) => o.id);
    const owned = await getUserCategoryIdsOwned({ userId, ids });
    const notOwned = ids.filter((id) => !owned.has(id));
    if (notOwned.length) {
      throw new BaseError(
        "내 카테고리가 아닌 항목이 포함되어 있습니다",
        404,
        "ORDER_CAT404",
      );
    }
  }

  if (wordOrders?.length) {
    const ids = wordOrders.map((o) => o.id);
    const owned = await getUserWordIdsOwned({ userId, ids });
    const notOwned = ids.filter((id) => !owned.has(id));
    if (notOwned.length) {
      throw new BaseError(
        "내 낱말이 아닌 항목이 포함되어 있습니다",
        404,
        "ORDER_WORD404",
      );
    }
  }

  await updatePm03Orders({ userId, categoryOrders, wordOrders });

  return { updatedCategoryCount, updatedWordCount };
};
