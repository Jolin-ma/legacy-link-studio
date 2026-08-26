import type { NotifyMode, RevealMode, Tier } from "@/components/intake/types";
import type { OrderDraft } from "./order-draft";
import { generatePin, generateRevealToken } from "./ids";

/**
 * Stand-in for the real order backend described in the site spec (§4.1) —
 * a hosted Postgres table, in this build's case. Same shape, same access
 * rules (token is the only credential, never derived from the order id);
 * only the storage layer differs.
 */
export type OrderStatus = "in_production" | "ready";

export interface CapsuleOrder {
  id: string;
  status: OrderStatus;
  revealToken: string;
  revealAt: number | null;
  revealMode: RevealMode;
  unlockedAt: number | null;
  recipientEmails: string;
  partner1Name: string;
  partner2Name: string;
  tier: Tier;
  pin: string | null;
  createdAt: number;
  giverName: string;
  giverEmail: string;
  notifyMode: NotifyMode | null;
}

const STORAGE_KEY = "legacyLinkOrders";

function readAll(): CapsuleOrder[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CapsuleOrder[];
  } catch {
    return [];
  }
}

function writeAll(orders: CapsuleOrder[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function dateToTimestamp(isoDate: string): number {
  return new Date(`${isoDate}T00:00:00`).getTime();
}

export function createOrder(id: string, draft: OrderDraft): CapsuleOrder {
  const tier = draft.tier === "" ? "spark" : draft.tier;
  const order: CapsuleOrder = {
    id,
    status: "in_production",
    revealToken: generateRevealToken(),
    revealAt: draft.revealDate ? dateToTimestamp(draft.revealDate) : null,
    revealMode: draft.revealMode === "" ? "auto" : draft.revealMode,
    unlockedAt: null,
    recipientEmails: draft.recipientEmails,
    partner1Name: draft.partner1Name,
    partner2Name: draft.partner2Name,
    tier,
    pin: tier === "heirloom" ? generatePin() : null,
    createdAt: Date.now(),
    giverName: draft.giverName,
    giverEmail: draft.giverEmail,
    notifyMode: draft.notifyMode === "" ? null : draft.notifyMode,
  };
  writeAll([...readAll(), order]);
  return order;
}

export function getOrderById(id: string): CapsuleOrder | null {
  return readAll().find((o) => o.id === id) ?? null;
}

export function getOrderByToken(token: string): CapsuleOrder | null {
  return readAll().find((o) => o.revealToken === token) ?? null;
}

export function markOrderReady(id: string): CapsuleOrder | null {
  const orders = readAll();
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = "ready";
  writeAll(orders);
  return order;
}

export function updateRevealAt(id: string, isoDate: string): CapsuleOrder | null {
  const orders = readAll();
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  order.revealAt = dateToTimestamp(isoDate);
  writeAll(orders);
  return order;
}

export function markUnlocked(token: string): CapsuleOrder | null {
  const orders = readAll();
  const order = orders.find((o) => o.revealToken === token);
  if (!order) return null;
  if (!order.unlockedAt) {
    order.unlockedAt = Date.now();
    writeAll(orders);
  }
  return order;
}
