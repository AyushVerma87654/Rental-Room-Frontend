import type { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import Button from "./Button";
import { IoMdCloseCircle } from "react-icons/io";
import {
  setBillingAmountAction,
  setPricePerUnitAction,
  setSelectedBillingRoomIdAction,
  setSelectedRoomIdAction,
  toggleIsKitchenIncludedAction,
  updatePriceInitiatedAction,
} from "./redux/slice/roomSlice";
import {
  selectedBillingRoomSelector,
  pricePerUnitSelector,
  roomsMapSelector,
  billingAmountSelector,
  kitchenSelector,
  isKitchenIncludedSelector,
} from "./redux/selectors/roomSelector";
import Input from "./Input";
import { Room } from "./models/room";

interface BillingRoomProps extends ReduxProps {}

const BillingRoom: FC<BillingRoomProps> = ({
  pricePerUnit,
  setSelectedRoomId,
  rooms,
  selectedBillingRoom,
  setSelectedBillingRoomId,
  initiateUpdatePrice,
  setBillingAmount,
  billingAmount,
  setPricePerUnit,
  kitchen,
  isKitchenIncluded,
  toggleIsKitchenIncluded,
}) => {
  const totalAmount = () => {
    let newReading = 0;
    let roomRent = 0;
    document.querySelectorAll("input").forEach((item) => {
      if (item.id === "newReading" && +item.value > 0) newReading = +item.value;
      if (item.id === "roomRent" && +item.value > 0) roomRent = +item.value;
    });
    const kitchenReading = isKitchenIncluded ? kitchen.reading : 0;
    const amount =
      (newReading - (+(selectedBillingRoom?.reading ?? 0) + +kitchenReading)) *
        pricePerUnit +
      roomRent;
    setBillingAmount(amount);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl h-[90vh] md:h-[85vh] bg-white rounded-xl shadow-2xl p-5 md:p-10 relative overflow-y-auto">
        <h1 className="text-xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Billing Room
        </h1>

        <IoMdCloseCircle
          onClick={() => setSelectedRoomId("")}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-xl md:text-3xl cursor-pointer transition"
        />

        {/* Room Selection Buttons - responsive grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 mb-6">
          {rooms.map((room) => (
            <Button
              key={room.roomId}
              className={`w-full text-sm md:text-base px-2 py-1 ${
                room.roomId === selectedBillingRoom?.roomId
                  ? "border-4 border-blue-500 !text-green-400"
                  : isKitchenIncluded && room.roomId === "kitchen"
                  ? "border-4 border-blue-500 !text-green-400"
                  : ""
              }`}
              onClick={() => setSelectedBillingRoomId(room.roomId)}
            >
              {room.name}
            </Button>
          ))}
        </div>

        {/* Price Section */}
        <div className="flex flex-col xs:flex-row items-center justify-between mx-auto gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-sm md:text-lg font-medium text-gray-700">
              Price per unit (Rs):
            </p>
            <Input
              type="number"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(+e.target.value)}
              className="!w-28 md:!w-32 !text-sm md:!text-base"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              className="text-sm md:text-base"
              onClick={() => initiateUpdatePrice(pricePerUnit)}
            >
              Update Price
            </Button>
            <Button
              className="text-sm md:text-base"
              onClick={() =>
                selectedBillingRoom?.roomId &&
                selectedBillingRoom?.roomId !== "kitchen" &&
                toggleIsKitchenIncluded()
              }
            >
              Include Kitchen
            </Button>
          </div>
        </div>

        {/* Readings Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm md:text-base text-gray-700 mb-1">
              Previous Reading
            </label>
            <Input
              type="number"
              defaultValue={
                isKitchenIncluded
                  ? +kitchen.reading + +selectedBillingRoom?.reading
                  : selectedBillingRoom?.reading
              }
              disabled
              className="!h-10 md:!h-11 w-full text-sm md:text-base"
            />
          </div>
          <div>
            <label className="block text-sm md:text-base text-gray-700 mb-1">
              New Reading
            </label>
            <Input
              id="newReading"
              type="number"
              placeholder="e.g. 180"
              className="!h-10 md:!h-11 w-full text-sm md:text-base"
            />
          </div>
        </div>

        {/* Rent and Total Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm md:text-base text-gray-700 mb-1">
              Room Rent
            </label>
            <Input
              id="roomRent"
              type="number"
              placeholder="e.g. 180"
              className="!h-10 md:!h-11 w-full text-sm md:text-base"
            />
          </div>
          <div>
            <label className="block text-sm md:text-base text-gray-700 mb-1">
              Total Amount
            </label>
            <Input
              type="number"
              value={billingAmount}
              disabled
              className="!h-10 md:!h-11 w-full text-sm md:text-base"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center">
          <Button
            onClick={totalAmount}
            className="!w-48 md:!w-64 text-sm md:text-base"
          >
            Calculate Billing Amount
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  pricePerUnit: pricePerUnitSelector(state),
  rooms: roomsMapSelector(state),
  selectedBillingRoom: selectedBillingRoomSelector(state),
  billingAmount: billingAmountSelector(state),
  isKitchenIncluded: isKitchenIncludedSelector(state),
  kitchen: kitchenSelector(state) as Room,
});

const mapDispatchToProps = {
  setSelectedRoomId: setSelectedRoomIdAction,
  setSelectedBillingRoomId: setSelectedBillingRoomIdAction,
  initiateUpdatePrice: updatePriceInitiatedAction,
  setBillingAmount: setBillingAmountAction,
  setPricePerUnit: setPricePerUnitAction,
  toggleIsKitchenIncluded: toggleIsKitchenIncludedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(BillingRoom);
