import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUserCategoryIdsOwned = async ({ userId, ids }) => {
  const rows = await prisma.userCategory.findMany({
    where: { userId, id: { in: ids } },
    select: { id: true },
  });
  return new Set(rows.map((r) => r.id));
};

export const getUserWordIdsOwned = async ({ userId, ids }) => {
  const rows = await prisma.userWord.findMany({
    where: { userId, id: { in: ids }, isDeleted: false },
    select: { id: true },
  });
  return new Set(rows.map((r) => r.id));
};

export const updateCategoryOrdersTx = async ({ tx, orders }) => {
  await Promise.all(
    orders.map(({ id, displayOrder }) =>
      tx.userCategory.update({
        where: { id },
        data: { displayOrder },
      }),
    ),
  );
};

export const updateWordOrdersTx = async ({ tx, orders }) => {
  await Promise.all(
    orders.map(({ id, displayOrder }) =>
      tx.userWord.update({
        where: { id },
        data: { displayOrder },
      }),
    ),
  );
};

export const updatePm03Orders = async ({
  userId,
  categoryOrders,
  wordOrders,
}) => {
  return prisma.$transaction(async (tx) => {
    if (categoryOrders?.length) {
      await updateCategoryOrdersTx({ tx, orders: categoryOrders });
    }
    if (wordOrders?.length) {
      await updateWordOrdersTx({ tx, orders: wordOrders });
    }
    return true;
  });
};
