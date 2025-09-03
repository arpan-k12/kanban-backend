import { Router } from "express";
import authRouter from "./auth.routes";
import customerRouter from "./customer.routes";
import inquiryRouter from "./inquiry.routes";
import kanbanColumnRouter from "./kanbanColumn.routes";
import cardRouter from "./card.routes";
import decisionRouter from "./decision.route";
import quoteRouter from "./quote.routes";
import organizationRouter from "./organization.routes";
import usersRouter from "./users.routes";
import userOrganizationRouter from "./userOrganization.routes";

export class IndexRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use("/api/auth", authRouter);
    this.router.use("/api/customer", customerRouter);
    this.router.use("/api/inquiry", inquiryRouter);
    this.router.use("/api/kanbancolumns", kanbanColumnRouter);
    this.router.use("/api/card", cardRouter);
    this.router.use("/api/quote", quoteRouter);
    this.router.use("/api/decision", decisionRouter);
    this.router.use("/api/organization", organizationRouter);
    this.router.use("/api/users", usersRouter);
    this.router.use("/api/user-organization", userOrganizationRouter);
  }
}

export default new IndexRouter().router;

// // Pseudocode for backend
// const maxPosition = await Card.max('card_position', { where: { column_id } });
// const newCard = await Card.create({
//   ...data,
//   column_id,
//   card_position: maxPosition ? maxPosition + 1 : 1,
// });

// const sourceCards = await Card.findAll({ where: { column_id: sourceColumnId }, order: [['card_position', 'ASC']] });
// const destinationCards = await Card.findAll({ where: { column_id: destinationColumnId }, order: [['card_position', 'ASC']] });

// // Remove the moved card from sourceCards
// const movedCard = sourceCards.find(card => card.id === movedCardId);
// const updatedSourceCards = sourceCards.filter(card => card.id !== movedCardId);

// // Insert moved card into destinationCards at the correct index
// destinationCards.splice(destinationIndex, 0, movedCard);

// // Update card_position for all cards in both columns
// for (let i = 0; i < updatedSourceCards.length; i++) {
//   updatedSourceCards[i].card_position = i + 1;
//   await updatedSourceCards[i].save();
// }
// for (let i = 0; i < destinationCards.length; i++) {
//   destinationCards[i].card_position = i + 1;
//   await destinationCards[i].save();
// }

// SELECT * FROM cards WHERE column_id = ? ORDER BY card_position ASC;
