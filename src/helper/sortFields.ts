export const sortFieldMap: Record<string, { assoc?: string; field: string }> = {
  summary: { field: "summary" },
  card_position: { field: "card_position" },
  createdAt: { field: "createdAt" },

  // Inquiry relation
  commodity: { assoc: "inquiry", field: "commodity" },
  budget: { assoc: "inquiry", field: "budget" },

  // Customer relation
  customer: { assoc: "customer", field: "c_name" },
  customer_email: { assoc: "customer", field: "c_email" },

  // Column relation
  column_position: { assoc: "column", field: "position" },
  column_name: { assoc: "column", field: "name" },

  // Quote relation
  amount: { assoc: "quote", field: "amount" },
  valid_until: { assoc: "quote", field: "valid_until" },

  // Decision relation
  decision: { assoc: "decision", field: "decision" },
  reason: { assoc: "decision", field: "reason" },
};
