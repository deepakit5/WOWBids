import Spinner from "@/custom-components/Spinner";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
// import PaymentDetails from "./Dashboard/sub-components/UpdatePaymentDetails";

const UserProfile = () => {
  const {user, isAuthenticated, loading} = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
              <img
                src={user.profileImage?.url}
                alt="/imageHolder.jpg"
                className="w-36 h-36 rounded-full"
              />

              <div className="mb-6 w-full">
                <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      defaultValue={user.userName}
                      className="w-ful mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="text"
                      defaultValue={user.email}
                      className="w-ful mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="number"
                      defaultValue={user.phone}
                      className="w-ful mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue={user.address}
                      className="w-ful mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <input
                      type="text"
                      defaultValue={user.role}
                      className="w-ful mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Joined On
                    </label>
                    <input
                      type="text"
                      defaultValue={user.createdAt?.substring(0, 10)}
                      className="w-ful mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6 w-full">
                <h3 className="text-xl font-semibold mb-4">
                  Other User Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.role === "Auctioneer" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Unpaid Commissions
                        </label>
                        <input
                          type="text"
                          defaultValue={user.unpaidCommission}
                          className="w-ful mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                          disabled
                        />
                        <p className="block text-sm font-medium text-gray-700">
                          Please clear your unpaid Commission within 3 days, to
                          avoid problems.
                        </p>

                        <Link to={"/submit-commission"}>
                          <div
                            className="my-4 flex gap-4 w-fit"
                            onClick={<Link> to={"/submit-commission"}</Link>}>
                            <button className="bg-[#D6482B] font-semibold hover:bg-[#b8381e] text-xl py-1 px-4 rounded-md text-white">
                              Pay now
                            </button>
                          </div>
                        </Link>
                      </div>
                    </>
                  )}
                  {user.role === "Bidder" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Auctions Won
                        </label>
                        <input
                          type="text"
                          defaultValue={user.auctionsWon}
                          className="w-ful mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Money Spent
                        </label>
                        <input
                          type="text"
                          defaultValue={user.moneySpent}
                          className="w-ful mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                          disabled
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default UserProfile;
