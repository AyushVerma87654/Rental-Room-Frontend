import type { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import {
  individualRoomSelector,
  isEditingSelector,
} from "./redux/selectors/roomSelector";
import {
  setSelectedRoomIdAction,
  toggleIsEditingAction,
  updateRoomInitiatedAction,
} from "./redux/slice/roomSlice";
import { MdEdit } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { RoomStatus } from "./models/room";
import Button from "./Button";
import Input from "./Input";

interface IndividualRoomProps extends ReduxProps {}

const IndividualRoom: FC<IndividualRoomProps> = ({
  room,
  setSelectedRoomId,
  isEditing,
  toggleIsEditing,
  initiateUpdateRoom,
}) => {
  const updateRoom = () => {
    let renterName = "";
    let reading = 0;
    document.querySelectorAll("input").forEach((item) => {
      if (item.id === "renterName" && item.value.length > 0)
        renterName = item.value;
      if (item.id === "reading" && +item.value > 0) reading = +item.value;
    });
    initiateUpdateRoom({
      ...room,
      reading,
      renterName,
      lastUpdated: new Date(),
    });
  };
  const updateRoomStatus = () => {
    const status =
      room.status === RoomStatus.occupied
        ? RoomStatus.vacant
        : RoomStatus.occupied;
    let renterName = "";
    let reading = 0;
    document.querySelectorAll("input").forEach((item) => {
      if (item.id === "renterName" && item.value.length > 0)
        renterName = item.value;
      if (item.id === "reading" && +item.value > 0) reading = +item.value;
    });
    initiateUpdateRoom({
      ...room,
      reading,
      renterName,
      status,
      lastUpdated: new Date(),
    });
  };
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[65%] h-[70%] bg-white rounded-xl shadow-2xl p-10 relative overflow-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center my-4.5">
          {room.name}
        </h1>
        <div className="flex items-center justify-around mt-12">
          <div className="w-48 h-72 px-2">
            <IoMdCloseCircle
              onClick={() => {
                setSelectedRoomId("");
                isEditing && toggleIsEditing();
              }}
              className="absolute top-16 right-6 text-3xl cursor-pointer transition"
            />
            <MdEdit
              className="absolute top-16 right-20 text-3xl cursor-pointer transition"
              onClick={() => toggleIsEditing()}
            />
            {isEditing && (
              <Button
                className={`absolute bottom-12 right-20 !w-36 !h-10`}
                onClick={updateRoom}
              >
                Update
              </Button>
            )}

            <div className="mb-4">
              <p className="text-lg text-gray-600 font-medium">Renter Name:</p>
              {isEditing ? (
                <Input id="renterName" defaultValue={room.renterName} />
              ) : (
                <p className="text-2xl font-semibold text-gray-800 h-8.5">
                  {room.renterName || "Not Assigned"}
                </p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-lg text-gray-600 font-medium">
                Current Reading:
              </p>
              {isEditing ? (
                <Input id="reading" defaultValue={room.reading} />
              ) : (
                <p className="text-2xl font-semibold text-gray-800 h-8.5">
                  {room.reading}
                </p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-lg text-gray-600 font-medium">Last Updated:</p>
              <p className="text-md text-gray-500">
                {room.lastUpdated
                  ? new Date(room.lastUpdated).toLocaleString()
                  : "Never"}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center">
              <span className="text-lg text-gray-600 font-medium mb-1 mr-2">
                Status:
              </span>
              <span
                className={`px-4 py-1 text-center font-semibold rounded-full ${
                  room.status === RoomStatus.occupied
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {room.status === RoomStatus.occupied ? "Occupied" : "Vacant"}
              </span>
            </div>

            <Button onClick={updateRoomStatus} className="mt-4">
              {room.status === RoomStatus.occupied
                ? "Mark as Vacant"
                : "Mark as Occupied"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  room: individualRoomSelector(state),
  isEditing: isEditingSelector(state),
});

const mapDispatchToProps = {
  setSelectedRoomId: setSelectedRoomIdAction,
  toggleIsEditing: toggleIsEditingAction,
  initiateUpdateRoom: updateRoomInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(IndividualRoom);
