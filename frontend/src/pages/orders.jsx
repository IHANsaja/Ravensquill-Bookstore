import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { FiPackage, FiCheckCircle, FiClock } from 'react-icons/fi';
import Spinner from '../components/Spinner';

const Orders = () => {
  const { backendUrl } = useContext(AppContent);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/orders/myorders`, { withCredentials: true });
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [backendUrl]);

  if (loading)
    return <Spinner />;
  if (error)
    return <p className="text-red-500 text-center mt-16 font-poppins text-base sm:text-lg">{error}</p>;

  return (
    <div className="min-h-full bg-primary-black text-primary-white font-poppins pt-30 pb-30 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-secondary-lightblue mb-8 flex items-center gap-2">
          <FiPackage className="text-2xl sm:text-3xl" /> My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-secondary-lightgray text-base sm:text-lg">You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-secondary-darkgray border border-secondary-lightgray rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition duration-300"
              >
                <p className="mb-2 text-sm sm:text-base">
                  <span className="text-secondary-lightblue font-semibold">Order ID:</span>{' '}
                  <span className="text-secondary-lightgray break-all">{order._id}</span>
                </p>
                <p className="mb-2 text-sm sm:text-base">
                  <span className="text-secondary-lightblue font-semibold">Placed on:</span>{' '}
                  <span className="text-secondary-lightgray">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p className="mb-2 text-sm sm:text-base">
                  <span className="text-secondary-lightblue font-semibold">Total:</span>{' '}
                  <span className="text-secondary-lightgray">${order.totalPrice.toFixed(2)}</span>
                </p>
                <p className="text-sm sm:text-base flex items-center gap-2">
                  <span className="text-secondary-lightblue font-semibold">Status:</span>
                  {order.isDelivered ? (
                    <span className="flex items-center text-green-500 font-medium">
                      <FiCheckCircle className="mr-1" /> Delivered
                    </span>
                  ) : (
                    <span className="flex items-center text-yellow-400 font-medium">
                      <FiClock className="mr-1" /> Pending
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
