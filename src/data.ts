import { RoomStatus } from "./models/room";

export const initialRooms = {
  room1: {
    roomId: "room1",
    name: "Room 1",
    renterName: "Aakash",
    reading: 10,
    lastUpdated: null,
    status: RoomStatus.occupied,
  },
  room2: {
    roomId: "room2",
    name: "Room 2",
    renterName: "",
    reading: 20,
    lastUpdated: null,
    status: RoomStatus.vacant,
  },
  room3: {
    roomId: "room3",
    name: "Room 3",
    renterName: "Roshan",
    reading: 30,
    lastUpdated: null,
    status: RoomStatus.occupied,
  },
  room4: {
    roomId: "room4",
    name: "Room 4",
    renterName: "Saksham",
    reading: 40,
    lastUpdated: null,
    status: RoomStatus.occupied,
  },
  kitchen: {
    roomId: "kitchen",
    name: "Kitchen",
    renterName: "Roshan",
    reading: 50,
    lastUpdated: null,
    status: RoomStatus.occupied,
  },
};
