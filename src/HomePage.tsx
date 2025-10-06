import { useEffect, type FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import {
  loadingSelector,
  roomsMapSelector,
  selectedRoomIdSelector,
} from "./redux/selectors/roomSelector";
import { RoomStatus } from "./models/room";
import {
  fetchRoomsInitiatedAction,
  setSelectedRoomIdAction,
  updateDataAction,
} from "./redux/slice/roomSlice";
import Button from "./Button";
import IndividualRoom from "./IndividualRoom";
import BillingRoom from "./BillingRoom";
import Loading from "./Loading";
import clsx from "clsx";

interface HomePageProps extends ReduxProps {}

const HomePage: FC<HomePageProps> = ({
  rooms,
  setSelectedRoomId,
  selectedRoomId,
  fetchRooms,
  roomsLoading,
  updateData,
}) => {
  useEffect(() => {
    fetchRooms();
  }, []);
  console.log("selectedRoomId", selectedRoomId);

  if (roomsLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 text-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        All Rooms
      </h1>

      {/* Room Grid */}
      <div
        className={clsx(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center",
          rooms.length === 0 && "!grid-cols-1 w-60 mx-auto"
        )}
      >
        {rooms.map((room) => (
          <div
            key={room.roomId}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                {room.name}
              </h2>

              <p className="text-gray-700">
                Reading: <span className="font-medium">{room.reading}</span>
              </p>

              <p className="text-gray-500 text-sm mt-1">
                Last updated:{" "}
                {room.lastUpdatedAt
                  ? new Date(room.lastUpdatedAt).toLocaleString()
                  : "Never"}
              </p>

              <p
                className={`mt-2 text-sm font-medium ${
                  room.status === RoomStatus.occupied
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                Status:{" "}
                {room.status === RoomStatus.occupied ? "Occupied" : "Vacant"}
              </p>
            </div>

            <Button
              className="mt-6 px-4 py-2 cursor-pointer"
              onClick={() => setSelectedRoomId(room.roomId)}
            >
              View Details
            </Button>
          </div>
        ))}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h2 className="text-2xl font-semibold mt-12 text-gray-800">
            Billing Room
          </h2>
          <Button
            className="mt-6 px-4 py-2 cursor-pointer h-10"
            onClick={() => setSelectedRoomId("billing")}
          >
            View Details
          </Button>
        </div>

        {selectedRoomId === "billing" ? (
          <BillingRoom />
        ) : (
          selectedRoomId && <IndividualRoom />
        )}
      </div>
      {rooms.length === 0 && (
        <Button
          className="mt-20 mx-24 px-4 py-2 cursor-pointer w-48 h-10 text-center"
          onClick={() => updateData()}
        >
          Update Data
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  rooms: roomsMapSelector(state),
  selectedRoomId: selectedRoomIdSelector(state),
  roomsLoading: loadingSelector(state),
});

const mapDispatchToProps = {
  setSelectedRoomId: setSelectedRoomIdAction,
  fetchRooms: fetchRoomsInitiatedAction,
  updateData: updateDataAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(HomePage);
