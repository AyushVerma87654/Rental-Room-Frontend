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
    });
  };
  const updateRoomStatus = () => {
    const status =
      room.status === RoomStatus.occupied
        ? RoomStatus.vacant
        : RoomStatus.occupied;
    let renterName = " ";
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
    });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-[95%] sm:w-[90%] md:w-[65%] h-[85%] sm:h-[75%] md:h-[90%] bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-10 relative overflow-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          {room.name}
        </h1>

        <IoMdCloseCircle
          onClick={() => {
            setSelectedRoomId("");
            isEditing && toggleIsEditing();
          }}
          className="absolute top-4 sm:top-6 right-2 xs:right-4 md:top-12 md:right-6 text-xl sm:text-2xl md:text-3xl cursor-pointer transition"
        />
        <MdEdit
          onClick={() => toggleIsEditing()}
          className="absolute top-4 sm:top-6 right-8 xs:right-12 md:top-12 md:right-20 text-xl sm:text-2xl md:text-3xl cursor-pointer transition"
        />

        {isEditing && (
          <Button
            className="absolute bottom-4 right-4 md:bottom-12 md:right-20 !w-28 md:!w-36 !h-9 md:!h-10 text-sm md:text-base"
            onClick={updateRoom}
          >
            Update
          </Button>
        )}

        <div className="flex flex-col md:flex-row items-center justify-around mt-8 gap-6 md:gap-0">
          <div className="w-full md:w-1/2 px-1 md:px-2">
            <div className="mb-4">
              <p className="text-sm md:text-lg text-gray-600 font-medium">
                Renter Name:
              </p>
              {isEditing ? (
                <Input
                  id="renterName"
                  defaultValue={room.renterName}
                  className="!text-sm md:!text-base"
                />
              ) : (
                <p className="text-lg md:text-2xl font-semibold text-gray-800 h-8.5">
                  {room.renterName || "Not Assigned"}
                </p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm md:text-lg text-gray-600 font-medium">
                Current Reading:
              </p>
              {isEditing ? (
                <Input
                  id="reading"
                  defaultValue={room.reading}
                  className="!text-sm md:!text-base"
                />
              ) : (
                <p className="text-lg md:text-2xl font-semibold text-gray-800 h-8.5">
                  {room.reading}
                </p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm md:text-lg text-gray-600 font-medium">
                Last Updated:
              </p>
              <p className="text-xs md:text-base text-gray-500">
                {room.lastUpdatedAt
                  ? new Date(room.lastUpdatedAt).toLocaleString()
                  : "Never"}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <div className="mb-6 flex items-center gap-2 justify-center">
              <span className="text-sm md:text-lg text-gray-600 font-medium">
                Status:
              </span>
              <span
                className={`px-3 py-1 text-xs md:text-sm text-center font-semibold rounded-full ${
                  room.status === RoomStatus.occupied
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {room.status === RoomStatus.occupied ? "Occupied" : "Vacant"}
              </span>
            </div>

            <Button
              onClick={updateRoomStatus}
              className="mt-4 w-36 md:w-44 text-sm md:text-base"
            >
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
