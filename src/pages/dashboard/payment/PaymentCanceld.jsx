import { Link } from 'react-router';

const PaymentCanceld = () => {
  return (
    <div>
      Payment is cancelled. Please try again
      <Link to={'/dashboard/my-parcels'}>
        <button className="btn btn-primary text-secondary">Try Again</button>
      </Link>
    </div>
  );
};

export default PaymentCanceld;
