import { BaseError } from "../errors/app.error.js";

const isNonNegativeInt = (v) => Number.isInteger(v) && v >= 0;
const validateOrdersArrayIfNotEmpty = (arr, label) => {
  // 배열이 아예 없으면 이 함수 호출 X
  if (!Array.isArray(arr)) {
    throw new BaseError(`${label}는 배열이어야 합니다`, 400, "ORDER001");
  }

  // 빈 배열은 허용
  if (arr.length === 0) return;

  const idSet = new Set();
  for (const item of arr) {
    if (!item || typeof item.id !== "string") {
      throw new BaseError(`${label}.id 형식 오류`, 400, "ORDER002");
    }
    if (!isNonNegativeInt(item.displayOrder)) {
      throw new BaseError(`${label}.displayOrder 형식 오류`, 400, "ORDER003");
    }
    if (idSet.has(item.id)) {
      throw new BaseError(`${label}에 중복 id가 있습니다`, 400, "ORDER004");
    }
    idSet.add(item.id);
  }
};

export const validatePm03OrderBody = ({ categoryOrders, wordOrders }) => {
  const hasCategory = categoryOrders !== undefined;
  const hasWord = wordOrders !== undefined;

  // 둘 다 아예 없으면 에러
  if (!hasCategory && !hasWord) {
    throw new BaseError(
      "categoryOrders 또는 wordOrders 중 하나는 필요합니다",
      400,
      "ORDER000",
    );
  }

  // 둘 다 빈 배열이면 에러
  const categoryIsEmpty =
    hasCategory && Array.isArray(categoryOrders) && categoryOrders.length === 0;
  const wordIsEmpty =
    hasWord && Array.isArray(wordOrders) && wordOrders.length === 0;

  if (
    (hasCategory && !Array.isArray(categoryOrders)) ||
    (hasWord && !Array.isArray(wordOrders))
  ) {
    throw new BaseError(
      "categoryOrders/wordOrders는 배열이어야 합니다",
      400,
      "ORDER001",
    );
  }

  if ((hasCategory || hasWord) && categoryIsEmpty && wordIsEmpty) {
    throw new BaseError(
      "categoryOrders 또는 wordOrders 중 하나는 비어있지 않아야 합니다",
      400,
      "ORDER001",
    );
  }

  if (hasCategory)
    validateOrdersArrayIfNotEmpty(categoryOrders, "categoryOrders");
  if (hasWord) validateOrdersArrayIfNotEmpty(wordOrders, "wordOrders");
};
