import { BaseError } from "../errors/app.error.js";
import { validatePm03OrderBody } from "./order.validator.js";
import { patchOrderService } from "./order.service.js";
import { toOrderPatchResponse } from "./order.dto.js";

export const patchOrder = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new BaseError("인증이 필요합니다", 401, "AUTH001");

    const { categoryOrders, wordOrders } = req.body;
    validatePm03OrderBody({ categoryOrders, wordOrders });

    // Mock 테스트용
    // if (
    //   process.env.NODE_ENV === "development" &&
    //   process.env.MOCK_DB === "true"
    // ) {
    //   const safeCategoryOrders = Array.isArray(categoryOrders)
    //     ? categoryOrders
    //     : [];
    //   const safeWordOrders = Array.isArray(wordOrders) ? wordOrders : [];

    //   const mockResult = {
    //     updatedCategoryCount: safeCategoryOrders.length,
    //     updatedWordCount: safeWordOrders.length,
    //     categoryOrders: safeCategoryOrders,
    //     wordOrders: safeWordOrders,
    //   };
    //   return res
    //     .status(200)
    //     .success(toOrderPatchResponse(mockResult), "순서 변경 성공 (mock)");
    // }

    const result = await patchOrderService({
      userId,
      categoryOrders,
      wordOrders,
    });

    const safeCategoryOrders = Array.isArray(categoryOrders)
      ? categoryOrders
      : [];
    const safeWordOrders = Array.isArray(wordOrders) ? wordOrders : [];

    const responsePayload = {
      updatedCategoryCount:
        result.updatedCategoryCount ?? safeCategoryOrders.length,
      updatedWordCount: result.updatedWordCount ?? safeWordOrders.length,
      categoryOrders: result.categoryOrders ?? safeCategoryOrders,
      wordOrders: result.wordOrders ?? safeWordOrders,
    };

    return res
      .status(200)
      .success(toOrderPatchResponse(responsePayload), "순서 변경 성공");
  } catch (e) {
    next(e);
  }
};
