import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiMoreVertical, FiEdit2, FiTrash2, FiBox } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Myparcels = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: parcel = [], refetch } = useQuery({
    queryKey: ['my-parcel', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = id => {
    console.log(id);
    // --- INDUSTRY STANDARD WARNING CONFIRMATION TREE ---
    Swal.fire({
      title:
        '<span class="text-xl font-black text-secondary tracking-tight uppercase">Are you sure?</span>',
      html: `
      <div class="font-sans text-center space-y-2 pt-1">
        <p class="text-[15px] font-semibold text-gray-500">
          You are about to remove this parcel tracking node from your dashboard.
        </p>
        <p class="text-xs text-rose-500 font-bold bg-rose-50 p-2 rounded-lg border border-rose-100 inline-block">
          ⚠️ This action cannot be undone!
        </p>
      </div>
    `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48', // Tailwind's rose-600 for the destructive action button
      cancelButtonColor: '#1e2321', // Your brand's secondary dark layout scale
      confirmButtonText: 'Yes, Delete It',
      cancelButtonText: 'Keep Parcel',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-[24px] p-6 border border-gray-100 shadow-xl',
        confirmButton:
          'btn font-bold text-[15px] px-6 rounded-xl border-none h-11 min-h-11',
        cancelButton:
          'btn font-bold text-[15px] px-6 rounded-xl border-none h-11 min-h-11 bg-[#1e2321] hover:bg-[#1e2321]/90 text-white',
      },
    }).then(result => {
      if (result.isConfirmed) {
        console.log(
          'User confirmed deletion. Executing backend API call for ID:',
          id,
        );

        // TODO: Place your backend delete fetch/axios request here:

        axiosSecure.delete(`/parcels/${id}`).then(res => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'The parcel node has been successfully removed from the workspace.',
              icon: 'success',
              confirmButtonColor: '#A3C639', // Matches your signature primary color
              customClass: {
                popup: 'rounded-[24px]',
                confirmButton:
                  'btn bg-primary text-secondary font-bold px-6 rounded-xl border-none h-11',
              },
            });
          }
        });

        // fetch(`https://api.zapshift.com/parcels/${id}`, { method: 'DELETE' })
        //   .then(res => res.json())
        //   .then(data => { ... })

        // Success Feedback Pop-up matching your brand's primary color scale
      }
    });
  };

  const handlePayment = async pp => {
    const paymentInfo = {
      cost: pp.cost,
      parcelId: pp._id,
      senderEmail: pp.senderEmail,
      parcelName: pp.parcelName,
    };
    console.log('submit', paymentInfo);
    const res = await axiosSecure.post(
      '/payment-checkout-session',
      paymentInfo,
    );

    console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  return (
    <div className="w-full bg-base-100 rounded-2xl border border-base-200 p-6 font-sans text-left shadow-xs">
      {/* --- Top Header Title Section --- */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <FiBox size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-secondary tracking-tight">
              All Parcels
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              Manage and track your delivery ecosystem
            </p>
          </div>
        </div>
        {/* Dynamic Length Badge */}
        <span className="badge bg-secondary text-white font-bold px-3 py-3 rounded-lg text-xs tracking-wider">
          TOTAL: {parcel.length}
        </span>
      </div>

      {/* --- Responsive Table Wrapper --- */}
      <div className="overflow-x-auto w-full">
        <table className="table w-full border-separate border-spacing-y-1">
          {/* Table Head */}
          <thead>
            <tr className="border-none text-gray-400 text-[13px] font-bold tracking-wider uppercase bg-base-200/50">
              <th className="rounded-l-xl py-4 pl-4 text-center w-16">#</th>
              <th className="py-4">Parcel Name</th>
              <th className="py-4">Pricing</th>
              <th className="py-4">Payment Status</th>
              <th className="rounded-r-xl py-4 pr-4 text-right w-24">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-[15px] font-medium text-secondary">
            {parcel.map((p, index) => (
              <tr
                key={p._id || index}
                className="hover:bg-base-200/40 transition-colors duration-200 group border-b border-base-100"
              >
                {/* Index Column */}
                <td className="text-center font-bold text-gray-400 pl-4 py-4 bg-base-100/50 group-hover:bg-transparent rounded-l-xl">
                  {index + 1}
                </td>

                {/* Parcel Name */}
                <td className="py-4 font-bold text-secondary max-w-xs truncate">
                  {p.parcelName || 'Unnamed Parcel'}
                </td>

                {/* Cost */}
                <td className="py-4 font-black text-gray-700">
                  {p.cost ? `${p.cost} ৳` : '0 ৳'}
                </td>

                {/* Payment Status Badge */}
                <td className="py-4">
                  {/* DaisyUI soft colored badge for generic state feedback */}
                  {p.paymentStatus === 'paid' ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(p)}
                      className="btn btn-primary btn-small text-secondary"
                    >
                      Pay
                    </button>
                  )}
                </td>

                {/* --- Action Dropdown Column --- */}
                <td className="py-4 pr-4 text-right bg-base-100/50 group-hover:bg-transparent rounded-r-xl">
                  <div className="dropdown dropdown-left dropdown-end">
                    {/* Trigger Button (Three Dots) */}
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-xs btn-circle text-gray-400 hover:text-secondary focus:bg-base-300 active:scale-95"
                    >
                      <FiMoreVertical size={16} />
                    </div>

                    {/* Dropdown Menu Overlay Content */}
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-1.5 shadow-md bg-base-100 rounded-xl w-36 border border-base-200 z-50 text-left"
                    >
                      {/* Edit Option */}
                      <li>
                        <button
                          onClick={() =>
                            console.log('Edit clicked for:', p._id)
                          }
                          className="flex items-center gap-2.5 py-2 font-semibold text-sm rounded-lg hover:bg-base-200 text-secondary"
                        >
                          <FiEdit2 size={13} className="text-blue-500" />
                          Edit Item
                        </button>
                      </li>

                      {/* Delete Option */}
                      <li className="border-t border-base-200/60 mt-1 pt-1">
                        <button
                          onClick={() => handleParcelDelete(p._id)}
                          className="flex items-center gap-2.5 py-2 font-bold text-sm rounded-lg hover:bg-rose-50 text-rose-600"
                        >
                          <FiTrash2 size={13} />
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}

            {/* Empty State Fallback Handling */}
            {parcel.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-400 font-semibold"
                >
                  No parcel records available in your tracking stack.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myparcels;
