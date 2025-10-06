export type Room = {
  roomId: string;
  name: string;
  renterName: string;
  reading: number;
  lastUpdatedAt: Date | null;
  status: RoomStatus;
};

export type Rooms = Record<string, Room>;

export type FetchRoomsPayload = { rooms: Room[]; price: number };

export enum RoomStatus {
  occupied = "OCCUPIED",
  vacant = "VACANT",
}
