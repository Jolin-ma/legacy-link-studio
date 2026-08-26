import type { NotifyMode, RevealMode, Tier } from "@/components/intake/types";
import type { OrderDraft } from "./order-draft";
import { generateRevealToken } from "./ids";

/**
 * Stand-in for the real order backend described in the site spec (§4.1) —
 * a hosted Postgres table, in this build's case. Same shape, same access
 * rules (token is the only credential, never derived from the order id);
 * only the storage layer differs.
 *
 * `status` tracks the DIGITAL leg only. `displayFulfillment.status` tracks
 * the PHYSICAL leg independently — they must never be merged into one
 * field, since the gallery/film should never read as "waiting on a
 * shipment" (see build brief §5.2).
 */
export type OrderStatus = "in_production" | "ready";

export type DisplayFulfillmentStatus = "sourcing" | "loaded" | "shipped" | "delivered";

export interface DisplayFulfillment {
  status: DisplayFulfillmentStatus;
  shippingAddress: OrderDraft["shippingAddress"];
  trackingNumber: string | null;
  estimatedDelivery: string | null;
}

export interface CapsuleOrder {
  id: string;
  tier: Tier;
  deliveryType: "gallery" | "film";
  status: OrderStatus;
  revealToken: string;
  revealAt: number | null;
  revealMode: RevealMode;
  unlockedAt: number | null;
  recipientEmails: string;
  partner1Name: string;
  partner2Name: string;
  sparkTitle: string;
  sparkCaptions: string[];
  createdAt: number;
  giverName: string;
  giverEmail: string;
  notifyMode: NotifyMode | null;
  displayAddon: boolean;
  displayFulfillment: DisplayFulfillment | null;
}

const STORAGE_KEY = "legacyLinkOrders";

const DISPLAY_STAGES: DisplayFulfillmentStatus[] = ["sourcing", "loaded", "shipped", "delivered"];

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

function estimatedDeliveryFrom(createdAt: number): string {
  const d = new Date(createdAt + 7 * 86_400_000);
  return d.toISOString().slice(0, 10);
}

export function createOrder(id: string, draft: OrderDraft): CapsuleOrder {
  const tier = draft.tier === "" ? "spark" : draft.tier;
  const isSpark = tier === "spark";
  const createdAt = Date.now();
  const displayAddon = tier === "heirloom" ? true : draft.displayAddon;

  const order: CapsuleOrder = {
    id,
    tier,
    deliveryType: draft.deliveryType,
    // Spark's generation call is automated and near-instant — the demo
    // reflects that by skipping the in_production wait entirely.
    status: isSpark ? "ready" : "in_production",
    revealToken: generateRevealToken(),
    // Spark has no reveal-lock option — this field simply doesn't apply.
    revealAt: isSpark ? null : draft.revealDate ? dateToTimestamp(draft.revealDate) : null,
    revealMode: draft.revealMode === "" ? "auto" : draft.revealMode,
    unlockedAt: null,
    recipientEmails: draft.recipientEmails,
    partner1Name: draft.partner1Name,
    partner2Name: draft.partner2Name,
    sparkTitle: draft.sparkTitle,
    sparkCaptions: draft.sparkCaptions,
    createdAt,
    giverName: draft.giverName,
    giverEmail: draft.giverEmail,
    notifyMode: draft.notifyMode === "" ? null : draft.notifyMode,
    displayAddon,
    displayFulfillment: displayAddon
      ? {
          status: "sourcing",
          shippingAddress: draft.shippingAddress,
          trackingNumber: null,
          estimatedDelivery: estimatedDeliveryFrom(createdAt),
        }
      : null,
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

export function advanceDisplayFulfillment(id: string): CapsuleOrder | null {
  const orders = readAll();
  const order = orders.find((o) => o.id === id);
  if (!order || !order.displayFulfillment) return null;
  const currentIndex = DISPLAY_STAGES.indexOf(order.displayFulfillment.status);
  const nextIndex = Math.min(currentIndex + 1, DISPLAY_STAGES.length - 1);
  order.displayFulfillment.status = DISPLAY_STAGES[nextIndex];
  if (order.displayFulfillment.status === "shipped" && !order.displayFulfillment.trackingNumber) {
    order.displayFulfillment.trackingNumber = `1Z${id.toUpperCase()}`;
  }
  writeAll(orders);
  return order;
}
