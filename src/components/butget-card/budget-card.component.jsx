import { Card, ProgressBar, Button, Stack } from "react-bootstrap";
import { currencyFormatter } from "../../utils/utils";
import { getProgressBarVariant } from "../progress-bar/progress-bar.component";

const BudgetCard = ({ name, amount, max, gray }) => {
  const expense = currencyFormatter.format(amount);
  const limit = currencyFormatter.format(max);

  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline ">
            {expense} <span className="text-muted fs-6 ms-1"> / {limit}</span>
          </div>
        </Card.Title>
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
        <Stack direction="horizontal" gap="2" className="mt-4">
          <Button variant="outline-primary" className="ms-auto">
            Add Expense
          </Button>
          <Button variant="outline-secondary">View Expense</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;