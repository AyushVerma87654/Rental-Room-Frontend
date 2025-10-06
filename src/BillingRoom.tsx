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
  console.log("billing room");
  const totalAmount = () => {
    let newReading = 0;
    let roomRent = 0;
    document.querySelectorAll("input").forEach((item) => {
      if (item.id === "newReading" && +item.value > 0) newReading = +item.value;
      if (item.id === "roomRent" && +item.value > 0) roomRent = +item.value;
    });
    const kitchenReading = isKitchenIncluded ? kitchen.reading : 0;
    const amount =
      (newReading - ((selectedBillingRoom?.reading ?? 0) + kitchenReading)) *
        pricePerUnit +
      roomRent;
    setBillingAmount(amount);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-100">
      <div className="w-[75%] h-[80%] bg-white rounded-xl shadow-2xl p-10 relative overflow-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-9 text-center my-4.5">
          Billing Room
        </h1>

        <IoMdCloseCircle
          onClick={() => setSelectedRoomId("")}
          className="absolute top-16 right-6 text-3xl cursor-pointer transition"
        />

        <div className="flex items-center gap-4 mb-6">
          {rooms.map((room) => (
            <Button
              key={room.roomId}
              className={
                room.roomId === selectedBillingRoom?.roomId
                  ? "border-4 border-blue-500 !text-green-400"
                  : isKitchenIncluded && room.roomId === "kitchen"
                  ? "border-4 border-blue-500 !text-green-400"
                  : ""
              }
              onClick={() => setSelectedBillingRoomId(room.roomId)}
            >
              {room.name}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <p className="text-lg font-medium text-gray-700">
              Price per unit (Rs):
            </p>

            <Input
              type="number"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(+e.target.value)}
              className="!w-32"
            />
          </div>
          <Button
            onClick={() => initiateUpdatePrice(pricePerUnit)}
            className="!w-40"
          >
            Update Price
          </Button>
          <Button
            onClick={() => {
              selectedBillingRoom?.roomId && toggleIsKitchenIncluded();
            }}
            className="!w-40"
          >
            Include Kitchen
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-1">Previous Reading</label>
            <Input
              type="number"
              defaultValue={
                isKitchenIncluded
                  ? kitchen.reading + selectedBillingRoom?.reading
                  : selectedBillingRoom?.reading
              }
              disabled={true}
              className="!h-11"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">New Reading</label>
            <Input
              id="newReading"
              type="number"
              className="!h-11"
              placeholder="e.g. 180"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-1">Room Rent</label>
            <Input
              id="roomRent"
              type="number"
              placeholder="e.g. 180"
              className="!h-11"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Total Amount</label>
            <Input
              type="number"
              value={billingAmount}
              disabled={true}
              className="!h-11"
            />
          </div>
        </div>
        <Button onClick={totalAmount} className="!h-10 !w-64 mt-5">
          Calcuate Billing Amount
        </Button>
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
