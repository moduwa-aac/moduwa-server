import express from "express";
import { patchOrder } from "./order.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/pm/order:
 *   patch:
 *     tags: [PM03]
 *     summary: PM03 낱말/카테고리 순서 변경
 *     description: >
 *       카테고리(UserCategory)와 낱말(UserWord)의 displayOrder를 일괄 변경합니다.
 *
 *       - categoryOrders 또는 wordOrders 중 **하나 이상은 반드시 포함**되어야 합니다.
 *       - 각 배열이 **빈 배열([])** 인 경우, 해당 타입의 순서 변경은 수행하지 않습니다.
 *       - categoryOrders와 wordOrders가 **모두 제공되었고 둘 다 빈 배열이면 400 에러**를 반환합니다.
 *       - 요청 바디에 두 필드가 **모두 없는 경우** 400 에러를 반환합니다.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryOrders:
 *                 type: array
 *                 description: 카테고리 순서 변경 목록 (빈 배열이면 변경 없음)
 *                 items:
 *                   type: object
 *                   required: [id, displayOrder]
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     displayOrder:
 *                       type: integer
 *                       minimum: 0
 *               wordOrders:
 *                 type: array
 *                 description: 낱말 카드 순서 변경 목록 (빈 배열이면 변경 없음)
 *                 items:
 *                   type: object
 *                   required: [id, displayOrder]
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     displayOrder:
 *                       type: integer
 *                       minimum: 0
 *           examples:
 *             categoryOnly:
 *               summary: 카테고리만 순서 변경
 *               value:
 *                 categoryOrders:
 *                   - { id: "uuid-category-1", displayOrder: 3 }
 *                 wordOrders: []
 *             wordOnly:
 *               summary: 낱말 카드만 순서 변경
 *               value:
 *                 categoryOrders: []
 *                 wordOrders:
 *                   - { id: "uuid-userword-1", displayOrder: 2 }
 *             both:
 *               summary: 카테고리와 낱말 모두 순서 변경
 *               value:
 *                 categoryOrders:
 *                   - { id: "uuid-category-1", displayOrder: 0 }
 *                   - { id: "uuid-category-2", displayOrder: 1 }
 *                 wordOrders:
 *                   - { id: "uuid-userword-1", displayOrder: 0 }
 *
 *     responses:
 *       200:
 *         description: 순서 변경 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     updatedCategoryCount:
 *                       type: integer
 *                       description: 순서가 변경된 카테고리 개수
 *                       example: 1
 *                     updatedWordCount:
 *                       type: integer
 *                       description: 순서가 변경된 낱말 카드 개수
 *                       example: 0
 *                     categoryOrders:
 *                       type: array
 *                       description: 최종 반영된 카테고리 순서
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           displayOrder:
 *                             type: integer
 *                     wordOrders:
 *                       type: array
 *                       description: 최종 반영된 낱말 카드 순서
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           displayOrder:
 *                             type: integer
 *                 message:
 *                   type: string
 *                   example: 순서 변경 성공
 *
 *       400:
 *         description: 입력값 오류 (ORDER000~ORDER004)
 *       401:
 *         description: 인증 실패 (AUTH001)
 *       404:
 *         description: 대상이 존재하지 않거나 내 데이터가 아님
 */

router.patch("/", patchOrder);

export default router;
