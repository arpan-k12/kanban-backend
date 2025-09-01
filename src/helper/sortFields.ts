export const sortFieldMap: Record<string, { assoc?: string; field: string }> = {
  summary: { field: "summary" },
  card_position: { field: "card_position" },
  createdAt: { field: "createdAt" },

  commodity: { assoc: "inquiry", field: "commodity" },
  budget: { assoc: "inquiry", field: "budget" },

  customer: { assoc: "customer", field: "c_name" },
  customer_email: { assoc: "customer", field: "c_email" },

  column_position: { assoc: "column", field: "position" },
  column_name: { assoc: "column", field: "name" },

  amount: { assoc: "quote", field: "amount" },
  valid_until: { assoc: "quote", field: "valid_until" },

  decision: { assoc: "decision", field: "decision" },
  reason: { assoc: "decision", field: "reason" },
};
