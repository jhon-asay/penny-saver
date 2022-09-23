import { Card, ProgressBar, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "../../utils/utils";
import { getProgressBarVariant } from "../progress-bar/progress-bar.component";

const BudgetCard = ({
  name,
  amount,
  max,
  gray,
  onAddExpenseClick,
  onViewExpensesClick,
  hideButtons,
}) => {
  const expense = currencyFormatter.format(amount);
  const limit = currencyFormatter.format(max);

  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  return (
    <Card className={`${classNames.join(" ")} mb-4`}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline ">
            {expense}
            {max && <span className="text-muted fs-6 ms-1"> / {limit}</span>}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="3" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpensesClick}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
